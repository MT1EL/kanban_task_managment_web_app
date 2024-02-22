import { extendTheme } from "@chakra-ui/react";
import myfont from "./assets/font/PlusJakartaSans-Regular.ttf";
const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
  fonts: {
    body: myfont, // Default font for body text
    heading: myfont, // Default font for headings
  },
  fontSizes: {
    sm: "0.75rem",
    md: "0.9375rem",
    lg: "1.125rem",
    xl: "1.5rem",
  },
  weights: {
    medium: 500,
    bold: 700,
  },
  lineHeights: {
    normal: "normal",
    "3": "0.9375rem",
    "4": "1.1875rem",
    "5": "1.4375rem",
    "6": "1.875rem",
  },
  letterSpacings: {
    wide: "0.15em",
  },
  colors: {
    main_purple: "#635FC7",
    main_purple_hover: "#A8A4FF",
    black: "#000112",
    very_dark_grey_dark_bg: "#20212C",
    dark_Grey: "#2B2C37",
    lines_dark: "#3E3F4E",
    medium_Grey: "#828FA3",
    lines_light: "#E4EBFA",
    light_grey_light_bg: "#F4F7FD",
    white: "#FFFFFF",
    red: "#EA5555",
    red_hover: "#FF9898",
    //light colors
    light: {
      background: "#F4F7FD",
    },
    //dark colors
    dark: {
      background: "#20212C",
    },
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg:
          props.colorMode === "dark"
            ? theme.colors.dark.background
            : theme.colors.light.background,
      },
      root: {
        innerHeight: "100%",
      },
    }),
  },
  components: {
    Checkbox: {
      baseStyle: ({ colorMode }: { colorMode: "light" | "dark" }) => ({
        container: {
          width: "100%",
          backgroundColor:
            colorMode === "dark"
              ? "very_dark_grey_dark_bg"
              : "light_grey_light_bg",
          borderRadius: "0.25rem",
          p: "0.75rem",
          _hover: {
            backgroundColor: "rgba(99, 95, 199, 0.25)",
          },
          _checked: {
            textDecoration: "line-through",
          },
        },
        label: {
          marginLeft: "1rem",
          fontSize: "10px",
        },
        icon: {
          color: "white",
        },
        control: {
          width: "1rem",
          height: "1rem",
          _checked: {
            backgroundColor: "main_purple",
            outlineColor: "main_purple",
            borderColor: "main_purple",
          },
        },
      }),
    },
    Button: {
      defaultProps: {
        // Then here we set the base variant as the default
        variant: "primary",
        size: "xl",
      },
      baseStyle: {
        variant: "primary",
      },
      sizes: {
        xl: {
          h: "3rem",
          px: "2rem",
          py: "0.9375rem",
          borderRadius: "1.5rem",
          fontWeight: "bold",
          fontSize: "md",
          color: "white",
          w: "100%",
        },
        sm: {
          h: "2.5rem",
          lineHeight: "5",
          px: "1rem",
          py: "0.5rem",
          borderRadius: "1.25rem",
          fontWeight: "bold",
          fontSize: "0.8125rem",
          color: "white",
        },
        xs: {
          h: "2rem",
          w: "3rem",
          borderRadius: "1.5rem",
        },
      },
      variants: {
        primary: {
          bg: "main_purple",
          _hover: {
            bg: "main_purple_hover",
          },
        },
        secondary: {
          bg: "rgba(99, 95, 199, 0.10)",
          _hover: {
            bg: "rgba(99, 95, 199, 0.25)",
          },
          color: "main_purple",
        },
        destructive: {
          bg: "red",
          _hover: {
            bg: "red_hover",
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: "0.25rem",
          border: "1px solid rgba(130, 143, 163, 0.25)",
          py: "0.5rem",
          px: "1rem",
          height: "2.5rem",
        },
        icon: {
          color: "main_purple",
        },
      },
    },
    Input: {
      baseStyle: ({ colorMode }: { colorMode: "light" | "dark" }) => ({
        backgroundColor: colorMode === "dark" ? "dark_grey" : "white",
        px: "1rem",
        py: "0.5rem",
        border: "1px solid rgba(130, 143, 163, 0.25)",
        height: "2.5rem",
        borderRadius: "0.25rem",
        fontSize: "13px",
        fontWeight: "medium",
        lineHeight: "23px",
        color: "rgba(0, 0, 0, 0.25)",
        errorBorderColor: "red",
        _active: {
          color: "#000000",
        },
      }),
    },
    Drawer: {
      baseStyle: ({ colorMode }: { colorMode: "light" | "dark" }) => ({
        dialog: {
          background: colorMode === "dark" ? "dark_Grey" : "white",
        },
      }),
    },
  },
  breakpoints: {
    sm: "48rem",
    md: "62.5rem",
  },
});

export default theme;
