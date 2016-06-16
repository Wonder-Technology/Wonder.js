module wd {
    @singleton()
    export class FntLoader extends Loader {
        public static getInstance():any {}

        private _parser:FntParser = FntParser.create();

        protected loadAsset(url:string, id:string):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArrayExactly(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var url = args[0],
                self = this;

            return AjaxLoader.load(url, "text")
                .map((fntStr:string) => {
                    return self._parser.parseFnt(fntStr, url);
                });
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

