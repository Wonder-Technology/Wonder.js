module wd{
    @singleton()
    export class ActionEngine extends ComponentContainer{
        public static getInstance():any {}

        protected list:wdCb.Collection<Action>;

        public update(elapsed:number){
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

                child.update(elapsed);
            });

            for (let child of removeQueue){
                child.entityObject.removeComponent(child);
            }
        }
    }
}