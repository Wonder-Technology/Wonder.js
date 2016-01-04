/// <reference path="../../filePath.d.ts"/>
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
        private _dirtyTag:string = "uiDirty";
        private _notDirtyTag:string = "uiNotDirty";

        public update(elapsedTime:number){
            var uiRenderer = null;

            if(this.list.getCount() === 0){
                return;
            }

            if(this._isSearchedToFindIfDirty()) {
                if (this._isMarkedDirty()) {
                    this.list.forEach((ui:UI) => {
                        ui.update(elapsedTime);
                    });
                }

                this._removeAllMark();

                return;
            }

            uiRenderer = this._getUIRenderer(this._uiObject);

            if(this._searchAnyOneDirtyOfAllUIWithSameUIRenderer(uiRenderer)){
                //todo remove isClear?
                if(uiRenderer && !uiRenderer.isClear){
                    uiRenderer.clearCanvas();
                }

                this.list.forEach((ui:UI) => {
                    ui.update(elapsedTime);
                });

                this._markAllUIChildrenWithSameUIRenderer(uiRenderer, true);
            }
            else{
                this._markAllUIChildrenWithSameUIRenderer(uiRenderer, false);
            }
        }

        @require(function(){
            assert(this._uiObject._getComponentCount(UIRenderer) <= 1, Log.info.FUNC_SHOULD_NOT("uiObject", "contain more than 1 uiRenderer component"));
        })
        private _getUIRenderer(uiObject:UIObject):UIRenderer{
            return uiObject.getComponent<UIRenderer>(UIRenderer);
        }

        private _isSearchedToFindIfDirty(){
            return this._uiObject.hasTag(this._dirtyTag) || this._uiObject.hasTag(this._notDirtyTag);
        }

        private _isMarkedDirty(){
            return this._uiObject.hasTag(this._dirtyTag);
        }

        private _removeAllMark(){
            this._uiObject.removeTag(this._dirtyTag);
            this._uiObject.removeTag(this._notDirtyTag);
        }

        private _markAllUIChildrenWithSameUIRenderer(uiRenderer:UIRenderer, isDirty:boolean){
            var tag = isDirty ? this._dirtyTag : this._notDirtyTag,
                self = this,
                mark = (uiObject:UIObject) => {
                    if(!uiObject.hasTag(tag)){
                        uiObject.addTag(tag);
                    }

                    uiObject
                        .filter((child:UIObject) => {
                            return child.hasComponent(UI) && self._hasSameUIRenderer(uiRenderer, self._getUIRenderer(child));
                        })
                        .forEach((child:UIObject) => {
                            mark(child);
                        });
                }

            this._uiObject
                .filter((child:UIObject) => {
                    return child.hasComponent(UI) && self._hasSameUIRenderer(uiRenderer, self._getUIRenderer(child));
                })
                .forEach((child:UIObject) => {
                    mark(child);
                });
        }

        private _searchAnyOneDirtyOfAllUIWithSameUIRenderer(uiRenderer:UIRenderer){
            var isDirty = false,
                isEnd = false,
                self = this;

            var search = (uiObject:UIObject) => {
                if(self._hasSameUIRenderer(uiRenderer, self._getUIRenderer(uiObject))){
                    uiObject.forEachComponent((component:Component) => {
                        if(component instanceof UI && component.dirty){
                            isEnd = true;
                            isDirty = true;
                            return wdCb.$BREAK;
                        }
                    });

                    if(isEnd){
                        return;
                    }
                }

                uiObject
                    .filter((child:UIObject) => {
                        return child.hasComponent(UI);
                    })
                    .forEach((child:UIObject) => {
                        search(child);

                        if(isEnd){
                            return wdCb.$BREAK;
                        }
                    })
            }

            search(this._uiObject);

            return isDirty;
        }

        private _hasSameUIRenderer(uiRenderer1:UIRenderer, uiRenderer2:UIRenderer){
            return JudgeUtils.isEqual(uiRenderer1, uiRenderer2);
        }
    }
}

