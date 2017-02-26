"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = (function () {
    function Event(eventName) {
        this.name = null;
        this.currentTarget = null;
        this.isStopPropagation = false;
        this.phase = null;
        this.name = eventName;
    }
    Event.prototype.stopPropagation = function () {
        this.isStopPropagation = true;
    };
    Event.prototype.copyMember = function (destination, source, memberArr) {
        memberArr.forEach(function (member) {
            destination[member] = source[member];
        });
        return destination;
    };
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map