const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      }),
    });

    const data = await response.json();
    res.json({ reply: data.choices?.[0]?.message?.content || "No response." });
  } catch (err) {
    res.status(500).json({ error: "Failed to contact OpenAI." });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));