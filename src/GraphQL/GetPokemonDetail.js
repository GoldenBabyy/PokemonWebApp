import { gql } from '@apollo/client';

export const GetPokemonDetail = gql `
    query pokemon($name: String!) {
        pokemon(name: $name) {
            id
            name
            abilities {
                ability {
                    name
                }
            }
            moves {
                move {
                    name
                }
            }
            types {
                type {
                    name
                }
            }
            message
            status
        }
    }
`