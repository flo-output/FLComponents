import React from "react";
import useTheme from "../hooks/Theme";
import { FlBreakpoint, FlIntrinsicProps, FlPolymorphic } from "../types";
import { compute_style, parse_numerical_property, populate_intrinsic_style, reduce_props, to_property } from "../utilities";

export default function Avatar<C extends React.ElementType = 'div'>
    (props: FlPolymorphic<Omit<FlIntrinsicProps, 'children'>, C> & {
        src?: string,
        size?: FlBreakpoint,
        border?: false | number,
    }) {

    const theme = useTheme();
    const Component = props.as || 'div';

    return (
        <Component {...reduce_props(props, ['FlIntrinsicProps'], 'as', 'src', 'size', 'border')} className={
            compute_style({
                ...populate_intrinsic_style(theme, props, {
                    px: 'sm',
                    py: 'sm',
                    radius: 'xl',
                }),

                // TODO: Fix sizing
                width: parse_numerical_property(props.size, theme.sizes, theme.units, 'md'),
                height: parse_numerical_property(props.size, theme.sizes, theme.units, 'md'),

                border: props.border === false ? undefined : `${props.border ?? 3}px solid`,
                borderColor: to_property(theme.colours.primary),
                userSelect: 'none',

                display: 'grid',
                placeItems: 'center'

            }, props.className)
        }>
            <img src={props.src} className={compute_style({
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: parse_numerical_property(props.radius, theme.radius, theme.units, 'xl'),
            })} />
        </Component>
    )
}