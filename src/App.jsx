import { useState, useEffect } from "react";
import ChatHistorySidebar from "./components/ChatHistorySidebar";
import ChatWindow from "./components/ChatWindow";
import useWeatherAPI from "./hooks/useWeatherAPI";
import { generatePDF } from "./utils/generatePDF";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const threadId = "YOUR_COLLEGE_ROLL_NUMBER"; // Replace with actual roll number
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const generateChatTitle = (firstMessage) => {
    if (!firstMessage) return "New Chat";
    const words = firstMessage.split(" ").slice(0, 5);
    return words.join(" ") + (firstMessage.split(" ").length > 5 ? "..." : "");
  };

  const handleNewChunk = (chunk) => {
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
  };

  const { sendMessage, loading, error } = useWeatherAPI(handleNewChunk);

  const handleSend = async (userMessage) => {
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

    if (currentChatId === null) {
      const newChatId = Date.now().toString();
      const newChat = {
        id: newChatId,
        title: generateChatTitle(userMessage),
        messages: currentMessages,
        createdAt: new Date(),
      };
      setChatHistory((prev) => [newChat, ...prev]);
      setCurrentChatId(newChatId);
    }

    const apiMessages = currentMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
    await sendMessage(apiMessages, threadId);
  };

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

  const handleSelectChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setSidebarOpen(false);
    }
  };

  const handleDeleteChat = (chatId) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      setCurrentChatId(null);
      setMessages([]);
    }
    toast.info("Chat deleted successfully.");
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setSidebarOpen(false);
  };

  const handleExportChat = (chat) => {
    try {
      generatePDF(chat, chat.title);
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download PDF. Please try again.");
    }
  };

  const handleRenameChat = (chatId, newTitle) => {
    setChatHistory((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, title: newTitle } : chat
      )
    );
  };

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getCurrentChatTitle = () => {
    if (currentChatId) {
      const chat = chatHistory.find((c) => c.id === currentChatId);
      return chat?.title;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
      <div className="flex h-screen">
        <ChatHistorySidebar
          chatHistory={chatHistory}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          onNewChat={handleNewChat}
          onExportChat={handleExportChat}
          onRenameChat={handleRenameChat}
          isOpen={sidebarOpen}
          onToggle={handleToggleSidebar}
        />

        <div className="flex-1 p-4">
          <div className="h-full max-w-4xl mx-auto">
            <ChatWindow
              messages={messages}
              onSend={handleSend}
              loading={loading}
              currentChatTitle={getCurrentChatTitle()}
              onToggleSidebar={handleToggleSidebar}
            />

            {/* Inline connection error section remains untouched */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-red-700 text-sm font-medium">
                    Connection Error
                  </span>
                </div>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <p className="text-red-500 text-xs mt-2">
                  Please check your internet connection and try again.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
