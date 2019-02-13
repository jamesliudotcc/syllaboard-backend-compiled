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
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.editCohort = editCohort;
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
exports.editUser = editUser;
//# sourceMappingURL=adminEdits.js.map