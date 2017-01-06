module wd {
    //todo now only support English, need support more languages like French,German
    export class PlainFont extends TwoDFont {
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
                this.dirty = true;

                this.needFormat = true;

                this._text = text;
            }
        }

        private _fontSize:number = 10;
        @cloneAttributeAsBasicType()
        get fontSize(){
            return this._fontSize;
        }
        set fontSize(fontSize:number){
            if(this._fontSize !== fontSize){
                this._fontSize = fontSize;

                this.dirty = true;
                this.needFormat = true;

                this._isLineHeightDirty = true;
            }
        }

        private _fontFamily:string = "sans-serif";
        @cloneAttributeAsBasicType()
        get fontFamily(){
            return this._fontFamily;
        }
        set fontFamily(fontFamily:string){
            if(this._fontFamily !== fontFamily){
                this._fontFamily = fontFamily;

                this.dirty = true;
                this.needFormat = true;

                this._isLineHeightDirty = true;
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

        private _yAlignment:EFontYAlignment = EFontYAlignment.TOP;
        @cloneAttributeAsBasicType()
        get yAlignment(){
            return this._yAlignment;
        }
        set yAlignment(yAlignment:EFontYAlignment){
            if(this._yAlignment !== yAlignment){
                this._yAlignment = yAlignment;

                this.dirty = true;
                this.needFormat = true;
            }
        }

        @cloneAttributeAsBasicType()
        private _lineHeight:number = null;
        private _strArr:Array<string> = [];
        private _isLineHeightDirty:boolean = true;
        private _formater:PlainFontFormater = PlainFontFormater.create();
        @cloneAttributeAsCloneable()
        private _drawer:PlainFontDrawer = PlainFontDrawer.create();

        public init() {
            super.init();

            if(this.needFormat){
                this.reFormat();

                this.needFormat = false;
            }
        }

        public setFillStyle(fillStyle:string) {
            this._drawer.setFillStyle(fillStyle);
        }

        public enableStroke(strokeStyle:string, strokeSize:number) {
            this._drawer.enableStroke(strokeStyle, strokeSize);
        }

        public enableFill(fillStyle:string) {
            this._drawer.enableFill(fillStyle);
        }

        public setLineHeight(lineHeight:number) {
            this._lineHeight = lineHeight;
        }

        protected reFormat(){
            this._text = this._formater.trimStr(this._text);

            if (this.width !== 0) {
                this._strArr = this._text.split('\n');

                this._formater.formatText(this.context, this._strArr, this.width, this._fontSize, this._fontFamily);
            }

            if(this._isLineHeightDirty){
                this._lineHeight = this._getDefaultLineHeight();

                this._isLineHeightDirty = false;
            }
        }

        protected draw(){
            this._drawer.draw({
                strArr: this._strArr,
                context: this.context,
                width:this.width,
                height:this.height,
                leftCornerPosition: this.getLeftCornerPosition(),
                lineHeight: this._lineHeight,
                xAlignment: this._xAlignment,
                yAlignment: this._yAlignment,
                fontSize: this._fontSize,
                fontFamily: this._fontFamily
            });
        }

        private _getDefaultLineHeight() {
            return PlainFontUtils.computeLineHeight("normal", this._fontSize, this._fontFamily);
        }

        private _measure(text:string) {
            return PlainFontUtils.measure(this.context, text, this._fontSize, this._fontFamily);
        }
    }
}

