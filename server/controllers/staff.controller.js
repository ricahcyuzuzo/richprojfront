import Mongoose from "mongoose";
import Acquisitions from "../models/db/borrow.model";
import Missing from "../models/db/missing.model";
import Depreciated from "../models/db/depreciated.model";
import Maintenance from "../models/db/Maintenance.model";
import Assets from "../models/db/Assets.model";
import { jwtDecode } from "jwt-decode";

export const borrowAsset = async (req, res) => {
    try {
        const { asset, returnTime, reason, userId } = req.body;

        var currentDate = new Date();
        var previousDate = new Date(returnTime);
        var timeDifference = currentDate.getTime() - previousDate.getTime();
        var millisecondsInADay = 1000 * 60 * 60 * 24;

        if (timeDifference >= millisecondsInADay) {
            return res.status(400).json({
                message: "You can't put the date less than today."
            })
        }

        const created = await Acquisitions.create({
            _id: new Mongoose.Types.ObjectId(),
            asset,
            userId,
            returnTime,
            borrowTime: new Date(),
            reason,
            status: "pending",
            createdAt: new Date(),
        });

        if(created){
            return res.status(201).json({
                message: 'Acquisition request sent successfully',
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

export const reportMissing = async (req, res) => {
    try {
        const { asset, missingTime, thoughts, userId } = req.body;
        const created = await Missing.create({
            _id: new Mongoose.Types.ObjectId(),
            asset,
            userId,
            missingTime,
            thoughts,
            createdAt: new Date(),
        });
        if(created){
            return res.status(201).json({
                message: 'Missing Reported successfully',
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

export const reportDepreciated = async (req, res) => {
    try {
        const { asset, damagedTime, thoughts, userId } = req.body;
        const created = await Depreciated.create({
            _id: new Mongoose.Types.ObjectId(),
            asset,
            userId,
            damagedTime,
            thoughts,
            createdAt: new Date(),
        });
        if(created){
            return res.status(201).json({
                message: 'Depreciated Reported successfully',
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

export const reportForecast = async (req, res) => {
    try {
        const { asset, tags, description } = req.body;
        const created = await Depreciated.create({
            _id: new Mongoose.Types.ObjectId(),
            asset,
            tags,
            description,
            createdAt: new Date(),
        });
        if(created){
            return res.status(201).json({
                message: 'Missing Reported successfully',
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

export const requestMaintenance = async (req, res) => {
    try {
        const { asset, thoughts } = req.body;

        const created = await Maintenance.create({
            _id: new Mongoose.Types.ObjectId(),
            asset,
            thoughts,
            createdAt: new Date(),
        });

        if(created){
            return res.status(201).json({
                message: 'Maintenance Requested successfully',
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

export const assets = async (req, res) => {
    try {
        const assets = await Assets.find();

        return res.status(201).json({
            assets,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: JSON.stringify(error)
        });
    }
}

export const acquisition = async (req, res) => {
    try {
        const acquisitions = await Acquisitions.find(req.query.userId && { userId: req.query.userId });
        
        return res.status(201).json({
            acquisitions,
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: JSON.stringify(error)
        });
    }
}

export const missing = async (req, res) => {
    try {
        const missing = await Missing.find(req.query.userId && { userId: req.query.userId });
        
        return res.status(201).json({
            missing,
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: JSON.stringify(error)
        });
    }
}

export const depreciated = async (req, res) => {
    try {
        const depreciated = await Depreciated.find(req.query.userId && { userId: req.query.userId });
        
        return res.status(201).json({
            depreciated,
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: JSON.stringify(error)
        });
    }
}

export const counts = async (req, res) => {
    try {
        const { userId } = req.query;

        const depreciated = await Depreciated.countDocuments({ userId });
        const missing = await Missing.countDocuments({ userId });
        const acquisitions = await Acquisitions.countDocuments({ userId });
        console.log(acquisitions, "hhhh")

        return res.status(200).json({
            counts: {
                depreciated,
                missing,
                acquisitions
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
