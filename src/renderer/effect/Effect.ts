module wd{
    export abstract class Effect{
        public abstract setEffect(material:Material):void;

        protected getSide(material:Material){
            var scene:SceneDispatcher = Director.getInstance().scene;

            return scene.side ? scene.side : material.side;
        }
    }
}
