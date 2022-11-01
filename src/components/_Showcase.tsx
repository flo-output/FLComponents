import { useState } from "react"
import Avatar from "./Avatar";
import Button from "./Button"
import Input from "./Input"
import Stack from "./Stack";
import Text from "./Text"

export default function Showcase() {

    const [states, setStates] = useState<{ [key: string]: any }>({});
    const get = (key: string) => states[key] ?? '';
    const set = (key: string, value: string) => setStates({ ...states, [key]: value });

    const components: { [key: string]: JSX.Element } = {
        'Button': <Button
            children={'To GitHub!'}
            as="a"
            href="https://github.com/flo-output/FLComponents"
            target="_blank" />,
        'Input': <Input
            label="An input!"
            description="How completely bizarre!"
            onChange={e => set('Input', e.target.value)}
            value={get('Input')}
            error={(get('Input').length <= 3) ? '' : 'aie!'}
            placeholder="Keep it short, bud!" />,
        'Avatar': <Avatar
            src="https://cdn.discordapp.com/avatars/396635796234305537/7e695fca450474429fcb1e4d18a7e30f.png?size=4096"
            size={100}
        />
    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'grid',
            placeItems: 'center',
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill minmax(150, 1fr))',
                gridTemplateRows: 'repeat(auto-fill minmax(150, 1fr))',
                gap: '2rem',
            }}>
                {
                    Object.entries(components).map(([Name, Component]) => {
                        return (
                            <Stack
                                gap={1}
                                key={Name}
                                style={{
                                    minHeight: '5rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    padding: '1rem 2rem',
                                    borderRadius: '0.5rem',
                                }}>
                                <div style={{
                                    width: '100%',
                                    display: 'grid',
                                    placeItems: 'center'
                                }}>
                                    {Component}
                                </div>
                                <Text size="md" mb={-5} ml={-20} weight={600}>
                                    {Name}
                                </Text>
                            </Stack>
                        )
                    })
                }
            </div>
        </div>
    )
}