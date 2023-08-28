import {createContext, useContext} from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
}



export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'light',
    toggleTheme: () => {},
});

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
