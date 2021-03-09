import { ReactNode } from 'react';

export interface PopupProps {
    head?: ReactNode;
    body?: ReactNode;
    foot?: ReactNode;
    show: boolean;
}
