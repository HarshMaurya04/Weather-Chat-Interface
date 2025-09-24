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
      newestOnTop
      closeOnClick
      pauseOnHover
      theme={theme}
      toastClassName={() => 
        theme === 'dark' 
          ? "relative flex p-6 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-gray-800 text-white border border-gray-600"
          : "relative flex p-6 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-white text-gray-900 border border-gray-200"
      }
      bodyClassName={() => theme === 'dark' ? "flex text-sm font-white font-med block p-3 text-white" : "flex text-sm font-med block p-3"}
      progressClassName={theme === 'dark' ? "bg-blue-400" : ""}
    />
  );
};