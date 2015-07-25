/// <reference path="../definitions.d.ts"/>
module dyCb {
    //declare var window:any;
    export class EventUtils {
        public static bindEvent(context, func) {
            //var args = Array.prototype.slice.call(arguments, 2),
            //    self = this;

            return function (event) {
                //return fun.apply(object, [self.wrapEvent(event)].concat(args)); //对事件对象进行包装
                return func.call(context, event);
            }
        }

        public static addEvent(dom, eventName, handler) {
            if (JudgeUtils.isHostMethod(dom, "addEventListener")) {
                dom.addEventListener(eventName, handler, false);
            }
            else if (JudgeUtils.isHostMethod(dom, "attachEvent")) {
                dom.attachEvent("on" + eventName, handler);
            }
            else {
                dom["on" + eventName] = handler;
            }
        }

        public static removeEvent(dom, eventName, handler) {
            if (JudgeUtils.isHostMethod(dom, "removeEventListener")) {
                dom.removeEventListener(eventName, handler, false);
            }
            else if (JudgeUtils.isHostMethod(dom, "detachEvent")) {
                dom.detachEvent("on" + eventName, handler);
            }
            else {
                dom["on" + eventName] = null;
            }
        }
    }
}
