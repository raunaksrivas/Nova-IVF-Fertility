/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const getFertilityAssessment = async (data: any) => {
  const prompt = `As a fertility AI assistant, analyze the following patient data and provide a preliminary assessment and recommended next steps. 
  Data: ${JSON.stringify(data)}
  
  Provide the response in a structured JSON format with:
  - assessment: A brief summary of the situation.
  - recommendations: A list of recommended treatments or tests.
  - urgency: Low, Medium, or High.
  - nextSteps: A list of actionable steps.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp", // Using a reliable model
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Assessment Error:", error);
    return {
      assessment: "We need more information to provide an accurate assessment.",
      recommendations: ["Consult with a fertility specialist"],
      urgency: "Medium",
      nextSteps: ["Book an initial consultation"]
    };
  }
};

export const chatWithAssistant = async (message: string, history: any[]) => {
  const chat = ai.chats.create({
    model: "gemini-2.0-flash-exp",
    config: {
      systemInstruction: "You are Nova, an empathetic and knowledgeable fertility AI assistant for Nova IVF Fertility Clinic. You help patients understand treatments, prepare for appointments, and provide emotional support. You do not give definitive medical diagnoses but guide users to professional care.",
    },
  });

  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again or call our clinic directly.";
  }
};
