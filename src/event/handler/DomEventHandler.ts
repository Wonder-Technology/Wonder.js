/// <reference path="../../filePath.d.ts"/>
module dy {
    export abstract class DomEventHandler extends EventHandler{
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

        protected abstract getDom();
        protected abstract createEventObject(event:any, eventName:EventName, currentTarget:GameObject);
        protected abstract handleEvent(eventName:EventName, event:Event);

        protected buildWrapHandler(target:GameObject, eventName:EventName){
            var self = this,
                context = root;

            return dyCb.EventUtils.bindEvent(context, function (event) {
                let eventObject:Event = self.createEventObject(event, eventName, target);

                self.handleEvent(eventName, eventObject);
            });
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

