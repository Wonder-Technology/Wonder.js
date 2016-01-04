/// <reference path="../../../filePath.d.ts"/>
module wd {
    //todo
    export class BitmapFont {
        //export class BitmapFont extends Font{
        //public static create() {
        //    var obj = new this();
        //
        //    return obj;
        //}
        //
        //private _text:string = "";
        //get text(){
        //    return this._text;
        //}
        //set text(text:string){
        //    if(text !== this._text){
        //        this._text = text;
        //
        //        this.p_dirty = true;
        //    }
        //}
        //
        //private _width:number = 0;
        //get width(){
        //    return this._width;
        //}
        //set width(width:number){
        //    if(width !== this._width){
        //        this._width = width;
        //
        //        this.p_dirty = true;
        //    }
        //}
        //
        //private _xAlignment:FontXAlignment = FontXAlignment.LEFT;
        //get xAlignment(){
        //    return this._xAlignment;
        //}
        //set xAlignment(xAlignment:FontXAlignment){
        //    if(xAlignment !== this._xAlignment){
        //        this._xAlignment = xAlignment;
        //
        //        this.p_dirty = true;
        //    }
        //}
        //
        //public fntId:string = null;
        //public bitmapId:string = null;
        //
        //private _charFontList:wdCb.Collection<GameObject> = wdCb.Collection.create<GameObject>();
        //
        //
        //public init(){
        //    var fntObj = this._getFntObj(),
        //        imageAsset:ImageTextureAsset = this._getImageAsset();
        //
        //    if (!fntObj) {
        //        Log.log("impossible to create font: not find fnt file");
        //
        //        return false;
        //    }
        //
        //    if(!imageAsset){
        //        Log.log("impossible to create font: not find bitmap file");
        //
        //        return false;
        //    }
        //
        //    this.context = this.getContext();
        //
        //    this._initDimension();
        //
        //    this._createAndAddFontCharGameObjects(fntObj, imageAsset.source);
        //
        //    this._formatText(fntObj);
        //}
        //
        //public dispose(){
        //    this._removeAllCharFont();
        //}
        //
        //protected updateWhenDirty() {
        //    var fntObj = this._getFntObj(),
        //        imageAsset:ImageTextureAsset = this._getImageAsset();
        //
        //    this._removeAllCharFont();
        //
        //    if (!fntObj) {
        //        Log.log("impossible to create font: not find fnt file");
        //
        //        return false;
        //    }
        //    if(!imageAsset){
        //        Log.log("impossible to create font: not find bitmap file");
        //
        //        return false;
        //    }
        //
        //    this._initDimension();
        //
        //    this._createAndAddFontCharGameObjects(fntObj, imageAsset.source);
        //
        //    this._formatText(fntObj);
        //}
        //
        //private _getFntObj(){
        //    return LoaderManager.getInstance().get(this.fntId);
        //}
        //
        //private _getImageAsset(){
        //    return LoaderManager.getInstance().get(this.bitmapId);
        //}
        //
        //@require(function(fntObj:any, image:HTMLImageElement){
        //    assert(this.gameObject.hasComponent(UIRenderer), Log.info.FUNC_SHOULD("gameObject", "contain UIRenderer"));
        //})
        //private _createAndAddFontCharGameObjects(fntObj:any, image:HTMLImageElement) {
        //    var locStr = this.text,
        //        locFontDict = fntObj.fontDefDictionary,
        //        nextFontPositionX = 0,
        //        nextFontPositionY = 0,
        //        gameObject:GameObject = this.gameObject,
        //        position = this.getCanvasPosition(),
        //        uiRenderer:UIRenderer = gameObject.getComponent<UIRenderer>(UIRenderer),
        //        charFontGameObject:GameObject = null,
        //        charFont:CharFont = null;
        //
        //    for (let i = 0, stringLen = locStr.length; i < stringLen; i++) {
        //        let key = String(locStr.charCodeAt(i)),
        //            char = locStr[i];
        //
        //        if (this._isNewLine(char)) {
        //            let charFontData = this._createAndAddFontCharObjectOfNewLineChar(i, char, uiRenderer);
        //            charFontGameObject = charFontData.charFontGameObject;
        //            charFont = charFontData.charFont;
        //
        //            this._setCharFontGameObjectPosition(charFontGameObject, position.x + nextFontPositionX, position.y + nextFontPositionY);
        //
        //            charFont.startPosX = nextFontPositionX;
        //            charFont.xAdvance = 0;
        //
        //            nextFontPositionX = 0;
        //            nextFontPositionY = nextFontPositionY + fntObj.commonHeight;
        //
        //            continue;
        //        }
        //
        //
        //        let fontDef = this._getFontDef(locFontDict, key),
        //            charFontData:{charFontGameObject:GameObject,charFont:CharFont} = null;
        //
        //        if (!fontDef) {
        //            Log.log(`character not found ${char}`);
        //            continue;
        //        }
        //
        //        charFontData = this._createAndAddFontCharObjectOfCommonChar(fontDef, image, i, char, uiRenderer);
        //
        //        charFontGameObject = charFontData.charFontGameObject;
        //        charFont = charFontData.charFont;
        //
        //        this._setCharFontGameObjectPosition(charFontGameObject, position.x + nextFontPositionX + fontDef.xOffset, position.y + nextFontPositionY + fontDef.yOffset);
        //
        //        charFont.startPosX = nextFontPositionX;
        //        charFont.xAdvance = fontDef.xAdvance;
        //
        //        nextFontPositionX = nextFontPositionX + fontDef.xAdvance;
        //    }
        //}
        //
        //private _createAndAddFontCharObjectOfNewLineChar(index:number, char:string, uiRenderer:UIRenderer){
        //    var charFontGameObject = this._findCharFontGameObject(index),
        //        charFont:CharFont = null;
        //
        //    if (!charFontGameObject) {
        //        let charFontData = this._createCharFont(index, uiRenderer);
        //
        //        charFontGameObject = charFontData.charFontGameObject;
        //        charFont = charFontData.charFont;
        //
        //        this._addCharFontGameObject(charFontGameObject);
        //    }
        //    else{
        //        charFont = charFontGameObject.getComponent<CharFont>(CharFont);
        //    }
        //
        //    charFont.char = char;
        //
        //    return {
        //        charFontGameObject:charFontGameObject,
        //        charFont:charFont
        //    }
        //}
        //
        //private _createAndAddFontCharObjectOfCommonChar(fontDef:any, image:HTMLImageElement, index:number, char:string, uiRenderer:UIRenderer){
        //    var rect = RectRegion.create(fontDef.rect.x, fontDef.rect.y, fontDef.rect.width, fontDef.rect.height),
        //        charFontGameObject:GameObject = this._findCharFontGameObject(index),
        //        charFont:CharFont = null;
        //
        //
        //    if (!charFontGameObject) {
        //        let charFontData = this._createCharFont(index, uiRenderer);
        //
        //        charFontGameObject = charFontData.charFontGameObject;
        //        charFont = charFontData.charFont;
        //
        //
        //        charFont.image = image;
        //        charFont.rectRegion = rect;
        //        charFont.width = rect.width;
        //        charFont.height = rect.height;
        //
        //
        //        this._addCharFontGameObject(charFontGameObject);
        //    }
        //    else{
        //        charFont = charFontGameObject.getComponent<CharFont>(CharFont);
        //    }
        //
        //    charFont.char = char;
        //
        //    return {
        //        charFontGameObject:charFontGameObject,
        //        charFont:charFont
        //    }
        //}
        //
        //@require(function(fntObj:any){
        //    if (this.width > 0) {
        //        for (let i = 1, stringLen = this.text.length; i < stringLen; i++) {
        //            let characterGameObject = this.gameObject.findChildByTag(String(i));
        //
        //            assert(!!characterGameObject, "char not has corresponding gameObject");
        //            assert(characterGameObject.hasComponent(CharFont), Log.info.FUNC_SHOULD("char gameObject", "contain CharFont component"));
        //        }
        //    }
        //})
        //private _formatText(fntObj:any) {
        //    if (this.width > 0) {
        //        this._formatMultiLine(fntObj);
        //    }
        //
        //    this._formatAlign();
        //}
        //
        //private _formatMultiLine(fntObj:any){
        //    var gameObject = this.gameObject,
        //        characterGameObject:GameObject = null,
        //        charFont:CharFont = null,
        //        position = gameObject.transform.position,
        //        x = 0,
        //        y = 0,
        //        lineHeight = fntObj.commonHeight;
        //
        //    for (let i = 1, stringLen = this.text.length; i < stringLen; i++) {
        //        characterGameObject = this._findCharFontGameObject(i);
        //        charFont = characterGameObject.getComponent<CharFont>(CharFont);
        //
        //        /*!
        //         should mark the last char of the line isNewLine/isFullLine
        //         */
        //        if (this._isNewLine(charFont.char)) {
        //            charFont.isNewLine = true;
        //            charFont.isFullLine = false;
        //
        //
        //            this._translateCharFontGameObject(characterGameObject, -x, y);
        //
        //            x = 0;
        //        }
        //
        //
        //        if (this._isExceedWidth(position, charFont, x)) {
        //            let prevCharGameObject:GameObject = this._findCharFontGameObject(i - 1);
        //
        //            if (prevCharGameObject) {
        //                let prevCharFont = prevCharGameObject.getComponent<CharFont>(CharFont);
        //
        //                prevCharFont.isNewLine = true;
        //
        //
        //                /*!
        //                 if the prev char is space char(it's the last char of this line), this line is not "fullLine"(because the last space char of the line will be removed when align).
        //                 */
        //                if (!this._isSpaceUnicode(prevCharFont.char)) {
        //
        //                    prevCharFont.isFullLine = true;
        //                }
        //
        //            }
        //
        //
        //            x = this._getLetterPosXLeft(charFont);
        //            y = y + lineHeight;
        //
        //            this._translateCharFontGameObject(characterGameObject, -x, y);
        //        }
        //        else {
        //            this._translateCharFontGameObject(characterGameObject, -x, y);
        //        }
        //    }
        //}
        //
        //private _formatAlign(){
        //    var position = this.gameObject.transform.position,
        //        self = this;
        //
        //    /*!
        //     iterate the lines
        //
        //     if the line is "fullLine", not align;
        //     else, adjust the chars of the line according to xAlignment(not line feed).
        //     */
        //
        //    if (this._xAlignment != FontXAlignment.LEFT) {
        //        let line = [];
        //
        //        this._charFontList.forEach((charFontGameObject:GameObject) => {
        //            let charFont = charFontGameObject.getComponent<CharFont>(CharFont);
        //
        //            if (!charFont.isNewLine) {
        //                line.push(charFont);
        //                return;
        //            }
        //
        //            if (charFont.isNewLine && charFont.isFullLine) {
        //                line = [];
        //                return;
        //            }
        //
        //
        //            self._alignLine(position, line, line[line.length - 1]);
        //
        //            line = [];
        //        });
        //
        //        //handle the last line
        //        if (line.length > 0) {
        //            self._alignLine(position, line, line[line.length - 1]);
        //        }
        //    }
        //}
        //
        //private _createCharFont(index:number, uiRenderer:UIRenderer){
        //    var charFontGameObject = GameObject.create(),
        //        charFont = CharFont.create();
        //
        //    charFontGameObject.addComponent(charFont);
        //    charFontGameObject.addComponent(uiRenderer);
        //
        //
        //    charFontGameObject.addTag(String(index));
        //
        //    charFontGameObject.init();
        //
        //    return {
        //        charFontGameObject:charFontGameObject,
        //        charFont:charFont
        //    }
        //}
        //
        //private _addCharFontGameObject(charFontGameObject:GameObject){
        //    this._charFontList.addChild(charFontGameObject);
        //    this.gameObject.addChild(charFontGameObject);
        //}
        //
        //private _findCharFontGameObject(index:number){
        //    return this.gameObject.findChildByTag(String(index));
        //}
        //
        //private _isSpaceUnicode(char:string) {
        //    var charCode = char.charCodeAt(0);
        //
        //    return charCode == 32 || charCode == 133 || charCode == 160 || charCode == 5760 || (charCode >= 8192 && charCode <= 8202) || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288;
        //}
        //
        //private _isNewLine(char) {
        //    return char.charCodeAt(0) == 10;
        //}
        //
        //private _getLetterPosXLeft(sp:CharFont) {
        //    return sp.startPosX;
        //}
        //
        //private _getLetterPosXRight(position:Vector3, sp:CharFont) {
        //    return sp.x - position.x + sp.xAdvance;
        //}
        //
        //private _getFontDef(fontDict:any, key:string){
        //    return fontDict[key];
        //}
        //
        //private _isExceedWidth(position:Vector3, charFont:CharFont, x:number){
        //    return this._getLetterPosXRight(position, charFont) - x > this.width
        //}
        //
        //private _alignLine(position:Vector3, line:Array<CharFont>, lastCharFont:CharFont) {
        //    var self = this;
        //
        //    line = this._trimBottomSpaceChar(line);
        //
        //    lastCharFont = line[line.length - 1];
        //
        //    line.forEach(function (cp:CharFont) {
        //        let shift = null,
        //            lineWidth = self._getLetterPosXRight(position, lastCharFont);
        //
        //        switch (self._xAlignment) {
        //            case FontXAlignment.CENTER:
        //                shift = (self.width - lineWidth) / 2;
        //                break;
        //            case FontXAlignment.RIGHT:
        //                shift = self.width - lineWidth;
        //                break;
        //            default:
        //                break;
        //        }
        //
        //        cp.x = cp.x + shift;
        //    });
        //}
        //
        //private _trimBottomSpaceChar(line:Array<CharFont>) {
        //    var i = line.length - 1;
        //
        //    if(this._isNewLine(line[i].char)){
        //        i = i - 1;
        //    }
        //
        //    while(i >= 0 && this._isSpaceUnicode(line[i].char)){
        //        i = i - 1;
        //    }
        //
        //    line = line.splice(0, i + 1);
        //
        //    return line;
        //}
        //
        //private _setCharFontGameObjectPosition(charFontGameObject:GameObject, x:number, y:number){
        //    charFontGameObject.transform.position = CoordinateUtils.convertCanvasPositionToWebGLPosition(Vector2.create(x, y));
        //}
        //
        //private _translateCharFontGameObject(charFontGameObject:GameObject, x:number, y:number){
        //    charFontGameObject.transform.translate(x, -y, 0);
        //}
        //
        //private _removeAllCharFont(){
        //    this._charFontList.forEach((charFont:GameObject) => {
        //        charFont.dispose();
        //    });
        //
        //    this._charFontList.removeAllChildren();
        //}
        //
        //@require(function(){
        //    assert(!!DeviceManager.getInstance().view, Log.info.FUNC_SHOULD("set view"));
        //})
        //private _initDimension(){
        //    var view = DeviceManager.getInstance().view;
        //
        //    if(this._width === FontDimension.AUTO){
        //        this._width = view.width;
        //    }
        //}
    //}
}
}

