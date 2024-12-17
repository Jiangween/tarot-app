'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SPREAD_TYPES } from '@/constants/tarotConstants';
import type { TarotResponse } from '@/types/tarot';

export default function Home() {
  const [reading, setReading] = useState<TarotResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReadingRequest = async (spreadType: string) => {
    try {
      setLoading(true);
      const response = await fetch('/api/readings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spreadType }),
      });

      const data = await response.json();
      setReading(data);
    } catch (error) {
      console.error('Error getting reading:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
          塔罗牌阅读
        </h1>

        {/* 牌阵选择 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(SPREAD_TYPES)
            .slice(0, 4) // 只显示中文名称的选项
            .map(([name, type]) => (
              <button
                key={type}
                onClick={() => handleReadingRequest(type)}
                disabled={loading}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 disabled:opacity-50 dark:text-white"
              >
                {name}
              </button>
            ))}
        </div>

        {/* 加载状态 */}
        {loading && (
          <div className="text-center dark:text-white">
            正在抽取塔罗牌...
          </div>
        )}

        {/* 塔罗牌展示 */}
        {reading && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reading.cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={card.imageUrl || ''}
                      alt={card.name}
                      fill
                      className={`object-contain ${
                        card.isReversed ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <div className="space-y-2 dark:text-white">
                    <h3 className="font-bold text-lg">
                      {card.position}: {card.name}
                      {card.isReversed ? '（逆位）' : ''}
                    </h3>
                    <p className="text-sm">
                      {card.isReversed ? card.reversedMeaning : card.uprightMeaning}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}