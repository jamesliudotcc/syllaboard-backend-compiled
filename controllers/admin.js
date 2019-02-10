"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
router.get('/', requireAuth, function (req, res) {
    if (req.user.role !== 'admin') {
        return res.status(403).send({ error: 'Not an admin' });
    }
    return res.send({ user: req.user });
});
router.get('/users', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log('User attempting to see list of users is a:', req.user.role);
                return [4 /*yield*/, usersRepository.find({})];
            case 2:
                users = _a.sent();
                return [2 /*return*/, res.send({ users: users })];
            case 3:
                error_1 = _a.sent();
                console.log('Something went wrong', error_1);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/users/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, usersRepository.findOneOrFail(req.params.id)];
            case 2:
                user = _a.sent();
                return [2 /*return*/, res.send({ user: user })];
            case 3:
                error_2 = _a.sent();
                console.log('Something went wrong', error_2);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/users', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newUser, createdUser, savedUser, mintedUser, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                console.log('In the POST /users');
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                console.log(req.body);
                newUser = new User_1.User();
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;
                newUser.email = req.body.email;
                newUser.password = req.body.password;
                newUser.role = 'student';
                return [4 /*yield*/, usersRepository.create(newUser)];
            case 2:
                createdUser = _a.sent();
                return [4 /*yield*/, manager.save(createdUser)];
            case 3:
                savedUser = _a.sent();
                return [4 /*yield*/, usersRepository.findOne(savedUser)];
            case 4:
                mintedUser = _a.sent();
                res.send({ user: mintedUser });
                return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                console.log('Error with /admin/users POST route:', error_3);
                return [2 /*return*/, res.status(503).send({ user: null })];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.put('/users/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var toEditUser, editedUser, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                console.log('In the PUT /admin/user');
                return [4 /*yield*/, usersRepository.findOne(req.params.id)];
            case 2:
                toEditUser = _a.sent();
                editedUser = editUser(toEditUser, req.body);
                return [4 /*yield*/, usersRepository.updateOne(toEditUser, {
                        $set: editedUser,
                    })];
            case 3:
                _a.sent();
                res.send({
                    edited: editedUser,
                });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                console.log('Error with admin/user/ PUT route:', error_4);
                return [2 /*return*/, res.status(503).send({ user: null })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.delete('/users/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var user, deletedUser, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                console.log("DELETE user " + req.params.id);
                return [4 /*yield*/, usersRepository.findOne(req.params.id)];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, usersRepository.findOneAndDelete(user)];
            case 3:
                deletedUser = _a.sent();
                return [2 /*return*/, res.send({ deleted: deletedUser })];
            case 4:
                error_5 = _a.sent();
                console.log('Something went wrong', error_5);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.get('/cohorts', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cohorts, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cohortRepository.find()];
            case 2:
                cohorts = _a.sent();
                return [2 /*return*/, res.send({ cohorts: cohorts })];
            case 3:
                error_6 = _a.sent();
                console.log('Error with the admin/cohorts/ GET route', error_6);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/cohorts', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var newCohort, createdCohort, savedCohort, mintedCohort, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                console.log('In the POST /admin/cohort');
                console.log(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                console.log(req.body);
                newCohort = new Cohort_1.Cohort();
                newCohort.name = req.body.name;
                newCohort.campus = req.body.campus;
                newCohort.startDate = new Date(req.body.startDate);
                newCohort.endDate = new Date(req.body.endDate);
                return [4 /*yield*/, cohortRepository.create(newCohort)];
            case 2:
                createdCohort = _a.sent();
                return [4 /*yield*/, manager.save(createdCohort)];
            case 3:
                savedCohort = _a.sent();
                return [4 /*yield*/, cohortRepository.findOne(savedCohort)];
            case 4:
                mintedCohort = _a.sent();
                res.send({
                    cohort: mintedCohort,
                });
                return [3 /*break*/, 6];
            case 5:
                error_7 = _a.sent();
                console.log('Error with admin/cohort/ POST route:', error_7);
                return [2 /*return*/, res.status(503).send({ user: null })];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.get('/cohorts/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cohort_1, instructorsForCohort, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cohortRepository.findOne(req.params.id)];
            case 2:
                cohort_1 = _a.sent();
                instructorsForCohort = cohort_1.instructors.map(function (instructor) {
                    return usersRepository.findOne(instructor);
                });
                Promise.all(instructorsForCohort).then(function (instructors) {
                    var cohortWithInstructors = __assign({}, cohort_1, { instructors: instructors });
                    var studentsForCohort = cohort_1.students.map(function (student) {
                        return usersRepository.findOne(student);
                    });
                    Promise.all(studentsForCohort).then(function (students) {
                        var cohortWithStudents = __assign({}, cohortWithInstructors, { students: students });
                        return res.send({ cohort: cohortWithStudents });
                    });
                });
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.log('Error with the admin/cohorts/ GET route', error_8);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put('/cohorts/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var toEditCohort, editedCohort, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                console.log('In the PUT /admin/cohort');
                return [4 /*yield*/, cohortRepository.findOne(req.params.id)];
            case 2:
                toEditCohort = _a.sent();
                editedCohort = editCohort(toEditCohort, req.body);
                return [4 /*yield*/, cohortRepository.updateOne(toEditCohort, {
                        $set: editedCohort,
                    })];
            case 3:
                _a.sent();
                res.send({
                    edited: editedCohort,
                });
                return [3 /*break*/, 5];
            case 4:
                error_9 = _a.sent();
                console.log('Error with admin/cohort/ POST route:', error_9);
                return [2 /*return*/, res.status(503).send({ user: null })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.delete('/cohorts/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cohort, deletedCohort, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                console.log("DELETE cohort " + req.params.id);
                return [4 /*yield*/, cohortRepository.findOne(req.params.id)];
            case 2:
                cohort = _a.sent();
                return [4 /*yield*/, cohortRepository.findOneAndDelete(cohort)];
            case 3:
                deletedCohort = _a.sent();
                return [2 /*return*/, res.send({ deleted: deletedCohort })];
            case 4:
                error_10 = _a.sent();
                console.log('Something went wrong', error_10);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.put('/cohorts/instructors/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var toEditCohort_1, error_11;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Body should be an array of userIds as JSON (application/json)
                // :id refers to the ID of the cohort to be edited.
                if (req.user.role !== 'admin') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an admin' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log('In add instrutor to cohort route');
                return [4 /*yield*/, cohortRepository.findOne(req.params.id)];
            case 2:
                toEditCohort_1 = _a.sent();
                // TODO: Learn promsie all and refactor. Not today.
                req.body.forEach(function (userId) { return __awaiter(_this, void 0, void 0, function () {
                    var eachUser;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, usersRepository.findOne(userId)];
                            case 1:
                                eachUser = _a.sent();
                                if (!(eachUser.role === 'instructor')) return [3 /*break*/, 3];
                                console.log(eachUser);
                                console.log(toEditCohort_1);
                                return [4 /*yield*/, cohortRepository.updateOne(toEditCohort_1, {
                                        $addToSet: { instructors: eachUser._id },
                                    })];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); });
                // Figure out a better message
                res.status(202).send('ok');
                return [3 /*break*/, 4];
            case 3:
                error_11 = _a.sent();
                console.log('Error with admin/cohort/ POST route:', error_11);
                return [2 /*return*/, res.status(503).send({ user: null })];
            case 4: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
/*************************************** */
//          Edit Functions
/*************************************** */
function editCohort(toEditCohort, incoming) {
    var editedCohort = __assign({}, toEditCohort);
    if (incoming.name) {
        editedCohort.name = incoming.name;
    }
    if (incoming.campus) {
        editedCohort.campus = incoming.campus;
    }
    editedCohort.startDate = incoming.startDate
        ? new Date(incoming.startDate)
        : new Date(toEditCohort.startDate);
    editedCohort.endDate = incoming.endDate
        ? new Date(incoming.endDate)
        : new Date(toEditCohort.endDate);
    return editedCohort;
}
function editUser(toEditUser, incoming) {
    var editedUser = __assign({}, toEditUser);
    if (incoming.firstName) {
        editedUser.firstName = incoming.firstName;
    }
    if (incoming.lastName) {
        editedUser.lastName = incoming.lastName;
    }
    if (incoming.email) {
        editedUser.email = incoming.email;
    }
    if (incoming.role) {
        editedUser.role = incoming.role;
    }
    return editedUser;
}
//# sourceMappingURL=admin.js.map