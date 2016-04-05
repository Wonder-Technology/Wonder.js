module wd{
    export abstract class WebGLState{
        public abstract setEffect(material:Material):void;

        protected getSide(material:Material){
            var scene:SceneDispatcher = Director.getInstance().scene;

            return scene.side ? scene.side : material.side;
        }
    }
}
