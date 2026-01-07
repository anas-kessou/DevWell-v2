
import { GoogleGenAI, Type, Modality, LiveServerMessage } from "@google/genai";
import { BioBlueprint } from "../types";

export class GeminiService {
  private static getClient() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * Neural Burst Analysis: Combines Video + Audio to detect stress/vocal tension.
   */
  static async analyzeNeuralBurst(imageBuffer: string, audioBuffer?: string): Promise<any> {
    const ai = this.getClient();
    const parts: any[] = [
      { inlineData: { mimeType: 'image/jpeg', data: imageBuffer } },
      { text: "Neural Analysis: Review video for posture/fatigue and audio for respiratory stress/vocal tension. Return JSON: {type: 'FATIGUE'|'POSTURE'|'STRESS'|'FOCUS', severity: 'LOW'|'MEDIUM'|'HIGH', description: string, vocalTensionScore: number (0-100)}." }
    ];

    if (audioBuffer) {
      parts.push({ inlineData: { mimeType: 'audio/pcm;rate=16000', data: audioBuffer } });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            severity: { type: Type.STRING },
            description: { type: Type.STRING },
            vocalTensionScore: { type: Type.NUMBER }
          },
          required: ["type", "severity", "description"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return null;
    }
  }

  /**
   * Multimodal Wellness Chat: Analyzes text + audio for voice-driven interactions.
   */
  static async analyzeMultimodalWellness(params: { message: string, audioBase64?: string, isADHDMode?: boolean }): Promise<any> {
    const ai = this.getClient();
    const parts: any[] = [];
    
    if (params.audioBase64) {
      parts.push({ inlineData: { mimeType: 'audio/pcm;rate=16000', data: params.audioBase64 } });
    }
    
    parts.push({ text: params.message || "Please analyze my current wellness state based on my voice and respond." });

    const systemInstruction = params.isADHDMode 
      ? "You are an ADHD-friendly wellness coach. Analyze the user's voice for stress or tension. Use short bullet points."
      : "You are DevWell AI. Analyze the user's voice tone, pace, and breathing for stress indicators.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-native-audio-preview-12-2025',
      contents: { parts },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: { type: Type.STRING, description: "The assistant's conversational response." },
            vocalWellness: { 
              type: Type.OBJECT,
              properties: {
                observation: { type: Type.STRING, description: "What was detected in the voice (e.g. vocal tension, steady breathing)." },
                recommendation: { type: Type.STRING, description: "A wellness tip based on the voice analysis." },
                stressLevel: { type: Type.STRING, enum: ["LOW", "MEDIUM", "HIGH"] }
              }
            }
          },
          required: ["reply"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return { reply: "Neural sync interrupted. Please try speaking again." };
    }
  }

  /**
   * Burnout Oracle: Predictive forecasting.
   */
  static async getPredictiveForecast(history: any[]): Promise<any> {
    const ai = this.getClient();
    const dataSummary = history.map(h => `${h.type}: ${h.severity} at ${new Date(h.timestamp).toLocaleTimeString()}`).join(', ');

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform deep-thinking burnout forecasting for this dev based on history: ${dataSummary}. Predict the next 4 hours.`,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            forecastPath: { type: Type.ARRAY, items: { type: Type.NUMBER } },
            reasoning: { type: Type.STRING },
            actionPlan: { type: Type.STRING }
          },
          required: ["riskScore", "forecastPath", "reasoning", "actionPlan"]
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return null;
    }
  }

  /**
   * Anonymity Auditor: Evaluates dataset safety for privacy compliance.
   */
  static async auditAnonymity(dataSummary: any): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Audit this aggregate wellness data for privacy risks (k-anonymity): ${JSON.stringify(dataSummary)}. Rate safety 0-100 and give 3 tips to improve differential privacy.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            safetyScore: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING },
            privacyTips: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return null;
    }
  }

  /**
   * Fine-Tuning Strategy: Identifies highest value data segments for model improvement.
   */
  static async getFineTuningDirectives(alertsCount: number, commonTypes: any): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `We have ${alertsCount} alerts. Common issues: ${JSON.stringify(commonTypes)}. Suggest 3 segments for Gemini fine-tuning that would most benefit developer wellness.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            directives: { type: Type.ARRAY, items: { type: Type.STRING } },
            targetMetrics: { type: Type.STRING }
          }
        }
      }
    });
    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return null;
    }
  }

  static async getSystemInsights(feedback: string[], alertsCount: number): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Aggregate Analysis Request: We have ${alertsCount} total health alerts and user feedback: "${feedback.join(' | ')}". Provide a sentiment summary and 3 strategic 'Neural Directives' for the dev team.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentimentSummary: { type: Type.STRING },
            directives: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return null;
    }
  }

  static async getSearchGroundedInfo(query: string): Promise<{ text: string, sources: any[] }> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    const text = response.text || "I couldn't find any recent information.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({ uri: chunk.web.uri, title: chunk.web.title })) || [];
    return { text, sources };
  }

  static async getWellnessChat(params: { message: string, useThinking?: boolean, isADHDMode?: boolean }) {
    const ai = this.getClient();
    const model = params.useThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    const systemInstruction = params.isADHDMode 
      ? "You are an ADHD-friendly wellness coach."
      : "You are DevWell AI Assistant.";

    const response = await ai.models.generateContent({
      model,
      contents: params.message,
      config: {
        systemInstruction,
        ...(params.useThinking ? { thinkingConfig: { thinkingBudget: 16000 } } : {})
      }
    });
    return response.text || "Neural connection reset.";
  }

  static async speak(text: string): Promise<string> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
      },
    });
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || "";
  }

  static async generateBioBlueprint(history: any[]): Promise<BioBlueprint | null> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bio-Blueprint request for: ${JSON.stringify(history)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            focusAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestedStretches: { type: Type.ARRAY, items: { type: Type.STRING } },
            nutritionTip: { type: Type.STRING },
            productivityWindow: { type: Type.STRING }
          }
        }
      }
    });
    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return null;
    }
  }
}
