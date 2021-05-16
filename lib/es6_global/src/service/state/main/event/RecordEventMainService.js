

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as MutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableSparseMapService.js";

function _createSpecialKeyMap (){
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
  };

function _createShiftKeyByKeyCodeMap (){
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
  };

function _createShiftKeyByCharCodeMap (){
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
  };

function create(param) {
  return /* record */[
          /* domEventStreamSubscription */undefined,
          /* mouseDomEventDataArrMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* keyboardDomEventDataArrMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* touchDomEventDataArrMap */MutableSparseMapService$WonderCommonlib.createEmpty(/* () */0),
          /* customGlobalEventArrMap */MutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
          /* customGameObjectEventArrMap */MutableHashMapService$WonderCommonlib.createEmpty(/* () */0),
          /* mouseEventData : record */[
            /* lastX */undefined,
            /* lastY */undefined,
            /* isDrag */false
          ],
          /* keyboardEventData : record */[
            /* specialKeyMap */_createSpecialKeyMap(),
            /* shiftKeyByKeyCodeMap */_createShiftKeyByKeyCodeMap(),
            /* shiftKeyByCharCodeMap */_createShiftKeyByCharCodeMap()
          ],
          /* touchEventData : record */[
            /* lastX */undefined,
            /* lastY */undefined,
            /* isDrag */false
          ]
        ];
}

function _deepCopyDomEventArrMap(domEventArrMap) {
  return MutableSparseMapService$WonderCommonlib.mapValid((function (arr) {
                return arr.slice();
              }), MutableSparseMapService$WonderCommonlib.copy(domEventArrMap));
}

function _deepCopyCustomGlobalEventArrMap(customGlobalEventArrMap) {
  return MutableHashMapService$WonderCommonlib.map(MutableSparseMapService$WonderCommonlib.copy, customGlobalEventArrMap);
}

function _deepCopyCustomGameObjectEventArrMap(customGameObjectEventArrMap) {
  return MutableHashMapService$WonderCommonlib.map((function (eventArrMap) {
                return MutableSparseMapService$WonderCommonlib.mapValid((function (arr) {
                              return arr.slice();
                            }), MutableSparseMapService$WonderCommonlib.copy(eventArrMap));
              }), customGameObjectEventArrMap);
}

function deepCopyForRestore(state) {
  var eventRecord = state[/* eventRecord */43];
  var newrecord = Caml_array.caml_array_dup(state);
  newrecord[/* eventRecord */43] = /* record */[
    /* domEventStreamSubscription */eventRecord[/* domEventStreamSubscription */0],
    /* mouseDomEventDataArrMap */_deepCopyDomEventArrMap(eventRecord[/* mouseDomEventDataArrMap */1]),
    /* keyboardDomEventDataArrMap */_deepCopyDomEventArrMap(eventRecord[/* keyboardDomEventDataArrMap */2]),
    /* touchDomEventDataArrMap */_deepCopyDomEventArrMap(eventRecord[/* touchDomEventDataArrMap */3]),
    /* customGlobalEventArrMap */_deepCopyCustomGlobalEventArrMap(eventRecord[/* customGlobalEventArrMap */4]),
    /* customGameObjectEventArrMap */_deepCopyCustomGameObjectEventArrMap(eventRecord[/* customGameObjectEventArrMap */5]),
    /* mouseEventData : record */[
      /* lastX */undefined,
      /* lastY */undefined,
      /* isDrag */false
    ],
    /* keyboardEventData */eventRecord[/* keyboardEventData */7],
    /* touchEventData : record */[
      /* lastX */undefined,
      /* lastY */undefined,
      /* isDrag */false
    ]
  ];
  return newrecord;
}

export {
  _createSpecialKeyMap ,
  _createShiftKeyByKeyCodeMap ,
  _createShiftKeyByCharCodeMap ,
  create ,
  _deepCopyDomEventArrMap ,
  _deepCopyCustomGlobalEventArrMap ,
  _deepCopyCustomGameObjectEventArrMap ,
  deepCopyForRestore ,
  
}
/* No side effect */
