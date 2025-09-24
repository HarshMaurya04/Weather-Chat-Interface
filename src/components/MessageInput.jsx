import { useState } from "react";
import { Send } from "lucide-react";

function MessageInput({ onSend, disabled }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "" || disabled) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="flex items-center space-x-3">
        <div className="flex-1 pt-1.5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about the weather... (e.g., 'What's the weather in London?')"
            disabled={disabled}
            rows="1"
            className={`w-full px-4 py-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
              disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white"
            }`}
            style={{
              minHeight: "48px",
              maxHeight: "120px",
              overflowY: text.length > 100 ? "scroll" : "hidden"
            }}
          />
        </div>
        <button
          onClick={handleSend}
          disabled={disabled || text.trim() === ""}
          className={`p-3 rounded-xl transition-all duration-200 shadow-sm ${
            disabled || text.trim() === ""
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-md active:scale-95"
          }`}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
