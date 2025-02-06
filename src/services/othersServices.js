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

export async function userPasswordVerify(plainPassword, hashedPassword) {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword)
    }catch(error){
        return `Error comparing user password: ${error}`
    }
}