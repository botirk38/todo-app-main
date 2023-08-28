import './App.css';
import { ThemeContext, Theme } from './ThemeContext';  
import Header from './components/Header';
import { useState } from 'react';
import Todo from './components/Todo';

const App = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('light');  

  const toggleTheme = () => { 
    setCurrentTheme((prevTheme: Theme) => prevTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <main className={currentTheme === "light" ? "App background-light" : "App background-dark"}>
        <Header/>
        <Todo/>
      </main>
    </ThemeContext.Provider>
  )
}

export default App;
