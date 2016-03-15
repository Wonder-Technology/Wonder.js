module wd {
    export abstract class DomEventHandler extends EventHandler{
        public off(eventName:EEventName):void;

        public off(eventName:EEventName, handler:Function):void;
        public off(dom:HTMLElement, eventName:EEventName):void;

        public off(dom:HTMLElement, eventName:EEventName, handler:Function):void;

        public off(...args) {
            var self = this,
                eventRegister = DomEventRegister.getInstance(),
                eventOffDataList:wdCb.Collection<DomEventOffData> = null;

            eventOffDataList = eventRegister.remove.apply(eventRegister, args);

            if(eventOffDataList){
                eventOffDataList.forEach((list:wdCb.Collection<DomEventOffData>) => {
                    list.forEach((eventOffData:DomEventOffData) => {
                        self._unBind(eventOffData.dom, eventOffData.eventName, eventOffData.domHandler);
                    });
                })
            }

            //this.clearHandler();
        }

        public trigger(event:Event):void;
        public trigger(dom:HTMLElement, event:Event):void;

        public trigger(...args):void{
            var dom = null,
                event = null,
                eventName = null,
                registerDataList:wdCb.Collection<DomEventRegisterData> = null;

            if(args.length === 1){
                event = args[0];
                dom = this.getDefaultDom();
            }
            else{
                dom = args[0];
                event = args[1];
            }

            eventName = event.name;

            registerDataList = DomEventRegister.getInstance().getEventRegisterDataList(dom, eventName);

            if (registerDataList === null || registerDataList.getCount()=== 0) {
                return;
            }

            registerDataList.forEach((registerData:DomEventRegisterData) => {
                var eventCopy = event.clone();

                registerData.handler(eventCopy, registerData.eventData);
            });
        }

        protected abstract triggerDomEvent(dom:HTMLElement, event:Event, eventName:EEventName);
        protected abstract addEngineHandler(eventName:EEventName, handler:Function);
        protected abstract getDefaultDom():HTMLElement;
        protected abstract createEventData():wdCb.Hash<any>;

        @virtual
        protected clearHandler(){
        }

        protected buildDomHandler(dom:HTMLElement, eventName:EEventName){
            var self = this,
                context = root;

            return wdCb.EventUtils.bindEvent(context, function (event) {
                self.triggerDomEvent(dom, event, eventName);
            });
        }

        protected handler(dom:HTMLElement, eventName:EEventName, handler:Function, priority:number){
            var domHandler = null,
                originHandler = handler;

            handler = this.addEngineHandler(eventName, handler);

            if (!DomEventRegister.getInstance().isBinded(dom, eventName)) {
                domHandler = this._bind(dom, eventName);
            }
            else{
                domHandler = DomEventRegister.getInstance().getDomHandler(dom, eventName);
            }

            DomEventRegister.getInstance().register(
                dom,
                eventName,
                this.createEventData(),
                handler,
                originHandler,
                domHandler,
                priority
            );
        }

        private _bind(dom:HTMLElement, eventName:EEventName){
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
            wdCb.EventUtils.removeEvent(dom, EventNameHandler.handleEventName(eventName), handler);
        }
    }
}

