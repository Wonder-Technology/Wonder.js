module wd {
    export class UIManager extends ComponentContainer{
        public static create(uiObject:UIObject) {
            var obj = new this(uiObject);

            return obj;
        }

        constructor(uiObject:UIObject){
            super();

            this._uiObject = uiObject;
        }

        private _uiObject:UIObject = null;

        public update(elapsedTime:number){
            //todo remove list
            //todo assert:must has UI component

            if(this.list.getCount() === 0){
                return;
            }

            if(this._isMarkedDirty()) {
                this.list.forEach((ui:UI) => {
                    ui.update(elapsedTime);
                });
            }
        }

        private _isMarkedDirty() {
            var uiObject:EntityObject = this._uiObject,
                isDirty = null,
                result = false;

            do{
                isDirty = uiObject.hasTag(<any>UITag.DIRTY);

                if(isDirty){
                    result = true;
                    break;
                }

                uiObject = uiObject.parent;
            }while(uiObject);

            return result;
        }
    }
}

