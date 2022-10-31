import useTheme from "../hooks/Theme";
import { FLIntrinsicProps } from "../types";
import { populate_intrinsic_style, to_property } from "../utilities";

export default function Button(props: FLIntrinsicProps) {

    const theme = useTheme();

    return (
        <button style={{
            ...populate_intrinsic_style(theme, props, {
                px: 'md',
                py: 'sm',
                radius: 'sm',
            }),

            border: '1px solid',
            cursor: 'pointer',
            backgroundColor: to_property(theme.colours.secondary),
            color: to_property(theme.colours.primary),
        }}>
            {props.children}
        </button>
    )
}