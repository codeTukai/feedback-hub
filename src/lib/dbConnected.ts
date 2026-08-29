import mongoose from "mongoose";

type ConnectionType = {
    isConnected?: number
}

const connection:ConnectionType = {}

const databaseConnection = async (): Promise<void> =>  {
   if (connection.isConnected) {
      console.log("Database Already Connected");
        
      return
   }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
        connection.isConnected = db.connections[0].readyState
        console.log("DATABASE Connected");
        
    } catch (error) {
        console.log("Connection Failed", error);
        process.exit(1)
    }
}

export default databaseConnection;