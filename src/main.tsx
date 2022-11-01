import ReactDOM from 'react-dom/client'
import Showcase from './components/_Showcase'
import FlProvider from './providers/FlProvider'

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <FlProvider theme={{
      colours: {
        primary: '#00ff7f',
        secondary: '#0c0d30'
      }
    }}>
      <Showcase />
    </FlProvider>
  )
