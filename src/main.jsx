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
      theme={{
        components: {
          Container: {
            defaultProps: {
              sizes: {
                xs: 540,
                sm: 720,
                md: 960,
                lg: 1140,
                xl: 1320,
              }
            },
          },
        },
      }}
    > 
      <SocketclientProvider>
        <App />
      </SocketclientProvider>
    </MantineProvider>
  </React.StrictMode>,
)
