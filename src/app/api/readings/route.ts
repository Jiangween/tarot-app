// src/app/api/readings/route.ts

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';
import { SPREAD_TYPES, POSITION_MEANINGS } from '@/constants/tarotConstants';

// 定义牌阵类型对应的抽牌数量
const SPREAD_CARDS_COUNT = {
  'SINGLE': 1,
  'THREE_CARDS': 3,
  'CELTIC_CROSS': 10,
  'RELATIONSHIP': 2
} as const;

// 塔罗牌信息类型
interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  type: 'major' | 'minor';
  suit?: string;
  description: string;
  uprightMeaning: string;
  reversedMeaning: string;
  imagePath?: string;
  position?: string;
  isReversed?: boolean;
}

// 从JSON加载塔罗牌数据
async function loadTarotDeck(): Promise<TarotCard[]> {
  const filePath = path.join(process.cwd(), 'data', 'tarot', 'deck.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const tarotData = JSON.parse(data);

  return [
    ...tarotData.major,
    ...tarotData.minor.wands,
    ...tarotData.minor.cups,
    ...tarotData.minor.swords,
    ...tarotData.minor.pentacles
  ];
}

// 读取图片并转换为 Base64
async function getImageBase64(imagePath: string): Promise<string> {
  const imageBuffer = await fs.readFile(imagePath);
  return imageBuffer.toString('base64');
}

// 随机抽取指定数量的卡牌并添加位置信息
async function drawCards(deck: TarotCard[], spreadType: string) {
    const normalizedType = SPREAD_TYPES[spreadType as keyof typeof SPREAD_TYPES];
    const count = SPREAD_CARDS_COUNT[normalizedType];
    const positions = POSITION_MEANINGS[normalizedType];
  
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
  
    return shuffled.slice(0, count).map((card, index) => {
        return {
            ...card,
            isReversed: Math.random() > 0.5,
            position: positions[index],
            imageUrl: `/api/cards/${card.id}/image`
        };
    });
}

export async function POST(req: Request) {
  try {
    const { spreadType: rawSpreadType, question } = await req.json();

    if (!(rawSpreadType in SPREAD_TYPES)) {
      return NextResponse.json({ error: 'Invalid spread type' }, { status: 400 });
    }

    const deck = await loadTarotDeck();
    const cards = await drawCards(deck, rawSpreadType);

    return NextResponse.json({ success: true, spread: rawSpreadType, cards, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Error drawing cards:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
