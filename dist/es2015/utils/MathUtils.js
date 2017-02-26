var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { registerClass } from "../definition/typescript/decorator/registerClass";
import { requireCheck, it, ensure } from "../definition/typescript/decorator/contract";
import expect from "wonder-expect.js";
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.clamp = function (num, below, up) {
        if (num < below) {
            return below;
        }
        else if (num > up) {
            return up;
        }
        return num;
    };
    MathUtils.bigThan = function (num, below) {
        return num < below ? below : num;
    };
    MathUtils.generateZeroToOne = function () {
        return Math.random();
    };
    MathUtils.generateMinToMax = function (min, max) {
        return Math.random() * (max + 1 - min) + min;
    };
    MathUtils.generateInteger = function (min, max) {
        return Math.floor(this.generateMinToMax(min, max));
    };
    MathUtils.mod = function (a, b) {
        var n = Math.floor(a / b);
        a -= n * b;
        if (a < 0) {
            a += b;
        }
        return a;
    };
    MathUtils.maxFloorIntegralMultiple = function (a, b) {
        if (b == 0) {
            return a;
        }
        if (a < b) {
            return 0;
        }
        return Math.floor(a / b) * b;
    };
    return MathUtils;
}());
__decorate([
    requireCheck(function (min, max) {
        it("min should <= max", function () {
            expect(min).lte(max);
        });
    })
], MathUtils, "generateMinToMax", null);
__decorate([
    ensure(function (val) {
        it("result should >= 0", function () {
            expect(val).gte(0);
        });
    })
], MathUtils, "mod", null);
__decorate([
    requireCheck(function (a, b) {
        it("a,b should >= 0", function () {
            expect(a).gte(0);
            expect(b).gte(0);
        });
    }),
    ensure(function (val) {
        it("result should >= 0", function () {
            expect(val).gte(0);
        });
    })
], MathUtils, "maxFloorIntegralMultiple", null);
MathUtils = __decorate([
    registerClass("MathUtils")
], MathUtils);
export { MathUtils };
//# sourceMappingURL=MathUtils.js.map