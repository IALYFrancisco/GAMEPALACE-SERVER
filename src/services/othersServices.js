import bcrypt from "bcrypt"
export async function hashUserPassword(string) {
    let valueToReturn
    try {
        valueToReturn = await bcrypt.hash(string, 10)
        return valueToReturn
    }catch(error){
        return "Error crypting user password"
    }
}