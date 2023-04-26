import { StyleSheet } from 'react-native';
import { FlatList, NativeBaseProvider } from "native-base";
import theme from './theme';
import React from 'react';
import Main from './components/Main';
import ExpenseItem, { ExpenseItemProps } from './components/ExpenseItem';
import Routes from './routes';

export default function App() {

  const data: ExpenseItemProps[] = [
    {title: "Plus extra", price: 299, subTitle: "3 meses"},
    {title: "Render", price: 199, subTitle: "Extra"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
    {title: "Faculdade Senac", price: 1250, subTitle: "Mensal"},
  ]

  return (
    <NativeBaseProvider theme={theme} >
      <Routes/>
    </NativeBaseProvider>
  );
}

