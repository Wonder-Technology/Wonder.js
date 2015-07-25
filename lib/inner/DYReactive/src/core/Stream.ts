/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class Stream extends Entity{
        public scheduler:Scheduler = ABSTRACT_ATTRIBUTE;
        public subscribeFunc:Function = null;

        private _disposeHandler:dyCb.Collection = dyCb.Collection.create();
        get disposeHandler(){
            return this._disposeHandler;
        }
        set disposeHandler(disposeHandler:dyCb.Collection){
            this._disposeHandler = disposeHandler;
        }

        constructor(subscribeFunc){
            super("Stream");

            this.subscribeFunc = subscribeFunc || function(){ };
        }

        public subscribe(arg1:Function|Observer|Subject, onError?:Function, onCompleted?:Function):IDisposable {
            throw ABSTRACT_METHOD();
        }

        public buildStream(observer:IObserver){
            this.subscribeFunc(observer);
        }

        public addDisposeHandler(func:Function){
            this._disposeHandler.addChild(func);
        }

        protected handleSubject(arg){
            if(this._isSubject(arg)){
                this._setSubject(arg);
                return true;
            }

            return false;
        }

        public do(onNext?:Function, onError?:Function, onCompleted?:Function) {
            return DoStream.create(this, onNext, onError, onCompleted);
        }

        public map(selector:Function) {
            return MapStream.create(this, selector);
        }

        public flatMap(selector:Function){
            //return FlatMapStream.create(this, selector);
            return this.map(selector).mergeAll();
        }

        public mergeAll(){
            return MergeAllStream.create(this);
        }

        public takeUntil(otherStream:Stream){
            return TakeUntilStream.create(this, otherStream);
        }

        private _isSubject(subject){
            return subject instanceof Subject;
        }

        private _setSubject(subject){
            subject.source = this;
        }
    }
}
