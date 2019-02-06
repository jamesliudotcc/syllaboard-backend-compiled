"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// TypeORM setup
var typeorm_1 = require("typeorm");
var Cohort_1 = require("../entity/Cohort");
var cohortRepository = typeorm_1.getMongoRepository(Cohort_1.Cohort);
var manager = typeorm_1.getMongoManager();
// Express setup
var router = express.Router();
// Load passport config
// tslint:disable-next-line:no-var-requires
var passportService = require('../services/passport');
var passport = require("passport");
// Auth strategies
var requireAuth = passport.authenticate('jwt', { session: false });
// Controllers
// TODO: Remove this route after done testing
router.get('/test', requireAuth, function (req, res) {
    return res.send({ message: 'Hello There!' });
});
router.delete('/delete', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cohortToDelete, deletedCohort, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Deleting Cohort!");
                console.log(req.body.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, manager.findOne(Cohort_1.Cohort, req.body.id)];
            case 2:
                cohortToDelete = _a.sent();
                return [4 /*yield*/, manager.findOneAndDelete(Cohort_1.Cohort, cohortToDelete)];
            case 3:
                deletedCohort = _a.sent();
                console.log(deletedCohort);
                return [2 /*return*/, res.send({ message: "It worked! " })];
            case 4:
                err_1 = _a.sent();
                console.log('Error with /cohort/delete POST route:', err_1);
                return [2 /*return*/, res.status(503).send({ id: req.body.id })];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Post a new Cohort
router.post('/new', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cohort, createdCohort, savedCohort, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('In the POST cohort/new');
                console.log(req.body);
                if (!req.user) {
                    return [2 /*return*/, res.status(401).send({ user: null })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, cohortRepository.findOne({ name: req.body.name })];
            case 2:
                cohort = _a.sent();
                if (cohort) {
                    return [2 /*return*/, res.status(409).send('Cohort already exists')];
                }
                // Turn that String into an ARRAY of strings
                req.body.students = req.body.students.split(", ");
                req.body.instructors = req.body.instructors.split(", ");
                return [4 /*yield*/, cohortRepository.create(req.body)];
            case 3:
                createdCohort = _a.sent();
                return [4 /*yield*/, manager.save(createdCohort)];
            case 4:
                savedCohort = _a.sent();
                return [2 /*return*/, res.send({ savedCohort: savedCohort })];
            case 5:
                err_2 = _a.sent();
                console.log('Error with /cohort/new POST route:', err_2);
                return [2 /*return*/, res.status(503).send({ user: null })];
            case 6: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=cohort.js.map