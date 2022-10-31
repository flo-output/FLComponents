import ReactDOM from 'react-dom/client'
import Showcase from './components/_Showcase'
import FlProvider from './providers/FlProvider'

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <FlProvider>
      <Showcase />
    </FlProvider>
  )
