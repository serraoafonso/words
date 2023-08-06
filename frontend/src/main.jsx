import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageContextProvider } from './context/languageContext.jsx'
import { UserContextProvider } from './context/userContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <LanguageContextProvider>
            <App/>
      </LanguageContextProvider>
    </UserContextProvider>
  </React.StrictMode>
  )
