module wd{
    export class SpacePartitionEngine extends ComponentContainer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        protected list:wdCb.Collection<SpacePartition>;

        public update(elapsedTime:number){
            this.list.forEach(function(child:SpacePartition){
                child.update(elapsedTime);
            });
        }
    }
}

