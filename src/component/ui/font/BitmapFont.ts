/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class BitmapFont extends Font{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _text:string = "";
        get text(){
            return this._text;
        }
        set text(text:string){
            if(text !== this._text){
                this._text = text;

                this.dirty = true;
            }
        }

        private _width:number = 0;
        get width(){
            return this._width;
        }
        set width(width:number){
            if(width !== this._width){
                this._width = width;

                this.dirty = true;
            }
        }

        private _xAlignment:FontXAlignment = FontXAlignment.LEFT;
        get xAlignment(){
            return this._xAlignment;
        }
        set xAlignment(xAlignment:FontXAlignment){
            if(xAlignment !== this._xAlignment){
                this._xAlignment = xAlignment;

                this.dirty = true;
            }
        }

        public fntId:string = null;
        public bitmapId:string = null;

        private _charFontList:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();


        public init(){
            var fntObj = LoaderManager.getInstance().get(this.fntId),
                imageAsset:ImageTextureAsset = LoaderManager.getInstance().get(this.bitmapId);


            if (!fntObj) {
                Log.log("impossible to create font: not find fnt file");

                return false;
            }
            if(!imageAsset){
                Log.log("impossible to create font: not find bitmap file");

                return false;
            }

            this.context = this.getContext();

            this._createAndAddFontCharGameObjects(fntObj, imageAsset.source);
        }

        public dispose(){

        }

        //@require(function(elapsedTime:number){
        //    assert(this.gameObject.hasComponent(CharFont), Log.info.FUNC_SHOULD("gameObject", "contain "))
        //})
        public update(elapsedTime:number){
            //this._charFontList.forEach((charFont:GameObject) => {
            //    charFont.update(elapsedTime);
            //});
        }


        /*!
         ////空格字符没有精灵，但是也算一个序号。
         ////如str = "1 a";
         ////那么getChildByTag(0)对应“1”，getChildByTag(1)对应空格（没有精灵，为null），getChildByTag(2)对应“a”

         空白符、换行符都有对应的精灵

         */

        @require(function(fntObj:any, image:HTMLImageElement){
            assert(this.gameObject.hasComponent(UIRenderer), Log.info.FUNC_SHOULD("gameObject", "contain UIRenderer"));
        })
        private _createAndAddFontCharGameObjects(fntObj:any, image:HTMLImageElement) {
        //var self = this;


        //todo 待研究cocos2d位置的计算nextFontPositionX/Y

        //todo 使用setCacheData来重构设置属性（如fontChar.string）

        var stringLen = this.text.length;
        var locStr = this.text;
        var locFontDict = fntObj.fontDefDictionary;
        var nextFontPositionX = 0,
            nextFontPositionY = 0;

        var locCfg = fntObj;


            var gameObject:GameObject = this.gameObject;
            var position = this.getCanvasPosition();
            //var uiRenderer:UIRenderer = gameObject.getComponent<UIRenderer>(UIRenderer);

        for (var i = 0; i < stringLen; i++) {
            var key = locStr.charCodeAt(i);

            //todo 什么情况下会为0？
//                    if (key == 0) continue;

//                        if (this._isNewline(key)) {
//                            //new line
//                            nextFontPositionX = 0;
////                            nextFontPositionY -= locCfg.commonHeight;
//                            nextFontPositionY +-= locCfg.commonHeight;
//
//                            continue;
//                        }


            if (this._isNewline(locStr[i])) {
                let fontChar = gameObject.findChildByTag(String(i)),
                    charFont:CharFont = null;


                if (!fontChar) {
                    fontChar = GameObject.create();

                    charFont = CharFont.create();
                    charFont.context = this.context;

                    fontChar.addComponent(charFont);
                    //fontChar.addComponent(uiRenderer.copy());


                    fontChar.addTag(String(i));

                    gameObject.addChild(fontChar);

                    this._charFontList.addChild(fontChar);
                }
                else{
                    charFont = fontChar.getComponent<CharFont>(CharFont);
                }


                charFont.char = locStr[i];


                //this.addChild(fontChar, 0, i);

//                        else{
//                            this._renderCmd._updateCharTexture(fontChar, rect, key);
//                        }


                fontChar.transform.position = Vector3.create(position.x + nextFontPositionX, position.y + nextFontPositionY, 0);
//
                charFont.startPosX = nextFontPositionX;
                charFont.xAdvance = 0;


//                        nextFontPositionX = nextFontPositionX + fontDef.xAdvance;

                nextFontPositionX = 0;
////                            nextFontPositionY -= locCfg.commonHeight;
                nextFontPositionY = nextFontPositionY + locCfg.commonHeight;

                continue;
            }


//                        var kerningAmount = locKerningDict[(prev << 16) | (key & 0xffff)] || 0;
            var fontDef = this._getFontDef(locFontDict, key);
            if (!fontDef) {
                Log.log("LabelBMFont: character not found " + locStr[i]);
                continue;
            }

//                    //如果为空白符，则不创建对应的精灵，右移x坐标（空格也是一个字符，应该包含在fnt文件中）
//                    if (this._isSpaceUnicode(key)) {
//                        nextFontPositionX = nextFontPositionX + fontDef.xAdvance;
////                        this._space_xAdvance = fontDef.xAdvance;
//                        continue;
//                    }


            var rect = RectRegion.create(fontDef.rect.x, fontDef.rect.y, fontDef.rect.width, fontDef.rect.height);
//                        rect = cc.rectPixelsToPoints(rect);
//                        rect.x += self._imageOffset.x;
//                        rect.y += self._imageOffset.y;

            let fontChar = gameObject.findChildByTag(String(i)),
                charFont:CharFont = null;


            if (!fontChar) {
                fontChar = GameObject.create();


//                            fontChar = new YE.GameObject();
//                            fontChar.initWithTexture(locTexture, rect, false);
//                            fontChar._newTextureWhenChangeColor = true;
//                            this.addChild(fontChar, 0, i);


                //var frame = YE.Frame.create(YE.Bitmap.create(img), rect);
//                             bitmap.setAnchor(imgData.rect);


                charFont = CharFont.create();
                charFont.context = this.context;
                charFont.image = image;
                charFont.rectRegion = rect;
                charFont.width = rect.width;
                charFont.height = rect.height;



                fontChar.addComponent(charFont);
                //fontChar.addComponent(uiRenderer);

                fontChar.addTag(String(i));

                gameObject.addChild(fontChar);
                this._charFontList.addChild(fontChar);
            }
            else{
                charFont = fontChar.getComponent<CharFont>(CharFont);
            }


//            if (!fontChar) {
////                            fontChar = new YE.GameObject();
////                            fontChar.initWithTexture(locTexture, rect, false);
////                            fontChar._newTextureWhenChangeColor = true;
////                            this.addChild(fontChar, 0, i);
//
//
//                var frame = YE.Frame.create(YE.Bitmap.create(img), rect);
////                             bitmap.setAnchor(imgData.rect);
//
//                fontChar = YE.GameObject.create(frame);
//
//
////                            fontChar.setWidth(newConf.commonHeight);
////                            fontChar.setHeight(newConf.commonHeight);
//
//                fontChar.setWidth(rect.size.width);
//                fontChar.setHeight(rect.size.height);
//
//
//            }


//                    fontChar.setCacheData();
            charFont.char = locStr[i];


            //this.addChild(fontChar, 0, i);

//                        else{
//                            this._renderCmd._updateCharTexture(fontChar, rect, key);
//                        }


            fontChar.transform.position = Vector3.create(position.x + nextFontPositionX + fontDef.xOffset, position.y + nextFontPositionY + fontDef.yOffset, 0);

            charFont.startPosX = nextFontPositionX;
            charFont.xAdvance = fontDef.xAdvance;


            nextFontPositionX = nextFontPositionX + fontDef.xAdvance;
        }
    }

        private _isNewline(char) {
        return char.charCodeAt(0) == 10;
    }

        private _getFontDef(fontDict:any, key:number){
        return fontDict[String(key)];
    }
    }
}

