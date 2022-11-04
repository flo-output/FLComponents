import { GetColorName } from "hex-color-to-color-name";
import { useState } from "react";
import { alphaBlend, APCAcontrast, sRGBtoY } from "apca-w3";
import useTheme from "../hooks/Theme";
import { ColourTriple, FlTheme, RawFlTheme } from "../types";
import Avatar from "./Avatar";
import Blockquote from "./Blockquote";
import Button from "./Button";
import Input from "./Input";
import Stack from "./Stack";
import Text from "./Text";

// @ts-ignore
import { colorParsley } from "colorparsley";
// TODO: Make types for this and commit to repo

// These functions are merely here for the sake of the showcase
function hslToHex([h, s, l]: ColourTriple) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };

    return `#${f(0)}${f(8)}${f(4)}`;
}

// See above
function randomHex(): `#${string}` {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

// See above
export function randomizeTheme(theme: FlTheme & { update: (new_theme: RawFlTheme) => void }) {
    let i = 0, j = 0;

    let h1 = randomHex();
    let h2;

    do {
        h2 = randomHex();

        if (i++ > 100) {
            h1 = randomHex();
            j++;
        };

        if (j > 10) {
            h1 = '#000000' as `#${string}`;
            h2 = '#ffffff' as `#${string}`;
            break;
        }


    } while (
        Math.abs(Number(APCAcontrast(sRGBtoY(alphaBlend(colorParsley(h1), colorParsley(h2))), sRGBtoY(colorParsley(h2)))) ?? 0) < 60
    )

    theme.update({
        ...theme,
        colours: {
            primary: h1,
            secondary: h2,
            erroneous: '#ff0000',
        }
    })
}

export default function Showcase() {

    const theme = useTheme();
    const [states, setStates] = useState<{ [key: string]: any }>({});
    const get = (key: string) => states[key] ?? '';
    const set = (key: string, value: string) => setStates({ ...states, [key]: value });

    const components: { [key: string]: JSX.Element } = {
        'Colour Scheme':
            <Stack direction="row" gap={8}>
                <Stack gap={0}>
                    <Text style={{ textShadow: '0px 0px 3px black', fontFamily: 'monospace' }} my={0} size="lg" weight={700}>{hslToHex(theme.colours.primary)}</Text>
                    <Text style={{ textShadow: '0px 0px 3px black', fontFamily: 'monospace' }} my={0}>{GetColorName(hslToHex(theme.colours.primary))}</Text>
                </Stack>
                <Stack gap={0}>
                    <Text style={{ textShadow: '0px 0px 3px black', fontFamily: 'monospace' }} colour="secondary" my={0} size="lg" weight={700}>{hslToHex(theme.colours.secondary)}</Text>
                    <Text style={{ textShadow: '0px 0px 3px black', fontFamily: 'monospace' }} colour="secondary" my={0}>{GetColorName(hslToHex(theme.colours.secondary))}</Text>
                </Stack>
            </Stack>,
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
            size={100} />,
        'Blockquote': <Blockquote
            children="Hello world!"
            subtitle="from the FLComponents library" />,
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
            <Button
                children="Randomize colours!"
                onClick={() => randomizeTheme(theme)} />
        </div>
    )
}