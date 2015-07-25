/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class MapStream extends BaseStream{
        public static create(source:Stream, selector:Function) {
            var obj = new this(source, selector);

            return obj;
        }

        private _source:Stream = null;
        private _selector:Function = null;

        constructor(source:Stream, selector:Function){
            super(null);

            this._source = source;

            this.scheduler = this._source.scheduler;
            //this.scheduler.addWrapTarget(MapObserver.create(selector));
            this._selector = selector;
        }

        public buildStream(observer:IObserver){
            this._source.buildStream(MapObserver.create(observer, this._selector));
        }
        //public subscribe(arg1:Function|Observer|Subject, onError?, onCompleted?):IDisposable {
        //    return this._source.subscribe.apply(this._source, arguments);
        //}
        //
        //public subscribeCore(){
        //    if(this._source instanceof BaseStream){
        //        let baseStream = <BaseStream>this._source;
        //        baseStream.subscribeCore();
        //    }
        //}
    }
}
