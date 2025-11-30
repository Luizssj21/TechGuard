import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDiagnosticSuggestion = async (symptoms: string, deviceModel: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Chave da API não configurada. Por favor, verifique suas configurações de ambiente.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Você é um assistente técnico especialista em reparo de computadores para a TechGuard.
      O usuário relatou o seguinte problema com um ${deviceModel}: "${symptoms}".
      
      Forneça um checklist técnico conciso de diagnóstico contendo (Responda em Português do Brasil):
      1. Possíveis causas raízes (Hardware vs Software).
      2. Passos de diagnóstico recomendados.
      3. Estimativa de dificuldade do reparo (1-10).
      
      Formate a resposta como HTML limpo (usando tags <ul>, <li>, <strong>) adequado para renderização em um componente React, mas não inclua os wrappers markdown \`\`\`html ou \`\`\`. Apenas o HTML interno.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Nenhuma sugestão disponível.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Não foi possível buscar sugestões de diagnóstico no momento.";
  }
};