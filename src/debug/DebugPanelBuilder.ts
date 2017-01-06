module wd{
    export class DebugPanelBuilder{
        public static create() {
        	var obj = new this();

        	return obj;
        }

        private _panel:UIObject = null;
        private _fps:UIObject = null;
        private _totalGameObjects:UIObject = null;
        private _renderGameObjects:UIObject = null;
        private _renderer:UIRenderer = null;

        public createDebugPanel(){
            var renderer = UIRenderer.create();

            renderer.zIndex = 30;

            this._panel = this._createPanel(renderer);
            this._panel.name = "panel";

            this._fps = this._createFont(renderer, Vector2.create(0.2, 0.8), Vector2.create(0.1, 0.3));

            this._totalGameObjects = this._createFont(renderer, Vector2.create(0.2, 0.8), Vector2.create(0.3, 0.6));

            this._renderGameObjects = this._createFont(renderer, Vector2.create(0.2, 0.8), Vector2.create(0.6, 0.9));

            this._renderer = renderer;

            this._panel.addChild(this._fps);
            this._panel.addChild(this._totalGameObjects);
            this._panel.addChild(this._renderGameObjects);

            Director.getInstance().scene.addChild(this._panel);
        }

        public updateDebugInfo(count:DebugStatisticsCountData, during:DebugStatisticsDuringData){
            this._fps.getComponent<PlainFont>(PlainFont).text = `fps:${Math.floor(during.fps)}`;
            this._totalGameObjects.getComponent<PlainFont>(PlainFont).text = `totalGameObjects:${Math.floor(count.totalGameObjects)}`;
            this._renderGameObjects.getComponent<PlainFont>(PlainFont).text = `renderGameObjects:${Math.floor(count.renderGameObjects)}`;
        }

        public show(){
            this._panel.isVisible = true;
        }

        public hide(){
            this._panel.isVisible = false;
        }

        public dispose(){
            this._panel.dispose();

            this._renderer.dispose();
        }

        private _createFont(renderer:UIRenderer, anchorX:Vector2, anchorY:Vector2) {
            var font = PlainFont.create(),
                uiObject = UIObject.create();

            if(bowser.mobile){
                font.fontSize = 30;
            }
            else{
                font.fontSize = 50;
            }

            font.enableFill("yellow");
            font.xAlignment = EFontXAlignment.CENTER;
            font.yAlignment = EFontYAlignment.TOP;

            uiObject.addComponent(font);

            uiObject.addComponent(renderer);

            uiObject.transform.anchorX = anchorX;
            uiObject.transform.anchorY = anchorY;

            return uiObject;
        }

        private _createPanel(renderer:UIRenderer) {
            var view = DeviceManager.getInstance().view,
                uiObject = UIObject.create();

            uiObject.transform.width = view.width;
            uiObject.transform.height = view.height;

            uiObject.addComponent(renderer);

            return uiObject;
        }
    }
}
