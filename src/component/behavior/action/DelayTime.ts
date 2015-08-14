/// <reference path="../../../definitions.d.ts"/>
module dy {
    declare var window;

    export class DelayTime extends ActionInterval {
        public static create(delayTime:number) {
            var action = new this(delayTime);

            return action;
        }

        constructor(delayTime:number) {
            super();

            this._delayTime = delayTime;
        }

        private _delayTime:number = null;
        private _elapsed:number = null;
        private _startTime:number = null;

        public reverse() {
            return this;
        }

        public update(time) {
            if (time < this._startTime) {
                return;
            }

            this._elapsed  = time - this._startTime;

            if (this._elapsed >= this._delayTime) {
                this.finish();
            }
        }

        public start(){
            super.start();

            this._startTime = window.performance.now();

            return this;
        }

        public copy() {
            return DelayTime.create(this._delayTime);
        }
    }
}

