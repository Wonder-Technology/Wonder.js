module wd{
    //todo use ui component to draw debug panel!
    export class DebugStatistics{
        public static count = {
            get totalGameObjects(){
                var count = 0;

                Director.getInstance().scene.getChildren().forEach((child:EntityObject) => {
                    if(ClassUtils.hasComponent(child, "SpacePartition")){
                        count += child.getComponent<any>(ClassUtils.getClass("SpacePartition")).getChildren().getCount();
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
        private static _panelBuilder:DebugPanelBuilder = null;
        private static _updateCount:number = 0;

        public static resetData(){
            this.count.renderGameObjects = 0;
            this.count.drawCalls = 0;
        }

        public static init(){
            var self = this;

            this._panelBuilder = DebugPanelBuilder.create();

            if(!DebugConfig.showDebugPanel) {
                return;
            }

            this._panelBuilder.createDebugPanel();

            this._panelBuilder.show();

            this._startLoopSubscription = EventManager.fromEvent(<any>EEngineEvent.STARTLOOP)
            .subscribe(() => {
                self._updateDebugInfo();

                self.resetData();
            });
        }

        public static dispose(){
            this._startLoopSubscription.dispose();

            this._panelBuilder.dispose();
        }

        private static _updateDebugInfo(){
            const UPDATE_RATE = 10;

            if(this._updateCount === UPDATE_RATE){
                this._updateCount = 0;
            }
            else{
                if(this._updateCount === 0){
                    this._panelBuilder.updateDebugInfo(this.count, this.during);
                }

                this._updateCount++;
            }
        }
    }

    export type DebugStatisticsCountData = {
        totalGameObjects:number;
        renderGameObjects:number;
        drawCalls:number
    }

    export type DebugStatisticsDuringData = {
        fps:number;
    }
}
