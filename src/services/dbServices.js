import mongoose from "mongoose";

export async function dbConnexion() {
        await mongoose.connect(process.env.DB_URI)
        .then(()=>{
            console.log("Database connection etablished successfully")
        }).catch((error)=>{
            console.log(`Failed database connexion: ${error}`)
        })
}

export async function dbDisconnexion() {
    await mongoose.disconnect()
    .then(()=>{
        console.log("Database disconnected successfully")
    }).catch((error)=>{
        console.log(`Error to disconnected database: ${error}`)
    })
}