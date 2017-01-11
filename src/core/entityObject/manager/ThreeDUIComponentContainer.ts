module wd{
    @singleton()
    export class ThreeDUIComponentContainer extends UIComponentContainer{
        public static getInstance():any {}

		private constructor(){super();}

        protected list:wdCb.Collection<ThreeDUI>;
    }
}

