module wd{
    export class ColliderEngine extends ComponentContainer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        protected list:wdCb.Collection<Collider>;

        private _collisionDetector:CollisionDetector = CollisionDetector.create();

        public update(elapsedTime:number){
            this.list.forEach(function(child:Collider){
                child.update(elapsedTime);
            });
        }

        public detect(elapsed:number){
            this._collisionDetector.update(elapsed);
        }
    }
}

