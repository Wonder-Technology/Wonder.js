/// <reference path="Action.ts"/>
/// <reference path="../structure/Collection.ts"/>
module Engine3D{
    export class ActionManager{
        public static create():ActionManager {
            var obj = new this();

            return obj;
        }

        private _childs:Collection = Collection.create();

        constructor(){
        }

        public addChild(action:Action){
            this._childs.addChild(action);
        }

        public update(){
            var self = this,
                removeQueue = [];
            //time = null;

            this._childs.forEach(function(child){
                //修复“如果遍历的动作删除了动作序列中某个动作，则在后面的遍历中会报错”的bug
                if (!child) {
                    return;
                }

                if (child.isFinish) {
                    removeQueue.push(child);
                    return;
                }
                //if (child.isStop()) {
                //    return;
                //}

                //child.update(time);
                child.update();
            });

            removeQueue.forEach(function (child) {
                self._childs.removeChild(child);
            });
        }
    }
}