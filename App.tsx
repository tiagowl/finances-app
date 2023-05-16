import { NativeBaseProvider } from "native-base";
import theme from './theme';
import React from 'react';
import Routes from './routes';
import MainContext from "./contexts";
import "react-native-url-polyfill/auto";


export default function App() {

  return (
    <NativeBaseProvider theme={theme} >
      <MainContext>
        <Routes/>
      </MainContext>
    </NativeBaseProvider>
  );
}

