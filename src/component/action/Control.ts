/// <reference path="../../filePath.d.ts"/>
module wd {
    export abstract class Control extends ActionInterval{
        set target(target:GameObject){
            this.p_target = target;

            this.getInnerActions().forEach((action:Action) => {
                action.target = target;
            });
        }

        public abstract getInnerActions();

        public init() {
            super.init();

            this.iterate("init");
        }

        public reverse() {
            this.iterate("reverse");

            return this;
        }

        public reset() {
            super.reset();

            this.iterate("reset");

            return this;
        }

        protected iterate(method:string, argArr?:Array<any>) {
            this.getInnerActions().forEach((action) => {
                action[method].apply(action, argArr);
            });
        }
    }
}

