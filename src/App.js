import React from 'react';
import { BrowserRouter} from "react-router-dom";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from "@apollo/react-hooks";
import { Copyright } from './Components/Copyright';
import { Routes } from './Routes/routes';
import { Header } from './Components/Header';
import './App.css';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql'
  });

  return (
   <ApolloProvider client={client}>
     <Header/>
      <BrowserRouter>
        <Routes />
    </BrowserRouter>
    <Copyright/>
   </ApolloProvider>
  );
}

export default App;