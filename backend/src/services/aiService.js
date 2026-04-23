import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
}) : null;

/**
 * Generates an artwork description based on title and category.
 * Falls back to a default description if AI is disabled or fails.
 */
export const generateArtworkDescription = async (title, category) => {
  if (!openai) {
    return `A beautiful ${category} piece titled "${title}".`;
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional art curator. Generate a short, poetic, and engaging description for an artwork."
        },
        {
          role: "user",
          content: `Title: ${title}\nCategory: ${category}`
        }
      ],
      max_tokens: 100,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('AI Description Error:', error);
    return `A unique ${category} work exploring the themes of ${title}.`;
  }
};

/**
 * Generates relevant tags for an artwork.
 * Falls back to empty tags if AI is disabled or fails.
 */
export const generateArtworkTags = async (title, category) => {
  if (!openai) {
    return [category.toLowerCase(), 'art'];
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Generate 5 comma-separated tags for the following artwork title and category."
        },
        {
          role: "user",
          content: `Title: ${title}\nCategory: ${category}`
        }
      ],
      max_tokens: 50,
    });

    const tags = response.choices[0].message.content
      .split(',')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length > 0);
    
    return tags;
  } catch (error) {
    console.error('AI Tagging Error:', error);
    return [category.toLowerCase()];
  }
};
