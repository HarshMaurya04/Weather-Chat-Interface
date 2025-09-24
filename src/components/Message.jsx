import { Cloud, User } from "lucide-react";

function Message({ message, theme, currentTheme }) {
  const isUser = message.role === "user";
  const formatTime = (timestamp) =>
    timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <div className={`flex mb-6 ${isUser ? "justify-end" : "justify-start"} group`}>
      <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl break-words ${
        isUser ? "order-2" : "order-1"
      } flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-3 ${isUser ? "space-x-reverse" : ""}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 transition-all duration-300 ${
          isUser 
            ? `${currentTheme.message.user} p-2.5 rounded-full shadow-lg`
            : `${currentTheme.background.card} p-2.5 rounded-full ${currentTheme.border.primary} border ${currentTheme.shadow.md}`
        } group-hover:scale-110`}>
          {isUser ? (
            <User className="w-4 h-4" />
          ) : (
            <Cloud className={`w-4 h-4 ${currentTheme.text.accent}`} />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
          {!isUser && (
            <div className="flex items-center mb-2">
              <span className={`text-sm font-semibold ${currentTheme.text.accent}`}>
                Weather Assistant
              </span>
              <div className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                theme === 'light' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-blue-900/50 text-blue-300'
              }`}>
                AI
              </div>
            </div>
          )}
          
          <div className={`relative max-w-full transition-all duration-300 ${
            isUser
              ? `${currentTheme.message.user} rounded-2xl ${isUser ? "rounded-br-md" : ""} px-5 py-4 ${currentTheme.shadow.md}`
              : `${currentTheme.message.agent} rounded-2xl ${!isUser ? "rounded-bl-md" : ""} px-5 py-4 ${currentTheme.shadow.sm}`
          } backdrop-blur-sm hover:scale-[1.02] group-hover:${currentTheme.shadow.md}`}>
            
            {/* Message bubble decoration */}
            <div className={`absolute inset-0 rounded-2xl ${isUser ? "rounded-br-md" : "rounded-bl-md"} ${
              isUser 
                ? 'bg-gradient-to-br from-white/10 to-transparent' 
                : theme === 'light'
                  ? 'bg-gradient-to-br from-blue-50/80 to-transparent'
                  : 'bg-gradient-to-br from-blue-900/20 to-transparent'
            } opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative z-10">
              <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">
                {message.content}
              </div>
              
              <div className={`text-xs mt-3 flex items-center ${
                isUser ? "justify-end" : "justify-start"
              } ${
                isUser 
                  ? currentTheme.message.userTime
                  : currentTheme.message.agentTime
              } opacity-70 group-hover:opacity-100 transition-opacity duration-200`}>
                <span className="font-medium">{formatTime(message.timestamp)}</span>
                {!isUser && (
                  <div className={`ml-2 w-2 h-2 rounded-full ${
                    theme === 'light' ? 'bg-green-400' : 'bg-green-500'
                  } animate-pulse`} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;