module wd {
    export abstract class RendererComponent extends Component {
        public abstract render(renderer:Renderer, target:EntityObject, camera:GameObject);
    }
}

