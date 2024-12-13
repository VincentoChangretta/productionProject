import React, { Suspense, useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { AboutPageAsync } from "./pages/AboutPage/AboutPage.async";
import "./styles/index.scss";
import { useTheme } from "./theme/useTheme";
import { classNames } from "./helpers/classNames/classNames";

export const App = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(classNames("app", {hovered: true, selected: false}, [theme, 'cls2', "123"]))
  return (
    <>
      <div className={classNames("app", {hovered: true, selected: false}, [theme, 'cls2', "123"])}>
        <button onClick={toggleTheme}>theme</button>
        <Link to={"/"}>Главная</Link>
        <Link to={"/about"}>О сайте</Link>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={"/"} element={<MainPageAsync />} />
            <Route path={"/about"} element={<AboutPageAsync />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};
