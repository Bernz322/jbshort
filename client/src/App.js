import { useState } from 'react'
import { ThemeProvider } from 'styled-components/macro'

import { Header, Main, Footer } from './components'
import { lightTheme, darkTheme, GlobalStyles } from './styles/theme'

function App() {
  const [theme, setTheme] = useState("light")

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }


  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Header themeToggler={themeToggler} theme={theme}/>
      <Main />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
