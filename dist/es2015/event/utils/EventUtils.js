var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { ensure, assert } from "../../definition/typescript/decorator/contract";
import { EntityObject } from "../../core/entityObject/EntityObject";
import { Log } from "../../utils/Log";
var EventUtils = (function () {
    function EventUtils() {
    }
    EventUtils.isEvent = function (arg) {
        return arg && arg.currentTarget !== void 0;
    };
    EventUtils.isEntityObject = function (arg) {
        return arg && arg.bubbleParent !== void 0;
    };
    return EventUtils;
}());
__decorate([
    ensure(function (isEntityObject, arg) {
        if (isEntityObject) {
            assert(arg instanceof EntityObject, Log.info.FUNC_MUST_BE("EntityObject, but actual is " + arg));
        }
    })
], EventUtils, "isEntityObject", null);
EventUtils = __decorate([
    registerClass("EventUtils")
], EventUtils);
export { EventUtils };
//# sourceMappingURL=EventUtils.js.map