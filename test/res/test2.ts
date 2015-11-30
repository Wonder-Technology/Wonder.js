@wd.script("test2")
export class Test2{
    constructor(gameObject) {
        this.gameObject = gameObject;
    }

    public gameObject = null;

    public init(){
    }

    public update(time) {
        this.gameObject.script.getChild("test").update(time);
    }

    public onEnter() {
    }

    public onStartLoop() {
    }

    public onEndLoop() {
    }

    public onExit() {
    }
}
