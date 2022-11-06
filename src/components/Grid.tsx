import React, { CSSProperties } from "react";
import useTheme from "../hooks/Theme";
import { FlIntrinsicProps, FlPolymorphic } from "../types";
import { colour_property, compute_style, parse_numerical_property, populate_intrinsic_style, reduce_props } from "../utilities";

export default function Grid<C extends React.ElementType = 'div'>
    (props: FlPolymorphic<FlIntrinsicProps, C> & {
        gap?: number | string,
        direction?: 'row' | 'column',
        border?: boolean,
        rows?: number,
        columns?: number,
    }) {

    const theme = useTheme();
    const Component = props.as || 'div';

    return (
        <Component {...reduce_props(props, ['FlIntrinsicProps'], 'as', 'gap', 'direction', 'align', 'justify', 'border')} className={
            compute_style({
                ...populate_intrinsic_style(theme, props),
                display: 'grid',
                gridAutoFlow: props.direction === 'row' ? 'column' : 'row',
                gap: parse_numerical_property(props.gap, theme.spacing, theme.units, 'sm'),
                border: !props.border ? undefined : `1px solid ${colour_property(theme, 'primary')}`,
                gridTemplateColumns: props.columns ? `repeat(${props.columns}, 1fr)` : undefined,
                gridTemplateRows: props.rows ? `repeat(${props.rows}, 1fr)` : undefined,
            }, props.className)
        }>
            {props.children}
        </Component>
    )
}