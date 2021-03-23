// import gql from 'graphql-tag';
import { gql } from '@apollo/client';

export const GetPokemon = gql `
    query pokemons($limit: Int, $offset: Int) {
        pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
                url
                name
                image
            }
        }
    }
`