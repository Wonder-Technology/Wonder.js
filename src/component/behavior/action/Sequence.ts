/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class Sequence extends Control{
        public static create(...actions) {
            var actionArr = null,
                sequence = null;

            dyCb.Log.assert(arguments.length >= 2, "应该有2个及以上动作");

            actionArr = Array.prototype.slice.call(arguments, 0);

            sequence = new this(actionArr);

            sequence.initWhenCreate();

            return sequence;
        }

        constructor(actionArr:Array<Action>){
            super();

            this._actions.addChildren(actionArr);
        }

        private _actions:dyCb.Collection<Action> = dyCb.Collection.create<Action>();
        private _currentAction:Action = null;
        private _actionIndex:number = 0;

        public initWhenCreate() {
            this._currentAction = this._actions.getChild(0);
        }

        public update(time) {
            if (this._actionIndex === this._actions.getCount()) {
                this.finish();
                return;
            }

            this._currentAction = this._actions.getChild(this._actionIndex);

            if(this._currentAction.isFinish){
                this._actionIndex += 1;
                this.update(time);

                return;
            }

            this.startOnce(this._currentAction);

            this._currentAction.update(time);

            //return YE.returnForTest;
            return null;
        }

        public copy() {
            var actionArr = [];

            this._actions.forEach(function (action) {
                actionArr.push(action.copy());
            });

            return Sequence.create.apply(Sequence, actionArr);
        }

        public reset() {
            super.reset();

            this._actionIndex = 0;
            this._currentAction = this._actions.getChild(this._actionIndex);

            return this;
        }

        public start() {
            super.start();

            this.startOnce(this._currentAction);

            return this;
        }

        public stop() {
            super.stop();

            this.stopOnce(this._currentAction);

            return this;
        }

        public reverse() {
            this._actions.reverse();

            super.reverse();

            return this;
        }

        public getInnerActions() {
            return this._actions;
        }
    }
}

