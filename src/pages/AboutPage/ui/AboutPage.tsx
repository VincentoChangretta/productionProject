import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';

const AboutPage = () => {
  const { t } = useTranslation('about');
  return (
      <div className={classNames('123', { hovered: true, scroll: true }, ['cls1', 'cls2'])}>
          {t('О нас')}
      </div>
  );
};

export default AboutPage;
