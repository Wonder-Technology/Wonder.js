module wd {
    export class Spawn extends Control{
        public static create(...args) {
            var spawn = null;

            Log.assert(args.length >= 2, "Sequence should has two actions at least");

            spawn = new this(args);

            return spawn;
        }

        constructor(actionArr:Array<Action>){
            super();

            this._actions.addChildren(actionArr);
        }

        @cloneAttributeAsCustomType((source:any, target:any, memberName:string, cloneData:any) => {
            target[memberName] = source[memberName].clone(true);
        })
        private _actions:wdCb.Collection<Action> = wdCb.Collection.create<Action>();

        public update(elapsed) {
            if (this._isFinish()) {
                this.finish();
                return;
            }

            this.iterate("update", [elapsed]);

            if (this._isFinish()) {
                this.finish();
            }
        }

        public start() {
            super.start();

            this.iterate("start");

            return this;
        }

        public stop() {
            super.stop();

            this.iterate("stop");

            return this;
        }

        public pause() {
            super.pause();

            this.iterate("pause");

            return this;
        }

        public resume() {
            super.resume();

            this.iterate("resume");

            return this;
        }

        public reset() {
            super.reset();

            this.iterate("reset");

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

        protected iterate(method:string, argArr?:Array<any>) {
            this._actions.forEach((action:Action) => {
                action[method].apply(action, argArr);
            });
        }

        private _isFinish() {
            var isFinish = true;

            this._actions.forEach((action:Action) => {
                if (!action.isFinish) {
                    isFinish = false;
                    return wdCb.$BREAK;
                }
            });

            return isFinish;
        }
    }
}

