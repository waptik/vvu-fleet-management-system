// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react"
// 2. Add your color mode config

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
// 3. extend the theme
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors,
})
export default theme
