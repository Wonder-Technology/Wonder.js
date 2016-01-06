module wd {
    export class Sequence extends Control{
        public static create(...args) {
            var sequence = null;

            Log.assert(args.length >= 2, "Sequence should has two actions at least");

            sequence = new this(args);

            sequence.initWhenCreate();

            return sequence;
        }

        constructor(actionArr:Array<Action>){
            super();

            this._actions.addChildren(actionArr);
        }

        private _actions:wdCb.Collection<Action> = wdCb.Collection.create<Action>();
        private _currentAction:Action = null;
        private _actionIndex:number = 0;

        public initWhenCreate() {
            this._currentAction = this._actions.getChild(0);
        }

        public update(elapsedTime) {
            if (this._actionIndex === this._actions.getCount()) {
                this.finish();
                return;
            }

            this._currentAction = this._actions.getChild(this._actionIndex);

            if(this._currentAction.isFinish){
                this._startNextActionAndJudgeFinish();

                return;
            }

            this._currentAction.update(elapsedTime);

            if(this._currentAction.isFinish){
                this._startNextActionAndJudgeFinish();
            }

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

            this._currentAction.start();

            return this;
        }

        public stop() {
            super.stop();

            this._currentAction.stop();

            return this;
        }

        public pause() {
            super.pause();

            this._currentAction.pause();

            return this;
        }

        public resume() {
            super.resume();

            this._currentAction.resume();

            return this;
        }

        public reverse() {
            this._actions = this._actions.reverse();

            super.reverse();

            return this;
        }

        public getInnerActions() {
            return this._actions;
        }

        private _startNextActionAndJudgeFinish(){
            this._actionIndex ++;

            if (this._actionIndex === this._actions.getCount()) {
                this.finish();
                return;
            }

            this._actions.getChild(this._actionIndex).start();
        }
    }
}

