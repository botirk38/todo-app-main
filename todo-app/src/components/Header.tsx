import { useTheme } from "../ThemeContext";

import lightIcon from "../assets/images/icon-sun.svg";
import darkIcon from "../assets/images/icon-moon.svg";


const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={theme === 'light' ? 'header-light' : 'header-dark'}>
            <div className="header-div">
                <h1>TODO</h1>

                <button onClick={toggleTheme}>
                    {theme === 'light' ? <img src={darkIcon} alt="Dark Theme" /> : <img src={lightIcon} alt="Light Theme" />}
                </button>
            </div>
        </header>
    );
}

export default Header;
