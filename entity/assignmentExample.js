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
var typeorm_1 = require("typeorm");
var Assignment_1 = require("./Assignment");
var Cohort_1 = require("./Cohort");
var Deliverable_1 = require("./Deliverable");
var User_1 = require("./User");
// import { Topic } from './Topic';
typeorm_1.createConnection({
    type: 'mongodb',
    host: process.env.MONGO_URL,
    port: Number(process.env.MONGO_PORT),
    database: 'test3',
    entities: [Assignment_1.Assignment, Cohort_1.Cohort, Deliverable_1.Deliverable, User_1.User],
    useNewUrlParser: true,
    synchronize: true,
    logging: false,
}).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var userRepository, deliverableRepository, assignmentRepository, cohortRepository, manager;
    return __generator(this, function (_a) {
        try {
            userRepository = typeorm_1.getRepository(User_1.User);
            deliverableRepository = typeorm_1.getMongoRepository(Deliverable_1.Deliverable);
            assignmentRepository = typeorm_1.getRepository(Assignment_1.Assignment);
            cohortRepository = typeorm_1.getRepository(Cohort_1.Cohort);
            manager = typeorm_1.getMongoManager();
            // // Uncomment to run functions to populate mock data:
            // await createAssignment(userRepository, assignmentRepository, manager);
            // // Assignment to each member of cohort
            // await assignmentToDeliverables();
            // // Student hands in deliverable with URL:
            // await handInAssignment(userRepository, deliverableRepository, manager);
            // // Instructor finds all deliverables marked turned in
            // await gradeTurnedInDeliverable(deliverableRepository, manager);
        }
        catch (error) {
            console.log('Something went wrong', error);
        }
        return [2 /*return*/];
    });
}); });
function gradeTurnedInDeliverable(deliverableRepository, manager) {
    return __awaiter(this, void 0, void 0, function () {
        var allDelivered, deliveredID, acceptedAssignment, accepted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deliverableRepository.find({
                        where: { turnedIn: { $ne: null } },
                    })];
                case 1:
                    allDelivered = _a.sent();
                    console.log(allDelivered[0]._id);
                    deliveredID = allDelivered[0];
                    return [4 /*yield*/, manager.updateOne(Deliverable_1.Deliverable, deliveredID, {
                            $set: { completed: true, grade: '20' },
                        })];
                case 2:
                    acceptedAssignment = _a.sent();
                    console.log(acceptedAssignment);
                    return [4 /*yield*/, deliverableRepository.find({
                            where: { turnedIn: { $ne: null } },
                        })];
                case 3:
                    accepted = _a.sent();
                    console.log(accepted[0]);
                    return [2 /*return*/];
            }
        });
    });
}
function handInAssignment(userRepository, deliverableRepository, manager) {
    return __awaiter(this, void 0, void 0, function () {
        var someStudent, someDeliverable, savedAssignment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findOne({
                        where: { lastName: 'Hulbert' },
                    })];
                case 1:
                    someStudent = _a.sent();
                    return [4 /*yield*/, deliverableRepository.findOne(someStudent.deliverables[0])];
                case 2:
                    someDeliverable = _a.sent();
                    console.log(someDeliverable);
                    return [4 /*yield*/, manager.updateOne(Deliverable_1.Deliverable, someDeliverable, {
                            $set: { turnedIn: new Date(), deliverable: 'http://www.google.com' },
                        })];
                case 3:
                    savedAssignment = _a.sent();
                    console.log(savedAssignment);
                    return [2 /*return*/];
            }
        });
    });
}
function assignmentToDeliverables() {
    return __awaiter(this, void 0, void 0, function () {
        var userRepository, assignmentRepository, cohortRepository, deliverableRepository, manager, thisAssignment, thisCohort;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepository = typeorm_1.getRepository(User_1.User);
                    assignmentRepository = typeorm_1.getRepository(Assignment_1.Assignment);
                    cohortRepository = typeorm_1.getRepository(Cohort_1.Cohort);
                    deliverableRepository = typeorm_1.getRepository(Deliverable_1.Deliverable);
                    manager = typeorm_1.getMongoManager();
                    return [4 /*yield*/, assignmentRepository.findOne()];
                case 1:
                    thisAssignment = _a.sent();
                    console.log(thisAssignment);
                    return [4 /*yield*/, cohortRepository.findOne({
                            where: { name: 'WDI22' },
                        })];
                case 2:
                    thisCohort = _a.sent();
                    thisCohort.students.forEach(function (studentId) { return __awaiter(_this, void 0, void 0, function () {
                        var deliverable, freshDeliverable, savedDeliverable, student, savedStudent;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    deliverable = new Deliverable_1.Deliverable();
                                    deliverable.name = thisAssignment.name;
                                    deliverable.student.push(studentId);
                                    deliverable.cohort.push(thisCohort._id);
                                    deliverable.instructions = thisAssignment.instructions;
                                    deliverable.instructor = thisAssignment.instructor;
                                    deliverable.resourcesUrls = thisAssignment.resourcesUrls;
                                    deliverable.topics = thisAssignment.topics;
                                    deliverable.deadline = new Date('2019-02-11');
                                    return [4 /*yield*/, manager.save(deliverable)];
                                case 1:
                                    freshDeliverable = _a.sent();
                                    return [4 /*yield*/, deliverableRepository.findOne(freshDeliverable)];
                                case 2:
                                    savedDeliverable = _a.sent();
                                    return [4 /*yield*/, userRepository.findOne(studentId)];
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
                    return [2 /*return*/];
            }
        });
    });
}
function createAssignment(userRepository, assignmentRepository, manager) {
    return __awaiter(this, void 0, void 0, function () {
        var someIntructor, assignment1, createdAssignment1, savedAssignment1, assignment2, createdAssignment2, savedAssignment2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.findOne({
                        where: { role: 'instructor' },
                    })];
                case 1:
                    someIntructor = _a.sent();
                    assignment1 = new Assignment_1.Assignment();
                    assignment1.name = 'Resume';
                    assignment1.instructor.push(someIntructor._id);
                    assignment1.version = 1;
                    assignment1.cohortType = ['WDI', 'UXDI', 'DSI'];
                    assignment1.cohortWeek = '1';
                    assignment1.instructions = 'Create a resume';
                    assignment1.resourcesUrls = [
                        'https://zety.com/blog/how-to-make-a-resume',
                        'https://www.thebalancecareers.com/how-to-create-a-professional-resume-2063237',
                    ];
                    return [4 /*yield*/, assignmentRepository.create(assignment1)];
                case 2:
                    createdAssignment1 = _a.sent();
                    return [4 /*yield*/, manager.save(createdAssignment1)];
                case 3:
                    savedAssignment1 = _a.sent();
                    console.log(savedAssignment1);
                    assignment2 = new Assignment_1.Assignment();
                    assignment2.name = 'Resume';
                    assignment2.instructor.push(someIntructor._id);
                    assignment2.version = 1;
                    assignment2.cohortType = ['WDI', 'UXDI', 'DSI'];
                    assignment2.cohortWeek = '1';
                    assignment2.instructions = 'Create a cover letter';
                    assignment2.resourcesUrls = [
                        'https://zety.com/blog/how-to-make-a-cover-letter',
                    ];
                    return [4 /*yield*/, assignmentRepository.create(assignment2)];
                case 4:
                    createdAssignment2 = _a.sent();
                    return [4 /*yield*/, manager.save(createdAssignment2)];
                case 5:
                    savedAssignment2 = _a.sent();
                    console.log(savedAssignment2);
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=assignmentExample.js.map