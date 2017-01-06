var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference path="../../../dist/Hilo3D.d.ts"/>
var sample;
(function (sample) {
    var Event = (function () {
        function Event(entityObject) {
        }
        Event.prototype.onMouseClick = function (e) {
        };
        Event.prototype.onMouseOver = function (e) {
        };
        Event.prototype.onMouseOut = function (e) {
        };
        Event.prototype.onMouseMove = function (e) {
        };
        Event.prototype.onMouseDown = function (e) {
        };
        Event.prototype.onMouseUp = function (e) {
        };
        Event.prototype.onMouseWheel = function (e) {
        };
        Event.prototype.onMouseDrag = function (e) {
        };
        Event = __decorate([
            Hilo3D.script("event")
        ], Event);
        return Event;
    }());
    sample.Event = Event;
})(sample || (sample = {}));
//# sourceMappingURL=event.js.map