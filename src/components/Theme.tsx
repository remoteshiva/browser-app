import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components"


const colors = {
  heavyMetal: '#41413a',
  sauvignon: '#fdfaf9',
  romance: '#F5EFE8',
  doveGray: '#7B776C',
  cardinal: '#c82323',
  richGold: '#924623',
  hintOfRed: '#F4ECE9',
  white: '#fff',
}

const fonts = ['Lato', 'Lora', 'sans-serif']

const components = {
  shivaCard: {
    width: '327px',
    height: '258px',
    borderRadius: '10px'
  }

}

interface RemoteShivaTheme {
  colors: { [key in keyof typeof colors]: string };
  fonts: string[]
}

const theme = {
  colors,
  fonts,
  components,
}

interface Props {
    children?: ReactNode
  }

const Theme = ({ children }: Props) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme