import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-blue-800">
      <Head>
        <title>Next.js + PostgreSQL App</title>
        <meta name="description" content="Next.js with PostgreSQL integration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🚀 Next.js + PostgreSQL
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {/* ユーザー一覧カード */}
          <Link
            href="/pages/users"
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">👥</span>
              <h2 className="text-2xl font-semibold text-white group-hover:text-blue-200">
                ユーザー一覧
              </h2>
              <svg className="w-5 h-5 ml-auto text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <p className="text-blue-100 group-hover:text-white transition-colors">
              データベースに登録されたユーザー情報を表示します
            </p>
          </Link>
          {/* API Routesカード */}
          <a
            href="/api/users"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">📚</span>
              <h2 className="text-2xl font-semibold text-white group-hover:text-blue-200">
                API Routes
              </h2>
              <svg className="w-4 h-4 ml-auto text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <p className="text-blue-100 group-hover:text-white transition-colors">
              RESTful API エンドポイント (/api/users)
            </p>
            <div className="mt-4 flex items-center text-sm">
              <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-mono">
                GET
              </span>
              <span className="text-blue-300 ml-2">JSON形式で取得</span>
            </div>
          </a>
        </div>

        {/* 技術スタック */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">🛠️ 技術スタック</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Next.js',
              'TypeScript',
              'Tailwind CSS',
              'PostgreSQL',
              'Docker',
              'pgAdmin'
            ].map((tech) => (
              <span
                key={tech}
                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* フッター */}
        <footer className="mt-12 text-center text-blue-200 text-sm">
          <p>Docker Compose で構築されたフルスタックアプリケーション</p>
        </footer>
      </main>
    </div>
  );
}