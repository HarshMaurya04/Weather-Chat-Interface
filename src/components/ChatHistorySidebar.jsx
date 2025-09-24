import { History, X, FileText, Calendar, Download, Trash2, Edit3, Check } from "lucide-react";
import { useState } from "react";

function ChatHistorySidebar({
  chatHistory,
  currentChatId,
  onSelectChat,
  onDeleteChat,
  onNewChat,
  onExportChat,
  onRenameChat,
  isOpen,
  onToggle,
  theme // Add theme prop
}) {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  const startEditing = (chat) => {
    setEditingId(chat.id);
    setNewTitle(chat.title);
  };

  const saveTitle = (chatId) => {
    onRenameChat(chatId, newTitle.trim() || "Untitled Chat");
    setEditingId(null);
    setNewTitle("");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      <div className={`fixed lg:relative top-0 left-0 h-full border-r z-50 transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } w-80 flex flex-col ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between transition-colors duration-300 ${
          theme === 'dark' 
            ? 'border-gray-700' 
            : 'border-gray-200'
        }`}>
          <h2 className={`font-semibold flex items-center transition-colors duration-300 ${
            theme === 'dark' 
              ? 'text-gray-200' 
              : 'text-gray-800'
          }`}>
            <History className="w-5 h-5 mr-2" />
            Chat History
          </h2>
          <button 
            onClick={onToggle} 
            className={`lg:hidden p-1 rounded transition-colors duration-300 ${
              theme === 'dark'
                ? 'hover:bg-gray-700 text-gray-200'
                : 'hover:bg-gray-100 text-gray-800'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={onNewChat}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            New Weather Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatHistory.length === 0 ? (
            <div className={`text-center py-8 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'text-gray-400' 
                : 'text-gray-500'
            }`}>
              <FileText className={`w-12 h-12 mx-auto mb-3 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-600' 
                  : 'text-gray-300'
              }`} />
              <p className="text-sm">No chat history yet</p>
              <p className={`text-xs mt-1 transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-500' 
                  : 'text-gray-400'
              }`}>
                Start a conversation to see it here
              </p>
            </div>
          ) : (
            chatHistory.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => onSelectChat(chat.id)} 
                className={`group border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                  currentChatId === chat.id 
                    ? theme === 'dark'
                      ? 'border-blue-500 bg-gray-700'
                      : 'border-blue-500 bg-blue-50'
                    : theme === 'dark'
                      ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {editingId === chat.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className={`border px-2 py-1 rounded w-full text-sm transition-colors duration-300 ${
                            theme === 'dark'
                              ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-300'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                          onKeyDown={(e) => e.key === "Enter" && saveTitle(chat.id)}
                          placeholder="Chat title..."
                        />
                        <button 
                          onClick={() => saveTitle(chat.id)} 
                          className={`p-1 transition-colors duration-300 ${
                            theme === 'dark'
                              ? 'text-gray-400 hover:text-green-400'
                              : 'text-gray-500 hover:text-green-500'
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <h3 className={`font-medium text-sm truncate transition-colors duration-300 ${
                        theme === 'dark' 
                          ? 'text-gray-200' 
                          : 'text-gray-800'
                      }`}>
                        {chat.title}
                      </h3>
                    )}

                    <div className={`flex items-center mt-1 text-xs transition-colors duration-300 ${
                      theme === 'dark' 
                        ? 'text-gray-400' 
                        : 'text-gray-500'
                    }`}>
                      <Calendar className="w-3 h-3 mr-1" />
                      {chat.createdAt.toLocaleDateString()}
                    </div>
                    <p className={`text-xs mt-1 transition-colors duration-300 ${
                      theme === 'dark' 
                        ? 'text-gray-300' 
                        : 'text-gray-600'
                    }`}>
                      {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {editingId !== chat.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(chat);
                        }}
                        className={`p-1 rounded transition-colors duration-300 ${
                          theme === 'dark'
                            ? 'hover:bg-gray-600 text-gray-400 hover:text-blue-400'
                            : 'hover:bg-white text-gray-500 hover:text-blue-500'
                        }`}
                        title="Rename chat"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExportChat(chat);
                      }}
                      className={`p-1 rounded transition-colors duration-300 ${
                        theme === 'dark'
                          ? 'hover:bg-gray-600 text-gray-400 hover:text-blue-400'
                          : 'hover:bg-white text-gray-500 hover:text-blue-500'
                      }`}
                      title="Export as PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className={`p-1 rounded transition-colors duration-300 ${
                        theme === 'dark'
                          ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400'
                          : 'hover:bg-white text-gray-500 hover:text-red-500'
                      }`}
                      title="Delete chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {chat.messages.length > 0 && (
                  <div className={`mt-2 text-xs truncate transition-colors duration-300 ${
                    theme === 'dark' 
                      ? 'text-gray-400' 
                      : 'text-gray-500'
                  }`}>
                    Last: {chat.messages[chat.messages.length - 1]?.content?.substring(0, 50)}...
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ChatHistorySidebar;