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
var userRepository = typeorm_1.getMongoRepository(User_1.User);
var cohortRepository = typeorm_1.getMongoRepository(Cohort_1.Cohort);
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
    var role = req.user.role;
    return res.send({ token: token, role: role });
});
// TODO: Remove this route after done testing
/* GET /auth/test - Require JWT, Return message */
router.get('/test', requireAuth, function (req, res) {
    console.log('In /auth/test');
    return res.send({ message: 'Hello There!', role: req.user.role });
});
/* GET /auth/signup - Take user data and create new user in db, return JWT */
router.post('/signup', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newUserData, user, instructorCohort, createdInstructor, savedInstructor, newInstructor, instructorToken, instructorRole, studentCohort, createdStudent, savedStudent, newStudent, studentToken, studentRole, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // TODO: debug statements; remove when no longer needed
                console.log('In the POST /auth/signup route');
                newUserData = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 15, , 16]);
                return [4 /*yield*/, userRepository.findOne({ email: newUserData.email })];
            case 2:
                user = _a.sent();
                if (user) {
                    console.log('Existing User:', user.firstName);
                    return [2 /*return*/, res.status(409).send('User already exists')];
                }
                return [4 /*yield*/, cohortRepository.findOne({
                        instructorKey: req.body.cohortKey,
                    })];
            case 3:
                instructorCohort = _a.sent();
                if (!instructorCohort) return [3 /*break*/, 8];
                return [4 /*yield*/, userRepository.create(newUserData)];
            case 4:
                createdInstructor = _a.sent();
                createdInstructor.role = 'instructor';
                return [4 /*yield*/, manager.save(createdInstructor)];
            case 5:
                savedInstructor = _a.sent();
                console.log('Saved Instructor:', savedInstructor);
                return [4 /*yield*/, userRepository.findOne({
                        email: savedInstructor.email,
                    })];
            case 6:
                newInstructor = _a.sent();
                instructorCohort.instructors.push(newInstructor._id);
                return [4 /*yield*/, cohortRepository.save(instructorCohort)];
            case 7:
                _a.sent();
                instructorToken = createToken(savedInstructor);
                instructorRole = savedInstructor.role;
                return [2 /*return*/, res.send({ token: instructorToken, role: instructorRole })];
            case 8: return [4 /*yield*/, cohortRepository.findOne({
                    studentKey: req.body.cohortKey,
                })];
            case 9:
                studentCohort = _a.sent();
                if (!studentCohort) return [3 /*break*/, 14];
                return [4 /*yield*/, userRepository.create(newUserData)];
            case 10:
                createdStudent = _a.sent();
                createdStudent.role = 'student';
                return [4 /*yield*/, manager.save(createdStudent)];
            case 11:
                savedStudent = _a.sent();
                console.log('Saved Student:', savedStudent);
                return [4 /*yield*/, userRepository.findOne({
                        email: savedStudent.email,
                    })];
            case 12:
                newStudent = _a.sent();
                studentCohort.students.push(newStudent._id);
                return [4 /*yield*/, cohortRepository.save(studentCohort)];
            case 13:
                _a.sent();
                studentToken = createToken(savedStudent);
                studentRole = savedStudent.role;
                return [2 /*return*/, res.send({ token: studentToken, role: studentRole })];
            case 14: return [2 /*return*/, res.status(409).send('No cohort found')];
            case 15:
                err_1 = _a.sent();
                console.log('Error in POST /auth/signup', err_1);
                return [2 /*return*/, res.status(503).send('Database Error')];
            case 16: return [2 /*return*/];
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