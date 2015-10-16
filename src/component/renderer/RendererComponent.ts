/// <reference path="../../definitions.d.ts"/>
module dy {
    export abstract class RendererComponent extends Component {
        //todo transformDirty?(wozlla)
        //public render(renderer:Renderer, transformDirty:boolean):void {
        public abstract render(renderer:Renderer, geometry:Geometry, camera:GameObject);

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            Log.assert(!gameObject.rendererComponent, "rendererComponent is overwrite");

            gameObject.rendererComponent = this;
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

            gameObject.rendererComponent = null;
        }
    }
}

