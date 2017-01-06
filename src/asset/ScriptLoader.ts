module wd{
    @singleton()
    export class ScriptLoader extends Loader{
        public static getInstance():any {}

		private constructor(){super();}

        protected loadAsset(url:string, id:string, config:AssetConfigData):wdFrp.Stream;
        protected loadAsset(url:Array<string>, id:string, config:AssetConfigData):wdFrp.Stream;

        @require(function (...args) {
            assert(!JudgeUtils.isArrayExactly(args[0]), Log.info.FUNC_MUST_BE("url", "string"));
        })
        protected loadAsset(...args):wdFrp.Stream {
            var self = this,
                url = args[0],
                id = args[1];

            return JsLoader.getInstance().load(url, id)
                .map(() => {
                    return Script.scriptList.pop();
                });
        }
    }
}
