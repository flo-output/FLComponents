import useTheme from "../hooks/Theme";
import { compute_style, populate_intrinsic_style, to_property } from "../utilities";
import { ComponentPropsWithoutRef } from "react";
import type { FlIntrinsicProps } from "../types";
import Text from "./Text";

export default function Input
    (props: FlIntrinsicProps & ComponentPropsWithoutRef<'input'> & {
        label?: string,
        description?: string,
        error?: string,
    }) {

    const theme = useTheme();

    return (
        <label>
            {props.label && <Text children={props.label} mb={0} />}
            {props.description && <Text mt={0} children={props.description} opacity={60} weight={200} />}

            <input {...props} type="text" className={
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
            }>
                {props.children}
            </input>
        </label>
    )
}