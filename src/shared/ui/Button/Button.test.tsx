import { render, screen } from '@testing-library/react';
import { Button } from 'shared/ui/Button/Button';
import { ThemeButton } from './Button';

describe('Button', () => {
    test('test render', () => {
        render(<Button>test</Button>);
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    test('clear theme', () => {
        render(<Button theme={ThemeButton.CLEAR}>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
        screen.debug();
    });
});
