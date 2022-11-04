import useTheme from "../hooks/Theme";
import { compute_style, FlFalsey, populate_intrinsic_style, reduce_props, to_property } from "../utilities";
import { ComponentPropsWithoutRef } from "react";
import type { FlIntrinsicProps } from "../types";
import Text from "./Text";
import Stack from "./Stack";

export default function Input
    (props: FlIntrinsicProps & ComponentPropsWithoutRef<'input'> & {
        label?: string,
        description?: string,
        error?: string,
        password?: boolean,
    }) {

    const theme = useTheme();

    return (
        <Stack as="label" gap={6}>
            <Stack>
                {props.label && <Text children={props.label} mb={0} weight={600} />}
                {props.description && <Text children={props.description} my={0} size="sm" opacity={60} weight={200} />}
            </Stack>

            <input {...reduce_props(props, ['FlIntrinsicProps'])} type={props.password ? "password" : "text"}
                className={
                    compute_style({
                        ...populate_intrinsic_style(theme, props, {
                            px: 'md',
                            py: 'sm',
                            radius: 'sm',
                        }),

                        border: '1px solid',
                        cursor: 'text',
                        backgroundColor: to_property(theme.colours.secondary),
                        color: to_property(theme.colours.primary),
                    }, props.className)
                }
                style={{
                    color: FlFalsey.includes(props.error) ? undefined : to_property(theme.colours.erroneous),
                    borderColor: FlFalsey.includes(props.error) ? undefined : to_property(theme.colours.erroneous),
                    '--outline': FlFalsey.includes(props.error) ? undefined : to_property(theme.colours.erroneous),
                } as any}>
                {props.children}
            </input>
        </Stack>
    )
}