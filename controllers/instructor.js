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
var Assignment_1 = require("../entity/Assignment");
var Cohort_1 = require("../entity/Cohort");
var Deliverable_1 = require("../entity/Deliverable");
var User_1 = require("../entity/User");
var assignmentRepository = typeorm_1.getMongoRepository(Assignment_1.Assignment);
var cohortRepository = typeorm_1.getMongoRepository(Cohort_1.Cohort);
var deliverableRepository = typeorm_1.getMongoRepository(Deliverable_1.Deliverable);
var usersRepository = typeorm_1.getMongoRepository(User_1.User);
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
router.get('/', requireAuth, function (req, res) {
    if (req.user.role !== 'instructor') {
        return res.status(403).send({ error: 'Not a instructor' });
    }
    return res.send({ user: req.user });
});
router.post('/assignments', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var incoming, assignment, createdAssignment, savedAssignment, mintedAssignment, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'instructor') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not a instructor' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                incoming = req.body;
                assignment = new Assignment_1.Assignment();
                if (incoming.cohortType) {
                    assignment.cohortType = incoming.cohortType;
                }
                if (incoming.cohortWeek) {
                    assignment.cohortWeek = incoming.cohortWeek;
                }
                if (incoming.instructions) {
                    assignment.instructions = incoming.instructions;
                }
                if (incoming.instructor) {
                    assignment.instructor = incoming.instructor;
                }
                if (incoming.name) {
                    assignment.name = incoming.name;
                }
                if (incoming.resourcesUrls) {
                    assignment.resourcesUrls = incoming.resourcesUrls;
                }
                if (incoming.topics) {
                    assignment.topics = incoming.topics;
                }
                assignment.version = 1;
                return [4 /*yield*/, assignmentRepository.create(assignment)];
            case 2:
                createdAssignment = _a.sent();
                return [4 /*yield*/, manager.save(createdAssignment)];
            case 3:
                savedAssignment = _a.sent();
                return [4 /*yield*/, assignmentRepository.findOne(savedAssignment)];
            case 4:
                mintedAssignment = _a.sent();
                console.log('At the instructors assignments POST route', req.user._id);
                res.send({
                    message: 'At the instructors assignments POST route',
                    assignment: mintedAssignment,
                    incoming: incoming,
                });
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log('Error with the instructor/assignments/ POST route', error_1);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.get('/assignments', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var assignments, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'instructor') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not a instructor' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                //
                console.log('At the instructors assignments GET route', req.user._id);
                return [4 /*yield*/, assignmentRepository.find()];
            case 2:
                assignments = _a.sent();
                res.send({ assignments: assignments });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.log('Error with the instructor/assignments/ GET route', error_2);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put('/assignments/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var toEditAssignment, editedAssignment, updatedAssignment, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'instructor') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not a instructor' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                console.log('At the instructors assignments PUT route', req.user._id);
                return [4 /*yield*/, assignmentRepository.findOne(req.params.id)];
            case 2:
                toEditAssignment = _a.sent();
                editedAssignment = editAssignment(toEditAssignment, req.body);
                return [4 /*yield*/, assignmentRepository.updateOne(toEditAssignment, {
                        $set: editedAssignment,
                    })];
            case 3:
                updatedAssignment = _a.sent();
                return [2 /*return*/, res.send({
                        edited: updatedAssignment,
                    })];
            case 4:
                error_3 = _a.sent();
                console.log('Error with the instructor/assignments/ PUT route', error_3);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.delete('/assignments/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var assignment, deletedAssignment, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Nice to have, not implemented.
                if (req.user.role !== 'instructor') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not a instructor' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                console.log("DELETE assignment " + req.params.id);
                return [4 /*yield*/, assignmentRepository.findOne(req.params.id)];
            case 2:
                assignment = _a.sent();
                return [4 /*yield*/, assignmentRepository.findOneAndDelete(assignment)];
            case 3:
                deletedAssignment = _a.sent();
                return [2 /*return*/, res.send({ deleted: deletedAssignment })];
            case 4:
                error_4 = _a.sent();
                console.log('Error with the instructor/assignments/ DELETE route', error_4);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
// Instructor can send an assignment to cohort as deliverable
router.get('/cohorts', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cohorts, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // return res.status(403).send(req.user);
                if (req.user.role !== 'instructor') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not a instructor' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, cohortRepository.find({
                        where: { instructors: req.user._id },
                    })];
            case 2:
                cohorts = _a.sent();
                return [2 /*return*/, res.send({ cohorts: cohorts })];
            case 3:
                error_5 = _a.sent();
                console.log('Error with the instructor/cohorts/ POST route', error_5);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.post('/cohorts/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var instructor_1, cohort_1, assignment_1, error_6;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //
                if (req.user.role !== 'instructor') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not a instructor' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                console.log('At the instructors cohorts POST route', req.user._id);
                return [4 /*yield*/, usersRepository.findOne(req.user._id)];
            case 2:
                instructor_1 = _a.sent();
                return [4 /*yield*/, cohortRepository.findOne(req.params.id)];
            case 3:
                cohort_1 = _a.sent();
                return [4 /*yield*/, assignmentRepository.findOne(req.body.assignmentId)];
            case 4:
                assignment_1 = _a.sent();
                cohort_1.students.forEach(function (studentId) { return __awaiter(_this, void 0, void 0, function () {
                    var deliverable, freshDeliverable, savedDeliverable, student, savedStudent;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                deliverable = new Deliverable_1.Deliverable();
                                deliverable.name = assignment_1.name;
                                deliverable.student.push(studentId);
                                deliverable.cohort.push(cohort_1._id);
                                deliverable.instructions = assignment_1.instructions;
                                deliverable.instructor.push(instructor_1._id);
                                deliverable.resourcesUrls = assignment_1.resourcesUrls;
                                deliverable.topics = assignment_1.topics;
                                deliverable.deadline = new Date(req.body.dueDate);
                                return [4 /*yield*/, manager.save(deliverable)];
                            case 1:
                                freshDeliverable = _a.sent();
                                return [4 /*yield*/, deliverableRepository.findOne(freshDeliverable)];
                            case 2:
                                savedDeliverable = _a.sent();
                                return [4 /*yield*/, usersRepository.findOne(studentId)];
                            case 3:
                                student = _a.sent();
                                student.deliverables.push(savedDeliverable._id);
                                return [4 /*yield*/, manager.save(student)];
                            case 4:
                                savedStudent = _a.sent();
                                console.log(savedStudent);
                                return [2 /*return*/];
                        }
                    });
                }); });
                res.send({
                    message: 'At the instructors cohort POST route',
                    instructor: instructor_1,
                    cohort: cohort_1,
                    assignment: assignment_1,
                    dueDate: new Date(req.body.dueDate),
                });
                return [3 /*break*/, 6];
            case 5:
                error_6 = _a.sent();
                console.log('Error with the instructor/cohorts/ POST route', error_6);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.get('/cohorts/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var cohort_2, instructorsForCohort, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                //
                if (req.user.role !== 'instructor') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an instructor' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log('At the instructors cohorts/:id GET route', req.user._id);
                return [4 /*yield*/, cohortRepository.findOne(req.params.id)];
            case 2:
                cohort_2 = _a.sent();
                instructorsForCohort = cohort_2.instructors.map(function (instructor) {
                    return usersRepository.findOne(instructor);
                });
                Promise.all(instructorsForCohort).then(function (instructors) {
                    var cohortWithInstructors = __assign({}, cohort_2, { instructors: instructors });
                    var studentsForCohort = cohort_2.students.map(function (student) {
                        return usersRepository.findOne(student);
                    });
                    Promise.all(studentsForCohort).then(function (students) {
                        var cohortWithStudents = __assign({}, cohortWithInstructors, { students: students });
                        return res.send({ cohort: cohortWithStudents });
                    });
                });
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                console.log('Error with the instructor/cohorts/:id GET route', error_7);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.put('/cohorts/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Nice to have, not implemented.
        if (req.user.role !== 'instructor') {
            return [2 /*return*/, res.status(403).send({ error: 'Not an instructor' })];
        }
        try {
            //
            console.log('At the instructors cohorts PUT route', req.user._id);
            res.send('At the instructors cohort PUT route');
        }
        catch (error) {
            console.log('Error with the instructor/cohorts/ PUT route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
router.delete('/cohorts/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // This route removes a deliverable from a cohort
        // Nice to have, not implemented.
        if (req.user.role !== 'instructor') {
            return [2 /*return*/, res.status(403).send({ error: 'Not an instructor' })];
        }
        try {
            //
            console.log('At the instructors cohorts DELETE route', req.user._id);
            res.send('At the instructors cohort DELETE route');
        }
        catch (error) {
            console.log('Error with the instructor/cohorts/ DELETE route', error);
            return [2 /*return*/, res.send({ error: 'error' })];
        }
        return [2 /*return*/];
    });
}); });
// Instructor can see what were turned in and grade them.
router.get('/deliverables', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var deliverables, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'instructor') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an instructor' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, deliverableRepository.find({
                        where: { instructors: req.user._id },
                    })];
            case 2:
                deliverables = _a.sent();
                res.send({
                    message: 'At the instructors deliverables GET route',
                    deliverables: deliverables,
                });
                return [3 /*break*/, 4];
            case 3:
                error_8 = _a.sent();
                console.log('Error with the instructor/deliverables/ GET route', error_8);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
router.get('/deliverables/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var deliverable, student, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'instructor') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an instructor' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, deliverableRepository.findOne(req.params.id)];
            case 2:
                deliverable = _a.sent();
                return [4 /*yield*/, usersRepository.findOne(deliverable.student[0])];
            case 3:
                student = _a.sent();
                res.send({
                    message: 'At the instructors deliverables GET route',
                    deliverable: deliverable,
                    student: student,
                });
                return [3 /*break*/, 5];
            case 4:
                error_9 = _a.sent();
                console.log('Error with the instructor/deliverables/ GET route', error_9);
                return [2 /*return*/, res.send({ error: 'error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
router.put('/deliverables/:id', requireAuth, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var deliverable, editedDeliverable, updatedDeliverable, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (req.user.role !== 'instructor') {
                    return [2 /*return*/, res.status(403).send({ error: 'Not an instructor' })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                //
                console.log('At the instructors deliverables/:id PUT route', req.user._id);
                return [4 /*yield*/, deliverableRepository.findOne(req.params.id)];
            case 2:
                deliverable = _a.sent();
                editedDeliverable = editDeliverable(deliverable, req.body);
                return [4 /*yield*/, deliverableRepository.updateOne(deliverable, { $set: editedDeliverable })];
            case 3:
                updatedDeliverable = _a.sent();
                res.send({
                    message: 'At the users deliverables/:id PUT route',
                    editedDeliverable: editedDeliverable,
                    updatedDeliverable: updatedDeliverable,
                });
                res.send('At the instructors deliverables/:id PUT route');
                return [3 /*break*/, 5];
            case 4:
                error_10 = _a.sent();
                console.log('Error with instructor/deliverable/ PUT route:', error_10);
                return [2 /*return*/, res.status(503).send({ user: null })];
            case 5: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
/*************************************** */
//          Edit Functions
/*************************************** */
function editAssignment(toEditAssignmeent, incoming) {
    var editedAssignment = __assign({}, toEditAssignmeent);
    if (incoming.firstName) {
        editedAssignment.cohortType = incoming.cohortType;
    }
    if (incoming.lastName) {
        editedAssignment.cohortWeek = incoming.cohortWeek;
    }
    if (incoming.instructions) {
        editedAssignment.instructions = incoming.instructions;
    }
    if (incoming.instructor) {
        editedAssignment.instructor = incoming.instructor;
    }
    if (incoming.name) {
        editedAssignment.name = incoming.name;
    }
    if (incoming.resourcesUrls) {
        editedAssignment.resourcesUrls = incoming.resourcesUrls;
    }
    if (incoming.topics) {
        editedAssignment.topics = incoming.topics;
    }
    if (incoming.version) {
        editedAssignment.version++;
    }
    else {
        editedAssignment.version = 1;
    }
    return editedAssignment;
}
function editDeliverable(deliverable, incoming) {
    var editedDeliverable = __assign({}, deliverable);
    //
    console.log('Marking deliverable completed', incoming);
    editedDeliverable.completed = incoming.completed
        ? new Date(incoming.completed)
        : null;
    if (incoming.grade) {
        editedDeliverable.grade = incoming.grade;
    }
    return editedDeliverable;
}
//# sourceMappingURL=instructor.js.map