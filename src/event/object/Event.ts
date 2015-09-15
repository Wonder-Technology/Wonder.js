/// <reference path="../../definitions.d.ts"/>

//rich domain model

//event info:
//control info(stop bubble...)
//system data(system event, as clientX...)
//event context(target, currentTarget...)
//user data(custom event)
//event type


module dy{
    export abstract class Event{
        constructor(eventName:EventName) {
            this.name = eventName;
        }


        protected p_type:EventType = null;
        get type(){
            dyCb.Log.error(this.p_type === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);

            return this.p_type;
        }

        public name:EventName = null;
        //target is the actual target that received the event.
        public target:GameObject = null;
        //currentTarget is always the object listening for the event
        public currentTarget:GameObject = null;
        public isStopPropagation:boolean = false;
        public phase:EventPhase = null;

        public abstract copy();

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
