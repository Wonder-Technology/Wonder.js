module wd{
    export class PlainFontDrawer{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _context:CanvasRenderingContext2D = null;
        private _strArr:Array<string> = null;
        private _leftCornerPosition:Vector2 = null;
        private _fontSize:number = null;
        private _fontFamily:string = null;
        private _maxWidth:number = null;
        private _height:number = null;
        private _lineHeight:number = null;
        private _xAlignment:EFontXAlignment = null;
        private _yAlignment:EFontYAlignment = null;
        private _fontClientHeightCache:wdCb.Hash<number> = wdCb.Hash.create<number>();
        @cloneAttributeAsBasicType()
        private _fillEnabled:boolean = true;
        @cloneAttributeAsBasicType()
        private _fillStyle:string = "rgba(0, 0, 0, 1)";
        @cloneAttributeAsBasicType()
        private _strokeEnabled:boolean = false;
        @cloneAttributeAsBasicType()
        private _strokeStyle:string = null;
        @cloneAttributeAsBasicType()
        private _strokeSize:number = null;

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

        public clone():any{
            return CloneUtils.clone(this);
        }

        public draw(data:any){
            this._context = data.context;
            this._strArr = data.strArr;
            this._leftCornerPosition = data.leftCornerPosition;
            this._fontSize = data.fontSize;
            this._fontFamily = data.fontFamily;
            this._maxWidth = data.width;
            this._height = data.height;
            this._lineHeight = data.lineHeight;
            this._xAlignment = data.xAlignment;
            this._yAlignment = data.yAlignment;

            this._context.font = `${this._fontSize}px '${this._fontFamily}'`;

            this._context.textBaseline = "top";
            this._context.textAlign = "start";


            if (this._strArr.length > 1) {
                this._drawMultiLine();
            }
            else {
                this._drawSingleLine();
            }
        }

        private _getFontClientHeight() {
            var fontSize = this._fontSize,
                fontName = this._fontFamily,
                key = `${fontSize}.${fontName}`,
                cacheHeight = this._fontClientHeightCache.getChild(key),
                height = null;

            if (cacheHeight) {
                return cacheHeight;
            }

            height = PlainFontUtils.computeLineHeight(1, this._fontSize, this._fontFamily);

            this._fontClientHeightCache.addChild(key, height);

            return height;
        }

        private _drawMultiLine(){
            var context = this._context,
                position = this._leftCornerPosition,
                x = position.x,
                y = position.y,
                lineHeight = this._lineHeight,
                fontClientHeight = this._getFontClientHeight(),
                lineCount = this._strArr.length,
                /*! the lineHeight of last line is the height of font */
                lineTotalHeight = (lineCount - 1) * lineHeight + fontClientHeight;

            if (this._yAlignment === EFontYAlignment.BOTTOM) {
                y = y + this._height - lineTotalHeight;
            }
            else if (this._yAlignment === EFontYAlignment.MIDDLE) {
                y = y + (this._height - lineTotalHeight) / 2;
            }

            for (let str of this._strArr) {
                if (this._xAlignment === EFontXAlignment.RIGHT) {
                    x = x + this._maxWidth - this._measure(str);
                }
                else if (this._xAlignment == EFontXAlignment.CENTER) {
                    x = x + (this._maxWidth - this._measure(str)) / 2;
                }


                if (this._fillEnabled) {
                    context.fillStyle = this._fillStyle;
                    context.fillText(str, x, y);
                }
                else if (this._strokeEnabled) {
                    context.strokeStyle = this._strokeStyle;
                    context.lineWidth = this._strokeSize;
                    context.strokeText(str, x, y);
                }

                x = position.x;
                y = y + lineHeight;
            }
        }

        private _drawSingleLine() {
            var context = this._context,
                position = this._leftCornerPosition,
                x = position.x,
                y = position.y,
                fontClientHeight = this._getFontClientHeight(),
                lineCount = 1,
                /*! the lineHeight is the height of font */
                lineTotalHeight = fontClientHeight,
                str = this._strArr[0];

            if (this._yAlignment === EFontYAlignment.BOTTOM) {
                y = y + this._height - lineTotalHeight;
            }
            else if (this._yAlignment === EFontYAlignment.MIDDLE) {
                y = y + (this._height - lineTotalHeight) / 2;
            }

            if (this._xAlignment === EFontXAlignment.RIGHT) {
                x = x + this._maxWidth - this._measure(str);
            }
            else if (this._xAlignment == EFontXAlignment.CENTER) {
                x = x + (this._maxWidth - this._measure(str)) / 2;
            }


            if (this._fillEnabled) {
                context.fillStyle = this._fillStyle;
                context.fillText(str, x, y);
            }
            else if (this._strokeEnabled) {
                context.strokeStyle = this._strokeStyle;
                context.lineWidth = this._strokeSize;
                context.strokeText(str, x, y);
            }
        }

        private _measure(text:string) {
            return PlainFontUtils.measure(this._context, text, this._fontSize, this._fontFamily);
        }
    }
}
