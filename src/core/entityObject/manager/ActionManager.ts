module wd{
    export class ActionManager extends ComponentContainer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
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

            for (let child of removeQueue){
                child.entityObject.removeComponent(child);
            }
        }
    }
}