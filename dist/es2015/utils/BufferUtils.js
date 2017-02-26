var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { requireCheck, it } from "../definition/typescript/decorator/contract";
import { EVariableType } from "../renderer/shader/variable/EVariableType";
import expect from "wonder-expect.js";
import { JudgeUtils } from "./JudgeUtils";
import { ArrayBuffer } from "../renderer/buffer/ArrayBuffer";
import { EBufferType } from "../renderer/buffer/EBufferType";
import { Log } from "./Log";
var BufferUtils = (function () {
    function BufferUtils() {
    }
    BufferUtils.convertArrayToArrayBuffer = function (type, value) {
        var size = this._getBufferSize(type);
        return ArrayBuffer.create(value, size, EBufferType.FLOAT);
    };
    BufferUtils._getBufferSize = function (type) {
        var size = null;
        switch (type) {
            case EVariableType.FLOAT_1:
            case EVariableType.NUMBER_1:
                size = 1;
                break;
            case EVariableType.FLOAT_2:
                size = 2;
                break;
            case EVariableType.FLOAT_3:
                size = 3;
                break;
            case EVariableType.FLOAT_4:
                size = 4;
                break;
            default:
                Log.error(true, Log.info.FUNC_UNEXPECT("EVariableType", type));
                break;
        }
        return size;
    };
    return BufferUtils;
}());
__decorate([
    requireCheck(function (type, value) {
        it("value:" + value + " should be array", function () {
            expect(JudgeUtils.isArrayExactly(value)).true;
        });
    })
], BufferUtils, "convertArrayToArrayBuffer", null);
BufferUtils = __decorate([
    registerClass("BufferUtils")
], BufferUtils);
export { BufferUtils };
//# sourceMappingURL=BufferUtils.js.map