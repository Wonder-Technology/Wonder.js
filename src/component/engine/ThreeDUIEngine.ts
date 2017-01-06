module wd{
    @singleton()
    export class ThreeDUIEngine extends UIEngine{
        public static getInstance():any {}

		private constructor(){super();}

        protected list:wdCb.Collection<ThreeDUI>;
    }
}

