module wd {
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
            var fntData:FntData = this._getFntObj(fntId);

            if (!fntData) {
                Log.log("impossible to create font: not find fnt file");

                return ;
            }

            this._searchGlyph.setupSpaceGlyphs(fntData, tabSize);

            let lines = BitmapFontWordWrapper.getLines(fntData, text, this._searchGlyph, {
                    width:width,
                    letterSpacing:letterSpacing,
                }),
                minWidth = width,
                maxLineWidth = null,
                x = 0,
                y = 0,
                lineHeight = fntData.commonHeight,
                baseline = fntData.commonBase;

            this._layoutList.removeAllChildren();

            maxLineWidth = lines.reduce(function (prev, line) {
                return Math.max(prev, line.width, minWidth)
            }, 0);

            for (let lineIndex = 0, len = lines.length; lineIndex < len; lineIndex++) {
                let line = lines[lineIndex],
                    start = line.start,
                    end = line.end,
                    lineWidth = line.width,
                    lastGlyph = null;

                for (let i = start; i < end; i++) {
                    let id:number = text.charCodeAt(i),
                        glyph:FntCharData = this._searchGlyph.getGlyph(fntData, id),
                        tx:number = null;

                    if (glyph) {
                        if (lastGlyph){
                            x += BitmapFontParser.getKerning(fntData, lastGlyph.id, glyph.id);
                        }

                        tx = x

                        if (align === EFontXAlignment.CENTER){
                            tx += (maxLineWidth - lineWidth) / 2;
                        }
                        else if (align === EFontXAlignment.RIGHT){
                            tx += (maxLineWidth - lineWidth);
                        }

                        this._layoutList.addChild({
                            position: [tx + glyph.xOffset, y + glyph.yOffset],
                            data: glyph,
                            index: i,
                            line: lineIndex
                        });

                        x += glyph.xAdvance + letterSpacing;
                        lastGlyph = glyph;
                    }
                }

                y += lineHeight;
                x = 0
            }

            return this._layoutList;
        }

        private _getFntObj(fntId:string) {
            return LoaderManager.getInstance().get(fntId);
        }
    }
}

