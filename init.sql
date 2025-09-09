-- 初期テーブル作成例
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- サンプルデータ挿入
INSERT INTO users (name, email) VALUES 
    ('太郎', 'taro@example.com'),
    ('花子', 'hanako@example.com')
ON CONFLICT (email) DO NOTHING;