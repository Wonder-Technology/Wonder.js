module wd{
    export class RigidBodyEngine extends ComponentContainer{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }

            return this._instance;
        }

        protected list:wdCb.Collection<RigidBody>;

        public initBody(){
            this.list.forEach(function(child:RigidBody){
                child.initBody();
            });
        }

        public initConstraint(){
            this.list.forEach(function(child:RigidBody){
                child.initConstraint();
            });
        }
    }
}

