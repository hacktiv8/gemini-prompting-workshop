export async function analyze(feedback) {
  return {
    color: "red",
    analysis: "Analyzing...",
  };
}
export async function generate(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-
latest:generateContent?key=${process.env.API_KEY}`;
  try {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generation_config: {
          temperature: 0,
          top_p: 1.0,
          top_k: 40,
        },
      }),
    });
    const { candidates } = await req.json();
    return candidates[0].content.parts[0].text;
  } catch (err) {
    console.error(err);
  }
}

function instruction(prompt) {
  return `You are a travel assistant. You decide one best airport.

Example
User: "I want to fly from Jakarta to Medan"
Assistant: Airport codes [CGK, KNO]

User: "I want to fly from Jakarta to Beijing"
Assistant: Airport codes [CGK, PEK]

User: "I want to fly from Jakarta to California"
Assistant: Airport codes [CGK, SFO]

Now it's your turn!

User: ${prompt}
`;
}
