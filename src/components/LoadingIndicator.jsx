function LoadingIndicator() {
  return (
    <div className="flex items-center justify-start mb-4">
      <div className="bg-gray-100 border border-gray-200 rounded-2xl px-4 py-3 max-w-xs">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
          <span className="text-gray-600 text-sm">Weather agent is thinking...</span>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
