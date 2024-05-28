import React, { type FC } from 'react';
import './index.css';

const Button: FC<{ type: string; children: any }> = ({ type, children }) => {
  return (
    <button type="button" className={`motor-btn motor-btn-${type}`}>
      {children}
    </button>
  );
};

export default Button;
