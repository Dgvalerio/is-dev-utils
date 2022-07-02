import React from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider as MuiProvider } from '@mui/material/styles';

import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createTheme({ palette: { mode: 'dark' } });
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MuiProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
