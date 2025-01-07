import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense } from 'react';
import { AppRouter } from './router';
import 'shared/config/i18n/i18n';

export const App = () => {
  const { theme } = useTheme();
  return (
      <div className={classNames('app', { hovered: true, selected: true }, [theme, 'cls2', '123'])}>
          <Suspense fallback="">
              <Navbar />
              <div className="content-page">
                  <Sidebar />
                  <AppRouter />
              </div>
          </Suspense>
      </div>
  );
};
