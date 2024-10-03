import React from 'react';
import { Button as MuiButton } from '@mui/material';
const Button = ({ children, ...props }) => (
  <MuiButton variant="contained" color="primary" {...props}>
    {children}
  </MuiButton>
);

export default Button;
