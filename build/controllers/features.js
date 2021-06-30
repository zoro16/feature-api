"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var features_1 = __importDefault(require("../models/features"));
var NAMESPACE = "Controller";
var getFeature = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var featureName, email, filter, result, response, error_1, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.query.featureName && req.query.email)) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                featureName = req.query.featureName;
                email = req.query.email;
                filter = { featureName: featureName, email: email };
                return [4 /*yield*/, features_1.default.find(filter)
                    //logging.info(NAMESPACE, "", result);
                ];
            case 2:
                result = _a.sent();
                response = {};
                if (result[0].is_enabled) {
                    response = { canAccess: true };
                    //logging.info(NAMESPACE, "", response);
                    return [2 /*return*/, res.send(response)];
                }
                else {
                    response = { canAccess: false };
                    //logging.info(NAMESPACE, "", response);
                    return [2 /*return*/, res.send(response)];
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                //logging.error(NAMESPACE, "", error);
                return [2 /*return*/, res.sendStatus(400)];
            case 4: return [3 /*break*/, 8];
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, features_1.default.find()];
            case 6:
                result = _a.sent();
                return [2 /*return*/, res.status(200).send(result)];
            case 7:
                error_2 = _a.sent();
                //logging.error(NAMESPACE, error);
                return [2 /*return*/, res.sendStatus(400)];
            case 8: return [2 /*return*/];
        }
    });
}); };
var addFeature = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, featureName, email, is_enabled, featureRecord, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, featureName = _a.featureName, email = _a.email, is_enabled = _a.is_enabled;
                featureRecord = features_1.default.build({ featureName: featureName, email: email, is_enabled: is_enabled });
                return [4 /*yield*/, featureRecord.save()
                    //logging.info(NAMESPACE, "", featureRecord);
                ];
            case 1:
                _b.sent();
                //logging.info(NAMESPACE, "", featureRecord);
                res.sendStatus(200);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                //logging.error(NAMESPACE, "", error);
                res.sendStatus(304);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = { getFeature: getFeature, addFeature: addFeature };
