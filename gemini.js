export async function analyze(feedback) {
  const result = await generate(instruction(feedback));
  let value = {};

  switch (result.trim()) {
    case "Positive":
      value = {
        color: "cyan",
        analysis: result,
      };
      console.log(value);
      break;
    case "Negative":
      value = {
        color: "fuchsia",
        analysis: result,
      };
      break;
    default:
      value = {
        color: "zinc",
        analysis: result,
      };
      break;
  }
  return value;
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
  return `Your job is to categorize whether text has a positive or negative sentiment. Just return either Positive, Negative or Neutral. Here are some examples of text you might see:

User: I love this product! It's the best thing I've ever bought.
Assistant: Positive
User: Bagus sekali.
Assistant: Positive
User: Boring. Next.
Assistant: Negative
User: Meh..
Assistant: Neutral
User: Could be better.
Assistant: Neutral

Now it's your turn!

User: ${prompt}
Assistant:
`;
}
