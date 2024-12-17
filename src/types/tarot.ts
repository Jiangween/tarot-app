export interface TarotRequest {
    spreadType: 'SINGLE' | 'THREE_CARDS' | 'CELTIC_CROSS' | 'RELATIONSHIP';
    question?: string;
  }
    
  export interface TarotResponse {
    success: boolean;
    spread: string;
    cards: TarotCard[];
    timestamp: string;
  }
  
  export interface TarotCard {
    id: number;
    name: string;
    nameEn: string;
    type: 'major' | 'minor';
    suit?: string;
    description: string;
    uprightMeaning: string;
    reversedMeaning: string;
    isReversed?: boolean;
    position?: string;
  }