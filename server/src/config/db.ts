import mongoose from 'mongoose'
import colors from "colors"

export const connectDB = async():Promise<void>=>{
    try {
        const {connection} = await mongoose.connect(process.env.MONGO_URI) 
        const url=`${connection.host}:${connection.port}`
        console.log(colors.bgGreen.black.bold(`MongoDB is conected on ${url}`));
    } catch (error) {
        console.log('-----------');
        console.log(colors.bgRed.black.bold(error.message));
        console.log('-----------');
        process.exit(1)
    }
}