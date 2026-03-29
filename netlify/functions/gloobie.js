exports.handler = async (event) => {
  // This automatically finds the variable you ALREADY made in Netlify
  const API_KEY = process.env.VITE_GLOOBIE_KEY; 
  const { message } = JSON.parse(event.body);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Bridge broken" }) };
  }
};
