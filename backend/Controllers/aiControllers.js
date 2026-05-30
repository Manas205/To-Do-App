const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const suggestSteps = async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const prompt = `
You are a productivity assistant.
Break this task into 5-7 clear actionable subtasks.
Return ONLY a JSON array of strings, no extra text.

Task: "${task}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const raw = response.text.replace(/```json|```/g, "").trim();
    const steps = JSON.parse(raw);

    return res.status(200).json({ success: true, steps });

  } catch (error) {
    console.error("AI Error:", error.message);
    return res.status(500).json({ error: "Failed to generate steps" });
  }
};

module.exports = suggestSteps;