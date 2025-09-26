# Weather Chat Interface

A sleek and responsive chat interface for a weather assistant, built with React, Vite, and Tailwind CSS. This application provides a user-friendly way to interact with a weather AI, manage conversations, and export chat logs.

## Features

- **Real-time Chat:** Interact with an AI-powered weather assistant.
- **Chat History:** Your conversations are saved and can be revisited.
    - **Search:** Quickly find past conversations.
    - **Rename:** Give your chats custom titles.
    - **Delete:** Remove conversations you no longer need.
- **Export to PDF:** Download a copy of your chat history as a PDF document.
- **Theming:** Switch between light and dark modes for your comfort.
- **Responsive Design:** A seamless experience across desktop and mobile devices.
- **Toast Notifications:** Get feedback on actions like deleting or exporting chats.

## Tech Stack

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** Lucide React
- **PDF Generation:** jsPDF
- **Notifications:** React Toastify

## Getting Started

Follow these instructions to get a local copy up and running.

**Prerequisites**
- Node.js (v18.x or higher)
- npm or your preferred package manager

**1. Clone the repository:**

```bash
git clone https://github.com/harshmaurya04/weather-chat-interface.git
cd weather-chat-interface
```

**2. Install dependencies:**

```bash
npm install
```

**3. Set up environment variables:**

Create a ```.env``` file in the root of the project and add the following, replacing the placeholder with your actual API key and URL:

```bash
VITE_WEATHER_API_KEY="your_weather_api_key"
VITE_WEATHER_API_URL="your_weather_api_url"
```

**4. Run the development server:**

```bash
npm run dev
```
The application will be available at http://localhost:5173.


## Available Scripts

- ```npm run dev```: Starts the development server.
- ```npm run build```: Builds the app for production.
- ```npm run lint```: Lints the code using ESLint.
- ```npm run preview```: Serves the production build locally.


## Contributing

Contributions are welcome! If you have suggestions for improvements, please open an issue or create a pull request.

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/ AmazingFeature)
3. Commit your Changes (git commit -m 'Add some AmazingFeature')
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request


