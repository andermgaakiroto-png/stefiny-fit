import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: "SUA_CHAVE_AQUI"
});

app.post("/ia", async (req, res) => {
    const pergunta = req.body.pergunta;

    const resposta = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: "system",
                content: "Você é um especialista em emagrecimento e alimentação saudável."
            },
            {
                role: "user",
                content: pergunta
            }
        ]
    });

    res.json({
        resposta: resposta.choices[0].message.content
    });
});

app.listen(3000, () => {
    console.log("🔥 IA rodando em http://localhost:3000");
});
