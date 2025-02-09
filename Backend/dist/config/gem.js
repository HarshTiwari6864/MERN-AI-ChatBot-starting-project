//import { Configuration } from "openai";
/*export const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPENAI_ORAGANIZATION_ID,
  });
  return config;
};*/
import { GoogleGenerativeAI } from "@google/generative-ai";
export const configureGemini = () => {
    return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};
//# sourceMappingURL=gem.js.map