/// <reference path="../../definitions.d.ts"/>
module dy {
    export class EventHandler {
        public on(...args) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public off(...args) {
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public trigger(...args):boolean {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }
    }
}
