"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var contract_1 = require("../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
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
    contract_1.requireCheck(function (min, max) {
        contract_1.it("min should <= max", function () {
            wonder_expect_js_1.default(min).lte(max);
        });
    })
], MathUtils, "generateMinToMax", null);
__decorate([
    contract_1.ensure(function (val) {
        contract_1.it("result should >= 0", function () {
            wonder_expect_js_1.default(val).gte(0);
        });
    })
], MathUtils, "mod", null);
__decorate([
    contract_1.requireCheck(function (a, b) {
        contract_1.it("a,b should >= 0", function () {
            wonder_expect_js_1.default(a).gte(0);
            wonder_expect_js_1.default(b).gte(0);
        });
    }),
    contract_1.ensure(function (val) {
        contract_1.it("result should >= 0", function () {
            wonder_expect_js_1.default(val).gte(0);
        });
    })
], MathUtils, "maxFloorIntegralMultiple", null);
MathUtils = __decorate([
    registerClass_1.registerClass("MathUtils")
], MathUtils);
exports.MathUtils = MathUtils;
//# sourceMappingURL=MathUtils.js.map