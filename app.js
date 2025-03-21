require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

//!Express instance
const app = express();
//!Middlewares
const corsOptions = {
    origin: ["https://vchat-gemini.vercel.app"],
};
app.use(cors(corsOptions));

app.use(express.json());
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

//!Generate content route
app.post("/generate", async (req, res) => {
    const { prompt } = req.body;
    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.send(text);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to generate content");
    }
});

//!Start the server
app.listen(5000, console.log("Server is running"));