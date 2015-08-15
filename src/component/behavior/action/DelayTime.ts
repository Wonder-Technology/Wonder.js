/// <reference path="../../../definitions.d.ts"/>
module dy {
    declare var window;

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

        public copy() {
            return DelayTime.create(this.duration);
        }

    }
}

