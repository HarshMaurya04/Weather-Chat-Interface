import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { generatePDF } from '../utils/generatePDF';

export const useChatManager = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messages, setMessages] = useState([]);

  const generateChatTitle = (firstMessage) => {
    if (!firstMessage) return "New Chat";
    const words = firstMessage.split(" ").slice(0, 5);
    return words.join(" ") + (firstMessage.split(" ").length > 5 ? "..." : "");
  };

  const createNewChat = (userMessage) => {
    const newChatId = Date.now().toString();
    const newChat = {
      id: newChatId,
      title: generateChatTitle(userMessage),
      messages: [],
      createdAt: new Date(),
    };
    setChatHistory((prev) => [newChat, ...prev]);
    setCurrentChatId(newChatId);
    return newChatId;
  };

  const selectChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      return true;
    }
    return false;
  };

  const deleteChat = (chatId) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
    toast.info("Chat deleted successfully.");
  };

  const startNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
  };

  const renameChat = (chatId, newTitle) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      )
    );
  };

  const exportChat = (chat) => {
    try {
      generatePDF(chat, chat.title);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download PDF. Please try again.");
    }
  };

  const getCurrentChatTitle = () => {
    if (currentChatId) {
      const chat = chatHistory.find((c) => c.id === currentChatId);
      return chat?.title;
    }
    return null;
  };

  // Update chat history when messages change
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      setChatHistory((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...messages] }
            : chat
        )
      );
    }
  }, [messages, currentChatId]);

  return {
    // State
    chatHistory,
    currentChatId,
    messages,
    setMessages,
    
    // Actions
    createNewChat,
    selectChat,
    deleteChat,
    startNewChat,
    renameChat,
    exportChat,
    getCurrentChatTitle,
  };
};