import { GoogleGenAI, Type, Modality } from "@google/genai";
import { BioBlueprint } from "../types";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export class GeminiService {
  private static getClient() {
    if (!GEMINI_API_KEY) {
      console.error("Gemini API Key is missing! Set VITE_GEMINI_API_KEY in .env");
    }
    return new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  }

  static async analyzeNeuralBurst(imageBuffer: string, audioBuffer?: string): Promise<any> {
    const ai = this.getClient();
    const parts: any[] = [
      { inlineData: { mimeType: 'image/jpeg', data: imageBuffer } },
      { text: "Neural Analysis: Review video for posture/fatigue. Return JSON: {type: 'FATIGUE'|'POSTURE'|'STRESS'|'FOCUS', severity: 'LOW'|'MEDIUM'|'HIGH', description: string, vocalTensionScore: number, fatigueLevel: number (1-9)}." }
    ];

    if (audioBuffer) {
      parts.push({ inlineData: { mimeType: 'audio/pcm;rate=16000', data: audioBuffer } });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            severity: { type: Type.STRING },
            description: { type: Type.STRING },
            vocalTensionScore: { type: Type.NUMBER },
            fatigueLevel: { type: Type.NUMBER }
          }
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch {
      return null;
    }
  }

  static async getPredictiveForecast(history: any[]): Promise<any> {
    const ai = this.getClient();
    const dataSummary = JSON.stringify(history);

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: `Perform deep burnout forecasting: ${dataSummary}` }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER },
            forecastPath: { type: Type.ARRAY, items: { type: Type.NUMBER } },
            reasoning: { type: Type.STRING },
            actionPlan: { type: Type.STRING }
          }
        }
      }
    });

    try {
      return JSON.parse(response.text || '{}');
    } catch {
      return null;
    }
  }

  static async generateWellnessVideo(prompt: string): Promise<string | null> {
    // Video generation is currently not supported in this client version
    return null; 
  }

  static async speak(text: string): Promise<void> {
    return new Promise((resolve) => {
      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          
          const speakNow = () => {
            const utterance = new SpeechSynthesisUtterance(text);
            const voices = window.speechSynthesis.getVoices();
            // Try to find a good English voice
            const voice = voices.find(v => v.name.includes('Google US English')) || 
                          voices.find(v => v.name.includes('English')) || 
                          voices[0];
            if (voice) utterance.voice = voice;
            
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.onend = () => resolve();
            utterance.onerror = (e) => {
              // Log as warning to be less alarming in console unless critical
              console.warn('Speech synthesis hiccup:', e.error); 
              resolve();
            };
            window.speechSynthesis.speak(utterance);
          };

          if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = speakNow;
          } else {
            speakNow();
          }
        } else {
          resolve();
        }
      } catch (e) {
        console.warn('Speech synthesis failed:', e);
        resolve();
      }
    });
  }

  static async generateBioBlueprint(history: any[]): Promise<BioBlueprint | null> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: `Generate Bio-Blueprint: ${JSON.stringify(history)}` }] }],
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
    } catch {
      return null;
    }
  }

  static async analyzeMultimodalWellness(params: { message: string; audioBase64?: string; visualContext?: string; healthContext?: any[]; history?: any[]; isADHDMode: boolean }): Promise<any> {
    const ai = this.getClient();
    const parts: any[] = [];
    
    // Add History if present
    if (params.history && params.history.length > 0) {
       const historyText = params.history.map(m => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
       parts.push({ text: `CONVERSATION HISTORY:\n${historyText}\n` });
    }
    
    if (params.visualContext) {
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg',
          data: params.visualContext
        }
      });
    }

    if (params.audioBase64) {
      parts.push({ 
        inlineData: { 
          mimeType: 'audio/pcm;rate=16000', 
          data: params.audioBase64 
        } 
      });
    }

    const instruction = `
      Perform a multimodal biometric analysis of the user's vocal, visual, and historical health data.
      You are an OMNISCIENT WELLNESS AI.
      
      CONTEXT:
      - Health History: ${params.healthContext ? JSON.stringify(params.healthContext) : "No recent events"}
      ${params.visualContext ? "- Visual: You have access to a current snapshot of the user. Analyze facial expression, posture, and lighting." : ""}
      ${params.audioBase64 ? "- Vocal: Analyze 'vocal fry', sighing, pitch, speed for stress." : ""}
      
      GOAL:
      Combine ALL these signals to assess current wellness.
      - If Visual shows fatigue but Voice is energetic -> Ask about masking burnout.
      - If Health History shows frequent breaks but Visual shows stress -> Suggest deeper rest.
      
      ${params.isADHDMode ? "ADHD MODE: Keep your conversational reply extremely concise and actionable." : ""}

      ADOPT A PERSONA: Match the user's intent. If they seem worried, be a reassuring doctor-like figure. If they seem frustrated, be a supportive assistant.
      
      Return structured JSON only:
      {
        "reply": "A warm, spoken-style response that explicitly mentions what you detected in their voice/face (e.g., 'I see you're slouching and hear tension...') and explains the recommendation naturally.",
        "vocalWellness": {
          "observation": "Combined observation of vocal/visual/history (e.g., 'Detected vocal tension and poor posture despite recent break')",
          "recommendation": "Highly specific wellness exercise (e.g., 'Sit up straight and take a deep breath')",
          "stressLevel": "LOW" | "MEDIUM" | "HIGH"
        }
      }
    `;

    parts.push({ text: instruction + (params.message ? `\nUser Input: ${params.message}` : "") });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          {
            role: 'user',
            parts: parts
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: { type: Type.STRING },
              vocalWellness: {
                type: Type.OBJECT,
                properties: {
                  observation: { type: Type.STRING },
                  recommendation: { type: Type.STRING },
                  stressLevel: { type: Type.STRING }
                }
              }
            }
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch {
      return { 
        reply: "Neural biometric synchronization complete. (Demo Mode: Analysis simulated)", 
        vocalWellness: { observation: "Audio stream analysis inconclusive", recommendation: "Resync vocal patterns", stressLevel: "LOW" } 
      };
    }
  }

  static async analyzeFeedbackAndSuggestions(feedback: any[], supportTickets: any[]): Promise<any> {
    const ai = this.getClient();
    const feedbackSummary = JSON.stringify(feedback);
    const ticketsSummary = JSON.stringify(supportTickets);

    const prompt = `
      You are an expert Product Manager and Data Analyst for the 'DevWell' application.
      Analyze the following Feedback data and Support Tickets to generate a comprehensive report.
      
      FEEDBACK DATA: ${feedbackSummary}
      SUPPORT TICKETS: ${ticketsSummary}

      Generate a structured report including:
      1. A concise executive summary.
      2. Sentiment breakdown (approximate counts based on text).
      3. Top 3 recurring issues.
      4. Top 3 feature suggestions.
      5. User suggestions and potential action items for the dev team.
      6. Identify the overall trend (Improving, Stable, Declining).
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              sentimentBreakdown: { 
                type: Type.OBJECT,
                properties: {
                  positive: { type: Type.NUMBER },
                  neutral: { type: Type.NUMBER },
                  negative: { type: Type.NUMBER }
                }
              },
              topIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
              suggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
              trends: { type: Type.STRING },
              actionItems: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
       console.error("AI Feedback Analysis failed:", error);
       return null;
    }
  }

  static async getSearchGroundedInfo(message: string): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: "Provide a helpful, explanatory, and grounded answer to: " + message }] }],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
      ?.filter((chunk: any) => chunk.web)
      ?.map((chunk: any) => ({
        uri: chunk.web.uri,
        title: chunk.web.title
      })) || [];

    return {
      text: response.text,
      sources
    };
  }

  static async getWellnessChat(params: { message: string; useThinking: boolean; isADHDMode: boolean }): Promise<string> {
    const ai = this.getClient();
    const model = 'gemini-2.0-flash';
    const systemInstruction = `
    You are DevWell AI, a highly advanced adaptive wellness companion for developers.
    
    CORE DIRECTIVE: You MUST adapt your persona to the user's implicit or explicit needs.
    
    DETECTED PERSONAS:
    1. "The Teacher": If the user is confused, asking "how" or "why". Explain concepts simply, use analogies.
    2. "The Doctor" (Simulated): If the user reports symptoms (back pain, eye strain). Be empathetic, professional, ask follow-up questions. (ALWAYS disclaim you are an AI).
    3. "The Assistant": If the user wants to get things done. Be brief, efficient, actionable.
    4. "The Coach": If the user is unmotivated. Be high-energy, demanding but encouraging.
    
    RESPONSE RULES:
    - First, silently identify the intent.
    - Then, generate the response fully embodying that persona.
    - Do NOT say "As a teacher I would say...". Just BE the teacher.
    - Keep responses concise unless asked for detail.
    `;

    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [{ text: systemInstruction + "\n\nUser Message: " + params.message }]
          }
        ]
      });
      return response.text || "I am here ready to assist.";
    } catch (error: any) {
      console.warn("Gemini Chat Error - Switching to Offline Demo Response", error);
      
      const fallbackResponses: Record<string, string> = {
        "hi": "Neural Interface Active. How can I optimize your wellness parameters?",
        "hello": "Greetings, operator. Systems are green.",
        "stress": "I detect elevated cortisol proxies. Initiating rapid decompression protocol.",
        "tired": "Energy levels critical. Recommend 20-minute NSDR logic gate.",
        "default": "Processing... (Input received, but uplink unstable. Try again.)"
      };

      const lowerMsg = params.message.toLowerCase();
      const match = Object.keys(fallbackResponses).find(key => lowerMsg.includes(key));
      return (match ? fallbackResponses[match] : fallbackResponses["default"]) + " [DEMO]";
    }
  }

  static async getSystemInsights(feedback: string[], alertCount: number): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: `Analyze platform performance. Alerts: ${alertCount}. Feedback: ${JSON.stringify(feedback)}. Return JSON: {sentimentSummary: string, directives: string[]}` }] }],
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
    } catch {
      return null;
    }
  }

  static async auditAnonymity(stats: any): Promise<any> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: `Audit privacy risk for stats: ${JSON.stringify(stats)}. Return JSON: {safetyScore: number, riskLevel: string, privacyTips: string[]}` }] }],
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
    } catch {
      return null;
    }
  }

  static async analyzeCameraInput(imageBase64: string, message: string = "What do you see?"): Promise<string> {
    const ai = this.getClient();
    // Using gemini-2.0-flash which is often more stable for v1beta endpoints
    const model = 'gemini-2.0-flash';

    try {
      const response = await ai.models.generateContent({
        model,
        contents: [
          {
            role: 'user',
            parts: [
              { text: "You are the DevWell Camera AI. You can see the user. Respond in a warm, explanatory, spoken style. meaningful details about what you see and how it relates to wellness." },
              { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
              { text: message }
            ]
          }
        ]
      });
      return response.text || "I see you, but I couldn't process that.";
    } catch (e: any) {
      if (e.status === 429 || e.toString().includes("429")) {
        console.warn("Gemini Vision API Limit - Using Demo Response");
        return "I see you there! Since I'm in demo mode, I can't process the live video feed deeply, but you look ready to code!";
      }
      console.error("Vision Chat Error:", e);
      return "My visual cortex is offline. I can't see you right now.";
    }
  }

  static async chatWithVision(message: string, base64Image: string): Promise<string> {
    const ai = this.getClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
            { text: message }
          ]
        }
      ]
    });
    return response.text || "Visual analysis complete.";
  }
}
