module wd{
    const TYPE = {
        ".eot": "embedded-opentype",
        ".ttf": "truetype",
        ".woff": "woff",
        ".svg": "svg"
    };

    declare var document:any;

    @singleton()
    export class FontLoader extends Loader{
        public static getInstance():any {}

        private _familyName:string = null;


        public dispose(){
            super.dispose();

            wdCb.DomQuery.create(`#${this._familyName}`).remove();
        }

        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        protected loadAsset(...args):wdFrp.Stream {
            var familyName = args[1],
                self = this;

            this._familyName = familyName;

            return wdFrp.fromPromise(new RSVP.Promise((resolve, reject) => {
                self._addStyleElement(args, familyName);

                if(document.fonts){
                    document.fonts.load(`1em ${familyName}`).then(function(){
                        resolve();
                    }, function(e){
                        reject(e);
                    });
                }
                else{
                    Log.warn("your browser not support document.fonts api, so it can't ensure that the font is loaded");
                    resolve();
                }
            }));
        }

        @require(function(url:string){
            var extname = wdCb.PathUtils.extname(url).toLowerCase();

            assert(!!TYPE[extname], Log.info.FUNC_UNKNOW(`type:${extname}`));
        })
        private _getType(url:string){
            return TYPE[wdCb.PathUtils.extname(url).toLowerCase()];
        }

        private _addStyleElement(args:any, familyName:string){
            let fontStyleEle:wdCb.DomQuery = wdCb.DomQuery.create(`<style id="${familyName}"></style>`),
                fontStr = null;

            fontStyleEle.prependTo("body");

            fontStr = `@font-face { font-family:${familyName}; src:`;

            //todo verify whether can url be arr
            if (JudgeUtils.isArrayExactly(args[0])) {
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
        }
    }
}

