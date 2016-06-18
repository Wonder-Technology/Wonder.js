module wd {
    export class DelayTime extends ActionInterval {
        public static create(delayTime:number) {
            var action = new this(delayTime);

            return action;
        }

        protected duration:number;

        constructor(delayTime:number) {
            super();

            this.duration = delayTime;
        }

        public clone():Action{
            return CloneUtils.clone(this, null, [this.duration]);
        }

        public reverse() {
            return this;
        }
    }
}

