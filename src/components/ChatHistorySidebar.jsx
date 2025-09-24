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
  onToggle 
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
      
      <div className={`fixed lg:relative top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-80 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800 flex items-center">
            <History className="w-5 h-5 mr-2" />
            Chat History
          </h2>
          <button onClick={onToggle} className="lg:hidden p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={onNewChat}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
          >
            New Weather Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {chatHistory.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No chat history yet</p>
              <p className="text-xs text-gray-400 mt-1">Start a conversation to see it here</p>
            </div>
          ) : (
            chatHistory.map((chat) => (
              <div key={chat.id} className={`group border rounded-lg p-3 cursor-pointer transition-all duration-200 ${currentChatId === chat.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>

                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {editingId === chat.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="border px-2 py-1 rounded w-full text-sm"
                          onKeyDown={(e) => e.key === "Enter" && saveTitle(chat.id)}
                        />
                        <button onClick={() => saveTitle(chat.id)} className="p-1 hover:text-green-500">
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <h3 className="font-medium text-sm text-gray-800 truncate">
                        {chat.title}
                      </h3>
                    )}

                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {chat.createdAt.toLocaleDateString()}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {editingId !== chat.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(chat);
                        }}
                        className="p-1 hover:bg-white rounded text-gray-500 hover:text-blue-500"
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
                      className="p-1 hover:bg-white rounded text-gray-500 hover:text-blue-500"
                      title="Export as PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className="p-1 hover:bg-white rounded text-gray-500 hover:text-red-500"
                      title="Delete chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {chat.messages.length > 0 && (
                  <div className="mt-2 text-xs text-gray-500 truncate">
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
