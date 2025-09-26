import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// theme configuration
export const themes = {
  light: {
    name: 'light',
    background: {
      primary: 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100',
      secondary: 'bg-white/80 backdrop-blur-sm',
      card: 'bg-white/90 backdrop-blur-sm',
      sidebar: 'bg-white/95 backdrop-blur-md',
      header: 'bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600',
      input: 'bg-white/80',
      hover: 'hover:bg-blue-50/80',
      active: 'bg-blue-100/80'
    },
    text: {
      primary: 'text-gray-900',
      secondary: 'text-gray-700',
      muted: 'text-gray-500',
      accent: 'text-blue-600',
      inverse: 'text-white',
      headerSecondary: 'text-blue-100'
    },
    border: {
      primary: 'border-gray-200/60',
      secondary: 'border-blue-200/40',
      focus: 'border-blue-400',
      hover: 'border-blue-300'
    },
    shadow: {
      sm: 'shadow-sm',
      md: 'shadow-md shadow-blue-100/50',
      lg: 'shadow-lg shadow-blue-200/30',
      xl: 'shadow-xl shadow-blue-300/20'
    },
    message: {
      user: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
      agent: 'bg-white/90 backdrop-blur-sm text-gray-800 border border-gray-200/60',
      userTime: 'text-blue-100',
      agentTime: 'text-gray-500'
    }
  },
  dark: {
    name: 'dark',
    background: {
      primary: 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800',
      secondary: 'bg-gray-800/90 backdrop-blur-sm',
      card: 'bg-gray-800/95 backdrop-blur-sm',
      sidebar: 'bg-gray-800/98 backdrop-blur-md',
      header: 'bg-gradient-to-r from-gray-700 via-gray-800 to-slate-800',
      input: 'bg-gray-700/80',
      hover: 'hover:bg-gray-700/60',
      active: 'bg-gray-700/80'
    },
    text: {
      primary: 'text-gray-100',
      secondary: 'text-gray-300',
      muted: 'text-gray-400',
      accent: 'text-blue-400',
      inverse: 'text-gray-900',
      headerSecondary: 'text-gray-300'
    },
    border: {
      primary: 'border-gray-700/60',
      secondary: 'border-gray-600/40',
      focus: 'border-blue-500',
      hover: 'border-gray-600'
    },
    shadow: {
      sm: 'shadow-sm shadow-black/20',
      md: 'shadow-md shadow-black/30',
      lg: 'shadow-lg shadow-black/40',
      xl: 'shadow-xl shadow-black/50'
    },
    message: {
      user: 'bg-gradient-to-br from-blue-600 to-blue-700 text-white',
      agent: 'bg-gray-700/90 backdrop-blur-sm text-gray-200 border border-gray-600/60',
      userTime: 'text-blue-200',
      agentTime: 'text-gray-400'
    }
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('weather-chat-theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem('weather-chat-theme', newTheme);
      return newTheme;
    });
  };

  const currentTheme = themes[theme];

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme === 'dark' ? '#1f2937' : '#ffffff');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};