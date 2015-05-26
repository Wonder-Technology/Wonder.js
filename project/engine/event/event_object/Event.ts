///// <reference path="../utils/JudgeUtils.ts"/>
//module Engine3D{
//    declare var window:any;
//
//    //export enum Event{
//    //    //事件枚举值
//    //    KEY_DOWN,
//    //    KEY_UP,
//    //    KEY_PRESS,
//    //
//    //    MOUSE_MOVE,
//    //    MOUSE_OUT,
//    //    MOUSE_OVER,
//    //    MOUSE_DOWN,
//    //    MOUSE_UP,
//    //    CLICK,
//    //    CONTEXTMENU,
//    //}
//    export class Event{
//       constructor(event) {
//           this._e = event ? event : window.event;
//       }
//
//        get target(){
//            return this._e.srcElement || this._e.target;
//        }
//
//        get pageX(){
//            if (JudgeUtils.browser.isIE()) {
//                return this._e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
//            }
//
//            return this._e.pageX;
//        }
//
//        get pageY(){
//            if (JudgeUtils.browser.isIE()) {
//                return this._e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
//            }
//
//            return this._e.pageY;
//        }
//
//        get stopBubble(){
//            if (JudgeUtils.browser.isIE()) {
//                return function () {
//                    this._e.cancelBubble = true;
//                };
//            }
//
//            return this._e.button;
//        }
//
//
//        get preventDefault(){
//            if (JudgeUtils.browser.isIE7() || JudgeUtils.browser.isIE8()) {
//                return function () {
//                        this._e.returnValue = false;
//                    };
//            }
//
//            return this._e.preventDefault;
//        }
//
//        get type(){
//            return this._e.type;
//        }
//
//        get relatedTarget(){
//            if (JudgeUtils.browser.isIE7() || JudgeUtils.browser.isIE8()) {
//                if (this._e.type == "mouseout") {
//                    return this._e.toElement;
//                }
//                else if (this._e.type == "mouseover") {
//                    return this._e.fromElement;
//                }
//            }
//
//            return this._e.relatedTarget;
//        }
//        get mouseButton(){
//            var button = null;
//
//            if (JudgeUtils.browser.isIE7() || JudgeUtils.browser.isIE8()) {
//                switch (this._e.button) {
//                    case 1:
//                        button = 0;
//                        break;
//                    case 4:
//                        button = 1;
//                        break;
//                    case 2:
//                        button = 2;
//                        break;
//                    default:
//                        button = this._e.button;
//                        break;
//                }
//
//                return button;
//            }
//
//            return this._e.button;
//        }
//
//        get keyCode(){
//            if(JudgeUtils.browser.isIE()){
//                return this._e.keyCode;
//            }
//
//            return this._e.which;
//        }
//
//        private _e:any = null;
//    }
//}


//rich domain model

//event info:
//control info(stop bubble...)
//system data(system event, as clientX...)
//event context(target, currentTarget...)
//user data(custom event)
//event type


module Engine3D{
    export class Event{
        //abstact attri
        protected _type:EventType = null;

        get type(){
            Log.error(this._type === null, Log.info.ABSTRACT_ATTRIBUTE);

            return this._type;
        }
    }
}
