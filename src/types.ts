import type { ElementType, ComponentPropsWithoutRef } from "react";
import React from "react";

export type ColourTriple = [number, number, number];
export type HEX = `#${string}`;
type HSL = ColourTriple;

export type FlColour = HEX | keyof FlTheme['colours'];
export type FlBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
export type FlSizeKeys = 'sizes' | 'radius' | 'spacing';

export type FlPolymorphic<B, C extends ElementType> = B & {
    as?: C
} & ComponentPropsWithoutRef<C>

export type FlTextProps = {
    // Thank you, America
    color?: FlColour,
    colour?: FlColour,

    weight?: number,
}

export type FlIntrinsicProps = {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;

    px?: FlBreakpoint;
    py?: FlBreakpoint;
    pl?: FlBreakpoint;
    pr?: FlBreakpoint;
    pt?: FlBreakpoint;
    pb?: FlBreakpoint;

    mx?: FlBreakpoint;
    my?: FlBreakpoint;
    ml?: FlBreakpoint;
    mr?: FlBreakpoint;
    mt?: FlBreakpoint;
    mb?: FlBreakpoint;

    radius?: FlBreakpoint;
    size?: FlBreakpoint;

}

export type FlTheme = {

    // Units used
    units: 'rem' | 'px' | 'em' | 'pt' | 'vw' | 'vh' | 'vmin' | 'vmax',

    // Font used
    font: string,

    // Colours
    colours: {
        primary: HSL,
        secondary: HSL,
        erroneous: HSL
    },

    // Used for Margin, Padding
    spacing: { [key in FlBreakpoint]: number },

    // Used for Border Radius
    radius: { [key in FlBreakpoint]: number },

    // Used for Font Size
    sizes: { [key in FlBreakpoint]: number },
}

export type RawFlTheme = Omit<FlTheme, 'colours'> & {
    colours: { [key in keyof FlTheme['colours']]: HEX }
}