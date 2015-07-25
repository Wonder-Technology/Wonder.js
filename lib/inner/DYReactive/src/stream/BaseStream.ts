/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class BaseStream extends Stream{
        public subscribeCore(observer:IObserver){
            throw ABSTRACT_METHOD();
        }

        public subscribe(arg1:Function|Observer|Subject, onError?, onCompleted?):IDisposable {
            var observer = null;

            if(this.handleSubject(arg1)){
                return;
            }

            observer = arg1 instanceof Observer
                ? arg1
                : AutoDetachObserver.create(<Function>arg1, onError, onCompleted);

            observer.setDisposeHandler(this.disposeHandler);

            //todo encapsulate it to scheduleItem
            //todo delete target?
            //this.scheduler.target = observer;

            //dyCb.Log.error(this._hasMultiObservers(), "should use Subject to handle multi observers");
            this.buildStream(observer);

            return observer;
        }

        public buildStream(observer:IObserver){
            super.buildStream(observer);

            this.subscribeCore(observer);
        }

        //private _hasMultiObservers(){
        //    return this.scheduler.getObservers() > 1;
        //}
    }
}

