import Button from "./Button";
import Checkbox from "./Checkbox";
import Divider from "./Divider";
import Grid from "./Grid";
import Input from "./Input";
import Radio from "./Radio";
import Slider from "./Slider";
import Stack from "./Stack";
import Text from "./Text";

export default function Form() {
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

                <Divider variant="solid" thickness={2} spacing="xs" />

                <form>
                    <Stack>
                        <Input label="username" name="username" placeholder="Lorem ipsum" />
                        <Input password label="password" name="password" placeholder="Lorem ipsum" />
                        <Slider label="current experience" min={0} max={60} step={1} />

                        <Text size="lg">Skills</Text>
                        <Grid direction="row" gap={6} style={{ width: '100%' }} columns={2} rows={2}>
                                <Checkbox size={22.5} label="JavaScript" />
                                <Checkbox size={22.5} label="C++" />
                                <Checkbox reverse size={22.5} label="Python" />
                                <Checkbox reverse size={22.5} label="Rust" />
                        </Grid>

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