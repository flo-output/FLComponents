import useTheme from "../hooks/Theme";
import { colour_property, compute_style, populate_intrinsic_style, reduce_props, to_property } from "../utilities";
import type { FlBreakpoint, FlIntrinsicProps, FlPolymorphic, FlTextProps } from "../types";

export default function Divider<C extends React.ElementType = 'div'>
    (props: FlPolymorphic<Omit<FlIntrinsicProps, 'my' | 'ml' | 'mr' | 'mt' | 'mb' | 'm' | 'py' | 'pl' | 'pr' | 'pt' | 'pb' | 'p'>, C> & {
        opacity?: number,
        thickness?: number,
        variant?: 'solid' | 'dashed' | 'dotted',
        spacing?: FlBreakpoint
    }) {

    const theme = useTheme();
    const Component = props.as || 'div';

    return (
        <Component {...reduce_props(props, ['FlIntrinsicProps'], 'as', 'opacity')} className={compute_style({
            ...populate_intrinsic_style(theme, props, {
                mt: props.spacing ?? 'sm',
                mb: props.spacing ?? 'sm',
                radius: 0,
            }),

            display: 'block',
            width: '100%',

            borderBottom: `${props.thickness ?? 0.25}px ${props.variant ?? 'solid'} ${to_property(theme.colours.primary, props.opacity ?? 60)}`,

        }, props.className)}>
            {props.children}
        </Component>
    )
}