/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class MockPromise{
        public static create(scheduler:TestScheduler, messages:[Record]) {
            var obj = new this(scheduler, messages);

            return obj;
        }

        private _messages:[Record] = <[Record]>[];
        //get messages(){
        //    return this._messages;
        //}
        //set messages(messages:[Record]){
        //    this._messages = messages;
        //}

        private _scheduler:TestScheduler = null;

        constructor(scheduler:TestScheduler, messages:[Record]){
            this._scheduler = scheduler;
            this._messages = messages;
        }

        public then(successCb:Function, errorCb:Function, observer:IObserver){
            //var scheduler = <TestScheduler>(this.scheduler);

            this._scheduler.setStreamMap(observer, this._messages);
        }
    }
}
