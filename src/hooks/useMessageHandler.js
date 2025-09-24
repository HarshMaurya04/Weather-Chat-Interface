import { useCallback } from 'react';
import useWeatherAPI from '../hooks/useWeatherAPI';

export const useMessageHandler = (messages, setMessages, currentChatId, createNewChat) => {
  const threadId = "YOUR_COLLEGE_ROLL_NUMBER";

  const handleNewChunk = useCallback((chunk) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage && lastMessage.role === "agent") {
        const updatedMessages = [...prevMessages];
        updatedMessages[prevMessages.length - 1] = {
          ...lastMessage,
          content: lastMessage.content + chunk,
        };
        return updatedMessages;
      }
      return prevMessages;
    });
  }, [setMessages]);

  const { sendMessage, loading, error } = useWeatherAPI(handleNewChunk);

  const handleSend = useCallback(async (userMessage) => {
    const newUserMsg = {
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    };
    const currentMessages = [...messages, newUserMsg];

    setMessages([
      ...currentMessages,
      { role: "agent", content: "", timestamp: new Date() },
    ]);

    // Create new chat if needed
    if (currentChatId === null) {
      createNewChat(userMessage);
    }

    const apiMessages = currentMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
    
    await sendMessage(apiMessages, threadId);
    
    // Log errors to console instead of showing in UI
    if (error) {
      console.error("Weather API Error:", error);
    }
  }, [messages, setMessages, currentChatId, createNewChat, sendMessage, error]);

  return {
    handleSend,
    loading,
    error,
  };
};