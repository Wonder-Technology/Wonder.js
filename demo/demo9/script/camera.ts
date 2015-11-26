/// <reference path="../../../dist/dy.d.ts"/>
module sample{
    @dy.script("camera")
    export class Camera implements dy.IScriptBehavior{
        constructor(gameObject:dy.GameObject){
            this._gameObject = gameObject;
        }

        private _gameObject:dy.GameObject = null;

        public init() {
            var scene = dy.Director.getInstance().scene.script.getChild("scene"),
                cameraComponent = <dy.PerspectiveCamera>this._gameObject.getComponent<dy.CameraController>(dy.CameraController).camera;

            console.log(`sceneScript.state is ${scene.state}`);
            console.log(`camera->fovy is ${cameraComponent.fovy}`);
        }
    }
}
