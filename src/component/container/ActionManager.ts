/// <reference path="../../filePath.d.ts"/>
module wd{
    export class ActionManager extends ComponentContainer{
        public static create():ActionManager {
            var obj = new this();

            return obj;
        }

        protected list:wdCb.Collection<Action>;

        public update(elapsedTime:number){
            var removeQueue = [];

            this.list.forEach(function(child:Action){
                /*!
                 fix "if remove other action of children when invoke 'child.update', it will error in iteration after":
                 defer to remove
                 */
                if (child.isFinish) {
                    removeQueue.push(child);
                    return;
                }

                if (child.isStop || child.isPause) {
                    return;
                }

                child.update(elapsedTime);
            });

            removeQueue.forEach(function (child:Action) {
                child.entityObject.removeComponent(child);
            });
        }
    }
}