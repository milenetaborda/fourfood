import React, { useEffect, useRef } from 'react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { useField } from '@unform/core';
import { InputSignup } from '../../models/dataForm';

function Input({ name, ...rest }: InputSignup): JSX.Element {
  const inputRef = useRef(null);
  const { fieldName, registerField, error, clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <input ref={inputRef} onFocus={clearError} {...rest} />
      {error && <span>{error}</span>}
    </div>
  );
}

export default Input;
