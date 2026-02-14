// Gemini AI Service for fitness advice
const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || '';

export async function getFitnessAdvice(message: string): Promise<string> {
  // If no API key is configured, return a helpful fallback response
  if (!GEMINI_API_KEY) {
    return getFallbackResponse(message);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful fitness trainer at Surefit Gym in Ikeja, Lagos. Provide concise, practical fitness advice. User asks: ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackResponse(message);
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return getFallbackResponse(message);
  }
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('plan')) {
    return "Great question! For beginners, I recommend starting with 3 days a week: Day 1 - Full body (squats, push-ups, rows), Day 2 - Cardio & core, Day 3 - Upper/Lower split. Visit Surefit Gym at Oregun, Ikeja for personalized training!";
  }
  
  if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('food') || lowerMessage.includes('eat')) {
    return "Nutrition is 70% of fitness success! Focus on: 1) High protein (chicken, fish, beans), 2) Complex carbs (oats, brown rice), 3) Plenty of vegetables, 4) Stay hydrated with 2-3L water daily. Avoid excessive processed foods and sugary drinks.";
  }
  
  if (lowerMessage.includes('weight') || lowerMessage.includes('fat') || lowerMessage.includes('lose')) {
    return "For weight loss: 1) Create a calorie deficit (eat slightly less than you burn), 2) Combine cardio (30-45 mins) with strength training, 3) Prioritize sleep (7-8 hours), 4) Stay consistent! Surefit Gym offers excellent weight loss programs - call 0802 360 9696.";
  }
  
  if (lowerMessage.includes('muscle') || lowerMessage.includes('gain') || lowerMessage.includes('bulk')) {
    return "To build muscle: 1) Progressive overload (increase weights gradually), 2) Eat in a slight calorie surplus with high protein (1.6-2g per kg bodyweight), 3) Focus on compound lifts (squats, deadlifts, bench press), 4) Rest 48 hours between training same muscle group.";
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('membership') || lowerMessage.includes('plan')) {
    return "Surefit Gym offers flexible plans to fit your budget! We have Monthly Basic, VIP Yearly (best value), and Corporate packages. Call us at 0802 360 9696 for current pricing and seasonal discounts. We also offer day passes!";
  }
  
  if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where')) {
    return "We're conveniently located at: 2 Adewunmi Estate, Kudirat Abiola Way, By First Bank Bus Stop, Opposite The Citadel Church, Oregun, Ikeja, Lagos. Open Mon-Sat 7am-9pm!";
  }
  
  return "Thanks for reaching out! I'm here to help with workout plans, nutrition tips, and fitness advice. For personalized training, visit Surefit Gym in Ikeja or call 0802 360 9696. What specific fitness goal can I help you with today?";
}
