"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Topic_1 = require("./Topic");
var Deliverable = /** @class */ (function () {
    function Deliverable() {
        this.instructor = [];
        this.student = [];
        this.cohort = [];
        this.topics = [];
        this.turnedIn = null; // Maybe just a Boolean?
        this.completed = null; // Date indicates acceptance of assignment
    }
    __decorate([
        typeorm_1.ObjectIdColumn(),
        __metadata("design:type", typeorm_1.ObjectID)
    ], Deliverable.prototype, "_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Deliverable.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Array)
    ], Deliverable.prototype, "instructor", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Array)
    ], Deliverable.prototype, "student", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Array)
    ], Deliverable.prototype, "cohort", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Deliverable.prototype, "instructions", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Array)
    ], Deliverable.prototype, "resourcesUrls", void 0);
    __decorate([
        typeorm_1.Column(function (type) { return Topic_1.Topic; }),
        __metadata("design:type", Array)
    ], Deliverable.prototype, "topics", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Deliverable.prototype, "deadline", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Deliverable.prototype, "turnedIn", void 0);
    __decorate([
        typeorm_1.Column() // null indicates not turned in.
        ,
        __metadata("design:type", Date)
    ], Deliverable.prototype, "completed", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Deliverable.prototype, "deliverable", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Deliverable.prototype, "grade", void 0);
    Deliverable = __decorate([
        typeorm_1.Entity()
    ], Deliverable);
    return Deliverable;
}());
exports.Deliverable = Deliverable;
//# sourceMappingURL=Deliverable.js.map