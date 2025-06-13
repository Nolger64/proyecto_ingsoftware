// lib/db.ts
import { Pool } from 'pg';

let pool: Pool;

// Usamos una variable global para mantener el pool de conexiones
// a través de las recargas en caliente (hot-reloads) de Next.js en desarrollo.
if (process.env.NODE_ENV === 'development') {
  if (!(global as any)._pgPool) {
    (global as any)._pgPool = new Pool({
      connectionString: 'postgresql://postgres:vzfllPVvOSuOHgvuoBlDQEJyHAYxqUVK@metro.proxy.rlwy.net:41681/railway',
      ssl: {
        rejectUnauthorized: false // Necesario para algunas conexiones remotas como las de Railway
      }
    });
  }
  pool = (global as any)._pgPool;
} else {
  pool = new Pool({
    connectionString: 'postgresql://postgres:vzfllPVvOSuOHgvuoBlDQEJyHAYxqUVK@metro.proxy.rlwy.net:41681/railway',
    ssl: {
      rejectUnauthorized: false
    }
  });
}

export default pool;