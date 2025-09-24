import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../contexts/ThemeContext';

export const ToastProvider = () => {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={true}
      draggable={true}
      pauseOnHover={true}
      theme={theme}
      toastClassName={`relative flex items-center p-4 min-h-10 rounded-xl overflow-hidden cursor-pointer backdrop-blur-md border transition-all duration-300 hover:scale-105
        ${
          theme === 'dark'
            ? 'bg-gray-800/95 text-white border-gray-600/60 shadow-lg shadow-black/30'
            : 'bg-white/95 text-gray-900 border-gray-200/60 shadow-lg shadow-blue-200/20'
        }`}
      bodyClassName={`flex text-sm font-medium block p-3 text-left
        ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
      `}
      progressClassName={`${
        theme === 'dark'
          ? 'bg-gradient-to-r from-blue-400 to-blue-500'
          : 'bg-gradient-to-r from-blue-500 to-blue-600'
      }`}
    />
  );
};
