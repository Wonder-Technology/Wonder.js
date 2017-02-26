"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var registerClass_1 = require("../../definition/typescript/decorator/registerClass");
var DomEvent_1 = require("./DomEvent");
var EEventType_1 = require("./EEventType");
var SPECIAL_KEY_MAP = {
    8: "backspace",
    9: "tab",
    10: "return",
    13: "return",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "capslock",
    27: "esc",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    45: "insert",
    46: "del",
    59: ";",
    61: "=",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    96: "0",
    97: "1",
    98: "2",
    99: "3",
    100: "4",
    101: "5",
    102: "6",
    103: "7",
    104: "8",
    105: "9",
    106: "*",
    107: "+",
    109: "-",
    110: ".",
    111: "/",
    112: "f1",
    113: "f2",
    114: "f3",
    115: "f4",
    116: "f5",
    117: "f6",
    118: "f7",
    119: "f8",
    120: "f9",
    121: "f10",
    122: "f11",
    123: "f12",
    144: "numlock",
    145: "scroll",
    173: "-",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "'"
}, SHIFT_KEY_MAP = {
    "`": "~",
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
    "7": "&",
    "8": "*",
    "9": "(",
    "0": ")",
    "-": "_",
    "=": "+",
    ";": ": ",
    "'": "\"",
    ",": "<",
    ".": ">",
    "/": "?",
    "\\": "|"
};
var KeyboardEvent = KeyboardEvent_1 = (function (_super) {
    __extends(KeyboardEvent, _super);
    function KeyboardEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = EEventType_1.EEventType.KEYBOARD;
        _this.keyState = null;
        return _this;
    }
    KeyboardEvent.create = function (event, eventName) {
        var obj = new this(event, eventName);
        return obj;
    };
    Object.defineProperty(KeyboardEvent.prototype, "ctrlKey", {
        get: function () {
            return this.event.ctrlKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardEvent.prototype, "altKey", {
        get: function () {
            return this.event.altKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardEvent.prototype, "shiftKey", {
        get: function () {
            return this.event.shiftKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardEvent.prototype, "metaKey", {
        get: function () {
            return this.event.metaKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardEvent.prototype, "keyCode", {
        get: function () {
            return this.event.keyCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(KeyboardEvent.prototype, "key", {
        get: function () {
            var key = SPECIAL_KEY_MAP[this.keyCode], char = null;
            if (!key) {
                char = String.fromCharCode(this.keyCode).toLowerCase();
                if (this.shiftKey) {
                    return SHIFT_KEY_MAP[char];
                }
                return char;
            }
            return key;
        },
        enumerable: true,
        configurable: true
    });
    KeyboardEvent.prototype.clone = function () {
        var eventObj = KeyboardEvent_1.create(this.event, this.name);
        return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
    };
    return KeyboardEvent;
}(DomEvent_1.DomEvent));
KeyboardEvent = KeyboardEvent_1 = __decorate([
    registerClass_1.registerClass("KeyboardEvent")
], KeyboardEvent);
exports.KeyboardEvent = KeyboardEvent;
var KeyboardEvent_1;
//# sourceMappingURL=KeyboardEvent.js.map