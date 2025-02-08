import gameCollection from "../models/gameModel.js";
import { dbConnexion, dbDisconnexion } from "./dbServices.js";

export async function listOfGames(request, response) {
    response.set('Content-Type', 'application/json')
    try{
        await dbConnexion()
        let listOfGame = await gameCollection.find({})
        if(listOfGame.length < 1){
            response.status(204).end()
        }else {
            response.status(200).json(listOfGame)
        }

    }catch(error){
        response.status(500).json(`Erreur de récupération de liste des jeux ⛔⛔ : ${error}`)
    }finally{
        await dbDisconnexion()
    }
}

export async function addOneGame(request, response) {
    response.set('Content-Type', 'application/json')
    try {
        await dbConnexion()
        let newGame = gameCollection(request.body)
        await newGame.save()
        response.status(201).json("Resource added successfully ✅✅")
    }catch(error){
        response.status(500).json(`Failed to add resource, error in the serve 💻💻: ${error}`)
    }finally{
        dbDisconnexion()
    }
}