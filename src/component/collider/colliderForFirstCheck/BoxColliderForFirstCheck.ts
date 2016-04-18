module wd {
    export class BoxColliderForFirstCheck extends ColliderForFirstCheck {
        public static create() {
        	var obj = new this();

        	return obj;
        }


        get shape():Shape{
            return this._collider.shape;
        }

        @cloneAttributeAsCloneable()
        private _collider:BoxCollider = BoxCollider.create();

        public init(){
            this._collider.entityObject = this.entityObject;

            this._collider.init();
        }

        public update(elapsedTime:number){
            this._collider.update(elapsedTime);
        }
    }
}

