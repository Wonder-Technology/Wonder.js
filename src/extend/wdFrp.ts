module wdFrp{
    export var fromCollection = (collection:wdCb.Collection<any>, scheduler = Scheduler.create()) =>{
        var arr = collection.toArray();

        return arr.length === 0 ? empty() : fromArray(arr, scheduler);
    };
}
