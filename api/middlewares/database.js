import mongoose from "mongoose";

const DatabaseConnection= async()=>{ await mongoose.connect("mongodb+srv://sujalyadav7538:" + encodeURIComponent("Sujal7538@") + "@cluster0.mjf54po.mongodb.net/")
    .then(() => console.log('Database Connected'))
    .catch((e) => console.log('Error', e));}

export default DatabaseConnection;    
