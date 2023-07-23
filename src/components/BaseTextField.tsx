import React, { ReactNode } from 'react';

import { TextField, SxProps } from '@mui/material';

type Props = {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
  fullWidth?: boolean;
  margin?: 'dense' | 'normal' | 'none' | undefined;
  borderRadius?: string;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  value?: string;
  textAlign?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
  sx?: SxProps;
  children?: ReactNode[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const BaseTextField: React.FC<Props> = ({
  handleChange,
  label,
  name,
  fullWidth,
  margin,
  borderRadius,
  error,
  helperText,
  placeholder,
  maxLength,
  value,
  textAlign,
  onKeyDown,
  sx,
  children,
  onChange,
  ...rest
}) => {
  return (
    <>
      <TextField
        variant="outlined"
        value={value}
        margin={margin}
        fullWidth={fullWidth}
        name={name}
        label={label && label}
        onChange={Boolean(handleChange) ? handleChange : onChange}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
        InputLabelProps={{ shrink: true }}
        onKeyDown={onKeyDown}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius ? borderRadius : '0.75rem',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: error ? 'errror' : 'primary.main'
            }
          },

          '& .MuiFormLabel-root': {
            display: 'flex',
            alignItems: 'center',
            '& .helpIcon': {
              paddingLeft: '8px',
              fontSize: 30,
              order: 999,
              maxWidth: 300
            }
          },
          '& .MuiOutlinedInput-input': {
            textAlign: textAlign ? textAlign : 'left',
            ml: 0
          },
          ...sx
        }}
        inputProps={{
          maxLength
        }}
        {...rest}
      >
        {children}
      </TextField>
    </>
  );
};
