
# Node.js 18を使用
FROM node:18-alpine

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install && npm cache clean --force

# アプリケーションのソースコードをコピー
COPY . .

# Next.jsアプリケーションをビルド
RUN npm run build

# 3000番ポートを開放
EXPOSE 3000

# 本番環境でアプリケーションを開始
CMD ["npm", "start"]
