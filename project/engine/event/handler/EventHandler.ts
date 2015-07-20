/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export class EventHandler {
        public on(view:IView, eventType:EventType, target:GameObject) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public off(view:IView, eventType:EventType, handler:Function) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public trigger(target:GameObject, eventObject:Event, handler:Function) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
    }
}
