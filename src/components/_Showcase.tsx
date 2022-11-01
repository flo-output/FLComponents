import Button from "./Button"
import Text from "./Text"

const components: { [key: string]: JSX.Element } = {
    'Button': <Button children={'Hello, world!'} />,
}

export default function Showcase() {
    return (
        <>
            {
                Object.entries(components).map(c => {
                    return (
                        <div key={c[0]} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            {c[1]}
                            <Text size="lg" weight={600}>
                                {c[0]}
                            </Text>
                        </div>
                    )
                })
            }
        </>
    )
}