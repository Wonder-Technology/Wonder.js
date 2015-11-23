/// <reference path="../../filePath.d.ts"/>
module dy{
    export class ActionManager{
        public static create():ActionManager {
            var obj = new this();

            return obj;
        }

        private _children:dyCb.Collection<Action> = dyCb.Collection.create<Action>();

        public addChild(action:Action){
            if(this.hasChild(action)){
                return;
            }

            this._children.addChild(action);
        }

        public removeChild(action:Action){
            this._children.removeChild(action);
        }

        public hasChild(action:Action){
            return this._children.hasChild(action);
        }

        public update(time:number){
            var self = this,
                removeQueue = [];

            this._children.forEach(function(child){
                //修复“如果遍历的动作删除了动作序列中某个动作，则在后面的遍历中会报错”的bug
                if (!child) {
                    return;
                }

                if (child.isFinish) {
                    removeQueue.push(child);
                    return;
                }

                if (child.isStop || child.isPause) {
                    return;
                }

                child.update(time);
            });

            removeQueue.forEach(function (child) {
                self._children.removeChild(child);
            });
        }
    }
}