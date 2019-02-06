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
var jwt = require("jsonwebtoken");
// const jwt = require('jsonwebtoken');
// TypeORM setup
var typeorm_1 = require("typeorm");
var Cohort_1 = require("../entity/Cohort");
var User_1 = require("../entity/User");
var userRepository = typeorm_1.getRepository(User_1.User);
var cohortRepository = typeorm_1.getRepository(Cohort_1.Cohort);
var manager = typeorm_1.getManager();
// Express setup
var router = express.Router();
// Load passport config
// tslint:disable-next-line:no-var-requires
var passportService = require('../services/passport');
var passport = require("passport");
// Auth strategies
var requireAuth = passport.authenticate('jwt', { session: false });
var requireSignIn = passport.authenticate('local', { session: false });
// Create new JWT token without password/unneeded info
var createToken = function (user) {
    return jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, {
        expiresIn: '1w',
    });
};
// Controllers
/* POST /auth/signin - Require user/password, return JWT */
router.post('/signin', requireSignIn, function (req, res) {
    var token = createToken(req.user);
    return res.send({ token: token });
});
// TODO: Remove this route after done testing
/* GET /auth/test - Require JWT, Return message */
router.get('/test', requireAuth, function (req, res) {
    console.log('In /auth/test');
    return res.send({ message: 'Hello There!' });
});
/* GET /auth/signup - Take user data and create new user in db, return JWT */
router.post('/signup', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newUserData, cohort, user, createdUser, savedUser, newStudent, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // TODO: debug statements; remove when no longer needed
                console.log('In the POST /auth/signup route');
                console.log(req.body);
                newUserData = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, cohortRepository.findOne({ key: req.body.cohortKey })];
            case 2:
                cohort = _a.sent();
                if (!cohort) {
                    return [2 /*return*/, res.status(409).send('No cohort found')];
                }
                return [4 /*yield*/, userRepository.findOne({ email: newUserData.email })];
            case 3:
                user = _a.sent();
                console.log('Existing User:', user);
                // If user exists, don't let them create a duplicate
                if (user) {
                    return [2 /*return*/, res.status(409).send('User already exists')];
                }
                return [4 /*yield*/, userRepository.create(newUserData)];
            case 4:
                createdUser = _a.sent();
                return [4 /*yield*/, manager.save(createdUser)];
            case 5:
                savedUser = _a.sent();
                console.log('Saved User:', savedUser);
                return [4 /*yield*/, userRepository.findOne({ email: savedUser.email })];
            case 6:
                newStudent = _a.sent();
                cohort.students.push(newStudent._id);
                return [4 /*yield*/, cohortRepository.save(cohort)];
            case 7:
                _a.sent();
                token = createToken(savedUser);
                return [2 /*return*/, res.send({ token: token })];
            case 8:
                err_1 = _a.sent();
                console.log('Error in POST /auth/signup', err_1);
                return [2 /*return*/, res.status(503).send('Database Error')];
            case 9: return [2 /*return*/];
        }
    });
}); });
/* GET /auth/current/user - Requires JWT, returns user data */
router.post('/current/user', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('GET /auth/current/user STUB');
                if (!req.user) {
                    return [2 /*return*/, res.status(401).send({ user: null })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userRepository.findOne({ email: req.user.email })];
            case 2:
                user = _a.sent();
                return [2 /*return*/, res.send({ user: user })];
            case 3:
                err_2 = _a.sent();
                console.log('Error with /auth/current GET route:', err_2);
                return [2 /*return*/, res.status(503).send({ user: null })];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
//# sourceMappingURL=auth.js.map