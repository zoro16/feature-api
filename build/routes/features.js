"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var features_1 = __importDefault(require("../controllers/features"));
var router = express_1.default.Router();
router.get('/feature', features_1.default.getFeature);
router.post('/feature', features_1.default.addFeature);
module.exports = router;
