module wd{
    export class AnimationEngine extends ComponentContainer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        protected list:wdCb.Collection<Animation>;

        public update(elapsed:number){
            this.list.forEach(function(child:Animation){
                child.update(elapsed);
            });
        }
    }
}

