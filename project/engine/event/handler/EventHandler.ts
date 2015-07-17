/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export class EventHandler {
        public on(view:IView, eventName:EventName, target:GameObject) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public off(view:IView, target:GameObject, eventName?:EventName) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public trigger(target:GameObject, eventObject:Event, handler:Function) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
    }
}
