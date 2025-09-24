import { useState } from "react";

function useWeatherAPI(onChunkReceived) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (messages, threadId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://brief-thousands-sunset-9fcb1c78-485f-4967-ac04-2759a8fa1462.mastra.cloud/api/agents/weatherAgent/stream",
        {
          method: "POST",
          headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "x-mastra-dev-playground": "true"
          },
          body: JSON.stringify({
            messages,
            runId: "weatherAgent",
            maxRetries: 2,
            maxSteps: 5,
            temperature: 0.5,
            topP: 1,
            runtimeContext: {},
            threadId,
            resourceId: "weatherAgent"
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const data = line.replace("data:", "").trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                onChunkReceived(parsed.content);
              }
            } catch (err) {
              console.error("Failed to parse SSE chunk:", err);
            }
          }
        }
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
}

export default useWeatherAPI;
