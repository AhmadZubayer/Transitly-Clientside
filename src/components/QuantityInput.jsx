import React from 'react';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const blue = {
  400: '#3399ff',
  500: '#007fff',
  700: '#0059B2',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputRoot = styled('div')(`
  font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  color: ${grey[500]};
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 0;
`);

const Input = styled('input')(`
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: ${grey[900]};
  background: #fff;
  border: 1px solid ${grey[200]};
  box-shadow: 0 2px 4px rgba(0,0,0, 0.05);
  border-radius: 8px;
  margin: 0 8px;
  padding: 10px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${blue[700]}40;
  }

  &:focus-visible {
    outline: 0;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
`);

const Button = styled('button')(`
  font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid;
  border-radius: 999px;
  border-color: ${grey[200]};
  background: ${grey[50]};
  color: ${grey[900]};
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  cursor: pointer;
  padding: 0;

  &:hover {
    cursor: pointer;
    background: ${blue[500]};
    border-color: ${blue[400]};
    color: #fff;
  }

  &:focus-visible {
    outline: 0;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${grey[50]};
    color: ${grey[900]};
  }

  &.increment {
    order: 1;
  }
`);

const QuantityInput = React.forwardRef(
  (
    {
      'aria-label': ariaLabel = 'Quantity Input',
      min = 1,
      max = 99,
      value = 1,
      onChange,
      disabled = false,
      ...other
    },
    ref
  ) => {
    const handleDecrement = () => {
      const newValue = Math.max(min, Number(value) - 1);
      if (onChange) {
        onChange({ target: { value: newValue } });
      }
    };

    const handleIncrement = () => {
      const newValue = Math.min(max, Number(value) + 1);
      if (onChange) {
        onChange({ target: { value: newValue } });
      }
    };

    const handleInputChange = (e) => {
      let val = e.target.value;
      if (val === '') {
        if (onChange) onChange(e);
        return;
      }
      val = Number(val);
      if (val >= min && val <= max) {
        if (onChange) onChange(e);
      }
    };

    return (
      <InputRoot>
        <Button
          onClick={handleDecrement}
          disabled={disabled || Number(value) <= min}
          aria-label="Decrease"
        >
          <RemoveIcon fontSize="small" />
        </Button>
        <Input
          ref={ref}
          type="number"
          aria-label={ariaLabel}
          min={min}
          max={max}
          value={value}
          onChange={handleInputChange}
          disabled={disabled}
          {...other}
        />
        <Button
          onClick={handleIncrement}
          disabled={disabled || Number(value) >= max}
          className="increment"
          aria-label="Increase"
        >
          <AddIcon fontSize="small" />
        </Button>
      </InputRoot>
    );
  }
);

QuantityInput.displayName = 'QuantityInput';

export default QuantityInput;
