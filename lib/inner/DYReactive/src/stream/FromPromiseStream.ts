/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class FromPromiseStream extends BaseStream{
        public static create(promise:any, scheduler:Scheduler) {
        	var obj = new this(promise, scheduler);

        	return obj;
        }

        private _promise:any = null;

        constructor(promise:any, scheduler:Scheduler){
            super(null);

            this._promise = promise;
            this.scheduler = scheduler;
        }

        public subscribeCore(observer:IObserver){
            //todo remove test logic from product logic(as Scheduler->publicxxx, FromPromise->then...)
            this._promise.then(function (data) {
                observer.next(data);
                observer.completed();
            }, function (err) {
                observer.error(err);
            }, observer);
        }
    }
}
