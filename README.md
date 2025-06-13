# Description
Uses [PokeAPI](https://pokeapi.co/) to get pokemon data to help you build out pokemon teams.

Can only do 100 calls/day according to the [documentation](https://pokeapi.co/docs/graphql).

# Running the program
In the terminal within the same directory type the following in to run react: % 
> bash command.sh

# Todos
* Will need to make a cache object to keep track of API data using another component
* Need to make functions to do something to return if the number of calls reach the limit.
* Need to probably save multiple api links off of https://pokeapi.co/api/v2/ as the base link.

## Helpful API links
* evolution-chain/{id}/ to get the family trees of pokemon
* generations/{id or name}/ to get the time of the games - might be useful to link up to gaming devices
* pokedex/{id or name}/ to get the different regions - really useful to get the National Pokedex via https://pokeapi.co/api/v2/pokedex/national/ and to get the others for region specific areas
* version/{id or name}/ to get the different game versions - might be useful
* version-group/{id or name}/ go get a group to link up to pokedex - might be useful
* ability/{id or name}/ - might be useful for stats
* nature/{id or name}/ - might be useful for stats
* pokemon/{id or name}/ to get the base details
* pokemon-species/{id or name}/ to get special attributes
* stat/{id or name}/ to get details specific to the stats
* type/{id or name}/ to help strategize groupings wiht the pokemon

# References
* [PokeAPI](https://pokeapi.co/)
* [Markdown Guide](https://www.markdownguide.org/hacks/)
* https://www.geeksforgeeks.org/javascript/how-to-remove-a-key-from-javascript-object/
