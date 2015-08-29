/// <reference path="../../../definitions.d.ts"/>
module dy {
    export class Control extends ActionInterval{
        set target(target:GameObject){
            this.target = target;

            this.getInnerActions().forEach((action:Action) => {
                action.target = target;
            });
        }

        public init() {
            this.iterate("init");
        }
        //public onEnter() {
        //    this.iterate("onEnter");
        //}
        //public onExit() {
        //    this.iterate("onExit");
        //}

        public reverse() {
            this.iterate("reverse");

            return this;
        }

        public reset() {
            super.reset();

            this.iterate("reset");

            return this;
        }

        public getInnerActions():dyCb.Collection<Action> {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        protected iterate(method:string, argArr?:Array<any>) {
            this.getInnerActions().forEach((action) => {
                action[method].apply(action, argArr);
            });
        }
    }
}

