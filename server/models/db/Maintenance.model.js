import mongoose from "mongoose";

const MaintenanceSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    asset: String,
    thoughts: String,
    createdAt: String,
})

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);

export default Maintenance;