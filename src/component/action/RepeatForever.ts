/// <reference path="../../filePath.d.ts"/>
module wd {
    export class RepeatForever extends Control {
        public static create(action:Action) {
            var repeat = new this(action);

            return repeat;
        }

        constructor(action:Action) {
            super();

            this._innerAction = action;
        }

        private _innerAction:Action = null;

        public update(elapsedTime) {
            this._innerAction.update(elapsedTime);

            if (this._innerAction.isFinish) {
                this._innerAction.reset();
                this._innerAction.start();
            }
        }

        public copy() {
            return RepeatForever.create(this._innerAction.copy());
        }

        public start() {
            super.start();

            this._innerAction.start();
        }

        public stop() {
            super.stop();

            this._innerAction.stop();
        }

        public pause() {
            super.pause();

            this._innerAction.pause();
        }

        public resume() {
            super.resume();

            this._innerAction.resume();
        }

        public getInnerActions() {
            return wdCb.Collection.create<Action>([this._innerAction]);
        }
    }
}

