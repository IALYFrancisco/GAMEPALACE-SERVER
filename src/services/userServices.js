import { dbConnexion, dbDisconnexion } from "./dbServices.js";
import userCollection from "../models/userModel.js"
import { response } from "express";

export async function getAllUser( request, response ){
    
    await dbConnexion()

    let allUser = await userCollection.find({})

    response.set('Content-Type', 'application/json')

    if(allUser == ""){
        response.status(404).json("Resource not found, the collection is empty")
    }else {
        response.status(200).json(allUser)
    }

    await dbDisconnexion()
}

export async function postOneUser(request, response) {
    response.set("Content-Type", "application/json")
    try {
        let newUser = userCollection(request.body)
        await dbConnexion()
        await newUser.save()
        response.status(201).json("User created successfully ✅✅")
    }catch(error){
        response.status(500).json(`Error creating user ⛔⛔: ${error}`)
    }finally{
        await dbDisconnexion()
    }
}