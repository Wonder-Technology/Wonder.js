module wd{
    export abstract class Event{
        constructor(eventName:EventName) {
            this.name = eventName;
        }


        protected p_type:EEventType = null;
        get type(){
            Log.error(this.p_type === null, Log.info.ABSTRACT_ATTRIBUTE);

            return this.p_type;
        }

        public name:EventName = null;
        //target is the actual target that received the event.
        public target:HTMLElement|EntityObject;
        //currentTarget is always the object listening for the event
        public currentTarget:HTMLElement|EntityObject = null;
        public isStopPropagation:boolean = false;
        public phase:EEventPhase = null;

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
