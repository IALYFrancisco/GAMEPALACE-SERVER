import { dbConnexion, dbDisconnexion } from "./dbServices.js";
import userCollection from "../models/userModel.js"
import { hashUserPassword, userPasswordVerify } from "./othersServices.js";
import jsonwebtoken from "jsonwebtoken";

//Service de récupération de la liste de tout les utilisateurs
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

//Service en charge de l'inscription des utilisateurs
export async function postOneUser(request, response) {
    response.set("Content-Type", "application/json")
    try {
        
        await dbConnexion()

        let userAlreadyExist = await userCollection.find({email : request.body.email})

        if(userAlreadyExist.length > 0){
            response.status(204).end()
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

var tokens = [];

//Service en charge du connexion des utilisateurs
export async function userLogin (request, response) {
    try {
        await dbConnexion()
        const userLoginChecker = await userCollection.find({email : request.query.email})
        if(userLoginChecker.length == 1 && await userPasswordVerify(request.query.password, userLoginChecker[0].password)){
            const accessToken = jsonwebtoken.sign({ id: userLoginChecker._id, email: userLoginChecker.email }, process.env.SECRET_KEY, {expiresIn: "15m"})
            const refreshToken = jsonwebtoken.sign({id: userLoginChecker._id, email: userLoginChecker.email}, process.env.REFRESH_SECRET, {expiresIn: "7d"})
            tokens.push(refreshToken)
            response.cookie("refreshToken", refreshToken, {
                httpOnly: true, secure: true, sameSite: "Strict", maxAge: 7 * 24 * 60 * 60 * 1000
            })
            response.status(200).json("User exist, he can connect 👍👍")
        }else{
            response.status(204).end()
        }
    }catch(error){
        response.status(500).json("Error on the server 💻💻")
    }finally{
        await dbDisconnexion()
    }
}

//Service en charge du rafraîchissement des tokens
export async function refreshToken(request, response) {
    const _refreshToken = request.coockies.refreshToken
    if(!refreshToken || !tokens.includes(refreshToken)) return response.status(403).json({mesage: "L'utilisateur n'est pas connecté, le token est absent"})
    jsonwebtoken.verify(refreshToken, process.env.REFRESH_SECRET, (error, user) => {
        if(error) return response.sendStatus(403);
        const newAccessToken = jsonwebtoken.sign({ id: userLoginChecker._id, email: userLoginChecker.email }, process.env.SECRET_KEY, {expiresIn: "15m"})
        response.json({accessToken: newAccessToken})
    })
}

//Service en charge du déconnexion des utilisateurs
export async function logout (request, response){
    tokens = tokens.filter((token) => token !== request.coockies.refreshToken)
    response.clearCookie("refreshToken");
    response.json({message: "Logged out"})
}