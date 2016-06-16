module wd{
    @singleton()
    export class LODEngine extends ComponentContainer{
        public static getInstance():any {}

        protected list:wdCb.Collection<LOD>;

        public update(elapsed:number){
            this.list.forEach(function(child:LOD){
                child.update(elapsed);
            });
        }
    }
}

