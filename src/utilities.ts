import { CSSProperties } from 'react';
import { DefaultTheme } from './providers/FlProvider';
import type { FlColour, ColourTriple, FlBreakpoint, FlIntrinsicProps, FlTheme, HEX, RawFlTheme, FlSizeKeys } from './types';

class Cache {
    private cache: Map<string, any> = new Map();

    get(key: string): any {
        return this.cache.get(key);
    }

    set(key: string, value: any): void {
        this.cache.set(key, value);
    }

    has(key: string): boolean {
        return this.cache.has(key);
    }

    has_value(value: any): boolean {
        return Array.from(this.cache.values()).includes(value);
    }

    all(): Map<string, any> {
        return this.cache;
    }
}

export const styleCache = new Cache();

// TODO: Cleanup, Cache
function hex_to_hsl(hex: HEX): ColourTriple {

    let colour = hex.replace(/#/g, '');
    if (colour.length === 3) {
        colour = colour.split('').map((hex) => {
            return hex + hex;
        }).join('');
    }

    const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(colour);
    if (!result) {
        return [0, 0, 0];
    }

    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);

    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);

    let h = 0, s = 0, l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return [h, s, l];
}

export const to_property = (hsl: ColourTriple, opacity: number = 100) => {
    return `hsla(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%, ${opacity / 100})`;
}

export const calculate_theme = (theme: Partial<RawFlTheme>): FlTheme => {
    return {
        ...DefaultTheme,
        colours: {
            primary: hex_to_hsl(theme.colours?.primary ?? '#000000'),
            secondary: hex_to_hsl(theme.colours?.secondary ?? '#000000'),
            erroneous: hex_to_hsl(theme.colours?.erroneous ?? '#000000'),
        }
    }
}

// TODO: Kill self
export const populate_intrinsic_style = (theme: FlTheme, props: FlIntrinsicProps, defaults: Partial<FlIntrinsicProps> = {}): CSSProperties => {

    const value = (key: FlSizeKeys, from: keyof FlIntrinsicProps, fallback?: FlBreakpoint) => {
        const target = (props[from] ?? defaults[from] ?? fallback as any);
        if (typeof target === 'number') return target + 'px';
        return (theme[key])[target] + theme.units;
    };

    const directional_value = (type: 'p' | 'm', direction: 't' | 'b' | 'l' | 'r') => {

        let key, value: string | number | undefined;
        const return_value = () =>
            typeof value === 'number' ? (value + 'px') :
                theme.spacing[value as any] + theme.units;

        // Use specific value
        key = `${type}${direction}` as 'mt' | 'mb' | 'ml' | 'mr' | 'pt' | 'pb' | 'pl' | 'pr';
        value = props[key] ?? defaults[key];
        if (value !== undefined) return return_value();

        // Use generic value
        key = `${type}${['t', 'b'].includes(direction) ? 'y' : 'x'}` as 'mx' | 'my' | 'px' | 'py';
        value = props[key] ?? defaults[key];
        if (value !== undefined) return return_value();

        return 0;
    }

    return {

        display: 'block',
        textDecoration: 'none',

        fontFamily: theme.font,
        fontSize: value('sizes', 'size', 'md'),
        borderRadius: value('radius', 'radius', 'md'),

        paddingTop: directional_value('p', 't'),
        paddingBottom: directional_value('p', 'b'),
        paddingLeft: directional_value('p', 'l'),
        paddingRight: directional_value('p', 'r'),

        marginTop: directional_value('m', 't'),
        marginBottom: directional_value('m', 'b'),
        marginLeft: directional_value('m', 'l'),
        marginRight: directional_value('m', 'r'),

    }
}

export const colour_property = (theme: FlTheme, colour: FlColour, opacity: number = 100) => {
    return colour.startsWith('#') ? colour : to_property(theme.colours[colour as keyof FlTheme['colours']], opacity);
}

export const react_css_to_raw_css = (str: string) => {
    return str.replace(/([A-Z])/g, ($1) => "-" + $1.toLowerCase());
}

// TODO: Optimize, maybe don't use createElement, allow for more than 
const Alphabet = 'ABCDEF0123456789';
export const compute_style = (styles: CSSProperties, className?: string) => {

    const suffix = className ? ' ' + className : '';

    const hash = JSON.stringify(styles);
    if (styleCache.get(hash)) return styleCache.get(hash) + suffix;

    let id;
    do {
        id = 'fl-';
        for (let i = 0; i < 6; i++) {
            id += Alphabet[Math.floor(Math.random() * Alphabet.length)];
        }
    } while (styleCache.has_value(id));

    styleCache.set(hash, id);

    const element = document.createElement('style');
    element.innerHTML = `.${id} { ${Object.entries(styles).map(([k, v]) => `${react_css_to_raw_css(k)}: ${v};`).join(' ')} }`;

    document.head.appendChild(
        element
    );

    return id + suffix;
}

export const FlFalsey = [false, null, undefined, ''];