import "./DarkMode.css";

const DarkMode = () => {
    return(
    <div className="toggle-theme-wrapper">
        <span>light</span>
        <label className="toggle-theme" htmlFor="checkbox">
            <input type="checkbox"
            id="checkbox" />
            <div className="slider round"></div>
        </label>
        <span>dark</span>
    </div>
    );
};
export default DarkMode;