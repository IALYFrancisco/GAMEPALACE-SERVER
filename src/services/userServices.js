import { dbConnexion, dbDisconnexion } from "./dbServices.js";
import userCollection from "../models/userModel.js"
import { response } from "express";
import { hashUserPassword } from "./othersServices.js";

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
        
        await dbConnexion()

        let userAlreadyExist = await userCollection.find({email : request.body.email})

        if(userAlreadyExist.length > 0){
            response.statut(200).json("An user with this email already exist 🙂🙂")
        }else{
            request.body.password = await hashUserPassword(request.body.password)
            let newUser = userCollection(request.body)
            await newUser.save()
            response.status(201).json("User created successfully ✅✅")
        }

    }catch(error){
        response.status(500).json(`Error creating user ⛔⛔: ${error}`)
    }finally{
        await dbDisconnexion()
    }
}

export async function userLogin (request, response) {

    response.set('Content-Type', 'application/json')

    try {
        await dbConnexion()
        console.log(request.query)
        let userLoginChecker = await userCollection.find(request.query)
	console.log(userLoginChecker)
        if(userLoginChecker.length == 1){
            response.status(200).json("User exist, he can connect 👍👍")
        }else{
            response.status(200).json("User doesn't exist, email or password invalid 🔑⛔")
        }
    }catch(error){
        response.status(500).json("Error on the server 💻💻")
    }finally{
        await dbDisconnexion()
    }
}