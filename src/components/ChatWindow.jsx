import { useRef, useEffect } from "react";
import { History, Sun, CloudRain, Moon, Cloud, Sparkles } from "lucide-react";
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
  currentTheme
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
    <div className={`flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500 ${currentTheme.background.card} ${currentTheme.border.primary} border ${currentTheme.shadow.lg}`}>
      {/* Enhanced Header */}
      <div className={`px-6 py-5 flex items-center justify-between transition-all duration-500 ${currentTheme.background.header} relative overflow-hidden`}>
        {/* Header background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="flex items-center space-x-4 relative z-10">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2.5 hover:bg-white/20 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <History className="w-5 h-5 text-white" />
          </button>
          
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-lg">
            <Cloud className="w-7 h-7 text-white" />
          </div>
          
          <div>
            <h1 className="font-semibold text-lg text-white flex items-center gap-2">
              {currentChatTitle || "Weather Assistant"}
              <Sparkles className="w-4 h-4 text-blue-200" />
            </h1>
            <p className="text-sm text-blue-100 opacity-90">
              Your AI-powered weather companion
            </p>
          </div>
        </div>
        
        {/* Enhanced Theme Toggle Button */}
        <button
          onClick={handleThemeToggle}
          className={`relative p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
            theme === 'dark'
              ? 'bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-300 hover:text-yellow-200'
              : 'bg-white/20 hover:bg-white/30 text-white hover:shadow-lg'
          } backdrop-blur-sm`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <div className="relative">
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
            <div className={`absolute inset-0 rounded-full blur-md opacity-50 ${
              theme === 'dark' ? 'bg-yellow-300' : 'bg-white'
            }`} />
          </div>
        </button>
      </div>

      {/* Enhanced Messages Area */}
      <div className={`flex-1 overflow-y-auto p-6 transition-all duration-500 ${currentTheme.background.secondary} relative`}>
        {/* Subtle pattern overlay */}
        <div className={`absolute inset-0 opacity-30 ${
          theme === 'light' 
            ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03)_0%,transparent_50%)]'
            : 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05)_0%,transparent_50%)]'
        }`} />
        
        {messages.length === 0 ? (
          <div className={`flex flex-col items-center justify-center h-full ${currentTheme.text.muted} relative z-10`}>
            <div className={`p-6 rounded-full mb-5 ${currentTheme.background.card} ${currentTheme.shadow.md} transition-all duration-500 hover:scale-105`}>
              <CloudRain className={`w-20 h-20 ${currentTheme.text.accent}`} />
            </div>
            
            <h2 className={`text-2xl font-semibold mb-3 ${currentTheme.text.primary}`}>
              Welcome to Weather Chat!
            </h2>
            
            <p className={`text-center text-base max-w-lg mb-5 ${currentTheme.text.secondary} leading-relaxed`}>
              I'm your intelligent weather assistant. Ask me about current conditions, forecasts, or weather patterns anywhere in the world.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              {[
                { icon: "🌤️", text: "What’s the weather in Mumbai?" },
                { icon: "🌧️", text: "Will it rain tomorrow in Delhi?" },
                { icon: "🌡️", text: "Temperature forecast this week in Bangalore?" },
                { icon: "🌫️", text: "Air quality in Delhi NCR?" }
              ].map((example, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-xl border transition-all duration-300 hover:scale-105 cursor-pointer ${currentTheme.background.card} ${currentTheme.border.primary} ${currentTheme.shadow.sm} hover:shadow-md group`}
                  onClick={() => onSend(example.text)}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{example.icon}</span>
                    <span className={`text-sm font-medium ${currentTheme.text.secondary} group-hover:${currentTheme.text.primary} transition-colors duration-200`}>
                      {example.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative z-10">
            {messages.map((msg, idx) => (
              <Message key={idx} message={msg} theme={theme} currentTheme={currentTheme} />
            ))}
            {loading && <LoadingIndicator theme={theme} currentTheme={currentTheme} />}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Message Input */}
      <MessageInput onSend={onSend} disabled={loading} theme={theme} currentTheme={currentTheme} />
    </div>
  );
}

export default ChatWindow;