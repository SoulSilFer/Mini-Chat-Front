import { Palette } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string
  }
}
