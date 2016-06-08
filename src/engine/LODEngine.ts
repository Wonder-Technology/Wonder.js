module wd{
    export class LODEngine extends ComponentContainer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        protected list:wdCb.Collection<LOD>;

        public update(elapsedTime:number){
            this.list.forEach(function(child:LOD){
                child.update(elapsedTime);
            });
        }
    }
}

