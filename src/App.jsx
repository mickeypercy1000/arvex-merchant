import React from "react";
import { Toaster } from 'react-hot-toast';
import Routes from "./Routes";

function App() {
  return (
    <>
      <Routes />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  );
}

export default App;
