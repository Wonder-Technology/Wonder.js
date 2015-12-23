/// <reference path="../filePath.d.ts"/>
module wd {
    const INFO_EXP = /info [^\n]*(\n|$)/gi,
        COMMON_EXP = /common [^\n]*(\n|$)/gi,
        PAGE_EXP = /page [^\n]*(\n|$)/gi,
        CHAR_EXP = /char [^\n]*(\n|$)/gi,
        //KERNING_EXP = /kerning [^\n]*(\n|$)/gi,
        ITEM_EXP = /\w+=[^ \r\n]+/gi,
        INT_EXP = /^[\-]?\d+$/;       //"-"?

    export class FntLoader extends Loader {
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }


        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArray(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var url = args[0],
                self = this;

            return AjaxLoader.load(url, "text")
                .map((fntStr:string) => {
                    return self._parseFnt(fntStr, url);
                });
        }

        private _parseFnt(fntStr:string, url:string) {
            /*!
             xAdvance:绘制完当前字后，光标向后移多少像素以绘制下一个字
             xOffset:当前字在绘制时的像素偏移横向位置
             yOffset:当前字在绘制时的像素偏移纵向位置
             */


            var self = this,
                fnt = <FntData>{};

            //padding
            var infoObj = this._parseStrToObj(fntStr.match(INFO_EXP)[0]);
            var paddingArr = infoObj["padding"].split(",");
            var padding = {
                left: parseInt(paddingArr[0]),
                top: parseInt(paddingArr[1]),
                right: parseInt(paddingArr[2]),
                bottom: parseInt(paddingArr[3])
            };

            //common
            var commonObj = self._parseStrToObj(fntStr.match(COMMON_EXP)[0]);
            fnt.commonHeight = commonObj["lineHeight"];
//        if (cc._renderType === cc._RENDER_TYPE_WEBGL) {
//            var texSize = cc.configuration.getMaxTextureSize();
//            if (commonObj["scaleW"] > texSize.width || commonObj["scaleH"] > texSize.height)
//                cc.log("cc.LabelBMFont._parseCommonArguments(): page can't be larger than supported");
//        }


//下面的Texture用来设置纹理贴图的总大小，
// 当改大小不足以装下所有字符时，
// 会使用分页的方式来实现，即一个fnt文件对应多张png纹理图。

            if (commonObj["pages"] !== 1) {
                Log.log("only supports 1 page");
            }

            //page
            var pageObj = self._parseStrToObj(fntStr.match(PAGE_EXP)[0]);
            if (pageObj["id"] !== 0) {
                Log.log("file could not be found");
            }

            fnt.atlasName = wdCb.PathUtils.changeBasename(url, <string>pageObj["file"]);

            //char
            var charLines = fntStr.match(CHAR_EXP);
            fnt.fontDefDictionary = <any>{};
            var fontDefDictionary = fnt.fontDefDictionary;

            for (let char of charLines) {
                var charObj = self._parseStrToObj(char);
                var charId = charObj["id"];
                fontDefDictionary[charId] = {
                    rect: {x: charObj["x"], y: charObj["y"], width: charObj["width"], height: charObj["height"]},
                    xOffset: charObj["xoffset"],
                    yOffset: charObj["yoffset"],

                    //xadvance等于字符纹理宽度
                    xAdvance: charObj["xadvance"]
                };
            }

            //todo 待研究 kerning
//        http://www.blueidea.com/design/doc/2007/5160.asp

            //kerning
//        var kerningDict = fnt.kerningDict = {};
//        var kerningLines = fntStr.match(self.KERNING_EXP);
//        if (kerningLines) {
//            for (var i = 0, li = kerningLines.length; i < li; i++) {
//                var kerningObj = self._parseStrToObj(kerningLines[i]);
//                kerningDict[(kerningObj["first"] << 16) | (kerningObj["second"] & 0xffff)] = kerningObj["amount"];
//            }
//        }
            return fnt;
        }

        private _parseStrToObj(str) {
            var arr = str.match(ITEM_EXP),
                obj = <any>{};

            if (arr) {
                for (let tempStr of arr) {
                    let index = tempStr.indexOf("="),
                        key = tempStr.substring(0, index),
                        value:any = tempStr.substring(index + 1);
                    if (value.match(INT_EXP)) {
                        value = parseInt(value);
                    }
                    else if (value[0] == '"') {
                        value = value.substring(1, value.length - 1);
                    }
                    obj[key] = value;
                }
            }
            return obj;
        }
    }

    export type FntData = {
        commonHeight:number,
        atlasName:string,
        fontDefDictionary: {
            [charId:string]:{
                rect: {x: number, y: number, width: number, height: number},
                xOffset: number,
                yOffset: number,

                //xadvance等于字符纹理宽度
                xAdvance: number
            }
        }
    }
}

