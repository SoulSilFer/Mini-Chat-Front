import React from 'react';

import { SxProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';

type Props = {
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  color?:
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | undefined;
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: {
    width?: string;
    height?: string;
  };
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: SxProps;
  loading?: boolean;
};

export const BaseButton: React.FC<Props> = ({
  type = 'button',
  variant = 'contained',
  color = 'primary',
  title,
  onClick,
  disabled,
  fullWidth,
  size,
  startIcon,
  sx,
  endIcon,
  loading,
  ...rest
}) => {
  return (
    <LoadingButton
      type={type}
      variant={variant}
      color={color}
      sx={{
        borderRadius: '0.75rem',
        textTransform: 'none',
        width: size && size.width,
        height: size && size.height,
        ...sx
      }}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      loading={loading}
      {...rest}
    >
      {title}
    </LoadingButton>
  );
};
