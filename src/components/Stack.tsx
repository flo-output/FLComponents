import React, { CSSProperties } from "react";
import useTheme from "../hooks/Theme";
import { FlIntrinsicProps, FlPolymorphic } from "../types";
import { colour_property, compute_style, parse_numerical_property, populate_intrinsic_style, reduce_props } from "../utilities";

export default function Stack<C extends React.ElementType = 'div'>
    (props: FlPolymorphic<FlIntrinsicProps, C> & {
        gap?: number | string,
        direction?: CSSProperties['flexDirection'],
        align?: CSSProperties['alignItems'],
        justify?: CSSProperties['justifyContent'],
        border?: boolean,
    }) {

    const theme = useTheme();
    const Component = props.as || 'div';

    return (
        <Component {...reduce_props(props, ['FlIntrinsicProps'], 'as', 'gap', 'direction', 'align', 'justify', 'border')} className={
            compute_style({
                ...populate_intrinsic_style(theme, props),
                display: 'flex',
                flexDirection: props.direction ?? 'column',
                alignItems: props.align ?? 'stretch',
                justifyContent: props.justify ?? 'flex-start',
                gap: parse_numerical_property(props.gap, theme.spacing, theme.units, 'sm'),
                border: !props.border ? undefined : `1px solid ${colour_property(theme, 'primary')}`,
            }, props.className)
        }>
            {props.children}
        </Component>
    )
}