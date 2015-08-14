/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class ActionInterval extends Action{
        private _isStop:boolean = true;

        get isStop() {
            return this._isStop;
        }

        public start() {
            this._isStop = false;
        }

        public reset() {
            super.reset();

            this._isStop = true;
        }

        public stop() {
            this._isStop = true;
        }
    }
}

