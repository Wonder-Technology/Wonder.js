/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class ActionInterval extends Action{
        private _isStop:boolean = true;

        public start() {
            this._isStop = false;
        }

        public reset() {
            super.reset();

            this._isStop = true;
            //this.stop();
            //this.start();
        }

        public stop() {
            this._isStop = true;
        }

        //todo attri
        public isStop() {
            return this._isStop;
        }
    }
}

