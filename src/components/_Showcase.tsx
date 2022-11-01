import Button from "./Button"
import Input from "./Input"
import Text from "./Text"

const components: { [key: string]: JSX.Element } = {
    'Button': <Button children={'To GitHub!'} as="a" href="https://github.com/flo-output/FLComponents" target="_blank" />,
    'Input': <Input />
}

export default function Showcase() {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'grid',
            placeItems: 'center',
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '2rem',
            }}>
                {
                    Object.entries(components).map(c => {
                        return (
                            <div key={c[0]} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: '5rem',
                                background: 'rgba(255, 255, 255, 0.1)',
                                padding: '1rem 2rem',
                                borderRadius: '0.5rem',
                            }}>
                                {c[1]}
                                <Text size="lg" weight={600}>
                                    {c[0]}
                                </Text>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}