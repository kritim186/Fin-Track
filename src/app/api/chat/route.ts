import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, data } = await req.json();

    // The data array contains the financial context passed from the client
    const financialContext = data?.financialSummary || '';

    const systemPrompt = `You are a highly knowledgeable and empathetic AI Financial Advisor for the FinTrack application.
Your goal is to help the user grow their wealth, manage their budgets, track their goals, and analyze their spending.

Here is the user's current financial context:
${financialContext}

Use this information to give highly personalized advice. If the user asks general questions, answer them accurately but tie them back to their specific financial situation if applicable.
Do not provide professional legal or tax advice. Always add a disclaimer if appropriate. Keep your answers concise, formatting them with markdown (bullet points, bold text) for readability.`;

    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: systemPrompt,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
