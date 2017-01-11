module wd{
    @singleton()
    export class SpacePartitionComponentContainer extends ComponentContainer{
        public static getInstance():any {}

		private constructor(){super();}

        protected list:wdCb.Collection<SpacePartition>;

        public update(elapsed:number){
            this.list.forEach(function(child:SpacePartition){
                child.update(elapsed);
            });
        }
    }
}

