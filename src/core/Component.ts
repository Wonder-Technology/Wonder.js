module wd{
    export abstract class Component extends Entity{
        public entityObject:EntityObject = null;

        @virtual
        public init(){
        }

        @virtual
        public dispose(){
        }

        @virtual
        public clone(...datas):any{
            return CloneUtils.clone(this);
        }

        public get transform():Transform {
            if(!this.entityObject) {
                return null;
            }

            return this.entityObject.transform;
        }

        //todo test
        @virtual
        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            if(isShareComponent){
                return;
            }

            if(this.entityObject) {
                this.entityObject.removeComponent(this);
            }
            this.entityObject = entityObject;
        }

        @virtual
        public removeFromObject(entityObject:EntityObject){
        }
    }
}
