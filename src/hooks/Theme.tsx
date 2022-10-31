import { useContext } from "react";
import { FlContext } from "../contexts/ThemeContext";

export default function useTheme() {
    return useContext(FlContext);
}