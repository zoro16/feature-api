"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var featureSchema = new mongoose_1.Schema({
    featureName: { type: String, required: true },
    is_enabled: { type: Boolean, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }
}, { timestamps: true });
featureSchema.statics.build = function (attr) {
    return new FeatureModel(attr);
};
var FeatureModel = mongoose_1.model('FeatureModel', featureSchema);
FeatureModel.build({
    featureName: "Basic",
    email: "mo@gmail.com",
    is_enabled: true
});
exports.default = FeatureModel;
