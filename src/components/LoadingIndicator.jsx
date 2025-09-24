function LoadingIndicator({ theme }) {
  return (
    <div className="flex items-center justify-start mb-4">
      <div className={`rounded-2xl px-4 py-3 max-w-xs transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gray-700 border border-gray-600'
          : 'bg-gray-100 border border-gray-200'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
          <span className={`text-sm transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Weather agent is thinking...
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;