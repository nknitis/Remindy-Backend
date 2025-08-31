import mongoose from "mongoose";
const connectDB=async ()=>{
try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb conected succefully on port ${process.env.PORT}`);
} catch (error) {
    console.error("mongdB connection failed",error.message);
    process.exit(1);
}
}

export {connectDB}