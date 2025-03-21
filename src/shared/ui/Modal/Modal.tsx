import { classNames } from 'shared/lib/classNames/classNames';
import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean; // для ленивой загрузки
}

const ANIMATION_DELAY = 300;

export const Modal: FC<ModalProps> = props => {
    const { children, className, isOpen, onClose, lazy } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMouted] = useState(false);
    const timeRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (isOpen) {
            setIsMouted(true);
        }
    }, [isOpen]);

    const mods: Record<string, boolean> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHandler();
            }
        },
        [closeHandler],
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    if (!isOpen) return null;
    if (lazy && !isMounted) return null;

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className])}>
                <div className={cls.overlay} onClick={closeHandler}>
                    <div className={cls.content} onClick={onContentClick}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
