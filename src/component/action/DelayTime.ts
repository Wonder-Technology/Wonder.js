module wd {
    export class DelayTime extends ActionInterval {
        public static create(delayTime:number) {
            var action = new this(delayTime);

            return action;
        }

        constructor(delayTime:number) {
            super();

            this.duration = delayTime;
        }

        public reverse() {
            return this;
        }

        public clone() {
            return DelayTime.create(this.duration);
        }
    }
}

