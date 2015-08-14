/// <reference path="../../definitions.d.ts"/>
module dy {
    export class RepeatForever extends Control {
        public static create(action:Action) {
            var repeat = new this(action);

            return repeat;
        }

        constructor(action:Action) {
            super();

            this._innerAction = action;
        }

        get isFinish() {
            return false;
        }

        private _innerAction:Action = null;

        public update(time) {
            this._innerAction.update(time);

            if (this._innerAction.isFinish) {
                this._innerAction.reset();
                this._innerAction.start();
            }
        }

        public copy() {
            return RepeatForever.create(this._innerAction.copy());
        }

        public getInnerActions() {
            return dyCb.Collection.create<Action>([this._innerAction]);
        }
    }
}

