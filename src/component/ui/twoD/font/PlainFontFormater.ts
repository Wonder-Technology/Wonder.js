module wd{
    const WORD_REX = /([a-zA-Z0-9]+|\S)/,
        FIRST_ENGLISH_OR_NUM = /^[a-zA-Z0-9]/,
        LAST_ENGLISH_OR_NUM = /[a-zA-Z0-9]+$/,
        LAST_INVALID_CHAR = /\s+$/;

    export class PlainFontFormater{
        public static create() {
            var obj = new this();

            return obj;
        }

        private _strArr:Array<string> = null;
        private _context:CanvasRenderingContext2D = null;
        private _fontSize:number = null;
        private _fontFamily:string = null;

        public trimStr(text:string) {
            return text.replace(LAST_INVALID_CHAR, "");
        }

        public formatText(context:CanvasRenderingContext2D, strArr:Array<string>, maxWidth:number, fontSize:number, fontFamily:string) {
            this._strArr = strArr;
            this._context = context;
            this._fontSize = fontSize;
            this._fontFamily = fontFamily;

            for (let i = 0; i < this._strArr.length; i++) {
                let text = this._strArr[i],
                    allWidth = this._measure(text);

                if (allWidth > maxWidth && text.length > 1) {
                    this._formatMultiLine(i, text, allWidth, maxWidth);
                }
            }
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
            return PlainFontUtils.measure(this._context, text, this._fontSize, this._fontFamily);
        }
    }
}

