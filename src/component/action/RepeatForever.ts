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

        @cloneAttributeAsCloneable()
        private _innerAction:Action = null;

        public update(elapsed) {
            this._innerAction.update(elapsed);

            if (this._innerAction.isFinish) {
                this._innerAction.reset();
                this._innerAction.start();
            }
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

