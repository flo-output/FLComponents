import React, { CSSProperties } from "react";
import useTheme from "../hooks/Theme";
import { FlIntrinsicProps, FlPolymorphic } from "../types";
import { compute_style, parse_numerical_property, populate_intrinsic_style } from "../utilities";

export default function Stack<C extends React.ElementType = 'div'>
    (props: FlPolymorphic<FlIntrinsicProps, C> & {
        gap?: number | string,
        direction?: CSSProperties['flexDirection'],
        align?: CSSProperties['alignItems'],
        justify?: CSSProperties['justifyContent'],
    }) {

    const theme = useTheme();
    const Component = props.as || 'div';

    return (
        <Component {...props} className={
            compute_style({
                ...populate_intrinsic_style(theme, props),
                display: 'flex',
                flexDirection: props.direction ?? 'column',
                alignItems: props.align ?? 'stretch',
                justifyContent: props.justify ?? 'flex-start',
                gap: parse_numerical_property(props.gap, theme.spacing, theme.units, 'sm'),
            }, props.className)
        }>
            {props.children}
        </Component>
    )
}