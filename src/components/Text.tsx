import useTheme from "../hooks/Theme";
import { colour_property, compute_style, populate_intrinsic_style, to_property } from "../utilities";
import type { Colour, FlIntrinsicProps, FlPolymorphic, FlTextProps } from "../types";

export default function Text<C extends React.ElementType = 'span'>
    (props: FlPolymorphic<FlIntrinsicProps & FlTextProps, C>) {

    const theme = useTheme();
    const Component = props.as || 'span';

    return (
        <Component {...props} className={compute_style({
            ...populate_intrinsic_style(theme, props, {
                my: 'sm',
                size: 'md',
            }),

            color: colour_property(theme, props.colour ?? 'primary'),
            fontWeight: props.weight ?? 400,
        }, props.className)}>
            {props.children}
        </Component>
    )
}