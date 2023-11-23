import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const element = document.getElementById('portal') as HTMLDivElement;

export const Portal = ({ children }: { children: ReactNode }) => (
  createPortal(children, element)
);
