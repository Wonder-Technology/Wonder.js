module wd{
    export abstract class Event{
        protected constructor(eventName:EEventName) {
            this.name = eventName;
        }

        protected abstract p_type:EEventType;
        get type(){
            return this.p_type;
        }

        public name:EEventName = null;
        //target is the actual target that received the event.
        public target:HTMLElement|EntityObject;
        //currentTarget is always the object listening for the event
        public currentTarget:HTMLElement|EntityObject = null;
        public isStopPropagation:boolean = false;
        public phase:EEventPhase = null;

        public abstract clone();

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
