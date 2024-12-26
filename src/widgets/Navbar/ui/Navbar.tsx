import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { ThemeSwitcher } from "shared/ui/ThemeSwitcher";

interface NavBarProps {
  className?: string;
}

export const Navbar = ({ className }: NavBarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <ThemeSwitcher />
      <div className={cls.link}>
        <AppLink theme={AppLinkTheme.SECONDARY} to={"/"} className={cls.mainLink}>Главная</AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={"/about"}>О сайте</AppLink>
      </div>
    </div>
  );
};