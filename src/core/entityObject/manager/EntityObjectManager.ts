module wd{
    export class EntityObjectManager{
        public static create(entityObject:EntityObject) {
            var obj = new this(entityObject);

            return obj;
        }

        constructor(entityObject:EntityObject){
            this._entityObject = entityObject;
        }

        private _entityObject:EntityObject = null;
        private _children:wdCb.Collection<any> = wdCb.Collection.create<any>();

        public init(){
            this.forEach((child:EntityObject) => {
                child.init();
            });
        }

        public dispose(){
            this.forEach((child:EntityObject) => {
                child.dispose();
            });
        }

        public hasChild(child:EntityObject):boolean {
            return this._children.hasChild(child);
        }

        public addChild(child:EntityObject){
            if (child.parent) {
                child.parent.removeChild(child);
            }

            child.parent = this._entityObject;

            this._children.addChild(child);

            /*!
             no need to sort!
             because WebGLRenderer enable depth test, it will sort when needed(just as WebGLRenderer->renderSortedTransparentCommands sort the commands)
             */

            child.onEnter();

            return this;
        }

        public addChildren(children:EntityObject);
        public addChildren(children:Array<EntityObject>);
        public addChildren(children:wdCb.Collection<EntityObject>);

        public addChildren(...args) {
            if(JudgeUtils.isArray(args[0])){
                let children:Array<EntityObject> = args[0];

                for (let child of children){
                    this.addChild(child);
                }
            }
            else if(JudgeUtils.isCollection(args[0])){
                let children:wdCb.Collection<EntityObject> = args[0];

                children.forEach((child:EntityObject) => {
                    this.addChild(child);
                });
            }
            else{
                this.addChild(args[0]);
            }

            return this;
        }

        public forEach(func:(entityObject:EntityObject, index:number) => void){
            this._children.forEach(func);

            return this;
        }

        public filter(func:(entityObject:EntityObject) => boolean){
            return this._children.filter(func);
        }

        public sort(func:(a:EntityObject, b:EntityObject) => any, isSortSelf = false){
            return this._children.sort(func, isSortSelf);
        }

        public getChildren(){
            return this._children;
        }

        public getAllChildren(){
            var result = wdCb.Collection.create<EntityObject>();
            var getChildren = (entityObject:EntityObject) => {
                result.addChildren(entityObject.getChildren());

                entityObject.forEach((child:EntityObject) => {
                    getChildren(child);
                });
            }

            getChildren(this._entityObject);

            return result;
        }

        public getChild(index:number){
            return this._children.getChild(index);
        }

        public findChildByUid(uid:number){
            return this._children.findOne((child:EntityObject) => {
                return child.uid === uid;
            });
        }

        public findChildByTag(tag:string){
            return this._children.findOne((child:EntityObject) => {
                return child.hasTag(tag);
            });
        }

        public findChildByName(name:string){
            return this._children.findOne((child:EntityObject) => {
                return child.name.search(name) > -1;
            });
        }

        public findChildrenByName(name:string):wdCb.Collection<EntityObject>{
            return this._children.filter((child:EntityObject) => {
                return child.name.search(name) > -1;
            });
        }

        public removeChild(child:EntityObject){
            child.onExit();

            this._children.removeChild(child);

            child.parent = null;

            return this;
        }

        public removeAllChildren(){
            this._children.forEach((child:EntityObject) => {
                this.removeChild(child);
            }, this);
        }
    }
}
