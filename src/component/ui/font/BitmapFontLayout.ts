module wd {
    //const X_HEIGHTS = ['x', 'e', 'a', 'o', 'n', 's', 'r', 'c', 'u', 'm', 'v', 'w', 'z']
    //const CAP_HEIGHTS = ['H', 'I', 'N', 'E', 'F', 'K', 'L', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


    //const ALIGN_LEFT = 0,
    //    ALIGN_CENTER = 1,
    //    ALIGN_RIGHT = 2

    export class BitmapFontLayout {
        public static create() {
            var obj = new this();

            return obj;
        }

        private _layoutList:wdCb.Collection<LayoutCharData> = wdCb.Collection.create<LayoutCharData>();
        private _searchGlyph:BitmapFontSearchGlyph = BitmapFontSearchGlyph.create();

        public getLayoutData(text:string, fntId:string, {
            width = 0,
            tabSize = 4,
            letterSpacing = 0,
            align = EFontXAlignment.LEFT
            }) {
            var fntObj:FntData = this._getFntObj(fntId);
                //imageAsset:ImageTextureAsset = this._getImageAsset(bitmapId);

            if (!fntObj) {
                Log.log("impossible to create font: not find fnt file");

                return ;
            }

            //if (!imageAsset) {
            //    Log.log("impossible to create font: not find bitmap file");
            //
            //    return false;
            //}

            //var tabSize = 4;

            this._searchGlyph.setupSpaceGlyphs(fntObj, tabSize);


            //var lines = BitmapFontWordWrapper.getLines(text, fntObj, {
            var lines = BitmapFontWordWrapper.getLines(fntObj, text, this._searchGlyph, {
                width:width,
                letterSpacing:letterSpacing,
                //tabSize: tabSize
            });
            var minWidth = width;

            //clear glyphs
            //glyphs.length = 0
            this._layoutList.removeAllChildren();

            //get max line width
            var maxLineWidth = lines.reduce(function (prev, line) {
                return Math.max(prev, line.width, minWidth)
            }, 0)

            //the pen position
            var x = 0
            var y = 0
            //var lineHeight = number(opt.lineHeight, fntObj.commonHeight)
            var lineHeight = fntObj.commonHeight;
            var baseline = fntObj.commonBase;
            var descender = lineHeight - baseline
            var letterSpacing = letterSpacing;
            //var height = lineHeight * lines.length - descender
            //var align = this._getAlignType(align)

            //draw text along baseline
            //y -= height

            //the metrics for this text layout
            //this._width = maxLineWidth
            //this._height = height
            //this._descender = lineHeight - baseline
            //this._baseline = baseline
            //this._xHeight = getXHeight(font)
            //this._capHeight = getCapHeight(font)
            //this._lineHeight = lineHeight
            //this._ascender = lineHeight - descender - this._xHeight

            //layout each glyph
            //var self = this

            for (let lineIndex = 0, len = lines.length; lineIndex < len; lineIndex++) {
                let line = lines[lineIndex];
                var start = line.start
                var end = line.end
                var lineWidth = line.width
                var lastGlyph

                //for each glyph in that line...
                for (var i = start; i < end; i++) {
                    var id:number = text.charCodeAt(i);
                    var glyph:FntCharData = this._searchGlyph.getGlyph(fntObj, id);
                    if (glyph) {
                        if (lastGlyph)
                            x += BitmapFontParser.getKerning(fntObj, lastGlyph.id, glyph.id)

                        var tx = x
                        if (align === EFontXAlignment.CENTER)
                            tx += (maxLineWidth - lineWidth) / 2
                else if (align === EFontXAlignment.RIGHT)
                            tx += (maxLineWidth - lineWidth)

                        this._layoutList.addChild({
                            //position: [tx, y],
                            position: [tx + glyph.xOffset, y + glyph.yOffset],
                            data: glyph,
                            index: i,
                            line: lineIndex
                        })

                        //move pen forward
                        x += glyph.xAdvance + letterSpacing
                        lastGlyph = glyph
                    }
                }

                //next line down
                y += lineHeight
                x = 0
            }

            //this._linesTotal = lines.length;

            return this._layoutList;
        }

        private _getFntObj(fntId:string) {
            return LoaderManager.getInstance().get(fntId);
        }

        //private _getImageAsset(bitmapId:string) {
        //    return LoaderManager.getInstance().get(bitmapId);
        //}

        //private _getAlignType(align) {
        //    if (align === 'center')
        //        return ALIGN_CENTER
        //    else if (align === 'right')
        //        return ALIGN_RIGHT
        //    return ALIGN_LEFT
        //}
    }

    export type LayoutCharData = {
        //x:number;
        //y:number;
        //width:number;
        //height:number;
        //index:number;
        //
        ////todo add lineIndex?
        //
        //data:LayoutGlyphData;
        //

        position: Array<number>;
        data: FntCharData;
        index: number;
        line: number;
    };
    //
    //export type Fn = {
    //    startPosX:number;
    //    xAdvance:number;
    //    isNewLine:boolean;
    //    isFullLine:boolean;
    //}
}

