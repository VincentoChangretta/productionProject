import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import "app/styles/index.scss";
import { AppRouter } from "./router";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { Suspense } from "react";
import "shared/config/i18n/i18n";

export const App = () => {
  const { theme } = useTheme();
  return (
    <>
      <div className={classNames("app", { hovered: true, selected: false }, [theme, 'cls2', "123"])}>
        <Suspense fallback="">
          <Navbar />
          <div className="content-page">
            <Sidebar />
            <AppRouter />
          </div>
        </Suspense>
      </div>
    </>
  );
};
