import ReactDOM from 'react-dom/client'
import Showcase from './components/_Showcase'
import FlProvider from './providers/FlProvider'

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <FlProvider theme={{
      colours: {
        primary: '#ffd700',
        secondary: '#0d3f4a',
        erroneous: '#f24355'
      }
    }}>
      <Showcase />
    </FlProvider>
  )
