/// <reference path="../../definitions.d.ts"/>
module Engine3D {
    export class EventDispatcher {
        public static create() {
            var obj = new this();

            return obj;
        }

        //private _eventBinder: EventBinder = null;
        //private _eventRegister:EventRegister = null;

        constructor() {
            //this._eventBinder = binder;
            //EventRegister.getInstance() = register;
        }

        //dispatch in eventBinder->eventList


        //public setBubbleParent(target:GameObject, parent:any) {
        //    EventRegister.getInstance().setBubbleParent(target, parent);
        //}

        public trigger(event:Event):boolean;
        public trigger(target:GameObject, event:Event):boolean;
        public trigger(target:GameObject, event:Event, notSetTarget:boolean):boolean;

        public trigger(args) {
            if(arguments.length === 1){
                let event = arguments[0],
                    eventType = event.type;

                return FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event);
            }
            else if(arguments.length === 2 || arguments.length === 3){
                let target = arguments[0],
                    event = arguments[1],
                    notSetTarget = arguments[2] === void 0 ? false : arguments[2],
                    eventType = event.type;

                return FactoryEventHandler.createEventHandler(eventType)
                    .trigger(target, event, notSetTarget);
            }
        }

        /**
         * transfer event up
         * @param target
         * @param eventObject
         */
        public emit(target:GameObject, eventObject:Event) {
            var isStopPropagation = false;

            eventObject.phase = EventPhase.EMIT;
            eventObject.target = target;

            do{
                isStopPropagation = this.trigger(target, eventObject.copy(), true);
                if(isStopPropagation){
                    break;
                }
                target = this._getParent(target);
            }while(target);
        }

        /**
         * transfer event down
         * @param target
         * @param eventObject
         */
        public broadcast(target:GameObject, eventObject:Event) {
            var self = this;

            eventObject.phase = EventPhase.BROADCAST;
            eventObject.target = target;

            this.trigger(target, eventObject.copy(), true);

            function iterator(obj:GameObject){
                var children:dyCb.Collection = obj.getChilren();

                if(children.getCount() === 0){
                    return;
                }

                children.forEach((child:GameObject) => {
                    self.trigger(child, eventObject.copy(), true);
                    iterator(child);
                });
            }

            iterator(target);
        }

       private _getParent(target:GameObject):GameObject {
            var parent = target.bubbleParent;

            return parent ? parent : target.parent;
        }
    }
}
