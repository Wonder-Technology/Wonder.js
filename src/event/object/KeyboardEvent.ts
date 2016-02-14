module wd {
    const SPECIAL_KEY_MAP = {
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
        },
        SHIFT_KEY_MAP = {
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

    export class KeyboardEvent extends DomEvent{
        public static create(event:any, eventName:EEventName) {
            var obj = new this(event, eventName);

            return obj;
        }

        protected p_type:EEventType = EEventType.KEYBOARD;

        get ctrlKey(){
            return this.event.ctrlKey;
        }

        get altKey(){
            return this.event.altKey;
        }

        get shiftKey(){
            return this.event.shiftKey;
        }

        get metaKey(){
            //return this.event.metaKey && !this.ctrlKey;
            return this.event.metaKey;
        }

        get keyCode(){
            return this.event.keyCode;
        }

        get key(){
            var key = SPECIAL_KEY_MAP[this.keyCode],
                char = null;

            if(!key){
                char = String.fromCharCode(this.keyCode).toLowerCase();

                if(this.shiftKey){
                    return SHIFT_KEY_MAP[char];
                }

                return char;
            }

            return key;
        }

        public keyState:any = null;

        public copy():KeyboardEvent{
            var eventObj = KeyboardEvent.create(this.event, this.name);

            return <KeyboardEvent>this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase", "altKey", "shiftKey", "ctrlKey", "metaKey", "keyCode", "key"]);
        }
    }
}
