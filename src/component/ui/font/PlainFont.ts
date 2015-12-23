/// <reference path="../../../filePath.d.ts"/>
module wd {
    const WORD_REX = /([a-zA-Z0-9]+|\S)/,
        FIRST_ENGLISH_OR_NUM = /^[a-zA-Z0-9]/,
        LAST_ENGLISH_OR_NUM = /[a-zA-Z0-9]+$/,
        LAST_INVALID_CHAR = /\s+$/;

    //todo now only support English, need support more languages like French,German
    export class PlainFont extends Font {
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

        private _fontSize:number = 10;
        get fontSize(){
            return this._fontSize;
        }
        set fontSize(fontSize:number){
            if(fontSize !== this._fontSize){
                this._fontSize = fontSize;

                this.dirty = true;
            }
        }

        private _fontFamily:string = "sans-serif";
        get fontFamily(){
            return this._fontFamily;
        }
        set fontFamily(fontFamily:string){
            if(fontFamily !== this._fontFamily){
                this._fontFamily = fontFamily;

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

        private _height:number = 0;
        get height(){
            return this._height;
        }
        set height(height:number){
            if(height !== this._height){
                this._height = height;

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

        private _yAlignment:FontYAlignment = FontYAlignment.TOP;
        get yAlignment(){
            return this._yAlignment;
        }
        set yAlignment(yAlignment:FontYAlignment){
            if(yAlignment !== this._yAlignment){
                this._yAlignment = yAlignment;

                this.dirty = true;
            }
        }

        private _context:any = null;
        private _fillEnabled:boolean = true;
        private _fillStyle:string = "rgba(0, 0, 0, 1)";
        private _strokeEnabled:boolean = false;
        private _strokeStyle:string = null;
        private _strokeSize:number = null;
        private _fontClientHeightCache:wdCb.Hash<number> = wdCb.Hash.create<number>();
        private _lineHeight:number = null;
        private _strArr:Array<string> = [];
        private _isFirstUpdate:boolean = true;

        public init() {
            this._context = this._getContext();
            this._formatText();
            this._lineHeight = this._getDefaultLineHeight();

            this._initDimension();
        }

        //todo implement
        public dispose() {
        }

        public update(time:number) {
            if(!this._isFirstUpdate){
                if(this.dirty){
                    this._updateWhenDirty();
                }
            }
            else{
                this._isFirstUpdate = false;
            }

            this._draw();

            this.dirty = false;
        }

        public setFillStyle(fillStyle:string) {
            this._fillStyle = fillStyle;
        }

        public enableStroke(strokeStyle:string, strokeSize:number) {
            this._strokeEnabled = true;
            this._fillEnabled = false;

            this._strokeStyle = strokeStyle;
            this._strokeSize = strokeSize;
        }

        public enableFill(fillStyle:string) {
            this._fillEnabled = true;
            this._strokeEnabled = false;

            this._fillStyle = fillStyle;
        }

        public setLineHeight(lineHeight:number) {
            this._lineHeight = lineHeight;
        }

        @require(function () {
            assert(this.gameObject.hasComponent(UIRenderer), Log.info.FUNC_SHOULD("gameObject", "contain UIRenderer"))
        })
        private _getContext() {
            var renderer = this.gameObject.getComponent<UIRenderer>(UIRenderer);

            return renderer.context;
        }

        private _formatText() {
            var maxWidth = this._width;

            this._trimStr();

            if (maxWidth !== 0) {
                this._strArr = this._text.split('\n');

                for (let i = 0; i < this._strArr.length; i++) {
                    let text = this._strArr[i],
                        allWidth = this._measure(text);

                    if (allWidth > maxWidth && text.length > 1) {
                        this._formatMultiLine(i, text, allWidth, maxWidth);
                    }
                }
            }
        }

        private _trimStr() {
            this._text = this._text.replace(LAST_INVALID_CHAR, "");
        }

        private _formatMultiLine(i:number, text:string, allWidth:number, maxWidth:number) {
            const LOOP_MAX_NUM = 100;
            var self = this,
                preText = null,
                truncationPointIndex = text.length * ( maxWidth / allWidth ) | 0,
                nextText = text.substr(truncationPointIndex),
                loopIndex = 0,
                width = allWidth - this._measure(nextText),
                pushNum = 0;


            var truncate = () => {
                /*! truncate string by the maxWidth / width ratio
                if string still exceed maxWidth, truncate with the same ratio recursive

                after loop, truncationPointIndex will <= the true one
                 */
                while (width > maxWidth && loopIndex < LOOP_MAX_NUM) {
                    truncationPointIndex *= maxWidth / width;
                    truncationPointIndex = Math.floor(truncationPointIndex);
                    nextText = text.substr(truncationPointIndex);
                    width = allWidth - this._measure(nextText);
                    loopIndex = loopIndex + 1;
                }

                loopIndex = 0;
            }

            var findTruncationPoint = () => {
                /*! find the truncation point to get the true truncationPointIndex
                step by word(if it's chinese, the step will be 1)
                after loop, truncationPointIndex will be the index of last char of the word which exceed maxWidth
                 */

                while (width < maxWidth && loopIndex < LOOP_MAX_NUM) {
                    if (nextText) {
                        let exec = WORD_REX.exec(nextText);
                        pushNum = exec ? exec[0].length : 1;
                    }

                    truncationPointIndex = truncationPointIndex + pushNum;
                    nextText = text.substr(truncationPointIndex);
                    width = allWidth - this._measure(nextText);
                    loopIndex = loopIndex + 1;
                }
            }

            var handleTruncationPointIndex = () => {
                /*!
                shouldn't truncate the word
                 */
                if (FIRST_ENGLISH_OR_NUM.test(nextText)) {
                    let preText = text.substr(0, truncationPointIndex),
                        pExec = LAST_ENGLISH_OR_NUM.exec(preText);

                    if (pExec) {
                        truncationPointIndex = truncationPointIndex - pExec[0].length;
                    }
                }
                else {
                    truncationPointIndex = truncationPointIndex - pushNum;
                }

                if (truncationPointIndex === 0) {
                    truncationPointIndex = 1;
                }
            }

            var setString = () => {
                nextText = text.substr(truncationPointIndex);
                preText = text.substr(0, truncationPointIndex);


                self._strArr[i] = nextText;
                self._strArr.splice(i, 0, preText);
            }


            truncate();
            findTruncationPoint();
            handleTruncationPointIndex();
            setString();
        }

        private _measure(text) {
            var context = this._context;

            context.font = `${this.fontSize}px '${this.fontFamily}'`;

            return context.measureText(text).width;
        }

        private _getDefaultLineHeight() {
            return this._computeLineHeight("normal");
        }

        private _computeLineHeight(lineHeight) {
            var div = wdCb.DomQuery.create("<div></div>"),
                dom = div.get(0),
                resultLineHeight = null;

            dom.style.cssText = `
             font-family: ${this.fontFamily};
             font-size: ${this.fontSize}px;
             position: absolute;
             left: -100px;
             top: -100px;
             line-height: ${lineHeight};
             `;

            div.prependTo("body");

            dom.innerHTML = "abc!";

            resultLineHeight = dom.clientHeight;

            div.remove();

            return resultLineHeight;
        }

        private _getFontClientHeight() {
            var fontSize = this.fontSize,
                fontName = this.fontFamily,
                key = `${fontSize}.${fontName}`,
                cacheHeight = this._fontClientHeightCache.getChild(key),
                height = null;

            if (cacheHeight) {
                return cacheHeight;
            }

            height = this._computeLineHeight(1);
            this._fontClientHeightCache.addChild(key, height);

            return height;
        }

        private _getCanvasPosition(){
            return CoordinateUtils.convertWebGLPositionToCanvasPosition(this.gameObject.transform.position);
        }

        @require(function(){
            assert(!!DeviceManager.getInstance().view, Log.info.FUNC_SHOULD("set view"));
        })
        private _initDimension(){
            var view = DeviceManager.getInstance().view;

            if(this._width === FontDimension.AUTO){
                this._width = view.width;
            }
            if(this._height === FontDimension.AUTO){
                this._height = view.height;
            }
        }

        private _draw(){
            var context = this._context;

            context.save();

            context.font = `${this.fontSize}px '${this.fontFamily}'`;

            context.textBaseline = "top";
            context.textAlign = "start";

            if (this._strArr.length > 1) {
                this._drawMultiLine();
            }
            else {
                this._drawSingleLine();
            }

            context.restore();
        }

        private _drawMultiLine(){
            var context = this._context,
                position = this._getCanvasPosition(),
                x = position.x,
                y = position.y,
                lineHeight = this._lineHeight,
                fontClientHeight = this._getFontClientHeight(),
                self = this,
                lineCount = this._strArr.length,
            /*! the lineHeight of last line is the height of font */
                lineTotalHeight = (lineCount - 1) * lineHeight + fontClientHeight;

            if (self.yAlignment === FontYAlignment.BOTTOM) {
                y = y + self.height - lineTotalHeight;
            }
            else if (self.yAlignment === FontYAlignment.MIDDLE) {
                y = y + (self.height - lineTotalHeight) / 2;
            }

            for (let str of this._strArr) {
                if (self.xAlignment === FontXAlignment.RIGHT) {
                    x = x + self.width - self._measure(str);
                }
                else if (self.xAlignment == FontXAlignment.CENTER) {
                    x = x + (self.width - self._measure(str)) / 2;
                }


                if (self._fillEnabled) {
                    context.fillStyle = self._fillStyle;
                    context.fillText(str, x, y);
                }
                else if (self._strokeEnabled) {
                    context.strokeStyle = self._strokeStyle;
                    context.lineWidth = self._strokeSize;
                    context.strokeText(str, x, y);
                }

                x = position.x;
                y = y + lineHeight;
            }
        }

        private _drawSingleLine() {
            var context = this._context,
                position = this._getCanvasPosition(),
                x = position.x,
                y = position.y,
                fontClientHeight = this._getFontClientHeight(),
                self = this,
                lineCount = 1,
            /*! the lineHeight is the height of font */
                lineTotalHeight = fontClientHeight,
                str = this._strArr[0];

            if (self.yAlignment === FontYAlignment.BOTTOM) {
                y = y + self.height - lineTotalHeight;
            }
            else if (self.yAlignment === FontYAlignment.MIDDLE) {
                y = y + (self.height - lineTotalHeight) / 2;
            }

            if (self.xAlignment === FontXAlignment.RIGHT) {
                x = x + self.width - self._measure(str);
            }
            else if (self.xAlignment == FontXAlignment.CENTER) {
                x = x + (self.width - self._measure(str)) / 2;
            }


            if (self._fillEnabled) {
                context.fillStyle = self._fillStyle;
                context.fillText(str, x, y);
            }
            else if (self._strokeEnabled) {
                context.strokeStyle = self._strokeStyle;
                context.lineWidth = self._strokeSize;
                context.strokeText(str, x, y);
            }
        }

        private _updateWhenDirty() {
            this._formatText();
            this._initDimension();
        }
    }
}

