import { config as configEnv } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

configEnv();

const {
  TYPEORM_MIGRATIONS,
  DB_DIALECT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_LOGGING,
  NODE_ENV,
} = process.env;
const migrations = TYPEORM_MIGRATIONS || './apps/backend/src/migration/**/*.ts';

export default new DataSource({
  type: DB_DIALECT as any,
  host: DB_HOST,
  port: parseInt(DB_PORT || '5433'),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: DB_LOGGING === 'true',
  synchronize: true,
  migrations: [migrations],
  entities: ['./backend/dist/**/*.entity.js'],
  subscribers: ['dist/src/subscriber/**/*.js', 'dist/src/**/*.subscriber.js'],
  namingStrategy: new SnakeNamingStrategy(),
  extra: {
    // This bypasses ssl errors on mssql for non production builds
    trustServerCertificate: NODE_ENV !== 'production',
  },
});
