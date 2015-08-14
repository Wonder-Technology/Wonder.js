/// <reference path="../../definitions.d.ts"/>
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
        //private _firstTick:boolean = true;

        public reverse() {
            return this;
        }

        public update(time) {
            if (time < this._startTime) {
                return;
            }

            //if (this._firstTick) {
            //    this._firstTick = false;
            //    this._elapsed = 0;
            //
            //    //return YE.returnForTest;
            //    return null;
            //}

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

        //public reset(){
        //    super.reset();
        //
        //
        //}

        public copy() {
            return DelayTime.create(this._delayTime);
        }
    }
}

