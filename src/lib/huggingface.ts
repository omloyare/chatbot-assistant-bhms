const HUGGING_FACE_API_URL = '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';

export const generateChatResponse = async (
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>
) => {
  try {
    // Format the conversation history into a single prompt
    const systemPrompt =
      messages.find((m) => m.role === 'system')?.content || '';
    const conversationHistory = messages
      .filter((m) => m.role !== 'system')
      .map((m) => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`)
      .join('\n');

    const prompt = `${systemPrompt}\n\nConversation:\n${conversationHistory}\n\nTutor:`;

    const response = await fetch(HUGGING_FACE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 500,
          temperature: 0.7,
          top_p: 0.9,
          do_sample: true,
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate response');
    }

    const result = await response.json();
    return (
      result[0]?.generated_text ||
      'I apologize, but I could not generate a response at this time.'
    );
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
};
