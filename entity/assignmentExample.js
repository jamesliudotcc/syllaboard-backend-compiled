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
    entities: [Assignment_1.Assignment, Cohort_1.Cohort, User_1.User],
    useNewUrlParser: true,
    synchronize: true,
    logging: false,
}).then(function (connection) { return __awaiter(_this, void 0, void 0, function () {
    var userRepository, assignmentRepository, cohortRepository, manager, users, students, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userRepository = typeorm_1.getRepository(User_1.User);
                assignmentRepository = typeorm_1.getRepository(Assignment_1.Assignment);
                cohortRepository = typeorm_1.getRepository(Cohort_1.Cohort);
                manager = typeorm_1.getMongoManager();
                return [4 /*yield*/, userRepository.find()];
            case 1:
                users = _a.sent();
                students = users
                    .filter(function (s) { return s.role === 'student'; })
                    .filter(function (s) { return s.deliverables.length >= 1; })
                    .map(function (s) { return ({ student: s._id, deliverables: s.deliverables }); });
                console.log(students);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log('Something went wrong', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
function assignmentToDeliverables(assignmentRepository, cohortRepository, userRepository) {
    return __awaiter(this, void 0, void 0, function () {
        var thisAssignment, thisCohort;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, assignmentRepository.findOne()];
                case 1:
                    thisAssignment = _a.sent();
                    console.log(thisAssignment);
                    return [4 /*yield*/, cohortRepository.findOne({
                            where: { name: 'WDI22' },
                        })];
                case 2:
                    thisCohort = _a.sent();
                    thisCohort.students.forEach(function (student) { return __awaiter(_this, void 0, void 0, function () {
                        var thisStudent, studentDeliverable;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, userRepository.findOne({ _id: student })];
                                case 1:
                                    thisStudent = _a.sent();
                                    console.log(thisStudent.firstName);
                                    studentDeliverable = new Deliverable_1.Deliverable();
                                    studentDeliverable.name = thisAssignment.name;
                                    studentDeliverable.instructions = thisAssignment.instructions;
                                    studentDeliverable.instructor = thisAssignment.instructor;
                                    studentDeliverable.resourcesUrls = thisAssignment.resourcesUrls;
                                    studentDeliverable.topics = thisAssignment.topics;
                                    studentDeliverable.deadline = new Date('2019-02-11');
                                    // Push deliverable
                                    thisStudent.deliverables.push(studentDeliverable);
                                    return [4 /*yield*/, userRepository.update(thisStudent, thisStudent)];
                                case 2:
                                    _a.sent();
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
        var someIntructor, assignment1, createdAssignment, savedAssignment;
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
                    createdAssignment = _a.sent();
                    return [4 /*yield*/, manager.save(createdAssignment)];
                case 3:
                    savedAssignment = _a.sent();
                    console.log(savedAssignment);
                    return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=assignmentExample.js.map