import Mongoose from "mongoose";

const ProjectSchema = new Mongoose.Schema({
    name:String,
    // user_id:{  //TIP: How to reference a foreign key!
        // type:Mongoose.Types.ObjectId,
        // ref:"user"
    // }
})

export default Mongoose.model("project", ProjectSchema);