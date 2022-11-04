import { ComponentPropsWithoutRef, useState } from "react";
import useTheme from "../hooks/Theme";
import { FlIntrinsicProps } from "../types";
import { compute_style, parse_numerical_property, populate_intrinsic_style, reduce_props, to_property } from "../utilities";
import Stack from "./Stack";
import Text from "./Text";

// TODO: check for controlled props
export default function Slider(props: FlIntrinsicProps & ComponentPropsWithoutRef<'input'> & {
    min: number,
    max: number,
    step?: number,
    border?: boolean | number,
    label?: string,
    description?: string,
}) {

    const theme = useTheme();

    const initialValue = props.value ?? props.defaultValue ?? props.min ?? '0';
    const [value, setValue] = useState(parseInt(initialValue as any));

    return (
        <Stack as="label" gap={6}>
            <Stack>
                {props.label && <Text children={props.label} mb={0} weight={600} />}
                {props.description && <Text children={props.description} my={0} size="sm" opacity={60} weight={200} />}
            </Stack>

            <input {...reduce_props(props, ['FlIntrinsicProps'])} defaultValue={value} type="range" onChange={e => setValue(parseInt(e.target.value)) }
                className={
                    compute_style({
                        ...populate_intrinsic_style(theme, props, {
                            px: 'md',
                            py: 'sm',
                            radius: 'sm',
                        }),

                        cursor: 'pointer'
                    }, props.className)
                }

                style={{
                    '--value': `${(value - props.min) / (props.max - props.min) * 100}%`,
                    '--radius': parse_numerical_property(props.radius, theme.radius, theme.units, 'sm')
                } as any} />
        </Stack>
    )
}