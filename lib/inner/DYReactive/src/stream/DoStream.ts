/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class DoStream extends BaseStream{
        public static create(source:Stream, onNext?:Function, onError?:Function, onCompleted?:Function) {
            var obj = new this(source, onNext, onError, onCompleted);

            return obj;
        }

        private _source:Stream = null;
        private _observer:Observer = null;

        constructor(source:Stream, onNext:Function, onError:Function, onCompleted:Function){
            super(null);

            this._source = source;
            this._observer = AnonymousObserver.create(onNext, onError,onCompleted);

            this.scheduler = this._source.scheduler;
        }

        public buildStream(observer:IObserver){
            this._source.buildStream(DoObserver.create(observer, this._observer));
        }
    }
}

