/// <reference path="../../definitions.d.ts"/>
module dy {
    export class Control extends ActionInterval{
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

        protected startOnce(action:Action){
            if(!action.isStop()){
                return;
            }

            action.start();
        }

        protected stopOnce(action:Action){
            if(!action.isStop()){
                return;
            }

            action.stop();
        }

        protected iterate(method:string, argArr?:Array<any>) {
            var actions = this.getInnerActions(),
                self = this;

            actions.forEach((action) => {
                switch(method) {
                    case "start":
                        self.startOnce(action);
                        break;
                    case "stop":
                        self.stopOnce(action);
                        break;
                    default :
                        action[method].apply(action, argArr);
                        break;
                }
            });
        }
    }
}

