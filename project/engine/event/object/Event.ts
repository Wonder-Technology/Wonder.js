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



/// <reference path="../../definitions.d.ts"/>

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
        public type:EventType = null;
        //get type(){
        //    dyCb.Log.error(this._type === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);
        //
        //    return this._type;
        //}

        private _name:string = null;
        get name() {
            return this._name;
        }
        set name(name:string) {
            this._name = name;
        }

        constructor(eventName:EventName) {
            this._name = eventName;
        }

        private _target:GameObject = null;
        get target() {
            dyCb.Log.error(!this._target, dyCb.Log.info.FUNC_MUST_DEFINE("target"));

            return this._target;
            //return this._target;
            //return this._event.srcElement || this._event.target;
        }
        set target(target:GameObject) {
            this._target = target;
        }

        private _currentTarget:IView = null;
        get currentTarget() {
            return this._currentTarget;
        }
        set currentTarget(currentTarget:IView) {
            this._currentTarget = currentTarget;
        }

        private _isStopPropagation:boolean = false;
        get isStopPropagation() {
            return this._isStopPropagation;
        }

        set isStopPropagation(isStopPropagation:boolean) {
            this._isStopPropagation = isStopPropagation;
        }

        private _phase:EventPhase = null;
        get phase() {
            return this._phase;
        }

        set phase(phase:EventPhase) {
            this._phase = phase;
        }

        private _event:any = null;
        get event() {
            return this._event;
        }

        set event(event:any) {
            this._event = event || window.event;
        }



        public stopPropagation() {
            this._isStopPropagation = true;
        }
    }
}
