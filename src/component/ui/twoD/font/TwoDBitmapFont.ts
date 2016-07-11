module wd {
    //todo support yAlign
    //todo support rotate BitmapFont.entityObject(it should rotate all its CharFont UIObject around pivot)(refer to Button->text, should setChildrenTransform when init)
    export class TwoDBitmapFont extends TwoDFont{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _text:string = "";
        @cloneAttributeAsBasicType()
        get text(){
            return this._text;
        }
        set text(text:string){
            if(this._text !== text){
                this._text = text;

                this.dirty = true;
                this.needFormat = true;
            }
        }

        private _xAlignment:EFontXAlignment = EFontXAlignment.LEFT;
        @cloneAttributeAsBasicType()
        get xAlignment(){
            return this._xAlignment;
        }
        set xAlignment(xAlignment:EFontXAlignment){
            if(this._xAlignment !== xAlignment){
                this._xAlignment = xAlignment;

                this.dirty = true;
                this.needFormat = true;
            }
        }

        @cloneAttributeAsBasicType()
        public fntId:string = null;
        @cloneAttributeAsBasicType()
        public bitmapId:string = null;

        private _charFontList:wdCb.Collection<UIObject> = wdCb.Collection.create<UIObject>();
        private _layout:BitmapFontLayout = BitmapFontLayout.create();

        public init(){
            var imageAsset:ImageTextureAsset = this._getImageAsset();

            if(!imageAsset){
                Log.log("impossible to create font: not find bitmap file");

                return false;
            }

            super.init();

            let layoutDataList:wdCb.Collection<LayoutCharData> = this._layout.getLayoutData(this.text, this.fntId, {
                width:this.width,
                align: this.xAlignment
            });

            if(layoutDataList){
                this._createAndAddFontCharUIObjects(layoutDataList, imageAsset);
            }
        }

        public dispose(){
            super.dispose();

            this._removeAllCharFont();
        }

        protected reFormat(){
            var imageAsset:ImageTextureAsset = this._getImageAsset();

            this._removeAllCharFont();

            if(!imageAsset){
                Log.log("impossible to create font: not find bitmap file");

                return false;
            }

            let layoutDataList:wdCb.Collection<LayoutCharData> = this._layout.getLayoutData(this.text, this.fntId, {
                width:this.width,
                align: this.xAlignment
            });

            if(layoutDataList){
                this._createAndAddFontCharUIObjects(layoutDataList, imageAsset);
            }
        }

        private _getImageAsset(){
            return LoaderManager.getInstance().get(this.bitmapId);
        }

        private _createAndAddFontCharUIObjects(layoutDataList:wdCb.Collection<LayoutCharData>, imageAsset:ImageTextureAsset) {
            var image = imageAsset.source,
                uiRenderer = this.getUIRenderer(),
                text = this.text,
                position = this.getLeftCornerPosition();

            layoutDataList.forEach((layoutData:LayoutCharData) => {
                var glyphData:FntCharData = layoutData.data,
                    rect = RectRegion.create(glyphData.rect.x, glyphData.rect.y, glyphData.rect.width, glyphData.rect.height),
                    {
                        charFontUIObject,
                        charFont
                        } = this._createCharFont(layoutData.index, uiRenderer),
                    transform:RectTransform = null;
                transform = charFontUIObject.transform;


                charFont.image = image;
                charFont.rectRegion = rect;

                transform.width = rect.width;
                transform.height = rect.height;


                charFont.char = text[layoutData.index];


                this._addCharFontUIObject(charFontUIObject);

                this._setCharFontUIObjectPosition(charFontUIObject, position.x + layoutData.position[0], position.y + layoutData.position[1]);
            });
        }

        private _createCharFont(index:number, uiRenderer:UIRenderer){
            var charFontUIObject = UIObject.create(),
                charFont = CharFont.create();

            charFontUIObject.addComponent(charFont);
            charFontUIObject.addComponent(uiRenderer);


            charFontUIObject.addTag(String(index));

            charFontUIObject.init();

            return {
                charFontUIObject:charFontUIObject,
                charFont:charFont
            }
        }

        private _addCharFontUIObject(charFontUIObject:UIObject){
            this._charFontList.addChild(charFontUIObject);
            this.entityObject.addChild(charFontUIObject);
        }

        private _setCharFontUIObjectPosition(charFontUIObject:UIObject, x:number, y:number){
            var transform = charFontUIObject.transform;

            charFontUIObject.transform.position = CoordinateUtils.convertLeftCornerPositionToCenterPositionInCanvas(Vector2.create(x, y), transform.width, transform.height);
        }

        private _removeAllCharFont(){
            this._charFontList.forEach((charFont:UIObject) => {
                charFont.dispose();
            });

            this._charFontList.removeAllChildren();
        }
    }
}

