/// <reference path="../definitions.d.ts"/>
module dyRt {
    var defaultIsEqual = function (a, b) {
        return a === b;
    };

    export class Record {
        public static create(time:number, value:any, actionType?:ActionType, comparer?:Function) {
            var obj = new this(time, value, actionType, comparer);

            return obj;
        }

        private _time:number = null;
        get time(){
            return this._time;
        }
        set time(time:number){
            this._time = time;
        }

        private _value:number = null;
        get value(){
            return this._value;
        }
        set value(value:number){
            this._value = value;
        }

        private _actionType:ActionType = null;
        get actionType(){
            return this._actionType;
        }
        set actionType(actionType:ActionType){
            this._actionType = actionType;
        }

        private _comparer:Function = null;

        constructor(time, value, actionType:ActionType, comparer:Function) {
            this._time = time;
            this._value = value;
            this._actionType = actionType;
            this._comparer = comparer || defaultIsEqual;
        }

        equals(other) {
            return this._time === other.time && this._comparer(this._value, other.value);
        }
    }
}
