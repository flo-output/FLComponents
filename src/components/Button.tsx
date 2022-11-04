import React from "react";
import useTheme from "../hooks/Theme";
import { FlIntrinsicProps, FlPolymorphic, FlTextProps } from "../types";
import { colour_property, compute_style, populate_intrinsic_style, reduce_props, to_property } from "../utilities";

export default function Button<C extends React.ElementType = 'button'>
    (props: FlPolymorphic<FlIntrinsicProps & FlTextProps, C> & {
        border?: boolean | number,
    }) {

    const theme = useTheme();
    const Component = props.as || 'button';

    return (
        <Component {...reduce_props(props, ['FlIntrinsicProps', 'FlTextProps'], 'as', 'border')} className={
            compute_style({
                ...populate_intrinsic_style(theme, props, {
                    px: 'md',
                    py: 'sm',
                    radius: 'sm',
                }),

                border: props.border === false ? 'none' : `${props.border ?? 1}px solid`,
                cursor: 'pointer',
                backgroundColor: to_property(theme.colours.secondary),

                color: colour_property(theme, props.colour ?? props.color ?? 'primary'),
                fontWeight: props.weight ?? 600,
                textAlign: 'center',

                userSelect: 'none'
            }, props.className)
        }>
            {props.children}
        </Component>
    )
}