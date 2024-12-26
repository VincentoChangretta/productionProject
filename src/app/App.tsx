import { Link } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import "app/styles/index.scss";
import { AppRouter } from "./router";
import { Navbar } from "widgets/Navbar";

export const App = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className={classNames("app", {hovered: true, selected: false}, [theme, 'cls2', "123"])}>
        <Navbar/>
        <AppRouter/>
      </div>
    </>
  );
};
