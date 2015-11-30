/// <reference path="../../filePath.d.ts"/>

module wd{
    export abstract class Event{
        constructor(eventName:EventName) {
            this.name = eventName;
        }


        protected p_type:EventType = null;
        get type(){
            Log.error(this.p_type === null, Log.info.ABSTRACT_ATTRIBUTE);

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
