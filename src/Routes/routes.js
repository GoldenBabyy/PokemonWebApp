import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { PokemonList } from "../Pages/PokemonList";
import { PokemonDetail } from '../Pages/PokemonDetail';
import { MyPokemonList } from '../Pages/myPokemonList';
import { ErrorPage } from "../Components/ErrorPage";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={PokemonList} />
      <Route exact path="/pokemonDetail/:name" component={PokemonDetail}/>
      <Route exact path="/myPokemonList" component={MyPokemonList} />
      <Route exact path="/404Error" component={ErrorPage}/>
      <Redirect to="/404Error"/>
    </Switch>
  );
};