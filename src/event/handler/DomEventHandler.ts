/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class DomEventHandler extends EventHandler{
        public off(eventName:EventName):void;
        public off(eventName:EventName, handler:Function):void;
        public off(dom:HTMLElement, eventName:EventName):void;
        public off(dom:HTMLElement, eventName:EventName, handler:Function):void;

        public off(...args) {
            var self = this,
                dom = null,
                eventRegister = EventRegister.getInstance(),
                eventOffDataList:wdCb.Collection<EventOffData> = null;

            //if(JudgeUtils.isDom(args[0])){
            //    dom = args[0];
            //}
            //else{
            //    dom = this.getDefaultDom();
            //    args.unshift(dom);
            //}

            eventOffDataList = eventRegister.remove.apply(eventRegister, args);

            if(eventOffDataList){
                eventOffDataList.forEach((list:wdCb.Collection<EventOffData>) => {
                    list.forEach((eventOffData:EventOffData) => {
                        self._unBind(eventOffData.dom, eventOffData.eventName, eventOffData.domHandler);
                    });
                })
            }

            this.clearHandler();
        }

        public trigger(event:Event):void;
        public trigger(dom:HTMLElement, event:Event):void;

        public trigger(...args):void{
            var dom = null,
                event = null,
                eventName = null,
                registerDataList:wdCb.Collection<EventRegisterData> = null;

            if(args.length === 1){
                event = args[0];
                dom = this.getDefaultDom();
            }
            else{
                dom = args[0];
                event = args[1];
            }

            eventName = event.name;

            registerDataList = EventRegister.getInstance().getEventRegisterDataList(dom, eventName);

            if (registerDataList === null || registerDataList.getCount()=== 0) {
                return;
            }

            registerDataList.forEach((registerData:EventRegisterData) => {
                var eventCopy = event.copy();

                registerData.handler(eventCopy);
            });
        }

        protected abstract triggerDomEvent(dom:HTMLElement, event:Event, eventName:EventName);
        protected abstract addEngineHandler(eventName:EventName, handler:Function);
        protected abstract getDefaultDom():HTMLElement;

        @virtual
        protected clearHandler(){
        }

        protected buildDomHandler(dom:HTMLElement, eventName:EventName){
            var self = this,
                context = root;

            return wdCb.EventUtils.bindEvent(context, function (event) {
                self.triggerDomEvent(dom, event, eventName);
            });
        }

        protected handler(dom:HTMLElement, eventName:EventName, handler:Function, priority:number){
            var domHandler = null,
                originHandler = handler;

            handler = this.addEngineHandler(eventName, handler);

            if (!EventRegister.getInstance().isBinded(dom, eventName)) {
                domHandler = this._bind(dom, eventName);
            }
            else{
                domHandler = EventRegister.getInstance().getDomHandler(dom, eventName);
            }

            EventRegister.getInstance().register(
                dom,
                eventName,
                handler,
                originHandler,
                domHandler,
                priority
            );
        }

        private _bind(dom:HTMLElement, eventName:EventName){
            var domHandler = null;

            domHandler = this.buildDomHandler(dom, eventName);

            wdCb.EventUtils.addEvent(
                dom,
                EventNameHandler.handleEventName(eventName),
                domHandler
            );

            return domHandler;
        }

        private _unBind(dom, eventName, handler){
            wdCb.EventUtils.removeEvent(dom, eventName, handler);
        }
    }
}

