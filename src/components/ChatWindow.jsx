import { useRef, useEffect } from "react";
import { History, Sun, CloudRain, Moon, Cloud } from "lucide-react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import LoadingIndicator from "./LoadingIndicator";

function ChatWindow({
  messages,
  onSend,
  loading,
  currentChatTitle,
  onToggleSidebar,
  theme,
  toggleTheme,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleThemeToggle = () => {
    if (toggleTheme) {
      toggleTheme();
    }
  };

  return (
    <div className={`flex flex-col h-full rounded-xl shadow-lg border overflow-hidden transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Header */}
      <div className={`px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-700 text-white'
          : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
      }`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <History className="w-5 h-5" />
          </button>
          <div className="bg-white/20 p-2 rounded-full">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">
              {currentChatTitle || "Weather Assistant"}
            </h1>
            <p className={`text-sm transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-300' : 'text-blue-100'
            }`}>
              Ask me about weather anywhere!
            </p>
          </div>
        </div>
        
        {/* Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className={`p-2 rounded-full transition-all duration-200 ${
            theme === 'dark'
              ? 'hover:bg-gray-600 text-yellow-400'
              : 'hover:bg-white/20 text-white'
          }`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Messages Area */}
      <div className={`flex-1 overflow-y-auto p-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        {messages.length === 0 ? (
          <div className={`flex flex-col items-center justify-center h-full transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <CloudRain className={`w-16 h-16 mb-4 transition-colors duration-300 ${
              theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
            }`} />
            <h2 className="text-xl font-medium mb-2">Welcome to Weather Chat!</h2>
            <p className="text-center text-sm max-w-sm">
              Ask me about the weather in any city. Try questions like:
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className={`p-2 rounded-lg border transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                "What's the weather in London?"
              </div>
              <div className={`p-2 rounded-lg border transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                "Will it rain tomorrow in New York?"
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <Message key={idx} message={msg} theme={theme} />
            ))}
            {loading && <LoadingIndicator theme={theme} />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput onSend={onSend} disabled={loading} theme={theme} />
    </div>
  );
}

export default ChatWindow;