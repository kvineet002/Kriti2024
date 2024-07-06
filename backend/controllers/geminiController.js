const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
const geminiResponse = async (req, res) => {
    try {
        const {prompt} = req.body;
        // const prompt = "Write a brief story about a AI and magic in json"

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json(text)
    }
    catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = {geminiResponse}