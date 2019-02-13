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
exports.editAssignment = editAssignment;
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
exports.editDeliverable = editDeliverable;
//# sourceMappingURL=instructorEdits.js.map