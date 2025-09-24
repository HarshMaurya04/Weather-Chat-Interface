import { useRef, useEffect } from "react";
import { History, Sun, CloudRain } from "lucide-react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import LoadingIndicator from "./LoadingIndicator";

function ChatWindow({ messages, onSend, loading, currentChatTitle, onToggleSidebar }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <History className="w-5 h-5" />
          </button>
          <div className="bg-white/20 p-2 rounded-full">
            <Sun className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">
              {currentChatTitle || "Weather Assistant"}
            </h1>
            <p className="text-blue-100 text-sm">Ask me about weather anywhere!</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <CloudRain className="w-16 h-16 mb-4 text-gray-300" />
            <h2 className="text-xl font-medium mb-2">Welcome to Weather Chat!</h2>
            <p className="text-center text-sm max-w-sm">
              Ask me about the weather in any city. Try questions like:
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                "What's the weather in London?"
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-200">
                "Will it rain tomorrow in New York?"
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <Message key={idx} message={msg} />
            ))}
            {loading && <LoadingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput onSend={onSend} disabled={loading} />
    </div>
  );
}

export default ChatWindow;
