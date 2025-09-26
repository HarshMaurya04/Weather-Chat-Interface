import { create } from 'zustand';
import { toast } from 'react-toastify';
import { generatePDF } from '../utils/generatePDF';

const generateChatTitle = (firstMessage) => {
  if (!firstMessage) return "New Chat";
  const words = firstMessage.split(" ").slice(0, 5);
  return words.join(" ") + (firstMessage.split(" ").length > 5 ? "..." : "");
};

export const useChatStore = create((set, get) => ({
  chatHistory: [],
  currentChatId: null,
  messages: [],
  loading: false,
  error: null,

  actions: {
    startNewChat: () => {
      set({ currentChatId: null, messages: [], error: null });
    },
    
    selectChat: (chatId) => {
      const chat = get().chatHistory.find((c) => c.id === chatId);
      if (chat) {
        set({ currentChatId: chatId, messages: chat.messages, error: null });
      }
    },
    
    deleteChat: (chatId) => {
      set((state) => ({
        chatHistory: state.chatHistory.filter((c) => c.id !== chatId),
        currentChatId: state.currentChatId === chatId ? null : state.currentChatId,
        messages: state.currentChatId === chatId ? [] : state.messages,
      }));
      toast.info("Chat deleted successfully.");
    },
    
    renameChat: (chatId, newTitle) => {
      set((state) => ({
        chatHistory: state.chatHistory.map((c) =>
          c.id === chatId ? { ...c, title: newTitle } : c
        ),
      }));
    },
    
    exportChat: (chatId) => {
      const chat = get().chatHistory.find((c) => c.id === chatId);
      
      if (chat && chat.messages) {
        try {
          generatePDF(chat, chat.title);
          toast.success("PDF downloaded successfully!");
        } catch (err) {
          console.error("An error occurred during PDF generation:", err);
          toast.error("Failed to download PDF. See console for details.");
        }
      } else {
        console.error("Could not find chat or chat has no messages.", chat);
        toast.error("Cannot export an empty or invalid chat.");
      }
    },

    sendMessage: async (userMessage) => {
      let chatId = get().currentChatId;
      const userRollNumber = "51";

      // Create new chat if needed
      if (!chatId) {
        chatId = Date.now().toString();
        const newChat = {
          id: chatId,
          title: generateChatTitle(userMessage),
          messages: [],
          createdAt: new Date(),
        };
        set((state) => ({
          chatHistory: [newChat, ...state.chatHistory],
          currentChatId: chatId,
        }));
      }

      const newUserMsg = {
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      };

      // Add user message and empty assistant message
      set((state) => ({
        messages: [
          ...state.messages,
          newUserMsg,
          { role: 'agent', content: '', timestamp: new Date() }
        ],
        loading: true,
        error: null,
      }));
      
      // Update chat history with new messages
      set(state => ({
        chatHistory: state.chatHistory.map(chat => 
          chat.id === chatId ? { ...chat, messages: get().messages } : chat
        )
      }));

      try {
        const response = await fetch('/api/weather', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          body: JSON.stringify({
            messages: [{ role: 'user', content: userMessage }],
            threadId: userRollNumber,
          }),
        });

        if (!response.ok || !response.body) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            // Parse streaming response based on actual API format
            if (line.startsWith('data:')) {
              const data = line.replace('data:', '').trim();
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  // Update the last agent message with new content chunk
                  set((state) => {
                    const lastMessage = state.messages[state.messages.length - 1];
                    if (lastMessage?.role === 'agent') {
                      const updatedMessages = [...state.messages];
                      updatedMessages[updatedMessages.length - 1] = {
                        ...lastMessage,
                        content: lastMessage.content + parsed.content,
                      };
                      return { messages: updatedMessages };
                    }
                    return {};
                  });
                }
              } catch (err) {
                // Ignore lines that are not valid JSON
              }
            } else if (line.startsWith('0:')) {
              // Alternative parsing for different response format
              try {
                const contentChunk = JSON.parse(line.substring(2));
                
                set((state) => {
                  const lastMessage = state.messages[state.messages.length - 1];
                  if (lastMessage?.role === 'agent') {
                    const updatedMessages = [...state.messages];
                    updatedMessages[updatedMessages.length - 1] = {
                      ...lastMessage,
                      content: lastMessage.content + contentChunk,
                    };
                    return { messages: updatedMessages };
                  }
                  return {};
                });
              } catch (err) {
                // Ignore invalid JSON chunks
              }
            }
          }
        }
      } catch (err) {
        set({ error: err.message });
        toast.error(`Error: ${err.message}`);
        // Remove the empty assistant message on error
        set(state => ({
          messages: state.messages.slice(0, -1)
        }));
      } finally {
        set({ loading: false });
        // Final update to chat history
        set(state => ({
          chatHistory: state.chatHistory.map(chat => 
            chat.id === chatId ? { ...chat, messages: get().messages } : chat
          )
        }));
      }
    },
  },
}));

export const useChatActions = () => useChatStore((state) => state.actions);