import useTheme from "../hooks/Theme";
import { colour_property, compute_style, populate_intrinsic_style } from "../utilities";
import type { FlIntrinsicProps, FlTextProps } from "../types";
import Stack from "./Stack";

// TODO: Implement better props
export default function Blockquote(props: FlIntrinsicProps & FlTextProps & {
    subtitle?: string
}) {

    const theme = useTheme();

    return (
        <Stack pl="lg" py="xs" direction="column" radius={0} gap="xs" style={{
            borderLeft: `5px solid ${colour_property(theme, 'primary')}`,
        }} border={false}>
            <span className={compute_style({
                ...populate_intrinsic_style(theme, props, {
                    size: 'lg',
                }),

                color: colour_property(theme, props.colour ?? props.color ?? 'primary'),
                fontWeight: props.weight ?? 700,
            }, props.className)}>
                {props.children}
            </span>
            <span className={compute_style({
                ...populate_intrinsic_style(theme, props, {
                    size: 'md',
                }),

                fontStyle: 'italic',
                color: colour_property(theme, props.colour ?? props.color ?? 'primary', 60),
                fontWeight: props.weight ?? 400,
            }, props.className)}>
                {props.subtitle}
            </span>
        </Stack>
    )
}