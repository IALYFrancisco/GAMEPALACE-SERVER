import bcrypt from "bcrypt"
export async function hashUserPassword(string) {
    try {
        bcrypt.hash(string, 10).then((result)=> {return result})
    }catch(error){
        return "Error crypting user password"
    }
}