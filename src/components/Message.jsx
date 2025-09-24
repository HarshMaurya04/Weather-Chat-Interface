import { Cloud } from "lucide-react";

function Message({ message }) {
  const isUser = message.role === "user";
  const formatTime = (timestamp) =>
    timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl break-words ${
        isUser ? "order-2" : "order-1"
      }`}>
        {!isUser && (
          <div className="flex items-center mb-1">
            <Cloud className="w-4 h-4 text-blue-500 mr-2" />
            <span className="text-xs font-medium text-gray-600">Weather Agent</span>
          </div>
        )}
        <div className={`rounded-2xl px-4 py-3 shadow-sm ${
          isUser 
            ? "bg-blue-500 text-white rounded-br-md" 
            : "bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-md"
        }`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {message.content}
          </div>
          <div className={`text-xs mt-2 ${isUser ? "text-blue-100" : "text-gray-500"}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
