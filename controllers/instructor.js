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
var User_1 = require("../entity/User");
var usersRepository = typeorm_1.getMongoRepository(User_1.User);
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
/*************************************** */
//             Controllers
/*************************************** */
// Assignments: Instructor can CRUD assignments to turn into deliverables
router.post('/assignments', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        // if (req.user.role !== 'admin') {
        //   return res.status(403).send({ error: 'Not a student' });
        // }
        try {
            //
            console.log('At the instructors assignments POST route', req.user._id);
            res.send('At the instructors assignments POST route');
        }
        catch (error) {
            console.log('Error with the instructor/assignments/ POST route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
router.get('/assignments', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        // if (req.user.role !== 'admin') {
        //   return res.status(403).send({ error: 'Not a student' });
        // }
        try {
            //
            console.log('At the instructors assignments GET route', req.user._id);
            res.send('At the instructors assignments GET route');
        }
        catch (error) {
            console.log('Error with the instructor/assignments/ GET route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
router.put('/assignments/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        // if (req.user.role !== 'admin') {
        //   return res.status(403).send({ error: 'Not a student' });
        // }
        try {
            //
            console.log('At the instructors assignments PUT route', req.user._id);
            res.send('At the instructors assignments PUT route');
        }
        catch (error) {
            console.log('Error with the instructor/assignments/ PUT route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
router.delete('/assignments/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        // if (req.user.role !== 'admin') {
        //   return res.status(403).send({ error: 'Not a student' });
        // }
        try {
            //
            console.log('At the instructors assignments DELETE route', req.user._id);
            res.send('At the instructors assignments DELETE route');
        }
        catch (error) {
            console.log('Error with the instructor/assignments/ DELETE route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
// Instructor can send an assignment to cohort as deliverable
router.post('/cohort/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        // if (req.user.role !== 'admin') {
        //   return res.status(403).send({ error: 'Not a student' });
        // }
        try {
            //
            console.log('At the instructors cohorts POST route', req.user._id);
            res.send('At the instructors cohort POST route');
        }
        catch (error) {
            console.log('Error with the instructor/cohort/ POST route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
// And do all of the CRUD operations over them
router.get('/cohort/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        // if (req.user.role !== 'admin') {
        //   return res.status(403).send({ error: 'Not a student' });
        // }
        try {
            //
            console.log('At the instructors cohorts POST route', req.user._id);
            res.send('At the instructors cohort POST route');
        }
        catch (error) {
            console.log('Error with the instructor/cohort/ POST route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
router.put('/cohort/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        // if (req.user.role !== 'admin') {
        //   return res.status(403).send({ error: 'Not a student' });
        // }
        try {
            //
            console.log('At the instructors cohorts PUT route', req.user._id);
            res.send('At the instructors cohort PUT route');
        }
        catch (error) {
            console.log('Error with the instructor/cohort/ PUT route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
router.delete('/cohort/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        // if (req.user.role !== 'admin') {
        //   return res.status(403).send({ error: 'Not a student' });
        // }
        try {
            //
            console.log('At the instructors cohorts DELETE route', req.user._id);
            res.send('At the instructors cohort DELETE route');
        }
        catch (error) {
            console.log('Error with the instructor/cohort/ DELETE route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
// Instructor can see what were turned in and grade them.
router.get('/deliverables', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        if (req.user.role !== 'admin') {
            return [2 /*return*/, res.status(403).send({ error: 'Not a student' })];
        }
        try {
            //
            console.log('At the instructors deliverables GET route', req.user._id);
            res.send('At the instructors deliverables GET route');
        }
        catch (error) {
            console.log('Error with the instructor/deliverables/ GET route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
router.get('/deliverables/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        if (req.user.role !== 'admin') {
            return [2 /*return*/, res.status(403).send({ error: 'Not a student' })];
        }
        try {
            //
            console.log('At the instructors deliverables GET route', req.user._id);
            res.send('At the instructors deliverables GET route');
        }
        catch (error) {
            console.log('Error with the instructor/deliverables/ GET route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
router.put('/deliverables/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // TODO: change to instructor
        if (req.user.role !== 'admin') {
            return [2 /*return*/, res.status(403).send({ error: 'Not a student' })];
        }
        try {
            //
            console.log('At the instructors deliverables/:id PUT route', req.user._id);
            res.send('At the instructors deliverables/:id PUT route');
        }
        catch (error) {
            console.log('Error with instructor/deliverable/ PUT route:', error);
            return [2 /*return*/, res.status(503).send({ user: null })];
        }
        return [2 /*return*/];
    });
}); });
module.exports = router;
//# sourceMappingURL=instructor.js.map