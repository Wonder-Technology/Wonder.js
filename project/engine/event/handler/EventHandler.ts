/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export class EventHandler {
        public on(...args) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public off(...args) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public trigger(...args) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
    }
}
