import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/ia", async (req, res) => {
  const { mensagem } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é uma nutricionista esportiva focada em emagrecimento saudável."
        },
        {
          role: "user",
          content: mensagem
        }
      ]
    });

    res.json({ resposta: response.choices[0].message.content });
  } catch (erro) {
    res.status(500).json({ erro: "Erro na IA" });
  }
});

app.listen(3000, () => {
  console.log("IA rodando na porta 3000");
});
