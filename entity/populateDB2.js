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
var typeorm_1 = require("typeorm");
var Assignment_1 = require("./Assignment");
var Cohort_1 = require("./Cohort");
var Deliverable_1 = require("./Deliverable");
var User_1 = require("./User");
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
    var manager;
    return __generator(this, function (_a) {
        try {
            manager = typeorm_1.getMongoManager();
            // Uncomment and run for mock data
            // createUsers(manager);
            // await createCohorts(manager);
            // await populateCohorts(manager);
        }
        catch (error) {
            console.log('Something went wrong', error);
        }
        return [2 /*return*/];
    });
}); });
function populateCohorts(manager) {
    return __awaiter(this, void 0, void 0, function () {
        var userRepository, cohortRepository, WDI22, UXDI22, someUsers, nextUsers;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userRepository = typeorm_1.getMongoRepository(User_1.User);
                    cohortRepository = typeorm_1.getMongoRepository(Cohort_1.Cohort);
                    return [4 /*yield*/, cohortRepository.findOne({ where: { name: 'WDI22' } })];
                case 1:
                    WDI22 = _a.sent();
                    console.log(WDI22.name, WDI22._id, WDI22.students);
                    return [4 /*yield*/, cohortRepository.findOne({
                            where: { name: 'UXDI22' },
                        })];
                case 2:
                    UXDI22 = _a.sent();
                    console.log(UXDI22.name, UXDI22._id);
                    return [4 /*yield*/, userRepository.find({ take: 10 })];
                case 3:
                    someUsers = _a.sent();
                    return [4 /*yield*/, userRepository.find({ skip: 10 })];
                case 4:
                    nextUsers = _a.sent();
                    someUsers
                        .filter(function (user) { return user.role === 'student'; })
                        .forEach(function (user) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            WDI22.students.push(user._id);
                            console.log(user.firstName, user.lastName, user.role, 'to WDI22');
                            manager.save(WDI22);
                            return [2 /*return*/];
                        });
                    }); });
                    nextUsers
                        .filter(function (user) { return user.role === 'student'; })
                        .forEach(function (user) {
                        UXDI22.students.push(user._id);
                        console.log(user.firstName, user.lastName, user.role, 'to UXDI22');
                        manager.save(UXDI22);
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function createCohorts(manager) {
    return __awaiter(this, void 0, void 0, function () {
        var cohortRepository, cohort1, cohort2, createdCohort1, savedCohort1, createdCohort2, savedCohort2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cohortRepository = typeorm_1.getRepository(Cohort_1.Cohort);
                    cohort1 = new Cohort_1.Cohort();
                    cohort1.name = 'WDI22';
                    cohort1.campus = 'Seattle';
                    cohort1.startDate = new Date('2018-11-26');
                    cohort1.endDate = new Date('2019-03-01');
                    cohort2 = new Cohort_1.Cohort();
                    cohort2.name = 'UXDI22';
                    cohort2.campus = 'Seattle';
                    cohort2.startDate = new Date('2018-11-26');
                    cohort2.endDate = new Date('2019-03-01');
                    return [4 /*yield*/, cohortRepository.create(cohort1)];
                case 1:
                    createdCohort1 = _a.sent();
                    return [4 /*yield*/, manager.save(createdCohort1)];
                case 2:
                    savedCohort1 = _a.sent();
                    console.log(savedCohort1);
                    return [4 /*yield*/, cohortRepository.create(cohort2)];
                case 3:
                    createdCohort2 = _a.sent();
                    return [4 /*yield*/, manager.save(createdCohort2)];
                case 4:
                    savedCohort2 = _a.sent();
                    console.log(savedCohort2);
                    return [2 /*return*/];
            }
        });
    });
}
function createUsers(manager) {
    // Most of this function is the mock data
    var _this = this;
    var userRepository = typeorm_1.getRepository(User_1.User);
    var students = generatedStudents();
    var instructors = generatedInstructors();
    var admins = generatedAdmins();
    students.forEach(function (student) { return __awaiter(_this, void 0, void 0, function () {
        var createdStudent, savedStudent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.create(student)];
                case 1:
                    createdStudent = _a.sent();
                    return [4 /*yield*/, manager.save(createdStudent)];
                case 2:
                    savedStudent = _a.sent();
                    console.log(savedStudent);
                    return [2 /*return*/];
            }
        });
    }); });
    instructors.forEach(function (instructor) { return __awaiter(_this, void 0, void 0, function () {
        var createdInstructor, savedInstructor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.create(instructor)];
                case 1:
                    createdInstructor = _a.sent();
                    return [4 /*yield*/, manager.save(createdInstructor)];
                case 2:
                    savedInstructor = _a.sent();
                    console.log(savedInstructor);
                    return [2 /*return*/];
            }
        });
    }); });
    admins.forEach(function (admin) { return __awaiter(_this, void 0, void 0, function () {
        var createdAdmin, savedAdmin;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userRepository.create(admin)];
                case 1:
                    createdAdmin = _a.sent();
                    return [4 /*yield*/, manager.save(createdAdmin)];
                case 2:
                    savedAdmin = _a.sent();
                    console.log(savedAdmin);
                    return [2 /*return*/];
            }
        });
    }); });
    function generatedStudents() {
        return [
            {
                first_name: 'Dennet',
                last_name: 'McNirlan',
                email: 'dmcnirlan0@dailymotion.com',
            },
            {
                first_name: 'Sigvard',
                last_name: 'Itzkin',
                email: 'sitzkin1@engadget.com',
            },
            {
                first_name: 'Courtney',
                last_name: 'Faill',
                email: 'cfaill2@nps.gov',
            },
            {
                first_name: 'Townsend',
                last_name: 'Graveston',
                email: 'tgraveston3@wordpress.org',
            },
            {
                first_name: 'Kanya',
                last_name: 'Archard',
                email: 'karchard4@technorati.com',
            },
            {
                first_name: 'Harli',
                last_name: 'Boydell',
                email: 'hboydell5@icio.us',
            },
            {
                first_name: 'Don',
                last_name: 'Huckabe',
                email: 'dhuckabe6@mtv.com',
            },
            {
                first_name: 'Neely',
                last_name: 'Goulthorp',
                email: 'ngoulthorp7@t.co',
            },
            {
                first_name: 'Barthel',
                last_name: 'Kennion',
                email: 'bkennion8@bigcartel.com',
            },
            {
                first_name: 'Fernando',
                last_name: 'Coldwell',
                email: 'fcoldwell9@sfgate.com',
            },
            {
                first_name: 'Lydon',
                last_name: 'Playfoot',
                email: 'lplayfoota@ox.ac.uk',
            },
            {
                first_name: 'Lelah',
                last_name: 'Campagne',
                email: 'lcampagneb@cmu.edu',
            },
            {
                first_name: 'Maura',
                last_name: 'Bourdas',
                email: 'mbourdasc@marriott.com',
            },
            {
                first_name: 'Giuditta',
                last_name: 'Daunay',
                email: 'gdaunayd@wp.com',
            },
            {
                first_name: 'Dominica',
                last_name: 'Carnihan',
                email: 'dcarnihane@privacy.gov.au',
            },
            {
                first_name: 'Richy',
                last_name: 'Bradnick',
                email: 'rbradnickf@alibaba.com',
            },
            {
                first_name: 'Mattheus',
                last_name: 'Blowick',
                email: 'mblowickg@google.pl',
            },
            {
                first_name: 'Jillana',
                last_name: 'Picard',
                email: 'jpicardh@microsoft.com',
            },
            {
                first_name: 'Lurleen',
                last_name: 'Tomowicz',
                email: 'ltomowiczi@barnesandnoble.com',
            },
            {
                first_name: 'Bjorn',
                last_name: 'Kohen',
                email: 'bkohenj@hud.gov',
            },
            {
                first_name: 'Katrine',
                last_name: 'Basson',
                email: 'kbassonk@unicef.org',
            },
            {
                first_name: 'Paul',
                last_name: 'Turle',
                email: 'pturlel@bing.com',
            },
            {
                first_name: 'Harland',
                last_name: 'Woolsey',
                email: 'hwoolseym@nytimes.com',
            },
            {
                first_name: 'Marsha',
                last_name: 'Issatt',
                email: 'missattn@freewebs.com',
            },
            {
                first_name: 'Kristopher',
                last_name: 'Fosken',
                email: 'kfoskeno@lycos.com',
            },
            {
                first_name: 'Susann',
                last_name: 'Sherwill',
                email: 'ssherwillp@google.it',
            },
            {
                first_name: 'Palmer',
                last_name: 'Fronzek',
                email: 'pfronzekq@netvibes.com',
            },
            {
                first_name: 'Kayley',
                last_name: 'Spary',
                email: 'ksparyr@odnoklassniki.ru',
            },
            {
                first_name: 'Cybill',
                last_name: 'Okenden',
                email: 'cokendens@myspace.com',
            },
            {
                first_name: 'Blinni',
                last_name: 'Bolle',
                email: 'bbollet@gizmodo.com',
            },
            {
                first_name: 'Danny',
                last_name: 'Hempel',
                email: 'dhempelu@arstechnica.com',
            },
            {
                first_name: 'Quint',
                last_name: 'Broz',
                email: 'qbrozv@slideshare.net',
            },
            {
                first_name: 'Stavro',
                last_name: "O'Mohun",
                email: 'somohunw@e-recht24.de',
            },
            {
                first_name: 'Iona',
                last_name: 'Gyves',
                email: 'igyvesx@nih.gov',
            },
            {
                first_name: 'Harrietta',
                last_name: 'Draude',
                email: 'hdraudey@tiny.cc',
            },
            {
                first_name: 'Claudetta',
                last_name: 'Wysome',
                email: 'cwysomez@hao123.com',
            },
            {
                first_name: 'Farlie',
                last_name: 'Burne',
                email: 'fburne10@ameblo.jp',
            },
            {
                first_name: 'Jaclin',
                last_name: 'Clunie',
                email: 'jclunie11@gnu.org',
            },
            {
                first_name: 'Gino',
                last_name: 'Shipsey',
                email: 'gshipsey12@plala.or.jp',
            },
            {
                first_name: 'Liuka',
                last_name: 'Karpmann',
                email: 'lkarpmann13@nbcnews.com',
            },
            {
                first_name: 'Filberto',
                last_name: 'Kelcher',
                email: 'fkelcher14@tamu.edu',
            },
            {
                first_name: 'Aviva',
                last_name: "O'Keenan",
                email: 'aokeenan15@kickstarter.com',
            },
        ].map(function (user) { return (__assign({}, user, { role: 'student', password: 'password' })); });
    }
    function generatedInstructors() {
        return [
            {
                firstName: 'Brandi',
                lastName: 'Butler',
                email: 'brandi@ga.co',
            },
            {
                firstName: 'Taylor',
                lastName: 'Darneille',
                email: 'taylor@ga.co',
            },
        ].map(function (user) { return (__assign({}, user, { role: 'instructor', password: 'password' })); });
    }
    function generatedAdmins() {
        return [
            {
                firstName: 'James',
                lastName: 'Liu',
                email: 'james@jamesliu.cc',
            },
            {
                firstName: 'Sarah',
                lastName: 'King',
                email: '009kings@gmail.com',
            },
            {
                firstName: 'Parker',
                lastName: 'Couch',
                email: 'parkercouch@gmail.com',
            },
        ].map(function (user) { return (__assign({}, user, { role: 'admin', password: 'password' })); });
    }
}
//# sourceMappingURL=populateDB2.js.map