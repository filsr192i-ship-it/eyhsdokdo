import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required but was not found.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API to generate learning reflection based on keywords
app.post("/api/generate-reflection", async (req, res) => {
  try {
    const { keywords } = req.body;
    if (!keywords || typeof keywords !== "string" || !keywords.trim()) {
      return res.status(400).json({ error: "키워드를 입력해 주세요." });
    }

    const ai = getGeminiClient();
    const prompt = `
      사용자가 입력한 독도 교육 과정 해결 키워드: "${keywords}"
      
      이 키워드들을 자연스럽게 녹여내어, 한·일 역사 관계 속의 독도의 실효적 주권, 국제법적 지위, 그리고 감정적 대립을 넘어선 객관적인 역사 사실 발견과 평화적 미래 지향적 태도의 중요성에 관한 배운 소감문을 작성해 주세요.
      
      [소감문 작성 지침]
      1. 대상자는 중고등학교 역사 및 지리 수업을 마친 학생입니다.
      2. 지나치게 격식적이거나 딱딱하지 않게, 진정성 있고 설득력 있으며 진솔한 고백적 문체(경어체, ~습니다/입니다)로 작성해 주세요.
      3. 독도의 지리적 의의(예: 울릉도에서의 가시성)나 강치 멸종의 아픔, 태정관지령 등의 증거, 안용복의 헌신, 또는 배타적경제수역(EEZ) 타협의 아픔과 미래 한일 세대의 상생 중 입력된 키워드와 연관된 내용을 한 문장으로라도 멋지게 서술해 주세요.
      4. 분량은 가독성을 위해 250자에서 400자 내외의 2~3개의 짧은 단락으로 완성해 주세요.
      5. 마크다운 기호 없이, 줄바꿈을 포함한 깔끔한 일련의 텍스트 형태로 작성해 주세요.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        systemInstruction: "당신은 대한민국의 중고등학생 역사 및 영토 주권 교육을 보조하는 전문 역사 선생님이자 평화교육가입니다. 단원의 키워드를 받아 영토 주권에 대한 주체적이고도 객관적인 평화 지향적 성찰을 담은 완성도 높은 소감문을 작성해 줍니다.",
      }
    });

    const text = response.text;
    res.json({ text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: error.message || "Gemini API를 호출하는 도중 내부 오류가 발생했습니다. 설정 > Secrets에서 GEMINI_API_KEY 상태를 점검해 주세요." 
    });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
