import { useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { ToastProvider } from './components/ToastProvider';
import { useChatManager } from './hooks/useChatManager';
import { useMessageHandler } from './hooks/useMessageHandler';
import ChatHistorySidebar from './components/ChatHistorySidebar';
import ChatWindow from './components/ChatWindow';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    chatHistory,
    currentChatId,
    messages,
    setMessages,
    createNewChat,
    selectChat,
    deleteChat,
    startNewChat,
    renameChat,
    exportChat,
    getCurrentChatTitle,
  } = useChatManager();

  const { handleSend, loading } = useMessageHandler(
    messages,
    setMessages,
    currentChatId,
    createNewChat
  );

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleSelectChat = (chatId) => {
    selectChat(chatId);
    setSidebarOpen(false);
  };
  const handleNewChat = () => {
    startNewChat();
    setSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-blue-50 text-gray-900'
    }`}>
      <ToastProvider />
      
      <div className="flex h-screen">
        <ChatHistorySidebar
          chatHistory={chatHistory}
          currentChatId={currentChatId}
          onSelectChat={handleSelectChat}
          onDeleteChat={deleteChat}
          onNewChat={handleNewChat}
          onExportChat={exportChat}
          onRenameChat={renameChat}
          isOpen={sidebarOpen}
          onToggle={handleToggleSidebar}
          theme={theme}
        />

        <div className="flex-1 p-4">
          <div className="h-full max-w-4xl mx-auto">
            <ChatWindow
              messages={messages}
              onSend={handleSend}
              loading={loading}
              currentChatTitle={getCurrentChatTitle()}
              onToggleSidebar={handleToggleSidebar}
              theme={theme}
              toggleTheme={toggleTheme}
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