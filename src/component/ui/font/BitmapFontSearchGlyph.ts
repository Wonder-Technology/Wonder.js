module wd{
    const M_WIDTHS = ['m', 'w'],
        TAB_ID = '\t'.charCodeAt(0),
        SPACE_ID = ' '.charCodeAt(0);

    export class BitmapFontSearchGlyph{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _fallbackSpaceGlyph:FntCharData = null;
        private _fallbackTabGlyph:FntCharData = null;

        public getGlyph(fntObj:FntData, id:number) {
            var glyph = this.getGlyphById(fntObj, id);

            if (glyph){
                return glyph
            }
            else if (id === TAB_ID){
                return this._fallbackTabGlyph;
            }
            else if (id === SPACE_ID){
                return this._fallbackSpaceGlyph;
            }

            return null
        }

        public getGlyphById(fntObj:FntData, id:number):FntCharData {
            var dict = this._getFontDefDictionary(fntObj);

            if (!dict) {
                return null;
            }

            return dict[String(id)];
        }

        public setupSpaceGlyphs(fntObj:FntData, tabSize:number) {
            if (!this._getFontDefDictionary(fntObj)) {
                return
            }

            //try to get space glyph
            //then fall back to the 'm' or 'w' glyphs
            //then fall back to the first glyph available
            let space:FntCharData = this.getGlyphById(fntObj, SPACE_ID)
                || this._getMGlyph(fntObj)
                || this._getFirstGlyph(fntObj),
             tabWidth = tabSize * space.xAdvance;

            this._fallbackSpaceGlyph = space;


            this._fallbackTabGlyph = {
                id:String(TAB_ID),
                page:0,

                rect: {
                    x: 0, y: 0, width: 0, height: 0
                },
                xOffset: 0,
                yOffset: 0,
                xAdvance: tabWidth
            };
        }

        private _getMGlyph(fntObj:FntData) {
            var glyph = null;

            for (let i = 0; i < M_WIDTHS.length; i++) {
                let id = M_WIDTHS[i].charCodeAt(0),
                glyph = this.getGlyphById(fntObj, id);

                if (glyph) {
                    break;
                }
            }

            return glyph;
        }

        private _getFirstGlyph(fntObj:FntData) {
            var fontDefDictionary = this._getFontDefDictionary(fntObj),
                result = null;

            for (let charData in fontDefDictionary) {
                result = fontDefDictionary[charData];

                break;
            }

            return result;
        }

        private _getFontDefDictionary(fntObj:FntData){
            return fntObj.fontDefDictionary;
        }
    }
}
