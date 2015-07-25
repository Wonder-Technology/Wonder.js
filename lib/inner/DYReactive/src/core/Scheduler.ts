/// <reference path="../definitions.d.ts"/>
module dyRt {
    export class Scheduler{
        public static create() {
            var obj = new this();

            return obj;
        }

        public publishRecursive(observer:IObserver, initial:any, action:Function){
            action(initial);
        }

        public publishInterval(observer:IObserver, initial:any, interval:number, action:Function):number{
            return root.setInterval(function(){
                initial = action(initial);
            }, interval)
        }
    }
}
