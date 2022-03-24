import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components/macro'

import { Header, Main, Footer, Redirect } from './components'
import { lightTheme, darkTheme, GlobalStyles } from './styles/theme'
import { Routes, Route } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || 'light')

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light")
  }


  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Header themeToggler={themeToggler} theme={theme} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Redirect />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
