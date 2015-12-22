/// <reference path="../../../filePath.d.ts"/>
module wd {
    export abstract class Font extends Component {
        public abstract init();
        public abstract update(time:number);
    }
}

