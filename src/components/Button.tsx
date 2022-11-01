import React from "react";
import useTheme from "../hooks/Theme";
import { FlIntrinsicProps, FlPolymorphic, FlTextProps } from "../types";
import { colour_property, compute_style, populate_intrinsic_style, to_property } from "../utilities";

export default function Button<C extends React.ElementType = 'button'>
    (props: FlPolymorphic<FlIntrinsicProps & FlTextProps, C>) {

    const theme = useTheme();
    const Component = props.as || 'button';

    return (
        <Component {...props} className={
            compute_style({
                ...populate_intrinsic_style(theme, props, {
                    px: 'md',
                    py: 'sm',
                    radius: 'sm',
                }),

                border: '1px solid',
                cursor: 'pointer',
                backgroundColor: to_property(theme.colours.secondary),
                
                color: colour_property(theme, props.colour ?? 'primary'),
                fontWeight: props.weight ?? 200,

                userSelect: 'none'
            }, props.className)
        }>
            {props.children}
        </Component>
    )
}