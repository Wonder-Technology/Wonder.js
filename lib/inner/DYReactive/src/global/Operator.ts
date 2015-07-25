/// <reference path="../definitions.d.ts"/>
module dyRt{
    export var createStream = function(subscribeFunc) {
        return AnonymousStream.create(subscribeFunc);
    };

    export var fromArray = function(array:Array<any>, scheduler = Scheduler.create()){
        return FromArrayStream.create(array, scheduler);
    };

    export var fromPromise = function(promise:any, scheduler = Scheduler.create()){
        return FromPromiseStream.create(promise, scheduler);
    };

    export var fromEventPattern = function(addHandler:Function, removeHandler:Function){
        return FromEventPatternStream.create(addHandler, removeHandler);
    };

    export var interval = function (interval, scheduler = Scheduler.create()) {
        return IntervalStream.create(interval, scheduler);
    };
}

