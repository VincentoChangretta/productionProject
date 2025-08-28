import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './LoginForm.module.scss';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getUsernameSelector } from '../../model/selectors/getUsernameSelector/getUsernameSelector';
import { getPasswordSelector } from '../../model/selectors/getPasswordSelector/getPasswordSelector';
import { useCallback } from 'react';
import { loginActions } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getErrorSelector } from '../../model/selectors/getErrorSelector/getErrorSelector';
import { getLoadingSelector } from '../../model/selectors/getLoadingSelector/getLoadingSelector';
import { Text, TextTheme } from 'shared/ui/Text/Text';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    const username = useSelector(getUsernameSelector);
    const password = useSelector(getPasswordSelector);
    const error = useSelector(getErrorSelector);
    const loading = useSelector(getLoadingSelector);
    const dispatch = useDispatch();

    const handleChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );
    const handleChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const handleLoginByUsername = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [username, password, dispatch]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />
            {error && <Text text={error} theme={TextTheme.ERROR} />}
            <Input
                autofocus
                className={cls.input}
                type="text"
                placeholder={t('Введите логин')}
                value={username}
                onChange={handleChangeUsername}
            />
            <Input
                className={cls.input}
                type="password"
                placeholder={t('Введите пароль')}
                value={password}
                onChange={handleChangePassword}
            />
            <Button
                disabled={loading}
                className={cls.loginBtn}
                theme={ButtonTheme.OUTLINE}
                onClick={handleLoginByUsername}
            >
                {t('Войти')}
            </Button>
        </div>
    );
};
