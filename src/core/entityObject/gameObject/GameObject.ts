module wd {
    export class GameObject extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public transform:ThreeDTransform;
        public parent:GameObject;

        @cloneAttributeAsBasicType()
        public renderGroup:number = 0;
        @cloneAttributeAsBasicType()
        public renderPriority:number = 0;
        @cloneAttributeAsBasicType()
        public isVisible:boolean = true;

        protected children:wdCb.Collection<GameObject>;

        public initWhenCreate(){
            super.initWhenCreate();

            this.name = `gameObject${String(this.uid)}`;
        }

        protected createTransform(){
            return ThreeDTransform.create();
        }

        protected getRenderList(){
            return RenderUtils.getGameObjectRenderList(this.getChildren());
        }
    }
}

