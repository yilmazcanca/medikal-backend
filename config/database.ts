import path from 'path';

export default ({ env }) => {
  // Render'da 'DATABASE_CLIENT' değişkenini 'postgres' yapacağız.
  const client = env('DATABASE_CLIENT', 'sqlite');

  if (client === 'postgres') {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'), // Render'ın verdiği adres
          ssl: env.bool('DATABASE_SSL', false) ? { rejectUnauthorized: false } : false, // Güvenlik ayarı
        },
        pool: {
          min: env.int('DATABASE_POOL_MIN', 2),
          max: env.int('DATABASE_POOL_MAX', 10),
        },
      },
    };
  }

  // Bilgisayarında (Localhost) çalışırken burası çalışır (SQLite)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: path.join(__dirname, '..', '..', '.tmp/data.db'),
      },
      useNullAsDefault: true,
    },
  };
};