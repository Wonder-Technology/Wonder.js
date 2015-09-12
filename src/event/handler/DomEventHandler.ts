/// <reference path="../../definitions.d.ts"/>
module dy {
    export class DomEventHandler extends EventHandler{
        public off(...args) {
            var self = this,
                dom = this.getDom(),
                eventRegister = EventRegister.getInstance(),
                eventOffDataList:dyCb.Collection<EventOffData> = null;

            eventOffDataList = eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));

            if(eventOffDataList){
                eventOffDataList.forEach((eventOffData:EventOffData) => {
                    self._unBind(dom, eventOffData.eventName, eventOffData.wrapHandler);
                })
            }
        }

        protected getDom(){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected buildWrapHandler(target:GameObject, eventName:EventName){
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected handler(target, eventName, handler, priority){
            var wrapHandler = null;

            if (!EventRegister.getInstance().isBinded(target, eventName)) {
                wrapHandler = this._bind(this.getDom(), eventName, target);
            }
            else{
                wrapHandler = EventRegister.getInstance().getWrapHandler(target, eventName);
            }

            EventRegister.getInstance().register(
                target,
                eventName,
                handler,
                wrapHandler,
                priority
            );
        }

        private _bind(dom:any, eventName:EventName, target:GameObject){
            var wrapHandler = null;

            wrapHandler = this.buildWrapHandler(target, eventName);

            dyCb.EventUtils.addEvent(
                dom,
                eventName,
                wrapHandler
            )

            return wrapHandler;
        }

        private _unBind(dom, eventName, handler){
            dyCb.EventUtils.removeEvent(dom, eventName, handler);
        }
    }
}

