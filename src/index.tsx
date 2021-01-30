import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider, defaultTheme} from "evergreen-ui";

let theme = {...defaultTheme};
theme.colors.intent.none = "#3cc3b2";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider value={theme} >
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
