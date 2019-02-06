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
// tslint:disable:no-var-requires
var en = require('nanoid-good/locale/en');
var nanoid = require('nanoid-good')(en);
// tslint:enable:no-var-requires
var Cohort = /** @class */ (function () {
    function Cohort() {
        this.students = []; // User
        this.instructors = []; // User
    }
    Cohort.prototype.generateKey = function () {
        this.key = nanoid();
    };
    __decorate([
        typeorm_1.ObjectIdColumn(),
        __metadata("design:type", typeorm_1.ObjectID)
    ], Cohort.prototype, "_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Cohort.prototype, "key", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Cohort.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Cohort.prototype, "campus", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Array)
    ], Cohort.prototype, "students", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Array)
    ], Cohort.prototype, "instructors", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Cohort.prototype, "startDate", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Cohort.prototype, "endDate", void 0);
    __decorate([
        typeorm_1.BeforeInsert(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Cohort.prototype, "generateKey", null);
    Cohort = __decorate([
        typeorm_1.Entity()
    ], Cohort);
    return Cohort;
}());
exports.Cohort = Cohort;
//# sourceMappingURL=Cohort.js.map