import { Link } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import "app/styles/index.scss";
import { AppRouter } from "./router";

export const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <>
      <div className={classNames("app", {hovered: true, selected: false}, [theme, 'cls2', "123"])}>
        <button onClick={toggleTheme}>theme</button>
        <Link to={"/"}>Главная</Link>
        <Link to={"/about"}>О сайте</Link>
        <AppRouter/>
      </div>
    </>
  );
};
