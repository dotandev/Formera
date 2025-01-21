export class Hasher {
    public async HashData(password: string) {
        try {
            // const salt = await bcrypt.genSalt(10)
            // const hashedPassword = await bcrypt.hash(password, salt)
            // return hashedPassword
            const hashedPassword = password
            return hashedPassword
        } catch (error) {
            return error
        }
    }

    public async CompareHashData(password: string, hashedPassword: string) {
        try {
            // const isMatch = await bcrypt.compare(password, hashedPassword)
            // return isMatch
            const isMatch = (password === hashedPassword)
            return isMatch
        } catch (error) {
            return error
        }
    }
}