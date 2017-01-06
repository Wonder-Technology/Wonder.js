module wd{
    @singleton()
    export class JSONLoader extends Loader{
        public static getInstance():any {}

		private constructor(){super();}

        protected loadAsset(url:string, id:string, config:AssetConfigData):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string, config:AssetConfigData):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArrayExactly(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var url = args[0];

            return AjaxLoader.load(url, "json");
        }
    }
}
