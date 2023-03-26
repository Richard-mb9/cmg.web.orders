import React from 'react';
import { GlobalContext } from './context';
import Routes from './routes';

function App() {
  return (
    <GlobalContext>
        <Routes />
    </GlobalContext>
  );
}

export default App;
