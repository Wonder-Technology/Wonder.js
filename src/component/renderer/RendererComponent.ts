/// <reference path="../../definitions.d.ts"/>
module dy {
    export class RendererComponent extends Component {
        //todo transformDirty?(wozlla)
        //public render(renderer:Renderer, transformDirty:boolean):void {
        public render(renderer:Renderer, geometry:Geometry, camera:GameObject):void {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        }

        public addToGameObject(gameObject:GameObject){
            super.addToGameObject(gameObject);

            dyCb.Log.assert(!gameObject.rendererComponent, "rendererComponent is overwrite");

            gameObject.rendererComponent = this;
        }

        public removeFromGameObject(gameObject:GameObject){
            super.removeFromGameObject(gameObject);

            gameObject.rendererComponent = null;
        }
    }
}

