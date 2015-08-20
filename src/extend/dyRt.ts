/// <reference path="../definitions.d.ts"/>
module dyRt{
    export var fromCollection = (collection:dyCb.Collection<any>, scheduler = Scheduler.create()) =>{
        var arr = collection.toArray();

        return arr.length === 0 ? empty() : fromArray(arr, scheduler);
    };
}
