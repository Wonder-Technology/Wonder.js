module wd{
    //todo use ui component to draw debug panel!
    export class DebugStatistics{
        public static count = {
            get totalGameObjects(){
                var count = 0;

                Director.getInstance().scene.getChildren().forEach((child:EntityObject) => {
                    if(child.hasComponent(SpacePartition)){
                        count += child.getComponent<SpacePartition>(SpacePartition).getChildren().getCount();
                        return;
                    }

                    count ++;
                });

                return count;
            },

            renderGameObjects:0,
            drawCalls:0
        };

        public static during = {
            get fps(){
                return Director.getInstance().fps;
            }
            //todo compute potential fps?
        };

        private static _startLoopSubscription:wdFrp.IDisposable = null;

        public static clear(){
            this.count.renderGameObjects = 0;
            this.count.drawCalls = 0;
        }

        public static init(){
            var self = this;

            this._startLoopSubscription = EventManager.fromEvent(<any>EngineEvent.STARTLOOP)
            .subscribe(() => {
                if(DebugConfig.showDebugPanel){
                    console.log(`totalGameObjects:${self.count.totalGameObjects}, renderGameObjects:${self.count.renderGameObjects}, drawCalls:${self.count.drawCalls}`);
                    console.log(`fps:${self.during.fps}`);

                    self.clear();
                }
            });
        }

        public static dispose(){
            this._startLoopSubscription.dispose();
        }
    }
}
