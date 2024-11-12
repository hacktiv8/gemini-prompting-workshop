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
        contents: [{ parts: [{ text: instruction(prompt) }] }],
      }),
    });
    const { candidates } = await req.json();
    return candidates[0].content.parts[0].text;
  } catch (err) {
    console.error(err);
  }
}

function instruction(prompt) {
  return `You are a travel assistant.
Example
User: "I want to fly from Jakarta to Medan"
Assistant: Airport codes [CGK, KNO]
User: ${prompt}
`;
}
