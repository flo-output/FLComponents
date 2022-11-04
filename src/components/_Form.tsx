import useTheme from "../hooks/Theme";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Slider from "./Slider";
import Stack from "./Stack";
import Text from "./Text";
import { randomizeTheme } from "./_Showcase";

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
                    <Button size="lg" border={false} px={0} children={'🎉'} onClick={() => randomizeTheme(theme)} />
                    Welcome to the family!
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
                            <Stack gap={16}>
                                <Checkbox label="JavaScript" />
                                <Checkbox label="JavaScript" />
                            </Stack>
                            <Stack gap={16}>
                                <Checkbox reverse label="JavaScript" />
                                <Checkbox reverse label="JavaScript" />
                            </Stack>
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