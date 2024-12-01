import OpenAI from 'openai';
import { Note } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

export const aiService = {
  async generateSummary(note: Note): Promise<string> {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates concise summaries of notes."
        },
        {
          role: "user",
          content: `Please summarize this note in 2-3 sentences: ${note.content}`
        }
      ]
    });

    return response.choices[0].message.content || '';
  },

  async suggestTags(note: Note): Promise<string[]> {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that suggests relevant tags for notes."
        },
        {
          role: "user",
          content: `Please suggest 3-5 relevant tags for this note: ${note.content}`
        }
      ]
    });

    const tags = response.choices[0].message.content?.split(',').map(tag => tag.trim()) || [];
    return tags;
  },

  async findRelatedNotes(note: Note, allNotes: Note[]): Promise<string[]> {
    const noteContents = allNotes.map(n => ({
      id: n.id,
      content: n.content
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that finds related notes based on content similarity."
        },
        {
          role: "user",
          content: `Find the most related notes to this content: ${note.content}\n\nAvailable notes:\n${JSON.stringify(noteContents)}`
        }
      ]
    });

    return response.choices[0].message.content?.split(',').map(id => id.trim()) || [];
  }
};