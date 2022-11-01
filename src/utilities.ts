import { CSSProperties } from 'react';
import { DefaultTheme } from './providers/FlProvider';
import type { Colour, ColourTriple, FlBreakpoint, FLIntrinsicProps, FlTheme, RawFlTheme } from './types';

class Cache {
    private cache: Map<string, any> = new Map();

    get(key: string): any {
        return this.cache.get(key);
    }

    set(key: string, value: any): void {
        this.cache.set(key, value);
    }
}

const cache = new Cache();

export const hex_to_hsl = (hex: `#${string}`): ColourTriple => {
    const key = `hsl:${hex}`;
    if (cache.get(key)) return cache.get(key);

    const result = hex.slice(1).match(/.{2}/g);
    if (!result || result.length < 3) return [0, 0, 0];

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {

        h = s = 0; // achromatic

    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        if (h) h /= 6;
    }

    const value = [h ?? 0, s, l] as ColourTriple;
    cache.set(key, value);

    return value;
}

export const to_property = (hsl: ColourTriple) => {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

export const calculate_theme = (theme: RawFlTheme): FlTheme => {
    return {
        ...DefaultTheme,
        colours: {
            primary: hex_to_hsl(theme.colours.primary),
            secondary: hex_to_hsl(theme.colours.secondary),
        }
    }
}

export const populate_intrinsic_style = (theme: FlTheme, props: FLIntrinsicProps, defaults: Partial<FLIntrinsicProps> = {}): CSSProperties => {

    const unit = (v: any) => {
        return `${v}${theme.units}`;
    }

    const value = (key: keyof FlTheme, from: keyof FLIntrinsicProps, fallback?: string) => {
        return (theme[key] as any)[
            (props[from] ?? defaults[from] ?? fallback as any)
        ]
    };

    const directional_value = (type: 'p' | 'm', d: 't' | 'b' | 'l' | 'r') => {

        // Use specific value
        let key = `${type}${d}`;
        let value = props[key as keyof FLIntrinsicProps] ?? defaults[key as keyof FLIntrinsicProps];
        if (value) return theme.spacing[value as FlBreakpoint];

        // Use generic value
        key = `${type}${['t', 'b'].includes(d) ? 'y' : 'x'}`;
        value = props[key as keyof FLIntrinsicProps] ?? defaults[key as keyof FLIntrinsicProps];
        if (value) return theme.spacing[value as FlBreakpoint];

        return 0;
    }

    return {
        fontFamily: theme.font,
        fontSize: unit(value('sizes', 'size', 'md')),
        borderRadius: unit(value('radius', 'radius', 'md')),

        paddingTop: unit(directional_value('p', 't')),
        paddingBottom: unit(directional_value('p', 'b')),
        paddingLeft: unit(directional_value('p', 'l')),
        paddingRight: unit(directional_value('p', 'r')),

        marginTop: unit(directional_value('m', 't')),
        marginBottom: unit(directional_value('m', 'b')),
        marginLeft: unit(directional_value('m', 'l')),
        marginRight: unit(directional_value('m', 'r')),

    }
}

export const colour_property = (theme: FlTheme, colour: Colour) => {
    return colour.startsWith('#') ? colour : to_property(theme.colours[colour as keyof FlTheme['colours']]);
}