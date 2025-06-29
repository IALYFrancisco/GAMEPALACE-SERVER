import { dbConnexion, dbDisconnexion } from "./dbServices.js";
import userCollection from "../models/userModel.js"
import { hashUserPassword, userPasswordVerify } from "./othersServices.js";
import jsonwebtoken from "jsonwebtoken";

export async function Register(request, response) {
    try {
        await dbConnexion()
        let user = await userCollection.findOne({email : request.body.email})
        if(user){
            response.status(200).json({message:"User with this email already exist."})
        }else{
            if(request.body && request.body.password){
                request.body.password = await hashUserPassword(request.body.password)
                let newUser = userCollection(request.body)
                await newUser.save()
                response.status(201).json("User created successfully ✅✅")
            }else{
                response.status(400).json({message: "Bad request"})
            }
        }
    }catch(error){
        response.status(500).json(`Error creating user ⛔⛔: ${error}`)
    }finally{
        await dbDisconnexion()
    }
}

export async function Login (request, response) {
    try {
        await dbConnexion()
        let user = await userCollection.findOne({email : request.query.email})
        if(user && await userPasswordVerify(request.query.password, user.password)){
            let _accessToken = await jsonwebtoken.sign({ id: user._id }, process.env.SECRET_KEY, {expiresIn: "15m"})
            let refreshToken = await jsonwebtoken.sign({id: user._id }, process.env.REFRESH_SECRET, {expiresIn: "7d"})
            response.cookie("refreshToken", refreshToken, {
                httpOnly: true, secure: true, sameSite: "None", maxAge: 7 * 24 * 60 * 60 * 1000, path: '/'
            })
            response.status(200).json({message:"User exist, he can connect 👍👍", accessToken: _accessToken, user: user})
        }else{
            response.status(204).end()
        }
    }catch(error){
        response.status(500).json(error)
    }finally{
        await dbDisconnexion()
    }
}

export async function refreshToken(request, response) {
    await dbConnexion()
    let _refreshToken = request.cookies.refreshToken
    if(!_refreshToken || _.length <= 0) return response.status(403).json({message: "You are not authorized to refresh your refreshToken."})
    jsonwebtoken.verify(_refreshToken, process.env.REFRESH_SECRET, (error, user) => {
        if(error) return response.sendStatus(403);
        const newAccessToken = jsonwebtoken.sign({ id: user._id }, process.env.SECRET_KEY, {expiresIn: "15m"})
        response.json({accessToken: newAccessToken})
    })
    await dbDisconnexion()
}

export async function Logout (request, response){
    try {
        await dbConnexion()
        response.clearCookie('refreshToken', { path: '/' });
        response.status(200).json({message: "User logged out"})
    }catch(error){
        console.log(error)
        response.status(500).json(error)
    }finally{
        await dbDisconnexion()
    }
}