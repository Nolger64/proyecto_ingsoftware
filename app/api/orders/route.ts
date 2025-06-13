// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// OBTENER todas las órdenes (GET)
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM pb_orders ORDER BY order_date DESC');
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('API GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

// CREAR una nueva orden (POST)
export async function POST(request: Request) {
  const body = await request.json();
  const { trackingNumber, customer, items, total, paymentMethod } = body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Iniciar transacción

    // Insertar en la tabla de órdenes
    const orderInsertQuery = `
      INSERT INTO pb_orders (tracking_number, customer_name, customer_address, customer_phone, total, payment_method)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const orderValues = [trackingNumber, customer.name, customer.address, customer.phone, total, paymentMethod];
    const orderResult = await client.query(orderInsertQuery, orderValues);
    const orderId = orderResult.rows[0].id;

    // Insertar cada item en la tabla de items
    for (const item of items) {
      const itemInsertQuery = `
        INSERT INTO pb_order_items (order_id, product_name, quantity, price)
        VALUES ($1, $2, $3, $4);
      `;
      const itemValues = [orderId, item.name, item.quantity, item.price];
      await client.query(itemInsertQuery, itemValues);
    }

    await client.query('COMMIT'); // Finalizar transacción
    return NextResponse.json({ success: true, orderId }, { status: 201 });

  } catch (error) {
    await client.query('ROLLBACK'); // Revertir en caso de error
    console.error('API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  } finally {
    client.release();
  }
}