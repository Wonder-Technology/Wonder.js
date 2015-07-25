/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class IntervalStream extends BaseStream{
        public static create(interval:number, scheduler:Scheduler) {
            var obj = new this(interval, scheduler);

            obj.initWhenCreate();

            return obj;
        }

        private _interval:number = null;

        constructor(interval:number, scheduler:Scheduler){
            super(null);

            this._interval = interval;
            this.scheduler = scheduler;
        }

        public initWhenCreate(){
            this._interval = this._interval <= 0 ? 1 : this._interval;
        }

        public subscribeCore(observer:IObserver){
            var self = this,
                id = null;

            id = this.scheduler.publishInterval(observer, 0, this._interval, function(count) {
                //self.scheduler.next(count);
                observer.next(count);

                return count + 1;
            });

            this.addDisposeHandler(function(){
                root.clearInterval(id);
            });
        }
    }
}
