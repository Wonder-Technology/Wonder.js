module wd{
    export abstract class Instance extends Component{
        public toRenderInstanceListForDraw:wdCb.Collection<GameObject> = ABSTRACT_ATTRIBUTE;
        public instanceBuffer:InstanceBuffer = ABSTRACT_ATTRIBUTE;
    }
}

