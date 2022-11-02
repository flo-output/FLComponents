import ReactDOM from 'react-dom/client'
import { Helmet } from 'react-helmet'
import Showcase from './components/_Showcase'
import FlProvider from './providers/FlProvider'

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <FlProvider theme={{
      colours: {
        primary: '#09e79b',
        secondary: '#000000',
        erroneous: '#f24355'
      },
      font: '\'Inter\', sans-serif',
    }}>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </Helmet>
      <Showcase />
    </FlProvider>
  )
