import React from 'react';
import Button from '../Button/Button';
import './KeyboardButton.scss';

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

const KeyboardButton: React.FC<Props> = ({ children, onClick }) => (
  <Button
    className='keyboard-button !h-[75px] !w-[70px] !border-none !bg-white !text-black !text-4xl font-semibold !font-quicksand'
    onClick={onClick}
  >
    {children}
  </Button>
);

export default KeyboardButton;
