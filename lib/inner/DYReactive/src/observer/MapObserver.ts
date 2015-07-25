/// <reference path="../definitions.d.ts"/>
module dyRt {
    export class MapObserver extends Observer {
        public static create(currentObserver:IObserver, selector:Function) {
            return new this(currentObserver, selector);
        }

        private _currentObserver:IObserver = null;
        private _selector:Function = null;

        constructor(currentObserver:IObserver, selector:Function) {
            super(null, null, null);

            this._currentObserver = currentObserver;
            this._selector = selector;
        }

        protected onNext(value) {
            var result = null;

            try {
                result = this._selector(value);
            }
            catch (e) {
                this._currentObserver.error(e);
            }
            finally {
                this._currentObserver.next(result);
            }
        }

        protected onError(error) {
            this._currentObserver.error(error);
        }

        protected onCompleted() {
            this._currentObserver.completed();
        }
    }
}
