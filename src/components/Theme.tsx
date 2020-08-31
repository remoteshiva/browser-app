import React, { ReactNode } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components"

const theme: DefaultTheme = {
    navbar:{
        backgroundColor: 'rgba(245, 239, 232, 0.96)',
        menuItem: {
          color: '#41413a'
        }
    },
  colors: {
    heavyMetal: '#41413a'
  },
  fonts: ["Lato", "Lora", "sans-serif"],
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em"
  }
};

interface Props {
    children?: ReactNode
  }

const Theme = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme