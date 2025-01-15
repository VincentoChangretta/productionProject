import { useEffect, useState } from 'react';

interface BugButtonProps {
    className?: string;
}

export const BugButton = ({ className }: BugButtonProps) => {
    const [error, setError] = useState(false);

    const setThrow = () => setError(true);

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);

    return <button onClick={setThrow}>Throw Error</button>;
};
