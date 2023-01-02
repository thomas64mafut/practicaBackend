const express = require('express');
const router = express.Router();

const { savePokemon, getPokemon, editPokemon, deletePokemon, updateStock } = require('./../controllers/pokemon');
const { addPokemonMiddleware, deletePokemonMiddleware } = require ('./../middlewares/pokemons');
const { verifyJwt } = require('./../middlewares/auth')

router.post("/", verifyJwt, addPokemonMiddleware, savePokemon);
router.get("/", verifyJwt, getPokemon);
router.put("/:id", verifyJwt, editPokemon);
router.delete("/", verifyJwt, deletePokemonMiddleware, deletePokemon);
router.patch("/:id", verifyJwt, updateStock)

module.exports = router; 