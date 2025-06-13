// app/api/orders/[trackingNumber]/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// ACTUALIZAR el estado de una orden (PUT)
export async function PUT(request: Request, { params }: { params: { trackingNumber: string } }) {
  console.log('--- RECIBIDA PETICIÓN PUT PARA ACTUALIZAR ESTADO ---');
    const { trackingNumber } = params;
  const { status } = await request.json();

  if (!status) {
    return NextResponse.json({ error: 'Status is required' }, { status: 400 });
  }

  try {
    const client = await pool.connect();
    const query = 'UPDATE pb_orders SET status = $1 WHERE tracking_number = $2 RETURNING *';
    const result = await client.query(query, [status, trackingNumber]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('API PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 });
  }
}




