module wd {
    //todo support yAlign
    //todo support rotate BitmapFont.entityObject(it should rotate all its CharFont UIObject around pivot)(refer to Button->text, should setChildrenTransform when init)
    export class BitmapFont extends Font{
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


        public init(){
            var fntObj = this._getFntObj(),
                imageAsset:ImageTextureAsset = this._getImageAsset();

            if (!fntObj) {
                Log.log("impossible to create font: not find fnt file");

                return false;
            }

            if(!imageAsset){
                Log.log("impossible to create font: not find bitmap file");

                return false;
            }

            super.init();

            this._createAndAddFontCharUIObjects(fntObj, imageAsset.source);

            this._formatText(fntObj);
        }

        public dispose(){
            super.dispose();
            this._removeAllCharFont();
        }

        protected reFormat(){
            var fntObj = this._getFntObj(),
                imageAsset:ImageTextureAsset = this._getImageAsset();

            this._removeAllCharFont();

            if (!fntObj) {
                Log.log("impossible to create font: not find fnt file");

                return false;
            }
            if(!imageAsset){
                Log.log("impossible to create font: not find bitmap file");

                return false;
            }

            this._createAndAddFontCharUIObjects(fntObj, imageAsset.source);

            this._formatText(fntObj);
        }

        private _getFntObj(){
            return LoaderManager.getInstance().get(this.fntId);
        }

        private _getImageAsset(){
            return LoaderManager.getInstance().get(this.bitmapId);
        }

        private _createAndAddFontCharUIObjects(fntObj:any, image:HTMLImageElement) {
            var locStr = this.text,
                locFontDict = fntObj.fontDefDictionary,
                nextFontPositionX = 0,
                nextFontPositionY = 0,
                position = this.getLeftCornerPosition(),
                //position = this.entityObject.transform.position,
                uiRenderer:UIRenderer = this.getUIRenderer(),
                charFontUIObject:UIObject = null,
                charFont:CharFont = null;

            for (let i = 0, stringLen = locStr.length; i < stringLen; i++) {
                let key = String(locStr.charCodeAt(i)),
                    char = locStr[i];

                if (this._isNewLine(char)) {
                    let charFontData = this._createAndAddFontCharObjectOfNewLineChar(i, char, uiRenderer);
                    charFontUIObject = charFontData.charFontUIObject;
                    charFont = charFontData.charFont;

                    this._setCharFontUIObjectPosition(charFontUIObject, position.x + nextFontPositionX, position.y + nextFontPositionY);

                    charFont.startPosX = nextFontPositionX;
                    charFont.xAdvance = 0;

                    nextFontPositionX = 0;
                    nextFontPositionY = nextFontPositionY + fntObj.commonHeight;

                    continue;
                }


                let fontDef = this._getFontDef(locFontDict, key),
                    charFontData:{charFontUIObject:UIObject,charFont:CharFont} = null;

                if (!fontDef) {
                    Log.log(`character not found ${char}`);
                    continue;
                }

                charFontData = this._createAndAddFontCharObjectOfCommonChar(fontDef, image, i, char, uiRenderer);

                charFontUIObject = charFontData.charFontUIObject;
                charFont = charFontData.charFont;

                this._setCharFontUIObjectPosition(charFontUIObject, position.x + nextFontPositionX + fontDef.xOffset, position.y + nextFontPositionY + fontDef.yOffset);

                charFont.startPosX = nextFontPositionX;
                charFont.xAdvance = fontDef.xAdvance;

                nextFontPositionX = nextFontPositionX + fontDef.xAdvance;
            }
        }

        private _createAndAddFontCharObjectOfNewLineChar(index:number, char:string, uiRenderer:UIRenderer){
            var charFontUIObject:UIObject = this._findCharFontUIObject(index),
                charFont:CharFont = null;

            if (!charFontUIObject) {
                let charFontData = this._createCharFont(index, uiRenderer);

                charFontUIObject = charFontData.charFontUIObject;
                charFont = charFontData.charFont;

                this._addCharFontUIObject(charFontUIObject);
            }
            else{
                charFont = charFontUIObject.getComponent<CharFont>(CharFont);
            }

            charFont.char = char;

            return {
                charFontUIObject:charFontUIObject,
                charFont:charFont
            }
        }

        private _createAndAddFontCharObjectOfCommonChar(fontDef:any, image:HTMLImageElement, index:number, char:string, uiRenderer:UIRenderer){
            var rect = RectRegion.create(fontDef.rect.x, fontDef.rect.y, fontDef.rect.width, fontDef.rect.height),
                charFontUIObject:UIObject = this._findCharFontUIObject(index),
                charFont:CharFont = null;


            if (!charFontUIObject) {
                let charFontData = this._createCharFont(index, uiRenderer),
                    transform:RectTransform = null;

                charFontUIObject = charFontData.charFontUIObject;
                transform = charFontUIObject.transform,
                charFont = charFontData.charFont;


                charFont.image = image;
                charFont.rectRegion = rect;

                transform.width = rect.width;
                transform.height = rect.height;


                this._addCharFontUIObject(charFontUIObject);
            }
            else{
                charFont = charFontUIObject.getComponent<CharFont>(CharFont);
            }

            charFont.char = char;

            return {
                charFontUIObject:charFontUIObject,
                charFont:charFont
            }
        }

        @require(function(fntObj:any){
            if (this.width > 0) {
                for (let i = 1, stringLen = this.text.length; i < stringLen; i++) {
                    let characterUIObject = this.entityObject.findChildByTag(String(i));

                    assert(!!characterUIObject, "char not has corresponding entityObject");
                    assert(characterUIObject.hasComponent(CharFont), Log.info.FUNC_SHOULD("char entityObject", "contain CharFont component"));
                }
            }
        })
        private _formatText(fntObj:any) {
            if (this.width > 0) {
                this._formatMultiLine(fntObj);
            }

            this._formatAlign();
        }

        private _formatMultiLine(fntObj:any){
            var entityObject = this.entityObject,
                characterUIObject:UIObject = null,
                charFont:CharFont = null,
                //position = entityObject.transform.position,
                position = this.getLeftCornerPosition(),
                x = 0,
                y = 0,
                lineHeight = fntObj.commonHeight;

            for (let i = 1, stringLen = this.text.length; i < stringLen; i++) {
                characterUIObject = this._findCharFontUIObject(i);
                charFont = characterUIObject.getComponent<CharFont>(CharFont);

                /*!
                 should mark the last char of the line isNewLine/isFullLine
                 */
                if (this._isNewLine(charFont.char)) {
                    charFont.isNewLine = true;
                    charFont.isFullLine = false;


                    this._translateCharFontUIObject(characterUIObject, -x, y);

                    x = 0;
                }


                if (this._isExceedWidth(position, charFont, x)) {
                    let prevCharUIObject:UIObject = this._findCharFontUIObject(i - 1);

                    if (prevCharUIObject) {
                        let prevCharFont = prevCharUIObject.getComponent<CharFont>(CharFont);

                        prevCharFont.isNewLine = true;


                        /*!
                         if the prev char is space char(it's the last char of this line), this line is not "fullLine"(because the last space char of the line will be removed when align).
                         */
                        if (!this._isSpaceUnicode(prevCharFont.char)) {

                            prevCharFont.isFullLine = true;
                        }

                    }


                    x = this._getLetterPosXLeft(charFont);
                    y = y + lineHeight;

                    this._translateCharFontUIObject(characterUIObject, -x, y);
                }
                else {
                    this._translateCharFontUIObject(characterUIObject, -x, y);
                }
            }
        }

        private _formatAlign(){
            //var position = this.entityObject.transform.position,
            var position = this.getLeftCornerPosition(),
                self = this;

            /*!
             iterate the lines

             if the line is "fullLine", not align;
             else, adjust the chars of the line according to xAlignment(not line feed).
             */

            if (this._xAlignment != EFontXAlignment.LEFT) {
                let line = [];

                this._charFontList.forEach((charFontUIObject:UIObject) => {
                    let charFont = charFontUIObject.getComponent<CharFont>(CharFont);

                    if (!charFont.isNewLine) {
                        line.push(charFont);
                        return;
                    }

                    if (charFont.isNewLine && charFont.isFullLine) {
                        line = [];
                        return;
                    }


                    self._alignLine(position, line, line[line.length - 1]);

                    line = [];
                });

                //handle the last line
                if (line.length > 0) {
                    self._alignLine(position, line, line[line.length - 1]);
                }
            }
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

        private _findCharFontUIObject(index:number){
            return this.entityObject.findChildByTag(String(index));
        }

        private _isSpaceUnicode(char:string) {
            var charCode = char.charCodeAt(0);

            return charCode == 32 || charCode == 133 || charCode == 160 || charCode == 5760 || (charCode >= 8192 && charCode <= 8202) || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288;
        }

        private _isNewLine(char) {
            return char.charCodeAt(0) == 10;
        }

        private _getLetterPosXLeft(sp:CharFont) {
            return sp.startPosX;
        }

        private _getLetterPosXRight(leftCornerPosition:Vector2, sp:CharFont) {
            return CoordinateUtils.convertCenterPositionXToLeftCornerPositionX(sp.x, sp.width) - leftCornerPosition.x + sp.xAdvance;
        }

        private _getFontDef(fontDict:any, key:string){
            return fontDict[key];
        }

        private _isExceedWidth(leftCornerPosition:Vector2, charFont:CharFont, x:number){
            return this._getLetterPosXRight(leftCornerPosition, charFont) - x > this.width
        }

        private _alignLine(leftCornerPosition:Vector2, line:Array<CharFont>, lastCharFont:CharFont) {
            var self = this;

            line = this._trimBottomSpaceChar(line);

            lastCharFont = line[line.length - 1];

            line.forEach(function (cp:CharFont) {
                let shift = null,
                    lineWidth = self._getLetterPosXRight(leftCornerPosition, lastCharFont);

                switch (self._xAlignment) {
                    case EFontXAlignment.CENTER:
                        shift = (self.width - lineWidth) / 2;
                        break;
                    case EFontXAlignment.RIGHT:
                        shift = self.width - lineWidth;
                        break;
                    default:
                        break;
                }

                cp.x = cp.x + shift;
            });
        }

        private _trimBottomSpaceChar(line:Array<CharFont>) {
            var i = line.length - 1;

            if(this._isNewLine(line[i].char)){
                i = i - 1;
            }

            while(i >= 0 && this._isSpaceUnicode(line[i].char)){
                i = i - 1;
            }

            line = line.splice(0, i + 1);

            return line;
        }

        private _setCharFontUIObjectPosition(charFontUIObject:UIObject, x:number, y:number){
            var transform = charFontUIObject.transform;

            charFontUIObject.transform.position = CoordinateUtils.convertLeftCornerPositionToCenterPosition(Vector2.create(x, y), transform.width, transform.height);
        }

        private _translateCharFontUIObject(charFontUIObject:UIObject, x:number, y:number){
            //charFontUIObject.transform.translate(x, -y);
            charFontUIObject.transform.translate(x, y);
        }

        private _removeAllCharFont(){
            this._charFontList.forEach((charFont:UIObject) => {
                charFont.dispose();
            });

            this._charFontList.removeAllChildren();
        }
    }
}

