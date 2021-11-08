import React, { forwardRef } from 'react';

const Input = ({ onFocus, onChange, onKeyDown, onBlur, style, value }, ref) => (
  <input
    ref={ref}
    onBlur={onBlur}
    onChange={onChange}
    onFocus={onFocus}
    onKeyDown={onKeyDown}
    style={style}
    value={value}
  />
);

const forwardedInput = forwardRef(Input);

export default forwardedInput;
