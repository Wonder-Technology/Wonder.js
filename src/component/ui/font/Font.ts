/// <reference path="../../../filePath.d.ts"/>
module wd {
    export abstract class Font extends Component {
        public dirty:boolean = true;
        public context:CanvasRenderingContext2D = null;

        public abstract init();
        public abstract update(elapsedTime:number);


        @require(function () {
            assert(this.gameObject.hasComponent(UIRenderer), Log.info.FUNC_SHOULD("gameObject", "contain UIRenderer"))
        })
        protected getContext() {
            var renderer = this.gameObject.getComponent<UIRenderer>(UIRenderer);

            return renderer.context;
        }

        protected getCanvasPosition(){
            return CoordinateUtils.convertWebGLPositionToCanvasPosition(this.gameObject.transform.position);
        }

    }
}

