'use strict';

var MutableHashMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/hash_map/MutableHashMap.bs.js");
var MutableSparseMap$WonderCommonlib = require("wonder-commonlib/lib/js/src/structure/sparse_map/MutableSparseMap.bs.js");

var _createSpecialKeyMap = (function() {
  var resultMap = [];
  var special_key_map = {
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
        };

        for(let key in special_key_map){
          if(special_key_map.hasOwnProperty(key)){
resultMap[key] = special_key_map[key];
          }
        }

        return resultMap;
        });

var _createShiftKeyByKeyCodeMap = (function(){
  var resultMap = [];
  var map = {
            59: ":",
            61: "+",
            65: "A",
            66: "B",
            67: "C",
            68: "D",
            69: "E",
            70: "F",
            71: "G",
            72: "H",
            73: "I",
            74: "J",
            75: "K",
            76: "L",
            77: "M",
            78: "N",
            79: "O",
            80: "P",
            81: "Q",
            82: "R",
            83: "S",
            84: "T",
            85: "U",
            86: "V",
            87: "W",
            88: "X",
            89: "Y",
            90: "Z",
            96: ")",
            97: "!",
            98: "@",
            99: "#",
            100: "$",
            101: "%",
            102: "^",
            103: "&",
            104: "*",
            105: "(",
            173: "_",
            186: ":",
            187: "+",
            188: "<",
            189: "_",
            190: ">",
            191: "?",
            192: "~",
            219: "{",
            220: "|",
            221: "}",
            222: "\""
        };

        for(let key in map){
          if(map.hasOwnProperty(key)){
resultMap[key] = map[key];
          }
        }

        return resultMap;
        });

var _createShiftKeyByCharCodeMap = (function(){
  return {
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
            ";": ":",
            "'": "\"",
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|"
        }
        });

function create(param) {
  return {
          eventRecord: {
            domEventStreamSubscription: undefined,
            mouseDomEventDataArrMap: MutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
            keyboardDomEventDataArrMap: MutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
            touchDomEventDataArrMap: MutableSparseMap$WonderCommonlib.createEmpty(undefined, undefined),
            customGlobalEventArrMap: MutableHashMap$WonderCommonlib.createEmpty(undefined, undefined),
            customGameObjectEventArrMap: MutableHashMap$WonderCommonlib.createEmpty(undefined, undefined),
            mouseEventData: {
              lastX: undefined,
              lastY: undefined,
              isDrag: false
            },
            keyboardEventData: {
              specialKeyMap: _createSpecialKeyMap(),
              shiftKeyByKeyCodeMap: _createShiftKeyByKeyCodeMap(),
              shiftKeyByCharCodeMap: _createShiftKeyByCharCodeMap()
            },
            touchEventData: {
              lastX: undefined,
              lastY: undefined,
              isDrag: false
            }
          },
          canvas: undefined,
          body: undefined,
          browser: /* Chrome */0
        };
}

exports._createSpecialKeyMap = _createSpecialKeyMap;
exports._createShiftKeyByKeyCodeMap = _createShiftKeyByKeyCodeMap;
exports._createShiftKeyByCharCodeMap = _createShiftKeyByCharCodeMap;
exports.create = create;
/* No side effect */
