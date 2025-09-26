import axios from "axios";
import "dotenv/config"; 

// Helper function to parse the JSON body from the request
function getBody(req) {
  return new Promise((resolve) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(JSON.parse(body));
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Correctly parse the body for both local and deployed environments
    const { messages, threadId } = await getBody(req);

    const VITE_WEATHER_API_KEY = process.env.VITE_WEATHER_API_KEY;
    const VITE_WEATHER_API_URL = process.env.VITE_WEATHER_API_URL;

    if (!messages || !threadId) {
      return res
        .status(400)
        .json({ message: "Missing required parameters" });
    }

    if (!VITE_WEATHER_API_KEY || !VITE_WEATHER_API_URL) {
      return res.status(500).json({
        message:
          "Server configuration error: Missing API credentials in .env file.",
      });
    }

    const response = await axios.post(
      `${VITE_WEATHER_API_URL}/api/agents/weatherAgent/stream`,
      {
        messages,
        runId: "weatherAgent",
        maxRetries: 2,
        maxSteps: 5,
        temperature: 0.5,
        topP: 1,
        runtimeContext: {},
        threadId,
        resourceId: "weatherAgent",
      },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "x-mastra-dev-playground": "true",
          Authorization: `Bearer ${VITE_WEATHER_API_KEY}`,
        },
        responseType: "stream",
      }
    );

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    response.data.pipe(res);
  } catch (error) {
    console.error("API Function Error:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred with the weather service." });
  }
}