import useTheme from "../hooks/Theme";
import { compute_style, FlFalsey, parse_numerical_property, populate_intrinsic_style, reduce_props, to_property } from "../utilities";
import { ComponentPropsWithoutRef, useState } from "react";
import type { FlIntrinsicProps } from "../types";
import Text from "./Text";
import Stack from "./Stack";

export default function Checkbox
    (props: FlIntrinsicProps & ComponentPropsWithoutRef<'input'> & {
        label?: string,
        direction?: 'row' | 'column',
        reverse?: boolean
    }) {

    const theme = useTheme();
    const [checked, setChecked] = useState(props.checked);

    const Label = () => (
        <Text children={props.label} my={0} weight={600} opacity={checked ? 100 : 60} />
    )

    return (
        <Stack as="label" gap={props.label ? 6 : 0} direction={props.direction ?? 'row'} align="center" style={{
            height: parse_numerical_property(props.size, theme.sizes, theme.units, 'lg'),
        }}>
            {props.label && props.reverse && <Label />}
            <input {...reduce_props(props, ['FlIntrinsicProps'])} type="checkbox"
                onClick={() => setChecked(!checked)}
                className={
                    compute_style({
                        ...populate_intrinsic_style(theme, props, {
                            radius: 'sm',
                        }),
                        appearance: 'none',
                        border: '1px solid',
                        cursor: 'pointer',
                        backgroundColor: !checked ? to_property(theme.colours.secondary) : to_property(theme.colours.primary),
                        color: to_property(theme.colours.primary),
                        width: parse_numerical_property(props.size, theme.sizes, theme.units, 'lg'),
                        height: parse_numerical_property(props.size, theme.sizes, theme.units, 'lg'),
                    }, props.className)
                }>
                {props.children}
            </input>
            {props.label && !props.reverse && <Label />}
        </Stack>
    )
}