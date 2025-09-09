"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { User } from '@/app/lib/db';

// APIレスポンスの型定義
interface ApiResponse {
  success: boolean;
  data?: User[];
  error?: string;
  details?: string;
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ユーザーデータを取得
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/users');
      const result: ApiResponse = await response.json();
      
      if (result.success && result.data) {
        setUsers(result.data);
      } else {
        setError(result.error || 'データの取得に失敗しました');
      }
    } catch (err) {
      setError('ネットワークエラーが発生しました');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // 日付をフォーマット
  const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Head>
          <title>ユーザー一覧 - Next.js App</title>
        </Head>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg text-gray-600">データを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Head>
          <title>エラー - Next.js App</title>
        </Head>
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              エラーが発生しました
            </h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={fetchUsers}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              再試行
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>ユーザー一覧 - Next.js App</title>
        <meta name="description" content="データベースから取得したユーザー一覧" />
      </Head>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* ヘッダー */}
        <header className="text-center mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              👥 ユーザー一覧
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              PostgreSQLデータベースから取得したデータを表示しています
            </p>
            <button
              onClick={fetchUsers}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              更新
            </button>
          </div>
        </header>

        <main>
          {users.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-xl text-gray-600">ユーザーデータがありません</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-l-4 border-blue-500"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                        <span className="text-2xl mr-2">👤</span>
                        {user.name}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                        ID: {user.id}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a
                          href={`mailto:${user.email}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                        >
                          {user.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span>
                          <span className="font-medium">登録日:</span> {formatDate(user.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 bg-gray-50 border-t">
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>ユーザー詳細</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* 統計情報 */}
          {users.length > 0 && (
            <div className="mt-12 text-center">
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">📊 統計情報</h3>
                <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                <p className="text-gray-600">登録ユーザー数</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}