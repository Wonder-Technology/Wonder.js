/// <reference path="../../../filePath.d.ts"/>
module wd {
    export class BitmapFont extends CanvasFont{
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

                this.p_dirty = true;
            }
        }

        private _width:number = 0;
        get width(){
            return this._width;
        }
        set width(width:number){
            if(width !== this._width){
                this._width = width;

                this.p_dirty = true;
            }
        }

        private _xAlignment:FontXAlignment = FontXAlignment.LEFT;
        get xAlignment(){
            return this._xAlignment;
        }
        set xAlignment(xAlignment:FontXAlignment){
            if(xAlignment !== this._xAlignment){
                this._xAlignment = xAlignment;

                this.p_dirty = true;
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

            this._formatText(fntObj);
        }

        public dispose(){
        }

        protected updateWhenDirty() {
            this._charFontList.forEach((charFont:GameObject) => {
                charFont.dispose();
            });

            this._charFontList.removeAllChildren();

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

            this._createAndAddFontCharGameObjects(fntObj, imageAsset.source);

            this._formatText(fntObj);
        }


        private _createCharFont(index:number, uiRenderer:UIRenderer){
            var charFontGameObject = GameObject.create(),
                charFont = CharFont.create();

            //charFont.context = this.context;

            charFontGameObject.addComponent(charFont);
            charFontGameObject.addComponent(uiRenderer);


            charFontGameObject.addTag(String(index));

            charFontGameObject.init();

            return {
                charFontGameObject:charFontGameObject,
                charFont:charFont
            }
        }

        private _addCharFontGameObject(charFontGameObject:GameObject){
            this._charFontList.addChild(charFontGameObject);

            this.gameObject.addChild(charFontGameObject);
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

            //todo 使用setCacheData来重构设置属性（如charFontGameObject.string）

            var stringLen = this.text.length;
            var locStr = this.text;
            var locFontDict = fntObj.fontDefDictionary;
            var nextFontPositionX = 0,
                nextFontPositionY = 0;

            var locCfg = fntObj;


            var gameObject:GameObject = this.gameObject;
            var position = this.getCanvasPosition();
            var uiRenderer:UIRenderer = gameObject.getComponent<UIRenderer>(UIRenderer);

            for (var i = 0; i < stringLen; i++) {
                var key = locStr.charCodeAt(i);

                //todo 什么情况下会为0？
//                    if (key == 0) continue;

//                        if (this._isNewLine(key)) {
//                            //new line
//                            nextFontPositionX = 0;
////                            nextFontPositionY -= locCfg.commonHeight;
//                            nextFontPositionY +-= locCfg.commonHeight;
//
//                            continue;
//                        }


                if (this._isNewLine(locStr[i])) {
                    let charFontGameObject = gameObject.findChildByTag(String(i)),
                        charFont:CharFont = null;


                    if (!charFontGameObject) {
                        let charFontData = this._createCharFont(i, uiRenderer);
                        charFontGameObject = charFontData.charFontGameObject;
                        charFont = charFontData.charFont;

                        this._addCharFontGameObject(charFontGameObject);
                    }
                    else{
                        charFont = charFontGameObject.getComponent<CharFont>(CharFont);
                    }


                    charFont.char = locStr[i];


                    //this.addChild(charFontGameObject, 0, i);

//                        else{
//                            this._renderCmd._updateCharTexture(charFontGameObject, rect, key);
//                        }

                    this._setCharFontGameObjectPosition(charFontGameObject, position.x + nextFontPositionX, position.y + nextFontPositionY);

                    //charFontGameObject.transform.position = Vector3.create(position.x + nextFontPositionX, position.y + nextFontPositionY, 0);
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

                let charFontGameObject = gameObject.findChildByTag(String(i)),
                    charFont:CharFont = null;


                if (!charFontGameObject) {
                    let charFontData = this._createCharFont(i, uiRenderer);
                    charFontGameObject = charFontData.charFontGameObject;
                    charFont = charFontData.charFont;


                    //charFont.context = this.context;
                    charFont.image = image;
                    charFont.rectRegion = rect;
                    charFont.width = rect.width;
                    charFont.height = rect.height;


                    this._addCharFontGameObject(charFontGameObject);
                }
                else{
                    charFont = charFontGameObject.getComponent<CharFont>(CharFont);
                }


//            if (!charFontGameObject) {
////                            charFontGameObject = new YE.GameObject();
////                            charFontGameObject.initWithTexture(locTexture, rect, false);
////                            charFontGameObject._newTextureWhenChangeColor = true;
////                            this.addChild(charFontGameObject, 0, i);
//
//
//                var frame = YE.Frame.create(YE.Bitmap.create(img), rect);
////                             bitmap.setAnchor(imgData.rect);
//
//                charFontGameObject = YE.GameObject.create(frame);
//
//
////                            charFontGameObject.setWidth(newConf.commonHeight);
////                            charFontGameObject.setHeight(newConf.commonHeight);
//
//                charFontGameObject.setWidth(rect.size.width);
//                charFontGameObject.setHeight(rect.size.height);
//
//
//            }


//                    charFontGameObject.setCacheData();
                charFont.char = locStr[i];


                //this.addChild(charFontGameObject, 0, i);

//                        else{
//                            this._renderCmd._updateCharTexture(charFontGameObject, rect, key);
//                        }


                this._setCharFontGameObjectPosition(charFontGameObject, position.x + nextFontPositionX + fontDef.xOffset, position.y + nextFontPositionY + fontDef.yOffset);
                //charFontGameObject.transform.position = Vector3.create(position.x + nextFontPositionX + fontDef.xOffset, position.y + nextFontPositionY + fontDef.yOffset, 0);

                charFont.startPosX = nextFontPositionX;
                charFont.xAdvance = fontDef.xAdvance;


                nextFontPositionX = nextFontPositionX + fontDef.xAdvance;
            }
        }

        //Checking whether the character is a whitespace
        private _isSpaceUnicode(char:string) {
            var charCode = char.charCodeAt(0);

            return  (
//                    (charCode >= 9 && charCode <= 13)   //要排除10（newline）这种情况
            charCode == 32 || charCode == 133 || charCode == 160 || charCode == 5760
            || (charCode >= 8192 && charCode <= 8202) || charCode == 8232 || charCode == 8233 || charCode == 8239
            || charCode == 8287 || charCode == 12288);
        }

        private _isNewLine(char) {
            return char.charCodeAt(0) == 10;
        }

        private _getLetterPosXLeft(sp:CharFont) {
//                return sp.getPositionX() * this._scaleX - (sp._getWidth() * this._scaleX * sp._getAnchorX());
            return sp.startPosX;
        }

        private _getLetterPosXRight(position:Vector3, sp:CharFont) {
//                return sp.getPositionX() * this._scaleX + (sp._getWidth() * this._scaleX * sp._getAnchorX());
//                return sp.getPositionX() + sp.getWidth();
            return sp.x - position.x + sp.xAdvance;
//            return sp.x + sp.xAdvance;
//            return sp.x + sp.xAdvance;
        }

        private _getFontDef(fontDict:any, key:number){
            return fontDict[String(key)];
        }

        @require(function(fntObj:any){
            if (this.width > 0) {
                for (let i = 1, lj = this.text.length; i < lj; i++) {
                    let characterGameObject = this.gameObject.findChildByTag(String(i));

                    assert(!!characterGameObject, "char not has corresponding gameObject");
                    assert(characterGameObject.hasComponent(CharFont), Log.info.FUNC_SHOULD("char gameObject", "contain CharFont component"));
                }
            }
        })
        private _formatText(fntObj:any) {
            //处理多行、空格、超出宽度（需要换行）


//                var fontCharGameObjects = this.getChilds();

            var self = this;


//                self.string = self._initialString;

            // Step 1: Make multiline
            if (self.width > 0) {
//                    var stringLength = self.text.length;
//                    var multilinetext = [];
//                    var last_word = [];
//
//                    var line = 1, i = 0, start_line = false, start_word = false, startOfLine = -1, startOfWord = -1, skip = 0;

                var gameObject = this.gameObject;
//
                var characterGameObject:GameObject = null;
                var charFont:CharFont = null;

                //var position = this.getCanvasPosition();
                var position = gameObject.transform.position;

                //var x = position.x,
                //    y = position.y;
                var x = 0,
                    y = 0;

                var lineHeight = fntObj.commonHeight;



                //todo 改为iterate

                //第一个字符直接显示，从第二个字符开始判断
                //这里遍历string而不是遍历childs，是为了获得正确的序号index，从而能获得对应字符的精灵
                for (var i = 1, lj = self.text.length; i < lj; i++) {

                    characterGameObject = gameObject.findChildByTag(String(i));

//                        //不是每个字符都有精灵（如空格字符就没有精灵）
//                        if (!characterGameObject) {
////                            x = x - this._space_xAdvance;
//                            continue;
//                        }


                    charFont = characterGameObject.getComponent<CharFont>(CharFont);

//                    for (var i = 0, lj = self.getChilds().length; i < lj; i++) {
//                        var justSkipped = 0;
//                        while (!(characterGameObject = self.getChildByTag(j + skip + justSkipped)))
//                            justSkipped++;
//                        skip += justSkipped;
//
//                        if (i >= stringLength)
//                            break;
//
//                        var character = self.text[i];
//                        if (!start_word) {
//                            startOfWord = self._getLetterPosXLeft(characterGameObject);
//                            start_word = true;
//                        }
//                        if (!start_line) {
//                            startOfLine = startOfWord;
//                            start_line = true;
//                        }
//
//                        // NewLine.
//                        if (character.charCodeAt(0) == 10) {
//                            last_word.push('\n');
//                            multilinetext = multilinetext.concat(last_word);
//                            last_word.length = 0;
//                            start_word = false;
//                            start_line = false;
//                            startOfWord = -1;
//                            startOfLine = -1;
//                            //i+= justSkipped;
//                            j--;
//                            skip -= justSkipped;
//                            line++;
//
//                            if (i >= stringLength)
//                                break;
//
//                            character = self.text[i];
//                            if (!startOfWord) {
//                                startOfWord = self._getLetterPosXLeft(characterGameObject);
//                                start_word = true;
//                            }
//                            if (!startOfLine) {
//                                startOfLine = startOfWord;
//                                start_line = true;
//                            }
//                            i++;
//                            continue;
//                        }

//                        // Whitespace.
//                        if (this._isspace_unicode(character)) {
//                            last_word.push(character);
//                            multilinetext = multilinetext.concat(last_word);
//                            last_word.length = 0;
//                            start_word = false;
//                            startOfWord = -1;
//                            i++;
//                            continue;
//                        }


                    if (this._isNewLine(charFont.char)) {


                        //isNewLine和fullline标志应该放在行最后一个字符


                        charFont.isNewLine = true;


//                            if (this.getChildByTag(i + 1)) {
//                                var nextGameObjectXVdance = this.getChildByTag(i + 1).xAdvance;
//                            }
//                            else {
//                                var nextGameObjectXVdance = 0;
//                            }
//
//                            if (this._getLetterPosXRight(characterGameObject) - x + nextGameObjectXVdance > this.width) {
//                                characterGameObject.isFullLine = true;
//                            }

                        //主动回车的字符，fullline为false
                        charFont.isFullLine = false;


                        this._translateCharFontGameObject(characterGameObject, -x, y);

                        x = 0;
                    }






                    // Out of bounds.
//                        if (self._getLetterPosXRight(characterGameObject) - startOfLine > self.width) {

//                        if (this._isOutOfBounds()) {


                    if (this._getLetterPosXRight(position, charFont) - x > this.width) {
                        //todo 实现空格不能导致换行的设置
                        //先实现空格可以导致换行（lineBreakWithoutSpaces）的情况


//                            lastCharGameObject = this.getChildByTag(i - 1);
//
//                            if (lastCharGameObject) {
//                                x = x + this._getLetterPosXRight(lastCharGameObject);
//                            }
//                            else{
//
//                            }

                        var prevCharGameObject:GameObject = gameObject.findChildByTag(String(i - 1));

                        if (prevCharGameObject) {
                            let prevCharFont = prevCharGameObject.getComponent<CharFont>(CharFont);

                            prevCharFont.isNewLine = true;


////                                if (this._getLetterPosXRight(prevCharGameObject) - x + characterGameObject.xAdvance > this.width) {
//                                prevCharGameObject.isFullLine = true;
////                                }

                            //如果前一个字符是空格字符（即行最后字符为空格字符），则行不算fullline（因为在对齐时会将行最后的空格字符去掉）
                            if(!this._isSpaceUnicode(prevCharFont.char)){

                                prevCharFont.isFullLine = true;
                            }

                        }

//                            characterGameObject.isNewLine = true;


//                            if (this.getChildByTag(i + 1)) {
//                                var nextGameObjectXVdance = this.getChildByTag(i + 1).xAdvance;
//                            }
//                            else {
//                                var nextGameObjectXVdance = 0;
//                            }
//
//                            if (this._getLetterPosXRight(characterGameObject) - x + nextGameObjectXVdance > this.width) {
//                                characterGameObject.isFullLine = true;
//                            }


                        x = this._getLetterPosXLeft(charFont);


                        y = y + lineHeight;

                        this._translateCharFontGameObject(characterGameObject, -x, y);


//                            if (!self._lineBreakWithoutSpaces) {
//                                last_word.push(character);
//
//                                var found = multilinetext.lastIndexOf(" ");
//                                if (found != -1)
//                                    this._utf8_trim_ws(multilinetext);
//                                else
//                                    multilinetext = [];
//
//                                if (multilinetext.length > 0)
//                                    multilinetext.push('\n');
//
//                                line++;
//                                start_line = false;
//                                startOfLine = -1;
//                                i++;
//                            } else {
//                                this._utf8_trim_ws(last_word);
//
//                                last_word.push('\n');
//                                multilinetext = multilinetext.concat(last_word);
//                                last_word.length = 0;
//                                start_word = false;
//                                start_line = false;
//                                startOfWord = -1;
//                                startOfLine = -1;
//                                line++;
//
//                                if (i >= stringLength)
//                                    break;
//
//                                if (!startOfWord) {
//                                    startOfWord = self._getLetterPosXLeft(characterGameObject);
//                                    start_word = true;
//                                }
//                                if (!startOfLine) {
//                                    startOfLine = startOfWord;
//                                    start_line = true;
//                                }
//                                j--;
//                            }
                    }
//                        else {
//                            // Character is normal.
//                            last_word.push(character);
//                            i++;
//                        }

                    else {
                        this._translateCharFontGameObject(characterGameObject, -x, y);
                    }
                }

//                    multilinetext = multilinetext.concat(last_word);
//                    var len = multilinetext.length;
//                    var str_new = "";
//
//                    for (i = 0; i < len; ++i)
//                        str_new += multilinetext[i];
//
//                    str_new = str_new + String.fromCharCode(0);
//                    //this.updateString(true);
//                    self._setString(str_new, false)
            }


            //处理对齐

            //以行为单位进行遍历
            //如果该行满员，则不处理
            //否则，根据对齐方式，调整该行的字符位置（不会换行）

            //换行的最后一个字符设置为换行标志，并设置该行是否满员的标志。


            if (this._xAlignment != FontXAlignment.LEFT) {
                var line = [];

                //行可以全为空格，对齐时不将空行去掉！如："     2"，则第一行为空

                //行最后的空格不算

                this._charFontList.forEach((charFontGameObject:GameObject) => {
                    let charFont = charFontGameObject.getComponent<CharFont>(CharFont);

//                        if (!this._isNewLine(characterGameObject.char)) {
                    if (!charFont.isNewLine) {
                        //line.push(charFontGameObject);
                        line.push(charFont);
                        return;
                    }

                    if (charFont.isNewLine && charFont.isFullLine) {
                        line = [];
                        return;
                    }


                    //isNewLine, not full line
//                        line.push(characterGameObject);
                    self._alignLine(position, line, line[line.length - 1]);

                    line = [];
                });

                //处理最后一行
                if (line.length > 0) {
                    self._alignLine(position, line, line[line.length - 1]);
                }
            }
        }

        private _alignLine(position:Vector3, line:Array<CharFont>, lastCharFont:CharFont) {
            var self = this;
//                    line = line.filter(function (cp) {
//                        return !self._isSpaceUnicode(cp.char);
//
//                    });


            line = this._trimBottomSpaceChar(line);

            //todo refactor?
            lastCharFont = line[line.length - 1];

            line.forEach(function (cp:CharFont) {
                var shift = null;

                var lineWidth = self._getLetterPosXRight(position, lastCharFont);

                switch (self._xAlignment) {
                    case FontXAlignment.CENTER:
                        shift = (self.width - lineWidth) / 2;
                        break;
                    case FontXAlignment.RIGHT:
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

//                for (i = line.length; i >= 0; i--) {
//
//                }

//                var temp = null;

            if(this._isNewLine(line[i].char)){
//                    temp = line[i];

                i = i - 1;
            }

            while(i >= 0 && this._isSpaceUnicode(line[i].char)){
                i = i - 1;
            }

            line = line.splice(0, i + 1);

            return line;
//
//                line = line.filter(function (cp) {
//                    return !self._isSpaceUnicode(cp.char);
//
//                });
        }

        private _setCharFontGameObjectPosition(charFontGameObject:GameObject, x:number, y:number){
            charFontGameObject.transform.position = CoordinateUtils.convertCanvasPositionToWebGLPosition(Vector2.create(x, y));
        }

        private _translateCharFontGameObject(charFontGameObject:GameObject, x:number, y:number){
            charFontGameObject.transform.translate(x, -y, 0);
        }
    }
}

