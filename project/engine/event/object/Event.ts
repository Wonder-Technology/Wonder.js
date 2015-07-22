/// <reference path="../../definitions.d.ts"/>

//rich domain model

//event info:
//control info(stop bubble...)
//system data(system event, as clientX...)
//event context(target, currentTarget...)
//user data(custom event)
//event type


module Engine3D{
    export class Event{
        constructor(eventType:EventType) {
            this._name = eventType;
        }

        //abstact attri
        public type:EventCategory = null;
        //get type(){
        //    dyCb.Log.error(this._type === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);
        //
        //    return this._type;
        //}

        private _name:EventType = null;
        get name() {
            return this._name;
        }
        set name(name:EventType) {
            this._name = name;
        }

        //target is the actual target that received the event.
        private _target:GameObject = null;
        get target() {
            //dyCb.Log.error(!this._target, dyCb.Log.info.FUNC_MUST_DEFINE("target"));

            return this._target;
            //return this._target;
            //return this._event.srcElement || this._event.target;
        }
        set target(target:GameObject) {
            this._target = target;
        }

        //currentTarget is always the object listening for the event
        private _currentTarget:GameObject = null;
        get currentTarget() {
            return this._currentTarget;
        }
        set currentTarget(currentTarget:GameObject) {
            this._currentTarget = currentTarget;
        }

        private _isStopPropagation:boolean = false;
        get isStopPropagation() {
            return this._isStopPropagation;
        }
        set isStopPropagation(isStopPropagation:boolean) {
            this._isStopPropagation = isStopPropagation;
        }

        private _phase:EventPhase = null;
        get phase() {
            return this._phase;
        }
        set phase(phase:EventPhase) {
            this._phase = phase;
        }

        public copy():Event{
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public stopPropagation() {
            this._isStopPropagation = true;
        }

        protected copyMember(destination:Event, source:Event, memberArr:[any]){
            memberArr.forEach((member) => {
                destination[member] = source[member];
            });

            return destination;
        }
    }
}
