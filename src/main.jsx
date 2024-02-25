import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MantineProvider } from '@mantine/core'
import { SocketclientProvider } from './components/SocketClient.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
    > 
      <SocketclientProvider>
        <App />
      </SocketclientProvider>
    </MantineProvider>
  </React.StrictMode>,
)
