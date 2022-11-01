import useTheme from "../hooks/Theme";
import { colour_property, populate_intrinsic_style, to_property } from "../utilities";
import type { Colour, FLIntrinsicProps } from "../types";

// TODO: Make polymorphic,
// That is, to allow for other elements to be used as the root element.
export default function Text(props: FLIntrinsicProps & { color?: Colour, colour?: Colour, weight?: number }) {

    const theme = useTheme();

    return (
        <span style={{
            ...populate_intrinsic_style(theme, props, {
                my: 'sm',
                size: 'md',
            }),

            color: colour_property(theme, props.colour ?? 'primary'),
            fontWeight: props.weight ?? 400,
        }}>
            {props.children}
        </span>
    )
}