module wd{
    @singleton()
    export class ThreeDUIEngine extends UIEngine{
        public static getInstance():any {}

        protected list:wdCb.Collection<ThreeDUI>;
    }
}

