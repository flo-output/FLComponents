import { useState } from "react";
import { FlContext } from "../contexts/ThemeContext";
import { calculate_theme, to_property } from "../utilities";
import { Helmet } from "react-helmet";
import type { FLIntrinsicProps, FlTheme, RawFlTheme } from "../types";

export const DefaultTheme: FlTheme = {
    units: 'rem',
    font: 'sans-serif',

    colours: {
        primary: [41, 12, 25],
        secondary: [129, 93, 89],
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

export default function FlProvider({ children }: FLIntrinsicProps) {

    const [theme, setTheme] = useState<FlTheme>(DefaultTheme);

    const value = {
        ...theme,
        update: (new_theme: RawFlTheme) => setTheme(calculate_theme(new_theme))
    }

    return (
        <>
            <Helmet>
                <style children={`
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