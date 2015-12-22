/// <reference path="../../../filePath.d.ts"/>
module wd {
    //todo upper case
    var _wordRex = /([a-zA-Z0-9]+|\S)/;
    var _lastEnglishOrNum = /[a-zA-Z0-9]+$/;
    var _firstEnglishOrNum = /^[a-zA-Z0-9]/;
    var _lastInValidChar = /\s+$/;

    //todo now only support English, need support more languages like French,German
    export class PlainFont extends Font {
        public static create() {
            var obj = new this();

            return obj;
        }

        public text:string = "";
        public fontSize:number = 10;
        public fontFamily:string = "sans-serif";
        //todo can be auto
        public width:number = 0;
        public height:number = 0;
        public xAlignment:FontXAlignment = FontXAlignment.LEFT;
        public yAlignment:FontYAlignment = FontYAlignment.TOP;

        private _context:any = null;
        private _fillEnabled:boolean = true;
        private _fillStyle:string = "rgba(0, 0, 0, 1)";
        private _strokeEnabled:boolean = false;
        private _strokeStyle:string = null;
        private _strokeSize:number = null;
        private _fontClientHeightCache:wdCb.Hash<number> = wdCb.Hash.create<number>();
        private _lineHeight:number = null;
        private _strArr:Array<string> = [];

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
            var context = this._context,
                position = this._getCanvasPosition(),
                x = position.x,
                y = position.y;

            //todo optimize: if text not change, not update

            context.save();

            //context.strokeStyle = "green";
            //context.strokeRect(400, 100, 400, 300);

            context.font = this.fontSize + "px '" + this.fontFamily + "'";

//                context.textBaseline = _textAlign[this.yAlignment];
//                context.textAlign = _textBaseline[this.xAlignment];
            context.textBaseline = "top";
            context.textAlign = "start";


            //如果多行
            //依次显示出来，并设置水平和垂直对齐


            //否则（单行）
            //显示，设置水平和垂直对齐
            //多行
            if (this._strArr.length > 1) {
                var lineHeight = this._lineHeight;
                var fontClientHeight = this._getFontClientHeight();
                var self = this;
                //var y = this._y;
                //var x = this._x;

                var lineCount = this._strArr.length;
                //最后一行的行高为字体本身的高度
                var lineTotalHeight = (lineCount - 1) * lineHeight + fontClientHeight;

                if (self.yAlignment === FontYAlignment.BOTTOM) {
                    y = y + self.height - lineTotalHeight;
                }
                else if (self.yAlignment === FontYAlignment.MIDDLE) {
                    y = y + (self.height - lineTotalHeight) / 2;
                }

                this._strArr.forEach(function (str, index) {
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
                });
            }
            else {
                //var lineHeight = this._lineHeight;
                var fontClientHeight = this._getFontClientHeight();
                var self = this;
                //var y = this._y;
                //var x = this._x;

                var lineCount = 1;
                //最后一行的行高为字体本身的高度
                var lineTotalHeight = fontClientHeight;

                var str = this._strArr[0];

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

                //todo bug?
                //x = self._x;
                //y = y + lineHeight;
            }


            context.restore();
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
            var i = 0;

            this._trimStr();

            if (this.width !== 0) {
                this._strArr = this.text.split('\n');
//
                for (i = 0; i < this._strArr.length; i++) {
//                        this._checkWarp(this._strings, i, locDimensionsWidth);
                    this._formatMultiLine(i, this.width);
                }
            }
        }

        private _trimStr() {
            this.text = this.text.replace(_lastInValidChar, "");
        }

        private _formatMultiLine(i, maxWidth) {
            var strArr = this._strArr,
                text = strArr[i];
//                var text = lineStr
            var allWidth = this._measure(text);

            if (allWidth > maxWidth && text.length > 1) {
                //找到截断点
                var LOOP_MAX_NUM = 100;
                //increased while cycle maximum ceiling. default 100 time
                var loopIndex = 0;

                //尝试按maxWidth / width 比值，来截断字符串。
                //fuzzyLen为截取点序号
                var fuzzylen = text.length * ( maxWidth / allWidth ) | 0;
                var nextText = text.substr(fuzzylen);
                var width = allWidth - this._measure(nextText);
                var pushNum = 0;

                //exceeded the size
                //处理完后，fuzzylen会小于等于截取点
                while (width > maxWidth && loopIndex < LOOP_MAX_NUM) {
                    //尝试按maxWidth / width 比值，来截断字符串。
                    //如果字符串仍然过长，则再次按maxWidth / width（< 1）来截取
                    fuzzylen *= maxWidth / width;
                    //| 0 取整？
//                        fuzzylen = fuzzylen | 0;
                    //todo error?
                    fuzzylen = Math.floor(fuzzylen);

                    nextText = text.substr(fuzzylen);
                    width = allWidth - this._measure(nextText);
                    loopIndex = loopIndex + 1;
                }

                loopIndex = 0;


                //find the truncation point
                //以单词为步长来判断（如果是中文，则步长为1）
                //处理后，fuzzylen为超过width的单词最后一个字符的序号，nextText

                while (width < maxWidth && loopIndex < LOOP_MAX_NUM) {
                    if (nextText) {
                        var exec = _wordRex.exec(nextText);
                        pushNum = exec ? exec[0].length : 1;
                    }
                    fuzzylen = fuzzylen + pushNum;
                    nextText = text.substr(fuzzylen);
                    width = allWidth - this._measure(nextText);
                    loopIndex = loopIndex + 1;
                }

                var preText = text.substr(0, fuzzylen);

                //todo 判断symbol有什么用？
                //如果wrapInspection为true，则行首字符不能为标点符号

//                    //symbol in the first
//                    if (cc.labelttf.wrapInspection) {
//                        if (cc.labelttf._symbolrex.test(sline || tmptext)) {
//                            result = cc.labelttf._lastwordrex.exec(stext);
//                            fuzzylen -= result ? result[0].length : 0;
//
//                            sline = text.substr(fuzzylen);
//                            stext = text.substr(0, fuzzylen);
//                        }
//                    }

                //不能截断一个单词

                //To judge whether a English words are truncated
//                    var pExec = _lastEnglishOrNum.exec(preText);

                if (_firstEnglishOrNum.test(nextText)) {
                    var pExec = _lastEnglishOrNum.exec(preText);
//                        if (fExec && preText !== result[0]) {
                    if (pExec) {
                        fuzzylen = fuzzylen - pExec[0].length;
                    }
                }
                else {
                    fuzzylen = fuzzylen - pushNum;
                }

                if (fuzzylen === 0) {
                    fuzzylen = 1;
                }

                nextText = text.substr(fuzzylen);
                preText = text.substr(0, fuzzylen);


                strArr[i] = nextText;
                strArr.splice(i, 0, preText);
            }
        }

        private _measure(text) {
            var context = this._context;

            context.font = this.fontSize + "px '" + this.fontFamily + "'";

            return context.measureText(text).width;
        }

        private _getDefaultLineHeight() {
            return this._computeLineHeight("normal");
        }

        private _computeLineHeight(lineHeight) {
            var div = wdCb.DomQuery.create("<div></div>"),
                dom = div.get(0),
                resultLineHeight = null;

            dom.style.cssText = "font-family: " + this.fontFamily
                + "; font-size: " + this.fontSize + "px"
                + "; position: absolute; left: -100px; top: -100px; line-height: " + lineHeight + ";";

            div.prependTo("body");

            dom.innerHTML = "abc!";

            resultLineHeight = dom.clientHeight;

            div.remove();

            return resultLineHeight;
        }

        private _getFontClientHeight() {
            var fontSize = this.fontSize,
                fontName = this.fontFamily;
            var key = fontSize + "." + fontName;
            var cacheHeight = this._fontClientHeightCache.getChild(key);
            var height = null;

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

            if(this.width === FontDimension.AUTO){
                this.width = view.width;
            }
            if(this.height === FontDimension.AUTO){
                this.height = view.height;
            }
        }
    }
}

