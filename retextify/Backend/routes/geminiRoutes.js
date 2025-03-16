import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY is missing in .env file");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

router.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;

        if (!response || !response.candidates) {
            throw new Error("Invalid API response");
        }

        const text = response.candidates[0]?.content?.parts[0]?.text;

        if (!text) {
            return res.status(500).json({ error: "AI did not return a response" });
        }

        res.json({ text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
