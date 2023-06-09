import { NativeBaseProvider } from "native-base";
import theme from './theme';
import React from 'react';
import Routes from './routes';
import MainContext from "./contexts";


export default function App() {

  return (
    <NativeBaseProvider theme={theme} >
      <MainContext>
        <Routes/>
      </MainContext>
    </NativeBaseProvider>
  );
}

