import Mongoose from "mongoose";
import Assets from "../models/db/Assets.model";
import Acquisitions from "../models/db/borrow.model";
import Replicate from "replicate";
import 'dotenv/config';
import Forecasts from "../models/db/forecasting.model";
import Depreciated from "../models/db/depreciated.model";
import Missing from "../models/db/missing.model";

export const addAsset = async (req, res) => {
    try {
        const { name, sn, usage } = req.body;

        const created = await Assets.create({
            _id: new Mongoose.Types.ObjectId(),
            name,
            sn,
            usage,
            status: "inuse",
            createdAt: new Date(),
        });

        if(created){
            return res.status(201).json({
                message: 'Asset Added successfully',
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error: JSON.stringify(error)
        });
    }
}

export const acceptBorrow = async (req, res) => {
    try {
        const { status, id } = req.body;

        const updated = await Acquisitions.findByIdAndUpdate(id, { status });

        if(updated){
            return res.status(201).json({
                message: 'Acquisition update successfully',
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error: JSON.stringify(error)
        });
    }
}

export const dispose = async (req, res) => {
    try {
        const { id, disposed } = req.body;
        const results = await Assets.findByIdAndUpdate(id, { status: disposed ? 'inuse' : 'disposed' });
        if(results){
            return res.status(201).json({
                message: 'Acquisition update successfully',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error: JSON.stringify(error)
        });
    }

}

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

export const askForecast = async (req, res) => {
    try {
        const { request, asset } = req.body;
        res.status(200).json({
            message: "Forecast requested.",
        });
        const output = await replicate.run(
            "meta/codellama-70b-instruct:a279116fe47a0f65701a8817188601e2fe8f4b9e04a518789655ea7b995851bf",
            {
                input: {
                    prompt: request,
                }
            }
        );
            if(output){
                await Forecasts.create({
                    _id: new Mongoose.Types.ObjectId(),
                    asset,
                    description: output.join(""),
                    createdAt: new Date(),
                });
            }
    } catch (error) {
        console.log(error, "KKKK")
        return res.status(500).json({
            message: "Something went wrong.",
        })
    }
}

export const getForecasts = async (req, res) => {
    try {
        const forecasts = await Forecasts.find();
        return res.status(200).json({
            forecasts,
        })
    } catch (error) {
        
    }
}

export const countsAdmin = async (req, res) => {
    try {
        const depreciated = await Depreciated.countDocuments();
        const missing = await Missing.countDocuments();
        const acquisitions = await Acquisitions.countDocuments();
        const forecasts = await Forecasts.countDocuments();
        const assets = await Assets.countDocuments();

        return res.status(200).json({
            counts: {
                depreciated,
                missing,
                acquisitions,
                forecasts,
                assets
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            error: JSON.stringify(error)
        });
    }
}

