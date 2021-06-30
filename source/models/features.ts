import { Document, Model, model, Schema } from 'mongoose';
import logging from '../config/logging';


type FeatureName = string
type Email = string
type IsEnabled = boolean

interface FeatureInterface {
    featureName: FeatureName;
    email: Email;
    is_enabled: IsEnabled;
}

interface FeatureModelInterface extends Model<FeatureDocument> {
    build(attr: FeatureInterface): FeatureDocument
}

interface FeatureDocument extends Document {
    featureName: FeatureName;
    email: Email;
    is_enabled: IsEnabled;
}

const featureSchema = new Schema({
    featureName: { type: String, required: true },
    is_enabled: { type: Boolean, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
}, { timestamps: true })

featureSchema.statics.build = (attr: FeatureInterface) => {
    return new FeatureModel(attr)
}

const FeatureModel = model<FeatureDocument, FeatureModelInterface>('FeatureModel', featureSchema)

FeatureModel.build({
    featureName: "Basic",
    email: "mo@gmail.com",
    is_enabled: true
})

export default FeatureModel
