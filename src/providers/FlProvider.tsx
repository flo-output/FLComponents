import { useState } from "react";
import { FlContext } from "../contexts/ThemeContext";
import { calculate_theme, to_property } from "../utilities";
import { Helmet } from "react-helmet";
import type { FlIntrinsicProps, FlTheme, RawFlTheme } from "../types";

export const DefaultTheme: FlTheme = {
    units: 'rem',
    font: 'sans-serif',

    colours: {
        primary: [0, 0, 100],
        secondary: [0, 0, 0],
        erroneous: [0, 100, 50],
    },
    spacing: {
        'xs': 0.25,
        'sm': 0.5,
        'md': 1,
        'lg': 2,
        'xl': 4,
    },
    radius: {
        'xs': 0.25,
        'sm': 0.5,
        'md': 1,
        'lg': 2,
        'xl': 999,
    },
    sizes: {
        'xs': 0.5,
        'sm': 0.75,
        'md': 1,
        'lg': 1.75,
        'xl': 2,
    }
}

export default function FlProvider({ children, theme: initialTheme }: FlIntrinsicProps & { theme?: Partial<RawFlTheme> }) {

    const [theme, setTheme] = useState<FlTheme>({ ...DefaultTheme, ...(initialTheme ? calculate_theme(initialTheme) : undefined) });

    const value = {
        ...theme,
        update: (new_theme: RawFlTheme) => setTheme(calculate_theme(new_theme))
    }

    return (
        <>
            <Helmet>
                <style children={`
                ::selection {
                    background-color: ${to_property(theme.colours.primary)};
                    color: ${to_property(theme.colours.secondary)};
                }

                * {
                    box-sizing: border-box;
                }

                *:focus {
                    outline: none;
                }

                *:focus-visible {
                    outline: 2px solid ${to_property(theme.colours.primary)} !important;
                    outline-color: var(--outline) !important;
                    outline-offset: 2px;
                    border-color: transparent !important;
                }

                *::placeholder {
                    color: ${to_property(theme.colours.primary, 60)};
                }

                input[type="range"] {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 1rem;
                    background: transparent;
                    padding: 0;
                    border: 2px solid ${to_property(theme.colours.primary)};
                }

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 1rem;
                    height: 1rem;
                    background: ${to_property(theme.colours.primary)};
                    cursor: pointer;
                    border-radius: var(--radius);
                }

                input[type="range"]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 1rem;
                    cursor: pointer;
                    background: linear-gradient(to right, ${to_property(theme.colours.primary)} var(--value), transparent var(--value));
                    border-radius: var(--radius);
                }

                body {
                    margin: 0;
                    padding: 0;
                    background-color: ${to_property(theme.colours.secondary)};
                }`} />
            </Helmet>
            <FlContext.Provider value={value}>
                {children}
            </FlContext.Provider>
        </>
    )
}