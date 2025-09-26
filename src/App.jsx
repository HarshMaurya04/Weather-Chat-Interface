import { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx';
import { ToastProvider } from './components/ToastProvider.jsx';
import { useChatStore, useChatActions } from './store/chatStore.js';
import ChatHistorySidebar from './components/ChatHistorySidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';

function AppContent() {
  const { theme, toggleTheme, currentTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { chatHistory, currentChatId, messages, loading } = useChatStore();
  const { selectChat, deleteChat, startNewChat, renameChat, exportChat, sendMessage } = useChatActions();

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  const handleSelectChat = (chatId) => {
    selectChat(chatId);
    setSidebarOpen(false);
  };
  
  const handleNewChat = () => {
    startNewChat();
    setSidebarOpen(false);
  };

  const getCurrentChatTitle = () => {
    return chatHistory.find(c => c.id === currentChatId)?.title || "New Chat";
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ease-in-out ${currentTheme.background.primary} ${currentTheme.text.primary}`}>
      <ToastProvider />
      
      {/* Ambient background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl transition-all duration-1000 ${
          theme === 'light' 
            ? 'bg-gradient-to-br from-blue-400 to-indigo-500' 
            : 'bg-gradient-to-br from-blue-600 to-purple-700'
        }`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl transition-all duration-1000 ${
          theme === 'light' 
            ? 'bg-gradient-to-tr from-indigo-400 to-blue-500' 
            : 'bg-gradient-to-tr from-purple-600 to-blue-700'
        }`} />
      </div>
      
      <div className="relative flex h-screen">
        <ChatHistorySidebar
          chatHistory={chatHistory}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onDeleteChat={deleteChat}
          onNewChat={handleNewChat}
          onExportChat={(chat) => exportChat(chat.id)}
          onRenameChat={renameChat}
          isOpen={sidebarOpen}
          onToggle={handleToggleSidebar}
          theme={theme}
          currentTheme={currentTheme}
        />

        <div className="flex-1 p-4">
          <div className="h-full max-w-4xl mx-auto">
            <ChatWindow
              messages={messages}
              onSend={sendMessage}
              loading={loading}
              currentChatTitle={getCurrentChatTitle()}
              onToggleSidebar={handleToggleSidebar}
              theme={theme}
              toggleTheme={toggleTheme}
              currentTheme={currentTheme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;