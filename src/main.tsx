import { GetColorName } from 'hex-color-to-color-name'
import ReactDOM from 'react-dom/client'
import { Helmet } from 'react-helmet'
import Stack from './components/Stack'
import Form from './components/_Form'
import Text from './components/Text'
import Showcase, { hslToHex, randomizeTheme, swapTheme } from './components/_Showcase'
import FlProvider from './providers/FlProvider'
import useTheme from './hooks/Theme'
import { useState } from 'react'
import Button from './components/Button'

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <FlProvider theme={{
      colours: {
        primary: '#ffffff',
        secondary: '#000000',
        erroneous: '#ff0000'
      },
      font: '\'Inter\', sans-serif',
    }}>
      <Display />
    </FlProvider>
  )


function Display() {

  const Sections = [
    <Showcase />,
    <Form />,
  ]

  const [index, setIndex] = useState(0);
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='' />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </Helmet>
      {Sections[index]}
      <Navigator increment={() => setIndex((index + 1) % Sections.length)} />
    </>
  )
}

function Navigator({ increment }: { increment: () => void }) {

  const theme = useTheme();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `` }} />
      <Stack style={{ position: 'fixed', right: '2rem', bottom: '2rem', overflow: 'clip', width: '15rem' }} border gap={0}>
        <Stack px="md" py="sm" gap={1} radius={0} className='clr' style={{ background: hslToHex(theme.colours.secondary), cursor: 'pointer' }} onClick={() => {
          navigator.clipboard.writeText(hslToHex(theme.colours.primary))
        }}>
          <Text my={0} weight={900} size="md">{GetColorName(hslToHex(theme.colours.primary))}</Text>
          <Text my={0} size="sm">{hslToHex(theme.colours.primary)}</Text>
        </Stack>

        <Stack px="md" py="sm" gap={1} radius={0} className='clr' style={{ background: hslToHex(theme.colours.primary), cursor: 'pointer' }} onClick={() => {
          navigator.clipboard.writeText(hslToHex(theme.colours.secondary))
        }}>
          <Text my={0} weight={900} size="md" color="secondary">{GetColorName(hslToHex(theme.colours.secondary))}</Text>
          <Text my={0} size="sm" color="secondary">{hslToHex(theme.colours.secondary)}</Text>
        </Stack>

        <Stack direction="row" justify="space-around" style={{ background: hslToHex(theme.colours.secondary) }}>
          <Button onClick={increment} border={false}>
            -&gt;
          </Button>
          <Button onClick={() => swapTheme(theme)} border={false}>
            🔁
          </Button>
          <Button onClick={() => randomizeTheme(theme)} border={false}>
            🔀
          </Button>
        </Stack>
      </Stack>
    </>
  )
}