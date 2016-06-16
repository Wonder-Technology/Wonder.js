module wd{
    @singleton()
    export class CollisionEngine extends ComponentContainer{
        public static getInstance():any {}

        protected list:wdCb.Collection<Collider>;

        private _collisionDetector:CollisionDetector = CollisionDetector.create();

        public update(elapsed:number){
            this.list.forEach(function(child:Collider){
                child.update(elapsed);
            });
        }

        public detect(elapsed:number){
            this._collisionDetector.update(elapsed);
        }
    }
}

