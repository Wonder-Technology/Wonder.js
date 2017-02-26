"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../definition/typescript/decorator/registerClass");
var Vector2 = Vector2_1 = (function () {
    function Vector2() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.values = new Float32Array(2);
        if (args.length > 0) {
            this.values[0] = args[0];
            this.values[1] = args[1];
        }
    }
    Vector2.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var m = null;
        if (args.length === 0) {
            m = new this();
        }
        else {
            m = new this(args[0], args[1]);
        }
        return m;
    };
    Object.defineProperty(Vector2.prototype, "x", {
        get: function () {
            return this.values[0];
        },
        set: function (x) {
            this.values[0] = x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vector2.prototype, "y", {
        get: function () {
            return this.values[1];
        },
        set: function (y) {
            this.values[1] = y;
        },
        enumerable: true,
        configurable: true
    });
    Vector2.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Vector2.prototype.add = function (v) {
        this.values[0] = this.values[0] + v.values[0];
        this.values[1] = this.values[1] + v.values[1];
        return this;
    };
    Vector2.prototype.mul = function (v) {
        this.values[0] = this.values[0] * v.values[0];
        this.values[1] = this.values[1] * v.values[1];
        return this;
    };
    Vector2.prototype.isEqual = function (v) {
        return this.x === v.x && this.y === v.y;
    };
    Vector2.prototype.clone = function () {
        return Vector2_1.create(this.x, this.y);
    };
    return Vector2;
}());
Vector2 = Vector2_1 = __decorate([
    registerClass_1.registerClass("Vector2")
], Vector2);
exports.Vector2 = Vector2;
var Vector2_1;
//# sourceMappingURL=Vector2.js.map