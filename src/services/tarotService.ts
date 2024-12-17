import { TarotRequest, TarotResponse } from '../types/tarot';

export const getTarotReading = async (
  spreadType: TarotRequest['spreadType'], 
  question?: string
): Promise<TarotResponse> => {
  try {
    const response = await fetch('api/reading', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        spreadType,
        question
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting tarot reading:', error);
    throw error;
  }
};