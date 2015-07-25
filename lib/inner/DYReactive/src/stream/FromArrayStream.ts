/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class FromArrayStream extends BaseStream{
        public static create(array:Array<any>, scheduler:Scheduler) {
            var obj = new this(array, scheduler);

            return obj;
        }

        private _array:Array<any> = null;

        constructor(array:Array<any>, scheduler:Scheduler){
            super(null);

            this._array = array;
            this.scheduler = scheduler;
        }

        public subscribeCore(observer:IObserver){
            var array = this._array,
                len = array.length;

            //next,completed is for TestScheduler to inject
            //todo remove inject next,completed?
            function loopRecursive(i, next, completed) {
                if (i < len) {
                    if(next){
                        next(array[i]);
                    }
                    else{
                        observer.next(array[i]);
                    }
                    arguments.callee(i + 1, next, completed);
                } else {
                    if(completed){
                        completed();
                    }
                    else{
                        observer.completed();
                    }
                }
            }

            this.scheduler.publishRecursive(observer, 0, loopRecursive);
        }
    }
}
