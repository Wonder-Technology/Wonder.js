module wd{
    //const NEWLINE = /\n/,
    const NEWLINE_CHAR = '\n',
        WHITESPACE = /\s/;

    export class BitmapFontWordWrapper{
        public static getLines(fntObj:FntData, text:string, searchGlyph:BitmapFontSearchGlyph, {
            letterSpacing,
            width = Number.MAX_VALUE,
            start = 0,
            end = text.length
            }){
            //opt = opt||{}

            //zero width results in nothing visible
            //if (opt.width === 0 && opt.mode !== 'nowrap')
            //    return []

            text = text||''
            //var width = typeof opt.width === 'number' ? opt.width : Number.MAX_VALUE
            //var start = Math.max(0, opt.start||0)
            //var end = typeof opt.end === 'number' ? opt.end : text.length
            //var mode = opt.mode

            //var measure = opt.measure || monospace
            //if (mode === 'pre')
            //    return pre(measure, text, start, end, width)
            //else
            return this._greedy(fntObj, text, letterSpacing, searchGlyph, start, end, width);
        }

        private static _greedy(fntObj:FntData, text:string, letterSpacing:number, searchGlyph:BitmapFontSearchGlyph, start, end, width) {
            //A greedy word wrapper based on LibGDX algorithm
            //https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/BitmapFontCache.java
            var lines = []

            var testWidth = width
            //if 'nowrap' is specified, we only wrap on newline chars
            //if (mode === 'nowrap')
            //    testWidth = Number.MAX_VALUE

            while (start < end && start < text.length) {
                //get next newline position
                var newLine = this._findNewLineIndex(text, NEWLINE_CHAR, start, end)

                //eat whitespace at start of line
                while (start < newLine) {
                    if (!this._isWhitespace( text.charAt(start) ))
                        break
                    start++
                }

                //determine visible # of glyphs for the available width
                var measured = this._computeMetrics(fntObj, text, letterSpacing, searchGlyph, start, newLine, testWidth);

                var lineEnd = start + (measured.end-measured.start)
                var nextStart = lineEnd + NEWLINE_CHAR.length

                //if we had to cut the line before the next newline...
                if (lineEnd < newLine) {
                    //find char to break on
                    while (lineEnd > start) {
                        if (this._isWhitespace(text.charAt(lineEnd)))
                            break
                        lineEnd--
                    }
                    if (lineEnd === start) {
                        if (nextStart > start + NEWLINE_CHAR.length){
                          nextStart--;
                        }

                        lineEnd = nextStart // If no characters to break, show all.
                    } else {
                        nextStart = lineEnd
                        //eat whitespace at end of line
                        while (lineEnd > start) {
                            if (!this._isWhitespace(text.charAt(lineEnd - NEWLINE_CHAR.length)))
                                break
                            lineEnd--
                        }
                    }
                }
                if (lineEnd >= start) {
                    var result = this._computeMetrics(fntObj, text, letterSpacing, searchGlyph, start, lineEnd, testWidth)
                    lines.push(result)
                }
                start = nextStart
            }
            return lines
        }

        private static _computeMetrics(fntObj:FntData, text, letterSpacing, searchGlyph:BitmapFontSearchGlyph, start, end, width) {
            var curPen = 0
            var curWidth = 0
            var count = 0
            var lastGlyph:FntCharData = null;

            if (!fntObj.fontDefDictionary) {
                return {
                    start: start,
                    end: start,
                    width: 0
                }
            }

            end = Math.min(text.length, end)
            for (var i=start; i < end; i++) {
                var id = text.charCodeAt(i);
                var glyph = searchGlyph.getGlyph(fntObj, id);

                if (glyph) {
                    //move pen forward
                    //var xoff = glyph.xOffset
                    var kern = lastGlyph ? BitmapFontParser.getKerning(fntObj, lastGlyph.id, glyph.id) : 0
                    curPen += kern

                    var nextPen = curPen + glyph.xAdvance + letterSpacing
                    var nextWidth = curPen + glyph.rect.width;

                    //we've hit our limit; we can't move onto the next glyph
                    if (nextWidth > width || nextPen > width){
                        if(count === 0){
                            count = 1;
                            curWidth = nextWidth;
                        }
                        break
                    }

                    //otherwise continue along our line
                    curPen = nextPen
                    curWidth = nextWidth
                    lastGlyph = glyph
                }
                count++
            }

            //make sure rightmost edge lines up with rendered glyphs
            if (lastGlyph)
                curWidth += lastGlyph.xOffset;

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
