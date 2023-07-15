import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Web3ConnectionWrapper from './Provider/Web3Provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Web3ConnectionWrapper>
      <App />
    </Web3ConnectionWrapper>
  </React.StrictMode>
);

