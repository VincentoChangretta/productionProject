import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = () => <LoginForm />;

export const Primary = Template.bind({});
Primary.decorators = [
    StoreDecorator({
        login: { username: 'username', password: 'password' },
    }),
];

export const withError = Template.bind({});
withError.decorators = [
    StoreDecorator({
        login: { username: 'username', password: 'password', error: 'error' },
    }),
];
export const Loading = Template.bind({});
Loading.decorators = [
    StoreDecorator({
        login: { loading: true },
    }),
];
