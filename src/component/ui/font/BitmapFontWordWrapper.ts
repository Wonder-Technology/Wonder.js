module wd{
    const NEWLINE_CHAR = '\n',
        WHITESPACE = /\s/;

    export class BitmapFontWordWrapper{
        public static getLines(fntObj:FntData, text:string, searchGlyph:BitmapFontSearchGlyph, {
            letterSpacing,
            width = Number.MAX_VALUE,
            start = 0,
            end = text.length
            }){
            return this._greedy(fntObj, text, letterSpacing, searchGlyph, start, end, width);
        }

        private static _greedy(fntObj:FntData, text:string, letterSpacing:number, searchGlyph:BitmapFontSearchGlyph, start, end, width) {
            //A greedy word wrapper based on LibGDX algorithm
            //https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/BitmapFontCache.java
            var lines = [],
                testWidth = width;

            while (start < end && start < text.length) {
                //get next newline position
                let newLine = this._findNewLineIndex(text, NEWLINE_CHAR, start, end);

                //eat whitespace at start of line
                while (start < newLine) {
                    if (!this._isWhitespace( text.charAt(start) )){
                        break;
                    }

                    start++;
                }

                //determine visible # of glyphs for the available width
                let measured = this._computeMetrics(fntObj, text, letterSpacing, searchGlyph, start, newLine, testWidth),
                    lineEnd = start + (measured.end-measured.start),
                    nextStart = lineEnd + NEWLINE_CHAR.length;

                //if we had to cut the line before the next newline...
                if (lineEnd < newLine) {
                    //find char to break on
                    while (lineEnd > start) {
                        if (this._isWhitespace(text.charAt(lineEnd))){
                            break;
                        }

                        lineEnd--
                    }

                    if (lineEnd === start) {
                        if (nextStart > start + NEWLINE_CHAR.length){
                            nextStart--;
                        }

// If no characters to break, show all.
                        lineEnd = nextStart ;
                    }
                    else {
                        nextStart = lineEnd;

                        //eat whitespace at end of line
                        while (lineEnd > start) {
                            if (!this._isWhitespace(text.charAt(lineEnd - NEWLINE_CHAR.length))){
                                break;
                            }

                            lineEnd--;
                        }
                    }
                }

                if (lineEnd >= start) {
                    lines.push(this._computeMetrics(fntObj, text, letterSpacing, searchGlyph, start, lineEnd, testWidth));
                }

                start = nextStart
            }
            return lines
        }

        private static _computeMetrics(fntObj:FntData, text, letterSpacing, searchGlyph:BitmapFontSearchGlyph, start, end, width) {
            var curPen = 0,
                curWidth = 0,
                count = 0,
                lastGlyph:FntCharData = null;

            if (!fntObj.fontDefDictionary) {
                return {
                    start: start,
                    end: start,
                    width: 0
                }
            }

            end = Math.min(text.length, end)
            for (let i=start; i < end; i++) {
                let id = text.charCodeAt(i),
                    glyph = searchGlyph.getGlyph(fntObj, id);

                if (glyph) {
                    let kern = lastGlyph ? BitmapFontParser.getKerning(fntObj, lastGlyph.id, glyph.id) : 0,
                        nextPen = null,
                        nextWidth = null;

                    curPen += kern;

                    nextPen = curPen + glyph.xAdvance + letterSpacing;
                    nextWidth = curPen + glyph.rect.width;

                    //we've hit our limit; we can't move onto the next glyph
                    if (nextWidth > width || nextPen > width){
                        if(count === 0){
                            count = 1;
                            curWidth = nextWidth;
                        }

                        break
                    }

                    //otherwise continue along our line
                    curPen = nextPen;
                    curWidth = nextWidth;
                    lastGlyph = glyph;
                }

                count++
            }

            //make sure rightmost edge lines up with rendered glyphs
            if (lastGlyph){
                curWidth += lastGlyph.xOffset;
            }

            return {
                start: start,
                end: start + count,
                width: curWidth
            }
        }

        private static _findNewLineIndex(text, chr, start, end){
            var idx = text.indexOf(chr, start);

            if (idx === -1 || idx > end){
                return end;
            }

            return idx;
        }

        private static _isWhitespace(chr) {
            return WHITESPACE.test(chr);
        }
    }
}
