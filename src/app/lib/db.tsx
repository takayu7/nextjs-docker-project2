import { Pool, PoolClient, QueryResult } from 'pg';

// ユーザー型定義
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

// データベース接続プールを作成「PostgreSQL データベースへの接続プール」
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,// 接続先DBのURL（環境変数から取得）
  max: 20,// 最大同時接続数
  idleTimeoutMillis: 30000,// 未使用接続を30秒で切断
  connectionTimeoutMillis: 2000,// 接続タイムアウト2秒
});

// データベース接続をテスト
export async function testConnection(): Promise<boolean> {
  try {
    const client: PoolClient = await pool.connect();
    const result: QueryResult = await client.query('SELECT NOW()');
    client.release();
    console.log('Database connected:', result.rows[0]);
    return true;
  } catch (err) {
    console.error('Database connection error:', err);
    return false;
  }
}

// ユーザー一覧を取得
export async function getUsers(): Promise<User[]> {
  try {
    const result: QueryResult<User> = await pool.query(
      'SELECT id, name, email, created_at FROM users ORDER BY created_at DESC'
    );
    return result.rows;
  } catch (err) {
    console.error('Error fetching users:', err);
    throw err;
  }
}

// 単一ユーザーを取得
export async function getUserById(id: number): Promise<User | undefined> {
  try {
    const result: QueryResult<User> = await pool.query(
      'SELECT id, name, email, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error fetching user:', err);
    throw err;
  }
}

export default pool;