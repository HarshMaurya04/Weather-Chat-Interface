import { History, X, FileText, Calendar, Download, Trash2, Edit3, Check, Plus, Search } from "lucide-react";
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
  theme,
  currentTheme
}) {
  const [editingId, setEditingId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const startEditing = (chat) => {
    setEditingId(chat.id);
    setNewTitle(chat.title);
  };

  const saveTitle = (chatId) => {
    onRenameChat(chatId, newTitle.trim() || "Untitled Chat");
    setEditingId(null);
    setNewTitle("");
  };

  const filteredChats = chatHistory.filter(chat => 
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      <div className={`fixed lg:relative top-0 left-0 h-full border-r z-50 transform transition-all duration-500 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } w-80 flex flex-col ${currentTheme.background.sidebar} ${currentTheme.border.primary} backdrop-blur-md ${currentTheme.shadow.lg}`}>
        
        {/* Enhanced Header */}
        <div className={`p-6 border-b flex items-center justify-between transition-all duration-300 ${currentTheme.border.primary} relative overflow-hidden`}>
          
          {/* Header background decoration */}
          <div className={`absolute inset-0 ${
            theme === 'light' 
              ? 'bg-gradient-to-br from-blue-50/50 to-transparent'
              : 'bg-gradient-to-br from-blue-900/20 to-transparent'
          }`} />
          
          <div className="relative z-10 flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${currentTheme.background.card} ${currentTheme.shadow.sm}`}>
              <History className={`w-5 h-5 ${currentTheme.text.accent}`} />
            </div>
            <h2 className={`font-bold text-lg ${currentTheme.text.primary}`}>
              Chat History
            </h2>
          </div>
          
          <button 
            onClick={onToggle} 
            className={`lg:hidden p-2.5 rounded-xl transition-all duration-200 hover:scale-110 ${currentTheme.background.hover} ${currentTheme.text.secondary} hover:${currentTheme.text.primary} relative z-10`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Enhanced Search Bar */}
        <div className="p-4">
          <div className={`relative flex items-center space-x-3 p-3 rounded-xl border transition-all duration-300 ${currentTheme.background.input} ${currentTheme.border.primary} focus-within:${currentTheme.border.focus} focus-within:${currentTheme.shadow.md}`}>
            <Search className={`w-4 h-4 ${currentTheme.text.muted}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className={`flex-1 bg-transparent border-none outline-none text-sm transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-gray-200 placeholder-gray-400' 
                  : 'text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Enhanced New Chat Button */}
        <div className="px-4 pb-4">
          <button
            onClick={onNewChat}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3.5 px-4 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group relative overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            
            <Plus className="w-5 h-5 mr-2 relative z-10" />
            <span className="font-semibold relative z-10">New Weather Chat</span>
          </button>
        </div>

        {/* Enhanced Chat List */}
        <div className="flex-1 overflow-y-auto px-4 pt-1 pb-4 space-y-3">
          {filteredChats.length === 0 ? (
            <div className={`text-center py-12 ${currentTheme.text.muted}`}>
              <div className={`p-6 rounded-2xl mb-4 ${currentTheme.background.card} ${currentTheme.shadow.sm} transition-all duration-300`}>
                <FileText className={`w-12 h-12 mx-auto mb-3 ${currentTheme.text.muted} opacity-60`} />
              </div>
              <p className="text-base font-medium mb-2">
                {searchQuery ? 'No matching chats found' : 'No chat history yet'}
              </p>
              <p className={`text-sm ${currentTheme.text.muted} opacity-75`}>
                {searchQuery ? 'Try a different search term' : 'Start a conversation to see it here'}
              </p>
            </div>
          ) : (
            filteredChats.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => onSelectChat(chat.id)} 
                className={`group border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ${
                  currentChatId === chat.id 
                    ? `${currentTheme.border.focus} ${currentTheme.background.active} ${currentTheme.shadow.md}`
                    : `${currentTheme.border.primary} ${currentTheme.background.card} hover:${currentTheme.border.hover} hover:${currentTheme.shadow.md}`
                }`}
              >
                {/* Selection indicator */}
                {currentChatId === chat.id && (
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-r-full`} />
                )}

                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-3">
                    {editingId === chat.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className={`border px-3 py-2 rounded-lg w-full text-sm transition-all duration-300 ${currentTheme.background.input} ${currentTheme.border.primary} ${currentTheme.text.primary} placeholder:${currentTheme.text.muted} focus:${currentTheme.border.focus} focus:outline-none`}
                          onKeyDown={(e) => e.key === "Enter" && saveTitle(chat.id)}
                          placeholder="Chat title..."
                          autoFocus
                        />
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            saveTitle(chat.id);
                          }} 
                          className={`p-2 transition-all duration-200 hover:scale-110 ${currentTheme.text.muted} hover:text-green-500`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-semibold text-sm truncate flex-1 pr-2 ${currentTheme.text.primary} group-hover:${currentTheme.text.accent} transition-colors duration-200`}>
                            {chat.title}
                          </h3> 
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className={`text-xs ${currentTheme.text.muted} flex items-center`}>
                            <span>{chat.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                            <span className="mx-2">•</span>
                            <span>{chat.messages.length} message{chat.messages.length !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </>
                    )}

                    {chat.messages.length > 0 && editingId !== chat.id && (
                      <div className={`mt-2 text-xs truncate ${currentTheme.text.muted} opacity-75`}>
                        {chat.messages[chat.messages.length - 1]?.content?.substring(0, 50)}...
                      </div>
                    )}
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    {editingId !== chat.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEditing(chat);
                        }}
                        className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${currentTheme.background.hover} ${currentTheme.text.muted} hover:${currentTheme.text.accent}`}
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
                      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${currentTheme.background.hover} ${currentTheme.text.muted} hover:${currentTheme.text.accent}`}
                      title="Export as PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(chat.id);
                      }}
                      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${currentTheme.background.hover} ${currentTheme.text.muted} hover:text-red-500`}
                      title="Delete chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Enhanced Footer */}
        <div className={`p-4 border-t ${currentTheme.border.primary} ${currentTheme.background.card}`}>
          <div className={`text-center text-xs ${currentTheme.text.muted} space-y-1`}>
            <p>Weather Chat Assistant</p>
            <p className="opacity-60">Your AI weather companion</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatHistorySidebar;