module wd{
    export abstract class Component extends Entity{
        public entityObject:EntityObject = null;

        @virtual
        public init(){
        }

        @virtual
        public dispose(){
        }

        //todo to be abstract method
        //public abstract copy():Component;
        @virtual
        public copy():Component{
            Log.error(true, Log.info.FUNC_SHOULD("implement copy method"));

            return null;
        }

        public get transform():Transform {
            if(!this.entityObject) {
                return null;
            }

            return this.entityObject.transform;
        }

        public addToObject(entityObject:EntityObject){
            if(this.entityObject) {
                this.entityObject.removeComponent(this);
            }
            this.entityObject = entityObject;
        }

        public removeFromObject(entityObject:EntityObject){
            this.entityObject = null;
        }
    }
}
