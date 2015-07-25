/// <reference path="../definitions.d.ts"/>
module dyRt{
    export class DoObserver extends Observer{
        public static create(currentObserver:IObserver, prevObserver:IObserver) {
            return new this(currentObserver, prevObserver);
        }

        private _currentObserver:IObserver = null;
        private _prevObserver:IObserver = null;

        constructor(currentObserver:IObserver, prevObserver:IObserver){
            super(null, null, null);

            this._currentObserver = currentObserver;
            this._prevObserver = prevObserver;
        }

        protected onNext(value){
            try{
                this._prevObserver.next(value);
            }
            catch(e){
                this._prevObserver.error(e);
                this._currentObserver.error(e);
            }
            finally{
                this._currentObserver.next(value);
            }
        }

        protected onError(error){
            try{
                this._prevObserver.error(error);
            }
            catch(e){
                this._currentObserver.error(error);
            }
            finally{
                this._currentObserver.error(error);
            }
        }

        protected onCompleted(){
            try{
                this._prevObserver.completed();
            }
            catch(e){
                this._prevObserver.error(e);
                this._currentObserver.error(e);
            }
            finally{
                this._currentObserver.completed();
            }
        }
    }
}
