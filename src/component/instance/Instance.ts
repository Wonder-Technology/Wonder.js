module wd{
    export abstract class Instance extends Component{
        public toRenderInstanceListForDraw:wdCb.Collection<GameObject> = ABSTRACT_ATTRIBUTE;
        public instanceBuffer:InstanceBuffer = ABSTRACT_ATTRIBUTE;

        public abstract hasInstance():boolean;
        public abstract hasInstanceAndHardwareSupport():boolean;
        public abstract hasToRenderInstance():boolean;
        public abstract isInstance():boolean;
        public abstract isInstanceAndHardwareSupport():boolean;
    }
}

