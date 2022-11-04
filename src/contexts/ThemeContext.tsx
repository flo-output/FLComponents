import { createContext } from "react"
import { FlTheme, RawFlTheme } from "../types"

export const FlContext =
    createContext<FlTheme & { update: (new_theme: RawFlTheme) => void }>(undefined as any);
