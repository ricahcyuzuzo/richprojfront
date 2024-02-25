import mongoose from 'mongoose';

const forecastSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    asset: Object,
    description: String,
    createdAt: String,
})

const Forecasts = mongoose.model("Forecasts", forecastSchema);
export default Forecasts;
