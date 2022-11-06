import useTheme from "../hooks/Theme";
import { compute_style, parse_numerical_property, populate_intrinsic_style, reduce_props, to_property } from "../utilities";
import { ComponentPropsWithoutRef, useState } from "react";
import type { FlIntrinsicProps } from "../types";
import Text from "./Text";
import Stack from "./Stack";

export default function Checkbox
    (props: FlIntrinsicProps & ComponentPropsWithoutRef<'input'> & {
        label?: string,
        direction?: 'row' | 'column',
        reverse?: boolean,
        gap?: number,
    }) {

    const theme = useTheme();
    const Label = () => (
        <Text children={props.label} my={0} weight={600} />
    )

    return (
        <Stack as="label" gap={props.label ? props.gap ?? 8 : 0} direction={props.direction ?? 'row'} align="center" justify={!props.reverse ? 'flex-start' : 'flex-end'} style={{
            height: props.direction === undefined || props.direction === 'row' ? parse_numerical_property(props.size, theme.sizes, theme.units, 'lg') : '100%',
            width: props.direction === 'column' ? parse_numerical_property(props.size, theme.sizes, theme.units, 'lg') : '100%',
        }}>
            {props.label && props.reverse && <Label />}
            <input {...reduce_props(props, ['FlIntrinsicProps'], 'reverse')} type="checkbox"
                className={
                    compute_style({
                        ...populate_intrinsic_style(theme, props, {
                            radius: 'sm',
                        }),
                        appearance: 'none',
                        border: '1px solid',
                        cursor: 'pointer',
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