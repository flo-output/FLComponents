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

                {/* TODO: Use SCSS to allow for not just -webkit things */}
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
                    background: linear-gradient(to right, ${to_property(theme.colours.primary)} var(--value), transparent var(--value));
                    padding: 0;
                    overflow: clip;
                }

                /* TODO: Fix issue with :focus-visible not working on range */

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 1rem;
                    height: 1rem;
                    background: ${to_property(theme.colours.primary)};
                    cursor: pointer;
                }

                input[type="radio"]:checked::after {
                    content: "";
                    display: block;
                    width: calc(100% - 0.75rem);
                    height: calc(100% - 0.75rem);
                    border-radius: inherit;
                    margin: 0.375rem;
                    background: ${to_property(theme.colours.primary)};
                }

                input[type="checkbox"]:checked {
                    background: ${to_property(theme.colours.primary)};
                }

                input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    display: none;
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