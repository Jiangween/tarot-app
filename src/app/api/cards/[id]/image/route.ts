import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// 添加辅助函数来获取实际的卡牌信息
function getCardInfo(cardId: number, deck: any) {
    if (cardId <= 21) {  // 修改为21，因为大阿尔卡纳是0-21
        return deck.major.find((c: any) => c.id === cardId);
    }
    
    let suit: string;
    let localId: number;
    
    if (cardId >= 22 && cardId <= 35) {
        suit = 'wands';
        localId = cardId - 21;  // 修改为21，使得第一张牌id为1
    } else if (cardId >= 36 && cardId <= 49) {
        suit = 'cups';
        localId = cardId - 35;
    } else if (cardId >= 50 && cardId <= 63) {
        suit = 'swords';
        localId = cardId - 49;
    } else {
        suit = 'pentacles';
        localId = cardId - 63;
    }
    
    return deck.minor[suit].find((c: any) => c.id === localId);
}

export async function GET(
    request: Request,
    { params }: { params: { id: string } }  // 移除 Promise
) {
    try {
        const cardId = parseInt(params.id);
        
        const deckPath = path.join(process.cwd(), 'data', 'tarot', 'deck.json');
        const deckData = await fs.readFile(deckPath, 'utf-8');
        const deck = JSON.parse(deckData);
        
        const card = getCardInfo(cardId, deck);

        if (!card) {
            return NextResponse.json(
                { error: 'Card not found' },
                { status: 404 }
            );
        }

        // 构建图片文件名
        let fileName: string;
        if (card.type === 'major') {
            // 大阿尔卡纳的特殊处理
            const majorArcanaMap: { [key: string]: string } = {
                'The Fool': 'TheFool',
                'The Magician': 'TheMagician',
                'The High Priestess': 'TheHighPriestess',
                'The Empress': 'TheEmpress',
                'The Emperor': 'TheEmperor',
                'The Hierophant': 'TheHierophant',
                'The Lovers': 'TheLovers',
                'The Chariot': 'TheChariot',
                'Strength': 'Strength',
                'The Hermit': 'TheHermit',
                'Wheel of Fortune': 'WheelOfFortune',
                'Justice': 'Justice',
                'The Hanged Man': 'TheHangedMan',
                'Death': 'Death',
                'Temperance': 'Temperance',
                'The Devil': 'TheDevil',
                'The Tower': 'TheTower',
                'The Star': 'TheStar',
                'The Moon': 'TheMoon',
                'The Sun': 'TheSun',
                'Judgement': 'Judgement',
                'The World': 'TheWorld'
            };
            fileName = majorArcanaMap[card.nameEn] || card.nameEn.replace(/ /g, '');
        } else {
            // 小阿尔卡纳的处理
            const suitMap = {
                'wands': 'Wands',
                'cups': 'Cups',
                'swords': 'Swords',
                'pentacles': 'Pentacles'
            };
            const number = card.id.toString().padStart(2, '0');
            const suit = suitMap[card.suit as keyof typeof suitMap];
            fileName = `${suit}${number}`;
        }

        const imagePath = path.join(process.cwd(), 'data', 'tarot', 'cards', `${fileName}.png`);
        console.log('Trying to read image:', imagePath);
        
        const imageBuffer = await fs.readFile(imagePath);

        return new NextResponse(imageBuffer, {
            headers: {
                'Content-Type': 'image/png',
                'Cache-Control': 'public, max-age=31536000',
            },
        });
    } catch (error) {
        console.error('Error serving card image:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}