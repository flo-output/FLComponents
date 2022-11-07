import useTheme from "../hooks/Theme";
import { compute_style, FlFalsey, populate_intrinsic_style, reduce_props, to_property } from "../utilities";
import { ComponentPropsWithoutRef, createRef } from "react";
import type { FlIntrinsicProps } from "../types";
import Text from "./Text";
import Stack from "./Stack";
import Button from "./Button";

export default function NumberInput
    (props: FlIntrinsicProps & ComponentPropsWithoutRef<'input'> & {
        label?: string,
        description?: string,
        error?: string,
    }) {

    const theme = useTheme();
    const ref = createRef<HTMLInputElement>();

    return (
        <Stack as="label" gap={6}>
            <Stack>
                {props.label && <Text children={props.label} mb={0} weight={600} />}
                {props.description && <Text children={props.description} my={0} size="sm" opacity={60} weight={200} />}
            </Stack>

            <div style={{
                position: 'relative',
            }}>
                <input ref={ref} {...reduce_props(props, ['FlIntrinsicProps'], 'label', 'description', 'error', 'onChange', 'value')} type="number"
                    className={
                        compute_style({
                            ...populate_intrinsic_style(theme, props, {
                                px: 'md',
                                py: 'sm',
                                radius: 'sm',
                            }),
                            width: '100%',
                            border: '1px solid',
                            cursor: 'text',
                            height: '100%',
                            backgroundColor: to_property(theme.colours.secondary),
                            color: to_property(theme.colours.primary),
                        }, props.className)
                    }
                    style={{
                        color: FlFalsey.includes(props.error) ? undefined : to_property(theme.colours.erroneous),
                        borderColor: FlFalsey.includes(props.error) ? undefined : to_property(theme.colours.erroneous),
                        '--outline': FlFalsey.includes(props.error) ? undefined : to_property(theme.colours.erroneous),
                    } as any}>
                </input>
                <Stack p={0} gap={0} direction="column" justify="center" style={{
                    overflow: 'clip',
                    position: 'absolute',
                    height: '100%',
                    right: '0.5rem',
                    top: 0,
                }}>
                    <Button variant="subtle" size="sm" border={0} p={0} tabIndex={-1} onClick={() => {
                        ref.current!.value = String(Number(ref.current!.value) + 1);
                        ref.current!.dispatchEvent(new Event('change'));
                    }}>^</Button>
                    <Button variant="subtle" size="sm" border={0} p={0} tabIndex={-1} style={{transform: 'scaleY(-1)'}} onClick={() => {
                        ref.current!.value = String(Number(ref.current!.value) - 1);
                        ref.current!.dispatchEvent(new Event('change'));
                    }}>^</Button>
                </Stack>
            </div>
        </Stack>
    )
}