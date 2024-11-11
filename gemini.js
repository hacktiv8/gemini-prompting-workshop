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
      }),
    });
    const { candidates } = await req.json();
    return candidates[0].content.parts[0].text;
  } catch (err) {
    console.error(err);
  }
}
