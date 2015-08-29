/// <reference path="../../definitions.d.ts"/>

//rich domain model

//event info:
//control info(stop bubble...)
//system data(system event, as clientX...)
//event context(target, currentTarget...)
//user data(custom event)
//event type


module dy{
    export class Event{
        constructor(eventName:EventName) {
            this.name = eventName;
        }

        get type(){
            dyCb.Log.error(this.innerType === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);

            return this.innerType;
        }

        public name:EventName = null;
        //target is the actual target that received the event.
        public target:GameObject = null;
        //currentTarget is always the object listening for the event
        public currentTarget:GameObject = null;
        public isStopPropagation:boolean = false;
        public phase:EventPhase = null;

        protected innerType:EventType = null;

        public copy():Event{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public stopPropagation() {
            this.isStopPropagation = true;
        }

        protected copyMember(destination:Event, source:Event, memberArr:[any]){
            memberArr.forEach((member) => {
                destination[member] = source[member];
            });

            return destination;
        }
    }
}
