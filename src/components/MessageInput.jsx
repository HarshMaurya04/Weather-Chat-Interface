import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

function MessageInput({ onSend, disabled, theme, currentTheme }) {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

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

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [text]);

  const placeholder =
    "Ask me about weather conditions, forecasts, or climate patterns...";

  return (
    <div
      className={`border-t p-6 transition-all duration-500 ${currentTheme.border.primary} ${currentTheme.background.card} backdrop-blur-sm relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div
        className={`absolute inset-0 ${
          isFocused
            ? theme === "light"
              ? "bg-gradient-to-r from-blue-50/50 via-transparent to-blue-50/50"
              : "bg-gradient-to-r from-blue-900/20 via-transparent to-blue-900/20"
            : "bg-transparent"
        } transition-all duration-500`}
      />

      <div className="relative z-10">
        <div
          className={`flex items-end space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
            currentTheme.background.input
          } backdrop-blur-sm ${
            isFocused
              ? `${currentTheme.border.focus} ${currentTheme.shadow.md} scale-[1.02]`
              : `${currentTheme.border.primary} ${currentTheme.shadow.sm} hover:${currentTheme.border.hover}`
          }`}
        >
          {/* Text Input */}
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              disabled={disabled}
              rows="1"
              className={`w-full px-2 py-1 bg-transparent border-none resize-none focus:outline-none transition-all duration-200 placeholder:transition-colors ${
                disabled
                  ? `${currentTheme.text.muted} cursor-not-allowed`
                  : `${currentTheme.text.primary} placeholder:${currentTheme.text.muted}`
              }`}
              style={{
                minHeight: "24px",
                maxHeight: "120px",
              }}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={disabled || text.trim() === ""}
            className={`relative p-3 rounded-xl transition-all duration-300 group ${
              disabled || text.trim() === ""
                ? `${currentTheme.background.primary} ${currentTheme.text.muted} cursor-not-allowed`
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl"
            } overflow-hidden`}
            aria-label="Send message"
          >
            {/* Button shine effect */}
            {!disabled && text.trim() !== "" && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            )}

            <Send className="w-5 h-5 relative z-10" />
          </button>
        </div>

        {/* Input suggestions */}
        {text === "" && !isFocused && (
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              "Current weather",
              "5-day forecast",
              "Severe alerts",
              "Weather maps",
            ].map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setText(suggestion + " in ")}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${currentTheme.background.hover} ${currentTheme.text.muted} hover:${currentTheme.text.accent} hover:scale-105`}
                disabled={disabled}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageInput;
