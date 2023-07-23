import React from 'react'
import { ThemeProvider } from '@mui/material'
import appTheme from 'theme/mui'

const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={appTheme()}>{children}</ThemeProvider>
}

export default Theme
