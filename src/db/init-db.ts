import pkg from 'pg';
const { Client } = pkg;
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createDatabase() {
  const client = new Client({
    user: process.env.POSTGRES_USER || 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: 'postgres', // Connect to default postgres database
    password: process.env.POSTGRES_PASSWORD || 'your_password',
    port: parseInt(process.env.POSTGRES_PORT || '5432'),
  });

  try {
    await client.connect();
    const dbName = process.env.POSTGRES_DB || 'fundex';
    
    // Check if database exists
    const checkDb = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkDb.rows.length === 0) {
      // Create database if it doesn't exist
      await client.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database ${dbName} created successfully`);
    } else {
      console.log(`Database ${dbName} already exists`);
    }
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  } finally {
    await client.end();
  }
}

async function initializeDatabase() {
  try {
    // First create the database
    await createDatabase();

    // Now connect to our new database
    const client = new Client({
      user: process.env.POSTGRES_USER || 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      database: process.env.POSTGRES_DB || 'fundex',
      password: process.env.POSTGRES_PASSWORD || 'your_password',
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
    });

    await client.connect();

    // Read and execute schema.sql
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    await client.query(schema);

    console.log('Database schema initialized successfully!');
    await client.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
