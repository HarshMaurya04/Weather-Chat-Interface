import { Cloud, Zap } from "lucide-react";

function LoadingIndicator({ theme, currentTheme }) {
  return (
    <div className="flex items-center justify-start mb-6 group">
      {/* Avatar */}
      <div className={`flex-shrink-0 mr-3 transition-all duration-300 ${currentTheme.background.card} p-2.5 rounded-full ${currentTheme.border.primary} border ${currentTheme.shadow.md} group-hover:scale-110`}>
        <Cloud className={`w-4 h-4 ${currentTheme.text.accent}`} />
      </div>

      {/* Loading Message */}
      <div className={`rounded-2xl rounded-bl-md px-5 py-4 max-w-xs transition-all duration-300 ${currentTheme.background.card} ${currentTheme.border.primary} border backdrop-blur-sm ${currentTheme.shadow.sm} group-hover:${currentTheme.shadow.md} relative overflow-hidden`}>
        
        {/* Background shimmer effect */}
        <div className={`absolute inset-0 ${
          theme === 'light'
            ? 'bg-gradient-to-r from-transparent via-blue-50/50 to-transparent'
            : 'bg-gradient-to-r from-transparent via-blue-900/20 to-transparent'
        } -translate-x-full animate-pulse`} />
        
        <div className="flex items-center space-x-3 relative z-10">
          {/* Animated dots */}
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce shadow-sm"></div>
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: "0.2s" }}></div>
          </div>
          
          {/* Loading text */}
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${currentTheme.text.secondary}`}>
              Weather assistant is thinking
            </span>
            <Zap className={`w-3 h-3 ${currentTheme.text.accent} animate-pulse`} />
          </div>
        </div>

        {/* Progress bar */}
        <div className={`mt-3 h-1 rounded-full overflow-hidden ${
          theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
        }`}>
          <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse" style={{
            width: '60%',
            animation: 'loading-bar 2s ease-in-out infinite'
          }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0%, 100% { width: 20%; }
          50% { width: 80%; }
        }
      `}</style>
    </div>
  );
}

export default LoadingIndicator;