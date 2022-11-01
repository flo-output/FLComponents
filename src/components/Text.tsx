import useTheme from "../hooks/Theme";
import { colour_property, compute_style, populate_intrinsic_style } from "../utilities";
import type { FlIntrinsicProps, FlPolymorphic, FlTextProps } from "../types";

export default function Text<C extends React.ElementType = 'span'>
    (props: FlPolymorphic<FlIntrinsicProps & FlTextProps, C> & {
        opacity?: number,
    }) {

    const theme = useTheme();
    const Component = props.as || 'span';

    return (
        <Component {...props} className={compute_style({
            ...populate_intrinsic_style(theme, props, {
                my: 'sm',
                size: 'md',
            }),

            color: colour_property(theme, props.colour ?? 'primary', props.opacity),
            fontWeight: props.weight ?? 400,
        }, props.className)}>
            {props.children}
        </Component>
    )
}