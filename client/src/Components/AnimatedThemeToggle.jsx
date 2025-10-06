import { useContext } from 'react';
import { ThemeContext } from '../Contexts/ThemeContext';
import '../styles/ThemeToggle.css';

const AnimatedThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const handleToggle = (e) => {
    toggleTheme();
  };

  return (
    <div className="theme-toggle-container">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={theme === 'dark'}
          onChange={handleToggle}
        />
        <div className="slider">
          <div className="sun"></div>
          <div className="moon"></div>
          <div className="cloud cloud1"></div>
          <div className="cloud cloud2"></div>
          <div className="star star1"></div>
          <div className="star star2"></div>
          <div className="star star3"></div>
          <div className="star star4"></div>
          <div className="star star5"></div>
        </div>
      </label>
    </div>
  );
};

export default AnimatedThemeToggle;