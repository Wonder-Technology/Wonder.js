/// <reference path="../filePath.d.ts"/>
/// <reference path="../filePath.d.ts"/>
module wd{
    const TYPE = {
        ".eot": "embedded-opentype",
        ".ttf": "truetype",
        ".woff": "woff",
        ".svg": "svg"
    };

    export class FontLoader extends Loader{
        private static _instance = null;

        public static getInstance() {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        }

        private _familyName:string = null;


        public dispose(){
            super.dispose();

            wdCb.DomQuery.create(`#${this._familyName}`).remove();
        }

        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        protected loadAsset(...args):wdFrp.Stream {
            var familyName = args[1];

            this._familyName = familyName;

            return wdFrp.callFunc(() => {
                let fontStyleEle:wdCb.DomQuery = wdCb.DomQuery.create(`<style id="${familyName}"></style>`),
                    fontStr = null;

                fontStyleEle.prependTo("body");

                fontStr = "@font-face { font-family:" + familyName + "; src:";

                //todo verify whether can url be arr
                if (JudgeUtils.isArray(args[0])) {
                    let urlArr = args[0];

                    for(let url of urlArr){
                        fontStr += `url('${url}') format('${this._getType(url)}'),`;
                    }

                    fontStr = fontStr.replace(/,$/, ";");
                }
                else{
                    let url = args[0];

                    fontStr += `url('${url}') format('${this._getType(url)}');`;
                }

                fontStyleEle.get(0).textContent += `${fontStr}};`;
            });
        }

        @require(function(url:string){
            var extname = wdCb.PathUtils.extname(url).toLowerCase();

            assert(!!TYPE[extname], Log.info.FUNC_UNKNOW(`type:${extname}`));
        })
        private _getType(url:string){
            return TYPE[wdCb.PathUtils.extname(url).toLowerCase()];
        }
    }
}

