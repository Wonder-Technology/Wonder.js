/// <reference path="../../filePath.d.ts"/>
module wd {
    export class UIManager extends ComponentContainer{
        public static create(gameObject:GameObject) {
            var obj = new this(gameObject);

            return obj;
        }

        constructor(gameObject:GameObject){
            super();

            this._gameObject = gameObject;
        }

        protected list:wdCb.Collection<UI>;

        private _gameObject:GameObject = null;
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

            uiRenderer = this._getUIRenderer(this._gameObject);

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
            assert(this._gameObject._getComponentCount(UIRenderer) <= 1, Log.info.FUNC_SHOULD_NOT("gameObject", "contain more than 1 uiRenderer component"));
        })
        private _getUIRenderer(gameObject:GameObject):UIRenderer{
            return gameObject.getComponent<UIRenderer>(UIRenderer);
        }

        private _isSearchedToFindIfDirty(){
            return this._gameObject.hasTag(this._dirtyTag) || this._gameObject.hasTag(this._notDirtyTag);
        }

        private _isMarkedDirty(){
            return this._gameObject.hasTag(this._dirtyTag);
        }

        private _removeAllMark(){
            this._gameObject.removeTag(this._dirtyTag);
            this._gameObject.removeTag(this._notDirtyTag);
        }

        private _markAllUIChildrenWithSameUIRenderer(uiRenderer:UIRenderer, isDirty:boolean){
            var tag = isDirty ? this._dirtyTag : this._notDirtyTag,
                self = this,
                mark = (gameObject:GameObject) => {
                    if(!gameObject.hasTag(tag)){
                        gameObject.addTag(tag);
                    }

                    gameObject
                        .filter((child:GameObject) => {
                            return child.hasComponent(UI) && self._hasSameUIRenderer(uiRenderer, self._getUIRenderer(child));
                        })
                        .forEach((child:GameObject) => {
                            mark(child);
                        });
                }

            this._gameObject
                .filter((child:GameObject) => {
                    return child.hasComponent(UI) && self._hasSameUIRenderer(uiRenderer, self._getUIRenderer(child));
                })
                .forEach((child:GameObject) => {
                    mark(child);
                });
        }

        private _searchAnyOneDirtyOfAllUIWithSameUIRenderer(uiRenderer:UIRenderer){
            var isDirty = false,
                isEnd = false,
                self = this;

            var search = (gameObject:GameObject) => {
                if(self._hasSameUIRenderer(uiRenderer, self._getUIRenderer(gameObject))){
                    gameObject.forEachComponent((component:Component) => {
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

                gameObject
                    .filter((child:GameObject) => {
                        return child.hasComponent(UI);
                    })
                    .forEach((child:GameObject) => {
                        search(child);

                        if(isEnd){
                            return wdCb.$BREAK;
                        }
                    })
            }

            search(this._gameObject);

            return isDirty;
        }

        private _hasSameUIRenderer(uiRenderer1:UIRenderer, uiRenderer2:UIRenderer){
            return JudgeUtils.isEqual(uiRenderer1, uiRenderer2);
        }
    }
}

