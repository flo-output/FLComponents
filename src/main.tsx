import { GetColorName } from 'hex-color-to-color-name'
import ReactDOM from 'react-dom/client'
import { Helmet } from 'react-helmet'
import Stack from './components/Stack'
import Form from './components/_Form'
import Text from './components/Text'
import Showcase, { hslToHex, randomizeOne, randomizeTheme, swapTheme } from './components/_Showcase'
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
        <Stack px="md" py="sm" gap={1} radius={0} className='clr' style={{ background: hslToHex(theme.colours.secondary) }} direction='row' justify='space-between'>
          <Stack>
            <Text my={0} weight={900} size="md">{GetColorName(hslToHex(theme.colours.primary))}</Text>
            <Text my={0} size="sm">{hslToHex(theme.colours.primary)}</Text>
          </Stack>
          <Stack direction="row" gap={10}>
            <Button size="md" px={0} border={0} variant="subtle" onClick={() => {
              navigator.clipboard.writeText(hslToHex(theme.colours.primary))
            }}>
              📋
            </Button>
            <Button size="md" px={0} border={0} variant="subtle" onClick={() => {
              randomizeOne(theme, 'secondary')
            }}>
              🔀
            </Button>
          </Stack>
        </Stack>

        <Stack px="md" py="sm" gap={1} radius={0} className='clr' direction='row' justify='space-between' style={{ background: hslToHex(theme.colours.primary) }}>
          <Stack>
            <Text my={0} weight={900} size="md" color="secondary">{GetColorName(hslToHex(theme.colours.secondary))}</Text>
            <Text my={0} size="sm" color="secondary">{hslToHex(theme.colours.secondary)}</Text>
          </Stack>
          <Stack direction="row" gap={10}>
            <Button size="md" px={0} border={0} variant="subtle" onClick={() => {
              navigator.clipboard.writeText(hslToHex(theme.colours.secondary))
            }}>
              📋
            </Button>
            <Button size="md" px={0} border={0} variant="subtle" onClick={() => {
              randomizeOne(theme, 'primary')
            }}>
              🔀
            </Button>
          </Stack>
        </Stack>

        <Stack direction="row" justify="space-around" style={{ background: hslToHex(theme.colours.secondary), borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
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