module wd{
    export abstract class BatchInstanceDrawer extends InstanceDrawer{
        protected abstract sendGLSLData(...args):void;
    }
}

