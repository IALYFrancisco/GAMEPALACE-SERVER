import gameCollection from "../models/gameModel.js";
import { dbConnexion, dbDisconnexion } from "./dbServices.js";

export async function listOfGames(request, response) {
    response.set('Content-Type', 'application/json')
    try{
        dbConnexion()
        response.status(200).json(gameCollection.find({}))
    }catch(error){
        response.status(500).json(`Erreur de récupération de liste des jeux: ${error}`)
    }finally{
        dbDisconnexion()
    }
}