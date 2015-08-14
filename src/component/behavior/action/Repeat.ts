/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class Repeat extends Control {
        public static create(action:Action, times:number) {
            var repeat = new this(action, times);

            repeat.initWhenCreate();

            return repeat;
        }

        constructor(action:Action, times:number) {
            super();

            this._innerAction = action;
            this._times = times;
        }

        private _innerAction:Action = null;
        private _originTimes:number = null;
        private _times:number = null;

        public initWhenCreate() {
            this._originTimes = this._times;
        }

        public update(time) {
            if (this._times === 0) {
                this.finish();

                return;
            }
            this._innerAction.update(time);

            if (this._innerAction.isFinish) {
                this._times -= 1;

                if (this._times !== 0) {
                    this._innerAction.reset();
                    this._innerAction.start();

                    return;
                }
                this.finish();
            }
        }

        public copy() {
            return Repeat.create(this._innerAction.copy(), this._times);
        }

        public reset() {
            super.reset();

            this._times = this._originTimes;

            return this;
        }

        public start() {
            super.start();

            this._innerAction.start();
        }

        public stop() {
            super.stop();

            this._innerAction.stop();
        }

        public getInnerActions() {
            return dyCb.Collection.create<Action>([this._innerAction]);
        }
    }
}

