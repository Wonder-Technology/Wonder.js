/// <reference path="../../../filePath.d.ts"/>
module wd {
    export abstract class Font extends Component {
        public dirty:boolean = true;
        public context:CanvasRenderingContext2D = null;

        public abstract init();
        public abstract update(elapsedTime:number);
    }
}

