import React from 'react';
import {AuthProvider} from './src/navigations/context/authContest';
import AppNavigations from './src/navigations';
const App = () => {
  return (
    <AuthProvider>
     <AppNavigations />
    </AuthProvider>
  );
};

export default App;
