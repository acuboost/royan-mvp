// netlify/functions/proxy-hf.js
export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const HF_API_KEY = process.env.HF_API_KEY; // Uses your Netlify secret
    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-large", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: body.inputs })
    });

    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.toString() })
    };
  }
}
