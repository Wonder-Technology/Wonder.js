/// <reference path="../../filePath.d.ts"/>
module wd {
    export class UIObject extends EntityObject{
        public static create() {
            var obj = new this();

            return obj;
        }

        public name:string = `uiObject${String(this.uid)}`;
        public transform:RectTransform = RectTransform.create(this);
        public uiManager:UIManager = UIManager.create(this);

        protected children:wdCb.Collection<UIObject>;

        protected beforeUpdateChildren(elapsedTime:number){
            this.uiManager.update(elapsedTime);
        }

        //todo addChild:child's ui renderer should be the same as parent
    }
}

