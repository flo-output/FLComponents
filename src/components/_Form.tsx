import { GetColorName } from "hex-color-to-color-name";
import useTheme from "../hooks/Theme";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Radio from "./Radio";
import Slider from "./Slider";
import Stack from "./Stack";
import Text from "./Text";

export default function Form() {
    const theme = useTheme();
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'grid',
            placeItems: 'center',
        }}>
            <Stack border p="lg" style={{ width: `clamp(30vw, 40rem, 70vw)` }}>
                <Text size="xl" weight={900} style={{ display: 'flex', gap: 8, alignItems: 'center' }} as="div">
                    🎉 Welcome to the family!
                </Text>
                <Text as='p'>
                    We're so excited to have you on board. <br />
                    To get started, please fill out the form below.
                </Text>

                {/* Divider */}

                <form>
                    <Stack>
                        <Input label="username" name="username" placeholder="Lorem ipsum" />
                        <Input password label="password" name="password" placeholder="Lorem ipsum" />
                        <Slider label="current experience" min={0} max={60} step={1} />

                        {/* Replace with <Grid/> */}
                        <Text size="lg">Skills</Text>
                        <Stack direction="row" gap={0} style={{ width: '100%' }} justify="space-between">
                            <Stack gap={10} justify="space-between">
                                <Checkbox size={22.5} label="JavaScript" />
                                <Checkbox size={22.5} label="C++" />
                            </Stack>
                            <Stack gap={10} align="flex-end">
                                <Checkbox reverse size={22.5} label="Python" />
                                <Checkbox reverse size={22.5} label="Rust" />
                            </Stack>
                        </Stack>

                        <Text size="lg">Favourite web framework</Text>
                        <Stack direction="row" justify="space-around">
                            <Radio label="React" name="framework" direction="column" />
                            <Radio label="React" name="framework" direction="column" />
                            <Radio label="React" name="framework" direction="column" />
                        </Stack>

                    </Stack>

                    <Button type="submit" mt="lg">
                        Submit
                    </Button>
                </form>

            </Stack>
        </div>
    )
}