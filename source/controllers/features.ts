import { Request, Response, NextFunction } from 'express';
import FeatureModel from '../models/features';
import logging from '../config/logging';


const NAMESPACE: string = "Controller"

type FeatureName = string
type Email = string


const getFeature = async (req: Request, res: Response, next: NextFunction) => {
    if (req.query.featureName && req.query.email) {
        try {
            let featureName: FeatureName = <string>req.query.featureName!;
            let email: Email = <string>req.query.email;

            const filter: object = { featureName, email }
            const result = await FeatureModel.find(filter)
            //logging.info(NAMESPACE, "", result);

            let response: object = {}
            if (result[0].is_enabled) {
                response = { canAccess: true }
                //logging.info(NAMESPACE, "", response);
                return res.send(response);

            } else {
                response = { canAccess: false }
                //logging.info(NAMESPACE, "", response);
                return res.send(response);
            }
        } catch (error) {
            //logging.error(NAMESPACE, "", error);
            return res.sendStatus(400);
        }

    } else {
        try {
            const result = await FeatureModel.find()
            return res.status(200).send(result)
        } catch (error) {
            //logging.error(NAMESPACE, error);
            return res.sendStatus(400);
        }
    }
};

const addFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { featureName, email, is_enabled } = req.body;

        const featureRecord = FeatureModel.build({ featureName, email, is_enabled })
        await featureRecord.save()

        //logging.info(NAMESPACE, "", featureRecord);
        res.sendStatus(200);
    } catch (error) {
        //logging.error(NAMESPACE, "", error);
        res.sendStatus(304);
    }
};

export default { getFeature, addFeature };
