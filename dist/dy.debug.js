/// <reference path="../definitions.d.ts"/>
var dyRt;
(function (dyRt) {
    dyRt.fromCollection = function (collection, scheduler) {
        if (scheduler === void 0) { scheduler = dyRt.Scheduler.create(); }
        var arr = collection.toArray();
        return arr.length === 0 ? dyRt.empty() : dyRt.fromArray(arr, scheduler);
    };
})(dyRt || (dyRt = {}));

var dy;
(function (dy) {
    var Entity = (function () {
        function Entity() {
            this._uid = null;
            this._uid = Entity._count;
            Entity._count += 1;
        }
        Object.defineProperty(Entity.prototype, "uid", {
            get: function () {
                return this._uid;
            },
            enumerable: true,
            configurable: true
        });
        Entity._count = 1;
        return Entity;
    })();
    dy.Entity = Entity;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Component = (function (_super) {
        __extends(Component, _super);
        function Component() {
            _super.apply(this, arguments);
            this._gameObject = null;
        }
        Object.defineProperty(Component.prototype, "gameObject", {
            get: function () {
                return this._gameObject;
            },
            set: function (gameObject) {
                this._gameObject = gameObject;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Component.prototype, "transform", {
            get: function () {
                if (!this._gameObject) {
                    return null;
                }
                return this._gameObject.transform;
            },
            enumerable: true,
            configurable: true
        });
        Component.prototype.init = function () {
        };
        return Component;
    })(dy.Entity);
    dy.Component = Component;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Transform = (function (_super) {
        __extends(Transform, _super);
        function Transform(gameObject) {
            _super.call(this);
            this._localToParentMatrix = dy.Matrix.create();
            this._localToWorldMatrix = null;
            this._parent = null;
            this._position = dy.Vector3.create();
            this._rotation = dy.Quaternion.create(0, 0, 0, 1);
            this._scale = dy.Vector3.create(1, 1, 1);
            this._eulerAngles = null;
            this._localPosition = dy.Vector3.create(0, 0, 0);
            this._localRotation = dy.Quaternion.create(0, 0, 0, 1);
            this._localEulerAngles = null;
            this._localScale = dy.Vector3.create(1, 1, 1);
            this._dirtyWorld = null;
            this._dirtyLocal = true;
            this._children = dyCb.Collection.create();
            this._gameObject = null;
            this._gameObject = gameObject;
        }
        Transform.create = function (gameObject) {
            var obj = new this(gameObject);
            return obj;
        };
        Object.defineProperty(Transform.prototype, "localToParentMatrix", {
            get: function () {
                if (this._dirtyLocal) {
                    this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);
                    this._dirtyLocal = false;
                    this._dirtyWorld = true;
                }
                return this.localToParentMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localToWorldMatrix", {
            get: function () {
                var syncList = dyCb.Collection.create(), current = this;
                while (current !== null) {
                    syncList.addChild(current);
                    current = current.parent;
                }
                syncList.reverse().forEach(function (transform) {
                    transform.sync();
                });
                return this._localToWorldMatrix;
            },
            set: function (localToWorldMatrix) {
                this._localToWorldMatrix = localToWorldMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (parent) {
                if (this._parent) {
                    this._parent.removeChild(this);
                }
                if (!parent) {
                    this._parent = null;
                    return;
                }
                this._parent = parent;
                this._parent.addChild(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "position", {
            get: function () {
                this._position = this.localToWorldMatrix.getTranslation();
                return this._position;
            },
            set: function (position) {
                if (this._parent === null) {
                    this._localPosition = position.copy();
                }
                else {
                    this._localPosition = this._parent.localToWorldMatrix.copy().invert().multiplyVector3(position);
                }
                this._dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "rotation", {
            get: function () {
                this._rotation.setFromMatrix(this.localToWorldMatrix);
                return this._rotation;
            },
            set: function (rotation) {
                if (this._parent === null) {
                    this._localRotation = rotation.copy();
                }
                else {
                    this._localRotation = this._parent.rotation.copy().invert().multiply(rotation);
                }
                this._dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "scale", {
            get: function () {
                this._scale = this.localToWorldMatrix.getScale();
                return this._scale;
            },
            set: function (scale) {
                if (this._parent === null) {
                    this._localScale = scale.copy();
                }
                else {
                    this._localScale = this._parent.localToWorldMatrix.copy().invert().multiplyVector3(scale);
                }
                this._dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "eulerAngles", {
            get: function () {
                this._eulerAngles = this.localToWorldMatrix.getEulerAngles();
                return this._eulerAngles;
            },
            set: function (eulerAngles) {
                this._localRotation.setFromEulerAngles(eulerAngles);
                if (this._parent !== null) {
                    this._localRotation = this._parent.rotation.copy().invert().multiply(this._localRotation);
                }
                this._dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localPosition", {
            get: function () {
                return this._localPosition;
            },
            set: function (position) {
                this._localPosition = position.copy();
                this._dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localRotation", {
            get: function () {
                return this._localRotation;
            },
            set: function (rotation) {
                this._localRotation = rotation.copy();
                this._dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localEulerAngles", {
            get: function () {
                this._localEulerAngles = this._localRotation.getEulerAngles();
                return this._localEulerAngles;
            },
            set: function (localEulerAngles) {
                this._localRotation.setFromEulerAngles(localEulerAngles);
                this._dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "localScale", {
            get: function () {
                return this._localScale;
            },
            set: function (scale) {
                this._localScale = scale.copy();
                this._dirtyLocal = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "up", {
            get: function () {
                return this.localToWorldMatrix.getY().normalize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "right", {
            get: function () {
                return this.localToWorldMatrix.getX().normalize();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "forward", {
            get: function () {
                return this.localToWorldMatrix.getZ().normalize().scale(-1);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Transform.prototype, "dirtyWorld", {
            get: function () {
                return this._dirtyWorld;
            },
            set: function (dirtyWorld) {
                this._dirtyWorld = dirtyWorld;
            },
            enumerable: true,
            configurable: true
        });
        Transform.prototype.addChild = function (child) {
            this._children.addChild(child);
        };
        Transform.prototype.removeChild = function (child) {
            this._children.removeChild(child);
        };
        Transform.prototype.sync = function () {
            if (this._dirtyLocal) {
                this._localToParentMatrix.setTRS(this._localPosition, this._localRotation, this._localScale);
                this._dirtyLocal = false;
                this._dirtyWorld = true;
            }
            if (this._dirtyWorld) {
                if (this._parent === null) {
                    this._localToWorldMatrix = this._localToParentMatrix.copy();
                }
                else {
                    this._localToWorldMatrix = this._parent.localToWorldMatrix.copy().multiply(this._localToParentMatrix);
                }
                this._dirtyWorld = false;
                this._children.forEach(function (child) {
                    child.dirtyWorld = true;
                });
            }
        };
        Transform.prototype.translateLocal = function (translation) {
            this._localPosition = this._localPosition.add(this._localRotation.multiplyVector3(translation));
            this._dirtyLocal = true;
        };
        Transform.prototype.translate = function (translation) {
            this.position = translation.add(this.position);
        };
        Transform.prototype.rotate = function (eulerAngles) {
            var quaternion = dy.Quaternion.create();
            quaternion.setFromEulerAngles(eulerAngles);
            if (this._parent === null) {
                this._localRotation = quaternion.multiply(this._localRotation);
            }
            else {
                quaternion = this._parent.rotation.copy().invert().multiply(quaternion);
                this._localRotation = quaternion.multiply(this.rotation);
            }
            this._dirtyLocal = true;
        };
        Transform.prototype.rotateLocal = function (eulerAngles) {
            var quaternion = dy.Quaternion.create();
            quaternion.setFromEulerAngles(eulerAngles);
            this._localRotation.multiply(quaternion);
            this._dirtyLocal = true;
        };
        Transform.prototype.rotateAround = function (angle, center, axis) {
            var rot = dy.Quaternion.create().setFromAxisAngle(angle, axis), dir = this.position.copy().sub(center);
            dir = rot.multiplyVector3(dir);
            this.position = center.add(dir);
            this.rotation = rot.multiply(this.rotation);
        };
        Transform.prototype.lookAt = function (args) {
            var target = arguments[0], up = null;
            if (arguments.length === 1) {
                up = dy.Vector3.up;
            }
            else if (arguments.length === 2) {
                up = arguments[1];
            }
            this.rotation = dy.Quaternion.create().setFromMatrix(dy.Matrix.create().setLookAt(this.position, target, up));
        };
        return Transform;
    })(dy.Entity);
    dy.Transform = Transform;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject() {
            _super.apply(this, arguments);
            this._parent = null;
            this._bubbleParent = null;
            this._transform = dy.Transform.create(this);
            this._renderer = null;
            this._name = "gameObject" + String(this.uid);
            this._script = dyCb.Hash.create();
            this._scriptStreams = dyCb.Collection.create();
            this._collider = null;
            this._children = dyCb.Collection.create();
            this._components = dyCb.Collection.create();
            this._actionManager = dy.ActionManager.create();
        }
        GameObject.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var obj = new this();
            return obj;
        };
        Object.defineProperty(GameObject.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            set: function (parent) {
                this._parent = parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "bubbleParent", {
            get: function () {
                return this._bubbleParent;
            },
            set: function (bubbleParent) {
                this._bubbleParent = bubbleParent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "transform", {
            get: function () {
                return this._transform;
            },
            set: function (transform) {
                this._transform = transform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            set: function (renderer) {
                this._renderer = renderer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "script", {
            get: function () {
                return this._script;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "scriptStreams", {
            get: function () {
                return dyRt.fromCollection(this._scriptStreams).mergeAll();
            },
            enumerable: true,
            configurable: true
        });
        GameObject.prototype.init = function () {
            this._execScript("init");
        };
        GameObject.prototype.onEnter = function () {
            this._execScript("onEnter");
        };
        GameObject.prototype.onStartLoop = function () {
            this._execScript("onStartLoop");
        };
        GameObject.prototype.onEndLoop = function () {
            this._execScript("onEndLoop");
        };
        GameObject.prototype.onExit = function () {
            this._execScript("onExit");
        };
        GameObject.prototype.dispose = function () {
            this.onExit();
            if (this._parent) {
                this._parent.removeChild(this);
                this._parent = null;
            }
            dy.EventManager.off(this);
        };
        GameObject.prototype.hasChild = function (child) {
            return this._children.hasChild(child);
        };
        GameObject.prototype.addChild = function (child) {
            //need user judge it!
            //if(this._children.hasChild(child)) {
            //    return false;
            //}
            if (child.parent) {
                child.parent.removeChild(child);
            }
            child.parent = this;
            child.transform.parent = this.transform.parent;
            this._children.addChild(child);
            /*!
            sort when add child/children, not when get children.
            because each loop will get children(to render), so if using the latter, each loop should sort!
             */
            this.sort();
            return this;
        };
        GameObject.prototype.getChildren = function () {
            return this._children;
        };
        GameObject.prototype.sort = function () {
            this._children.sort(this._ascendZ);
            return this;
        };
        GameObject.prototype.forEach = function (func) {
            this._children.forEach(func);
            return this;
        };
        GameObject.prototype.removeChild = function (child) {
            this._children.removeChild(child);
            child.parent = null;
            child.dispose();
            return this;
        };
        GameObject.prototype.getTopUnderPoint = function (point) {
            //var found, localP, child;
            //var childrenArr;
            //if(!this._active || !this._visible) return null;
            //if(this._interactiveRect) {
            //    localP = this.transform.globalToLocal(x, y);
            //    if(!this._interactiveRect.containsXY(localP.x, localP.y)) {
            //        return null;
            //    }
            //}
            //childrenArr = this._children;
            //if(childrenArr.length > 0) {
            //    for(var i=childrenArr.length-1; i>=0; i--) {
            //        child = childrenArr[i];
            //        found = child.getUnderPoint(x, y, touchable);
            //        if(found) {
            //            return found;
            //        }
            //    }
            //}
            //
            //if(!touchable || this._touchable) {
            //    if(!localP) {
            //        localP = this.transform.globalToLocal(x, y);
            //    }
            //    if(this.testHit(localP.x, localP.y)) {
            //        return this;
            //    }
            //}
            //return null;
            var result = null;
            this._children.copy().reverse().forEach(function (child) {
                result = child.getTopUnderPoint(point);
                if (result) {
                    return dyCb.$BREAK;
                }
            });
            if (result) {
                return result;
            }
            if (this.isHit(point)) {
                return this;
            }
            return null;
        };
        GameObject.prototype.isHit = function (locationInView) {
            return this._collider ? this._collider.collideXY(locationInView.x, locationInView.y) : false;
        };
        GameObject.prototype.hasComponent = function (args) {
            if (arguments[0] instanceof dy.Component) {
                var component = arguments[0];
                return this._components.hasChild(component);
            }
            else {
                var _class = arguments[0];
                return this._components.hasChild(function (component) {
                    return component instanceof _class;
                });
            }
        };
        GameObject.prototype.getComponent = function (_class) {
            return this._components.filter(function (component) {
                return component instanceof _class;
            }).getChild(0);
        };
        GameObject.prototype.addComponent = function (component) {
            var Log = dyCb.Log;
            if (this.hasComponent(component)) {
                Log.assert(false, "the component already exist");
                return this;
            }
            if (component.gameObject) {
                component.gameObject.removeComponent(component);
            }
            component.gameObject = this;
            this._components.addChild(component);
            component.init();
            if (component instanceof dy.Action) {
                var action = component;
                action.target = this;
                this._actionManager.addChild(action);
            }
            else if (component instanceof dy.Renderer) {
                Log.assert(!this._renderer, "renderer is overwrite");
                this._renderer = component;
            }
            else if (component instanceof dy.Collider) {
                Log.assert(!this._renderer, "collider is overwrite");
                this._collider = component;
            }
            else if (component instanceof dy.Script) {
                var script = component, self_1 = this;
                this._scriptStreams.addChild(script.createLoadJsStream()
                    .do(function (data) {
                    self_1._script.addChild(data.name, new data.class(self_1));
                }));
            }
            return this;
        };
        GameObject.prototype.removeComponent = function (component) {
            this._components.removeChild(component);
            if (component instanceof dy.Action) {
                this._actionManager.removeChild(component);
            }
            else if (component instanceof dy.Renderer) {
                this._renderer = null;
            }
            else if (component instanceof dy.Collider) {
                this._collider = null;
            }
            component.gameObject = null;
            return this;
        };
        GameObject.prototype.render = function (renderer, camera) {
            //var i, len;
            //if(!this._active || !this._initialized || this._destroyed) {
            //    if(transformDirty) {
            //        this._transform.dirty = true;
            //    }
            //    return;
            //}
            //if(this._transform.dirty) {
            //    transformDirty = transformDirty || this._transform.dirty;
            //}
            //if(transformDirty) {
            //    if(this._transform instanceof RectTransform) {
            //        this._transform.transform(this._stage.viewRectTransform, parentTransform);
            //    } else {
            //        this._transform.transform(this._stage.rootTransform, parentTransform);
            //    }
            //}
            //
            //if(!this._visible) {
            //    visibleFlag = visibleFlag && this._visible;
            //}
            //
            //if(visibleFlag) {
            //    this.render(renderer, transformDirty);
            //}
            //
            //for(i=0,len=this._children.length; i<len; i++) {
            //    this._children[i].visit(renderer, this._transform, transformDirty, visibleFlag);
            //}
            this._renderer && this._renderer.render(renderer, this.getComponent(dy.Geometry), camera);
            this._children.forEach(function (child) {
                child.render(renderer, camera);
            });
        };
        GameObject.prototype.update = function (time) {
            this._actionManager.update(time);
            this._children.forEach(function (child) {
                child.update(time);
            });
            this._execScript("update", time);
        };
        GameObject.prototype._ascendZ = function (a, b) {
            return b.transform.position.z - a.transform.position.z;
        };
        GameObject.prototype._execScript = function (method, arg) {
            this._script.forEach(function (script) {
                script[method] && (arg ? script[method](arg) : script[method]());
            });
        };
        return GameObject;
    })(dy.Entity);
    dy.GameObject = GameObject;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Stage = (function (_super) {
        __extends(Stage, _super);
        function Stage() {
            _super.apply(this, arguments);
            this.program = null;
            this._camera = null;
        }
        Stage.create = function () {
            var obj = new this();
            return obj;
        };
        Stage.prototype.init = function () {
            _super.prototype.init.call(this);
            this.program = dy.render.Program.create();
            this.addComponent(dy.TopCollider.create());
            this.forEach(function (child) {
                child.init();
            });
        };
        Stage.prototype.addChild = function (child) {
            if (this._isCamera(child)) {
                this._camera = child;
            }
            return _super.prototype.addChild.call(this, child);
        };
        Stage.prototype.render = function (renderer) {
            dyCb.Log.error(!this._camera, "stage must add camera");
            _super.prototype.render.call(this, renderer, this._camera);
        };
        Stage.prototype.onEnter = function () {
            _super.prototype.onEnter.call(this);
            this.forEach(function (child) {
                child.onEnter();
            });
        };
        Stage.prototype.onStartLoop = function () {
            _super.prototype.onStartLoop.call(this);
            this.forEach(function (child) {
                child.onStartLoop();
            });
        };
        Stage.prototype.onEndLoop = function () {
            _super.prototype.onEndLoop.call(this);
            this.forEach(function (child) {
                child.onEndLoop();
            });
        };
        Stage.prototype._isCamera = function (child) {
            return child.hasComponent(dy.Camera);
        };
        return Stage;
    })(dy.GameObject);
    dy.Stage = Stage;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Scheduler = (function () {
        function Scheduler() {
            this._scheduleCount = 0;
            this._schedules = dyCb.Hash.create();
        }
        Scheduler.create = function () {
            var obj = new this();
            return obj;
        };
        Scheduler.prototype.update = function (time) {
            var _this = this;
            this._schedules.forEach(function (scheduleItem, scheduleId) {
                if (scheduleItem.isStop || scheduleItem.isPause) {
                    return;
                }
                scheduleItem.update(time);
                if (scheduleItem.isFinish) {
                    _this.remove(scheduleId);
                }
            });
        };
        Scheduler.prototype.scheduleLoop = function (task, args) {
            if (args === void 0) { args = []; }
            return this._schedule(LoopScheduleItem, Array.prototype.slice.call(arguments, 0));
        };
        Scheduler.prototype.scheduleFrame = function (task, frame, args) {
            if (frame === void 0) { frame = 1; }
            return this._schedule(FrameScheduleItem, Array.prototype.slice.call(arguments, 0));
        };
        Scheduler.prototype.scheduleInterval = function (task, time, args) {
            if (time === void 0) { time = 0; }
            return this._schedule(IntervalScheduleItem, Array.prototype.slice.call(arguments, 0));
        };
        Scheduler.prototype.scheduleTime = function (task, time, args) {
            if (time === void 0) { time = 0; }
            return this._schedule(TimeScheduleItem, Array.prototype.slice.call(arguments, 0));
        };
        Scheduler.prototype.pause = function (scheduleId) {
            if (arguments.length === 0) {
                var self_1 = this;
                this._schedules.forEach(function (scheduleItem, scheduleId) {
                    self_1.pause(scheduleId);
                });
            }
            else if (arguments.length === 1) {
                var scheduleItem = this._schedules.getChild(arguments[0]);
                scheduleItem.pause();
            }
        };
        Scheduler.prototype.resume = function (scheduleId) {
            if (arguments.length === 0) {
                var self_2 = this;
                this._schedules.forEach(function (scheduleItem, scheduleId) {
                    self_2.resume(scheduleId);
                });
            }
            else if (arguments.length === 1) {
                var scheduleItem = this._schedules.getChild(arguments[0]);
                scheduleItem.resume();
            }
        };
        Scheduler.prototype.start = function (scheduleId) {
            if (arguments.length === 0) {
                var self_3 = this;
                this._schedules.forEach(function (scheduleItem, scheduleId) {
                    self_3.start(scheduleId);
                });
            }
            else if (arguments.length === 1) {
                var scheduleItem = this._schedules.getChild(arguments[0]);
                scheduleItem.start();
            }
        };
        Scheduler.prototype.stop = function (scheduleId) {
            if (arguments.length === 0) {
                var self_4 = this;
                this._schedules.forEach(function (scheduleItem, scheduleId) {
                    self_4.stop(scheduleId);
                });
            }
            else if (arguments.length === 1) {
                var scheduleItem = this._schedules.getChild(arguments[0]);
                scheduleItem.stop();
            }
        };
        Scheduler.prototype.has = function (scheduleId) {
            return !!this._schedules.hasChild(scheduleId);
        };
        Scheduler.prototype.remove = function (scheduleId) {
            this._schedules.removeChild(scheduleId);
        };
        Scheduler.prototype.removeAll = function () {
            this._schedules.removeAllChildren();
        };
        Scheduler.prototype._schedule = function (_class, args) {
            var scheduleId = this._buildId();
            this._schedules.setValue(scheduleId, _class.create.apply(_class, args));
            return scheduleId;
        };
        Scheduler.prototype._buildId = function () {
            return 'Schedule_' + (this._scheduleCount++);
        };
        return Scheduler;
    })();
    dy.Scheduler = Scheduler;
    var ScheduleItem = (function () {
        function ScheduleItem(task, args) {
            this.isPause = false;
            this.isStop = false;
            this.pauseTime = null;
            this.pauseElapsed = null;
            this.startTime = null;
            this.isFinish = false;
            this.task = null;
            this.args = null;
            this.timeController = dy.CommonTimeController.create();
            this.task = task;
            this.args = args;
        }
        ScheduleItem.prototype.pause = function () {
            this.isPause = true;
            this.timeController.pause();
        };
        ScheduleItem.prototype.resume = function () {
            this.isPause = false;
            this.timeController.resume();
        };
        ScheduleItem.prototype.start = function () {
            this.isStop = false;
            this.timeController.start();
        };
        ScheduleItem.prototype.stop = function () {
            this.isStop = true;
            this.timeController.stop();
        };
        ScheduleItem.prototype.finish = function () {
            this.isFinish = true;
        };
        return ScheduleItem;
    })();
    var TimeScheduleItem = (function (_super) {
        __extends(TimeScheduleItem, _super);
        function TimeScheduleItem(task, time, args) {
            if (time === void 0) { time = 0; }
            if (args === void 0) { args = []; }
            _super.call(this, task, args);
            this._time = null;
            this._time = time;
        }
        TimeScheduleItem.create = function (task, time, args) {
            if (time === void 0) { time = 0; }
            if (args === void 0) { args = []; }
            var obj = new this(task, time, args);
            return obj;
        };
        TimeScheduleItem.prototype.update = function (time) {
            var elapsed = this.timeController.computeElapseTime(time);
            if (elapsed >= this._time) {
                this.task.apply(this, this.args);
                this.finish();
            }
        };
        return TimeScheduleItem;
    })(ScheduleItem);
    var IntervalScheduleItem = (function (_super) {
        __extends(IntervalScheduleItem, _super);
        function IntervalScheduleItem(task, time, args) {
            if (time === void 0) { time = 0; }
            if (args === void 0) { args = []; }
            _super.call(this, task, args);
            this._intervalTime = null;
            this._elapsed = 0;
            this._intervalTime = time;
        }
        IntervalScheduleItem.create = function (task, time, args) {
            if (time === void 0) { time = 0; }
            if (args === void 0) { args = []; }
            var obj = new this(task, time, args);
            return obj;
        };
        IntervalScheduleItem.prototype.update = function (time) {
            var elapsed = this.timeController.computeElapseTime(time);
            if (elapsed - this._elapsed >= this._intervalTime) {
                this.task.apply(this, this.args);
                this._elapsed = elapsed;
            }
        };
        IntervalScheduleItem.prototype.start = function () {
            _super.prototype.start.call(this);
            this._elapsed = 0;
        };
        return IntervalScheduleItem;
    })(ScheduleItem);
    var LoopScheduleItem = (function (_super) {
        __extends(LoopScheduleItem, _super);
        function LoopScheduleItem() {
            _super.apply(this, arguments);
        }
        LoopScheduleItem.create = function (task, args) {
            if (args === void 0) { args = []; }
            var obj = new this(task, args);
            return obj;
        };
        LoopScheduleItem.prototype.update = function (time) {
            this.task.apply(this, this.args);
        };
        return LoopScheduleItem;
    })(ScheduleItem);
    var FrameScheduleItem = (function (_super) {
        __extends(FrameScheduleItem, _super);
        function FrameScheduleItem(task, frame, args) {
            if (frame === void 0) { frame = 1; }
            if (args === void 0) { args = []; }
            _super.call(this, task, args);
            this._frame = null;
            this._frame = frame;
        }
        FrameScheduleItem.create = function (task, frame, args) {
            if (frame === void 0) { frame = 1; }
            if (args === void 0) { args = []; }
            var obj = new this(task, frame, args);
            return obj;
        };
        FrameScheduleItem.prototype.update = function (time) {
            this._frame--;
            if (this._frame <= 0) {
                this.task.apply(this, this.args);
                this.finish();
            }
        };
        return FrameScheduleItem;
    })(ScheduleItem);
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var GameState;
    (function (GameState) {
        GameState[GameState["NORMAL"] = 0] = "NORMAL";
        GameState[GameState["STOP"] = 1] = "STOP";
        GameState[GameState["PAUSE"] = 2] = "PAUSE";
    })(GameState || (GameState = {}));
    var Director = (function () {
        function Director() {
            this._stage = dy.Stage.create();
            this._scheduler = dy.Scheduler.create();
            this._renderer = null;
            this._view = null;
            this._gl = null;
            this._gameLoop = null;
            this._gameState = GameState.NORMAL;
            this._timeController = dy.DirectorTimeController.create();
            this._isFirstStart = true;
        }
        Director.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
                this._instance.initWhenCreate();
            }
            return this._instance;
        };
        Object.defineProperty(Director.prototype, "stage", {
            get: function () {
                return this._stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "scheduler", {
            get: function () {
                return this._scheduler;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "renderer", {
            get: function () {
                return this._renderer;
            },
            set: function (renderer) {
                this._renderer = renderer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "view", {
            get: function () {
                return this._view;
            },
            set: function (view) {
                this._view = view;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "gl", {
            get: function () {
                return this._gl;
            },
            set: function (gl) {
                this._gl = gl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "gameTime", {
            get: function () {
                return this._timeController.gameTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "fps", {
            get: function () {
                return this._timeController.fps;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "isNormal", {
            get: function () {
                return this._gameState === GameState.NORMAL;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "isStop", {
            get: function () {
                return this._gameState === GameState.STOP;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "isPause", {
            get: function () {
                return this._gameState === GameState.PAUSE;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "isTimeChange", {
            get: function () {
                return this._timeController.isTimeChange;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Director.prototype, "elapsed", {
            get: function () {
                return this._timeController.elapsed;
            },
            enumerable: true,
            configurable: true
        });
        Director.prototype.initWhenCreate = function () {
            this._renderer = dy.render.WebGLRenderer.create();
        };
        Director.prototype.start = function () {
            this._gameState = GameState.NORMAL;
            this._startLoop();
        };
        Director.prototype.stop = function () {
            this._gameLoop.dispose();
            this._gameState = GameState.STOP;
            this._timeController.stop();
            this._scheduler.stop();
        };
        Director.prototype.pause = function () {
            if (this._gameState === GameState.PAUSE) {
                return;
            }
            this._gameState = GameState.PAUSE;
            this._timeController.pause();
            this._scheduler.pause();
        };
        Director.prototype.resume = function () {
            this._gameState = GameState.NORMAL;
            this._timeController.resume();
            this._scheduler.resume();
        };
        Director.prototype.getView = function () {
            return this._view;
        };
        Director.prototype.getTopUnderPoint = function (point) {
            //if(!this._scene){
            //    return null;
            //}
            return this._stage.getTopUnderPoint(point);
        };
        Director.prototype.createGL = function (canvasId) {
            this._view = dy.ViewWebGL.create(dyCb.DomQuery.create(canvasId).get(0));
            this._gl = this._view.getContext();
        };
        Director.prototype._startLoop = function () {
            var self = this;
            this._gameLoop = dyRt.judge(function () { return self._isFirstStart; }, function () {
                return self._buildLoadScriptStream();
            }, function () {
                return dyRt.empty();
            })
                .concat(this._buildInitStream())
                .ignoreElements()
                .concat(this._buildLoopStream())
                .subscribe(function (time) {
                /*!
                 i consider that the time is DOMHighResTimeStamp(从页面导航开始时测量的高精确度时间),
                 but it may be DOMTimeStamp in some browser!
                 so it may need polyfill!
                 */
                self._loopBody(time);
            });
        };
        Director.prototype._buildLoadScriptStream = function () {
            return dyRt.fromCollection((this._stage.getChildren().copy().addChild(this._stage)))
                .map(function (gameObject) {
                return gameObject.scriptStreams;
            })
                .mergeAll();
        };
        Director.prototype._buildInitStream = function () {
            var _this = this;
            return dyRt.callFunc(function () {
                _this._isFirstStart = false;
                _this._stage.init();
                _this._stage.onEnter();
                _this._renderer.init();
                _this._timeController.start();
                _this._scheduler.start();
            }, this);
        };
        Director.prototype._buildLoopStream = function () {
            return dyRt.intervalRequest();
        };
        Director.prototype._loopBody = function (time) {
            var elapseTime = null;
            if (this._gameState === GameState.PAUSE || this._gameState === GameState.STOP) {
                return false;
            }
            elapseTime = this._timeController.computeElapseTime(time);
            this._timeController.tick(elapseTime);
            this._gl.clear(this._gl.COLOR_BUFFER_BIT | this._gl.DEPTH_BUFFER_BIT);
            this._stage.onStartLoop();
            this._run(elapseTime);
            this._stage.onEndLoop();
            return true;
        };
        Director.prototype._run = function (time) {
            this._stage.update(time);
            this._stage.render(this._renderer);
            this._renderer.render();
            this._scheduler.update(time);
        };
        Director._instance = null;
        return Director;
    })();
    dy.Director = Director;
})(dy || (dy = {}));

var dy;
(function (dy) {
    var Point = (function () {
        function Point(x, y) {
            if (x === void 0) { x = null; }
            if (y === void 0) { y = null; }
            this.x = null;
            this.y = null;
            this.x = x;
            this.y = y;
        }
        Point.create = function (x, y) {
            var obj = new this(x, y);
            return obj;
        };
        return Point;
    })();
    dy.Point = Point;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var ViewWebGL = (function () {
        function ViewWebGL(dom) {
            this._dom = null;
            this._dom = dom;
        }
        ViewWebGL.create = function (view) {
            var obj = new this(view);
            return obj;
        };
        Object.defineProperty(ViewWebGL.prototype, "offset", {
            get: function () {
                var view = this._dom, offset = { x: view.offsetLeft, y: view.offsetTop };
                while (view = view.offsetParent) {
                    offset.x += view.offsetLeft;
                    offset.y += view.offsetTop;
                }
                return offset;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "dom", {
            get: function () {
                return this._dom;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "width", {
            get: function () {
                return this._dom.width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ViewWebGL.prototype, "height", {
            get: function () {
                return this._dom.height;
            },
            enumerable: true,
            configurable: true
        });
        ViewWebGL.prototype.getContext = function () {
            return this._dom.getContext("webgl") || this._dom.getContext("experimental-webgl");
        };
        return ViewWebGL;
    })();
    dy.ViewWebGL = ViewWebGL;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Geometry = (function (_super) {
        __extends(Geometry, _super);
        function Geometry() {
            _super.apply(this, arguments);
            this._vertices = null;
            this._indices = null;
            this._colors = null;
            this._material = null;
        }
        Object.defineProperty(Geometry.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            set: function (vertices) {
                this._vertices = vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            set: function (indices) {
                this._indices = indices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "colors", {
            get: function () {
                return this._colors;
            },
            set: function (colors) {
                this._colors = colors;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Geometry.prototype, "material", {
            get: function () {
                return this._material;
            },
            set: function (material) {
                this._material = material;
            },
            enumerable: true,
            configurable: true
        });
        Geometry.prototype.init = function () {
            this._vertices = this.computeVerticesBuffer();
            this._indices = this.computeIndicesBuffer();
            this._colors = this._computeColorsBuffer(this._material);
        };
        Geometry.prototype.computeVerticesBuffer = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Geometry.prototype.computeIndicesBuffer = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Geometry.prototype._computeColorsBuffer = function (material) {
            var arr = [], color = material.color, i = 0, len = this._vertices.count;
            for (i = 0; i < len; i++) {
                arr.push(color.r, color.g, color.b, 1.0);
            }
            return dy.render.ArrayBuffer.create(new Float32Array(arr), 4, dy.render.BufferType.FLOAT);
        };
        return Geometry;
    })(dy.Component);
    dy.Geometry = Geometry;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var BoxGeometry = (function (_super) {
        __extends(BoxGeometry, _super);
        function BoxGeometry() {
            _super.apply(this, arguments);
            this._width = null;
            this._height = null;
            this._depth = null;
        }
        BoxGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        Object.defineProperty(BoxGeometry.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxGeometry.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxGeometry.prototype, "depth", {
            get: function () {
                return this._depth;
            },
            set: function (depth) {
                this._depth = depth;
            },
            enumerable: true,
            configurable: true
        });
        BoxGeometry.prototype.computeVerticesBuffer = function () {
            var width = this._width, height = this._height, depth = this._depth, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2, front = depth / 2, back = -depth / 2;
            return dy.render.ArrayBuffer.create(new Float32Array([
                right, up, front, left, up, front, left, down, front, right, down, front,
                right, up, front, right, down, front, right, down, back, right, up, back,
                right, up, front, right, up, back, left, up, back, left, up, front,
                left, up, front, left, up, back, left, down, back, left, down, front,
                left, down, back, right, down, back, right, down, front, left, down, front,
                right, down, back, left, down, back, left, up, back, right, up, back
            ]), 3, dy.render.BufferType.FLOAT);
        };
        BoxGeometry.prototype.computeIndicesBuffer = function () {
            return dy.render.ElementBuffer.create(new Uint16Array([
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23
            ]), dy.render.BufferType.UNSIGNED_SHORT);
        };
        return BoxGeometry;
    })(dy.Geometry);
    dy.BoxGeometry = BoxGeometry;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var RectGeometry = (function (_super) {
        __extends(RectGeometry, _super);
        function RectGeometry() {
            _super.apply(this, arguments);
            this._width = null;
            this._height = null;
        }
        RectGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        Object.defineProperty(RectGeometry.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RectGeometry.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
            },
            enumerable: true,
            configurable: true
        });
        RectGeometry.prototype.computeVerticesBuffer = function () {
            var width = this._width, height = this._height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2;
            return dy.render.ArrayBuffer.create(new Float32Array([
                right, up, 0,
                left, up, 0,
                left, down, 0,
                right, down, 0
            ]), 3, dy.render.BufferType.FLOAT);
        };
        RectGeometry.prototype.computeIndicesBuffer = function () {
            return dy.render.ElementBuffer.create(new Uint16Array([
                0, 1, 2, 0, 2, 3
            ]), dy.render.BufferType.UNSIGNED_SHORT);
        };
        return RectGeometry;
    })(dy.Geometry);
    dy.RectGeometry = RectGeometry;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (SphereDrawMode) {
        SphereDrawMode[SphereDrawMode["LATITUDELONGTITUDE"] = 0] = "LATITUDELONGTITUDE";
        SphereDrawMode[SphereDrawMode["DECOMPOSITION"] = 1] = "DECOMPOSITION";
    })(dy.SphereDrawMode || (dy.SphereDrawMode = {}));
    var SphereDrawMode = dy.SphereDrawMode;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var SphereGeometry = (function (_super) {
        __extends(SphereGeometry, _super);
        function SphereGeometry() {
            _super.apply(this, arguments);
            this._radius = null;
            this._drawMode = null;
            this._segments = null;
            this._data = null;
        }
        SphereGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        Object.defineProperty(SphereGeometry.prototype, "radius", {
            get: function () {
                return this._radius;
            },
            set: function (radius) {
                this._radius = radius;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SphereGeometry.prototype, "drawMode", {
            get: function () {
                return this._drawMode;
            },
            set: function (drawMode) {
                this._drawMode = drawMode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SphereGeometry.prototype, "segments", {
            get: function () {
                return this._segments;
            },
            set: function (segments) {
                this._segments = segments;
            },
            enumerable: true,
            configurable: true
        });
        SphereGeometry.prototype.init = function () {
            this._data = this._computeData(this._radius, this._drawMode, this._segments);
        };
        SphereGeometry.prototype.computeVerticesBuffer = function () {
            return this._data.vertices;
        };
        SphereGeometry.prototype.computeIndicesBuffer = function () {
            return this._data.indices;
        };
        SphereGeometry.prototype._computeData = function (radius, drawMode, segments) {
            var data = null;
            if (drawMode === dy.SphereDrawMode.LATITUDELONGTITUDE) {
                data = GetDataByLatitudeLongtitude.create(radius, segments).getData();
            }
            else if (drawMode === dy.SphereDrawMode.DECOMPOSITION) {
                data = GetDataByDecomposition.create(radius, segments).getData();
            }
            return data;
        };
        return SphereGeometry;
    })(dy.Geometry);
    dy.SphereGeometry = SphereGeometry;
    var GetDataByLatitudeLongtitude = (function () {
        function GetDataByLatitudeLongtitude(radius, bands) {
            this._vertices = [];
            this._indices = [];
            this._radius = null;
            this._latitudeBands = null;
            this._longitudeBands = null;
            this._radius = radius;
            this._latitudeBands = bands;
            this._longitudeBands = bands;
        }
        GetDataByLatitudeLongtitude.create = function (radius, bands) {
            var geom = new this(radius, bands);
            return geom;
        };
        Object.defineProperty(GetDataByLatitudeLongtitude.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            set: function (vertices) {
                this._vertices = vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GetDataByLatitudeLongtitude.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            set: function (indices) {
                this._indices = indices;
            },
            enumerable: true,
            configurable: true
        });
        GetDataByLatitudeLongtitude.prototype.getData = function () {
            for (var latNumber = 0; latNumber <= this._latitudeBands; latNumber++) {
                var theta = latNumber * Math.PI / this._latitudeBands;
                var sinTheta = Math.sin(theta);
                var cosTheta = Math.cos(theta);
                for (var longNumber = 0; longNumber <= this._longitudeBands; longNumber++) {
                    var phi = longNumber * 2 * Math.PI / this._longitudeBands;
                    var sinPhi = Math.sin(phi);
                    var cosPhi = Math.cos(phi);
                    var x = this._radius * cosPhi * sinTheta;
                    var y = this._radius * cosTheta;
                    var z = this._radius * sinPhi * sinTheta;
                    var u = 1 - (longNumber / this._longitudeBands);
                    var v = 1 - (latNumber / this._latitudeBands);
                    this._vertices.push(x);
                    this._vertices.push(y);
                    this._vertices.push(z);
                }
            }
            for (var latNumber = 0; latNumber < this._latitudeBands; latNumber++) {
                for (var longNumber = 0; longNumber < this._longitudeBands; longNumber++) {
                    var first = latNumber * (this._longitudeBands + 1) + longNumber;
                    var second = first + this._longitudeBands + 1;
                    this._indices.push(first);
                    this._indices.push(second);
                    this._indices.push(first + 1);
                    this._indices.push(second);
                    this._indices.push(second + 1);
                    this._indices.push(first + 1);
                }
            }
            return {
                vertices: dy.render.ArrayBuffer.create(new Float32Array(this._vertices), 3, dy.render.BufferType.FLOAT),
                indices: dy.render.ElementBuffer.create(new Uint16Array(this._indices), dy.render.BufferType.UNSIGNED_SHORT)
            };
        };
        return GetDataByLatitudeLongtitude;
    })();
    var GetDataByDecomposition = (function () {
        function GetDataByDecomposition(radius, count) {
            this._vertices = [];
            this._indices = [];
            this._vLen = null;
            this._radius = null;
            this._count = null;
            this._radius = radius;
            this._count = count;
        }
        GetDataByDecomposition.create = function (radius, count) {
            var geom = new this(radius, count);
            return geom;
        };
        Object.defineProperty(GetDataByDecomposition.prototype, "vertices", {
            get: function () {
                return this._vertices;
            },
            set: function (vertices) {
                this._vertices = vertices;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GetDataByDecomposition.prototype, "indices", {
            get: function () {
                return this._indices;
            },
            set: function (indices) {
                this._indices = indices;
            },
            enumerable: true,
            configurable: true
        });
        GetDataByDecomposition.prototype.getData = function () {
            var originVertices = [
                [this._radius, 0, 0],
                [-this._radius, 0, 0],
                [0, this._radius, 0],
                [0, -this._radius, 0],
                [0, 0, this._radius],
                [0, 0, -this._radius]
            ];
            var originIndices = [
                [2, 4, 0], [2, 0, 5], [2, 5, 1], [2, 1, 4],
                [3, 0, 4], [3, 5, 0], [3, 1, 5], [3, 4, 1]
            ];
            this._vLen = originVertices.length;
            var j = 0;
            var len = originVertices.length;
            for (j = 0; j < len; j++) {
                this._vertices = this._vertices.concat(originVertices[j]);
            }
            var j = 0, len = originIndices.length;
            for (j = 0; j < len; j++) {
                this._subDivide(originVertices[originIndices[j][0]], originVertices[originIndices[j][1]], originVertices[originIndices[j][2]], originIndices[j], this._count, this._radius);
            }
            return {
                vertices: dy.render.ArrayBuffer.create(new Float32Array(this._vertices), 3, dy.render.BufferType.FLOAT),
                indices: dy.render.ElementBuffer.create(new Uint16Array(this._indices), dy.render.BufferType.UNSIGNED_SHORT)
            };
        };
        GetDataByDecomposition.prototype._subDivide = function (v1, v2, v3, ind, count, radius) {
            if (count <= 0) {
                this._indices = this._indices.concat(ind);
                return;
            }
            var i = 0;
            var v12 = [], v23 = [], v31 = [];
            for (i = 0; i < 3; i++) {
                v12[i] = (v1[i] + v2[i]) / 2;
                v23[i] = (v2[i] + v3[i]) / 2;
                v31[i] = (v3[i] + v1[i]) / 2;
            }
            this._normalize(v12, radius);
            this._normalize(v23, radius);
            this._normalize(v31, radius);
            this._vertices = this._vertices.concat(v12, v23, v31);
            var iV1 = ind[0], iV2 = ind[1], iV3 = ind[2], iV12 = this._vLen, iV23 = this._vLen + 1, iV31 = this._vLen + 2;
            var in1 = [
                iV1, iV12, iV31
            ];
            var in2 = [
                iV31, iV12, iV23
            ];
            var in3 = [
                iV12, iV2, iV23
            ];
            var in4 = [
                iV31, iV23, iV3
            ];
            this._vLen = this._vLen + 3;
            this._subDivide(v1, v12, v31, in1, count - 1, radius);
            this._subDivide(v31, v12, v23, in2, count - 1, radius);
            this._subDivide(v12, v2, v23, in3, count - 1, radius);
            this._subDivide(v31, v23, v3, in4, count - 1, radius);
        };
        GetDataByDecomposition.prototype._normalize = function (v, radius) {
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            if (d === 0) {
                return [0, 0, 0];
            }
            v[0] = radius * v[0] / d;
            v[1] = radius * v[1] / d;
            v[2] = radius * v[2] / d;
            return v;
        };
        return GetDataByDecomposition;
    })();
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var TriangleGeometry = (function (_super) {
        __extends(TriangleGeometry, _super);
        function TriangleGeometry() {
            _super.apply(this, arguments);
            this._width = null;
            this._height = null;
        }
        TriangleGeometry.create = function () {
            var geom = new this();
            return geom;
        };
        Object.defineProperty(TriangleGeometry.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (width) {
                this._width = width;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TriangleGeometry.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (height) {
                this._height = height;
            },
            enumerable: true,
            configurable: true
        });
        TriangleGeometry.prototype.computeVerticesBuffer = function () {
            var width = this._width, height = this._height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2;
            return dy.render.ArrayBuffer.create(new Float32Array([
                0.0, up, 0,
                left, down, 0,
                right, down, 0
            ]), 3, dy.render.BufferType.FLOAT);
        };
        TriangleGeometry.prototype.computeIndicesBuffer = function () {
            return dy.render.ElementBuffer.create(new Uint8Array([
                0, 1, 2
            ]), dy.render.BufferType.UNSIGNED_BYTE);
        };
        return TriangleGeometry;
    })(dy.Geometry);
    dy.TriangleGeometry = TriangleGeometry;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Behavior = (function (_super) {
        __extends(Behavior, _super);
        function Behavior() {
            _super.apply(this, arguments);
        }
        Behavior.prototype.update = function (time) {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        return Behavior;
    })(dy.Component);
    dy.Behavior = Behavior;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Camera = (function (_super) {
        __extends(Camera, _super);
        function Camera() {
            _super.apply(this, arguments);
            this._pMatrix = dy.Matrix.create();
            this._vMatrix = dy.Matrix.create();
            this._eye = null;
            this._center = null;
            this._up = null;
            this._fovy = null;
            this._aspect = null;
            this._near = null;
            this._far = null;
            this._dirty = false;
        }
        Camera.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(Camera.prototype, "cameraToWorldMatrix", {
            get: function () {
                return this.transform.localToWorldMatrix.copy();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "worldToCameraMatrix", {
            get: function () {
                return this.cameraToWorldMatrix.invert();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "pMatrix", {
            get: function () {
                return this._pMatrix;
            },
            set: function (pMatrix) {
                this._pMatrix = pMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "vMatrix", {
            get: function () {
                return this._vMatrix;
            },
            set: function (vMatrix) {
                this._vMatrix = vMatrix;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "eye", {
            get: function () {
                return this._eye;
            },
            set: function (eye) {
                this._eye = eye;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "center", {
            get: function () {
                return this._center;
            },
            set: function (center) {
                this._center = center;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "up", {
            get: function () {
                return this._up;
            },
            set: function (up) {
                this._up = up;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "fovy", {
            get: function () {
                return this._fovy;
            },
            set: function (fovy) {
                this._fovy = fovy;
                this._dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "aspect", {
            get: function () {
                return this._aspect;
            },
            set: function (aspect) {
                this._aspect = aspect;
                this._dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "near", {
            get: function () {
                return this._near;
            },
            set: function (near) {
                this._near = near;
                this._dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "far", {
            get: function () {
                return this._far;
            },
            set: function (far) {
                this._far = far;
                this._dirty = true;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.init = function () {
            this._pMatrix.setPerspective(this._fovy, this._aspect, this._near, this._far);
        };
        Camera.prototype.computeVpMatrix = function () {
            var matrix = dy.Matrix.create();
            matrix.applyMatrix(this.worldToCameraMatrix);
            matrix.applyMatrix(this._pMatrix);
            return matrix;
        };
        Camera.prototype.zoomIn = function (speed, min) {
            if (min === void 0) { min = 1; }
            this._fovy = Math.max(this._fovy - speed, min);
        };
        Camera.prototype.zoomOut = function (speed, max) {
            if (max === void 0) { max = 179; }
            this._fovy = Math.min(this._fovy + speed, max);
        };
        Camera.prototype.update = function (time) {
            if (this._dirty) {
                this._pMatrix.setPerspective(this._fovy, this._aspect, this._near, this._far);
                this._dirty = false;
            }
        };
        return Camera;
    })(dy.Behavior);
    dy.Camera = Camera;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Action = (function (_super) {
        __extends(Action, _super);
        function Action() {
            _super.apply(this, arguments);
            /*!to avoid be duplicate with child class's private attribute*/
            this.dy_isFinish = false;
            /*!
            add "p_" prefix to avoid be duplicate with the getter
             */
            this.p_target = null;
        }
        Object.defineProperty(Action.prototype, "isFinish", {
            get: function () {
                return this.dy_isFinish;
            },
            set: function (isFinish) {
                this.dy_isFinish = isFinish;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Action.prototype, "isStart", {
            get: function () {
                return !this.isStop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Action.prototype, "isStop", {
            get: function () {
                return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Action.prototype, "isPause", {
            get: function () {
                return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Action.prototype, "target", {
            get: function () {
                return this.p_target;
            },
            set: function (target) {
                this.p_target = target;
            },
            enumerable: true,
            configurable: true
        });
        Action.prototype.reset = function () {
            this.dy_isFinish = false;
        };
        Action.prototype.update = function (time) {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Action.prototype.start = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Action.prototype.stop = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Action.prototype.pause = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Action.prototype.resume = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Action.prototype.copy = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Action.prototype.reverse = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Action.prototype.finish = function () {
            this.dy_isFinish = true;
            this.stop();
        };
        return Action;
    })(dy.Behavior);
    dy.Action = Action;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var ActionInstant = (function (_super) {
        __extends(ActionInstant, _super);
        function ActionInstant() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(ActionInstant.prototype, "isStop", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActionInstant.prototype, "isPause", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        ActionInstant.prototype.start = function () {
        };
        ActionInstant.prototype.stop = function () {
        };
        ActionInstant.prototype.pause = function () {
        };
        ActionInstant.prototype.resume = function () {
        };
        return ActionInstant;
    })(dy.Action);
    dy.ActionInstant = ActionInstant;
})(dy || (dy = {}));

/// <reference path="../../../definitions.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dy;
(function (dy) {
    var CallFunc = (function (_super) {
        __extends(CallFunc, _super);
        function CallFunc(func, context, dataArr) {
            _super.call(this);
            this._context = null;
            this._callFunc = null;
            this._dataArr = null;
            this._context = context || window;
            this._callFunc = func;
            this._dataArr = dyCb.Collection.create(dataArr);
        }
        CallFunc.create = function (func, context) {
            var data = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                data[_i - 2] = arguments[_i];
            }
            var dataArr = Array.prototype.slice.call(arguments, 2), action = new this(func, context, dataArr);
            return action;
        };
        CallFunc.prototype.reverse = function () {
            return this;
        };
        CallFunc.prototype.update = function (time) {
            if (this._callFunc) {
                this._callFunc.call(this._context, this.target, this._dataArr);
            }
            this.finish();
        };
        CallFunc.prototype.copy = function () {
            return new CallFunc(this._context, this._callFunc, this._dataArr.copy(true).getChildren());
        };
        return CallFunc;
    })(dy.ActionInstant);
    dy.CallFunc = CallFunc;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var ActionInterval = (function (_super) {
        __extends(ActionInterval, _super);
        function ActionInterval() {
            _super.apply(this, arguments);
            this.elapsed = null;
            this.duration = null;
            this._isStop = true;
            this._isPause = false;
            this._timeController = dy.CommonTimeController.create();
        }
        Object.defineProperty(ActionInterval.prototype, "isStop", {
            get: function () {
                return this._isStop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActionInterval.prototype, "isPause", {
            get: function () {
                return this._isPause;
            },
            enumerable: true,
            configurable: true
        });
        ActionInterval.prototype.update = function (time) {
            if (time < this._timeController.startTime) {
                return;
            }
            this.elapsed = this._convertToRatio(this._timeController.computeElapseTime(time));
            this.updateBody(time);
            if (this.elapsed === 1) {
                this.finish();
            }
        };
        ActionInterval.prototype.start = function () {
            this._isStop = false;
            this._timeController.start();
        };
        ActionInterval.prototype.stop = function () {
            this._isStop = true;
            this._timeController.stop();
        };
        ActionInterval.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._isStop = true;
        };
        ActionInterval.prototype.pause = function () {
            this._isPause = true;
            this._timeController.pause();
        };
        ActionInterval.prototype.resume = function () {
            this._isPause = false;
            this._timeController.resume();
        };
        /*! virtual method */
        ActionInterval.prototype.updateBody = function (time) {
        };
        ActionInterval.prototype._convertToRatio = function (elapsed) {
            var ratio = elapsed / this.duration;
            return ratio > 1 ? 1 : ratio;
        };
        return ActionInterval;
    })(dy.Action);
    dy.ActionInterval = ActionInterval;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Control = (function (_super) {
        __extends(Control, _super);
        function Control() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(Control.prototype, "target", {
            set: function (target) {
                this.p_target = target;
                this.getInnerActions().forEach(function (action) {
                    action.target = target;
                });
            },
            enumerable: true,
            configurable: true
        });
        Control.prototype.init = function () {
            this.iterate("init");
        };
        Control.prototype.reverse = function () {
            this.iterate("reverse");
            return this;
        };
        Control.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.iterate("reset");
            return this;
        };
        Control.prototype.getInnerActions = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Control.prototype.iterate = function (method, argArr) {
            this.getInnerActions().forEach(function (action) {
                action[method].apply(action, argArr);
            });
        };
        return Control;
    })(dy.ActionInterval);
    dy.Control = Control;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Sequence = (function (_super) {
        __extends(Sequence, _super);
        function Sequence(actionArr) {
            _super.call(this);
            this._actions = dyCb.Collection.create();
            this._currentAction = null;
            this._actionIndex = 0;
            this._actions.addChildren(actionArr);
        }
        Sequence.create = function () {
            var actions = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                actions[_i - 0] = arguments[_i];
            }
            var actionArr = null, sequence = null;
            dyCb.Log.assert(arguments.length >= 2, "应该有2个及以上动作");
            actionArr = Array.prototype.slice.call(arguments, 0);
            sequence = new this(actionArr);
            sequence.initWhenCreate();
            return sequence;
        };
        Sequence.prototype.initWhenCreate = function () {
            this._currentAction = this._actions.getChild(0);
        };
        Sequence.prototype.update = function (time) {
            if (this._actionIndex === this._actions.getCount()) {
                this.finish();
                return;
            }
            this._currentAction = this._actions.getChild(this._actionIndex);
            if (this._currentAction.isFinish) {
                this._startNextActionAndJudgeFinish();
                return;
            }
            this._currentAction.update(time);
            if (this._currentAction.isFinish) {
                this._startNextActionAndJudgeFinish();
            }
            return null;
        };
        Sequence.prototype.copy = function () {
            var actionArr = [];
            this._actions.forEach(function (action) {
                actionArr.push(action.copy());
            });
            return Sequence.create.apply(Sequence, actionArr);
        };
        Sequence.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._actionIndex = 0;
            this._currentAction = this._actions.getChild(this._actionIndex);
            return this;
        };
        Sequence.prototype.start = function () {
            _super.prototype.start.call(this);
            this._currentAction.start();
            return this;
        };
        Sequence.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._currentAction.stop();
            return this;
        };
        Sequence.prototype.pause = function () {
            _super.prototype.pause.call(this);
            this._currentAction.pause();
            return this;
        };
        Sequence.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this._currentAction.resume();
            return this;
        };
        Sequence.prototype.reverse = function () {
            this._actions.reverse();
            _super.prototype.reverse.call(this);
            return this;
        };
        Sequence.prototype.getInnerActions = function () {
            return this._actions;
        };
        Sequence.prototype._startNextActionAndJudgeFinish = function () {
            this._actionIndex++;
            if (this._actionIndex === this._actions.getCount()) {
                this.finish();
                return;
            }
            this._actions.getChild(this._actionIndex).start();
        };
        return Sequence;
    })(dy.Control);
    dy.Sequence = Sequence;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Spawn = (function (_super) {
        __extends(Spawn, _super);
        function Spawn(actionArr) {
            _super.call(this);
            this._actions = dyCb.Collection.create();
            this._actions.addChildren(actionArr);
        }
        Spawn.create = function () {
            var spawn = null;
            dyCb.Log.assert(arguments.length >= 2, "应该有2个及以上动作");
            spawn = new this(Array.prototype.slice.call(arguments, 0));
            return spawn;
        };
        Spawn.prototype.update = function (time) {
            if (this._isFinish()) {
                this.finish();
                return;
            }
            this.iterate("update", [time]);
            if (this._isFinish()) {
                this.finish();
            }
        };
        Spawn.prototype.start = function () {
            _super.prototype.start.call(this);
            this.iterate("start");
            return this;
        };
        Spawn.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this.iterate("stop");
            return this;
        };
        Spawn.prototype.pause = function () {
            _super.prototype.pause.call(this);
            this.iterate("pause");
            return this;
        };
        Spawn.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this.iterate("resume");
            return this;
        };
        Spawn.prototype.copy = function () {
            var actions = [];
            this._actions.forEach(function (action) {
                actions.push(action.copy());
            });
            return Spawn.create.apply(Spawn, actions);
        };
        Spawn.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this.iterate("reset");
            return this;
        };
        Spawn.prototype.reverse = function () {
            this._actions.reverse();
            _super.prototype.reverse.call(this);
            return this;
        };
        Spawn.prototype.getInnerActions = function () {
            return this._actions;
        };
        Spawn.prototype.iterate = function (method, argArr) {
            this._actions.forEach(function (action) {
                action[method].apply(action, argArr);
            });
        };
        Spawn.prototype._isFinish = function () {
            var isFinish = true;
            this._actions.forEach(function (action) {
                if (!action.isFinish) {
                    isFinish = false;
                    return dyCb.$BREAK;
                }
            });
            return isFinish;
        };
        return Spawn;
    })(dy.Control);
    dy.Spawn = Spawn;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var DelayTime = (function (_super) {
        __extends(DelayTime, _super);
        function DelayTime(delayTime) {
            _super.call(this);
            this.duration = delayTime;
        }
        DelayTime.create = function (delayTime) {
            var action = new this(delayTime);
            return action;
        };
        DelayTime.prototype.reverse = function () {
            return this;
        };
        DelayTime.prototype.copy = function () {
            return DelayTime.create(this.duration);
        };
        return DelayTime;
    })(dy.ActionInterval);
    dy.DelayTime = DelayTime;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Repeat = (function (_super) {
        __extends(Repeat, _super);
        function Repeat(action, times) {
            _super.call(this);
            this._innerAction = null;
            this._originTimes = null;
            this._times = null;
            this._innerAction = action;
            this._times = times;
        }
        Repeat.create = function (action, times) {
            var repeat = new this(action, times);
            repeat.initWhenCreate();
            return repeat;
        };
        Repeat.prototype.initWhenCreate = function () {
            this._originTimes = this._times;
        };
        Repeat.prototype.update = function (time) {
            if (this._times === 0) {
                this.finish();
                return;
            }
            this._innerAction.update(time);
            if (this._innerAction.isFinish) {
                this._times -= 1;
                if (this._times !== 0) {
                    this._innerAction.reset();
                    this._innerAction.start();
                    return;
                }
                this.finish();
            }
        };
        Repeat.prototype.copy = function () {
            return Repeat.create(this._innerAction.copy(), this._times);
        };
        Repeat.prototype.reset = function () {
            _super.prototype.reset.call(this);
            this._times = this._originTimes;
            return this;
        };
        Repeat.prototype.start = function () {
            _super.prototype.start.call(this);
            this._innerAction.start();
        };
        Repeat.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._innerAction.stop();
        };
        Repeat.prototype.pause = function () {
            _super.prototype.pause.call(this);
            this._innerAction.pause();
        };
        Repeat.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this._innerAction.resume();
        };
        Repeat.prototype.getInnerActions = function () {
            return dyCb.Collection.create([this._innerAction]);
        };
        return Repeat;
    })(dy.Control);
    dy.Repeat = Repeat;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var RepeatForever = (function (_super) {
        __extends(RepeatForever, _super);
        function RepeatForever(action) {
            _super.call(this);
            this._innerAction = null;
            this._innerAction = action;
        }
        RepeatForever.create = function (action) {
            var repeat = new this(action);
            return repeat;
        };
        Object.defineProperty(RepeatForever.prototype, "isFinish", {
            get: function () {
                return false;
            },
            enumerable: true,
            configurable: true
        });
        RepeatForever.prototype.update = function (time) {
            this._innerAction.update(time);
            if (this._innerAction.isFinish) {
                this._innerAction.reset();
                this._innerAction.start();
            }
        };
        RepeatForever.prototype.copy = function () {
            return RepeatForever.create(this._innerAction.copy());
        };
        RepeatForever.prototype.start = function () {
            _super.prototype.start.call(this);
            this._innerAction.start();
        };
        RepeatForever.prototype.stop = function () {
            _super.prototype.stop.call(this);
            this._innerAction.stop();
        };
        RepeatForever.prototype.pause = function () {
            _super.prototype.pause.call(this);
            this._innerAction.pause();
        };
        RepeatForever.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this._innerAction.resume();
        };
        RepeatForever.prototype.getInnerActions = function () {
            return dyCb.Collection.create([this._innerAction]);
        };
        return RepeatForever;
    })(dy.Control);
    dy.RepeatForever = RepeatForever;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Tween = (function (_super) {
        __extends(Tween, _super);
        function Tween() {
            _super.apply(this, arguments);
            this._object = null;
            this._valuesStart = dyCb.Hash.create();
            this._valuesEnd = dyCb.Hash.create();
            this._easingFunction = Tween.Easing.Linear.None;
            this._interpolationFunction = Tween.Interpolation.Linear;
            this._onStartCallback = null;
            this._onStartCallbackFired = false;
            this._onUpdateCallback = null;
            this._onFinishCallback = null;
            this._onStopCallback = null;
        }
        Tween.create = function () {
            var obj = new this();
            return obj;
        };
        Tween.prototype.updateBody = function (time) {
            var self = this, easeValue = null;
            if (this._onStartCallbackFired === false) {
                if (this._onStartCallback !== null) {
                    this._onStartCallback.call(this._object.getChildren());
                }
                this._onStartCallbackFired = true;
            }
            easeValue = this._easingFunction(this.elapsed);
            this._valuesEnd.forEach(function (value, key) {
                var start = self._valuesStart.getChild(key), end = value;
                if (end instanceof Array) {
                    self._object.setValue(key, self._interpolationFunction(end, easeValue));
                }
                else {
                    if (dy.JudgeUtils.isString(end)) {
                        end = start + window.parseFloat(end, 10);
                    }
                    if (dy.JudgeUtils.isNumber(end)) {
                        self._object.setValue(key, start + (end - start) * easeValue);
                    }
                }
            });
            if (this._onUpdateCallback !== null) {
                this._onUpdateCallback.call(this._object.getChildren(), easeValue);
            }
            return true;
        };
        Tween.prototype.from = function (object) {
            var self = this;
            this._object = dyCb.Hash.create(object);
            this._object.forEach(function (value, key) {
                self._valuesStart.addChild(key, window.parseFloat(value, 10));
            });
            return this;
        };
        Tween.prototype.to = function (properties, duration) {
            if (duration === void 0) { duration = 1000; }
            this.duration = duration;
            this._valuesEnd = dyCb.Hash.create(properties);
            return this;
        };
        Tween.prototype.init = function () {
            var self = this;
            this._valuesEnd.forEach(function (value, key) {
                if (value instanceof Array) {
                    if (value.length === 0) {
                        return;
                    }
                    self._valuesEnd.setValue(key, [self._object.getChild(key)].concat(self._valuesEnd.getChild(key)));
                }
                self._valuesStart.setValue(key, self._object.getChild(key));
                if ((self._valuesStart.getChild(key) instanceof Array) === false) {
                    self._valuesStart.setValue(key, self._valuesStart.getChild(key) * 1.0);
                }
            });
        };
        Tween.prototype.start = function () {
            _super.prototype.start.call(this);
            this._onStartCallbackFired = false;
            return this;
        };
        Tween.prototype.stop = function () {
            _super.prototype.stop.call(this);
            if (this._onStopCallback !== null) {
                this._onStopCallback.call(this._object.getChildren());
            }
            return this;
        };
        Tween.prototype.copy = function () {
            return Tween.create().from(this._valuesStart.getChildren())
                .to(this._valuesEnd.getChildren(), this.duration)
                .easing(this._easingFunction)
                .interpolation(this._interpolationFunction)
                .onStart(this._onStartCallback)
                .onStop(this._onStopCallback)
                .onFinish(this._onFinishCallback)
                .onUpdate(this._onUpdateCallback);
        };
        Tween.prototype.reverse = function () {
            var tmp = this._valuesStart;
            this._valuesStart = this._valuesEnd;
            this._valuesEnd = tmp;
        };
        Tween.prototype.easing = function (easing) {
            this._easingFunction = easing;
            return this;
        };
        Tween.prototype.interpolation = function (interpolation) {
            this._interpolationFunction = interpolation;
            return this;
        };
        Tween.prototype.onUpdate = function (callback) {
            this._onUpdateCallback = callback;
            return this;
        };
        Tween.prototype.onFinish = function (callback) {
            this._onFinishCallback = callback;
            return this;
        };
        Tween.prototype.onStart = function (callback) {
            this._onStartCallback = callback;
            return this;
        };
        Tween.prototype.onStop = function (callback) {
            this._onStopCallback = callback;
            return this;
        };
        Tween.prototype.finish = function () {
            _super.prototype.finish.call(this);
            if (this._onFinishCallback !== null) {
                this._onFinishCallback.call(this._object.getChildren());
            }
        };
        Tween.Easing = {
            Linear: {
                None: function (k) {
                    return k;
                }
            },
            Quadratic: {
                In: function (k) {
                    return k * k;
                },
                Out: function (k) {
                    return k * (2 - k);
                },
                InOut: function (k) {
                    if ((k *= 2) < 1)
                        return 0.5 * k * k;
                    return -0.5 * (--k * (k - 2) - 1);
                }
            },
            Cubic: {
                In: function (k) {
                    return k * k * k;
                },
                Out: function (k) {
                    return --k * k * k + 1;
                },
                InOut: function (k) {
                    if ((k *= 2) < 1)
                        return 0.5 * k * k * k;
                    return 0.5 * ((k -= 2) * k * k + 2);
                }
            },
            Quartic: {
                In: function (k) {
                    return k * k * k * k;
                },
                Out: function (k) {
                    return 1 - (--k * k * k * k);
                },
                InOut: function (k) {
                    if ((k *= 2) < 1)
                        return 0.5 * k * k * k * k;
                    return -0.5 * ((k -= 2) * k * k * k - 2);
                }
            },
            Quintic: {
                In: function (k) {
                    return k * k * k * k * k;
                },
                Out: function (k) {
                    return --k * k * k * k * k + 1;
                },
                InOut: function (k) {
                    if ((k *= 2) < 1)
                        return 0.5 * k * k * k * k * k;
                    return 0.5 * ((k -= 2) * k * k * k * k + 2);
                }
            },
            Sinusoidal: {
                In: function (k) {
                    return 1 - Math.cos(k * Math.PI / 2);
                },
                Out: function (k) {
                    return Math.sin(k * Math.PI / 2);
                },
                InOut: function (k) {
                    return 0.5 * (1 - Math.cos(Math.PI * k));
                }
            },
            Exponential: {
                In: function (k) {
                    return k === 0 ? 0 : Math.pow(1024, k - 1);
                },
                Out: function (k) {
                    return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
                },
                InOut: function (k) {
                    if (k === 0)
                        return 0;
                    if (k === 1)
                        return 1;
                    if ((k *= 2) < 1)
                        return 0.5 * Math.pow(1024, k - 1);
                    return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
                }
            },
            Circular: {
                In: function (k) {
                    return 1 - Math.sqrt(1 - k * k);
                },
                Out: function (k) {
                    return Math.sqrt(1 - (--k * k));
                },
                InOut: function (k) {
                    if ((k *= 2) < 1)
                        return -0.5 * (Math.sqrt(1 - k * k) - 1);
                    return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
                }
            },
            Elastic: {
                In: function (k) {
                    var s, a = 0.1, p = 0.4;
                    if (k === 0)
                        return 0;
                    if (k === 1)
                        return 1;
                    if (!a || a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else
                        s = p * Math.asin(1 / a) / (2 * Math.PI);
                    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                },
                Out: function (k) {
                    var s, a = 0.1, p = 0.4;
                    if (k === 0)
                        return 0;
                    if (k === 1)
                        return 1;
                    if (!a || a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else
                        s = p * Math.asin(1 / a) / (2 * Math.PI);
                    return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
                },
                InOut: function (k) {
                    var s, a = 0.1, p = 0.4;
                    if (k === 0)
                        return 0;
                    if (k === 1)
                        return 1;
                    if (!a || a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else
                        s = p * Math.asin(1 / a) / (2 * Math.PI);
                    if ((k *= 2) < 1)
                        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
                    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
                }
            },
            Back: {
                In: function (k) {
                    var s = 1.70158;
                    return k * k * ((s + 1) * k - s);
                },
                Out: function (k) {
                    var s = 1.70158;
                    return --k * k * ((s + 1) * k + s) + 1;
                },
                InOut: function (k) {
                    var s = 1.70158 * 1.525;
                    if ((k *= 2) < 1)
                        return 0.5 * (k * k * ((s + 1) * k - s));
                    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
                }
            },
            Bounce: {
                In: function (k) {
                    return 1 - Tween.Easing.Bounce.Out(1 - k);
                },
                Out: function (k) {
                    if (k < (1 / 2.75)) {
                        return 7.5625 * k * k;
                    }
                    else if (k < (2 / 2.75)) {
                        return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
                    }
                    else if (k < (2.5 / 2.75)) {
                        return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
                    }
                    else {
                        return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
                    }
                },
                InOut: function (k) {
                    if (k < 0.5)
                        return Tween.Easing.Bounce.In(k * 2) * 0.5;
                    return Tween.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
                }
            }
        };
        Tween.Interpolation = {
            Linear: function (v, k) {
                var m = v.length - 1, f = m * k, i = Math.floor(f), fn = Tween.Interpolation.Utils.Linear;
                if (k < 0)
                    return fn(v[0], v[1], f);
                if (k > 1)
                    return fn(v[m], v[m - 1], m - f);
                return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
            },
            Bezier: function (v, k) {
                var b = 0, n = v.length - 1, pw = Math.pow, bn = Tween.Interpolation.Utils.Bernstein, i;
                for (i = 0; i <= n; i++) {
                    b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
                }
                return b;
            },
            CatmullRom: function (v, k) {
                var m = v.length - 1, f = m * k, i = Math.floor(f), fn = Tween.Interpolation.Utils.CatmullRom;
                if (v[0] === v[m]) {
                    if (k < 0)
                        i = Math.floor(f = m * (1 + k));
                    return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
                }
                else {
                    if (k < 0)
                        return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
                    if (k > 1)
                        return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
                    return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
                }
            },
            Utils: {
                Linear: function (p0, p1, t) {
                    return (p1 - p0) * t + p0;
                },
                Bernstein: function (n, i) {
                    var fc = Tween.Interpolation.Utils.Factorial;
                    return fc(n) / fc(i) / fc(n - i);
                },
                Factorial: (function () {
                    var a = [1];
                    return function (n) {
                        var s = 1, i;
                        if (a[n])
                            return a[n];
                        for (i = n; i > 1; i--)
                            s *= i;
                        return a[n] = s;
                    };
                })(),
                CatmullRom: function (p0, p1, p2, p3, t) {
                    var v0 = (p2 - p0) * 0.5, v1 = (p3 - p1) * 0.5, t2 = t * t, t3 = t * t2;
                    return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
                }
            }
        };
        return Tween;
    })(dy.ActionInterval);
    dy.Tween = Tween;
})(dy || (dy = {}));

/// <reference path="../../../definitions.d.ts"/>
var dy;
(function (dy) {
    var ActionManager = (function () {
        function ActionManager() {
            this._children = dyCb.Collection.create();
        }
        ActionManager.create = function () {
            var obj = new this();
            return obj;
        };
        ActionManager.prototype.addChild = function (action) {
            if (this.hasChild(action)) {
                return;
            }
            this._children.addChild(action);
        };
        ActionManager.prototype.removeChild = function (action) {
            this._children.removeChild(action);
        };
        ActionManager.prototype.hasChild = function (action) {
            return this._children.hasChild(action);
        };
        ActionManager.prototype.update = function (time) {
            var self = this, removeQueue = [];
            this._children.forEach(function (child) {
                if (!child) {
                    return;
                }
                if (child.isFinish) {
                    removeQueue.push(child);
                    return;
                }
                if (child.isStop || child.isPause) {
                    return;
                }
                child.update(time);
            });
            removeQueue.forEach(function (child) {
                self._children.removeChild(child);
            });
        };
        return ActionManager;
    })();
    dy.ActionManager = ActionManager;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Renderer = (function (_super) {
        __extends(Renderer, _super);
        function Renderer() {
            _super.apply(this, arguments);
        }
        Renderer.prototype.render = function (renderer, geometry, camera) {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        return Renderer;
    })(dy.Component);
    dy.Renderer = Renderer;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var MeshRenderer = (function (_super) {
        __extends(MeshRenderer, _super);
        function MeshRenderer() {
            _super.apply(this, arguments);
        }
        MeshRenderer.create = function () {
            var obj = new this();
            return obj;
        };
        MeshRenderer.prototype.render = function (renderer, geometry, camera) {
            this._addDrawCommand(renderer, geometry, this._computeMvpMatrix(camera));
        };
        MeshRenderer.prototype._computeMvpMatrix = function (camera) {
            var cameraComponent = camera.getComponent(dy.Camera);
            dyCb.Log.error(!cameraComponent, "camera must add Camera Component");
            return this.transform.localToWorldMatrix.copy().applyMatrix(cameraComponent.computeVpMatrix());
        };
        MeshRenderer.prototype._addDrawCommand = function (renderer, geometry, mvpMatrix) {
            var quadCmd = renderer.createQuadCommand();
            dyCb.Log.error(!geometry, dyCb.Log.info.FUNC_MUST("Mesh", "add geometry component"));
            quadCmd.buffers = {
                vertexBuffer: geometry.vertices,
                indexBuffer: geometry.indices,
                colorBuffer: geometry.colors
            };
            quadCmd.shader = geometry.material.shader;
            quadCmd.mvpMatrix = mvpMatrix;
            renderer.addCommand(quadCmd);
        };
        return MeshRenderer;
    })(dy.Renderer);
    dy.MeshRenderer = MeshRenderer;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Collider = (function (_super) {
        __extends(Collider, _super);
        function Collider() {
            _super.apply(this, arguments);
        }
        Collider.prototype.collideXY = function (localX, localY) {
            return false;
        };
        Collider.prototype.collide = function (collider) {
            return false;
        };
        return Collider;
    })(dy.Component);
    dy.Collider = Collider;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var TopCollider = (function (_super) {
        __extends(TopCollider, _super);
        function TopCollider() {
            _super.apply(this, arguments);
        }
        TopCollider.create = function () {
            var obj = new this();
            return obj;
        };
        TopCollider.prototype.collideXY = function (localX, localY) {
            return true;
        };
        TopCollider.prototype.collide = function (collider) {
            return true;
        };
        return TopCollider;
    })(dy.Collider);
    dy.TopCollider = TopCollider;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Script = (function (_super) {
        __extends(Script, _super);
        function Script(url) {
            if (url === void 0) { url = null; }
            _super.call(this);
            this.url = null;
            this.url = url;
        }
        Script.create = function () {
            if (arguments.length === 0) {
                return new this();
            }
            if (arguments.length === 1) {
                var url = arguments[0];
                return new this(url);
            }
            else if (arguments.length === 2) {
                var scriptName = arguments[0], callback = arguments[1];
                this.script.push({
                    name: scriptName,
                    class: callback(dy.Director.getInstance())
                });
            }
        };
        Script.prototype.createLoadJsStream = function () {
            dyCb.Log.error(!this.url, dyCb.Log.info.FUNC_MUST_DEFINE("url"));
            return dy.LoaderManager.getInstance().load(this.url)
                .map(function () {
                return Script.script.pop();
            });
        };
        Script.script = dyCb.Stack.create();
        return Script;
    })(dy.Component);
    dy.Script = Script;
})(dy || (dy = {}));



var dy;
(function (dy) {
    dy.DEG_TO_RAD = Math.PI / 180;
    dy.RAD_TO_DEG = 180 / Math.PI;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Vector3 = (function () {
        function Vector3() {
            this._values = new Float32Array(3);
            if (arguments.length > 0) {
                this._values[0] = arguments[0];
                this._values[1] = arguments[1];
                this._values[2] = arguments[2];
            }
        }
        Vector3.create = function () {
            var m = null;
            if (arguments.length === 0) {
                m = new this();
            }
            else {
                m = new this(arguments[0], arguments[1], arguments[2]);
            }
            return m;
        };
        Object.defineProperty(Vector3.prototype, "values", {
            get: function () { return this._values; },
            set: function (values) {
                this._values = values;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "x", {
            get: function () {
                return this._values[0];
            },
            set: function (x) {
                this._values[0] = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "y", {
            get: function () {
                return this._values[1];
            },
            set: function (y) {
                this._values[1] = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector3.prototype, "z", {
            get: function () {
                return this._values[2];
            },
            set: function (z) {
                this._values[2] = z;
            },
            enumerable: true,
            configurable: true
        });
        Vector3.prototype.normalize = function () {
            var v = this._values;
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
            if (d === 0) {
                return this;
            }
            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;
            return this;
        };
        Vector3.prototype.scale = function (scalar) {
            var v = this._values;
            v[0] *= scalar;
            v[1] *= scalar;
            v[2] *= scalar;
            return this;
        };
        Vector3.prototype.set = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        Vector3.prototype.sub = function (v) {
            this._values[0] = this._values[0] - v.values[0];
            this._values[1] = this._values[1] - v.values[1];
            this._values[2] = this._values[2] - v.values[2];
            return this;
        };
        Vector3.prototype.add = function (v) {
            this._values[0] = this._values[0] + v.values[0];
            this._values[1] = this._values[1] + v.values[1];
            this._values[2] = this._values[2] + v.values[2];
            return this;
        };
        Vector3.prototype.reverse = function () {
            this._values[0] = -this._values[0];
            this._values[1] = -this._values[1];
            this._values[2] = -this._values[2];
            return this;
        };
        Vector3.prototype.copy = function () {
            var result = Vector3.create(), i = 0, len = this._values.length;
            for (i = 0; i < len; i++) {
                result.values[i] = this._values[i];
            }
            return result;
        };
        Vector3.prototype.toVec4 = function () {
            return dy.Vector4.create(this._values[0], this._values[1], this._values[2], 1.0);
        };
        Vector3.prototype.length = function () {
            var v = this._values;
            return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        };
        Vector3.prototype.cross = function (lhs, rhs) {
            var a, b, r, ax, ay, az, bx, by, bz;
            a = lhs.values;
            b = rhs.values;
            r = this._values;
            ax = a[0];
            ay = a[1];
            az = a[2];
            bx = b[0];
            by = b[1];
            bz = b[2];
            r[0] = ay * bz - by * az;
            r[1] = az * bx - bz * ax;
            r[2] = ax * by - bx * ay;
            return this;
        };
        Vector3.up = Vector3.create(0, 1, 0);
        Vector3.forward = Vector3.create(0, 0, 1);
        Vector3.right = Vector3.create(1, 0, 0);
        return Vector3;
    })();
    dy.Vector3 = Vector3;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Vector4 = (function () {
        function Vector4() {
            this._values = new Float32Array(4);
            if (arguments.length > 0) {
                this._values[0] = arguments[0];
                this._values[1] = arguments[1];
                this._values[2] = arguments[2];
                this._values[3] = arguments[3];
            }
        }
        Vector4.create = function () {
            var m = null;
            if (arguments.length === 0) {
                m = new this();
            }
            else {
                m = new this(arguments[0], arguments[1], arguments[2], arguments[3]);
            }
            return m;
        };
        Object.defineProperty(Vector4.prototype, "values", {
            get: function () { return this._values; },
            set: function (values) {
                this._values = values;
            },
            enumerable: true,
            configurable: true
        });
        Vector4.prototype.normalize = function () {
            var v = this._values;
            var d = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3]);
            if (d === 0) {
                return Vector4.create(0, 0, 0, 0);
            }
            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;
            v[3] = v[3] / d;
            return this;
        };
        Vector4.prototype.toVec3 = function () {
            return dy.Vector3.create(this._values[0], this._values[1], this._values[2]);
        };
        return Vector4;
    })();
    dy.Vector4 = Vector4;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    /*!
     注意：矩阵元素是按列主序存储在数组中的。
     */
    var Matrix = (function () {
        function Matrix() {
            this._values = null;
            this._matrixArr = null;
            if (arguments.length === 1) {
                this._values = arguments[0];
            }
            else {
                this._values = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            }
            this._matrixArr = [];
        }
        Matrix.create = function () {
            var m = null;
            if (arguments.length === 0) {
                m = new this();
            }
            else {
                m = new this(arguments[0]);
            }
            return m;
        };
        Object.defineProperty(Matrix.prototype, "values", {
            get: function () { return this._values; },
            set: function (values) {
                this._values = values;
            },
            enumerable: true,
            configurable: true
        });
        Matrix.prototype.push = function () {
            this._matrixArr.push(this._values);
        };
        Matrix.prototype.pop = function () {
            this._values = this._matrixArr.pop();
        };
        Matrix.prototype.setIdentity = function () {
            var e = this._values;
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
            return this;
        };
        Matrix.prototype.invert = function () {
            var i, s, d, inv, det;
            s = this._values;
            inv = new Float32Array(16);
            d = this._values;
            inv[0] = s[5] * s[10] * s[15] - s[5] * s[11] * s[14] - s[9] * s[6] * s[15]
                + s[9] * s[7] * s[14] + s[13] * s[6] * s[11] - s[13] * s[7] * s[10];
            inv[4] = -s[4] * s[10] * s[15] + s[4] * s[11] * s[14] + s[8] * s[6] * s[15]
                - s[8] * s[7] * s[14] - s[12] * s[6] * s[11] + s[12] * s[7] * s[10];
            inv[8] = s[4] * s[9] * s[15] - s[4] * s[11] * s[13] - s[8] * s[5] * s[15]
                + s[8] * s[7] * s[13] + s[12] * s[5] * s[11] - s[12] * s[7] * s[9];
            inv[12] = -s[4] * s[9] * s[14] + s[4] * s[10] * s[13] + s[8] * s[5] * s[14]
                - s[8] * s[6] * s[13] - s[12] * s[5] * s[10] + s[12] * s[6] * s[9];
            inv[1] = -s[1] * s[10] * s[15] + s[1] * s[11] * s[14] + s[9] * s[2] * s[15]
                - s[9] * s[3] * s[14] - s[13] * s[2] * s[11] + s[13] * s[3] * s[10];
            inv[5] = s[0] * s[10] * s[15] - s[0] * s[11] * s[14] - s[8] * s[2] * s[15]
                + s[8] * s[3] * s[14] + s[12] * s[2] * s[11] - s[12] * s[3] * s[10];
            inv[9] = -s[0] * s[9] * s[15] + s[0] * s[11] * s[13] + s[8] * s[1] * s[15]
                - s[8] * s[3] * s[13] - s[12] * s[1] * s[11] + s[12] * s[3] * s[9];
            inv[13] = s[0] * s[9] * s[14] - s[0] * s[10] * s[13] - s[8] * s[1] * s[14]
                + s[8] * s[2] * s[13] + s[12] * s[1] * s[10] - s[12] * s[2] * s[9];
            inv[2] = s[1] * s[6] * s[15] - s[1] * s[7] * s[14] - s[5] * s[2] * s[15]
                + s[5] * s[3] * s[14] + s[13] * s[2] * s[7] - s[13] * s[3] * s[6];
            inv[6] = -s[0] * s[6] * s[15] + s[0] * s[7] * s[14] + s[4] * s[2] * s[15]
                - s[4] * s[3] * s[14] - s[12] * s[2] * s[7] + s[12] * s[3] * s[6];
            inv[10] = s[0] * s[5] * s[15] - s[0] * s[7] * s[13] - s[4] * s[1] * s[15]
                + s[4] * s[3] * s[13] + s[12] * s[1] * s[7] - s[12] * s[3] * s[5];
            inv[14] = -s[0] * s[5] * s[14] + s[0] * s[6] * s[13] + s[4] * s[1] * s[14]
                - s[4] * s[2] * s[13] - s[12] * s[1] * s[6] + s[12] * s[2] * s[5];
            inv[3] = -s[1] * s[6] * s[11] + s[1] * s[7] * s[10] + s[5] * s[2] * s[11]
                - s[5] * s[3] * s[10] - s[9] * s[2] * s[7] + s[9] * s[3] * s[6];
            inv[7] = s[0] * s[6] * s[11] - s[0] * s[7] * s[10] - s[4] * s[2] * s[11]
                + s[4] * s[3] * s[10] + s[8] * s[2] * s[7] - s[8] * s[3] * s[6];
            inv[11] = -s[0] * s[5] * s[11] + s[0] * s[7] * s[9] + s[4] * s[1] * s[11]
                - s[4] * s[3] * s[9] - s[8] * s[1] * s[7] + s[8] * s[3] * s[5];
            inv[15] = s[0] * s[5] * s[10] - s[0] * s[6] * s[9] - s[4] * s[1] * s[10]
                + s[4] * s[2] * s[9] + s[8] * s[1] * s[6] - s[8] * s[2] * s[5];
            det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
            if (det === 0) {
                return this;
            }
            det = 1 / det;
            for (i = 0; i < 16; i++) {
                d[i] = inv[i] * det;
            }
            return this;
        };
        Matrix.prototype.transpose = function () {
            var e, t;
            e = this._values;
            t = e[1];
            e[1] = e[4];
            e[4] = t;
            t = e[2];
            e[2] = e[8];
            e[8] = t;
            t = e[3];
            e[3] = e[12];
            e[12] = t;
            t = e[6];
            e[6] = e[9];
            e[9] = t;
            t = e[7];
            e[7] = e[13];
            e[13] = t;
            t = e[11];
            e[11] = e[14];
            e[14] = t;
            return this;
        };
        Matrix.prototype.setTranslate = function (x, y, z) {
            var e = this._values;
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = x;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = y;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = z;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
            return this;
        };
        Matrix.prototype.translate = function (x, y, z) {
            this.applyMatrix(Matrix.create().setTranslate(x, y, z));
            return this;
        };
        Matrix.prototype.setRotate = function (angle, x, y, z) {
            var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
            var angle = Math.PI * angle / 180;
            e = this._values;
            s = Math.sin(angle);
            c = Math.cos(angle);
            if (0 !== x && 0 === y && 0 === z) {
                if (x < 0) {
                    s = -s;
                }
                e[0] = 1;
                e[4] = 0;
                e[8] = 0;
                e[12] = 0;
                e[1] = 0;
                e[5] = c;
                e[9] = -s;
                e[13] = 0;
                e[2] = 0;
                e[6] = s;
                e[10] = c;
                e[14] = 0;
                e[3] = 0;
                e[7] = 0;
                e[11] = 0;
                e[15] = 1;
            }
            else if (0 === x && 0 !== y && 0 === z) {
                if (y < 0) {
                    s = -s;
                }
                e[0] = c;
                e[4] = 0;
                e[8] = s;
                e[12] = 0;
                e[1] = 0;
                e[5] = 1;
                e[9] = 0;
                e[13] = 0;
                e[2] = -s;
                e[6] = 0;
                e[10] = c;
                e[14] = 0;
                e[3] = 0;
                e[7] = 0;
                e[11] = 0;
                e[15] = 1;
            }
            else if (0 === x && 0 === y && 0 !== z) {
                if (z < 0) {
                    s = -s;
                }
                e[0] = c;
                e[4] = -s;
                e[8] = 0;
                e[12] = 0;
                e[1] = s;
                e[5] = c;
                e[9] = 0;
                e[13] = 0;
                e[2] = 0;
                e[6] = 0;
                e[10] = 1;
                e[14] = 0;
                e[3] = 0;
                e[7] = 0;
                e[11] = 0;
                e[15] = 1;
            }
            else {
                len = Math.sqrt(x * x + y * y + z * z);
                if (len !== 1) {
                    rlen = 1 / len;
                    x *= rlen;
                    y *= rlen;
                    z *= rlen;
                }
                nc = 1 - c;
                xy = x * y;
                yz = y * z;
                zx = z * x;
                xs = x * s;
                ys = y * s;
                zs = z * s;
                e[0] = x * x * nc + c;
                e[1] = xy * nc + zs;
                e[2] = zx * nc - ys;
                e[3] = 0;
                e[4] = xy * nc - zs;
                e[5] = y * y * nc + c;
                e[6] = yz * nc + xs;
                e[7] = 0;
                e[8] = zx * nc + ys;
                e[9] = yz * nc - xs;
                e[10] = z * z * nc + c;
                e[11] = 0;
                e[12] = 0;
                e[13] = 0;
                e[14] = 0;
                e[15] = 1;
            }
            return this;
        };
        Matrix.prototype.rotate = function (args) {
            var angle = arguments[0];
            if (arguments.length === 2) {
                var vector3 = arguments[1];
                this.applyMatrix(Matrix.create().setRotate(angle, vector3.values[0], vector3.values[1], vector3.values[2]));
            }
            else if (arguments.length === 4) {
                var x = arguments[1], y = arguments[2], z = arguments[3];
                this.applyMatrix(Matrix.create().setRotate(angle, x, y, z));
            }
            return this;
        };
        Matrix.prototype.setScale = function (x, y, z) {
            var e = this._values;
            e[0] = x;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = y;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = z;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
            return this;
        };
        Matrix.prototype.scale = function (x, y, z) {
            this.applyMatrix(Matrix.create().setScale(x, y, z));
            return this;
        };
        Matrix.prototype.setLookAt = function (args) {
            var x, y, z, eye, center, up;
            if (arguments.length === 3) {
                eye = arguments[0];
                center = arguments[1];
                up = arguments[2];
            }
            else if (arguments.length === 9) {
                eye = dy.Vector3.create(arguments[0], arguments[1], arguments[2]);
                center = dy.Vector3.create(arguments[3], arguments[4], arguments[5]);
                up = dy.Vector3.create(arguments[6], arguments[7], arguments[8]);
            }
            x = dy.Vector3.create();
            z = eye.copy().sub(center).normalize();
            y = up.copy().normalize();
            x.cross(y, z).normalize();
            y.cross(z, x);
            var r = this._values;
            r[0] = x.x;
            r[1] = x.y;
            r[2] = x.z;
            r[3] = 0;
            r[4] = y.x;
            r[5] = y.y;
            r[6] = y.z;
            r[7] = 0;
            r[8] = z.x;
            r[9] = z.y;
            r[10] = z.z;
            r[11] = 0;
            r[12] = eye.x;
            r[13] = eye.y;
            r[14] = eye.z;
            r[15] = 1;
            return this;
        };
        Matrix.prototype.lookAt = function (args) {
            var matrix = Matrix.create();
            this.applyMatrix(matrix.setLookAt.apply(matrix, Array.prototype.slice.call(arguments, 0)));
            return this;
        };
        Matrix.prototype.setOrtho = function (near, far) {
            var e = this._values;
            e[0] = 1;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;
            e[4] = 0;
            e[5] = 1;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = 2 / (near - far);
            e[11] = 0;
            e[12] = 0;
            e[13] = 0;
            e[14] = (near + far) / (near - far);
            e[15] = 1;
            return this;
        };
        Matrix.prototype.ortho = function (n, f) {
            this.applyMatrix(Matrix.create().setOrtho(n, f));
            return this;
        };
        Matrix.prototype.setPerspective = function (fovy, aspect, near, far) {
            var e, rd, s, ct, log = dyCb.Log, info = log.info;
            log.error(near === far || aspect === 0, info.FUNC_MUST_NOT_BE("frustum", "null"));
            log.error(near <= 0, info.FUNC_MUST("near", "> 0"));
            log.error(far <= 0, info.FUNC_MUST("far", "> 0"));
            var fovy = Math.PI * fovy / 180 / 2;
            s = Math.sin(fovy);
            if (s === 0) {
                log.error(s === 0, info.FUNC_MUST_NOT_BE("frustum", "null"));
            }
            rd = 1 / (far - near);
            ct = Math.cos(fovy) / s;
            e = this._values;
            e[0] = ct / aspect;
            e[1] = 0;
            e[2] = 0;
            e[3] = 0;
            e[4] = 0;
            e[5] = ct;
            e[6] = 0;
            e[7] = 0;
            e[8] = 0;
            e[9] = 0;
            e[10] = -(far + near) * rd;
            e[11] = -1;
            e[12] = 0;
            e[13] = 0;
            e[14] = -2 * near * far * rd;
            e[15] = 0;
            return this;
        };
        Matrix.prototype.perspective = function (fovy, aspect, near, far) {
            this.applyMatrix(Matrix.create().setPerspective(fovy, aspect, near, far));
            return this;
        };
        Matrix.prototype.applyMatrix = function (other) {
            var a = this, b = other.copy();
            this._values = b.multiply(a).values;
            return this;
        };
        Matrix.prototype.multiply = function (args) {
            var mat1 = null, mat2 = null, result = null;
            result = this._values;
            if (arguments.length === 1) {
                mat1 = this._values;
                mat2 = arguments[0].values;
            }
            else if (arguments.length === 2) {
                mat1 = arguments[0].values;
                mat2 = arguments[1].values;
            }
            var a = mat1[0], b = mat1[1], c = mat1[2], d = mat1[3], e = mat1[4], f = mat1[5], g = mat1[6], h = mat1[7], i = mat1[8], j = mat1[9], k = mat1[10], l = mat1[11], m = mat1[12], n = mat1[13], o = mat1[14], p = mat1[15], A = mat2[0], B = mat2[1], C = mat2[2], D = mat2[3], E = mat2[4], F = mat2[5], G = mat2[6], H = mat2[7], I = mat2[8], J = mat2[9], K = mat2[10], L = mat2[11], M = mat2[12], N = mat2[13], O = mat2[14], P = mat2[15];
            result[0] = A * a + B * e + C * i + D * m;
            result[1] = A * b + B * f + C * j + D * n;
            result[2] = A * c + B * g + C * k + D * o;
            result[3] = A * d + B * h + C * l + D * p;
            result[4] = E * a + F * e + G * i + H * m;
            result[5] = E * b + F * f + G * j + H * n;
            result[6] = E * c + F * g + G * k + H * o;
            result[7] = E * d + F * h + G * l + H * p;
            result[8] = I * a + J * e + K * i + L * m;
            result[9] = I * b + J * f + K * j + L * n;
            result[10] = I * c + J * g + K * k + L * o;
            result[11] = I * d + J * h + K * l + L * p;
            result[12] = M * a + N * e + O * i + P * m;
            result[13] = M * b + N * f + O * j + P * n;
            result[14] = M * c + N * g + O * k + P * o;
            result[15] = M * d + N * h + O * l + P * p;
            return this;
        };
        Matrix.prototype.multiplyVector4 = function (vector) {
            var mat1 = this._values, vec4 = vector.values;
            var result = [];
            result[0] = vec4[0] * mat1[0] + vec4[1] * mat1[4] + vec4[2] * mat1[8] + vec4[3] * mat1[12];
            result[1] = vec4[0] * mat1[1] + vec4[1] * mat1[5] + vec4[2] * mat1[9] + vec4[3] * mat1[13];
            result[2] = vec4[0] * mat1[2] + vec4[1] * mat1[6] + vec4[2] * mat1[10] + vec4[3] * mat1[14];
            result[3] = vec4[0] * mat1[3] + vec4[1] * mat1[7] + vec4[2] * mat1[11] + vec4[3] * mat1[15];
            return dy.Vector4.create(result[0], result[1], result[2], result[3]);
        };
        Matrix.prototype.multiplyVector3 = function (vector) {
            var mat1 = this._values, vec3 = vector.values;
            var result = [];
            result[0] = vec3[0] * mat1[0] + vec3[1] * mat1[4] + vec3[2] * mat1[8] + mat1[12];
            result[1] = vec3[0] * mat1[1] + vec3[1] * mat1[5] + vec3[2] * mat1[9] + mat1[13];
            result[2] = vec3[0] * mat1[2] + vec3[1] * mat1[6] + vec3[2] * mat1[10] + mat1[14];
            return dy.Vector3.create(result[0], result[1], result[2]);
        };
        Matrix.prototype.copy = function () {
            var result = Matrix.create(), i = 0, len = this._values.length;
            for (i = 0; i < len; i++) {
                result.values[i] = this._values[i];
            }
            return result;
        };
        Matrix.prototype.getX = function () {
            return dy.Vector3.create(this._values[0], this._values[1], this._values[2]);
        };
        Matrix.prototype.getY = function () {
            return dy.Vector3.create(this._values[4], this._values[5], this._values[6]);
        };
        Matrix.prototype.getZ = function () {
            return dy.Vector3.create(this._values[8], this._values[9], this._values[10]);
        };
        Matrix.prototype.getTranslation = function () {
            return dy.Vector3.create(this._values[12], this._values[13], this._values[14]);
        };
        Matrix.prototype.getScale = function () {
            return dy.Vector3.create(this.getX().length(), this.getY().length(), this.getZ().length());
        };
        Matrix.prototype.getEulerAngles = function () {
            var x, y, z, sx, sy, sz, m, halfPi;
            var scale = this.getScale();
            sx = scale.x;
            sy = scale.y;
            sz = scale.z;
            m = this._values;
            y = Math.asin(-m[2] / sx);
            halfPi = Math.PI * 0.5;
            if (y < halfPi) {
                if (y > -halfPi) {
                    x = Math.atan2(m[6] / sy, m[10] / sz);
                    z = Math.atan2(m[1] / sx, m[0] / sx);
                }
                else {
                    z = 0;
                    x = -Math.atan2(m[4] / sy, m[5] / sy);
                }
            }
            else {
                z = 0;
                x = Math.atan2(m[4] / sy, m[5] / sy);
            }
            return dy.Vector3.create(x, y, z).scale(dy.RAD_TO_DEG);
        };
        Matrix.prototype.setTRS = function (t, r, s) {
            var tx, ty, tz, qx, qy, qz, qw, sx, sy, sz, x2, y2, z2, xx, xy, xz, yy, yz, zz, wx, wy, wz, m;
            tx = t.x;
            ty = t.y;
            tz = t.z;
            qx = r.x;
            qy = r.y;
            qz = r.z;
            qw = r.w;
            sx = s.x;
            sy = s.y;
            sz = s.z;
            x2 = qx + qx;
            y2 = qy + qy;
            z2 = qz + qz;
            xx = qx * x2;
            xy = qx * y2;
            xz = qx * z2;
            yy = qy * y2;
            yz = qy * z2;
            zz = qz * z2;
            wx = qw * x2;
            wy = qw * y2;
            wz = qw * z2;
            m = this._values;
            m[0] = (1 - (yy + zz)) * sx;
            m[1] = (xy + wz) * sx;
            m[2] = (xz - wy) * sx;
            m[3] = 0;
            m[4] = (xy - wz) * sy;
            m[5] = (1 - (xx + zz)) * sy;
            m[6] = (yz + wx) * sy;
            m[7] = 0;
            m[8] = (xz + wy) * sz;
            m[9] = (yz - wx) * sz;
            m[10] = (1 - (xx + yy)) * sz;
            m[11] = 0;
            m[12] = tx;
            m[13] = ty;
            m[14] = tz;
            m[15] = 1;
            return this;
        };
        return Matrix;
    })();
    dy.Matrix = Matrix;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Quaternion = (function () {
        function Quaternion(x, y, z, w) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            if (w === void 0) { w = 1; }
            this._x = null;
            this._y = null;
            this._z = null;
            this._w = null;
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
        }
        Quaternion.create = function (x, y, z, w) {
            var obj = new this(x, y, z, w);
            return obj;
        };
        Object.defineProperty(Quaternion.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (x) {
                this._x = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (y) {
                this._y = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "z", {
            get: function () {
                return this._z;
            },
            set: function (z) {
                this._z = z;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Quaternion.prototype, "w", {
            get: function () {
                return this._w;
            },
            set: function (w) {
                this._w = w;
            },
            enumerable: true,
            configurable: true
        });
        Quaternion.prototype.setFromEulerAngles = function (eulerAngles) {
            var sx, cx, sy, cy, sz, cz, halfToRad, ex = eulerAngles.x, ey = eulerAngles.y, ez = eulerAngles.z;
            halfToRad = 0.5 * dy.DEG_TO_RAD;
            ex *= halfToRad;
            ey *= halfToRad;
            ez *= halfToRad;
            sx = Math.sin(ex);
            cx = Math.cos(ex);
            sy = Math.sin(ey);
            cy = Math.cos(ey);
            sz = Math.sin(ez);
            cz = Math.cos(ez);
            this._x = sx * cy * cz - cx * sy * sz;
            this._y = cx * sy * cz + sx * cy * sz;
            this._z = cx * cy * sz - sx * sy * cz;
            this._w = cx * cy * cz + sx * sy * sz;
            return this;
        };
        Quaternion.prototype.multiply = function (args) {
            var q1x, q1y, q1z, q1w, q2x, q2y, q2z, q2w, rhs1, rhs2, result = this;
            if (arguments.length === 1) {
                rhs1 = this;
                rhs2 = arguments[0];
            }
            else if (arguments.length === 2) {
                rhs1 = arguments[0];
                rhs2 = arguments[1];
            }
            q1x = rhs1.x;
            q1y = rhs1.y;
            q1z = rhs1.z;
            q1w = rhs1.w;
            q2x = rhs2.x;
            q2y = rhs2.y;
            q2z = rhs2.z;
            q2w = rhs2.w;
            result.x = q1w * q2x + q1x * q2w + q1y * q2z - q1z * q2y;
            result.y = q1w * q2y + q1y * q2w + q1z * q2x - q1x * q2z;
            result.z = q1w * q2z + q1z * q2w + q1x * q2y - q1y * q2x;
            result.w = q1w * q2w - q1x * q2x - q1y * q2y - q1z * q2z;
            return result;
        };
        Quaternion.prototype.setFromMatrix = function (matrix) {
            var m00, m01, m02, m10, m11, m12, m20, m21, m22, tr, s, rs, lx, ly, lz, m;
            m = matrix.values;
            m00 = m[0];
            m01 = m[1];
            m02 = m[2];
            m10 = m[4];
            m11 = m[5];
            m12 = m[6];
            m20 = m[8];
            m21 = m[9];
            m22 = m[10];
            lx = 1 / Math.sqrt(m00 * m00 + m01 * m01 + m02 * m02);
            ly = 1 / Math.sqrt(m10 * m10 + m11 * m11 + m12 * m12);
            lz = 1 / Math.sqrt(m20 * m20 + m21 * m21 + m22 * m22);
            m00 *= lx;
            m01 *= lx;
            m02 *= lx;
            m10 *= ly;
            m11 *= ly;
            m12 *= ly;
            m20 *= lz;
            m21 *= lz;
            m22 *= lz;
            tr = m00 + m11 + m22;
            if (tr >= 0) {
                s = Math.sqrt(tr + 1);
                this._w = s * 0.5;
                s = 0.5 / s;
                this._x = (m12 - m21) * s;
                this._y = (m20 - m02) * s;
                this._z = (m01 - m10) * s;
            }
            else {
                if (m00 > m11) {
                    if (m00 > m22) {
                        rs = (m00 - (m11 + m22)) + 1;
                        rs = Math.sqrt(rs);
                        this._x = rs * 0.5;
                        rs = 0.5 / rs;
                        this._w = (m12 - m21) * rs;
                        this._y = (m01 + m10) * rs;
                        this._z = (m02 + m20) * rs;
                    }
                    else {
                        rs = (m22 - (m00 + m11)) + 1;
                        rs = Math.sqrt(rs);
                        this._z = rs * 0.5;
                        rs = 0.5 / rs;
                        this._w = (m01 - m10) * rs;
                        this._x = (m20 + m02) * rs;
                        this._y = (m21 + m12) * rs;
                    }
                }
                else if (m11 > m22) {
                    rs = (m11 - (m22 + m00)) + 1;
                    rs = Math.sqrt(rs);
                    this._y = rs * 0.5;
                    rs = 0.5 / rs;
                    this._w = (m20 - m02) * rs;
                    this._z = (m12 + m21) * rs;
                    this._x = (m10 + m01) * rs;
                }
                else {
                    rs = (m22 - (m00 + m11)) + 1;
                    rs = Math.sqrt(rs);
                    this._z = rs * 0.5;
                    rs = 0.5 / rs;
                    this._w = (m01 - m10) * rs;
                    this._x = (m20 + m02) * rs;
                    this._y = (m21 + m12) * rs;
                }
            }
            return this;
        };
        Quaternion.prototype.setFromAxisAngle = function (angle, axis) {
            var sa, ca;
            axis = axis.normalize();
            angle *= 0.5 * dy.DEG_TO_RAD;
            sa = Math.sin(angle);
            ca = Math.cos(angle);
            this._x = sa * axis.x;
            this._y = sa * axis.y;
            this._z = sa * axis.z;
            this._w = ca;
            return this;
        };
        Quaternion.prototype.invert = function () {
            return this.conjugate().normalize();
        };
        Quaternion.prototype.conjugate = function () {
            this._x *= -1;
            this._y *= -1;
            this._z *= -1;
            return this;
        };
        Quaternion.prototype.clone = function () {
            return Quaternion.create(this._x, this._y, this._z, this._w);
        };
        Quaternion.prototype.copy = function () {
            return Quaternion.create(this._x, this._y, this._z, this._w);
        };
        Quaternion.prototype.normalize = function () {
            var len = this.length();
            if (len === 0) {
                this._x = this._y = this._z = 0;
                this._w = 1;
            }
            else {
                len = 1 / len;
                this._x *= len;
                this._y *= len;
                this._z *= len;
                this._w *= len;
            }
            return this;
        };
        Quaternion.prototype.length = function () {
            var x, y, z, w;
            x = this._x;
            y = this._y;
            z = this._z;
            w = this._w;
            return Math.sqrt(x * x + y * y + z * z + w * w);
        };
        Quaternion.prototype.multiplyVector3 = function (vector) {
            //
            ////这里实际上调用的是vector.applyQuaternion()方法,将四元数变换应用到三维向量vector.
            //console.warn( 'THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.' );
            //return vector.applyQuaternion( this );
            var q = this;
            var x = vector.x;
            var y = vector.y;
            var z = vector.z;
            var qx = q.x;
            var qy = q.y;
            var qz = q.z;
            var qw = q.w;
            var ix = qw * x + qy * z - qz * y;
            var iy = qw * y + qz * x - qx * z;
            var iz = qw * z + qx * y - qy * x;
            var iw = -qx * x - qy * y - qz * z;
            return dy.Vector3.create(ix * qw + iw * -qx + iy * -qz - iz * -qy, iy * qw + iw * -qy + iz * -qx - ix * -qz, iz * qw + iw * -qz + ix * -qy - iy * -qx);
        };
        Quaternion.prototype.set = function (x, y, z, w) {
            this._x = x;
            this._y = y;
            this._z = z;
            this._w = w;
        };
        Quaternion.prototype.sub = function (quat) {
            var result = quat.copy().invert().multiply(this);
            this.set(result.x, result.y, result.z, result.w);
            return this;
        };
        Quaternion.prototype.getEulerAngles = function () {
            var x, y, z, qx, qy, qz, qw, a2;
            qx = this._x;
            qy = this._y;
            qz = this._z;
            qw = this._w;
            a2 = 2 * (qw * qy - qx * qz);
            if (a2 <= -0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = -Math.PI / 2;
                z = 0;
            }
            else if (a2 >= 0.99999) {
                x = 2 * Math.atan2(qx, qw);
                y = Math.PI / 2;
                z = 0;
            }
            else {
                x = Math.atan2(2 * (qw * qx + qy * qz), 1 - 2 * (qx * qx + qy * qy));
                y = Math.asin(a2);
                z = Math.atan2(2 * (qw * qz + qx * qy), 1 - 2 * (qy * qy + qz * qz));
            }
            return dy.Vector3.create(x, y, z).scale(dy.RAD_TO_DEG);
        };
        return Quaternion;
    })();
    dy.Quaternion = Quaternion;
})(dy || (dy = {}));

var dy;
(function (dy) {
    var Color = (function () {
        function Color() {
            this._r = null;
            this._g = null;
            this._b = null;
        }
        Color.create = function (colorVal) {
            var obj = new this();
            obj.initWhenCreate(colorVal);
            return obj;
        };
        Object.defineProperty(Color.prototype, "r", {
            get: function () {
                return this._r;
            },
            set: function (r) {
                this._r = r;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "g", {
            get: function () {
                return this._g;
            },
            set: function (g) {
                this._g = g;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Color.prototype, "b", {
            get: function () {
                return this._b;
            },
            set: function (b) {
                this._b = b;
            },
            enumerable: true,
            configurable: true
        });
        Color.prototype.initWhenCreate = function (colorVal) {
            this._setColor(colorVal);
        };
        Color.prototype._setColor = function (colorVal) {
            //
            //// rgb(255,0,0)
            ////
            ////将我们平常习惯的颜色值表达形式rgb(255,0,0)-数值型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0-255换算成0.0-1.0.
            //
            //if ( /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为数值型rgb(255,0,0)
            //
            //    var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;		//将数组中的第2个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.r
            //    this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;		//将数组中的第3个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.g
            //    this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;		//将数组中的第4个元素转换成10进制int类型整数，判断是否小于255，然后除以255，得出小数，复制给Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}
            //
            //// rgb(100%,0%,0%)
            ////将我们平常习惯的颜色值表达形式rgb(100%,0%,0%)-百分比型，转换成THREE.JS认识的形式0.0-1.0，
            ////这里将取值范围从0%-100%换算成0.0-1.0.
            //
            //if ( /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test( style ) ) {	//用正则表达式检查当前传递的颜色值表达样式是否为百分比型rgb(100%,0%,0%)
            //
            //    var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec( style );	//将字符串中的数值赋值给color，color是一个数组。
            //
            //    this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;		//将数组中的第2个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.r
            //    this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;		//将数组中的第3个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.g
            //    this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;		//将数组中的第4个元素转换成10进制int类型整数，判断是否小于100，然后除以100，得出小数，复制给Color.b
            //
            //    return this; //返回颜色对象。
            //
            //}
            if (/^\#([0-9a-f]{6})$/i.test(colorVal)) {
                var color = /^\#([0-9a-f]{6})$/i.exec(colorVal);
                this._setHex(parseInt(color[1], 16));
                return this;
            }
        };
        Color.prototype._setHex = function (hex) {
            hex = Math.floor(hex);
            this._r = (hex >> 16 & 255) / 255;
            this._g = (hex >> 8 & 255) / 255;
            this._b = (hex & 255) / 255;
            return this;
        };
        return Color;
    })();
    dy.Color = Color;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var JudgeUtils = (function (_super) {
        __extends(JudgeUtils, _super);
        function JudgeUtils() {
            _super.apply(this, arguments);
        }
        JudgeUtils.isView = function (obj) {
            return !!obj && obj.offset && obj.width && obj.height && this.isFunction(obj.getContext);
        };
        JudgeUtils.isEqual = function (target1, target2) {
            return target1.uid === target2.uid;
        };
        return JudgeUtils;
    })(dyCb.JudgeUtils);
    dy.JudgeUtils = JudgeUtils;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var TimeController = (function () {
        function TimeController() {
            this.elapsed = null;
            this.pauseElapsed = 0;
            this.pauseTime = null;
            this.startTime = null;
        }
        TimeController.prototype.start = function () {
            this.startTime = this.getNow();
            this.pauseElapsed = null;
        };
        TimeController.prototype.stop = function () {
            this.startTime = null;
        };
        TimeController.prototype.pause = function () {
            this.pauseTime = this.getNow();
        };
        TimeController.prototype.resume = function () {
            this.pauseElapsed += this.getNow() - this.pauseTime;
            this.pauseTime = null;
        };
        TimeController.prototype.computeElapseTime = function (time) {
            if (this.pauseElapsed) {
                this.elapsed = time - this.pauseElapsed - this.startTime;
                return this.elapsed;
            }
            this.elapsed = time - this.startTime;
            return this.elapsed;
        };
        TimeController.prototype.getNow = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        return TimeController;
    })();
    dy.TimeController = TimeController;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var STARTING_FPS = 60, GAMETIME_SCALE = 1000;
    var DirectorTimeController = (function (_super) {
        __extends(DirectorTimeController, _super);
        function DirectorTimeController() {
            _super.apply(this, arguments);
            this.gameTime = null;
            this.fps = null;
            this.isTimeChange = false;
            this._lastTime = null;
        }
        DirectorTimeController.create = function () {
            var obj = new this();
            return obj;
        };
        DirectorTimeController.prototype.tick = function (time) {
            this._updateFps(time);
            this.gameTime = time / GAMETIME_SCALE;
            this._lastTime = time;
        };
        DirectorTimeController.prototype.start = function () {
            _super.prototype.start.call(this);
            this.isTimeChange = true;
            this.elapsed = 0;
        };
        DirectorTimeController.prototype.resume = function () {
            _super.prototype.resume.call(this);
            this.isTimeChange = true;
        };
        DirectorTimeController.prototype.getNow = function () {
            return window.performance.now();
        };
        DirectorTimeController.prototype._updateFps = function (time) {
            //if (this._loopType === YE.Director.LoopType.INTERVAL) {
            //    this._fps = 1 / this._loopInterval;
            //    return;
            //}
            if (this._lastTime === null) {
                this.fps = STARTING_FPS;
            }
            else {
                this.fps = 1000 / (time - this._lastTime);
            }
        };
        return DirectorTimeController;
    })(dy.TimeController);
    dy.DirectorTimeController = DirectorTimeController;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var CommonTimeController = (function (_super) {
        __extends(CommonTimeController, _super);
        function CommonTimeController() {
            _super.apply(this, arguments);
        }
        CommonTimeController.create = function () {
            var obj = new this();
            return obj;
        };
        CommonTimeController.prototype.getNow = function () {
            if (dy.Director.getInstance().isTimeChange) {
                return dy.Director.getInstance().elapsed;
            }
            return window.performance.now();
        };
        return CommonTimeController;
    })(dy.TimeController);
    dy.CommonTimeController = CommonTimeController;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var render;
    (function (render) {
        var Renderer = (function () {
            function Renderer() {
            }
            Renderer.prototype.createQuadCommand = function () {
                return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
            };
            Renderer.prototype.addCommand = function (command) {
                return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
            };
            Renderer.prototype.render = function () {
                return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
            };
            Renderer.prototype.init = function () {
            };
            return Renderer;
        })();
        render.Renderer = Renderer;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var render;
    (function (render) {
        var WebGLRenderer = (function (_super) {
            __extends(WebGLRenderer, _super);
            function WebGLRenderer() {
                _super.apply(this, arguments);
                this._commandQueue = dyCb.Collection.create();
                this._clearColor = dy.Color.create("#000000");
                this._clearAlpha = 1.0;
            }
            WebGLRenderer.create = function () {
                var obj = new this();
                return obj;
            };
            WebGLRenderer.prototype.createQuadCommand = function () {
                return render.QuadCommand.create();
            };
            WebGLRenderer.prototype.addCommand = function (command) {
                if (this._commandQueue.hasChild(command)) {
                    return;
                }
                this._commandQueue.addChild(command);
                command.init();
            };
            WebGLRenderer.prototype.render = function () {
                this._commandQueue.forEach(function (command) {
                    command.execute();
                });
                this._clearCommand();
            };
            WebGLRenderer.prototype.init = function () {
                dy.Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.b, this._clearAlpha);
            };
            WebGLRenderer.prototype.setClearColor = function (color, alpha) {
                if (alpha === void 0) { alpha = 1.0; }
                this._clearColor = color;
                this._clearAlpha = alpha;
                dy.Director.getInstance().gl.clearColor(this._clearColor.r, this._clearColor.g, this._clearColor.g, this._clearAlpha);
            };
            WebGLRenderer.prototype._clearCommand = function () {
                this._commandQueue.removeAllChildren();
            };
            return WebGLRenderer;
        })(render.Renderer);
        render.WebGLRenderer = WebGLRenderer;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var render;
    (function (render) {
        var Shader = (function () {
            function Shader(vsSource, fsSource) {
                this._vsSource = null;
                this._fsSource = null;
                this._vsSource = vsSource;
                this._fsSource = fsSource;
            }
            Shader.create = function (vsSource, fsSource) {
                var obj = new this(vsSource, fsSource);
                return obj;
            };
            Object.defineProperty(Shader.prototype, "vsSource", {
                get: function () {
                    return this._vsSource;
                },
                set: function (vsSource) {
                    this._vsSource = vsSource;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Shader.prototype, "fsSource", {
                get: function () {
                    return this._fsSource;
                },
                set: function (fsSource) {
                    this._fsSource = fsSource;
                },
                enumerable: true,
                configurable: true
            });
            Shader.prototype.createVsShader = function () {
                var gl = dy.Director.getInstance().gl;
                return this._initShader(gl.createShader(gl.VERTEX_SHADER), this._vsSource);
            };
            Shader.prototype.createFsShader = function () {
                var gl = dy.Director.getInstance().gl;
                return this._initShader(gl.createShader(gl.FRAGMENT_SHADER), this._fsSource);
            };
            Shader.prototype.isEqual = function (other) {
                return this._vsSource === other.vsSource
                    && this._fsSource === other.fsSource;
            };
            Shader.prototype._initShader = function (shader, source) {
                var gl = dy.Director.getInstance().gl;
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                    return shader;
                }
                else {
                    dyCb.Log.log(gl.getShaderInfoLog(shader));
                }
            };
            return Shader;
        })();
        render.Shader = Shader;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

var dy;
(function (dy) {
    var render;
    (function (render) {
        (function (BufferType) {
            BufferType[BufferType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
            BufferType[BufferType["SHORT"] = "SHORT"] = "SHORT";
            BufferType[BufferType["UNSIGNED_SHORT"] = "UNSIGNED_SHORT"] = "UNSIGNED_SHORT";
            BufferType[BufferType["INT"] = "INT"] = "INT";
            BufferType[BufferType["UNSIGNED_INT"] = "UNSIGNED_INT"] = "UNSIGNED_INT";
            BufferType[BufferType["FLOAT"] = "FLOAT"] = "FLOAT";
        })(render.BufferType || (render.BufferType = {}));
        var BufferType = render.BufferType;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

var dy;
(function (dy) {
    var render;
    (function (render) {
        (function (AttributeDataType) {
            AttributeDataType[AttributeDataType["FLOAT_4"] = 0] = "FLOAT_4";
            AttributeDataType[AttributeDataType["BUFFER"] = 1] = "BUFFER";
        })(render.AttributeDataType || (render.AttributeDataType = {}));
        var AttributeDataType = render.AttributeDataType;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

var dy;
(function (dy) {
    var render;
    (function (render) {
        (function (DrawMode) {
            DrawMode[DrawMode["TRIANGLES"] = "TRIANGLES"] = "TRIANGLES";
        })(render.DrawMode || (render.DrawMode = {}));
        var DrawMode = render.DrawMode;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var render;
    (function (render) {
        var Buffer = (function () {
            function Buffer() {
                this.p_buffer = null;
                this.p_type = null;
                this.p_num = null;
            }
            Object.defineProperty(Buffer.prototype, "buffer", {
                get: function () {
                    dyCb.Log.error(this.p_buffer === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);
                    return this.p_buffer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Buffer.prototype, "type", {
                get: function () {
                    dyCb.Log.error(this.p_type === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);
                    return this.p_type;
                },
                set: function (type) {
                    this.p_type = type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Buffer.prototype, "num", {
                get: function () {
                    dyCb.Log.error(this.p_num === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);
                    return this.p_num;
                },
                set: function (num) {
                    this.p_num = num;
                },
                enumerable: true,
                configurable: true
            });
            return Buffer;
        })();
        render.Buffer = Buffer;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var render;
    (function (render) {
        var ElementBuffer = (function (_super) {
            __extends(ElementBuffer, _super);
            function ElementBuffer() {
                _super.apply(this, arguments);
                this._typeSize = null;
            }
            ElementBuffer.create = function (data, type) {
                var obj = new this();
                obj.initWhenCreate(data, type);
                return obj;
            };
            Object.defineProperty(ElementBuffer.prototype, "typeSize", {
                get: function () { return this._typeSize; },
                enumerable: true,
                configurable: true
            });
            ElementBuffer.prototype.initWhenCreate = function (data, type) {
                var gl = dy.Director.getInstance().gl;
                if (!data || !this._checkDataType(data, type)) {
                    return null;
                }
                this.p_buffer = gl.createBuffer();
                if (!this.p_buffer) {
                    dyCb.Log.log('Failed to create the this.p_buffer object');
                    return null;
                }
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.p_buffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
                this.p_type = gl[type];
                this.p_num = data.length;
                this._typeSize = this._getInfo(type).size;
                return this.p_buffer;
            };
            ElementBuffer.prototype._checkDataType = function (data, type) {
                var info = this._getInfo(type);
                return data instanceof info.typeClass;
            };
            ElementBuffer.prototype._getInfo = function (type) {
                var info = null;
                switch (type) {
                    case render.BufferType.UNSIGNED_BYTE:
                        info = {
                            typeClass: Uint8Array,
                            size: 1
                        };
                        break;
                    case render.BufferType.SHORT:
                        info = {
                            typeClass: Int16Array,
                            size: 2
                        };
                        break;
                    case render.BufferType.UNSIGNED_SHORT:
                        info = {
                            typeClass: Uint16Array,
                            size: 2
                        };
                        break;
                    case render.BufferType.INT:
                        info = {
                            typeClass: Int32Array,
                            size: 4
                        };
                        break;
                    case render.BufferType.UNSIGNED_INT:
                        info = {
                            typeClass: Uint32Array,
                            size: 4
                        };
                        break;
                    case render.BufferType.FLOAT:
                        info = {
                            typeClass: Float32Array,
                            size: 4
                        };
                        break;
                    default:
                        dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("BufferType"));
                        break;
                }
                return info;
            };
            return ElementBuffer;
        })(render.Buffer);
        render.ElementBuffer = ElementBuffer;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var render;
    (function (render) {
        var ArrayBuffer = (function (_super) {
            __extends(ArrayBuffer, _super);
            function ArrayBuffer() {
                _super.apply(this, arguments);
                this._count = null;
            }
            ArrayBuffer.create = function (data, num, type) {
                var obj = new this();
                obj.initWhenCreate(data, num, type);
                return obj;
            };
            Object.defineProperty(ArrayBuffer.prototype, "count", {
                get: function () {
                    return this._count;
                },
                set: function (count) {
                    this._count = count;
                },
                enumerable: true,
                configurable: true
            });
            ArrayBuffer.prototype.initWhenCreate = function (data, num, type) {
                var gl = dy.Director.getInstance().gl;
                if (!data) {
                    return null;
                }
                this.p_buffer = gl.createBuffer();
                if (!this.p_buffer) {
                    dyCb.Log.log('Failed to create the this.p_buffer object');
                    return null;
                }
                gl.bindBuffer(gl.ARRAY_BUFFER, this.p_buffer);
                gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
                this.p_num = num;
                this.p_type = gl[type];
                this._count = data.length / num;
                return this.p_buffer;
            };
            return ArrayBuffer;
        })(render.Buffer);
        render.ArrayBuffer = ArrayBuffer;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

var dy;
(function (dy) {
    var render;
    (function (render) {
        (function (UniformDataType) {
            UniformDataType[UniformDataType["FLOAT_MAT4"] = 0] = "FLOAT_MAT4";
        })(render.UniformDataType || (render.UniformDataType = {}));
        var UniformDataType = render.UniformDataType;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var render;
    (function (render) {
        var Program = (function () {
            function Program() {
                this._program = dy.Director.getInstance().gl.createProgram();
                this._shader = null;
            }
            Program.create = function () {
                var obj = new this();
                return obj;
            };
            Program.prototype.use = function () {
                dy.Director.getInstance().gl.useProgram(this._program);
            };
            Program.prototype.setUniformData = function (name, type, data) {
                var gl = dy.Director.getInstance().gl, pos = gl.getUniformLocation(this._program, name);
                switch (type) {
                    case render.UniformDataType.FLOAT_MAT4:
                        gl.uniformMatrix4fv(pos, false, data.values);
                        break;
                    default:
                        dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("UniformDataType"));
                        break;
                }
            };
            Program.prototype.setAttributeData = function (name, type, data) {
                var gl = dy.Director.getInstance().gl, pos = gl.getAttribLocation(this._program, name);
                switch (type) {
                    case render.AttributeDataType.FLOAT_4:
                        var dataArr = data;
                        gl.vertexAttrib4f(pos, dataArr[0], dataArr[1], dataArr[2], dataArr[3]);
                        break;
                    case render.AttributeDataType.BUFFER:
                        var buffer = data;
                        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer);
                        gl.vertexAttribPointer(pos, buffer.num, buffer.type, false, 0, 0);
                        gl.enableVertexAttribArray(pos);
                        break;
                    default:
                        dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("AttributeDataType"));
                        break;
                }
            };
            Program.prototype.initWithShader = function (shader) {
                var gl = dy.Director.getInstance().gl, vs = null, fs = null;
                vs = shader.createVsShader();
                fs = shader.createFsShader();
                this._shader = shader;
                gl.attachShader(this._program, vs);
                gl.attachShader(this._program, fs);
                /*!
                if bower warn:"Attribute 0 is disabled. This has significant performance penalty",
                then do this before linkProgram:
                 gl.bindAttribLocation( this._program, 0, "a_position");
    
    
    
                 can reference here:
                 http://stackoverflow.com/questions/20305231/webgl-warning-attribute-0-is-disabled-this-has-significant-performance-penalt?answertab=votes#tab-top
    
    
                 OpenGL requires attribute zero to be enabled otherwise it will not render anything.
                 On the other hand OpenGL ES 2.0 on which WebGL is based does not. So, to emulate OpenGL ES 2.0 on top of OpenGL if you don't enable attribute 0 the browser has to make a buffer for you large enough for the number of vertices you've requested to be drawn, fill it with the correct value (see gl.vertexAttrib),
                  attach it to attribute zero, and enable it.
    
                 It does all this behind the scenes but it's important for you to know that it takes time to create and fill that buffer. There are optimizations the browser can make but in the general case,
                 if you were to assume you were running on OpenGL ES 2.0 and used attribute zero as a constant like you are supposed to be able to do, without the warning you'd have no idea of the work the browser is doing on your behalf to emulate that feature of OpenGL ES 2.0 that is different from OpenGL.
    
                 In your particular case the warning doesn't have much meaning. It looks like you are only drawing a single point. But it would not be easy for the browser to figure that out so it just warns you anytime you draw and attribute 0 is not enabled.
    
    
                 https://github.com/mrdoob/three.js/issues/3896
                 */
                gl.linkProgram(this._program);
                if (gl.getProgramParameter(this._program, gl.LINK_STATUS)) {
                    return this._program;
                }
                else {
                    alert(gl.getProgramInfoLog(this._program));
                    return null;
                }
            };
            Program.prototype.isChangeShader = function (shader) {
                return this._shader ? !this._shader.isEqual(shader) : true;
            };
            return Program;
        })();
        render.Program = Program;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var render;
    (function (render) {
        var QuadCommand = (function () {
            function QuadCommand() {
                this._buffers = dyCb.Hash.create();
                this._color = null;
                this._mvpMatrix = null;
                this._drawMode = render.DrawMode.TRIANGLES;
            }
            QuadCommand.create = function () {
                var obj = new this();
                return obj;
            };
            Object.defineProperty(QuadCommand.prototype, "buffers", {
                get: function () {
                    return this._buffers;
                },
                set: function (buffers) {
                    var i = null;
                    for (i in buffers) {
                        if (buffers.hasOwnProperty(i)) {
                            this._buffers.addChild(i, buffers[i]);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QuadCommand.prototype, "color", {
                get: function () {
                    return this._color;
                },
                set: function (color) {
                    this._color = color;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QuadCommand.prototype, "shader", {
                set: function (shader) {
                    if (dy.Director.getInstance().stage.program.isChangeShader(shader)) {
                        dy.Director.getInstance().stage.program.initWithShader(shader);
                        dy.Director.getInstance().stage.program.use();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QuadCommand.prototype, "mvpMatrix", {
                get: function () {
                    return this._mvpMatrix;
                },
                set: function (mvpMatrix) {
                    this._mvpMatrix = mvpMatrix;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(QuadCommand.prototype, "drawMode", {
                get: function () {
                    return this._drawMode;
                },
                set: function (drawMode) {
                    this._drawMode = drawMode;
                },
                enumerable: true,
                configurable: true
            });
            QuadCommand.prototype.execute = function () {
                this._sendData();
                this._draw();
            };
            QuadCommand.prototype.init = function () {
            };
            QuadCommand.prototype._sendData = function () {
                var program = dy.Director.getInstance().stage.program;
                if (this._buffers.hasChild("vertexBuffer")) {
                    program.setAttributeData("a_position", render.AttributeDataType.BUFFER, this._buffers.getChild("vertexBuffer"));
                }
                else {
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_MUST("has vertexBuffer"));
                }
                /*!
                 this cause warn:"PERFORMANCE WARNING: Attribute 0 is disabled. This has signficant performance penalty" here?
                 because a_color'pos is 0, and it should be array data(like Float32Array)
                 refer to: https://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences#Vertex_Attribute_0
                 */
                program.setAttributeData("a_color", render.AttributeDataType.BUFFER, this._buffers.getChild("colorBuffer"));
                program.setUniformData("u_mvpMatrix", render.UniformDataType.FLOAT_MAT4, this._mvpMatrix);
            };
            QuadCommand.prototype._draw = function () {
                var totalNum = 0, startOffset = 0, vertexBuffer = this._buffers.getChild("vertexBuffer"), gl = dy.Director.getInstance().gl;
                if (this._buffers.hasChild("indexBuffer")) {
                    var indexBuffer = this._buffers.getChild("indexBuffer");
                    totalNum = indexBuffer.num;
                    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.buffer);
                    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer.buffer);
                    gl.drawElements(gl[this._drawMode], totalNum, indexBuffer.type, indexBuffer.typeSize * startOffset);
                }
                else {
                    totalNum = vertexBuffer.num;
                    gl.drawArrays(gl[this._drawMode], startOffset, totalNum);
                }
            };
            return QuadCommand;
        })();
        render.QuadCommand = QuadCommand;
    })(render = dy.render || (dy.render = {}));
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Material = (function () {
        function Material() {
            this._color = dy.Color.create("0xffffff");
            this._shader = null;
        }
        Material.create = function () {
            var obj = new this();
            return obj;
        };
        Object.defineProperty(Material.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (color) {
                this._color = color;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Material.prototype, "shader", {
            get: function () {
                return this._shader;
            },
            set: function (shader) {
                this._shader = shader;
            },
            enumerable: true,
            configurable: true
        });
        return Material;
    })();
    dy.Material = Material;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var Loader = (function () {
        function Loader() {
            this._container = dyCb.Hash.create();
        }
        Loader.prototype.load = function (url, id) {
            var self = this, stream = null;
            if (this._container.getChild(id)) {
                stream = dyRt.empty();
            }
            else {
                stream = dyRt.fromPromise(this.loadAsset(url))
                    .do(function (data) {
                    self._container.addChild(id, data);
                }, function (err) {
                    self._errorHandle(url, err);
                }, null);
            }
            return stream;
        };
        Loader.prototype.get = function (id) {
            return this._container.getChild(id);
        };
        Loader.prototype.has = function (id) {
            return this._container.hasChild(id);
        };
        Loader.prototype.loadAsset = function (url) {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Loader.prototype._errorHandle = function (path, err) {
            dyCb.Log.log("加载" + path + "资源失败:" + err);
        };
        return Loader;
    })();
    dy.Loader = Loader;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var GLSLLoader = (function (_super) {
        __extends(GLSLLoader, _super);
        function GLSLLoader() {
            _super.apply(this, arguments);
        }
        GLSLLoader.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        GLSLLoader.prototype.loadAsset = function (url) {
            return new RSVP.Promise(function (resolve, reject) {
                dyCb.AjaxUtils.ajax({
                    type: "get",
                    url: url,
                    contentType: "text/plain; charset=utf-8",
                    dataType: "text",
                    success: function (data) {
                        resolve(data);
                    },
                    error: function (XMLHttpRequest, errorThrown) {
                        reject("url:" + url + "\nreadyState:" + XMLHttpRequest.readyState + "\nstatus:" + XMLHttpRequest.status
                            + "\nmessage:" + errorThrown.message
                            + "\nresponseText:" + XMLHttpRequest.responseText);
                    }
                });
            });
        };
        GLSLLoader._instance = null;
        return GLSLLoader;
    })(dy.Loader);
    dy.GLSLLoader = GLSLLoader;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var JsLoader = (function (_super) {
        __extends(JsLoader, _super);
        function JsLoader() {
            _super.apply(this, arguments);
        }
        JsLoader.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        JsLoader.prototype.loadAsset = function (url) {
            var _this = this;
            var self = this;
            return new RSVP.Promise(function (resolve, reject) {
                var script = self._createScript();
                script.addEventListener("error", function (e) {
                    reject("error");
                });
                if (script.readyState) {
                    script.onreadystatechange = function () {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            resolve(url);
                        }
                    };
                }
                else {
                    script.onload = function () {
                        resolve(url);
                    };
                }
                script.src = url;
                _this._appendScript(script);
            });
        };
        JsLoader.prototype._createScript = function () {
            var script = document.createElement("script");
            script.type = "text/javascript";
            return script;
        };
        JsLoader.prototype._appendScript = function (script) {
            document.getElementsByTagName("head")[0].appendChild(script);
        };
        JsLoader._instance = null;
        return JsLoader;
    })(dy.Loader);
    dy.JsLoader = JsLoader;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var LoaderManager = (function () {
        function LoaderManager() {
            this.assetCount = 0;
            this.currentLoadedCount = 0;
        }
        LoaderManager.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        LoaderManager.prototype.load = function () {
            var self = this;
            if (dy.JudgeUtils.isString(arguments[0])) {
                var url = arguments[0], id = url;
                return this._createLoadStream(url, id);
            }
            else {
                var assetArr = arguments[0];
                return dyRt.fromArray(assetArr).flatMap(function (asset) {
                    return self._createLoadAssetStream(asset.url, asset.id);
                });
            }
        };
        LoaderManager.prototype.reset = function () {
            this.assetCount = 0;
            this.currentLoadedCount = 0;
        };
        LoaderManager.prototype._createLoadAssetStream = function (url, id) {
            var loader = this._getLoader(url), stream = null, self = this;
            if (!loader.has(id)) {
                self.assetCount++;
            }
            stream = loader.load(url, id)
                .map(function (data) {
                self.currentLoadedCount++;
                return {
                    currentLoadedCount: self.currentLoadedCount,
                    assetCount: self.assetCount
                };
            });
            return stream;
        };
        LoaderManager.prototype._createLoadStream = function (url, id) {
            return this._getLoader(url).load(url, id);
        };
        LoaderManager.prototype._getLoader = function (url) {
            return dy.LoaderFactory.create(dyCb.PathUtils.extname(url));
        };
        LoaderManager._instance = null;
        return LoaderManager;
    })();
    dy.LoaderManager = LoaderManager;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var LoaderFactory = (function () {
        function LoaderFactory() {
        }
        LoaderFactory.create = function (extname) {
            var loader = null;
            switch (extname) {
                case ".js":
                    loader = dy.JsLoader.getInstance();
                    break;
                case ".glsl":
                    loader = dy.GLSLLoader.getInstance();
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_UNEXPECT(extname));
                    break;
            }
            return loader;
        };
        return LoaderFactory;
    })();
    dy.LoaderFactory = LoaderFactory;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventListenerMap = (function () {
        function EventListenerMap() {
            this._listenerMap = dyCb.Hash.create();
        }
        EventListenerMap.create = function () {
            var obj = new this();
            return obj;
        };
        EventListenerMap.prototype.appendChild = function (eventName, data) {
            this._listenerMap.appendChild(this._buildKey(data.target, eventName), data);
        };
        EventListenerMap.prototype.getChild = function (args) {
            var self = this;
            if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                return this._listenerMap.getChild(eventName);
            }
            else if (arguments.length === 1) {
                var target = arguments[0];
                return this._listenerMap.filter(function (list, key) {
                    return self.isTarget(key, target, list);
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                return this._listenerMap.getChild(this._buildKey(target, eventName));
            }
        };
        EventListenerMap.prototype.hasChild = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (arguments.length === 1 && dy.JudgeUtils.isFunction(arguments[0])) {
                return this._listenerMap.hasChild(arguments[0]);
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                return this._listenerMap.hasChild(this._buildKey(target, eventName));
            }
        };
        EventListenerMap.prototype.filter = function (func) {
            return this._listenerMap.filter(func);
        };
        EventListenerMap.prototype.forEach = function (func) {
            return this._listenerMap.forEach(func);
        };
        EventListenerMap.prototype.removeChild = function (args) {
            var self = this;
            if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                this._listenerMap.removeChild(eventName);
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1], list = null;
                list = this._listenerMap.getChild(eventName);
                list.removeChild(function (val) {
                    return val.handler === handler;
                });
                if (list.getCount() === 0) {
                    this._listenerMap.removeChild(eventName);
                }
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isNumber(arguments[0])) {
                var uid = arguments[0], eventName = arguments[1];
                this._listenerMap.removeChild(this._buildKey(uid, eventName));
            }
            else if (arguments.length === 1) {
                var target = arguments[0];
                this._listenerMap.removeChild(function (list, key) {
                    return self.isTarget(key, target, list);
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                this._listenerMap.removeChild(this._buildKey(target, eventName));
            }
            else if (arguments.length === 3) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2];
                this._listenerMap.map(function (list, key) {
                    list.removeChild(function (val) {
                        return val.handler === handler;
                    });
                    if (list.getCount() === 0) {
                        return dyCb.$REMOVE;
                    }
                    return [key, list];
                });
            }
        };
        EventListenerMap.prototype.getEventOffDataList = function (target, eventName) {
            var result = dyCb.Collection.create(), self = this;
            if (arguments.length === 1) {
                this.getChild(target)
                    .forEach(function (list, key) {
                    if (list && list.getCount() > 0) {
                        result.addChild({
                            eventName: self.getEventNameFromKey(key),
                            wrapHandler: list.getChild(0).wrapHandler
                        });
                    }
                });
                return result;
            }
            else if (arguments.length === 2) {
                var list = this.getChild(target, eventName);
                if (list && list.getCount() > 0) {
                    result.addChild({
                        eventName: eventName,
                        wrapHandler: list.getChild(0).wrapHandler
                    });
                }
                return result;
            }
        };
        EventListenerMap.prototype.getEventNameFromKey = function (key) {
            return key.indexOf("_") > -1 ? key.split("_")[1] : key;
        };
        EventListenerMap.prototype.getUidFromKey = function (key) {
            return key.indexOf("_") > -1 ? Number(key.split("_")[0]) : null;
        };
        EventListenerMap.prototype.isTarget = function (key, target, list) {
            return key.indexOf(String(target.uid)) > -1 && list !== undefined;
        };
        EventListenerMap.prototype._buildKey = function (args) {
            if (dy.JudgeUtils.isNumber(arguments[0])) {
                var uid = arguments[0], eventName = arguments[1];
                return this._buildKeyWithUid(uid, eventName);
            }
            else {
                var target = arguments[0], eventName = arguments[1];
                return target ? this._buildKeyWithUid(target.uid, eventName) : eventName;
            }
        };
        EventListenerMap.prototype._buildKeyWithUid = function (uid, eventName) {
            return String(uid) + "_" + eventName;
        };
        return EventListenerMap;
    })();
    dy.EventListenerMap = EventListenerMap;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (EventType) {
        EventType[EventType["MOUSE"] = 0] = "MOUSE";
        EventType[EventType["KEYBOARD"] = 1] = "KEYBOARD";
        EventType[EventType["CUSTOM"] = 2] = "CUSTOM";
    })(dy.EventType || (dy.EventType = {}));
    var EventType = dy.EventType;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (EventName) {
        EventName[EventName["CLICK"] = "click"] = "CLICK";
        EventName[EventName["MOUSEOVER"] = "mouseover"] = "MOUSEOVER";
        EventName[EventName["MOUSEUP"] = "mouseup"] = "MOUSEUP";
        EventName[EventName["MOUSEOUT"] = "mouseout"] = "MOUSEOUT";
        EventName[EventName["MOUSEMOVE"] = "mousemove"] = "MOUSEMOVE";
        EventName[EventName["MOUSEDOWN"] = "mousedown"] = "MOUSEDOWN";
        EventName[EventName["KEYDOWN"] = "keydown"] = "KEYDOWN";
        EventName[EventName["KEYUP"] = "keyup"] = "KEYUP";
        EventName[EventName["KEYPRESS"] = "keypress"] = "KEYPRESS";
    })(dy.EventName || (dy.EventName = {}));
    var EventName = dy.EventName;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (EventPhase) {
        EventPhase[EventPhase["BROADCAST"] = 0] = "BROADCAST";
        EventPhase[EventPhase["EMIT"] = 1] = "EMIT";
    })(dy.EventPhase || (dy.EventPhase = {}));
    var EventPhase = dy.EventPhase;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var _table = dyCb.Hash.create();
    _table.addChild(dy.EventName.CLICK, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEOVER, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEOUT, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEMOVE, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEDOWN, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.MOUSEUP, dy.EventType.MOUSE);
    _table.addChild(dy.EventName.KEYDOWN, dy.EventType.KEYBOARD);
    _table.addChild(dy.EventName.KEYPRESS, dy.EventType.KEYBOARD);
    _table.addChild(dy.EventName.KEYUP, dy.EventType.KEYBOARD);
    var EventTable = (function () {
        function EventTable() {
        }
        EventTable.getEventType = function (eventName) {
            var result = _table.getChild(eventName);
            if (result === void 0) {
                result = dy.EventType.CUSTOM;
            }
            return result;
        };
        return EventTable;
    })();
    dy.EventTable = EventTable;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var Event = (function () {
        function Event(eventName) {
            this._name = null;
            this._target = null;
            this._currentTarget = null;
            this._isStopPropagation = false;
            this._phase = null;
            this.innerType = null;
            this._name = eventName;
        }
        Object.defineProperty(Event.prototype, "type", {
            get: function () {
                dyCb.Log.error(this.innerType === null, dyCb.Log.info.ABSTRACT_ATTRIBUTE);
                return this.innerType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (name) {
                this._name = name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "target", {
            get: function () {
                //dyCb.Log.error(!this._target, dyCb.Log.info.FUNC_MUST_DEFINE("target"));
                return this._target;
            },
            set: function (target) {
                this._target = target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "currentTarget", {
            get: function () {
                return this._currentTarget;
            },
            set: function (currentTarget) {
                this._currentTarget = currentTarget;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "isStopPropagation", {
            get: function () {
                return this._isStopPropagation;
            },
            set: function (isStopPropagation) {
                this._isStopPropagation = isStopPropagation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "phase", {
            get: function () {
                return this._phase;
            },
            set: function (phase) {
                this._phase = phase;
            },
            enumerable: true,
            configurable: true
        });
        Event.prototype.copy = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        Event.prototype.stopPropagation = function () {
            this._isStopPropagation = true;
        };
        Event.prototype.copyMember = function (destination, source, memberArr) {
            memberArr.forEach(function (member) {
                destination[member] = source[member];
            });
            return destination;
        };
        return Event;
    })();
    dy.Event = Event;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var MouseEvent = (function (_super) {
        __extends(MouseEvent, _super);
        function MouseEvent(event, eventName) {
            _super.call(this, eventName);
            this.innerType = dy.EventType.MOUSE;
            this._event = null;
            this._location = null;
            this._locationInView = null;
            this._button = null;
            this._event = event;
        }
        MouseEvent.create = function (event, eventName) {
            var obj = new this(event, eventName);
            return obj;
        };
        Object.defineProperty(MouseEvent.prototype, "event", {
            get: function () {
                return this._event;
            },
            set: function (event) {
                this._event = event || window.event;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "location", {
            get: function () {
                var point = null, e = this.event;
                if (this._location) {
                    return this._location;
                }
                point = dy.Point.create();
                if (bowser.msie) {
                    point.x = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
                    point.y = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
                }
                else {
                    point.x = e.pageX;
                    point.y = e.pageY;
                }
                return point;
            },
            set: function (point) {
                this._location = point;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "locationInView", {
            get: function () {
                var point = null, viewOffset = null;
                if (this._locationInView) {
                    return this._locationInView;
                }
                point = this.location;
                viewOffset = dy.Director.getInstance().getView().offset;
                return dy.Point.create(point.x - viewOffset.x, point.y - viewOffset.y);
            },
            set: function (locationInView) {
                this._locationInView = locationInView;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MouseEvent.prototype, "button", {
            get: function () {
                var e = this.event, mouseButton = null;
                if (this._button) {
                    return this._button;
                }
                if (bowser.msie) {
                    switch (e.button) {
                        case 1:
                            mouseButton = dy.MouseButton.LEFT;
                            break;
                        case 4:
                            mouseButton = dy.MouseButton.RIGHT;
                            break;
                        case 2:
                            mouseButton = dy.MouseButton.CENTER;
                            break;
                        default:
                            dyCb.Log.error(true, dyCb.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                            break;
                    }
                }
                else {
                    switch (e.button) {
                        case 0:
                            mouseButton = dy.MouseButton.LEFT;
                            break;
                        case 1:
                            mouseButton = dy.MouseButton.RIGHT;
                            break;
                        case 2:
                            mouseButton = dy.MouseButton.CENTER;
                            break;
                        default:
                            dyCb.Log.error(true, dyCb.Log.info.FUNC_NOT_SUPPORT("multi mouse button"));
                            break;
                    }
                }
                return mouseButton;
            },
            set: function (button) {
                this._button = button;
            },
            enumerable: true,
            configurable: true
        });
        MouseEvent.prototype.copy = function () {
            var eventObj = MouseEvent.create(this._event, this.name);
            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
        };
        return MouseEvent;
    })(dy.Event);
    dy.MouseEvent = MouseEvent;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var SPECIAL_KEY_MAP = {
        8: "backspace",
        9: "tab",
        10: "return",
        13: "return",
        16: "shift",
        17: "ctrl",
        18: "alt",
        19: "pause",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "insert",
        46: "del",
        59: ";",
        61: "=",
        65: "a",
        66: "b",
        67: "c",
        68: "d",
        69: "e",
        70: "f",
        71: "g",
        72: "h",
        73: "i",
        74: "j",
        75: "k",
        76: "l",
        77: "m",
        78: "n",
        79: "o",
        80: "p",
        81: "q",
        82: "r",
        83: "s",
        84: "t",
        85: "u",
        86: "v",
        87: "w",
        88: "x",
        89: "y",
        90: "z",
        96: "0",
        97: "1",
        98: "2",
        99: "3",
        100: "4",
        101: "5",
        102: "6",
        103: "7",
        104: "8",
        105: "9",
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        112: "f1",
        113: "f2",
        114: "f3",
        115: "f4",
        116: "f5",
        117: "f6",
        118: "f7",
        119: "f8",
        120: "f9",
        121: "f10",
        122: "f11",
        123: "f12",
        144: "numlock",
        145: "scroll",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
    }, SHIFT_KEY_MAP = {
        "`": "~",
        "1": "!",
        "2": "@",
        "3": "#",
        "4": "$",
        "5": "%",
        "6": "^",
        "7": "&",
        "8": "*",
        "9": "(",
        "0": ")",
        "-": "_",
        "=": "+",
        ";": ": ",
        "'": "\"",
        ",": "<",
        ".": ">",
        "/": "?",
        "\\": "|"
    };
    var KeyboardEvent = (function (_super) {
        __extends(KeyboardEvent, _super);
        function KeyboardEvent(event, eventName) {
            _super.call(this, eventName);
            this.innerType = dy.EventType.KEYBOARD;
            this._event = null;
            this._event = event;
        }
        KeyboardEvent.create = function (event, eventName) {
            var obj = new this(event, eventName);
            return obj;
        };
        Object.defineProperty(KeyboardEvent.prototype, "event", {
            get: function () {
                return this._event;
            },
            set: function (event) {
                this._event = event || window.event;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "ctrlKey", {
            get: function () {
                return this._event.ctrlKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "altKey", {
            get: function () {
                return this._event.altKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "shiftKey", {
            get: function () {
                return this._event.shiftKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "metaKey", {
            get: function () {
                return this._event.metaKey;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "keyCode", {
            get: function () {
                return this._event.keyCode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(KeyboardEvent.prototype, "key", {
            get: function () {
                var key = SPECIAL_KEY_MAP[this.keyCode], char = null;
                if (!key) {
                    char = String.fromCharCode(this.keyCode).toLowerCase();
                    if (this.shiftKey) {
                        return SHIFT_KEY_MAP[char];
                    }
                    return char;
                }
                return key;
            },
            enumerable: true,
            configurable: true
        });
        KeyboardEvent.prototype.copy = function () {
            var eventObj = KeyboardEvent.create(this._event, this.name);
            return this.copyMember(eventObj, this, ["altKey", "shiftKey", "ctrlKey", "metaKey", "keyCode", "key"]);
        };
        return KeyboardEvent;
    })(dy.Event);
    dy.KeyboardEvent = KeyboardEvent;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var CustomEvent = (function (_super) {
        __extends(CustomEvent, _super);
        function CustomEvent() {
            _super.apply(this, arguments);
            this.innerType = dy.EventType.CUSTOM;
            this._userData = null;
        }
        CustomEvent.create = function (eventName) {
            var obj = new this(eventName);
            return obj;
        };
        Object.defineProperty(CustomEvent.prototype, "userData", {
            get: function () {
                return this._userData;
            },
            set: function (userData) {
                this._userData = userData;
            },
            enumerable: true,
            configurable: true
        });
        CustomEvent.prototype.copyPublicAttri = function (destination, source) {
            var property = null;
            dyCb.ExtendUtils.extend(destination, function (item, property) {
                return property.slice(0, 1) !== "_"
                    && !dy.JudgeUtils.isFunction(item);
            });
            return destination;
        };
        CustomEvent.prototype.copy = function () {
            var eventObj = CustomEvent.create(this.name);
            return this.copyMember(eventObj, this, ["target", "currentTarget", "isStopPropagation", "phase"]);
        };
        return CustomEvent;
    })(dy.Event);
    dy.CustomEvent = CustomEvent;
})(dy || (dy = {}));

var dy;
(function (dy) {
    (function (MouseButton) {
        MouseButton[MouseButton["LEFT"] = 0] = "LEFT";
        MouseButton[MouseButton["RIGHT"] = 1] = "RIGHT";
        MouseButton[MouseButton["CENTER"] = 2] = "CENTER";
    })(dy.MouseButton || (dy.MouseButton = {}));
    var MouseButton = dy.MouseButton;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventListener = (function () {
        function EventListener(option) {
            this._eventType = null;
            this._priority = null;
            this._handlerDataList = dyCb.Collection.create();
            this._eventType = option.eventType;
            this._priority = option.priority || 1;
        }
        EventListener.create = function (option) {
            var obj = new this(option);
            obj.initWhenCreate(option);
            return obj;
        };
        Object.defineProperty(EventListener.prototype, "eventType", {
            get: function () {
                return this._eventType;
            },
            set: function (eventType) {
                this._eventType = eventType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventListener.prototype, "priority", {
            get: function () {
                return this._priority;
            },
            set: function (priority) {
                this._priority = priority;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EventListener.prototype, "handlerDataList", {
            get: function () {
                return this._handlerDataList;
            },
            set: function (handlerDataList) {
                this._handlerDataList = handlerDataList;
            },
            enumerable: true,
            configurable: true
        });
        EventListener.prototype.initWhenCreate = function (option) {
            this._setHandlerDataList(option);
        };
        EventListener.prototype._setHandlerDataList = function (option) {
            var i = null, REGEX_HANDER = /on\w+/;
            for (i in option) {
                if (option.hasOwnProperty(i)) {
                    if (REGEX_HANDER.test(i)) {
                        this._handlerDataList.addChild({
                            eventName: this._parseEventName(i),
                            handler: option[i]
                        });
                    }
                }
            }
        };
        EventListener.prototype._parseEventName = function (handlerName) {
            return handlerName.slice(2).toLowerCase();
        };
        return EventListener;
    })();
    dy.EventListener = EventListener;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventHandler = (function () {
        function EventHandler() {
        }
        EventHandler.prototype.on = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        EventHandler.prototype.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        EventHandler.prototype.trigger = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        return EventHandler;
    })();
    dy.EventHandler = EventHandler;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var DomEventHandler = (function (_super) {
        __extends(DomEventHandler, _super);
        function DomEventHandler() {
            _super.apply(this, arguments);
        }
        DomEventHandler.prototype.off = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var self = this, dom = this.getDom(), eventRegister = dy.EventRegister.getInstance(), eventOffDataList = null;
            eventOffDataList = eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));
            if (eventOffDataList) {
                eventOffDataList.forEach(function (eventOffData) {
                    self._unBind(dom, eventOffData.eventName, eventOffData.wrapHandler);
                });
            }
        };
        DomEventHandler.prototype.getDom = function () {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        DomEventHandler.prototype.buildWrapHandler = function (target, eventName) {
            return dyCb.Log.error(true, dyCb.Log.info.ABSTRACT_METHOD);
        };
        DomEventHandler.prototype.handler = function (target, eventName, handler, priority) {
            var wrapHandler = null;
            if (!dy.EventRegister.getInstance().isBinded(target, eventName)) {
                wrapHandler = this._bind(this.getDom(), eventName, target);
            }
            else {
                wrapHandler = dy.EventRegister.getInstance().getWrapHandler(target, eventName);
            }
            dy.EventRegister.getInstance().register(target, eventName, handler, wrapHandler, priority);
        };
        DomEventHandler.prototype._bind = function (dom, eventName, target) {
            var wrapHandler = null;
            wrapHandler = this.buildWrapHandler(target, eventName);
            dyCb.EventUtils.addEvent(dom, eventName, wrapHandler);
            return wrapHandler;
        };
        DomEventHandler.prototype._unBind = function (dom, eventName, handler) {
            dyCb.EventUtils.removeEvent(dom, eventName, handler);
        };
        return DomEventHandler;
    })(dy.EventHandler);
    dy.DomEventHandler = DomEventHandler;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dy;
(function (dy) {
    var MouseEventHandler = (function (_super) {
        __extends(MouseEventHandler, _super);
        function MouseEventHandler() {
            _super.apply(this, arguments);
        }
        MouseEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        MouseEventHandler.prototype.on = function (target, eventName, handler, priority) {
            dyCb.Log.error(!(target instanceof dy.GameObject), dyCb.Log.info.FUNC_MUST_BE("target", "GameObject"));
            this.handler(target, eventName, handler, priority);
        };
        MouseEventHandler.prototype.trigger = function (target, event, notSetTarget) {
            var eventName = event.name, eventType = event.type, registerDataList = null, isStopPropagation = false, self = this;
            if (!(target instanceof dy.GameObject)) {
                dyCb.Log.log("target is not GameObject, can't trigger event");
                return;
            }
            if (!notSetTarget) {
                event.target = target;
            }
            registerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(target, eventName);
            if (registerDataList === null || registerDataList.getCount() === 0) {
                return;
            }
            registerDataList.forEach(function (registerData) {
                var eventCopy = event.copy();
                registerData.handler(eventCopy);
                if (eventCopy.isStopPropagation) {
                    isStopPropagation = true;
                }
            });
            return isStopPropagation;
        };
        MouseEventHandler.prototype.getDom = function () {
            return dy.Director.getInstance().getView().dom;
        };
        MouseEventHandler.prototype.buildWrapHandler = function (target, eventName) {
            var self = this, context = window;
            return dyCb.EventUtils.bindEvent(context, function (event) {
                var eventObject = self._createEventObject(event, eventName, target), topTarget = dy.Director.getInstance().getTopUnderPoint(eventObject.locationInView);
                dy.EventManager.emit(topTarget, eventObject);
            });
        };
        MouseEventHandler.prototype._isTrigger = function (result) {
            return result && result.getCount() > 0;
        };
        MouseEventHandler.prototype._createEventObject = function (event, eventName, currentTarget) {
            var obj = dy.MouseEvent.create(event ? event : window.event, eventName);
            obj.currentTarget = currentTarget;
            return obj;
        };
        MouseEventHandler._instance = null;
        return MouseEventHandler;
    })(dy.DomEventHandler);
    dy.MouseEventHandler = MouseEventHandler;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var KeyboardEventHandler = (function (_super) {
        __extends(KeyboardEventHandler, _super);
        function KeyboardEventHandler() {
            _super.apply(this, arguments);
        }
        KeyboardEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        KeyboardEventHandler.prototype.on = function (eventName, handler, priority) {
            this.handler(null, eventName, handler, priority);
        };
        KeyboardEventHandler.prototype.trigger = function (event) {
            var eventName = event.name, eventType = event.type, registerDataList = null, self = this;
            registerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(eventName);
            if (registerDataList === null || registerDataList.getCount() === 0) {
                return;
            }
            registerDataList.forEach(function (registerData) {
                var eventCopy = event.copy();
                registerData.handler(eventCopy);
            });
            return true;
        };
        KeyboardEventHandler.prototype.getDom = function () {
            return document;
        };
        KeyboardEventHandler.prototype.buildWrapHandler = function (target, eventName) {
            var self = this, context = window;
            return dyCb.EventUtils.bindEvent(context, function (event) {
                dy.EventManager.trigger(self._createEventObject(event, eventName));
            });
        };
        KeyboardEventHandler.prototype._isTrigger = function (result) {
            return result && result.getCount() > 0;
        };
        KeyboardEventHandler.prototype._createEventObject = function (event, eventName) {
            var obj = dy.KeyboardEvent.create(event ? event : window.event, eventName);
            return obj;
        };
        KeyboardEventHandler._instance = null;
        return KeyboardEventHandler;
    })(dy.DomEventHandler);
    dy.KeyboardEventHandler = KeyboardEventHandler;
})(dy || (dy = {}));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var CustomEventHandler = (function (_super) {
        __extends(CustomEventHandler, _super);
        function CustomEventHandler() {
            _super.apply(this, arguments);
        }
        CustomEventHandler.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        CustomEventHandler.prototype.on = function (args) {
            if (arguments.length === 3) {
                var eventName = arguments[0], handler = arguments[1], priority = arguments[2];
                dy.EventRegister.getInstance().register(null, eventName, handler, null, priority);
            }
            else if (arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3];
                dy.EventRegister.getInstance().register(target, eventName, handler, null, priority);
            }
        };
        CustomEventHandler.prototype.off = function (args) {
            var eventRegister = dy.EventRegister.getInstance();
            eventRegister.remove.apply(eventRegister, Array.prototype.slice.call(arguments, 0));
        };
        CustomEventHandler.prototype.trigger = function (args) {
            var event = null;
            if (arguments.length === 1 || arguments.length === 2) {
                var userData = null;
                if (arguments.length === 1) {
                    event = arguments[0];
                }
                else {
                    event = arguments[0];
                    userData = arguments[1];
                }
                return this._triggerEventHandler(event, userData);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = null, userData = null, notSetTarget = null;
                if (arguments.length === 3) {
                    target = arguments[0];
                    event = arguments[1];
                    notSetTarget = arguments[2];
                }
                else {
                    target = arguments[0];
                    event = arguments[1];
                    userData = arguments[2];
                    notSetTarget = arguments[3];
                }
                return this._triggerTargetAndEventHandler(target, event, userData, notSetTarget);
            }
        };
        CustomEventHandler.prototype._triggerEventHandler = function (event, userData) {
            var listenerDataList = null, isStopPropagation = false, self = this;
            listenerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(event.name);
            if (listenerDataList === null || listenerDataList.getCount() === 0) {
                return false;
            }
            listenerDataList.forEach(function (listenerData) {
                var eventCopy = event.copy();
                eventCopy.currentTarget = listenerData.target;
                eventCopy.target = listenerData.target;
                self._setUserData(eventCopy, userData);
                listenerData.handler(eventCopy);
            });
            return true;
        };
        CustomEventHandler.prototype._triggerTargetAndEventHandler = function (target, event, userData, notSetTarget) {
            var listenerDataList = null, isStopPropagation = false, self = this;
            if (!notSetTarget) {
                event.target = target;
            }
            listenerDataList = dy.EventRegister.getInstance().getEventRegisterDataList(target, event.name);
            if (listenerDataList === null || listenerDataList.getCount() === 0) {
                return false;
            }
            listenerDataList.forEach(function (listenerData) {
                var eventCopy = event.copy();
                eventCopy.currentTarget = listenerData.target;
                self._setUserData(eventCopy, userData);
                listenerData.handler(eventCopy);
                if (eventCopy.isStopPropagation) {
                    isStopPropagation = true;
                }
            });
            return isStopPropagation;
        };
        CustomEventHandler.prototype._setUserData = function (event, userData) {
            if (userData) {
                event.userData = userData;
            }
        };
        CustomEventHandler._instance = null;
        return CustomEventHandler;
    })(dy.EventHandler);
    dy.CustomEventHandler = CustomEventHandler;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventDispatcher = (function () {
        function EventDispatcher() {
        }
        EventDispatcher.create = function () {
            var obj = new this();
            return obj;
        };
        EventDispatcher.prototype.trigger = function (args) {
            if (arguments.length === 1) {
                var event_1 = arguments[0], eventType = event_1.type;
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event_1);
            }
            else if (arguments.length === 2 && !(arguments[1] instanceof dy.Event)) {
                var event_2 = arguments[0], userData = arguments[1], eventType = event_2.type;
                dyCb.Log.error(eventType !== dy.EventType.CUSTOM, dyCb.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(event_2, userData);
            }
            else if (arguments.length === 2 || (arguments.length === 3 && dy.JudgeUtils.isBoolean(arguments[2]))) {
                var target = arguments[0], event_3 = arguments[1], notSetTarget = arguments[2] === void 0 ? false : arguments[2], eventType = event_3.type;
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(target, event_3, notSetTarget);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = arguments[0], event_4 = arguments[1], userData = arguments[2], notSetTarget = arguments[3] === void 0 ? false : arguments[3], eventType = event_4.type;
                dyCb.Log.error(eventType !== dy.EventType.CUSTOM, dyCb.Log.info.FUNC_MUST_BE("event type", "CUSTOM"));
                return dy.FactoryEventHandler.createEventHandler(eventType)
                    .trigger(target, event_4, userData, notSetTarget);
            }
        };
        EventDispatcher.prototype.emit = function (target, eventObject, userData) {
            var isStopPropagation = false;
            eventObject.phase = dy.EventPhase.EMIT;
            eventObject.target = target;
            do {
                isStopPropagation = this._triggerWithUserData(target, eventObject.copy(), userData, true);
                if (isStopPropagation) {
                    break;
                }
                target = this._getParent(target);
            } while (target);
        };
        EventDispatcher.prototype.broadcast = function (target, eventObject, userData) {
            var self = this;
            eventObject.phase = dy.EventPhase.BROADCAST;
            eventObject.target = target;
            this._triggerWithUserData(target, eventObject.copy(), userData, true);
            function iterator(obj) {
                var children = obj.getChildren();
                if (children.getCount() === 0) {
                    return;
                }
                children.forEach(function (child) {
                    self._triggerWithUserData(child, eventObject.copy(), userData, true);
                    iterator(child);
                });
            }
            iterator(target);
        };
        EventDispatcher.prototype._getParent = function (target) {
            var parent = target.bubbleParent;
            return parent ? parent : target.parent;
        };
        EventDispatcher.prototype._triggerWithUserData = function (target, event, userData, notSetTarget) {
            return userData ? this.trigger(target, event.copy(), userData, notSetTarget)
                : this.trigger(target, event, notSetTarget);
        };
        return EventDispatcher;
    })();
    dy.EventDispatcher = EventDispatcher;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventRegister = (function () {
        function EventRegister() {
            this._listenerMap = dy.EventListenerMap.create();
        }
        EventRegister.getInstance = function () {
            if (this._instance === null) {
                this._instance = new this();
            }
            return this._instance;
        };
        EventRegister.prototype.register = function (target, eventName, handler, wrapHandler, priority) {
            var data = {
                target: target,
                handler: handler,
                wrapHandler: wrapHandler,
                priority: priority
            };
            this._listenerMap.appendChild(eventName, data);
        };
        EventRegister.prototype.remove = function (args) {
            var target = arguments[0];
            if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                this._listenerMap.removeChild(eventName);
                return null;
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1];
                this._listenerMap.removeChild(eventName, handler);
                return null;
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isNumber(arguments[0])) {
                var uid = arguments[0], eventName = arguments[1];
                this._listenerMap.removeChild(uid, eventName);
                return null;
            }
            else if (arguments.length === 1) {
                var dataList = null;
                dataList = this._listenerMap.getEventOffDataList(target);
                this._listenerMap.removeChild(target);
                this._handleAfterAllEventHandlerRemoved(target);
                return dataList;
            }
            else if (arguments.length === 2 || arguments.length === 3) {
                var eventName = arguments[1];
                this._listenerMap.removeChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));
                if (this._isAllEventHandlerRemoved(target)) {
                    this._handleAfterAllEventHandlerRemoved(target);
                    return this._listenerMap.getEventOffDataList(target, eventName);
                }
                return null;
            }
        };
        EventRegister.prototype.getEventRegisterDataList = function (args) {
            var result = this._listenerMap.getChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0)), self = this;
            if (!result) {
                return null;
            }
            return result.sort(function (dataA, dataB) {
                return dataB.priority - dataA.priority;
            });
        };
        EventRegister.prototype.setBubbleParent = function (target, parent) {
            target.bubbleParent = parent;
        };
        EventRegister.prototype.isBinded = function (target, eventName) {
            return this._listenerMap.hasChild(target, eventName);
        };
        EventRegister.prototype.filter = function (func) {
            return this._listenerMap.filter(func);
        };
        EventRegister.prototype.forEach = function (func) {
            return this._listenerMap.forEach(func);
        };
        EventRegister.prototype.getChild = function (target, eventName) {
            return this._listenerMap.getChild.apply(this._listenerMap, Array.prototype.slice.call(arguments, 0));
        };
        EventRegister.prototype.getEventNameFromKey = function (key) {
            return this._listenerMap.getEventNameFromKey(key);
        };
        EventRegister.prototype.getUidFromKey = function (key) {
            return this._listenerMap.getUidFromKey(key);
        };
        EventRegister.prototype.getWrapHandler = function (target, eventName) {
            var list = this.getChild(target, eventName);
            if (list && list.getCount() > 0) {
                return list.getChild(0).wrapHandler;
            }
        };
        EventRegister.prototype.isTarget = function (key, target, list) {
            return this._listenerMap.isTarget(key, target, list);
        };
        EventRegister.prototype._isAllEventHandlerRemoved = function (target) {
            return !this._listenerMap.hasChild(function (list, key) {
                return key.indexOf(String(target.uid)) > -1 && list !== undefined;
            });
        };
        EventRegister.prototype._handleAfterAllEventHandlerRemoved = function (target) {
            this.setBubbleParent(target, null);
        };
        EventRegister._instance = null;
        return EventRegister;
    })();
    dy.EventRegister = EventRegister;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventBinder = (function () {
        function EventBinder() {
        }
        EventBinder.create = function () {
            var obj = new this();
            return obj;
        };
        EventBinder.prototype.on = function (args) {
            if (arguments.length === 1) {
                var listener = !(arguments[0] instanceof dy.EventListener) ? dy.EventListener.create(arguments[0]) : arguments[0];
                listener.handlerDataList.forEach(function (handlerData) {
                    dy.FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], listener = !(arguments[1] instanceof dy.EventListener) ? dy.EventListener.create(arguments[1]) : arguments[1];
                listener.handlerDataList.forEach(function (handlerData) {
                    dy.FactoryEventHandler.createEventHandler(listener.eventType)
                        .on(target, handlerData.eventName, handlerData.handler, listener.priority);
                });
            }
            else if (arguments.length === 3) {
                var eventName = arguments[0], handler = arguments[1], priority = arguments[2];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .on(eventName, handler, priority);
            }
            else if (arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .on(target, eventName, handler, priority);
            }
        };
        EventBinder.prototype.off = function () {
            var eventRegister = dy.EventRegister.getInstance(), argArr = Array.prototype.slice.call(arguments, 0);
            if (arguments.length === 0) {
                eventRegister.forEach(function (list, key) {
                    var eventName = eventRegister.getEventNameFromKey(key), targetUid = eventRegister.getUidFromKey(key);
                    if (!targetUid) {
                        dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                            .off(eventName);
                        return;
                    }
                    dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                        .off(targetUid, eventName);
                });
            }
            else if (arguments.length === 1 && dy.JudgeUtils.isString(arguments[0])) {
                var eventName = arguments[0];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(eventName);
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(eventName, handler);
            }
            else if (arguments.length === 1) {
                var target = arguments[0];
                eventRegister.forEach(function (list, key) {
                    var eventName = eventRegister.getEventNameFromKey(key);
                    if (eventRegister.isTarget(key, target, list)) {
                        dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                            .off(target, eventName);
                    }
                });
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(target, eventName);
            }
            else if (arguments.length === 3) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2];
                dy.FactoryEventHandler.createEventHandler(dy.EventTable.getEventType(eventName))
                    .off(target, eventName, handler);
            }
        };
        return EventBinder;
    })();
    dy.EventBinder = EventBinder;
})(dy || (dy = {}));

/// <reference path="../../definitions.d.ts"/>
var dy;
(function (dy) {
    var FactoryEventHandler = (function () {
        function FactoryEventHandler() {
        }
        FactoryEventHandler.createEventHandler = function (eventType) {
            var handler = null;
            switch (eventType) {
                case dy.EventType.MOUSE:
                    handler = dy.MouseEventHandler.getInstance();
                    break;
                case dy.EventType.KEYBOARD:
                    handler = dy.KeyboardEventHandler.getInstance();
                    break;
                case dy.EventType.CUSTOM:
                    handler = dy.CustomEventHandler.getInstance();
                    break;
                default:
                    dyCb.Log.error(true, dyCb.Log.info.FUNC_INVALID("eventType"));
                    break;
            }
            return handler;
        };
        return FactoryEventHandler;
    })();
    dy.FactoryEventHandler = FactoryEventHandler;
})(dy || (dy = {}));

/// <reference path="../definitions.d.ts"/>
var dy;
(function (dy) {
    var EventManager = (function () {
        function EventManager() {
        }
        EventManager.on = function (args) {
            if (arguments.length === 1) {
                var listener = arguments[0];
                this._eventBinder.on(listener);
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isString(arguments[0]) && dy.JudgeUtils.isFunction(arguments[1])) {
                var eventName = arguments[0], handler = arguments[1], priority = 1;
                this._eventBinder.on(eventName, handler, priority);
            }
            else if (arguments.length === 2) {
                var target = arguments[0], listener = arguments[1];
                this._eventBinder.on(target, listener);
            }
            else if (arguments.length === 3 && dy.JudgeUtils.isString(arguments[0]) && dy.JudgeUtils.isFunction(arguments[1]) && dy.JudgeUtils.isNumber(arguments[2])) {
                var eventName = arguments[0], handler = arguments[1], priority = arguments[2];
                this._eventBinder.on(eventName, handler, priority);
            }
            else if (arguments.length === 3 || arguments.length === 4) {
                var target = arguments[0], eventName = arguments[1], handler = arguments[2], priority = arguments[3] === undefined ? 1 : arguments[3];
                this._eventBinder.on(target, eventName, handler, priority);
            }
        };
        EventManager.off = function () {
            this._eventBinder.off.apply(this._eventBinder, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.trigger = function (args) {
            this._eventDispatcher.trigger.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.broadcast = function (target, event, userData) {
            this._eventDispatcher.broadcast.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.emit = function (target, event, userData) {
            this._eventDispatcher.emit.apply(this._eventDispatcher, Array.prototype.slice.call(arguments, 0));
        };
        EventManager.fromEvent = function (args) {
            var addHandler = null, removeHandler = null;
            if (arguments.length === 1) {
                var eventName = arguments[0];
                addHandler = function (handler) {
                    EventManager.on(eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (arguments.length === 2 && dy.JudgeUtils.isNumber(arguments[1])) {
                var eventName = arguments[0], priority = arguments[1];
                addHandler = function (handler) {
                    EventManager.on(eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(eventName, handler);
                };
            }
            else if (arguments.length === 2) {
                var target = arguments[0], eventName = arguments[1];
                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }
            else if (arguments.length === 3) {
                var target = arguments[0], eventName = arguments[1], priority = arguments[2];
                addHandler = function (handler) {
                    EventManager.on(target, eventName, handler, priority);
                };
                removeHandler = function (handler) {
                    EventManager.off(target, eventName, handler);
                };
            }
            return dyRt.fromEventPattern(addHandler, removeHandler);
        };
        EventManager.setBubbleParent = function (target, parent) {
            dy.EventRegister.getInstance().setBubbleParent(target, parent);
        };
        EventManager._eventBinder = dy.EventBinder.create();
        EventManager._eventDispatcher = dy.EventDispatcher.create();
        return EventManager;
    })();
    dy.EventManager = EventManager;
})(dy || (dy = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4dGVuZC9keVJ0LnRzIiwiY29yZS9FbnRpdHkudHMiLCJjb3JlL0NvbXBvbmVudC50cyIsImNvcmUvVHJhbnNmb3JtLnRzIiwiY29yZS9HYW1lT2JqZWN0LnRzIiwiY29yZS9TdGFnZS50cyIsImNvcmUvU2NoZWR1bGVyLnRzIiwiY29yZS9EaXJlY3Rvci50cyIsInN0cnVjdHVyZS9Qb2ludC50cyIsInN0cnVjdHVyZS9WaWV3LnRzIiwiY29tcG9uZW50L2dlb21ldHJ5L0dlb21ldHJ5LnRzIiwiY29tcG9uZW50L2dlb21ldHJ5L0JveEdlb21ldHJ5LnRzIiwiY29tcG9uZW50L2dlb21ldHJ5L1JlY3RHZW9tZXRyeS50cyIsImNvbXBvbmVudC9nZW9tZXRyeS9TcGhlcmVEcmF3TW9kZS50cyIsImNvbXBvbmVudC9nZW9tZXRyeS9TcGhlcmVHZW9tZXRyeS50cyIsImNvbXBvbmVudC9nZW9tZXRyeS9UcmlhbmdsZUdlb21ldHJ5LnRzIiwiY29tcG9uZW50L2JlaGF2aW9yL0JlaGF2aW9yLnRzIiwiY29tcG9uZW50L2JlaGF2aW9yL0NhbWVyYS50cyIsImNvbXBvbmVudC9iZWhhdmlvci9hY3Rpb24vQWN0aW9uLnRzIiwiY29tcG9uZW50L2JlaGF2aW9yL2FjdGlvbi9BY3Rpb25JbnN0YW50LnRzIiwiY29tcG9uZW50L2JlaGF2aW9yL2FjdGlvbi9DYWxsRnVuYy50cyIsImNvbXBvbmVudC9iZWhhdmlvci9hY3Rpb24vQWN0aW9uSW50ZXJ2YWwudHMiLCJjb21wb25lbnQvYmVoYXZpb3IvYWN0aW9uL0NvbnRyb2wudHMiLCJjb21wb25lbnQvYmVoYXZpb3IvYWN0aW9uL1NlcXVlbmNlLnRzIiwiY29tcG9uZW50L2JlaGF2aW9yL2FjdGlvbi9TcGF3bi50cyIsImNvbXBvbmVudC9iZWhhdmlvci9hY3Rpb24vRGVsYXlUaW1lLnRzIiwiY29tcG9uZW50L2JlaGF2aW9yL2FjdGlvbi9SZXBlYXQudHMiLCJjb21wb25lbnQvYmVoYXZpb3IvYWN0aW9uL1JlcGVhdEZvcmV2ZXIudHMiLCJjb21wb25lbnQvYmVoYXZpb3IvYWN0aW9uL1R3ZWVuLnRzIiwiY29tcG9uZW50L2JlaGF2aW9yL2FjdGlvbi9BY3Rpb25NYW5hZ2VyLnRzIiwiY29tcG9uZW50L3JlbmRlcmVyL1JlbmRlcmVyLnRzIiwiY29tcG9uZW50L3JlbmRlcmVyL01lc2hSZW5kZXJlci50cyIsImNvbXBvbmVudC9jb2xsaWRlci9Db2xsaWRlci50cyIsImNvbXBvbmVudC9jb2xsaWRlci9Ub3BDb2xsaWRlci50cyIsImNvbXBvbmVudC9zY3JpcHQvU2NyaXB0LnRzIiwiY29tcG9uZW50L3NjcmlwdC9JU2NyaXB0QmVoYXZpb3IudHMiLCJtYXRoL0dsb2JhbC50cyIsIm1hdGgvVmVjdG9yMy50cyIsIm1hdGgvVmVjdG9yNC50cyIsIm1hdGgvTWF0cml4LnRzIiwibWF0aC9RdWF0ZXJuaW9uLnRzIiwidXRpbHMvQ29sb3IudHMiLCJ1dGlscy9KdWRnZVV0aWxzLnRzIiwidXRpbHMvdGltZS9UaW1lQ29udHJvbGxlci50cyIsInV0aWxzL3RpbWUvRGlyZWN0b3JUaW1lQ29udHJvbGxlci50cyIsInV0aWxzL3RpbWUvQ29tbW9uVGltZUNvbnRyb2xsZXIudHMiLCJyZW5kZXIvUmVuZGVyZXIudHMiLCJyZW5kZXIvV2ViR0xSZW5kZXJlci50cyIsInJlbmRlci9TaGFkZXIudHMiLCJyZW5kZXIvQnVmZmVyVHlwZS50cyIsInJlbmRlci9BdHRyaWJ1dGVEYXRhVHlwZS50cyIsInJlbmRlci9EcmF3TW9kZS50cyIsInJlbmRlci9CdWZmZXIudHMiLCJyZW5kZXIvRWxlbWVudEJ1ZmZlci50cyIsInJlbmRlci9BcnJheUJ1ZmZlci50cyIsInJlbmRlci9Vbmlmb3JtRGF0YVR5cGUudHMiLCJyZW5kZXIvUHJvZ3JhbS50cyIsInJlbmRlci9RdWFkQ29tbWFuZC50cyIsIm1hdGVyaWFsL01hdGVyaWFsLnRzIiwiYXNzZXQvTG9hZGVyLnRzIiwiYXNzZXQvR0xTTExvYWRlci50cyIsImFzc2V0L0pzTG9hZGVyLnRzIiwiYXNzZXQvTG9hZGVyTWFuYWdlci50cyIsImFzc2V0L0xvYWRlckZhY3RvcnkudHMiLCJldmVudC9zdHJ1Y3R1cmUvRXZlbnRMaXN0ZW5lck1hcC50cyIsImV2ZW50L29iamVjdC9FdmVudFR5cGUudHMiLCJldmVudC9vYmplY3QvRXZlbnROYW1lLnRzIiwiZXZlbnQvb2JqZWN0L0V2ZW50UGhhc2UudHMiLCJldmVudC9vYmplY3QvRXZlbnRUYWJsZS50cyIsImV2ZW50L29iamVjdC9FdmVudC50cyIsImV2ZW50L29iamVjdC9Nb3VzZUV2ZW50LnRzIiwiZXZlbnQvb2JqZWN0L0tleWJvYXJkRXZlbnQudHMiLCJldmVudC9vYmplY3QvQ3VzdG9tRXZlbnQudHMiLCJldmVudC9vYmplY3QvTW91c2VCdXR0b24udHMiLCJldmVudC9saXN0ZW5lci9FdmVudExpc3RlbmVyLnRzIiwiZXZlbnQvaGFuZGxlci9FdmVudEhhbmRsZXIudHMiLCJldmVudC9oYW5kbGVyL0RvbUV2ZW50SGFuZGxlci50cyIsImV2ZW50L2hhbmRsZXIvTW91c2VFdmVudEhhbmRsZXIudHMiLCJldmVudC9oYW5kbGVyL0tleWJvYXJkRXZlbnRIYW5kbGVyLnRzIiwiZXZlbnQvaGFuZGxlci9DdXN0b21FdmVudEhhbmRsZXIudHMiLCJldmVudC9kaXNwYXRjaGVyL0V2ZW50RGlzcGF0Y2hlci50cyIsImV2ZW50L2JpbmRlci9FdmVudFJlZ2lzdGVyLnRzIiwiZXZlbnQvYmluZGVyL0V2ZW50QmluZGVyLnRzIiwiZXZlbnQvZmFjdG9yeS9GYWN0b3J5RXZlbnRIYW5kbGVyLnRzIiwiZXZlbnQvRXZlbnRNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbImR5UnQiLCJkeSIsImR5LkVudGl0eSIsImR5LkVudGl0eS5jb25zdHJ1Y3RvciIsImR5LkVudGl0eS51aWQiLCJkeS5Db21wb25lbnQiLCJkeS5Db21wb25lbnQuY29uc3RydWN0b3IiLCJkeS5Db21wb25lbnQuZ2FtZU9iamVjdCIsImR5LkNvbXBvbmVudC50cmFuc2Zvcm0iLCJkeS5Db21wb25lbnQuaW5pdCIsImR5LlRyYW5zZm9ybSIsImR5LlRyYW5zZm9ybS5jb25zdHJ1Y3RvciIsImR5LlRyYW5zZm9ybS5jcmVhdGUiLCJkeS5UcmFuc2Zvcm0ubG9jYWxUb1BhcmVudE1hdHJpeCIsImR5LlRyYW5zZm9ybS5sb2NhbFRvV29ybGRNYXRyaXgiLCJkeS5UcmFuc2Zvcm0ucGFyZW50IiwiZHkuVHJhbnNmb3JtLnBvc2l0aW9uIiwiZHkuVHJhbnNmb3JtLnJvdGF0aW9uIiwiZHkuVHJhbnNmb3JtLnNjYWxlIiwiZHkuVHJhbnNmb3JtLmV1bGVyQW5nbGVzIiwiZHkuVHJhbnNmb3JtLmxvY2FsUG9zaXRpb24iLCJkeS5UcmFuc2Zvcm0ubG9jYWxSb3RhdGlvbiIsImR5LlRyYW5zZm9ybS5sb2NhbEV1bGVyQW5nbGVzIiwiZHkuVHJhbnNmb3JtLmxvY2FsU2NhbGUiLCJkeS5UcmFuc2Zvcm0udXAiLCJkeS5UcmFuc2Zvcm0ucmlnaHQiLCJkeS5UcmFuc2Zvcm0uZm9yd2FyZCIsImR5LlRyYW5zZm9ybS5kaXJ0eVdvcmxkIiwiZHkuVHJhbnNmb3JtLmFkZENoaWxkIiwiZHkuVHJhbnNmb3JtLnJlbW92ZUNoaWxkIiwiZHkuVHJhbnNmb3JtLnN5bmMiLCJkeS5UcmFuc2Zvcm0udHJhbnNsYXRlTG9jYWwiLCJkeS5UcmFuc2Zvcm0udHJhbnNsYXRlIiwiZHkuVHJhbnNmb3JtLnJvdGF0ZSIsImR5LlRyYW5zZm9ybS5yb3RhdGVMb2NhbCIsImR5LlRyYW5zZm9ybS5yb3RhdGVBcm91bmQiLCJkeS5UcmFuc2Zvcm0ubG9va0F0IiwiZHkuR2FtZU9iamVjdCIsImR5LkdhbWVPYmplY3QuY29uc3RydWN0b3IiLCJkeS5HYW1lT2JqZWN0LmNyZWF0ZSIsImR5LkdhbWVPYmplY3QucGFyZW50IiwiZHkuR2FtZU9iamVjdC5idWJibGVQYXJlbnQiLCJkeS5HYW1lT2JqZWN0LnRyYW5zZm9ybSIsImR5LkdhbWVPYmplY3QucmVuZGVyZXIiLCJkeS5HYW1lT2JqZWN0Lm5hbWUiLCJkeS5HYW1lT2JqZWN0LnNjcmlwdCIsImR5LkdhbWVPYmplY3Quc2NyaXB0U3RyZWFtcyIsImR5LkdhbWVPYmplY3QuaW5pdCIsImR5LkdhbWVPYmplY3Qub25FbnRlciIsImR5LkdhbWVPYmplY3Qub25TdGFydExvb3AiLCJkeS5HYW1lT2JqZWN0Lm9uRW5kTG9vcCIsImR5LkdhbWVPYmplY3Qub25FeGl0IiwiZHkuR2FtZU9iamVjdC5kaXNwb3NlIiwiZHkuR2FtZU9iamVjdC5oYXNDaGlsZCIsImR5LkdhbWVPYmplY3QuYWRkQ2hpbGQiLCJkeS5HYW1lT2JqZWN0LmdldENoaWxkcmVuIiwiZHkuR2FtZU9iamVjdC5zb3J0IiwiZHkuR2FtZU9iamVjdC5mb3JFYWNoIiwiZHkuR2FtZU9iamVjdC5yZW1vdmVDaGlsZCIsImR5LkdhbWVPYmplY3QuZ2V0VG9wVW5kZXJQb2ludCIsImR5LkdhbWVPYmplY3QuaXNIaXQiLCJkeS5HYW1lT2JqZWN0Lmhhc0NvbXBvbmVudCIsImR5LkdhbWVPYmplY3QuZ2V0Q29tcG9uZW50IiwiZHkuR2FtZU9iamVjdC5hZGRDb21wb25lbnQiLCJkeS5HYW1lT2JqZWN0LnJlbW92ZUNvbXBvbmVudCIsImR5LkdhbWVPYmplY3QucmVuZGVyIiwiZHkuR2FtZU9iamVjdC51cGRhdGUiLCJkeS5HYW1lT2JqZWN0Ll9hc2NlbmRaIiwiZHkuR2FtZU9iamVjdC5fZXhlY1NjcmlwdCIsImR5LlN0YWdlIiwiZHkuU3RhZ2UuY29uc3RydWN0b3IiLCJkeS5TdGFnZS5jcmVhdGUiLCJkeS5TdGFnZS5pbml0IiwiZHkuU3RhZ2UuYWRkQ2hpbGQiLCJkeS5TdGFnZS5yZW5kZXIiLCJkeS5TdGFnZS5vbkVudGVyIiwiZHkuU3RhZ2Uub25TdGFydExvb3AiLCJkeS5TdGFnZS5vbkVuZExvb3AiLCJkeS5TdGFnZS5faXNDYW1lcmEiLCJkeS5TY2hlZHVsZXIiLCJkeS5TY2hlZHVsZXIuY29uc3RydWN0b3IiLCJkeS5TY2hlZHVsZXIuY3JlYXRlIiwiZHkuU2NoZWR1bGVyLnVwZGF0ZSIsImR5LlNjaGVkdWxlci5zY2hlZHVsZUxvb3AiLCJkeS5TY2hlZHVsZXIuc2NoZWR1bGVGcmFtZSIsImR5LlNjaGVkdWxlci5zY2hlZHVsZUludGVydmFsIiwiZHkuU2NoZWR1bGVyLnNjaGVkdWxlVGltZSIsImR5LlNjaGVkdWxlci5wYXVzZSIsImR5LlNjaGVkdWxlci5yZXN1bWUiLCJkeS5TY2hlZHVsZXIuc3RhcnQiLCJkeS5TY2hlZHVsZXIuc3RvcCIsImR5LlNjaGVkdWxlci5oYXMiLCJkeS5TY2hlZHVsZXIucmVtb3ZlIiwiZHkuU2NoZWR1bGVyLnJlbW92ZUFsbCIsImR5LlNjaGVkdWxlci5fc2NoZWR1bGUiLCJkeS5TY2hlZHVsZXIuX2J1aWxkSWQiLCJkeS5TY2hlZHVsZUl0ZW0iLCJkeS5TY2hlZHVsZUl0ZW0uY29uc3RydWN0b3IiLCJkeS5TY2hlZHVsZUl0ZW0ucGF1c2UiLCJkeS5TY2hlZHVsZUl0ZW0ucmVzdW1lIiwiZHkuU2NoZWR1bGVJdGVtLnN0YXJ0IiwiZHkuU2NoZWR1bGVJdGVtLnN0b3AiLCJkeS5TY2hlZHVsZUl0ZW0uZmluaXNoIiwiZHkuVGltZVNjaGVkdWxlSXRlbSIsImR5LlRpbWVTY2hlZHVsZUl0ZW0uY29uc3RydWN0b3IiLCJkeS5UaW1lU2NoZWR1bGVJdGVtLmNyZWF0ZSIsImR5LlRpbWVTY2hlZHVsZUl0ZW0udXBkYXRlIiwiZHkuSW50ZXJ2YWxTY2hlZHVsZUl0ZW0iLCJkeS5JbnRlcnZhbFNjaGVkdWxlSXRlbS5jb25zdHJ1Y3RvciIsImR5LkludGVydmFsU2NoZWR1bGVJdGVtLmNyZWF0ZSIsImR5LkludGVydmFsU2NoZWR1bGVJdGVtLnVwZGF0ZSIsImR5LkludGVydmFsU2NoZWR1bGVJdGVtLnN0YXJ0IiwiZHkuTG9vcFNjaGVkdWxlSXRlbSIsImR5Lkxvb3BTY2hlZHVsZUl0ZW0uY29uc3RydWN0b3IiLCJkeS5Mb29wU2NoZWR1bGVJdGVtLmNyZWF0ZSIsImR5Lkxvb3BTY2hlZHVsZUl0ZW0udXBkYXRlIiwiZHkuRnJhbWVTY2hlZHVsZUl0ZW0iLCJkeS5GcmFtZVNjaGVkdWxlSXRlbS5jb25zdHJ1Y3RvciIsImR5LkZyYW1lU2NoZWR1bGVJdGVtLmNyZWF0ZSIsImR5LkZyYW1lU2NoZWR1bGVJdGVtLnVwZGF0ZSIsImR5LkdhbWVTdGF0ZSIsImR5LkRpcmVjdG9yIiwiZHkuRGlyZWN0b3IuY29uc3RydWN0b3IiLCJkeS5EaXJlY3Rvci5nZXRJbnN0YW5jZSIsImR5LkRpcmVjdG9yLnN0YWdlIiwiZHkuRGlyZWN0b3Iuc2NoZWR1bGVyIiwiZHkuRGlyZWN0b3IucmVuZGVyZXIiLCJkeS5EaXJlY3Rvci52aWV3IiwiZHkuRGlyZWN0b3IuZ2wiLCJkeS5EaXJlY3Rvci5nYW1lVGltZSIsImR5LkRpcmVjdG9yLmZwcyIsImR5LkRpcmVjdG9yLmlzTm9ybWFsIiwiZHkuRGlyZWN0b3IuaXNTdG9wIiwiZHkuRGlyZWN0b3IuaXNQYXVzZSIsImR5LkRpcmVjdG9yLmlzVGltZUNoYW5nZSIsImR5LkRpcmVjdG9yLmVsYXBzZWQiLCJkeS5EaXJlY3Rvci5pbml0V2hlbkNyZWF0ZSIsImR5LkRpcmVjdG9yLnN0YXJ0IiwiZHkuRGlyZWN0b3Iuc3RvcCIsImR5LkRpcmVjdG9yLnBhdXNlIiwiZHkuRGlyZWN0b3IucmVzdW1lIiwiZHkuRGlyZWN0b3IuZ2V0VmlldyIsImR5LkRpcmVjdG9yLmdldFRvcFVuZGVyUG9pbnQiLCJkeS5EaXJlY3Rvci5jcmVhdGVHTCIsImR5LkRpcmVjdG9yLl9zdGFydExvb3AiLCJkeS5EaXJlY3Rvci5fYnVpbGRMb2FkU2NyaXB0U3RyZWFtIiwiZHkuRGlyZWN0b3IuX2J1aWxkSW5pdFN0cmVhbSIsImR5LkRpcmVjdG9yLl9idWlsZExvb3BTdHJlYW0iLCJkeS5EaXJlY3Rvci5fbG9vcEJvZHkiLCJkeS5EaXJlY3Rvci5fcnVuIiwiZHkuUG9pbnQiLCJkeS5Qb2ludC5jb25zdHJ1Y3RvciIsImR5LlBvaW50LmNyZWF0ZSIsImR5LlZpZXdXZWJHTCIsImR5LlZpZXdXZWJHTC5jb25zdHJ1Y3RvciIsImR5LlZpZXdXZWJHTC5jcmVhdGUiLCJkeS5WaWV3V2ViR0wub2Zmc2V0IiwiZHkuVmlld1dlYkdMLmRvbSIsImR5LlZpZXdXZWJHTC53aWR0aCIsImR5LlZpZXdXZWJHTC5oZWlnaHQiLCJkeS5WaWV3V2ViR0wuZ2V0Q29udGV4dCIsImR5Lkdlb21ldHJ5IiwiZHkuR2VvbWV0cnkuY29uc3RydWN0b3IiLCJkeS5HZW9tZXRyeS52ZXJ0aWNlcyIsImR5Lkdlb21ldHJ5LmluZGljZXMiLCJkeS5HZW9tZXRyeS5jb2xvcnMiLCJkeS5HZW9tZXRyeS5tYXRlcmlhbCIsImR5Lkdlb21ldHJ5LmluaXQiLCJkeS5HZW9tZXRyeS5jb21wdXRlVmVydGljZXNCdWZmZXIiLCJkeS5HZW9tZXRyeS5jb21wdXRlSW5kaWNlc0J1ZmZlciIsImR5Lkdlb21ldHJ5Ll9jb21wdXRlQ29sb3JzQnVmZmVyIiwiZHkuQm94R2VvbWV0cnkiLCJkeS5Cb3hHZW9tZXRyeS5jb25zdHJ1Y3RvciIsImR5LkJveEdlb21ldHJ5LmNyZWF0ZSIsImR5LkJveEdlb21ldHJ5LndpZHRoIiwiZHkuQm94R2VvbWV0cnkuaGVpZ2h0IiwiZHkuQm94R2VvbWV0cnkuZGVwdGgiLCJkeS5Cb3hHZW9tZXRyeS5jb21wdXRlVmVydGljZXNCdWZmZXIiLCJkeS5Cb3hHZW9tZXRyeS5jb21wdXRlSW5kaWNlc0J1ZmZlciIsImR5LlJlY3RHZW9tZXRyeSIsImR5LlJlY3RHZW9tZXRyeS5jb25zdHJ1Y3RvciIsImR5LlJlY3RHZW9tZXRyeS5jcmVhdGUiLCJkeS5SZWN0R2VvbWV0cnkud2lkdGgiLCJkeS5SZWN0R2VvbWV0cnkuaGVpZ2h0IiwiZHkuUmVjdEdlb21ldHJ5LmNvbXB1dGVWZXJ0aWNlc0J1ZmZlciIsImR5LlJlY3RHZW9tZXRyeS5jb21wdXRlSW5kaWNlc0J1ZmZlciIsImR5LlNwaGVyZURyYXdNb2RlIiwiZHkuU3BoZXJlR2VvbWV0cnkiLCJkeS5TcGhlcmVHZW9tZXRyeS5jb25zdHJ1Y3RvciIsImR5LlNwaGVyZUdlb21ldHJ5LmNyZWF0ZSIsImR5LlNwaGVyZUdlb21ldHJ5LnJhZGl1cyIsImR5LlNwaGVyZUdlb21ldHJ5LmRyYXdNb2RlIiwiZHkuU3BoZXJlR2VvbWV0cnkuc2VnbWVudHMiLCJkeS5TcGhlcmVHZW9tZXRyeS5pbml0IiwiZHkuU3BoZXJlR2VvbWV0cnkuY29tcHV0ZVZlcnRpY2VzQnVmZmVyIiwiZHkuU3BoZXJlR2VvbWV0cnkuY29tcHV0ZUluZGljZXNCdWZmZXIiLCJkeS5TcGhlcmVHZW9tZXRyeS5fY29tcHV0ZURhdGEiLCJkeS5HZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUiLCJkeS5HZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUuY29uc3RydWN0b3IiLCJkeS5HZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUuY3JlYXRlIiwiZHkuR2V0RGF0YUJ5TGF0aXR1ZGVMb25ndGl0dWRlLnZlcnRpY2VzIiwiZHkuR2V0RGF0YUJ5TGF0aXR1ZGVMb25ndGl0dWRlLmluZGljZXMiLCJkeS5HZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUuZ2V0RGF0YSIsImR5LkdldERhdGFCeURlY29tcG9zaXRpb24iLCJkeS5HZXREYXRhQnlEZWNvbXBvc2l0aW9uLmNvbnN0cnVjdG9yIiwiZHkuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbi5jcmVhdGUiLCJkeS5HZXREYXRhQnlEZWNvbXBvc2l0aW9uLnZlcnRpY2VzIiwiZHkuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbi5pbmRpY2VzIiwiZHkuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbi5nZXREYXRhIiwiZHkuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbi5fc3ViRGl2aWRlIiwiZHkuR2V0RGF0YUJ5RGVjb21wb3NpdGlvbi5fbm9ybWFsaXplIiwiZHkuVHJpYW5nbGVHZW9tZXRyeSIsImR5LlRyaWFuZ2xlR2VvbWV0cnkuY29uc3RydWN0b3IiLCJkeS5UcmlhbmdsZUdlb21ldHJ5LmNyZWF0ZSIsImR5LlRyaWFuZ2xlR2VvbWV0cnkud2lkdGgiLCJkeS5UcmlhbmdsZUdlb21ldHJ5LmhlaWdodCIsImR5LlRyaWFuZ2xlR2VvbWV0cnkuY29tcHV0ZVZlcnRpY2VzQnVmZmVyIiwiZHkuVHJpYW5nbGVHZW9tZXRyeS5jb21wdXRlSW5kaWNlc0J1ZmZlciIsImR5LkJlaGF2aW9yIiwiZHkuQmVoYXZpb3IuY29uc3RydWN0b3IiLCJkeS5CZWhhdmlvci51cGRhdGUiLCJkeS5DYW1lcmEiLCJkeS5DYW1lcmEuY29uc3RydWN0b3IiLCJkeS5DYW1lcmEuY3JlYXRlIiwiZHkuQ2FtZXJhLmNhbWVyYVRvV29ybGRNYXRyaXgiLCJkeS5DYW1lcmEud29ybGRUb0NhbWVyYU1hdHJpeCIsImR5LkNhbWVyYS5wTWF0cml4IiwiZHkuQ2FtZXJhLnZNYXRyaXgiLCJkeS5DYW1lcmEuZXllIiwiZHkuQ2FtZXJhLmNlbnRlciIsImR5LkNhbWVyYS51cCIsImR5LkNhbWVyYS5mb3Z5IiwiZHkuQ2FtZXJhLmFzcGVjdCIsImR5LkNhbWVyYS5uZWFyIiwiZHkuQ2FtZXJhLmZhciIsImR5LkNhbWVyYS5pbml0IiwiZHkuQ2FtZXJhLmNvbXB1dGVWcE1hdHJpeCIsImR5LkNhbWVyYS56b29tSW4iLCJkeS5DYW1lcmEuem9vbU91dCIsImR5LkNhbWVyYS51cGRhdGUiLCJkeS5BY3Rpb24iLCJkeS5BY3Rpb24uY29uc3RydWN0b3IiLCJkeS5BY3Rpb24uaXNGaW5pc2giLCJkeS5BY3Rpb24uaXNTdGFydCIsImR5LkFjdGlvbi5pc1N0b3AiLCJkeS5BY3Rpb24uaXNQYXVzZSIsImR5LkFjdGlvbi50YXJnZXQiLCJkeS5BY3Rpb24ucmVzZXQiLCJkeS5BY3Rpb24udXBkYXRlIiwiZHkuQWN0aW9uLnN0YXJ0IiwiZHkuQWN0aW9uLnN0b3AiLCJkeS5BY3Rpb24ucGF1c2UiLCJkeS5BY3Rpb24ucmVzdW1lIiwiZHkuQWN0aW9uLmNvcHkiLCJkeS5BY3Rpb24ucmV2ZXJzZSIsImR5LkFjdGlvbi5maW5pc2giLCJkeS5BY3Rpb25JbnN0YW50IiwiZHkuQWN0aW9uSW5zdGFudC5jb25zdHJ1Y3RvciIsImR5LkFjdGlvbkluc3RhbnQuaXNTdG9wIiwiZHkuQWN0aW9uSW5zdGFudC5pc1BhdXNlIiwiZHkuQWN0aW9uSW5zdGFudC5zdGFydCIsImR5LkFjdGlvbkluc3RhbnQuc3RvcCIsImR5LkFjdGlvbkluc3RhbnQucGF1c2UiLCJkeS5BY3Rpb25JbnN0YW50LnJlc3VtZSIsImR5LkNhbGxGdW5jIiwiZHkuQ2FsbEZ1bmMuY29uc3RydWN0b3IiLCJkeS5DYWxsRnVuYy5jcmVhdGUiLCJkeS5DYWxsRnVuYy5yZXZlcnNlIiwiZHkuQ2FsbEZ1bmMudXBkYXRlIiwiZHkuQ2FsbEZ1bmMuY29weSIsImR5LkFjdGlvbkludGVydmFsIiwiZHkuQWN0aW9uSW50ZXJ2YWwuY29uc3RydWN0b3IiLCJkeS5BY3Rpb25JbnRlcnZhbC5pc1N0b3AiLCJkeS5BY3Rpb25JbnRlcnZhbC5pc1BhdXNlIiwiZHkuQWN0aW9uSW50ZXJ2YWwudXBkYXRlIiwiZHkuQWN0aW9uSW50ZXJ2YWwuc3RhcnQiLCJkeS5BY3Rpb25JbnRlcnZhbC5zdG9wIiwiZHkuQWN0aW9uSW50ZXJ2YWwucmVzZXQiLCJkeS5BY3Rpb25JbnRlcnZhbC5wYXVzZSIsImR5LkFjdGlvbkludGVydmFsLnJlc3VtZSIsImR5LkFjdGlvbkludGVydmFsLnVwZGF0ZUJvZHkiLCJkeS5BY3Rpb25JbnRlcnZhbC5fY29udmVydFRvUmF0aW8iLCJkeS5Db250cm9sIiwiZHkuQ29udHJvbC5jb25zdHJ1Y3RvciIsImR5LkNvbnRyb2wudGFyZ2V0IiwiZHkuQ29udHJvbC5pbml0IiwiZHkuQ29udHJvbC5yZXZlcnNlIiwiZHkuQ29udHJvbC5yZXNldCIsImR5LkNvbnRyb2wuZ2V0SW5uZXJBY3Rpb25zIiwiZHkuQ29udHJvbC5pdGVyYXRlIiwiZHkuU2VxdWVuY2UiLCJkeS5TZXF1ZW5jZS5jb25zdHJ1Y3RvciIsImR5LlNlcXVlbmNlLmNyZWF0ZSIsImR5LlNlcXVlbmNlLmluaXRXaGVuQ3JlYXRlIiwiZHkuU2VxdWVuY2UudXBkYXRlIiwiZHkuU2VxdWVuY2UuY29weSIsImR5LlNlcXVlbmNlLnJlc2V0IiwiZHkuU2VxdWVuY2Uuc3RhcnQiLCJkeS5TZXF1ZW5jZS5zdG9wIiwiZHkuU2VxdWVuY2UucGF1c2UiLCJkeS5TZXF1ZW5jZS5yZXN1bWUiLCJkeS5TZXF1ZW5jZS5yZXZlcnNlIiwiZHkuU2VxdWVuY2UuZ2V0SW5uZXJBY3Rpb25zIiwiZHkuU2VxdWVuY2UuX3N0YXJ0TmV4dEFjdGlvbkFuZEp1ZGdlRmluaXNoIiwiZHkuU3Bhd24iLCJkeS5TcGF3bi5jb25zdHJ1Y3RvciIsImR5LlNwYXduLmNyZWF0ZSIsImR5LlNwYXduLnVwZGF0ZSIsImR5LlNwYXduLnN0YXJ0IiwiZHkuU3Bhd24uc3RvcCIsImR5LlNwYXduLnBhdXNlIiwiZHkuU3Bhd24ucmVzdW1lIiwiZHkuU3Bhd24uY29weSIsImR5LlNwYXduLnJlc2V0IiwiZHkuU3Bhd24ucmV2ZXJzZSIsImR5LlNwYXduLmdldElubmVyQWN0aW9ucyIsImR5LlNwYXduLml0ZXJhdGUiLCJkeS5TcGF3bi5faXNGaW5pc2giLCJkeS5EZWxheVRpbWUiLCJkeS5EZWxheVRpbWUuY29uc3RydWN0b3IiLCJkeS5EZWxheVRpbWUuY3JlYXRlIiwiZHkuRGVsYXlUaW1lLnJldmVyc2UiLCJkeS5EZWxheVRpbWUuY29weSIsImR5LlJlcGVhdCIsImR5LlJlcGVhdC5jb25zdHJ1Y3RvciIsImR5LlJlcGVhdC5jcmVhdGUiLCJkeS5SZXBlYXQuaW5pdFdoZW5DcmVhdGUiLCJkeS5SZXBlYXQudXBkYXRlIiwiZHkuUmVwZWF0LmNvcHkiLCJkeS5SZXBlYXQucmVzZXQiLCJkeS5SZXBlYXQuc3RhcnQiLCJkeS5SZXBlYXQuc3RvcCIsImR5LlJlcGVhdC5wYXVzZSIsImR5LlJlcGVhdC5yZXN1bWUiLCJkeS5SZXBlYXQuZ2V0SW5uZXJBY3Rpb25zIiwiZHkuUmVwZWF0Rm9yZXZlciIsImR5LlJlcGVhdEZvcmV2ZXIuY29uc3RydWN0b3IiLCJkeS5SZXBlYXRGb3JldmVyLmNyZWF0ZSIsImR5LlJlcGVhdEZvcmV2ZXIuaXNGaW5pc2giLCJkeS5SZXBlYXRGb3JldmVyLnVwZGF0ZSIsImR5LlJlcGVhdEZvcmV2ZXIuY29weSIsImR5LlJlcGVhdEZvcmV2ZXIuc3RhcnQiLCJkeS5SZXBlYXRGb3JldmVyLnN0b3AiLCJkeS5SZXBlYXRGb3JldmVyLnBhdXNlIiwiZHkuUmVwZWF0Rm9yZXZlci5yZXN1bWUiLCJkeS5SZXBlYXRGb3JldmVyLmdldElubmVyQWN0aW9ucyIsImR5LlR3ZWVuIiwiZHkuVHdlZW4uY29uc3RydWN0b3IiLCJkeS5Ud2Vlbi5jcmVhdGUiLCJkeS5Ud2Vlbi51cGRhdGVCb2R5IiwiZHkuVHdlZW4uZnJvbSIsImR5LlR3ZWVuLnRvIiwiZHkuVHdlZW4uaW5pdCIsImR5LlR3ZWVuLnN0YXJ0IiwiZHkuVHdlZW4uc3RvcCIsImR5LlR3ZWVuLmNvcHkiLCJkeS5Ud2Vlbi5yZXZlcnNlIiwiZHkuVHdlZW4uZWFzaW5nIiwiZHkuVHdlZW4uaW50ZXJwb2xhdGlvbiIsImR5LlR3ZWVuLm9uVXBkYXRlIiwiZHkuVHdlZW4ub25GaW5pc2giLCJkeS5Ud2Vlbi5vblN0YXJ0IiwiZHkuVHdlZW4ub25TdG9wIiwiZHkuVHdlZW4uZmluaXNoIiwiZHkuQWN0aW9uTWFuYWdlciIsImR5LkFjdGlvbk1hbmFnZXIuY29uc3RydWN0b3IiLCJkeS5BY3Rpb25NYW5hZ2VyLmNyZWF0ZSIsImR5LkFjdGlvbk1hbmFnZXIuYWRkQ2hpbGQiLCJkeS5BY3Rpb25NYW5hZ2VyLnJlbW92ZUNoaWxkIiwiZHkuQWN0aW9uTWFuYWdlci5oYXNDaGlsZCIsImR5LkFjdGlvbk1hbmFnZXIudXBkYXRlIiwiZHkuUmVuZGVyZXIiLCJkeS5SZW5kZXJlci5jb25zdHJ1Y3RvciIsImR5LlJlbmRlcmVyLnJlbmRlciIsImR5Lk1lc2hSZW5kZXJlciIsImR5Lk1lc2hSZW5kZXJlci5jb25zdHJ1Y3RvciIsImR5Lk1lc2hSZW5kZXJlci5jcmVhdGUiLCJkeS5NZXNoUmVuZGVyZXIucmVuZGVyIiwiZHkuTWVzaFJlbmRlcmVyLl9jb21wdXRlTXZwTWF0cml4IiwiZHkuTWVzaFJlbmRlcmVyLl9hZGREcmF3Q29tbWFuZCIsImR5LkNvbGxpZGVyIiwiZHkuQ29sbGlkZXIuY29uc3RydWN0b3IiLCJkeS5Db2xsaWRlci5jb2xsaWRlWFkiLCJkeS5Db2xsaWRlci5jb2xsaWRlIiwiZHkuVG9wQ29sbGlkZXIiLCJkeS5Ub3BDb2xsaWRlci5jb25zdHJ1Y3RvciIsImR5LlRvcENvbGxpZGVyLmNyZWF0ZSIsImR5LlRvcENvbGxpZGVyLmNvbGxpZGVYWSIsImR5LlRvcENvbGxpZGVyLmNvbGxpZGUiLCJkeS5TY3JpcHQiLCJkeS5TY3JpcHQuY29uc3RydWN0b3IiLCJkeS5TY3JpcHQuY3JlYXRlIiwiZHkuU2NyaXB0LmNyZWF0ZUxvYWRKc1N0cmVhbSIsImR5LlZlY3RvcjMiLCJkeS5WZWN0b3IzLmNvbnN0cnVjdG9yIiwiZHkuVmVjdG9yMy5jcmVhdGUiLCJkeS5WZWN0b3IzLnZhbHVlcyIsImR5LlZlY3RvcjMueCIsImR5LlZlY3RvcjMueSIsImR5LlZlY3RvcjMueiIsImR5LlZlY3RvcjMubm9ybWFsaXplIiwiZHkuVmVjdG9yMy5zY2FsZSIsImR5LlZlY3RvcjMuc2V0IiwiZHkuVmVjdG9yMy5zdWIiLCJkeS5WZWN0b3IzLmFkZCIsImR5LlZlY3RvcjMucmV2ZXJzZSIsImR5LlZlY3RvcjMuY29weSIsImR5LlZlY3RvcjMudG9WZWM0IiwiZHkuVmVjdG9yMy5sZW5ndGgiLCJkeS5WZWN0b3IzLmNyb3NzIiwiZHkuVmVjdG9yNCIsImR5LlZlY3RvcjQuY29uc3RydWN0b3IiLCJkeS5WZWN0b3I0LmNyZWF0ZSIsImR5LlZlY3RvcjQudmFsdWVzIiwiZHkuVmVjdG9yNC5ub3JtYWxpemUiLCJkeS5WZWN0b3I0LnRvVmVjMyIsImR5Lk1hdHJpeCIsImR5Lk1hdHJpeC5jb25zdHJ1Y3RvciIsImR5Lk1hdHJpeC5jcmVhdGUiLCJkeS5NYXRyaXgudmFsdWVzIiwiZHkuTWF0cml4LnB1c2giLCJkeS5NYXRyaXgucG9wIiwiZHkuTWF0cml4LnNldElkZW50aXR5IiwiZHkuTWF0cml4LmludmVydCIsImR5Lk1hdHJpeC50cmFuc3Bvc2UiLCJkeS5NYXRyaXguc2V0VHJhbnNsYXRlIiwiZHkuTWF0cml4LnRyYW5zbGF0ZSIsImR5Lk1hdHJpeC5zZXRSb3RhdGUiLCJkeS5NYXRyaXgucm90YXRlIiwiZHkuTWF0cml4LnNldFNjYWxlIiwiZHkuTWF0cml4LnNjYWxlIiwiZHkuTWF0cml4LnNldExvb2tBdCIsImR5Lk1hdHJpeC5sb29rQXQiLCJkeS5NYXRyaXguc2V0T3J0aG8iLCJkeS5NYXRyaXgub3J0aG8iLCJkeS5NYXRyaXguc2V0UGVyc3BlY3RpdmUiLCJkeS5NYXRyaXgucGVyc3BlY3RpdmUiLCJkeS5NYXRyaXguYXBwbHlNYXRyaXgiLCJkeS5NYXRyaXgubXVsdGlwbHkiLCJkeS5NYXRyaXgubXVsdGlwbHlWZWN0b3I0IiwiZHkuTWF0cml4Lm11bHRpcGx5VmVjdG9yMyIsImR5Lk1hdHJpeC5jb3B5IiwiZHkuTWF0cml4LmdldFgiLCJkeS5NYXRyaXguZ2V0WSIsImR5Lk1hdHJpeC5nZXRaIiwiZHkuTWF0cml4LmdldFRyYW5zbGF0aW9uIiwiZHkuTWF0cml4LmdldFNjYWxlIiwiZHkuTWF0cml4LmdldEV1bGVyQW5nbGVzIiwiZHkuTWF0cml4LnNldFRSUyIsImR5LlF1YXRlcm5pb24iLCJkeS5RdWF0ZXJuaW9uLmNvbnN0cnVjdG9yIiwiZHkuUXVhdGVybmlvbi5jcmVhdGUiLCJkeS5RdWF0ZXJuaW9uLngiLCJkeS5RdWF0ZXJuaW9uLnkiLCJkeS5RdWF0ZXJuaW9uLnoiLCJkeS5RdWF0ZXJuaW9uLnciLCJkeS5RdWF0ZXJuaW9uLnNldEZyb21FdWxlckFuZ2xlcyIsImR5LlF1YXRlcm5pb24ubXVsdGlwbHkiLCJkeS5RdWF0ZXJuaW9uLnNldEZyb21NYXRyaXgiLCJkeS5RdWF0ZXJuaW9uLnNldEZyb21BeGlzQW5nbGUiLCJkeS5RdWF0ZXJuaW9uLmludmVydCIsImR5LlF1YXRlcm5pb24uY29uanVnYXRlIiwiZHkuUXVhdGVybmlvbi5jbG9uZSIsImR5LlF1YXRlcm5pb24uY29weSIsImR5LlF1YXRlcm5pb24ubm9ybWFsaXplIiwiZHkuUXVhdGVybmlvbi5sZW5ndGgiLCJkeS5RdWF0ZXJuaW9uLm11bHRpcGx5VmVjdG9yMyIsImR5LlF1YXRlcm5pb24uc2V0IiwiZHkuUXVhdGVybmlvbi5zdWIiLCJkeS5RdWF0ZXJuaW9uLmdldEV1bGVyQW5nbGVzIiwiZHkuQ29sb3IiLCJkeS5Db2xvci5jb25zdHJ1Y3RvciIsImR5LkNvbG9yLmNyZWF0ZSIsImR5LkNvbG9yLnIiLCJkeS5Db2xvci5nIiwiZHkuQ29sb3IuYiIsImR5LkNvbG9yLmluaXRXaGVuQ3JlYXRlIiwiZHkuQ29sb3IuX3NldENvbG9yIiwiZHkuQ29sb3IuX3NldEhleCIsImR5Lkp1ZGdlVXRpbHMiLCJkeS5KdWRnZVV0aWxzLmNvbnN0cnVjdG9yIiwiZHkuSnVkZ2VVdGlscy5pc1ZpZXciLCJkeS5KdWRnZVV0aWxzLmlzRXF1YWwiLCJkeS5UaW1lQ29udHJvbGxlciIsImR5LlRpbWVDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiZHkuVGltZUNvbnRyb2xsZXIuc3RhcnQiLCJkeS5UaW1lQ29udHJvbGxlci5zdG9wIiwiZHkuVGltZUNvbnRyb2xsZXIucGF1c2UiLCJkeS5UaW1lQ29udHJvbGxlci5yZXN1bWUiLCJkeS5UaW1lQ29udHJvbGxlci5jb21wdXRlRWxhcHNlVGltZSIsImR5LlRpbWVDb250cm9sbGVyLmdldE5vdyIsImR5LkRpcmVjdG9yVGltZUNvbnRyb2xsZXIiLCJkeS5EaXJlY3RvclRpbWVDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiZHkuRGlyZWN0b3JUaW1lQ29udHJvbGxlci5jcmVhdGUiLCJkeS5EaXJlY3RvclRpbWVDb250cm9sbGVyLnRpY2siLCJkeS5EaXJlY3RvclRpbWVDb250cm9sbGVyLnN0YXJ0IiwiZHkuRGlyZWN0b3JUaW1lQ29udHJvbGxlci5yZXN1bWUiLCJkeS5EaXJlY3RvclRpbWVDb250cm9sbGVyLmdldE5vdyIsImR5LkRpcmVjdG9yVGltZUNvbnRyb2xsZXIuX3VwZGF0ZUZwcyIsImR5LkNvbW1vblRpbWVDb250cm9sbGVyIiwiZHkuQ29tbW9uVGltZUNvbnRyb2xsZXIuY29uc3RydWN0b3IiLCJkeS5Db21tb25UaW1lQ29udHJvbGxlci5jcmVhdGUiLCJkeS5Db21tb25UaW1lQ29udHJvbGxlci5nZXROb3ciLCJkeS5yZW5kZXIiLCJkeS5yZW5kZXIuUmVuZGVyZXIiLCJkeS5yZW5kZXIuUmVuZGVyZXIuY29uc3RydWN0b3IiLCJkeS5yZW5kZXIuUmVuZGVyZXIuY3JlYXRlUXVhZENvbW1hbmQiLCJkeS5yZW5kZXIuUmVuZGVyZXIuYWRkQ29tbWFuZCIsImR5LnJlbmRlci5SZW5kZXJlci5yZW5kZXIiLCJkeS5yZW5kZXIuUmVuZGVyZXIuaW5pdCIsImR5LnJlbmRlci5XZWJHTFJlbmRlcmVyIiwiZHkucmVuZGVyLldlYkdMUmVuZGVyZXIuY29uc3RydWN0b3IiLCJkeS5yZW5kZXIuV2ViR0xSZW5kZXJlci5jcmVhdGUiLCJkeS5yZW5kZXIuV2ViR0xSZW5kZXJlci5jcmVhdGVRdWFkQ29tbWFuZCIsImR5LnJlbmRlci5XZWJHTFJlbmRlcmVyLmFkZENvbW1hbmQiLCJkeS5yZW5kZXIuV2ViR0xSZW5kZXJlci5yZW5kZXIiLCJkeS5yZW5kZXIuV2ViR0xSZW5kZXJlci5pbml0IiwiZHkucmVuZGVyLldlYkdMUmVuZGVyZXIuc2V0Q2xlYXJDb2xvciIsImR5LnJlbmRlci5XZWJHTFJlbmRlcmVyLl9jbGVhckNvbW1hbmQiLCJkeS5yZW5kZXIuU2hhZGVyIiwiZHkucmVuZGVyLlNoYWRlci5jb25zdHJ1Y3RvciIsImR5LnJlbmRlci5TaGFkZXIuY3JlYXRlIiwiZHkucmVuZGVyLlNoYWRlci52c1NvdXJjZSIsImR5LnJlbmRlci5TaGFkZXIuZnNTb3VyY2UiLCJkeS5yZW5kZXIuU2hhZGVyLmNyZWF0ZVZzU2hhZGVyIiwiZHkucmVuZGVyLlNoYWRlci5jcmVhdGVGc1NoYWRlciIsImR5LnJlbmRlci5TaGFkZXIuaXNFcXVhbCIsImR5LnJlbmRlci5TaGFkZXIuX2luaXRTaGFkZXIiLCJkeS5yZW5kZXIuQnVmZmVyVHlwZSIsImR5LnJlbmRlci5BdHRyaWJ1dGVEYXRhVHlwZSIsImR5LnJlbmRlci5EcmF3TW9kZSIsImR5LnJlbmRlci5CdWZmZXIiLCJkeS5yZW5kZXIuQnVmZmVyLmNvbnN0cnVjdG9yIiwiZHkucmVuZGVyLkJ1ZmZlci5idWZmZXIiLCJkeS5yZW5kZXIuQnVmZmVyLnR5cGUiLCJkeS5yZW5kZXIuQnVmZmVyLm51bSIsImR5LnJlbmRlci5FbGVtZW50QnVmZmVyIiwiZHkucmVuZGVyLkVsZW1lbnRCdWZmZXIuY29uc3RydWN0b3IiLCJkeS5yZW5kZXIuRWxlbWVudEJ1ZmZlci5jcmVhdGUiLCJkeS5yZW5kZXIuRWxlbWVudEJ1ZmZlci50eXBlU2l6ZSIsImR5LnJlbmRlci5FbGVtZW50QnVmZmVyLmluaXRXaGVuQ3JlYXRlIiwiZHkucmVuZGVyLkVsZW1lbnRCdWZmZXIuX2NoZWNrRGF0YVR5cGUiLCJkeS5yZW5kZXIuRWxlbWVudEJ1ZmZlci5fZ2V0SW5mbyIsImR5LnJlbmRlci5BcnJheUJ1ZmZlciIsImR5LnJlbmRlci5BcnJheUJ1ZmZlci5jb25zdHJ1Y3RvciIsImR5LnJlbmRlci5BcnJheUJ1ZmZlci5jcmVhdGUiLCJkeS5yZW5kZXIuQXJyYXlCdWZmZXIuY291bnQiLCJkeS5yZW5kZXIuQXJyYXlCdWZmZXIuaW5pdFdoZW5DcmVhdGUiLCJkeS5yZW5kZXIuVW5pZm9ybURhdGFUeXBlIiwiZHkucmVuZGVyLlByb2dyYW0iLCJkeS5yZW5kZXIuUHJvZ3JhbS5jb25zdHJ1Y3RvciIsImR5LnJlbmRlci5Qcm9ncmFtLmNyZWF0ZSIsImR5LnJlbmRlci5Qcm9ncmFtLnVzZSIsImR5LnJlbmRlci5Qcm9ncmFtLnNldFVuaWZvcm1EYXRhIiwiZHkucmVuZGVyLlByb2dyYW0uc2V0QXR0cmlidXRlRGF0YSIsImR5LnJlbmRlci5Qcm9ncmFtLmluaXRXaXRoU2hhZGVyIiwiZHkucmVuZGVyLlByb2dyYW0uaXNDaGFuZ2VTaGFkZXIiLCJkeS5yZW5kZXIuUXVhZENvbW1hbmQiLCJkeS5yZW5kZXIuUXVhZENvbW1hbmQuY29uc3RydWN0b3IiLCJkeS5yZW5kZXIuUXVhZENvbW1hbmQuY3JlYXRlIiwiZHkucmVuZGVyLlF1YWRDb21tYW5kLmJ1ZmZlcnMiLCJkeS5yZW5kZXIuUXVhZENvbW1hbmQuY29sb3IiLCJkeS5yZW5kZXIuUXVhZENvbW1hbmQuc2hhZGVyIiwiZHkucmVuZGVyLlF1YWRDb21tYW5kLm12cE1hdHJpeCIsImR5LnJlbmRlci5RdWFkQ29tbWFuZC5kcmF3TW9kZSIsImR5LnJlbmRlci5RdWFkQ29tbWFuZC5leGVjdXRlIiwiZHkucmVuZGVyLlF1YWRDb21tYW5kLmluaXQiLCJkeS5yZW5kZXIuUXVhZENvbW1hbmQuX3NlbmREYXRhIiwiZHkucmVuZGVyLlF1YWRDb21tYW5kLl9kcmF3IiwiZHkuTWF0ZXJpYWwiLCJkeS5NYXRlcmlhbC5jb25zdHJ1Y3RvciIsImR5Lk1hdGVyaWFsLmNyZWF0ZSIsImR5Lk1hdGVyaWFsLmNvbG9yIiwiZHkuTWF0ZXJpYWwuc2hhZGVyIiwiZHkuTG9hZGVyIiwiZHkuTG9hZGVyLmNvbnN0cnVjdG9yIiwiZHkuTG9hZGVyLmxvYWQiLCJkeS5Mb2FkZXIuZ2V0IiwiZHkuTG9hZGVyLmhhcyIsImR5LkxvYWRlci5sb2FkQXNzZXQiLCJkeS5Mb2FkZXIuX2Vycm9ySGFuZGxlIiwiZHkuR0xTTExvYWRlciIsImR5LkdMU0xMb2FkZXIuY29uc3RydWN0b3IiLCJkeS5HTFNMTG9hZGVyLmdldEluc3RhbmNlIiwiZHkuR0xTTExvYWRlci5sb2FkQXNzZXQiLCJkeS5Kc0xvYWRlciIsImR5LkpzTG9hZGVyLmNvbnN0cnVjdG9yIiwiZHkuSnNMb2FkZXIuZ2V0SW5zdGFuY2UiLCJkeS5Kc0xvYWRlci5sb2FkQXNzZXQiLCJkeS5Kc0xvYWRlci5fY3JlYXRlU2NyaXB0IiwiZHkuSnNMb2FkZXIuX2FwcGVuZFNjcmlwdCIsImR5LkxvYWRlck1hbmFnZXIiLCJkeS5Mb2FkZXJNYW5hZ2VyLmNvbnN0cnVjdG9yIiwiZHkuTG9hZGVyTWFuYWdlci5nZXRJbnN0YW5jZSIsImR5LkxvYWRlck1hbmFnZXIubG9hZCIsImR5LkxvYWRlck1hbmFnZXIucmVzZXQiLCJkeS5Mb2FkZXJNYW5hZ2VyLl9jcmVhdGVMb2FkQXNzZXRTdHJlYW0iLCJkeS5Mb2FkZXJNYW5hZ2VyLl9jcmVhdGVMb2FkU3RyZWFtIiwiZHkuTG9hZGVyTWFuYWdlci5fZ2V0TG9hZGVyIiwiZHkuTG9hZGVyRmFjdG9yeSIsImR5LkxvYWRlckZhY3RvcnkuY29uc3RydWN0b3IiLCJkeS5Mb2FkZXJGYWN0b3J5LmNyZWF0ZSIsImR5LkV2ZW50TGlzdGVuZXJNYXAiLCJkeS5FdmVudExpc3RlbmVyTWFwLmNvbnN0cnVjdG9yIiwiZHkuRXZlbnRMaXN0ZW5lck1hcC5jcmVhdGUiLCJkeS5FdmVudExpc3RlbmVyTWFwLmFwcGVuZENoaWxkIiwiZHkuRXZlbnRMaXN0ZW5lck1hcC5nZXRDaGlsZCIsImR5LkV2ZW50TGlzdGVuZXJNYXAuaGFzQ2hpbGQiLCJkeS5FdmVudExpc3RlbmVyTWFwLmZpbHRlciIsImR5LkV2ZW50TGlzdGVuZXJNYXAuZm9yRWFjaCIsImR5LkV2ZW50TGlzdGVuZXJNYXAucmVtb3ZlQ2hpbGQiLCJkeS5FdmVudExpc3RlbmVyTWFwLmdldEV2ZW50T2ZmRGF0YUxpc3QiLCJkeS5FdmVudExpc3RlbmVyTWFwLmdldEV2ZW50TmFtZUZyb21LZXkiLCJkeS5FdmVudExpc3RlbmVyTWFwLmdldFVpZEZyb21LZXkiLCJkeS5FdmVudExpc3RlbmVyTWFwLmlzVGFyZ2V0IiwiZHkuRXZlbnRMaXN0ZW5lck1hcC5fYnVpbGRLZXkiLCJkeS5FdmVudExpc3RlbmVyTWFwLl9idWlsZEtleVdpdGhVaWQiLCJkeS5FdmVudFR5cGUiLCJkeS5FdmVudE5hbWUiLCJkeS5FdmVudFBoYXNlIiwiZHkuRXZlbnRUYWJsZSIsImR5LkV2ZW50VGFibGUuY29uc3RydWN0b3IiLCJkeS5FdmVudFRhYmxlLmdldEV2ZW50VHlwZSIsImR5LkV2ZW50IiwiZHkuRXZlbnQuY29uc3RydWN0b3IiLCJkeS5FdmVudC50eXBlIiwiZHkuRXZlbnQubmFtZSIsImR5LkV2ZW50LnRhcmdldCIsImR5LkV2ZW50LmN1cnJlbnRUYXJnZXQiLCJkeS5FdmVudC5pc1N0b3BQcm9wYWdhdGlvbiIsImR5LkV2ZW50LnBoYXNlIiwiZHkuRXZlbnQuY29weSIsImR5LkV2ZW50LnN0b3BQcm9wYWdhdGlvbiIsImR5LkV2ZW50LmNvcHlNZW1iZXIiLCJkeS5Nb3VzZUV2ZW50IiwiZHkuTW91c2VFdmVudC5jb25zdHJ1Y3RvciIsImR5Lk1vdXNlRXZlbnQuY3JlYXRlIiwiZHkuTW91c2VFdmVudC5ldmVudCIsImR5Lk1vdXNlRXZlbnQubG9jYXRpb24iLCJkeS5Nb3VzZUV2ZW50LmxvY2F0aW9uSW5WaWV3IiwiZHkuTW91c2VFdmVudC5idXR0b24iLCJkeS5Nb3VzZUV2ZW50LmNvcHkiLCJkeS5LZXlib2FyZEV2ZW50IiwiZHkuS2V5Ym9hcmRFdmVudC5jb25zdHJ1Y3RvciIsImR5LktleWJvYXJkRXZlbnQuY3JlYXRlIiwiZHkuS2V5Ym9hcmRFdmVudC5ldmVudCIsImR5LktleWJvYXJkRXZlbnQuY3RybEtleSIsImR5LktleWJvYXJkRXZlbnQuYWx0S2V5IiwiZHkuS2V5Ym9hcmRFdmVudC5zaGlmdEtleSIsImR5LktleWJvYXJkRXZlbnQubWV0YUtleSIsImR5LktleWJvYXJkRXZlbnQua2V5Q29kZSIsImR5LktleWJvYXJkRXZlbnQua2V5IiwiZHkuS2V5Ym9hcmRFdmVudC5jb3B5IiwiZHkuQ3VzdG9tRXZlbnQiLCJkeS5DdXN0b21FdmVudC5jb25zdHJ1Y3RvciIsImR5LkN1c3RvbUV2ZW50LmNyZWF0ZSIsImR5LkN1c3RvbUV2ZW50LnVzZXJEYXRhIiwiZHkuQ3VzdG9tRXZlbnQuY29weVB1YmxpY0F0dHJpIiwiZHkuQ3VzdG9tRXZlbnQuY29weSIsImR5Lk1vdXNlQnV0dG9uIiwiZHkuRXZlbnRMaXN0ZW5lciIsImR5LkV2ZW50TGlzdGVuZXIuY29uc3RydWN0b3IiLCJkeS5FdmVudExpc3RlbmVyLmNyZWF0ZSIsImR5LkV2ZW50TGlzdGVuZXIuZXZlbnRUeXBlIiwiZHkuRXZlbnRMaXN0ZW5lci5wcmlvcml0eSIsImR5LkV2ZW50TGlzdGVuZXIuaGFuZGxlckRhdGFMaXN0IiwiZHkuRXZlbnRMaXN0ZW5lci5pbml0V2hlbkNyZWF0ZSIsImR5LkV2ZW50TGlzdGVuZXIuX3NldEhhbmRsZXJEYXRhTGlzdCIsImR5LkV2ZW50TGlzdGVuZXIuX3BhcnNlRXZlbnROYW1lIiwiZHkuRXZlbnRIYW5kbGVyIiwiZHkuRXZlbnRIYW5kbGVyLmNvbnN0cnVjdG9yIiwiZHkuRXZlbnRIYW5kbGVyLm9uIiwiZHkuRXZlbnRIYW5kbGVyLm9mZiIsImR5LkV2ZW50SGFuZGxlci50cmlnZ2VyIiwiZHkuRG9tRXZlbnRIYW5kbGVyIiwiZHkuRG9tRXZlbnRIYW5kbGVyLmNvbnN0cnVjdG9yIiwiZHkuRG9tRXZlbnRIYW5kbGVyLm9mZiIsImR5LkRvbUV2ZW50SGFuZGxlci5nZXREb20iLCJkeS5Eb21FdmVudEhhbmRsZXIuYnVpbGRXcmFwSGFuZGxlciIsImR5LkRvbUV2ZW50SGFuZGxlci5oYW5kbGVyIiwiZHkuRG9tRXZlbnRIYW5kbGVyLl9iaW5kIiwiZHkuRG9tRXZlbnRIYW5kbGVyLl91bkJpbmQiLCJkeS5Nb3VzZUV2ZW50SGFuZGxlciIsImR5Lk1vdXNlRXZlbnRIYW5kbGVyLmNvbnN0cnVjdG9yIiwiZHkuTW91c2VFdmVudEhhbmRsZXIuZ2V0SW5zdGFuY2UiLCJkeS5Nb3VzZUV2ZW50SGFuZGxlci5vbiIsImR5Lk1vdXNlRXZlbnRIYW5kbGVyLnRyaWdnZXIiLCJkeS5Nb3VzZUV2ZW50SGFuZGxlci5nZXREb20iLCJkeS5Nb3VzZUV2ZW50SGFuZGxlci5idWlsZFdyYXBIYW5kbGVyIiwiZHkuTW91c2VFdmVudEhhbmRsZXIuX2lzVHJpZ2dlciIsImR5Lk1vdXNlRXZlbnRIYW5kbGVyLl9jcmVhdGVFdmVudE9iamVjdCIsImR5LktleWJvYXJkRXZlbnRIYW5kbGVyIiwiZHkuS2V5Ym9hcmRFdmVudEhhbmRsZXIuY29uc3RydWN0b3IiLCJkeS5LZXlib2FyZEV2ZW50SGFuZGxlci5nZXRJbnN0YW5jZSIsImR5LktleWJvYXJkRXZlbnRIYW5kbGVyLm9uIiwiZHkuS2V5Ym9hcmRFdmVudEhhbmRsZXIudHJpZ2dlciIsImR5LktleWJvYXJkRXZlbnRIYW5kbGVyLmdldERvbSIsImR5LktleWJvYXJkRXZlbnRIYW5kbGVyLmJ1aWxkV3JhcEhhbmRsZXIiLCJkeS5LZXlib2FyZEV2ZW50SGFuZGxlci5faXNUcmlnZ2VyIiwiZHkuS2V5Ym9hcmRFdmVudEhhbmRsZXIuX2NyZWF0ZUV2ZW50T2JqZWN0IiwiZHkuQ3VzdG9tRXZlbnRIYW5kbGVyIiwiZHkuQ3VzdG9tRXZlbnRIYW5kbGVyLmNvbnN0cnVjdG9yIiwiZHkuQ3VzdG9tRXZlbnRIYW5kbGVyLmdldEluc3RhbmNlIiwiZHkuQ3VzdG9tRXZlbnRIYW5kbGVyLm9uIiwiZHkuQ3VzdG9tRXZlbnRIYW5kbGVyLm9mZiIsImR5LkN1c3RvbUV2ZW50SGFuZGxlci50cmlnZ2VyIiwiZHkuQ3VzdG9tRXZlbnRIYW5kbGVyLl90cmlnZ2VyRXZlbnRIYW5kbGVyIiwiZHkuQ3VzdG9tRXZlbnRIYW5kbGVyLl90cmlnZ2VyVGFyZ2V0QW5kRXZlbnRIYW5kbGVyIiwiZHkuQ3VzdG9tRXZlbnRIYW5kbGVyLl9zZXRVc2VyRGF0YSIsImR5LkV2ZW50RGlzcGF0Y2hlciIsImR5LkV2ZW50RGlzcGF0Y2hlci5jb25zdHJ1Y3RvciIsImR5LkV2ZW50RGlzcGF0Y2hlci5jcmVhdGUiLCJkeS5FdmVudERpc3BhdGNoZXIudHJpZ2dlciIsImR5LkV2ZW50RGlzcGF0Y2hlci5lbWl0IiwiZHkuRXZlbnREaXNwYXRjaGVyLmJyb2FkY2FzdCIsImR5LkV2ZW50RGlzcGF0Y2hlci5icm9hZGNhc3QuaXRlcmF0b3IiLCJkeS5FdmVudERpc3BhdGNoZXIuX2dldFBhcmVudCIsImR5LkV2ZW50RGlzcGF0Y2hlci5fdHJpZ2dlcldpdGhVc2VyRGF0YSIsImR5LkV2ZW50UmVnaXN0ZXIiLCJkeS5FdmVudFJlZ2lzdGVyLmNvbnN0cnVjdG9yIiwiZHkuRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSIsImR5LkV2ZW50UmVnaXN0ZXIucmVnaXN0ZXIiLCJkeS5FdmVudFJlZ2lzdGVyLnJlbW92ZSIsImR5LkV2ZW50UmVnaXN0ZXIuZ2V0RXZlbnRSZWdpc3RlckRhdGFMaXN0IiwiZHkuRXZlbnRSZWdpc3Rlci5zZXRCdWJibGVQYXJlbnQiLCJkeS5FdmVudFJlZ2lzdGVyLmlzQmluZGVkIiwiZHkuRXZlbnRSZWdpc3Rlci5maWx0ZXIiLCJkeS5FdmVudFJlZ2lzdGVyLmZvckVhY2giLCJkeS5FdmVudFJlZ2lzdGVyLmdldENoaWxkIiwiZHkuRXZlbnRSZWdpc3Rlci5nZXRFdmVudE5hbWVGcm9tS2V5IiwiZHkuRXZlbnRSZWdpc3Rlci5nZXRVaWRGcm9tS2V5IiwiZHkuRXZlbnRSZWdpc3Rlci5nZXRXcmFwSGFuZGxlciIsImR5LkV2ZW50UmVnaXN0ZXIuaXNUYXJnZXQiLCJkeS5FdmVudFJlZ2lzdGVyLl9pc0FsbEV2ZW50SGFuZGxlclJlbW92ZWQiLCJkeS5FdmVudFJlZ2lzdGVyLl9oYW5kbGVBZnRlckFsbEV2ZW50SGFuZGxlclJlbW92ZWQiLCJkeS5FdmVudEJpbmRlciIsImR5LkV2ZW50QmluZGVyLmNvbnN0cnVjdG9yIiwiZHkuRXZlbnRCaW5kZXIuY3JlYXRlIiwiZHkuRXZlbnRCaW5kZXIub24iLCJkeS5FdmVudEJpbmRlci5vZmYiLCJkeS5GYWN0b3J5RXZlbnRIYW5kbGVyIiwiZHkuRmFjdG9yeUV2ZW50SGFuZGxlci5jb25zdHJ1Y3RvciIsImR5LkZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyIiwiZHkuRXZlbnRNYW5hZ2VyIiwiZHkuRXZlbnRNYW5hZ2VyLmNvbnN0cnVjdG9yIiwiZHkuRXZlbnRNYW5hZ2VyLm9uIiwiZHkuRXZlbnRNYW5hZ2VyLm9mZiIsImR5LkV2ZW50TWFuYWdlci50cmlnZ2VyIiwiZHkuRXZlbnRNYW5hZ2VyLmJyb2FkY2FzdCIsImR5LkV2ZW50TWFuYWdlci5lbWl0IiwiZHkuRXZlbnRNYW5hZ2VyLmZyb21FdmVudCIsImR5LkV2ZW50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UyxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDdkJBLElBQUlBLE1BQUlBLEdBQUdBLElBQUlBLENBQUNBO2dCQUVoQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsWUFBZ0JBLEVBQUVBLFVBQWlCQTtvQkFDeERBLE1BQUlBLENBQUNBLE1BQU1BLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUM1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDUEEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzdCQSxJQUFJQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFMURBLFlBQVlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBQzFCQSxDQUFDQTtRQUNMQSxDQUFDQTtRQUVNVCx5QkFBS0EsR0FBWkEsVUFBYUEsVUFBa0JBO1lBQzNCVSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDdkJBLElBQUlBLE1BQUlBLEdBQUdBLElBQUlBLENBQUNBO2dCQUVoQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsWUFBZ0JBLEVBQUVBLFVBQWlCQTtvQkFDeERBLE1BQUlBLENBQUNBLEtBQUtBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUMzQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDUEEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzVC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QUdBLEtBQUtBLEdBQUdBLENBQUNBLEVBQ2pCQSxFQUFFQSxHQUFHQSxNQUFNQSxHQUFHQSxDQUFDQSxFQUNmQSxJQUFJQSxHQUFHQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxFQUNsQkEsS0FBS0EsR0FBR0EsS0FBS0EsR0FBR0EsQ0FBQ0EsRUFDakJBLElBQUlBLEdBQUdBLENBQUNBLEtBQUtBLEdBQUVBLENBQUNBLENBQUNBO1lBRXJCQSxNQUFNQSxDQUFDQSxTQUFNQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxJQUFJQSxZQUFZQSxDQUFDQTtnQkFDMUNBLEtBQUtBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUdBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBLEVBQUdBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBO2dCQUMxRUEsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsS0FBS0EsRUFBR0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBR0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBR0EsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsSUFBSUE7Z0JBQzNFQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFHQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFHQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFHQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxLQUFLQTtnQkFDckVBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUdBLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUdBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUdBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLEtBQUtBO2dCQUN2RUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBR0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsSUFBSUEsRUFBR0EsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBR0EsSUFBSUEsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0E7Z0JBQzdFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFHQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUFHQSxJQUFJQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFHQSxLQUFLQSxFQUFFQSxFQUFFQSxFQUFFQSxJQUFJQTthQUMxRUEsQ0FBQ0EsRUFDRkEsQ0FBQ0EsRUFBRUEsU0FBTUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQUE7UUFDbkNBLENBQUNBO1FBRVNOLDBDQUFvQkEsR0FBOUJBO1lBQ0lPLE1BQU1BLENBQUNBLFNBQU1BLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLFdBQVdBLENBQUNBO2dCQUMvQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7Z0JBQ2xCQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtnQkFDbEJBLENBQUNBLEVBQUVBLENBQUNBLEVBQUNBLEVBQUVBLEVBQUlBLENBQUNBLEVBQUNBLEVBQUVBLEVBQUNBLEVBQUVBO2dCQUNsQkEsRUFBRUEsRUFBQ0EsRUFBRUEsRUFBQ0EsRUFBRUEsRUFBR0EsRUFBRUEsRUFBQ0EsRUFBRUEsRUFBQ0EsRUFBRUE7Z0JBQ25CQSxFQUFFQSxFQUFDQSxFQUFFQSxFQUFDQSxFQUFFQSxFQUFHQSxFQUFFQSxFQUFDQSxFQUFFQSxFQUFDQSxFQUFFQTtnQkFDbkJBLEVBQUVBLEVBQUNBLEVBQUVBLEVBQUNBLEVBQUVBLEVBQUdBLEVBQUVBLEVBQUNBLEVBQUVBLEVBQUNBLEVBQUVBO2FBQ3RCQSxDQUFDQSxFQUFFQSxTQUFNQSxDQUFDQSxVQUFVQSxDQUFD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QyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDZCxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNOLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNkLENBQUM7b0JBQ0QsSUFBSTt3QkFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUUsQ0FBQztvQkFDaEQsTUFBTSxDQUFDLENBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFFLEdBQUcsQ0FBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDO2dCQUV4RixDQUFDO2dCQUVEQSxLQUFLQSxFQUFFQSxVQUFVQSxDQUFDQTtvQkFFZCxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7b0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDZCxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNOLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNkLENBQUM7b0JBQ0QsSUFBSTt3QkFBQyxDQUFDLEdB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QUMsR0FBRyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztvQkFDbkUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQztvQkFFOUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFFakcsQ0FBQztZQUVMLENBQUM7WUFFREEsS0FBS0EsRUFBRUE7Z0JBRUhBLE1BQU1BLEVBQUVBLFVBQVVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLENBQUNBO29CQUV2QixNQUFNLENBQUMsQ0FBRSxFQUFF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QUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1lBQ3JCQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUNiQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUMxQ0EsQ0FBQ0E7WUFFRkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ1JBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1lBQ2hCQSxDQUFDQTtZQUVEQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNoQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDaEJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRWhCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTVAsdUJBQUtBLEdBQVpBLFVBQWFBLE1BQWFBO1lBQ3RCUSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUVyQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0E7WUFDZkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0E7WUFDZkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsTUFBTUEsQ0FBQ0E7WUFFZkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBRU1SLHFCQUFHQSxHQUFWQSxVQUFXQSxDQUFRQSxFQUFFQSxDQUFRQSxFQUFFQSxDQUFRQTtZQUNuQ1MsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDWEEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDWEEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7UUFDZkEsQ0FBQ0E7UUFFTVQscUJBQUdBLEdBQVZBLFVBQVdBLENBQVNBO1lBQ2hCVSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaERBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWhEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTVYscUJBQUdBLEdBQVZBLFVBQVdBLENBQVNBO1lBQ2hCVyxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoREEsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaERBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRWhEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTVgseUJBQU9BLEdBQWRBO1lBQ0lZLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ25DQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNuQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFbkNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVNWixzQkFBSUEsR0FBWEE7WUFDSWEsSUFBSUEsTUFBTUEsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsRUFBRUEsRUFDekJBLENBQUNBLEdBQUdBLENBQUNBLEVBQ0xBLEdBQUdBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBO1lBRTlCQSxHQUFHQSxDQUFBQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFDQSxDQUFDQTtnQkFDckJBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3ZDQSxDQUFDQTtZQUVEQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQTtRQUNsQkEsQ0FBQ0E7UUFFTWIsd0JBQU1BLEdBQWJBO1lBQ0ljLE1BQU1BLENBQUNBLFVBQU9BLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO1FBQ2xGQSxDQUFDQTtRQUVNZCx3QkFBTUEsR0FBYkE7WUFDSWUsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFFckJBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1FBQzlEQSxDQUFDQTtRQWVNZix1QkFBS0EsR0FBWkEsVUFBYUEsR0FBR0EsRUFBRUEsR0FBR0E7WUFDakJnQixJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtZQUVwQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDZkEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDZkEsQ0FBQ0EsR0FBR0EsSUFB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LENBQUNBLENBQUNBO1lBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQy9DQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFPTU4sdUJBQU1BLEdBQWJBO1lBQ0lPLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBO1lBRXRCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNqQkEsR0FBR0EsR0FBR0EsSUFBSUEsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDM0JBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1lBRWpCQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDN0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzlEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDN0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzlEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDN0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzdEQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDN0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRTdEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDN0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzlEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDN0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzlEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDN0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzdEQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDN0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRTdEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDM0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDM0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNEQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDM0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNEQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDM0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRTNEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDekRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pEQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDekRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pEQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDekRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3pEQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQTtrQkFDekRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRXpEQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUM3REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1pBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1lBQ2hCQSxDQUFDQTtZQUVEQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUNkQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxDQUFDQTtnQkFDdEJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ3hCQSxDQUFDQTtZQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFNTVAsMEJBQVNBLEdBQWhCQTtZQUNJUSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUVUQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUVqQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdENBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN0Q0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDdENBLENBQUNBLEdBQUdBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3RDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUV0Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBU01SLDZCQUFZQSxHQUFuQkEsVUFBcUJBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBO1lBQ3hCUyxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUNyQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUlBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQVNNVCwwQkFBU0EsR0FBaEJBLFVBQWtCQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNyQlUsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFeERBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQVdNViwwQkFBU0EsR0FBaEJBLFVBQWtCQSxLQUFhQSxFQUFFQSxDQUFTQSxFQUFFQSxDQUFTQSxFQUFFQSxDQUFRQTtZQUMzRFcsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7WUFFbkRBLElBQUlBLEtBQUtBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEtBQUtBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ2xDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUVqQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7WUFDcEJBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1lBRXBCQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFaENBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNSQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsQ0FBQ0E7Z0JBQ0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFdkNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNSQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsQ0FBQ0E7Z0JBQ0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFdkNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNSQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDWEEsQ0FBQ0E7Z0JBQ0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2hEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFFSkEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pDQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFFWkEsSUFBSUEsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7b0JBQ2ZBLENBQUNBLElBQUlBLElBQUlBLENBQUNBO29CQUNWQSxDQUFDQSxJQUFJQSxJQUFJQSxDQUFDQTtvQkFDVkEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0E7Z0JBQ2RBLENBQUNBO2dCQUVEQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDWEEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNYQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDWEEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1hBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNYQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFWEEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsR0FBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRVZBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsR0FBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUVWQSxDQUFDQSxDQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDcEJBLENBQUNBLENBQUVBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO2dCQUNwQkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBQ0EsQ0FBQ0EsR0FBQ0EsRUFBRUEsR0FBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFFVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNWQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDZEEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBY01YLHVCQUFNQSxHQUFiQSxVQUFlQSxJQUFJQTtZQUNmWSxJQUFJQSxLQUFLQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUV6QkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ3ZCQSxJQUFJQSxPQUFPQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFM0JBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLEVBQUVBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLE9BQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2hIQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDNUJBLElBQUlBLENBQUNBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ2hCQSxDQUFDQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNoQkEsQ0FBQ0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRXJCQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNoRUEsQ0FBQ0E7WUFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBU01aLHlCQUFRQSxHQUFmQSxVQUFpQkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDcEJhLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1lBQ3JCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUM1Q0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFBRUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDNUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQUVBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUM1Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBU01iLHNCQUFLQSxHQUFaQSxVQUFjQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNqQmMsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFcERBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQW1HTWQsMEJBQVNBLEdBQWhCQSxVQUFpQkEsSUFBSUE7WUFDckJlLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEVBQ1BBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLEVBQUVBLENBQUNBO1lBRXBCQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDdkJBLEdBQUdBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNuQkEsTUFBTUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxFQUFFQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFBQTtZQUNyQkEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzVCQSxHQUFHQSxHQUFHQSxVQUFPQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDL0RBLE1BQU1BLEdBQUdBLFVBQU9BLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNsRUEsRUFBRUEsR0FBR0EsVUFBT0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDbEVBLENBQUNBO1lBQ0RBLENBQUNBLEdBQUdBLFVBQU9BLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBRWpCQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxTQUFTQSxFQUFFQSxDQUFDQTtZQUV2Q0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7WUFDMUJBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBO1lBQzFCQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVkQSxJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUVyQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDWkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZEEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZEEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZEEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFVkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBWU1mLHVCQUFNQSxHQUFiQSxVQUFlQSxJQUFJQTtZQUNmZ0IsSUFBSUEsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFFN0JBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLE1BQU1BLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLE1BQU1BLEVBQUVBLEtBQUtBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLFNBQVNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBRTNGQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFHTWhCLHlCQUFRQSxHQUFmQSxVQUFpQkEsSUFBSUEsRUFBRUEsR0FBR0E7WUFDdEJpQixJQUFJQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtZQUVyQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3BDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUVWQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTWpCLHNCQUFLQSxHQUFaQSxVQUFjQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNka0IsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFakRBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQVVNbEIsK0JBQWNBLEdBQXJCQSxVQUF1QkEsSUFBWUEsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0E7WUFDbERtQixJQUFJQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUNaQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxHQUFHQSxFQUNkQSxJQUFJQSxHQUFHQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQTtZQUVwQkEsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsTUFBTUEsS0FBS0EsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxTQUFTQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsRkEsR0FBR0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsRUFBRUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDcERBLEdBQUdBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLEtBQUtBLEVBQUVBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBO1lBRWxEQSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxJQUFJQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNwQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDbkJBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNWQSxHQUFHQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLENBQUNBLFNBQVNBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO1lBQ2pFQSxDQUFDQTtZQUVEQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQTtZQUN0QkEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFeEJBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBO1lBRWpCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFJQSxFQUFFQSxHQUFHQSxNQUFNQSxDQUFDQTtZQUNwQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFFVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsRUFBRUEsQ0FBQ0E7WUFDWEEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7WUFDVkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBSUEsQ0FBQ0EsQ0FBQ0E7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QSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNsREEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsRUFDcERBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQ3REQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNsREEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDbERBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEVBQ3BEQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUUzREEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDMUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMxQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDMUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMxQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDMUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMxQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDMUNBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzNDQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMzQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDM0NBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQzNDQSxNQUFNQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUMzQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFM0NBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQUVNdEIsZ0NBQWVBLEdBQXRCQSxVQUF1QkEsTUFBY0E7WUFDakN1QixJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUNuQkEsSUFBSUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFDekJBLElBQUlBLE1BQU1BLEdBQUdBLEVBQUVBLENBQUNBO1lBRWhCQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUMzRkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDM0ZBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzVGQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxJQUFJ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Q0FBQ0EsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3pDQSxDQUFDQTtnQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBRUpBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO29CQUNOQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDMUNBLENBQUNBO1lBQ0xBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUVKQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDTkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDekNBLENBQUNBO1lBRURBLE1BQU1BLENBQUNBLFVBQU9BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLEtBQUtBLENBQUNBLGFBQVVBLENBQUNBLENBQUNBO1FBQ3JEQSxDQUFDQTtRQW1CTS9CLHVCQUFNQSxHQUFiQSxVQUFjQSxDQUFTQSxFQUFFQSxDQUFZQSxFQUFFQSxDQUFTQTtZQUM1Q2dDLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQUVBLEVBQ3RDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUV0REEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFVEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFVEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDVEEsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFVEEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFFYkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7WUFFakJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQzVCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUN0QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDdEJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRVRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ3RCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUM1QkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDdEJBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBRVRBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ3RCQSxDQUFD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QUlBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBRWxCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUN0Q0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0E7WUFDdENBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLENBQUNBO1lBQ3RDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQTtZQUV0Q0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBS01QLDZCQUFRQSxHQUFmQSxVQUFnQkEsSUFBSUE7WUFDaEJRLElBQUlBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQ3RDQSxJQUFJQSxFQUFFQSxJQUFJQSxFQUNWQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQTtZQUVsQkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ3ZCQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtnQkFDWkEsSUFBSUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDeEJBLENBQUNBO1lBQ0RBLElBQUlBLENBQUNBLEVBQUVBLENBQUFBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLENBQUNBLENBQUFBLENBQUNBO2dCQUM1QkEsSUFBSUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BCQSxJQUFJQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN4QkEsQ0FBQ0E7WUFFREEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDYkEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDYkEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDYkEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFYkEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDYkEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDYkEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDYkEsR0FBR0EsR0FBR0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFFYkEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFDekRBLE1BQU1BLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ3pEQSxNQUFNQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQTtZQUN6REEsTUFBTUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0E7WUFFekRBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBO1FBQ2xCQSxDQUFDQTtRQWlCTVIsa0NBQWFBLEdBQXBCQSxVQUFxQkEsTUFBYUE7WUFDOUJTLElBQUlBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQzNDQSxFQUFFQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtZQUU3QkEsQ0FBQ0EsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7WUFHbEJBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ1hBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ1hBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ1hBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ1hBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ1hBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ1hBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ1hBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ1hBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBR1pBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO1lBQ3REQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUN0REEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFFdERBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBO1lBQ1ZBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBO1lBQ1ZBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBO1lBQ1ZBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBO1lBQ1ZBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBO1lBQ1ZBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBO1lBQ1ZBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBO1lBQ1ZBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBO1lBQ1ZBLEdBQUdBLElBQUlBLEVBQUVBLENBQUNBO1lBSVZBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBO1lBQ3JCQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDVkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDbEJBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBO2dCQUNaQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDMUJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO2dCQUMxQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDOUJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNKQSxFQUFFQSxDQUFDQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDWkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7d0JBRVpBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO3dCQUM3QkEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7d0JBRW5CQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTt3QkFDbkJBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNkQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDM0JBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUMzQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQy9CQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7d0JBRUpBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO3dCQUM3QkEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7d0JBRW5CQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxHQUFHQSxDQUFDQTt3QkFDbkJBLEVBQUVBLEdBQUdBLEdBQUdBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUNkQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTt3QkFDM0JBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO3dCQUMzQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQy9CQSxDQUFDQTtnQkFDTEEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBO29CQUVuQkEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQzdCQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtvQkFFbkJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBO29CQUNuQkEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ2RBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO29CQUMzQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQzNCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDL0JBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFFSkEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7b0JBQzdCQSxFQUFFQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQTtvQkFFbkJBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBO29CQUNuQkEsRUFBRUEsR0FBR0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQ2RBLElBQUlBLENBQUNBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLEdBQUdBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBO29CQUMzQkEsSUFBSUEsQ0FBQ0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsRUFBRUEsQ0FBQ0E7b0JBQzNCQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQTtnQkFDL0JBLENBQUNBO1lBQ0xBLENBQUNBO1lBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO1FBQ2hCQSxDQUFDQTtRQWFNVCxxQ0FBZ0JBLEdBQXZCQSxVQUF3QkEsS0FBWUEsRUFBRUEsSUFBWUE7WUFDOUNVLElBQUlBLEVBQUVBLEVBQUVBLEVBQUVB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QUFDQSxDQUFDQTtZQUNuQ0EsSUFBSUEsRUFBRUEsR0FBSUEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDbkNBLElBQUlBLEVBQUVBLEdBQUlBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUNBLENBQUNBO1lBQ25DQSxJQUFJQSxFQUFFQSxHQUFHQSxDQUFFQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUlwQ0EsTUFBTUEsQ0FBQ0EsVUFBT0EsQ0FBQ0EsTUFBTUEsQ0FDakJBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLEdBQUdBLENBQUVBLEVBQUVBLEVBQzNDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxDQUFFQSxFQUFFQSxFQUMzQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBRUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBRUEsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsQ0FBRUEsRUFBRUEsQ0FDOUNBLENBQUNBO1FBT05BLENBQUNBO1FBRVVqQix3QkFBR0EsR0FBVkEsVUFBV0EsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsQ0FBUUEsRUFBRUEsQ0FBUUE7WUFDN0NrQixJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNaQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNaQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtZQUNaQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNoQkEsQ0FBQ0E7UUFFTWxCLHdCQUFHQSxHQUFWQSxVQUFXQSxJQUFlQTtZQUN0Qm1CLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLEVBQUVBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBRWpEQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxFQUFFQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVqREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDaEJBLENBQUNBO1FBVU1uQixtQ0FBY0EsR0FBckJBO1lBQ0lvQixJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQTtZQUVoQ0EsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFDYkEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7WUFFYkEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7WUFDN0JBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO2dCQUNqQkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzNCQSxDQUFDQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDakJBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLEVBQUVBLElBQUlBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBO2dCQUN2QkEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzNCQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxFQUFFQSxHQUFHQSxDQUFDQSxDQUFDQTtnQkFDaEJBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1lBQ1ZBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNKQSxDQUFDQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUFFQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxDQUFDQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDckVBLENBQUNBLEdBQUdBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO2dCQUNsQkEsQ0FBQ0EsR0FBR0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekVBLENBQUNBO1lBRURB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LE1BQU1BLEVBQUVBLFNBQVNBLENBQUNBLEVBQ3RDQSxJQUFJQSxDQUNQQSxDQUFDQTtRQUNOQSxDQUFDQTtRQU1NSCxtQ0FBUUEsR0FBZkEsVUFBZ0JBLElBQUlBO1lBQ2hCSSxJQUFJQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQTtZQU1oQkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsSUFBSUEsYUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzVEQSxJQUFJQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFN0JBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFFBQVFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1lBQ2pEQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDNUJBLElBQUlBLE1BQU1BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUUxQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBQ0EsSUFBd0NBLEVBQUVBLEdBQVVBO29CQUNqRkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsR0FBR0EsRUFBRUEsTUFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNQQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDNUJBLElBQUlBLE1BQU1BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLEVBQ3JCQSxTQUFTQSxH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QUFHQSxDQUFDQSxPQUFPQSxLQUFLQSxPQUFPQSxDQUFDQTtnQkFDbkNBLENBQUNBLENBQUNBLENBQUNBO2dCQUVQQSxFQUFFQSxDQUFBQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtvQkFDdEJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFdBQVdBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO2dCQUM3Q0EsQ0FBQ0E7WUFDTEEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsSUFBSUEsYUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQ2pFQSxJQUFJQSxHQUFHQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNsQkEsU0FBU0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTdCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNsRUEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFFMUJBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBLFdBQVdBLENBQUNBLFVBQUNBLElBQXdDQSxFQUFFQSxHQUFVQTtvQkFDL0VBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLEdBQUdBLEVBQUVBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLENBQUNBO2dCQUM1Q0EsQ0FBQ0EsQ0FB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RCxBQUVBLDhDQUY4QztBQUU5QyxJQUFPLEVBQUUsQ0EyQ1I7QUEzQ0QsV0FBTyxFQUFFLEVBQUMsQ0FBQztJQUNOQSxJQUFNQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFhQSxDQUFDQTtJQUc5Q0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBTUEsWUFBU0EsQ0FBQ0EsS0FBS0EsRUFBRUEsWUFBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDdkRBLE1BQU1BLENBQUNBLFFBQVFBLENBQU1BLFlBQVNBLENBQUNBLFNBQVNBLEVBQUVBLFlBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO0lBQzNEQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFNQSxZQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxZQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtJQUMxREEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBTUEsWUFBU0EsQ0FBQ0EsU0FBU0EsRUFBRUEsWUFBU0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7SUFDM0RBLE1BQU1BLENBQUNBLFFBQVFBLENBQU1BLFlBQVNBLENBQUNBLFNBQVNBLEVBQUVBLFlBQVNBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO0lBQzNEQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFNQSxZQUFTQSxDQUFDQSxPQUFPQSxFQUFFQSxZQUFTQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtJQUN6REEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBTUEsWUFBU0EsQ0FBQ0EsT0FBT0EsRUFBRUEsWUFBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7SUFDNURBLE1BQU1BLENBQUNBLFFBQVFBLENBQU1BLFlBQVNBLENBQUNBLFFBQVFBLEVBQUVBLFlBQVNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO0lBQzdEQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFNQSxZQUFTQSxDQUFDQSxLQUFLQSxFQUFFQSxZQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtJQUUxREE7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RUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsRUFBRUEsRUFBRUEsR0FBR0E7UUFDUEEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsS0FBS0E7UUFDVkEsR0FBR0EsRUFBRUEsS0FBS0E7UUFDVkEsR0FBR0EsRUFBRUEsS0FBS0E7UUFDVkEsR0FBR0EsRUFBRUEsU0FBU0E7UUFDZEEsR0FBR0EsRUFBRUEsUUFBUUE7UUFDYkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsSUFBSUE7UUFDVEEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7S0FDWEEsRUFDREEsYUFBYUEsR0FBR0E7UUFDWkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFBRUEsR0FBR0E7UUFDUkEsR0FBR0EsRUFB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NUJBLENBQUNBO2dCQUVEQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLEtBQUtBLEVBQUVBLFFBQVFBLENBQUNBLENBQUNBO1lBQ3REQSxDQUFDQTtZQUNEQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFBQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFBQSxDQUFDQTtnQkFDdERBLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLEVBQ2JBLFFBQVFBLEdBQUdBLElBQUlBLEVBQ2ZBLFlBQVlBLEdBQUdBLElBQUlBLENBQUNBO2dCQUV4QkEsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7b0JBQ3ZCQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDdEJBLEtBQUtBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUNyQkEsWUFBWUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hDQSxDQUFDQTtnQkFDREEsSUFBSUEsQ0FBQUEsQ0FBQ0E7b0JBQ0RBLE1BQU1BLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUN0QkEsS0FBS0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3JCQSxRQUFRQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDeEJBLFlBQVlBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNoQ0EsQ0FBQ0E7Z0JBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLDZCQUE2QkEsQ0FBQ0EsTUFBTUEsRUFBRUEsS0FBS0EsRUFBRUEsUUFBUUEsRUFBRUEsWUFBWUEsQ0FBQ0EsQ0FBQ0E7WUFDckZBLENBQUNBO1FBRUxBLENB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QUFDQSxFQUN0QkEsUUFBUUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7Z0JBRWpCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxTQUFTQSxFQUFFQSxPQUFPQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUN2REEsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzVCQSxJQUFJQSxNQUFNQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUNyQkEsUUFBUUEsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRTVCQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxFQUFFQSxDQUFDQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtZQUMzQ0EsQ0FBQ0E7WUFDREEsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsSUFBSUEsYUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsYUFBVUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsSUFBSUEsYUFBVUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7Z0JBQzdJQSxJQUFJQSxTQUFTQSxHQUFHQSxTQUFTQSxDQUFDQSxDQUFDQSxDQUFDQSxFQUN4QkEsT0FBT0EsR0FBR0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsRUFDdEJBLFFBQVFBLEdBQUdBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUU1QkEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsU0FBU0EsRUFBRUEsT0FBT0EsRUFBRUEsUUFBUUEsQ0FBQ0EsQ0FBQ0E7WUFD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S0FBRixFQUFFLFFBdUxSIiwiZmlsZSI6ImR5LmRlYnVnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHlSdHtcbiAgICBleHBvcnQgdmFyIGZyb21Db2xsZWN0aW9uID0gKGNvbGxlY3Rpb246ZHlDYi5Db2xsZWN0aW9uPGFueT4sIHNjaGVkdWxlciA9IFNjaGVkdWxlci5jcmVhdGUoKSkgPT57XG4gICAgICAgIHZhciBhcnIgPSBjb2xsZWN0aW9uLnRvQXJyYXkoKTtcblxuICAgICAgICByZXR1cm4gYXJyLmxlbmd0aCA9PT0gMCA/IGVtcHR5KCkgOiBmcm9tQXJyYXkoYXJyLCBzY2hlZHVsZXIpO1xuICAgIH07XG59XG4iLCJtb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIEVudGl0eXtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2NvdW50Om51bWJlciA9IDE7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgICAgIHRoaXMuX3VpZCA9IEVudGl0eS5fY291bnQ7XG4gICAgICAgICAgICBFbnRpdHkuX2NvdW50ICs9IDE7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF91aWQ6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHVpZCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91aWQ7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgRW50aXR5e1xuICAgICAgICBwcml2YXRlIF9nYW1lT2JqZWN0OkdhbWVPYmplY3QgPSBudWxsO1xuICAgICAgICBnZXQgZ2FtZU9iamVjdCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVPYmplY3Q7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGdhbWVPYmplY3QoZ2FtZU9iamVjdDpHYW1lT2JqZWN0KXtcbiAgICAgICAgICAgIHRoaXMuX2dhbWVPYmplY3QgPSBnYW1lT2JqZWN0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldCB0cmFuc2Zvcm0oKTpUcmFuc2Zvcm0ge1xuICAgICAgICAgICAgaWYoIXRoaXMuX2dhbWVPYmplY3QpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVPYmplY3QudHJhbnNmb3JtO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXQoKXtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIC8vcmVmZXIgdG8gaHR0cDovL2RvY3MudW5pdHkzZC5jb20vU2NyaXB0UmVmZXJlbmNlL1RyYW5zZm9ybS5odG1sLCBwbGF5Q2FudmFzLT5zcmMvc2NlbmUvc2NlbmVfZ3JhcGhub2RlLmpzXG4gICAgLy90b2RvIGFkZENoaWxkQW5kU2F2ZVRyYW5zZm9ybT8ocGxheUNhbnZhcy0+c2NlbmVfZ3JhcGhub2RlLmpzKVxuICAgIC8vdG9kbyBpbmhlcml0IGZyb20gQ29tcG9uZW50P1xuICAgIGV4cG9ydCBjbGFzcyBUcmFuc2Zvcm0gZXh0ZW5kcyBFbnRpdHl7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGdhbWVPYmplY3Q6R2FtZU9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKGdhbWVPYmplY3QpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbG9jYWxUb1BhcmVudE1hdHJpeDpNYXRyaXggPSBNYXRyaXguY3JlYXRlKCk7XG4gICAgICAgIGdldCBsb2NhbFRvUGFyZW50TWF0cml4KCl7XG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLl9sb2NhbFRvUGFyZW50TWF0cml4O1xuICAgICAgICAgICAgaWYgKHRoaXMuX2RpcnR5TG9jYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFRvUGFyZW50TWF0cml4LnNldFRSUyh0aGlzLl9sb2NhbFBvc2l0aW9uLCB0aGlzLl9sb2NhbFJvdGF0aW9uLCB0aGlzLl9sb2NhbFNjYWxlKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnR5TG9jYWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJ0eVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsVG9QYXJlbnRNYXRyaXg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9sb2NhbFRvV29ybGRNYXRyaXg6TWF0cml4ID0gbnVsbDtcbiAgICAgICAgZ2V0IGxvY2FsVG9Xb3JsZE1hdHJpeCgpe1xuICAgICAgICAgICAgdmFyIHN5bmNMaXN0ID0gZHlDYi5Db2xsZWN0aW9uLmNyZWF0ZTxUcmFuc2Zvcm0+KCksXG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHdoaWxlIChjdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc3luY0xpc3QuYWRkQ2hpbGQoY3VycmVudCk7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IGN1cnJlbnQucGFyZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzeW5jTGlzdC5yZXZlcnNlKCkuZm9yRWFjaCgodHJhbnNmb3JtOlRyYW5zZm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5zeW5jKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsVG9Xb3JsZE1hdHJpeDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgbG9jYWxUb1dvcmxkTWF0cml4KGxvY2FsVG9Xb3JsZE1hdHJpeDpNYXRyaXgpe1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxUb1dvcmxkTWF0cml4ID0gbG9jYWxUb1dvcmxkTWF0cml4O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcGFyZW50OlRyYW5zZm9ybSA9IG51bGw7XG4gICAgICAgIGdldCBwYXJlbnQoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHBhcmVudChwYXJlbnQ6VHJhbnNmb3JtKXtcbiAgICAgICAgICAgIGlmKHRoaXMuX3BhcmVudCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighcGFyZW50KXtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnQuYWRkQ2hpbGQodGhpcyk7XG5cbiAgICAgICAgICAgIC8vdG9kbyBjYW4gaGFzIG11bHRpIHBhcmVudD9cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3Bvc2l0aW9uOlZlY3RvcjMgPSBWZWN0b3IzLmNyZWF0ZSgpO1xuICAgICAgICBnZXQgcG9zaXRpb24oKXtcbiAgICAgICAgICAgIHRoaXMuX3Bvc2l0aW9uID0gdGhpcy5sb2NhbFRvV29ybGRNYXRyaXguZ2V0VHJhbnNsYXRpb24oKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uO1xuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5nZXRXb3JsZFRyYW5zZm9ybSh0aGlzKS5nZXRUcmFuc2xhdGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIHNldCBwb3NpdGlvbihwb3NpdGlvbjpWZWN0b3IzKXtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFBvc2l0aW9uID0gcG9zaXRpb24uY29weSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxQb3NpdGlvbiA9IHRoaXMuX3BhcmVudC5sb2NhbFRvV29ybGRNYXRyaXguY29weSgpLmludmVydCgpLm11bHRpcGx5VmVjdG9yMyhwb3NpdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2RpcnR5TG9jYWwgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcm90YXRpb246UXVhdGVybmlvbiA9IFF1YXRlcm5pb24uY3JlYXRlKDAsIDAsIDAsIDEpO1xuICAgICAgICBnZXQgcm90YXRpb24oKXtcbiAgICAgICAgICAgIHRoaXMuX3JvdGF0aW9uLnNldEZyb21NYXRyaXgodGhpcy5sb2NhbFRvV29ybGRNYXRyaXgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcm90YXRpb247XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHJvdGF0aW9uKHJvdGF0aW9uOlF1YXRlcm5pb24pe1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsUm90YXRpb24gPSByb3RhdGlvbi5jb3B5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFJvdGF0aW9uID0gdGhpcy5fcGFyZW50LnJvdGF0aW9uLmNvcHkoKS5pbnZlcnQoKS5tdWx0aXBseShyb3RhdGlvbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2RpcnR5TG9jYWwgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfc2NhbGU6VmVjdG9yMyA9IFZlY3RvcjMuY3JlYXRlKDEsIDEsIDEpO1xuICAgICAgICBnZXQgc2NhbGUoKXtcbiAgICAgICAgICAgIHRoaXMuX3NjYWxlID0gdGhpcy5sb2NhbFRvV29ybGRNYXRyaXguZ2V0U2NhbGUoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjYWxlO1xuICAgICAgICB9XG4gICAgICAgIHNldCBzY2FsZShzY2FsZTpWZWN0b3IzKXtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFNjYWxlID0gc2NhbGUuY29weSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxTY2FsZSA9IHRoaXMuX3BhcmVudC5sb2NhbFRvV29ybGRNYXRyaXguY29weSgpLmludmVydCgpLm11bHRpcGx5VmVjdG9yMyhzY2FsZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2RpcnR5TG9jYWwgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZXVsZXJBbmdsZXM6VmVjdG9yMyA9IG51bGw7XG4gICAgICAgIGdldCBldWxlckFuZ2xlcygpe1xuICAgICAgICAgICAgdGhpcy5fZXVsZXJBbmdsZXMgPSB0aGlzLmxvY2FsVG9Xb3JsZE1hdHJpeC5nZXRFdWxlckFuZ2xlcygpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V1bGVyQW5nbGVzO1xuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5fcm90YXRpb24uZ2V0RXVsZXJBbmdsZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgZXVsZXJBbmdsZXMoZXVsZXJBbmdsZXM6VmVjdG9yMyl7XG4gICAgICAgICAgICAvL3RoaXMuX2V1bGVyQW5nbGVzID0gZXVsZXJBbmdsZXM7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFJvdGF0aW9uLnNldEZyb21FdWxlckFuZ2xlcyhldWxlckFuZ2xlcyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFJvdGF0aW9uID0gdGhpcy5fcGFyZW50LnJvdGF0aW9uLmNvcHkoKS5pbnZlcnQoKS5tdWx0aXBseSh0aGlzLl9sb2NhbFJvdGF0aW9uKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZGlydHlMb2NhbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9sb2NhbFBvc2l0aW9uOlZlY3RvcjMgPSBWZWN0b3IzLmNyZWF0ZSgwLCAwLCAwKTtcbiAgICAgICAgZ2V0IGxvY2FsUG9zaXRpb24oKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFBvc2l0aW9uO1xuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5fcGFyZW50ID8gdGhpcy5fcGFyZW50LmxvY2FsVG9Xb3JsZE1hdHJpeC5jb3B5KCkuaW52ZXJzZU9mKCkubXVsdGlwbHlWZWN0b3IzKHRoaXMuX3Bvc2l0aW9uKVxuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5fcGFyZW50ID8gdGhpcy5fcG9zaXRpb24uc3ViKHRoaXMuX3BhcmVudC5wb3NpdGlvbikgOiB0aGlzLl9wb3NpdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgbG9jYWxQb3NpdGlvbihwb3NpdGlvbjpWZWN0b3IzKXtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsUG9zaXRpb24gPSBwb3NpdGlvbi5jb3B5KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2RpcnR5TG9jYWwgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbG9jYWxSb3RhdGlvbjpRdWF0ZXJuaW9uID0gUXVhdGVybmlvbi5jcmVhdGUoMCwgMCwgMCwgMSk7XG4gICAgICAgIGdldCBsb2NhbFJvdGF0aW9uKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWxSb3RhdGlvbjtcbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuX2xvY2FsUm90YXRpb25XaXRoUGFyZW50Lm11bHRpcGx5KHRoaXMuX2xvY2FsUm90YXRpb25XaXRob3V0UGFyZW50KTtcbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuX3BhcmVudCA/IHRoaXMuX3BhcmVudC5yb3RhdGlvbi5jb3B5KCkuaW52ZXJ0KCkubXVsdGlwbHkodGhpcy5fcm90YXRpb24pXG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLl9wYXJlbnQgPyB0aGlzLl9yb3RhdGlvbi5zdWIodGhpcy5fcGFyZW50LnJvdGF0aW9uKSA6IHRoaXMuX3JvdGF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHNldCBsb2NhbFJvdGF0aW9uKHJvdGF0aW9uOlF1YXRlcm5pb24pe1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxSb3RhdGlvbiA9IHJvdGF0aW9uLmNvcHkoKTtcblxuICAgICAgICAgICAgdGhpcy5fZGlydHlMb2NhbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9sb2NhbEV1bGVyQW5nbGVzOlZlY3RvcjMgPSBudWxsO1xuICAgICAgICBnZXQgbG9jYWxFdWxlckFuZ2xlcygpe1xuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5sb2NhbFJvdGF0aW9uLmdldEV1bGVyQW5nbGVzKCk7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbEV1bGVyQW5nbGVzID0gdGhpcy5fbG9jYWxSb3RhdGlvbi5nZXRFdWxlckFuZ2xlcygpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsRXVsZXJBbmdsZXM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGxvY2FsRXVsZXJBbmdsZXMobG9jYWxFdWxlckFuZ2xlczpWZWN0b3IzKXtcbiAgICAgICAgICAgIC8vdGhpcy5fbG9jYWxFdWxlckFuZ2xlcyA9IGxvY2FsRXVsZXJBbmdsZXM7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFJvdGF0aW9uLnNldEZyb21FdWxlckFuZ2xlcyhsb2NhbEV1bGVyQW5nbGVzKTtcblxuICAgICAgICAgICAgdGhpcy5fZGlydHlMb2NhbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9sb2NhbFNjYWxlOlZlY3RvcjMgPSBWZWN0b3IzLmNyZWF0ZSgxLCAxLCAxKTtcbiAgICAgICAgZ2V0IGxvY2FsU2NhbGUoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhbFNjYWxlO1xuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5fcGFyZW50ID8gdGhpcy5fcGFyZW50LmxvY2FsVG9Xb3JsZE1hdHJpeC5jb3B5KCkuaW52ZXJzZU9mKCkubXVsdGlwbHlWZWN0b3IzKHRoaXMuX3NjYWxlKVxuICAgICAgICAgICAgLy8gICAgOiB0aGlzLl9zY2FsZTtcbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMuX3BhcmVudCA/IHRoaXMuX3NjYWxlLnN1Yih0aGlzLl9wYXJlbnQuc2NhbGUpIDogdGhpcy5fc2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGxvY2FsU2NhbGUoc2NhbGU6VmVjdG9yMyl7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFNjYWxlID0gc2NhbGUuY29weSgpO1xuXG4gICAgICAgICAgICB0aGlzLl9kaXJ0eUxvY2FsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB1cCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxUb1dvcmxkTWF0cml4LmdldFkoKS5ub3JtYWxpemUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCByaWdodCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9jYWxUb1dvcmxkTWF0cml4LmdldFgoKS5ub3JtYWxpemUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBmb3J3YXJkKCl7XG4gICAgICAgICAgICAvL3RvZG8gd2h5IHNjYWxlKC0xKT9cbiAgICAgICAgICAgIC8vcmV0dXJuIHRoaXMubG9jYWxUb1dvcmxkTWF0cml4LmdldFooKS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxvY2FsVG9Xb3JsZE1hdHJpeC5nZXRaKCkubm9ybWFsaXplKCkuc2NhbGUoLTEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZGlydHlXb3JsZDpib29sZWFuID0gbnVsbDtcbiAgICAgICAgZ2V0IGRpcnR5V29ybGQoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kaXJ0eVdvcmxkO1xuICAgICAgICB9XG4gICAgICAgIHNldCBkaXJ0eVdvcmxkKGRpcnR5V29ybGQ6Ym9vbGVhbil7XG4gICAgICAgICAgICB0aGlzLl9kaXJ0eVdvcmxkID0gZGlydHlXb3JsZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2RpcnR5TG9jYWw6Ym9vbGVhbiA9IHRydWU7XG4gICAgICAgIHByaXZhdGUgX2NoaWxkcmVuOmR5Q2IuQ29sbGVjdGlvbjxUcmFuc2Zvcm0+ID0gZHlDYi5Db2xsZWN0aW9uLmNyZWF0ZTxUcmFuc2Zvcm0+KCk7XG4gICAgICAgIHByaXZhdGUgX2dhbWVPYmplY3Q6R2FtZU9iamVjdCA9IG51bGw7XG5cblxuICAgICAgICBjb25zdHJ1Y3RvcihnYW1lT2JqZWN0OkdhbWVPYmplY3Qpe1xuICAgICAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5fZ2FtZU9iamVjdCA9IGdhbWVPYmplY3Q7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgYWRkQ2hpbGQoY2hpbGQ6VHJhbnNmb3JtKXtcbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZW1vdmVDaGlsZChjaGlsZDpUcmFuc2Zvcm0pe1xuICAgICAgICAgICAgLy90aGlzLnJlbW92ZUZsYWcoY2hpbGQpO1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4ucmVtb3ZlQ2hpbGQoY2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN5bmMoKXtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXJ0eUxvY2FsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxUb1BhcmVudE1hdHJpeC5zZXRUUlModGhpcy5fbG9jYWxQb3NpdGlvbiwgdGhpcy5fbG9jYWxSb3RhdGlvbiwgdGhpcy5fbG9jYWxTY2FsZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJ0eUxvY2FsID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGlydHlXb3JsZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXJ0eVdvcmxkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFRvV29ybGRNYXRyaXggPSB0aGlzLl9sb2NhbFRvUGFyZW50TWF0cml4LmNvcHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsVG9Xb3JsZE1hdHJpeCA9IHRoaXMuX3BhcmVudC5sb2NhbFRvV29ybGRNYXRyaXguY29weSgpLm11bHRpcGx5KHRoaXMuX2xvY2FsVG9QYXJlbnRNYXRyaXgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2RpcnR5V29ybGQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkOlRyYW5zZm9ybSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC5kaXJ0eVdvcmxkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHJpdmF0ZSBfZmxhZ3M6ZHlDYi5Db2xsZWN0aW9uPEZsYWc+ID0gZHlDYi5Db2xsZWN0aW9uLmNyZWF0ZTxGbGFnPigpO1xuXG4gICAgICAgIHB1YmxpYyB0cmFuc2xhdGVMb2NhbCh0cmFuc2xhdGlvbjpWZWN0b3IzKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFBvc2l0aW9uID0gdGhpcy5fbG9jYWxQb3NpdGlvbi5hZGQodGhpcy5fbG9jYWxSb3RhdGlvbi5tdWx0aXBseVZlY3RvcjModHJhbnNsYXRpb24pKTtcblxuICAgICAgICAgICAgdGhpcy5fZGlydHlMb2NhbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdHJhbnNsYXRlKHRyYW5zbGF0aW9uOlZlY3RvcjMpe1xuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRyYW5zbGF0aW9uLmFkZCh0aGlzLnBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByb3RhdGUoZXVsZXJBbmdsZXM6VmVjdG9yMyl7XG4gICAgICAgICAgICB2YXIgcXVhdGVybmlvbiA9IFF1YXRlcm5pb24uY3JlYXRlKCk7XG5cbiAgICAgICAgICAgIHF1YXRlcm5pb24uc2V0RnJvbUV1bGVyQW5nbGVzKGV1bGVyQW5nbGVzKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhcmVudCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsUm90YXRpb24gPSBxdWF0ZXJuaW9uLm11bHRpcGx5KHRoaXMuX2xvY2FsUm90YXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90b2RvIHVuZGVyc3RhbmQgd2h5P1xuICAgICAgICAgICAgICAgIHF1YXRlcm5pb24gPSB0aGlzLl9wYXJlbnQucm90YXRpb24uY29weSgpLmludmVydCgpLm11bHRpcGx5KHF1YXRlcm5pb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsUm90YXRpb24gPSBxdWF0ZXJuaW9uLm11bHRpcGx5KHRoaXMucm90YXRpb24pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9kaXJ0eUxvY2FsID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByb3RhdGVMb2NhbChldWxlckFuZ2xlczpWZWN0b3IzKSB7XG4gICAgICAgICAgICB2YXIgcXVhdGVybmlvbiA9IFF1YXRlcm5pb24uY3JlYXRlKCk7XG5cbiAgICAgICAgICAgIHF1YXRlcm5pb24uc2V0RnJvbUV1bGVyQW5nbGVzKGV1bGVyQW5nbGVzKTtcblxuICAgICAgICAgICAgdGhpcy5fbG9jYWxSb3RhdGlvbi5tdWx0aXBseShxdWF0ZXJuaW9uKTtcblxuICAgICAgICAgICAgdGhpcy5fZGlydHlMb2NhbCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcm90YXRlQXJvdW5kKGFuZ2xlOm51bWJlciwgY2VudGVyOlZlY3RvcjMsIGF4aXM6VmVjdG9yMyl7XG4gICAgICAgICAgICB2YXIgcm90OlF1YXRlcm5pb24gPSBRdWF0ZXJuaW9uLmNyZWF0ZSgpLnNldEZyb21BeGlzQW5nbGUoYW5nbGUsIGF4aXMpLFxuICAgICAgICAgICAgICAgIGRpcjpWZWN0b3IzID0gdGhpcy5wb3NpdGlvbi5jb3B5KCkuc3ViKGNlbnRlcik7IC8vIGZpbmQgY3VycmVudCBkaXJlY3Rpb24gcmVsYXRpdmUgdG8gY2VudGVyXG5cbiAgICAgICAgICAgIGRpciA9IHJvdC5tdWx0aXBseVZlY3RvcjMoZGlyKTsgLy8gcm90YXRlIHRoZSBkaXJlY3Rpb25cblxuICAgICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IGNlbnRlci5hZGQoZGlyKTsgLy8gZGVmaW5lIG5ldyBwb3NpdGlvblxuICAgICAgICAgICAgLy90b2RvIHdoeSBcInRoaXMucm90YXRpb24gPSB0aGlzLnJvdGF0aW9uLm11bHRpcGx5KHJvdClcIiB3aWxsIGNhdXNlIGdhbWVvYmplY3Qgcm90YXRlIGRpcmVjdGlvbiBpcyBhcm91bmQgc2VsZj9cbiAgICAgICAgICAgIHRoaXMucm90YXRpb24gPSByb3QubXVsdGlwbHkodGhpcy5yb3RhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbG9va0F0KHRhcmdldDpWZWN0b3IzKTtcbiAgICAgICAgcHVibGljIGxvb2tBdCh0YXJnZXQ6VmVjdG9yMywgdXA6VmVjdG9yMyk7XG5cbiAgICAgICAgcHVibGljIGxvb2tBdChhcmdzKXtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgdXAgPSBudWxsO1xuXG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgICAgICB1cCA9IFZlY3RvcjMudXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuICAgICAgICAgICAgICAgIHVwID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uID0gUXVhdGVybmlvbi5jcmVhdGUoKS5zZXRGcm9tTWF0cml4KE1hdHJpeC5jcmVhdGUoKS5zZXRMb29rQXQodGhpcy5wb3NpdGlvbiwgdGFyZ2V0LCB1cCkpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBHYW1lT2JqZWN0IGV4dGVuZHMgRW50aXR5e1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSguLi5hcmdzKSB7XG4gICAgICAgIFx0dmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgXHRyZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcGFyZW50OkdhbWVPYmplY3QgPSBudWxsO1xuICAgICAgICBnZXQgcGFyZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCBwYXJlbnQocGFyZW50OkdhbWVPYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHJpdmF0ZSBfYnViYmxlUGFyZW50OkdhbWVPYmplY3QgPSBudWxsO1xuICAgICAgICBnZXQgYnViYmxlUGFyZW50KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYnViYmxlUGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHNldCBidWJibGVQYXJlbnQoYnViYmxlUGFyZW50OkdhbWVPYmplY3Qpe1xuICAgICAgICAgICAgdGhpcy5fYnViYmxlUGFyZW50ID0gYnViYmxlUGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIF90cmFuc2Zvcm06VHJhbnNmb3JtID0gVHJhbnNmb3JtLmNyZWF0ZSh0aGlzKTtcbiAgICAgICAgZ2V0IHRyYW5zZm9ybSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyYW5zZm9ybTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdHJhbnNmb3JtKHRyYW5zZm9ybTpUcmFuc2Zvcm0pe1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6UmVuZGVyZXIgPSBudWxsO1xuICAgICAgICBnZXQgcmVuZGVyZXIoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgcmVuZGVyZXIocmVuZGVyZXI6UmVuZGVyZXIpe1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX25hbWU6c3RyaW5nID0gXCJnYW1lT2JqZWN0XCIgKyBTdHJpbmcodGhpcy51aWQpO1xuICAgICAgICBnZXQgbmFtZSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IG5hbWUobmFtZTpzdHJpbmcpe1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zY3JpcHQ6ZHlDYi5IYXNoPElTY3JpcHRCZWhhdmlvcj4gPSBkeUNiLkhhc2guY3JlYXRlPElTY3JpcHRCZWhhdmlvcj4oKTtcbiAgICAgICAgZ2V0IHNjcmlwdCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjcmlwdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3NjcmlwdFN0cmVhbXM6ZHlDYi5Db2xsZWN0aW9uPGR5UnQuU3RyZWFtPiA9IGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGU8ZHlSdC5TdHJlYW0+KCk7XG4gICAgICAgIGdldCBzY3JpcHRTdHJlYW1zKCk6ZHlSdC5TdHJlYW17XG4gICAgICAgICAgICByZXR1cm4gZHlSdC5mcm9tQ29sbGVjdGlvbih0aGlzLl9zY3JpcHRTdHJlYW1zKS5tZXJnZUFsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY29sbGlkZXI6Q29sbGlkZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9jaGlsZHJlbjpkeUNiLkNvbGxlY3Rpb248R2FtZU9iamVjdD4gPSBkeUNiLkNvbGxlY3Rpb24uY3JlYXRlPEdhbWVPYmplY3Q+KCk7XG4gICAgICAgIHByaXZhdGUgX2NvbXBvbmVudHM6ZHlDYi5Db2xsZWN0aW9uPGFueT4gPSBkeUNiLkNvbGxlY3Rpb24uY3JlYXRlPGFueT4oKTtcbiAgICAgICAgcHJpdmF0ZSBfYWN0aW9uTWFuYWdlcjpBY3Rpb25NYW5hZ2VyID0gQWN0aW9uTWFuYWdlci5jcmVhdGUoKTtcblxuICAgICAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgICAgIHRoaXMuX2V4ZWNTY3JpcHQoXCJpbml0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9uRW50ZXIoKSB7XG4gICAgICAgICAgICB0aGlzLl9leGVjU2NyaXB0KFwib25FbnRlclwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvblN0YXJ0TG9vcCgpIHtcbiAgICAgICAgICAgIHRoaXMuX2V4ZWNTY3JpcHQoXCJvblN0YXJ0TG9vcFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbkVuZExvb3AoKSB7XG4gICAgICAgICAgICB0aGlzLl9leGVjU2NyaXB0KFwib25FbmRMb29wXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9uRXhpdCgpIHtcbiAgICAgICAgICAgIHRoaXMuX2V4ZWNTY3JpcHQoXCJvbkV4aXRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZGlzcG9zZSgpIHtcbiAgICAgICAgICAgIHRoaXMub25FeGl0KCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuX3BhcmVudCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vZmYodGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaGFzQ2hpbGQoY2hpbGQ6R2FtZU9iamVjdCk6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW4uaGFzQ2hpbGQoY2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wdWJsaWMgYWRkQ2hpbGQoY2hpbGQ6R2FtZU9iamVjdCwgc29ydDpib29sZWFuPXRydWUpOmJvb2xlYW4ge1xuICAgICAgICBwdWJsaWMgYWRkQ2hpbGQoY2hpbGQ6R2FtZU9iamVjdCk6R2FtZU9iamVjdCB7XG4gICAgICAgICAgICAvL25lZWQgdXNlciBqdWRnZSBpdCFcbiAgICAgICAgICAgIC8vaWYodGhpcy5fY2hpbGRyZW4uaGFzQ2hpbGQoY2hpbGQpKSB7XG4gICAgICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgaWYgKGNoaWxkLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIC8vd2lsbCByZW1vdmUgYmluZCBldmVudCxyZW1vdmUgZnJvbSBwYXJlbnQgLi4uXG4gICAgICAgICAgICAgICAgLy9jaGlsZC5yZW1vdmVNZSgpO1xuICAgICAgICAgICAgICAgIGNoaWxkLnBhcmVudC5yZW1vdmVDaGlsZChjaGlsZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICBjaGlsZC50cmFuc2Zvcm0ucGFyZW50ID0gdGhpcy50cmFuc2Zvcm0ucGFyZW50O1xuXG4gICAgICAgICAgICAvL2NoaWxkLmRpc3BhdGNoRXZlbnQobmV3IENvcmVFdmVudCgnYmVmb3JlYWRkJywgZmFsc2UsIHtcbiAgICAgICAgICAgIC8vICAgIHBhcmVudDogdGhpc1xuICAgICAgICAgICAgLy99KSk7XG5cblxuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uYWRkQ2hpbGQoY2hpbGQpO1xuXG4gICAgICAgICAgICAvL2lmKHNvcnQpIHtcblxuXG4gICAgICAgICAgICAvKiFcbiAgICAgICAgICAgIHNvcnQgd2hlbiBhZGQgY2hpbGQvY2hpbGRyZW4sIG5vdCB3aGVuIGdldCBjaGlsZHJlbi5cbiAgICAgICAgICAgIGJlY2F1c2UgZWFjaCBsb29wIHdpbGwgZ2V0IGNoaWxkcmVuKHRvIHJlbmRlciksIHNvIGlmIHVzaW5nIHRoZSBsYXR0ZXIsIGVhY2ggbG9vcCBzaG91bGQgc29ydCFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5zb3J0KCk7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vY2hpbGQuX3BhcmVudCA9IHRoaXM7XG4gICAgICAgICAgICAvL2NoaWxkLnNldEJ1YmJsZVBhcmVudCh0aGlzKTtcbiAgICAgICAgICAgIC8vY2hpbGQuX3RyYW5zZm9ybS5kaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAvL2NoaWxkLmRpc3BhdGNoRXZlbnQobmV3IENvcmVFdmVudCgnYWRkJywgZmFsc2UpKTtcbiAgICAgICAgICAgIC8vdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDb3JlRXZlbnQoJ2NoaWxkYWRkJywgZmFsc2UsIHtcbiAgICAgICAgICAgIC8vICAgIGNoaWxkOiBjaGlsZFxuICAgICAgICAgICAgLy99KSk7XG5cblxuICAgICAgICAgICAgLy9jaGlsZC5pbml0KCk7XG4gICAgICAgICAgICAvL2NoaWxkLm9uRW50ZXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0Q2hpbGRyZW4oKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzb3J0KCl7XG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5zb3J0KHRoaXMuX2FzY2VuZFopO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmb3JFYWNoKGZ1bmM6RnVuY3Rpb24pe1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQoY2hpbGQ6R2FtZU9iamVjdCk6R2FtZU9iamVjdCB7XG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5yZW1vdmVDaGlsZChjaGlsZCk7XG5cbiAgICAgICAgICAgIGNoaWxkLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICAvL2NoaWxkLnNldEJ1YmJsZVBhcmVudChudWxsKTtcblxuICAgICAgICAgICAgY2hpbGQuZGlzcG9zZSgpO1xuICAgICAgICAgICAgLy92YXIgaWR4ID0gdGhpcy5fY2hpbGRyZW4uaW5kZXhPZihjaGlsZCk7XG4gICAgICAgICAgICAvL2lmKGlkeCAhPT0gLTEpIHtcbiAgICAgICAgICAgIC8vICAgIGNoaWxkLmRpc3BhdGNoRXZlbnQobmV3IENvcmVFdmVudCgnYmVmb3JlcmVtb3ZlJywgZmFsc2UpKTtcbiAgICAgICAgICAgIC8vICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuXG4gICAgICAgICAgICAvL2NoaWxkLmRpc3Bvc2UoKTtcblxuICAgICAgICAgICAgLy9jaGlsZC5zZXRCdWJibGVQYXJlbnQobnVsbCk7XG4gICAgICAgICAgICAvLyAgICBjaGlsZC5kaXNwYXRjaEV2ZW50KG5ldyBDb3JlRXZlbnQoJ3JlbW92ZScsIGZhbHNlLCB7XG4gICAgICAgICAgICAvLyAgICAgICAgcGFyZW50OiB0aGlzXG4gICAgICAgICAgICAvLyAgICB9KSk7XG4gICAgICAgICAgICAvLyAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IENvcmVFdmVudCgnY2hpbGRyZW1vdmUnLCBmYWxzZSwge1xuICAgICAgICAgICAgLy8gICAgICAgIGNoaWxkOiBjaGlsZFxuICAgICAgICAgICAgLy8gICAgfSkpO1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vcmV0dXJuIGZhbHNlO1xuXG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vKipcbiAgICAgICAgLy8gKiByZW1vdmUgdGhpcyBnYW1lIG9iamVjdCBmcm9tIHBhcmVudC5cbiAgICAgICAgLy8gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgLy8gKi9cbiAgICAgICAgLy9wdWJsaWMgcmVtb3ZlTWUoKTpHYW1lT2JqZWN0IHtcbiAgICAgICAgLy8gICAgdmFyIHBhcmVudCA9IHRoaXMuX3BhcmVudDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgcGFyZW50ICYmIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHB1YmxpYyBnZXRUb3BVbmRlclBvaW50KHBvaW50OlBvaW50KTpHYW1lT2JqZWN0IHtcbiAgICAgICAgICAgIC8vdmFyIGZvdW5kLCBsb2NhbFAsIGNoaWxkO1xuICAgICAgICAgICAgLy92YXIgY2hpbGRyZW5BcnI7XG4gICAgICAgICAgICAvL2lmKCF0aGlzLl9hY3RpdmUgfHwgIXRoaXMuX3Zpc2libGUpIHJldHVybiBudWxsO1xuICAgICAgICAgICAgLy9pZih0aGlzLl9pbnRlcmFjdGl2ZVJlY3QpIHtcbiAgICAgICAgICAgIC8vICAgIGxvY2FsUCA9IHRoaXMudHJhbnNmb3JtLmdsb2JhbFRvTG9jYWwoeCwgeSk7XG4gICAgICAgICAgICAvLyAgICBpZighdGhpcy5faW50ZXJhY3RpdmVSZWN0LmNvbnRhaW5zWFkobG9jYWxQLngsIGxvY2FsUC55KSkge1xuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL2NoaWxkcmVuQXJyID0gdGhpcy5fY2hpbGRyZW47XG4gICAgICAgICAgICAvL2lmKGNoaWxkcmVuQXJyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vICAgIGZvcih2YXIgaT1jaGlsZHJlbkFyci5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgY2hpbGQgPSBjaGlsZHJlbkFycltpXTtcbiAgICAgICAgICAgIC8vICAgICAgICBmb3VuZCA9IGNoaWxkLmdldFVuZGVyUG9pbnQoeCwgeSwgdG91Y2hhYmxlKTtcbiAgICAgICAgICAgIC8vICAgICAgICBpZihmb3VuZCkge1xuICAgICAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy9pZighdG91Y2hhYmxlIHx8IHRoaXMuX3RvdWNoYWJsZSkge1xuICAgICAgICAgICAgLy8gICAgaWYoIWxvY2FsUCkge1xuICAgICAgICAgICAgLy8gICAgICAgIGxvY2FsUCA9IHRoaXMudHJhbnNmb3JtLmdsb2JhbFRvTG9jYWwoeCwgeSk7XG4gICAgICAgICAgICAvLyAgICB9XG4gICAgICAgICAgICAvLyAgICBpZih0aGlzLnRlc3RIaXQobG9jYWxQLngsIGxvY2FsUC55KSkge1xuICAgICAgICAgICAgLy8gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL3JldHVybiBudWxsO1xuXG4gICAgICAgICAgICAvL3RvZG8ganVkZ2UgcG9zaXRpb24uej9cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuXG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5jb3B5KCkucmV2ZXJzZSgpLmZvckVhY2goKGNoaWxkOkdhbWVPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjaGlsZC5nZXRUb3BVbmRlclBvaW50KHBvaW50KTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGR5Q2IuJEJSRUFLO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZihyZXN1bHQpe1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaXNIaXQocG9pbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGlzSGl0KGxvY2F0aW9uSW5WaWV3OlBvaW50KTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xsaWRlciA/IHRoaXMuX2NvbGxpZGVyLmNvbGxpZGVYWShsb2NhdGlvbkluVmlldy54LCBsb2NhdGlvbkluVmlldy55KSA6IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGhhc0NvbXBvbmVudChjb21wb25lbnQ6Q29tcG9uZW50KTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgaGFzQ29tcG9uZW50KF9jbGFzczpGdW5jdGlvbik6Ym9vbGVhbjtcblxuICAgICAgICBwdWJsaWMgaGFzQ29tcG9uZW50KGFyZ3Mpe1xuICAgICAgICAgICAgaWYoYXJndW1lbnRzWzBdIGluc3RhbmNlb2YgQ29tcG9uZW50KXtcbiAgICAgICAgICAgICAgICBsZXQgY29tcG9uZW50ID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHMuaGFzQ2hpbGQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgbGV0IF9jbGFzcyA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzLmhhc0NoaWxkKChjb21wb25lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudCBpbnN0YW5jZW9mIF9jbGFzcztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldENvbXBvbmVudDxUPihfY2xhc3M6RnVuY3Rpb24pOlR7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50cy5maWx0ZXIoKGNvbXBvbmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb25lbnQgaW5zdGFuY2VvZiBfY2xhc3M7XG4gICAgICAgICAgICB9KS5nZXRDaGlsZCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhZGRDb21wb25lbnQoY29tcG9uZW50OkNvbXBvbmVudCl7XG4gICAgICAgICAgICB2YXIgTG9nID0gZHlDYi5Mb2c7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuaGFzQ29tcG9uZW50KGNvbXBvbmVudCkpe1xuICAgICAgICAgICAgICAgIExvZy5hc3NlcnQoZmFsc2UsIFwidGhlIGNvbXBvbmVudCBhbHJlYWR5IGV4aXN0XCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjb21wb25lbnQuZ2FtZU9iamVjdCkge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5nYW1lT2JqZWN0LnJlbW92ZUNvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcG9uZW50LmdhbWVPYmplY3QgPSB0aGlzO1xuXG5cbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHMuYWRkQ2hpbGQoY29tcG9uZW50KTtcbiAgICAgICAgICAgIGNvbXBvbmVudC5pbml0KCk7XG5cbiAgICAgICAgICAgIGlmKGNvbXBvbmVudCBpbnN0YW5jZW9mIEFjdGlvbikge1xuICAgICAgICAgICAgICAgIGxldCBhY3Rpb24gPSA8QWN0aW9uPmNvbXBvbmVudDtcblxuICAgICAgICAgICAgICAgIGFjdGlvbi50YXJnZXQgPSB0aGlzO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGlvbk1hbmFnZXIuYWRkQ2hpbGQoYWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY29tcG9uZW50IGluc3RhbmNlb2YgUmVuZGVyZXIpIHtcbiAgICAgICAgICAgICAgICBMb2cuYXNzZXJ0KCF0aGlzLl9yZW5kZXJlciwgXCJyZW5kZXJlciBpcyBvdmVyd3JpdGVcIik7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlciA9IDxSZW5kZXJlcj5jb21wb25lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGNvbXBvbmVudCBpbnN0YW5jZW9mIENvbGxpZGVyKSB7XG4gICAgICAgICAgICAgICAgTG9nLmFzc2VydCghdGhpcy5fcmVuZGVyZXIsIFwiY29sbGlkZXIgaXMgb3ZlcndyaXRlXCIpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fY29sbGlkZXIgPSA8Q29sbGlkZXI+Y29tcG9uZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihjb21wb25lbnQgaW5zdGFuY2VvZiBTY3JpcHQpe1xuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQgPSA8U2NyaXB0PmNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JpcHRTdHJlYW1zLmFkZENoaWxkKHNjcmlwdC5jcmVhdGVMb2FkSnNTdHJlYW0oKVxuICAgICAgICAgICAgICAgICAgICAuZG8oKGRhdGE6SVNjcmlwdEZpbGVEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fc2NyaXB0LmFkZENoaWxkKGRhdGEubmFtZSwgbmV3IGRhdGEuY2xhc3Moc2VsZikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIC8vc2NyaXB0LmNyZWF0ZUxvYWRKc1N0cmVhbSgpXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIC5kbygoZGF0YTpJU2NyaXB0RmlsZURhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgIHNlbGYuX3NjcmlwdC5hZGRDaGlsZChkYXRhLm5hbWUsIG5ldyBkYXRhLmNsYXNzKHNlbGYpKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvLy5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy99LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgIHZhciB0ID0gZXJyO1xuICAgICAgICAgICAgICAgIC8vICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgdmFyIGEgPSAxO1xuICAgICAgICAgICAgICAgIC8vICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlbW92ZUNvbXBvbmVudChjb21wb25lbnQ6Q29tcG9uZW50KXtcbiAgICAgICAgICAgIHRoaXMuX2NvbXBvbmVudHMucmVtb3ZlQ2hpbGQoY29tcG9uZW50KTtcblxuICAgICAgICAgICAgaWYoY29tcG9uZW50IGluc3RhbmNlb2YgQWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aW9uTWFuYWdlci5yZW1vdmVDaGlsZCg8QWN0aW9uPmNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgLy90aGlzLl9iZWhhdmlvdXJzLnB1c2goPEJlaGF2aW91cj5jb21wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoY29tcG9uZW50IGluc3RhbmNlb2YgUmVuZGVyZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlciA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGNvbXBvbmVudCBpbnN0YW5jZW9mIENvbGxpZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29sbGlkZXIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb21wb25lbnQuZ2FtZU9iamVjdCA9IG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLy92aXNpdChyZW5kZXJlcjpyZW5kZXJpbmcuUmVuZGVyZXIsIHBhcmVudFRyYW5zZm9ybTpUcmFuc2Zvcm0sIHRyYW5zZm9ybURpcnR5OmJvb2xlYW4sIHZpc2libGVGbGFnOmJvb2xlYW4pIHtcbiAgICAgICAgcHVibGljIHJlbmRlcihyZW5kZXJlcjpyZW5kZXIuUmVuZGVyZXIsIGNhbWVyYTpHYW1lT2JqZWN0KTp2b2lke1xuICAgICAgICAgICAgLy92YXIgaSwgbGVuO1xuICAgICAgICAgICAgLy9pZighdGhpcy5fYWN0aXZlIHx8ICF0aGlzLl9pbml0aWFsaXplZCB8fCB0aGlzLl9kZXN0cm95ZWQpIHtcbiAgICAgICAgICAgIC8vICAgIGlmKHRyYW5zZm9ybURpcnR5KSB7XG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy5fdHJhbnNmb3JtLmRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vICAgIH1cbiAgICAgICAgICAgIC8vICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9pZih0aGlzLl90cmFuc2Zvcm0uZGlydHkpIHtcbiAgICAgICAgICAgIC8vICAgIHRyYW5zZm9ybURpcnR5ID0gdHJhbnNmb3JtRGlydHkgfHwgdGhpcy5fdHJhbnNmb3JtLmRpcnR5O1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL2lmKHRyYW5zZm9ybURpcnR5KSB7XG4gICAgICAgICAgICAvLyAgICBpZih0aGlzLl90cmFuc2Zvcm0gaW5zdGFuY2VvZiBSZWN0VHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy5fdHJhbnNmb3JtLnRyYW5zZm9ybSh0aGlzLl9zdGFnZS52aWV3UmVjdFRyYW5zZm9ybSwgcGFyZW50VHJhbnNmb3JtKTtcbiAgICAgICAgICAgIC8vICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAgICAgICAgdGhpcy5fdHJhbnNmb3JtLnRyYW5zZm9ybSh0aGlzLl9zdGFnZS5yb290VHJhbnNmb3JtLCBwYXJlbnRUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgLy8gICAgfVxuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy9pZighdGhpcy5fdmlzaWJsZSkge1xuICAgICAgICAgICAgLy8gICAgdmlzaWJsZUZsYWcgPSB2aXNpYmxlRmxhZyAmJiB0aGlzLl92aXNpYmxlO1xuICAgICAgICAgICAgLy99XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy9pZih2aXNpYmxlRmxhZykge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5yZW5kZXIocmVuZGVyZXIsIHRyYW5zZm9ybURpcnR5KTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vZm9yKGk9MCxsZW49dGhpcy5fY2hpbGRyZW4ubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAvLyAgICB0aGlzLl9jaGlsZHJlbltpXS52aXNpdChyZW5kZXJlciwgdGhpcy5fdHJhbnNmb3JtLCB0cmFuc2Zvcm1EaXJ0eSwgdmlzaWJsZUZsYWcpO1xuICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyICYmIHRoaXMuX3JlbmRlcmVyLnJlbmRlcihyZW5kZXJlciwgdGhpcy5nZXRDb21wb25lbnQ8R2VvbWV0cnk+KEdlb21ldHJ5KSwgIGNhbWVyYSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkOkdhbWVPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZC5yZW5kZXIocmVuZGVyZXIsIGNhbWVyYSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1cGRhdGUodGltZTpudW1iZXIpOnZvaWQge1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uTWFuYWdlci51cGRhdGUodGltZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goKGNoaWxkOkdhbWVPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZC51cGRhdGUodGltZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fZXhlY1NjcmlwdChcInVwZGF0ZVwiLCB0aW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2FzY2VuZFooYTpHYW1lT2JqZWN0LCBiOkdhbWVPYmplY3Qpe1xuICAgICAgICAgICAgICAgIHJldHVybiBiLnRyYW5zZm9ybS5wb3NpdGlvbi56IC0gYS50cmFuc2Zvcm0ucG9zaXRpb24uejtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2V4ZWNTY3JpcHQobWV0aG9kOnN0cmluZywgYXJnPzphbnkpe1xuICAgICAgICAgICAgdGhpcy5fc2NyaXB0LmZvckVhY2goKHNjcmlwdDpJU2NyaXB0QmVoYXZpb3IpID0+IHtcbiAgICAgICAgICAgICAgICBzY3JpcHRbbWV0aG9kXSAmJiAoYXJnID8gc2NyaXB0W21ldGhvZF0oYXJnKSA6IHNjcmlwdFttZXRob2RdKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIFN0YWdlIGV4dGVuZHMgR2FtZU9iamVjdHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdG9kbyBtb3ZlIGl0IGVsc2V3aGVyZT9cbiAgICAgICAgcHVibGljIHByb2dyYW06cmVuZGVyLlByb2dyYW0gPSBudWxsO1xuXG4gICAgICAgIHByaXZhdGUgX2NhbWVyYTpHYW1lT2JqZWN0ID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgaW5pdCgpe1xuICAgICAgICAgICAgc3VwZXIuaW5pdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnByb2dyYW0gPSByZW5kZXIuUHJvZ3JhbS5jcmVhdGUoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRDb21wb25lbnQoVG9wQ29sbGlkZXIuY3JlYXRlKCkpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKGNoaWxkOkdhbWVPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZC5pbml0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhZGRDaGlsZChjaGlsZDpHYW1lT2JqZWN0KTpHYW1lT2JqZWN0e1xuICAgICAgICAgICAgaWYodGhpcy5faXNDYW1lcmEoY2hpbGQpKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9jYW1lcmEgPSBjaGlsZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHN1cGVyLmFkZENoaWxkKGNoaWxkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZW5kZXIocmVuZGVyZXI6cmVuZGVyLlJlbmRlcmVyKSB7XG4gICAgICAgICAgICBkeUNiLkxvZy5lcnJvcighdGhpcy5fY2FtZXJhLCBcInN0YWdlIG11c3QgYWRkIGNhbWVyYVwiKTtcblxuICAgICAgICAgICAgc3VwZXIucmVuZGVyKHJlbmRlcmVyLCB0aGlzLl9jYW1lcmEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9uRW50ZXIoKXtcbiAgICAgICAgICAgIHN1cGVyLm9uRW50ZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKChjaGlsZDpHYW1lT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY2hpbGQub25FbnRlcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3RvZG8gb25FeGl0XG5cbiAgICAgICAgcHVibGljIG9uU3RhcnRMb29wKCl7XG4gICAgICAgICAgICBzdXBlci5vblN0YXJ0TG9vcCgpO1xuXG4gICAgICAgICAgICB0aGlzLmZvckVhY2goKGNoaWxkOkdhbWVPYmplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjaGlsZC5vblN0YXJ0TG9vcCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb25FbmRMb29wKCl7XG4gICAgICAgICAgICBzdXBlci5vbkVuZExvb3AoKTtcblxuICAgICAgICAgICAgdGhpcy5mb3JFYWNoKChjaGlsZDpHYW1lT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgY2hpbGQub25FbmRMb29wKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2lzQ2FtZXJhKGNoaWxkOkdhbWVPYmplY3Qpe1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkLmhhc0NvbXBvbmVudChDYW1lcmEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIFNjaGVkdWxlcntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3NjaGVkdWxlQ291bnQgPSAwO1xuICAgICAgICBwcml2YXRlIF9zY2hlZHVsZXM6ZHlDYi5IYXNoPGFueT4gPSBkeUNiLkhhc2guY3JlYXRlPGFueT4oKTtcblxuICAgICAgICBwdWJsaWMgdXBkYXRlKHRpbWU6bnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXMuZm9yRWFjaCgoc2NoZWR1bGVJdGVtOmFueSwgc2NoZWR1bGVJZDpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBpZihzY2hlZHVsZUl0ZW0uaXNTdG9wIHx8IHNjaGVkdWxlSXRlbS5pc1BhdXNlKXtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNjaGVkdWxlSXRlbS51cGRhdGUodGltZSk7XG5cbiAgICAgICAgICAgICAgICBpZihzY2hlZHVsZUl0ZW0uaXNGaW5pc2gpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShzY2hlZHVsZUlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2hlZHVsZSB0aGUgdGFzayB0byBlYWNoIGZyYW1lXG4gICAgICAgICAqIEBwYXJhbSB0YXNrXG4gICAgICAgICAqIEBwYXJhbSBhcmdzXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHNjaGVkdWxlIGlkXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2NoZWR1bGVMb29wKHRhc2s6RnVuY3Rpb24sIGFyZ3M6QXJyYXk8YW55Pj1bXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NjaGVkdWxlKExvb3BTY2hlZHVsZUl0ZW0sIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjaGVkdWxlIHRoZSB0YXNrIHRvIHRoZSBuZXh0IHNwZWZpY2llZCBmcmFtZVxuICAgICAgICAgKiBAcGFyYW0gdGFza1xuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gZnJhbWVcbiAgICAgICAgICogQHBhcmFtIGFyZ3NcbiAgICAgICAgICogQHJldHVybnMge3N0cmluZ30gc2NoZWR1bGUgaWRcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzY2hlZHVsZUZyYW1lKHRhc2ssIGZyYW1lPTEsIGFyZ3M/KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2NoZWR1bGUoRnJhbWVTY2hlZHVsZUl0ZW0sIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjaGVkdWxlIHRoZSB0YXNrIHRvIGludGVybmFsLCBsaWtlIHNldEludGVydmFsXG4gICAgICAgICAqIEBwYXJhbSB0YXNrXG4gICAgICAgICAqIEBwYXJhbSB0aW1lXG4gICAgICAgICAqIEBwYXJhbSBhcmdzXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9IHNjaGVkdWxlIGlkXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2NoZWR1bGVJbnRlcnZhbCh0YXNrLCB0aW1lPTAsIGFyZ3M/KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2NoZWR1bGUoSW50ZXJ2YWxTY2hlZHVsZUl0ZW0sIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHNjaGVkdWxlIHRoZSB0YXNrIHRvIHRpbWUsIGxpa2Ugc2V0VGltZW91dFxuICAgICAgICAgKiBAcGFyYW0gdGFza1xuICAgICAgICAgKiBAcGFyYW0gdGltZVxuICAgICAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBzY2hlZHVsZSBpZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNjaGVkdWxlVGltZSh0YXNrLCB0aW1lPTAsIGFyZ3M/KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2NoZWR1bGUoVGltZVNjaGVkdWxlSXRlbSwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogcGF1c2UgdGhlIHNwZWNpZmllZCBzY2hlZHVsZVxuICAgICAgICAgKiBAcGFyYW0gc2NoZWR1bGVJZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHBhdXNlKHNjaGVkdWxlSWQ/OnN0cmluZykge1xuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVzLmZvckVhY2goKHNjaGVkdWxlSXRlbTphbnksIHNjaGVkdWxlSWQ6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucGF1c2Uoc2NoZWR1bGVJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgc2NoZWR1bGVJdGVtID0gdGhpcy5fc2NoZWR1bGVzLmdldENoaWxkKGFyZ3VtZW50c1swXSk7XG5cbiAgICAgICAgICAgICAgICBzY2hlZHVsZUl0ZW0ucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXN1bWUgdGhlIHNwZWNpZmllZCBzY2hlZHVsZVxuICAgICAgICAgKiBAcGFyYW0gc2NoZWR1bGVJZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHJlc3VtZShzY2hlZHVsZUlkPzpzdHJpbmcpIHtcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlcy5mb3JFYWNoKChzY2hlZHVsZUl0ZW06YW55LCBzY2hlZHVsZUlkOnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnJlc3VtZShzY2hlZHVsZUlkKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBzY2hlZHVsZUl0ZW0gPSB0aGlzLl9zY2hlZHVsZXMuZ2V0Q2hpbGQoYXJndW1lbnRzWzBdKTtcblxuICAgICAgICAgICAgICAgIHNjaGVkdWxlSXRlbS5yZXN1bWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGFydChzY2hlZHVsZUlkPzpzdHJpbmcpe1xuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVzLmZvckVhY2goKHNjaGVkdWxlSXRlbTphbnksIHNjaGVkdWxlSWQ6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RhcnQoc2NoZWR1bGVJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCBzY2hlZHVsZUl0ZW0gPSB0aGlzLl9zY2hlZHVsZXMuZ2V0Q2hpbGQoYXJndW1lbnRzWzBdKTtcblxuICAgICAgICAgICAgICAgIHNjaGVkdWxlSXRlbS5zdGFydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0b3Aoc2NoZWR1bGVJZD86c3RyaW5nKXtcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlcy5mb3JFYWNoKChzY2hlZHVsZUl0ZW06YW55LCBzY2hlZHVsZUlkOnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnN0b3Aoc2NoZWR1bGVJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCBzY2hlZHVsZUl0ZW0gPSB0aGlzLl9zY2hlZHVsZXMuZ2V0Q2hpbGQoYXJndW1lbnRzWzBdKTtcblxuICAgICAgICAgICAgICAgIHNjaGVkdWxlSXRlbS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaGFzKHNjaGVkdWxlSWQ6c3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLl9zY2hlZHVsZXMuaGFzQ2hpbGQoc2NoZWR1bGVJZClcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZW1vdmUgdGhlIHNwZWNpZnkgc2NoZWR1bGUgYnkgaWRcbiAgICAgICAgICogQHBhcmFtIGlkXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgcmVtb3ZlKHNjaGVkdWxlSWQ6c3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXMucmVtb3ZlQ2hpbGQoc2NoZWR1bGVJZCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVtb3ZlQWxsKCl7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXMucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3NjaGVkdWxlKF9jbGFzczphbnksIGFyZ3M6QXJyYXk8YW55Pil7XG4gICAgICAgICAgICB2YXIgc2NoZWR1bGVJZCA9IHRoaXMuX2J1aWxkSWQoKTtcblxuICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVzLnNldFZhbHVlKHNjaGVkdWxlSWQsIF9jbGFzcy5jcmVhdGUuYXBwbHkoX2NsYXNzLCBhcmdzKSk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5zdGFydChzY2hlZHVsZUlkKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlSWQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9idWlsZElkKCl7XG4gICAgICAgICAgICByZXR1cm4gJ1NjaGVkdWxlXycgKyAodGhpcy5fc2NoZWR1bGVDb3VudCsrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIFNjaGVkdWxlSXRlbXtcbiAgICAgICAgY29uc3RydWN0b3IodGFzazpGdW5jdGlvbiwgYXJnczpBcnJheTxhbnk+KXtcbiAgICAgICAgICAgIHRoaXMudGFzayA9IHRhc2s7XG4gICAgICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGlzUGF1c2U6Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBwdWJsaWMgaXNTdG9wOmJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgcHVibGljIHBhdXNlVGltZTpudW1iZXIgPSBudWxsO1xuICAgICAgICBwdWJsaWMgcGF1c2VFbGFwc2VkOm51bWJlciA9IG51bGw7XG4gICAgICAgIHB1YmxpYyBzdGFydFRpbWU6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHVibGljIGlzRmluaXNoOmJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICBwcm90ZWN0ZWQgdGFzazpGdW5jdGlvbiA9IG51bGw7XG4gICAgICAgIHByb3RlY3RlZCBhcmdzOkFycmF5PGFueT4gPSBudWxsO1xuICAgICAgICBwcm90ZWN0ZWQgdGltZUNvbnRyb2xsZXI6Q29tbW9uVGltZUNvbnRyb2xsZXIgPSBDb21tb25UaW1lQ29udHJvbGxlci5jcmVhdGUoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogcGF1c2UgdGhlIHNwZWNpZmllZCBzY2hlZHVsZVxuICAgICAgICAgKiBAcGFyYW0gc2NoZWR1bGVJZFxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHBhdXNlKCkge1xuICAgICAgICAgICAgdGhpcy5pc1BhdXNlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudGltZUNvbnRyb2xsZXIucGF1c2UoKTtcbiAgICAgICAgICAgIC8vdGhpcy5wYXVzZVRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogcmVzdW1lIHRoZSBzcGVjaWZpZWQgc2NoZWR1bGVcbiAgICAgICAgICogQHBhcmFtIHNjaGVkdWxlSWRcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyByZXN1bWUoKXtcbiAgICAgICAgICAgIHRoaXMuaXNQYXVzZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy90aGlzLnBhdXNlRWxhcHNlZCA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSAtIHRoaXMucGF1c2VUaW1lO1xuICAgICAgICAgICAgLy90aGlzLnBhdXNlVGltZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnRpbWVDb250cm9sbGVyLnJlc3VtZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXJ0KCl7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy50aW1lQ29udHJvbGxlci5zdGFydCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0b3AoKXtcbiAgICAgICAgICAgIHRoaXMuaXNTdG9wID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudGltZUNvbnRyb2xsZXIuc3RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGZpbmlzaCgpe1xuICAgICAgICAgICAgdGhpcy5pc0ZpbmlzaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBUaW1lU2NoZWR1bGVJdGVtIGV4dGVuZHMgU2NoZWR1bGVJdGVte1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh0YXNrOkZ1bmN0aW9uLCB0aW1lOm51bWJlciA9IDAsIGFyZ3M6QXJyYXk8YW55PiA9IFtdKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXModGFzaywgdGltZSwgYXJncyk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3Rvcih0YXNrOkZ1bmN0aW9uLCB0aW1lOm51bWJlciA9IDAsIGFyZ3M6QXJyYXk8YW55PiA9IFtdKXtcbiAgICAgICAgICAgIHN1cGVyKHRhc2ssIGFyZ3MpO1xuXG4gICAgICAgICAgICB0aGlzLl90aW1lID0gdGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3RpbWU6bnVtYmVyID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgdXBkYXRlKHRpbWU6bnVtYmVyKXtcbiAgICAgICAgICAgIC8vdmFyIGVsYXBzZWQgPSBUaW1lVXRpbHMuY29tcHV0ZUVsYXBzZVRpbWUodGltZSwgdGhpcy5zdGFydFRpbWUsIHRoaXMucGF1c2VFbGFwc2VkKTtcbiAgICAgICAgICAgIHZhciBlbGFwc2VkID0gdGhpcy50aW1lQ29udHJvbGxlci5jb21wdXRlRWxhcHNlVGltZSh0aW1lKTtcblxuICAgICAgICAgICAgaWYgKGVsYXBzZWQgPj0gdGhpcy5fdGltZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFzay5hcHBseSh0aGlzLCB0aGlzLmFyZ3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGFzcyBJbnRlcnZhbFNjaGVkdWxlSXRlbSBleHRlbmRzIFNjaGVkdWxlSXRlbXtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUodGFzazpGdW5jdGlvbiwgdGltZTpudW1iZXIgPSAwLCBhcmdzOkFycmF5PGFueT4gPSBbXSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKHRhc2ssIHRpbWUsIGFyZ3MpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IodGFzazpGdW5jdGlvbiwgdGltZTpudW1iZXIgPSAwLCBhcmdzOkFycmF5PGFueT4gPSBbXSkge1xuICAgICAgICAgICAgc3VwZXIodGFzaywgYXJncyk7XG5cbiAgICAgICAgICAgIHRoaXMuX2ludGVydmFsVGltZSA9IHRpbWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9pbnRlcnZhbFRpbWU6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfZWxhcHNlZDpudW1iZXIgPSAwO1xuXG4gICAgICAgIHB1YmxpYyB1cGRhdGUodGltZTpudW1iZXIpe1xuICAgICAgICAgICAgdmFyIGVsYXBzZWQgPSB0aGlzLnRpbWVDb250cm9sbGVyLmNvbXB1dGVFbGFwc2VUaW1lKHRpbWUpO1xuXG4gICAgICAgICAgICBpZiAoZWxhcHNlZCAtIHRoaXMuX2VsYXBzZWQgPj0gdGhpcy5faW50ZXJ2YWxUaW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrLmFwcGx5KHRoaXMsIHRoaXMuYXJncyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWxhcHNlZCA9ICBlbGFwc2VkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXJ0KCl7XG4gICAgICAgICAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9lbGFwc2VkID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsYXNzIExvb3BTY2hlZHVsZUl0ZW0gZXh0ZW5kcyBTY2hlZHVsZUl0ZW17XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHRhc2s6RnVuY3Rpb24sIGFyZ3M6QXJyYXk8YW55PiA9IFtdKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXModGFzaywgYXJncyk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdXBkYXRlKHRpbWU6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMudGFzay5hcHBseSh0aGlzLCB0aGlzLmFyZ3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgRnJhbWVTY2hlZHVsZUl0ZW0gZXh0ZW5kcyBTY2hlZHVsZUl0ZW0ge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh0YXNrOkZ1bmN0aW9uLCBmcmFtZTpudW1iZXIgPSAxLCBhcmdzOkFycmF5PGFueT4gPSBbXSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKHRhc2ssIGZyYW1lLCBhcmdzKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHRhc2s6RnVuY3Rpb24sIGZyYW1lOm51bWJlciA9IDEsIGFyZ3M6QXJyYXk8YW55PiA9IFtdKSB7XG4gICAgICAgICAgICBzdXBlcih0YXNrLCBhcmdzKTtcblxuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSBmcmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2ZyYW1lOm51bWJlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZSh0aW1lOm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZS0tO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fZnJhbWUgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMudGFzay5hcHBseSh0aGlzLCB0aGlzLmFyZ3MpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBlbnVtIEdhbWVTdGF0ZXtcbiAgICAgICAgTk9STUFMLFxuICAgICAgICBTVE9QLFxuICAgICAgICBQQVVTRVxuICAgIH1cblxuICAgIC8vdG9kbyBpbnZva2Ugc3RhZ2Uub25FeGl0XG5cbiAgICBleHBvcnQgY2xhc3MgRGlyZWN0b3J7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpEaXJlY3RvciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnN0YW5jZS5pbml0V2hlbkNyZWF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfc3RhZ2U6U3RhZ2UgPSBTdGFnZS5jcmVhdGUoKTtcbiAgICAgICAgZ2V0IHN0YWdlKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zY2hlZHVsZXI6U2NoZWR1bGVyID0gU2NoZWR1bGVyLmNyZWF0ZSgpO1xuICAgICAgICBnZXQgc2NoZWR1bGVyKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2NoZWR1bGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6cmVuZGVyLlJlbmRlcmVyPSBudWxsO1xuICAgICAgICBnZXQgcmVuZGVyZXIoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJlcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgcmVuZGVyZXIocmVuZGVyZXI6cmVuZGVyLlJlbmRlcmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF92aWV3OklWaWV3ID0gbnVsbDtcbiAgICAgICAgZ2V0IHZpZXcoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92aWV3O1xuICAgICAgICB9XG4gICAgICAgIHNldCB2aWV3KHZpZXc6SVZpZXcpe1xuICAgICAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9nbDphbnkgPSBudWxsO1xuICAgICAgICBnZXQgZ2woKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nbDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgZ2woZ2w6YW55KXtcbiAgICAgICAgICAgIHRoaXMuX2dsID0gZ2w7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgZ2FtZVRpbWUoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lQ29udHJvbGxlci5nYW1lVGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBmcHMoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lQ29udHJvbGxlci5mcHM7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaXNOb3JtYWwoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nYW1lU3RhdGUgPT09IEdhbWVTdGF0ZS5OT1JNQUw7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaXNTdG9wKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZVN0YXRlID09PSBHYW1lU3RhdGUuU1RPUDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBpc1BhdXNlKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZVN0YXRlID09PSBHYW1lU3RhdGUuUEFVU0U7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaXNUaW1lQ2hhbmdlKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGltZUNvbnRyb2xsZXIuaXNUaW1lQ2hhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGVsYXBzZWQoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lQ29udHJvbGxlci5lbGFwc2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZ2FtZUxvb3A6ZHlSdC5JRGlzcG9zYWJsZSA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2dhbWVTdGF0ZTpHYW1lU3RhdGUgPSBHYW1lU3RhdGUuTk9STUFMO1xuICAgICAgICBwcml2YXRlIF90aW1lQ29udHJvbGxlcjpEaXJlY3RvclRpbWVDb250cm9sbGVyPSBEaXJlY3RvclRpbWVDb250cm9sbGVyLmNyZWF0ZSgpO1xuICAgICAgICBwcml2YXRlIF9pc0ZpcnN0U3RhcnQ6Ym9vbGVhbiA9IHRydWU7XG5cbiAgICAgICAgcHVibGljIGluaXRXaGVuQ3JlYXRlKCl7XG4gICAgICAgICAgICAvL3RvZG8gZGV0ZWN0IHRvIGRlY2lkZSB1c2luZyB3aGljaCByZW5kZXJlclxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIgPSByZW5kZXIuV2ViR0xSZW5kZXJlci5jcmVhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGFydCgpe1xuICAgICAgICAgICAgdGhpcy5fZ2FtZVN0YXRlID0gR2FtZVN0YXRlLk5PUk1BTDtcblxuICAgICAgICAgICAgdGhpcy5fc3RhcnRMb29wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RvcCgpe1xuICAgICAgICAgICAgdGhpcy5fZ2FtZUxvb3AuZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fZ2FtZVN0YXRlID0gR2FtZVN0YXRlLlNUT1A7XG4gICAgICAgICAgICB0aGlzLl90aW1lQ29udHJvbGxlci5zdG9wKCk7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc3RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHBhdXNlKCl7XG4gICAgICAgICAgICBpZiAodGhpcy5fZ2FtZVN0YXRlID09PSBHYW1lU3RhdGUuUEFVU0UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2dhbWVTdGF0ZSA9IEdhbWVTdGF0ZS5QQVVTRTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVDb250cm9sbGVyLnBhdXNlKCk7XG4gICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZXN1bWUoKXtcbiAgICAgICAgICAgIHRoaXMuX2dhbWVTdGF0ZSA9IEdhbWVTdGF0ZS5OT1JNQUw7XG4gICAgICAgICAgICB0aGlzLl90aW1lQ29udHJvbGxlci5yZXN1bWUoKTtcbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci5yZXN1bWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdG9kbyBhZGQgZGlzcG9zZVxuXG4gICAgICAgIHB1YmxpYyBnZXRWaWV3KCk6SVZpZXd7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmlldztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRUb3BVbmRlclBvaW50KHBvaW50OlBvaW50KTpHYW1lT2JqZWN0e1xuICAgICAgICAgICAgLy9pZighdGhpcy5fc2NlbmUpe1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5fc2NlbmUuZ2V0VG9wVW5kZXJQb2ludChwb2ludCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhZ2UuZ2V0VG9wVW5kZXJQb2ludChwb2ludCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY3JlYXRlR0woY2FudmFzSWQ6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcgPSBWaWV3V2ViR0wuY3JlYXRlKGR5Q2IuRG9tUXVlcnkuY3JlYXRlKGNhbnZhc0lkKS5nZXQoMCkpO1xuICAgICAgICAgICAgdGhpcy5fZ2wgPSB0aGlzLl92aWV3LmdldENvbnRleHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3N0YXJ0TG9vcCgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5fZ2FtZUxvb3AgPSBkeVJ0Lmp1ZGdlKFxuICAgICAgICAgICAgICAgICgpID0+IHsgcmV0dXJuIHNlbGYuX2lzRmlyc3RTdGFydDsgfSxcbiAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLl9idWlsZExvYWRTY3JpcHRTdHJlYW0oKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGR5UnQuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuY29uY2F0KHRoaXMuX2J1aWxkSW5pdFN0cmVhbSgpKVxuICAgICAgICAgICAgICAgIC5pZ25vcmVFbGVtZW50cygpXG4gICAgICAgICAgICAgICAgLmNvbmNhdCh0aGlzLl9idWlsZExvb3BTdHJlYW0oKSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCh0aW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vdG9kbyBuZWVkIHBvbHlmaWxsXG4gICAgICAgICAgICAgICAgICAgIC8qIVxuICAgICAgICAgICAgICAgICAgICAgaSBjb25zaWRlciB0aGF0IHRoZSB0aW1lIGlzIERPTUhpZ2hSZXNUaW1lU3RhbXAo5LuO6aG16Z2i5a+86Iiq5byA5aeL5pe25rWL6YeP55qE6auY57K+56Gu5bqm5pe26Ze0KSxcbiAgICAgICAgICAgICAgICAgICAgIGJ1dCBpdCBtYXkgYmUgRE9NVGltZVN0YW1wIGluIHNvbWUgYnJvd3NlciFcbiAgICAgICAgICAgICAgICAgICAgIHNvIGl0IG1heSBuZWVkIHBvbHlmaWxsIVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fbG9vcEJvZHkodGltZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9idWlsZExvYWRTY3JpcHRTdHJlYW0oKXtcbiAgICAgICAgICAgIHJldHVybiBkeVJ0LmZyb21Db2xsZWN0aW9uKDxkeUNiLkNvbGxlY3Rpb248R2FtZU9iamVjdD4+KHRoaXMuX3N0YWdlLmdldENoaWxkcmVuKCkuY29weSgpLmFkZENoaWxkKHRoaXMuX3N0YWdlKSkpXG4gICAgICAgICAgICAgICAgLm1hcCgoZ2FtZU9iamVjdDpHYW1lT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lT2JqZWN0LnNjcmlwdFN0cmVhbXM7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAubWVyZ2VBbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2J1aWxkSW5pdFN0cmVhbSgpe1xuICAgICAgICAgICAgcmV0dXJuIGR5UnQuY2FsbEZ1bmMoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzRmlyc3RTdGFydCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhZ2UuaW5pdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YWdlLm9uRW50ZXIoKTtcblxuICAgICAgICAgICAgICAgIC8vdG9kbyBub3QgcHV0IGhlcmU/XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuaW5pdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZUNvbnRyb2xsZXIuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIuc3RhcnQoKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYnVpbGRMb29wU3RyZWFtKCl7XG4gICAgICAgICAgICByZXR1cm4gZHlSdC5pbnRlcnZhbFJlcXVlc3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2xvb3BCb2R5KHRpbWUpIHtcbiAgICAgICAgICAgIHZhciBlbGFwc2VUaW1lID0gbnVsbDtcblxuICAgICAgICAgICAgaWYodGhpcy5fZ2FtZVN0YXRlID09PSBHYW1lU3RhdGUuUEFVU0UgfHwgdGhpcy5fZ2FtZVN0YXRlID09PSBHYW1lU3RhdGUuU1RPUCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbGFwc2VUaW1lID0gdGhpcy5fdGltZUNvbnRyb2xsZXIuY29tcHV0ZUVsYXBzZVRpbWUodGltZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3RpbWVDb250cm9sbGVyLnRpY2soZWxhcHNlVGltZSk7XG5cbiAgICAgICAgICAgIC8vdG9kbyBpbnZva2Ugc3RhZ2UtPnN5bmNIaWVyYXJjaHkoKVxuXG4gICAgICAgICAgICB0aGlzLl9nbC5jbGVhcih0aGlzLl9nbC5DT0xPUl9CVUZGRVJfQklUIHwgdGhpcy5fZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YWdlLm9uU3RhcnRMb29wKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3J1bihlbGFwc2VUaW1lKTtcbiAgICAgICAgICAgIC8vdGhpcy5fcnVuKHRpbWUpO1xuXG4gICAgICAgICAgICAvL3RoaXMuX3JlbmRlcmVyLnJlbmRlcih0aGlzLl9zY2VuZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3N0YWdlLm9uRW5kTG9vcCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBydW4gb25lIGZyYW1lXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZVNjYWxlPTFdXG4gICAgICAgICAqL1xuICAgICAgICAvL3ByaXZhdGUgX3J1bih0aW1lU2NhbGU9dGhpcy5fdGltZVNjYWxlKSB7XG4gICAgICAgIHByaXZhdGUgX3J1bih0aW1lOm51bWJlcikge1xuICAgICAgICAgICAgLy9UaW1lLnVwZGF0ZSh0aW1lU2NhbGUpO1xuICAgICAgICAgICAgLy91cGRhdGUgY2hpbGRyZW4ncyBiZWhhdmlvdXJcbiAgICAgICAgICAgIHRoaXMuX3N0YWdlLnVwZGF0ZSh0aW1lKTtcbiAgICAgICAgICAgIC8vaW52b2tlIGNoaWxkcmVuJ3MgdHJhbmZvcm0odXBkYXRlIG1vZGVsTWF0cml4LCByb3RhdGUsdHJhbnNsYXRlLHNjYWxlKVxuICAgICAgICAgICAgLy8gYW5kIHJlbmRlcihzZW5kIHZlcnRpY2UgYW5kIGluZGljZSBkYXRhcyB0byB0aGlzLl9yZW5kZXIsIGRvIG90aGVyIHJlbmRlciB3b3JrKVxuICAgICAgICAgICAgLy90aGlzLl9zdGFnZS52aXNpdFN0YWdlKHRoaXMuX3JlbmRlcmVyKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YWdlLnJlbmRlcih0aGlzLl9yZW5kZXJlcik7XG4gICAgICAgICAgICAvL29wZXJhdGUgdmVydGljZSBhbmQgaW5kaWNlIGRhdGEsIGRyYXcgdGhlbShkcmF3QXJyYXkgb3IgZHJhd0VsZW1lbnQpXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXIoKTtcbiAgICAgICAgICAgIC8vZG8gdGFzaz9cbiAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlci51cGRhdGUodGltZSk7XG4gICAgICAgICAgICAvL1dPWkxMQS51dGlscy5Ud2Vlbi50aWNrKFRpbWUuZGVsdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlIGR5IHtcbiAgICBleHBvcnQgY2xhc3MgUG9pbnQge1xuICAgICAgICBwdWJsaWMgeDpudW1iZXIgPSBudWxsO1xuICAgICAgICBwdWJsaWMgeTpudW1iZXIgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyID0gbnVsbCwgeTpudW1iZXIgPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHg/Om51bWJlciwgeT86bnVtYmVyKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoeCwgeSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVZpZXcge1xuICAgICAgICBvZmZzZXQ6e3g6bnVtYmVyLCB5Om51bWJlcn07XG4gICAgICAgIHdpZHRoOm51bWJlcjtcbiAgICAgICAgaGVpZ2h0Om51bWJlcjtcbiAgICAgICAgZG9tOmFueTtcbiAgICAgICAgZ2V0Q29udGV4dCgpOmFueTtcbiAgICB9XG5cbiAgICBleHBvcnQgY2xhc3MgVmlld1dlYkdMIGltcGxlbWVudHMgSVZpZXcge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh2aWV3OklWaWV3KSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXModmlldyk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgb2Zmc2V0KCkge1xuICAgICAgICAgICAgdmFyIHZpZXcgPSB0aGlzLl9kb20sXG4gICAgICAgICAgICAgICAgb2Zmc2V0ID0ge3g6IHZpZXcub2Zmc2V0TGVmdCwgeTogdmlldy5vZmZzZXRUb3B9O1xuXG4gICAgICAgICAgICB3aGlsZSAodmlldyA9IHZpZXcub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0LnggKz0gdmlldy5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgICAgIG9mZnNldC55ICs9IHZpZXcub2Zmc2V0VG9wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZG9tOmFueSA9IG51bGw7XG4gICAgICAgIGdldCBkb20oKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kb207XG4gICAgICAgIH1cblxuICAgICAgICAvL3ByaXZhdGUgX3dpZHRoOm51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCB3aWR0aCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RvbS53aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBoZWlnaHQoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kb20uaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IoZG9tOmFueSl7XG4gICAgICAgICAgICB0aGlzLl9kb20gPSBkb207XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0Q29udGV4dCgpOmFueXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kb20uZ2V0Q29udGV4dChcIndlYmdsXCIpIHx8IHRoaXMuX2RvbS5nZXRDb250ZXh0KFwiZXhwZXJpbWVudGFsLXdlYmdsXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIEdlb21ldHJ5IGV4dGVuZHMgQ29tcG9uZW50e1xuICAgICAgICBwcml2YXRlIF92ZXJ0aWNlczpyZW5kZXIuQXJyYXlCdWZmZXIgPSBudWxsO1xuICAgICAgICBnZXQgdmVydGljZXMoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92ZXJ0aWNlcztcbiAgICAgICAgfVxuICAgICAgICBzZXQgdmVydGljZXModmVydGljZXM6cmVuZGVyLkFycmF5QnVmZmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2VzID0gdmVydGljZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9pbmRpY2VzOnJlbmRlci5FbGVtZW50QnVmZmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGluZGljZXMoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbmRpY2VzO1xuICAgICAgICB9XG4gICAgICAgIHNldCBpbmRpY2VzKGluZGljZXM6cmVuZGVyLkVsZW1lbnRCdWZmZXIpe1xuICAgICAgICAgICAgdGhpcy5faW5kaWNlcyA9IGluZGljZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb2xvcnM6cmVuZGVyLkFycmF5QnVmZmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGNvbG9ycygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9ycztcbiAgICAgICAgfVxuICAgICAgICBzZXQgY29sb3JzKGNvbG9yczpyZW5kZXIuQXJyYXlCdWZmZXIpe1xuICAgICAgICAgICAgdGhpcy5fY29sb3JzID0gY29sb3JzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbWF0ZXJpYWw6TWF0ZXJpYWwgPSBudWxsO1xuICAgICAgICBnZXQgbWF0ZXJpYWwoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXRlcmlhbDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgbWF0ZXJpYWwobWF0ZXJpYWw6TWF0ZXJpYWwpe1xuICAgICAgICAgICAgdGhpcy5fbWF0ZXJpYWwgPSBtYXRlcmlhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0KCl7XG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcyA9IHRoaXMuY29tcHV0ZVZlcnRpY2VzQnVmZmVyKCk7XG4gICAgICAgICAgICB0aGlzLl9pbmRpY2VzID0gdGhpcy5jb21wdXRlSW5kaWNlc0J1ZmZlcigpO1xuICAgICAgICAgICAgLy90aGlzLl9ub3JtYWxzID0gdGhpcy5fY29tcHV0ZU5vcm1hbHMoKTtcbiAgICAgICAgICAgIC8vdGhpcy5fdGV4Q29vcmRzID0gdGhpcy5fY29tcHV0ZVRleENvb3JkcygpO1xuICAgICAgICAgICAgLy90b2RvIGNvbXB1dGUgZnJvbSB2ZXJ0ZXhDb2xvcnMocmVmZXIgdG8gdGhyZWVqcylcbiAgICAgICAgICAgIHRoaXMuX2NvbG9ycyA9IHRoaXMuX2NvbXB1dGVDb2xvcnNCdWZmZXIodGhpcy5fbWF0ZXJpYWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVWZXJ0aWNlc0J1ZmZlcigpOnJlbmRlci5BcnJheUJ1ZmZlcntcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgY29tcHV0ZUluZGljZXNCdWZmZXIoKTpyZW5kZXIuRWxlbWVudEJ1ZmZlcntcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb21wdXRlQ29sb3JzQnVmZmVyKG1hdGVyaWFsOk1hdGVyaWFsKXtcbiAgICAgICAgICAgIHZhciBhcnIgPSBbXSxcbiAgICAgICAgICAgICAgICBjb2xvciA9IG1hdGVyaWFsLmNvbG9yLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuX3ZlcnRpY2VzLmNvdW50O1xuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goIGNvbG9yLnIsIGNvbG9yLmcsIGNvbG9yLmIsIDEuMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZW5kZXIuQXJyYXlCdWZmZXIuY3JlYXRlKG5ldyBGbG9hdDMyQXJyYXkoYXJyKSwgNCwgcmVuZGVyLkJ1ZmZlclR5cGUuRkxPQVQpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgQm94R2VvbWV0cnkgZXh0ZW5kcyBHZW9tZXRyeXtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKXtcbiAgICAgICAgICAgIHZhciBnZW9tID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGdlb207XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF93aWR0aDpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgd2lkdGgoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgd2lkdGgod2lkdGg6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9oZWlnaHQ6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGhlaWdodCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgaGVpZ2h0KGhlaWdodDpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZGVwdGg6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGRlcHRoKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVwdGg7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGRlcHRoKGRlcHRoOm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9kZXB0aCA9IGRlcHRoO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVWZXJ0aWNlc0J1ZmZlcigpe1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgICAgIGRlcHRoID0gdGhpcy5fZGVwdGgsXG4gICAgICAgICAgICAgICAgbGVmdCA9IC13aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgcmlnaHQgPSB3aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgdXAgPSBoZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIGRvd24gPSAtaGVpZ2h0IC8gMixcbiAgICAgICAgICAgICAgICBmcm9udCA9IGRlcHRoIC8gMixcbiAgICAgICAgICAgICAgICBiYWNrID0gLWRlcHRoIC8yO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyLkFycmF5QnVmZmVyLmNyZWF0ZShuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQsIHVwLCBmcm9udCwgbGVmdCwgdXAsIGZyb250LCAgbGVmdCwgZG93biwgZnJvbnQsICByaWdodCwgZG93biwgZnJvbnQsICAvLyB2MC12MS12Mi12MyBmcm9udFxuICAgICAgICAgICAgICAgICAgICByaWdodCwgdXAsIGZyb250LCAgcmlnaHQsIGRvd24sIGZyb250LCAgcmlnaHQsIGRvd24sIGJhY2ssICByaWdodCwgdXAsIGJhY2ssICAvLyB2MC12My12NC12NSByaWdodFxuICAgICAgICAgICAgICAgICAgICByaWdodCwgdXAsIGZyb250LCAgcmlnaHQsIHVwLCBiYWNrLCAgbGVmdCwgdXAsIGJhY2ssICBsZWZ0LCB1cCwgZnJvbnQsICAvLyB2MC12NS12Ni12MSB1cFxuICAgICAgICAgICAgICAgICAgICBsZWZ0LCB1cCwgZnJvbnQsICBsZWZ0LCB1cCwgYmFjaywgIGxlZnQsIGRvd24sIGJhY2ssICBsZWZ0LCBkb3duLCBmcm9udCwgIC8vIHYxLXY2LXY3LXYyIGxlZnRcbiAgICAgICAgICAgICAgICAgICAgbGVmdCwgZG93biwgYmFjaywgIHJpZ2h0LCBkb3duLCBiYWNrLCAgcmlnaHQsIGRvd24sIGZyb250LCAgbGVmdCwgZG93biwgZnJvbnQsICAvLyB2Ny12NC12My12MiBkb3duXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0LCBkb3duLCBiYWNrLCAgbGVmdCwgZG93biwgYmFjaywgIGxlZnQsIHVwLCBiYWNrLCAgcmlnaHQsIHVwLCBiYWNrLy8gdjQtdjctdjYtdjUgYmFja1xuICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIDMsIHJlbmRlci5CdWZmZXJUeXBlLkZMT0FUKVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVJbmRpY2VzQnVmZmVyKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyLkVsZW1lbnRCdWZmZXIuY3JlYXRlKG5ldyBVaW50MTZBcnJheShbXG4gICAgICAgICAgICAgICAgMCwgMSwgMiwgICAwLCAyLCAzLCAgICAvLyBmcm9udFxuICAgICAgICAgICAgICAgIDQsIDUsIDYsICAgNCwgNiwgNywgICAgLy8gcmlnaHRcbiAgICAgICAgICAgICAgICA4LCA5LDEwLCAgIDgsMTAsMTEsICAgIC8vIHVwXG4gICAgICAgICAgICAgICAgMTIsMTMsMTQsICAxMiwxNCwxNSwgICAgLy8gbGVmdFxuICAgICAgICAgICAgICAgIDE2LDE3LDE4LCAgMTYsMTgsMTksICAgIC8vIGRvd25cbiAgICAgICAgICAgICAgICAyMCwyMSwyMiwgIDIwLDIyLDIzICAgICAvLyBiYWNrXG4gICAgICAgICAgICBdKSwgcmVuZGVyLkJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBSZWN0R2VvbWV0cnkgZXh0ZW5kcyBHZW9tZXRyeXtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKXtcbiAgICAgICAgICAgICAgICB2YXIgZ2VvbSA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VvbTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF93aWR0aDpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgd2lkdGgoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgd2lkdGgod2lkdGg6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9oZWlnaHQ6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGhlaWdodCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgaGVpZ2h0KGhlaWdodDpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVWZXJ0aWNlc0J1ZmZlcigpe1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gdGhpcy5faGVpZ2h0LFxuICAgICAgICAgICAgbGVmdCA9IC13aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgcmlnaHQgPSB3aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgdXAgPSBoZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIGRvd24gPSAtaGVpZ2h0IC8gMjtcblxuICAgICAgICAgICAgcmV0dXJuIHJlbmRlci5BcnJheUJ1ZmZlci5jcmVhdGUobmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgICAgICAgcmlnaHQsIHVwLCAwLFxuICAgICAgICAgICAgICAgIGxlZnQsIHVwLCAwLFxuICAgICAgICAgICAgICAgIGxlZnQsIGRvd24sIDAsXG4gICAgICAgICAgICAgICAgcmlnaHQsIGRvd24sIDBcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgIDMsIHJlbmRlci5CdWZmZXJUeXBlLkZMT0FUKVxuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVJbmRpY2VzQnVmZmVyKCl7XG4gICAgICAgICAgICByZXR1cm4gcmVuZGVyLkVsZW1lbnRCdWZmZXIuY3JlYXRlKG5ldyBVaW50MTZBcnJheShbXG4gICAgICAgICAgICAgICAgMCwgMSwgMiwgICAwLCAyLCAzXG4gICAgICAgICAgICBdKSwgcmVuZGVyLkJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIm1vZHVsZSBkeXtcbiAgICBleHBvcnQgZW51bSBTcGhlcmVEcmF3TW9kZXtcbiAgICAgICAgTEFUSVRVREVMT05HVElUVURFLFxuICAgICAgICBERUNPTVBPU0lUSU9OXG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIFNwaGVyZUdlb21ldHJ5IGV4dGVuZHMgR2VvbWV0cnl7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCl7XG4gICAgICAgICAgICB2YXIgZ2VvbSA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBnZW9tO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcmFkaXVzOm51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCByYWRpdXMoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYWRpdXM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHJhZGl1cyhyYWRpdXM6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2RyYXdNb2RlOlNwaGVyZURyYXdNb2RlID0gbnVsbDtcbiAgICAgICAgZ2V0IGRyYXdNb2RlKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHJhd01vZGU7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGRyYXdNb2RlKGRyYXdNb2RlOlNwaGVyZURyYXdNb2RlKXtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdNb2RlID0gZHJhd01vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zZWdtZW50czpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgc2VnbWVudHMoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zZWdtZW50cztcbiAgICAgICAgfVxuICAgICAgICBzZXQgc2VnbWVudHMoc2VnbWVudHM6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3NlZ21lbnRzID0gc2VnbWVudHM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9kYXRhOntcbiAgICAgICAgICAgIHZlcnRpY2VzO1xuICAgICAgICAgICAgaW5kaWNlc1xuICAgICAgICB9ID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgaW5pdCgpe1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2NvbXB1dGVEYXRhKHRoaXMuX3JhZGl1cywgdGhpcy5fZHJhd01vZGUsIHRoaXMuX3NlZ21lbnRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBjb21wdXRlVmVydGljZXNCdWZmZXIoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhLnZlcnRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGNvbXB1dGVJbmRpY2VzQnVmZmVyKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5pbmRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY29tcHV0ZURhdGEocmFkaXVzOm51bWJlciwgZHJhd01vZGU6U3BoZXJlRHJhd01vZGUsIHNlZ21lbnRzOm51bWJlcil7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKGRyYXdNb2RlID09PSBTcGhlcmVEcmF3TW9kZS5MQVRJVFVERUxPTkdUSVRVREUpe1xuICAgICAgICAgICAgICAgIGRhdGEgPSBHZXREYXRhQnlMYXRpdHVkZUxvbmd0aXR1ZGUuY3JlYXRlKHJhZGl1cywgc2VnbWVudHMpLmdldERhdGEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZHJhd01vZGUgPT09IFNwaGVyZURyYXdNb2RlLkRFQ09NUE9TSVRJT04pe1xuICAgICAgICAgICAgICAgIGRhdGEgPSBHZXREYXRhQnlEZWNvbXBvc2l0aW9uLmNyZWF0ZShyYWRpdXMsIHNlZ21lbnRzKS5nZXREYXRhKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgR2V0RGF0YUJ5TGF0aXR1ZGVMb25ndGl0dWRle1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShyYWRpdXM6bnVtYmVyLCBiYW5kczpudW1iZXIpOkdldERhdGFCeUxhdGl0dWRlTG9uZ3RpdHVkZSB7XG4gICAgICAgICAgICB2YXIgZ2VvbSA9IG5ldyB0aGlzKHJhZGl1cywgYmFuZHMpO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2VvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3ZlcnRpY2VzOm51bWJlcltdID0gW107XG4gICAgICAgIGdldCB2ZXJ0aWNlcygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnRpY2VzO1xuICAgICAgICB9XG4gICAgICAgIHNldCB2ZXJ0aWNlcyh2ZXJ0aWNlczpudW1iZXJbXSl7XG4gICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcyA9IHZlcnRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfaW5kaWNlczpudW1iZXJbXSA9IFtdO1xuICAgICAgICBnZXQgaW5kaWNlcygpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luZGljZXM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGluZGljZXMoaW5kaWNlczpudW1iZXJbXSl7XG4gICAgICAgICAgICB0aGlzLl9pbmRpY2VzID0gaW5kaWNlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3JhZGl1czpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9sYXRpdHVkZUJhbmRzOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX2xvbmdpdHVkZUJhbmRzOm51bWJlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IocmFkaXVzLCBiYW5kcyl7XG4gICAgICAgICAgICB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XG4gICAgICAgICAgICB0aGlzLl9sYXRpdHVkZUJhbmRzID0gYmFuZHM7XG4gICAgICAgICAgICB0aGlzLl9sb25naXR1ZGVCYW5kcyA9IGJhbmRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldERhdGEoKXtcbiAgICAgICAgICAgIC8v57u05bqmXG4gICAgICAgICAgICBmb3IgKHZhciBsYXROdW1iZXIgPSAwOyBsYXROdW1iZXIgPD0gdGhpcy5fbGF0aXR1ZGVCYW5kczsgbGF0TnVtYmVyKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGhldGEgPSBsYXROdW1iZXIgKiBNYXRoLlBJIC8gdGhpcy5fbGF0aXR1ZGVCYW5kcztcbiAgICAgICAgICAgICAgICB2YXIgc2luVGhldGEgPSBNYXRoLnNpbih0aGV0YSk7XG4gICAgICAgICAgICAgICAgdmFyIGNvc1RoZXRhID0gTWF0aC5jb3ModGhldGEpO1xuXG4gICAgICAgICAgICAgICAgLy/nu4/luqZcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBsb25nTnVtYmVyID0gMDsgbG9uZ051bWJlciA8PSB0aGlzLl9sb25naXR1ZGVCYW5kczsgbG9uZ051bWJlcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwaGkgPSBsb25nTnVtYmVyICogMiAqIE1hdGguUEkgLyB0aGlzLl9sb25naXR1ZGVCYW5kcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNpblBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3NQaGkgPSBNYXRoLmNvcyhwaGkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHggPSB0aGlzLl9yYWRpdXMgKiBjb3NQaGkgKiBzaW5UaGV0YSArIHBvaW50WDtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgeSA9IHRoaXMuX3JhZGl1cyAqY29zVGhldGEgKyBwb2ludFk7XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIHogPSB0aGlzLl9yYWRpdXMgKnNpblBoaSAqIHNpblRoZXRhICsgcG9pbnRaO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IHRoaXMuX3JhZGl1cyAqIGNvc1BoaSAqIHNpblRoZXRhO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeSA9IHRoaXMuX3JhZGl1cyAqY29zVGhldGE7XG4gICAgICAgICAgICAgICAgICAgIHZhciB6ID0gdGhpcy5fcmFkaXVzICpzaW5QaGkgKiBzaW5UaGV0YTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHUgPSAxIC0gKGxvbmdOdW1iZXIgLyB0aGlzLl9sb25naXR1ZGVCYW5kcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2ID0gMSAtIChsYXROdW1iZXIgLyB0aGlzLl9sYXRpdHVkZUJhbmRzKTtcblxuICAgICAgICAgICAgICAgICAgICAvL25vcm1hbHMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgLy9ub3JtYWxzLnB1c2goeSk7XG4gICAgICAgICAgICAgICAgICAgIC8vbm9ybWFscy5wdXNoKHopO1xuICAgICAgICAgICAgICAgICAgICAvL3RleENvb3Jkcy5wdXNoKHUpO1xuICAgICAgICAgICAgICAgICAgICAvL3RleENvb3Jkcy5wdXNoKHYpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcy5wdXNoKHkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92ZXJ0aWNlcy5wdXNoKHopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgICAgIC8vdGhpcy5f5LiA5ZyI5pyJ57uP5bqm54K5bG9uZ2l0dWRlQmFuZHPkuKpcbiAgICAgICAgICAgIGZvciAodmFyIGxhdE51bWJlciA9IDA7IGxhdE51bWJlciA8IHRoaXMuX2xhdGl0dWRlQmFuZHM7IGxhdE51bWJlcisrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbG9uZ051bWJlciA9IDA7IGxvbmdOdW1iZXIgPCB0aGlzLl9sb25naXR1ZGVCYW5kczsgbG9uZ051bWJlcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9IGxhdE51bWJlciAqICh0aGlzLl9sb25naXR1ZGVCYW5kcyArIDEpICsgbG9uZ051bWJlcjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNlY29uZCA9IGZpcnN0ICsgdGhpcy5fbG9uZ2l0dWRlQmFuZHMgKyAxO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzLnB1c2goZmlyc3QpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzLnB1c2goc2Vjb25kKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlcy5wdXNoKGZpcnN0ICsgMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlcy5wdXNoKHNlY29uZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2luZGljZXMucHVzaChzZWNvbmQgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faW5kaWNlcy5wdXNoKGZpcnN0ICsgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzOiByZW5kZXIuQXJyYXlCdWZmZXIuY3JlYXRlKG5ldyBGbG9hdDMyQXJyYXkodGhpcy5fdmVydGljZXMpLFxuICAgICAgICAgICAgICAgICAgICAzLCByZW5kZXIuQnVmZmVyVHlwZS5GTE9BVCksXG4gICAgICAgICAgICAgICAgaW5kaWNlczogcmVuZGVyLkVsZW1lbnRCdWZmZXIuY3JlYXRlKG5ldyBVaW50MTZBcnJheSh0aGlzLl9pbmRpY2VzKSxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyLkJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQpXG4gICAgICAgICAgICAgICAgLy9ub3JtYWxzOiBuZXcgRmxvYXQzMkFycmF5KG5vcm1hbHMpLFxuICAgICAgICAgICAgICAgIC8vdGV4Q29vcmRzOiBuZXcgRmxvYXQzMkFycmF5KHRleENvb3JkcylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgY2xhc3MgR2V0RGF0YUJ5RGVjb21wb3NpdGlvbntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUocmFkaXVzOm51bWJlciwgY291bnQ6bnVtYmVyKTpHZXREYXRhQnlEZWNvbXBvc2l0aW9uIHtcbiAgICAgICAgICAgIHZhciBnZW9tID0gbmV3IHRoaXMocmFkaXVzLCBjb3VudCk7XG5cbiAgICAgICAgICAgIHJldHVybiBnZW9tO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdmVydGljZXM6bnVtYmVyW10gPSBbXTtcbiAgICAgICAgZ2V0IHZlcnRpY2VzKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmVydGljZXM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHZlcnRpY2VzKHZlcnRpY2VzOm51bWJlcltdKXtcbiAgICAgICAgICAgIHRoaXMuX3ZlcnRpY2VzID0gdmVydGljZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9pbmRpY2VzOm51bWJlcltdID0gW107XG4gICAgICAgIGdldCBpbmRpY2VzKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5kaWNlcztcbiAgICAgICAgfVxuICAgICAgICBzZXQgaW5kaWNlcyhpbmRpY2VzOm51bWJlcltdKXtcbiAgICAgICAgICAgIHRoaXMuX2luZGljZXMgPSBpbmRpY2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdkxlbjpudW1iZXIgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9yYWRpdXM6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfY291bnQ6bnVtYmVyID0gbnVsbDtcblxuICAgICAgICBjb25zdHJ1Y3RvcihyYWRpdXMsIGNvdW50KXtcbiAgICAgICAgICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcbiAgICAgICAgICAgIHRoaXMuX2NvdW50ID0gY291bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL3RvZG8gYWRkIHRleENvb3Jkc1xuICAgICAgICBwdWJsaWMgZ2V0RGF0YSgpe1xuICAgICAgICAgICAgdmFyIG9yaWdpblZlcnRpY2VzID0gW1xuICAgICAgICAgICAgICAgIFt0aGlzLl9yYWRpdXMsIDAsIDBdLFxuICAgICAgICAgICAgICAgIFstdGhpcy5fcmFkaXVzLCAwLCAwXSxcbiAgICAgICAgICAgICAgICBbMCwgdGhpcy5fcmFkaXVzLCAwXSxcbiAgICAgICAgICAgICAgICBbMCwgLXRoaXMuX3JhZGl1cywgMF0sXG4gICAgICAgICAgICAgICAgWzAsIDAsIHRoaXMuX3JhZGl1c10sXG4gICAgICAgICAgICAgICAgWzAsIDAsIC10aGlzLl9yYWRpdXNdXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdmFyIG9yaWdpbkluZGljZXMgPSBbXG4gICAgICAgICAgICAgICAgLy9bMiw0LDBdLFsyLDAsNV0sWzIsNSwxXSxbMiwxLDRdLCAgIFszLDAsNF0sWzMsNSwwXSxbMywxLDVdLFszLDQsMV1cbiAgICAgICAgICAgICAgICAvL1syLDQsMF1cbiAgICAgICAgICAgICAgICBbMiw0LDBdLFsyLDAsNV0sWzIsNSwxXSxbMiwxLDRdLFxuICAgICAgICAgICAgICAgIFszLDAsNF0sWzMsNSwwXSxbMywxLDVdLFszLDQsMV1cbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHRoaXMuX3ZMZW4gPSBvcmlnaW5WZXJ0aWNlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIHZhciBqID0gMDtcbiAgICAgICAgICAgIHZhciBsZW4gPSBvcmlnaW5WZXJ0aWNlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IGxlbjsgaiArKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmVydGljZXMgPSB0aGlzLl92ZXJ0aWNlcy5jb25jYXQob3JpZ2luVmVydGljZXNbal0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaiA9IDAsXG4gICAgICAgICAgICAgICAgbGVuID0gb3JpZ2luSW5kaWNlcy5sZW5ndGg7ICAvLzjpnaLkvZNcblxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxlbjsgaiArKyl7XG4gICAgICAgICAgICAgICAgLy9mb3IgKGkgPSAwOyBpIDwgdGhpcy5fY291bnQ7IGkrKyl7XG4gICAgICAgICAgICAgICAgLy90aGlzLl92ZXJ0aWNlcyA9IHRoaXMuX3ZlcnRpY2VzLmNvbmNhdChvcmlnaW5WZXJ0aWNlc1tvcmlnaW5JbmRpY2VzW2pdWzBdXSxcbiAgICAgICAgICAgICAgICAvLyAgICBvcmlnaW5WZXJ0aWNlc1tvcmlnaW5JbmRpY2VzW2pdWzFdXSxcbiAgICAgICAgICAgICAgICAvLyAgICBvcmlnaW5WZXJ0aWNlc1tvcmlnaW5JbmRpY2VzW2pdWzJdXSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9zdWJEaXZpZGUob3JpZ2luVmVydGljZXNbb3JpZ2luSW5kaWNlc1tqXVswXV0sXG4gICAgICAgICAgICAgICAgICAgIG9yaWdpblZlcnRpY2VzW29yaWdpbkluZGljZXNbal1bMV1dLFxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5WZXJ0aWNlc1tvcmlnaW5JbmRpY2VzW2pdWzJdXSxcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luSW5kaWNlc1tqXSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY291bnQsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JhZGl1cyk7XG5cbiAgICAgICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZlcnRpY2VzOiByZW5kZXIuQXJyYXlCdWZmZXIuY3JlYXRlKG5ldyBGbG9hdDMyQXJyYXkodGhpcy5fdmVydGljZXMpLFxuICAgICAgICAgICAgICAgICAgICAzLCByZW5kZXIuQnVmZmVyVHlwZS5GTE9BVCksXG4gICAgICAgICAgICAgICAgaW5kaWNlczogcmVuZGVyLkVsZW1lbnRCdWZmZXIuY3JlYXRlKG5ldyBVaW50MTZBcnJheSh0aGlzLl9pbmRpY2VzKSxcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyLkJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zdWJEaXZpZGUodjE6bnVtYmVyW10sIHYyOm51bWJlcltdLCB2MzpudW1iZXJbXSwgaW5kOm51bWJlcltdLGNvdW50Om51bWJlciwgcmFkaXVzOm51bWJlcik6IHZvaWR7XG4gICAgICAgICAgICBpZihjb3VudCA8PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbmRpY2VzID0gdGhpcy5faW5kaWNlcy5jb25jYXQoaW5kKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICB2YXIgdjEyID0gW10sXG4gICAgICAgICAgICAgICAgdjIzID0gW10sXG4gICAgICAgICAgICAgICAgdjMxID0gW107XG5cbiAgICAgICAgICAgIC8v5rGC5ZCR6YeP5Lit5b+D54K5XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCAzOyBpKyspe1xuICAgICAgICAgICAgICAgIHYxMltpXSA9ICh2MVtpXSt2MltpXSkvMjsgIC8v5rGC5Y+W562J5YiG55qE5Lit54K55Z2Q5qCHXG4gICAgICAgICAgICAgICAgdjIzW2ldID0gKHYyW2ldK3YzW2ldKS8yO1xuICAgICAgICAgICAgICAgIHYzMVtpXSA9ICh2M1tpXSt2MVtpXSkvMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/mqKHplb/mianlsZVcbiAgICAgICAgICAgIHRoaXMuX25vcm1hbGl6ZSh2MTIsIHJhZGl1cyk7XG4gICAgICAgICAgICB0aGlzLl9ub3JtYWxpemUodjIzLCByYWRpdXMpO1xuICAgICAgICAgICAgdGhpcy5fbm9ybWFsaXplKHYzMSwgcmFkaXVzKTtcblxuICAgICAgICAgICAgdGhpcy5fdmVydGljZXMgPSB0aGlzLl92ZXJ0aWNlcy5jb25jYXQodjEyLCB2MjMsIHYzMSk7XG5cbiAgICAgICAgICAgIHZhciBpVjEgPSBpbmRbMF0sXG4gICAgICAgICAgICAgICAgaVYyID0gaW5kWzFdLFxuICAgICAgICAgICAgICAgIGlWMyA9IGluZFsyXSxcbiAgICAgICAgICAgICAgICBpVjEyID10aGlzLl92TGVuLFxuICAgICAgICAgICAgICAgIGlWMjMgPXRoaXMuX3ZMZW4gKyAxLFxuICAgICAgICAgICAgICAgIGlWMzEgPXRoaXMuX3ZMZW4gKyAyO1xuXG4gICAgICAgICAgICB2YXIgaW4xID1bXG4gICAgICAgICAgICAgICAgaVYxLCBpVjEyLCBpVjMxXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdmFyIGluMiA9W1xuICAgICAgICAgICAgICAgIGlWMzEsIGlWMTIsIGlWMjNcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB2YXIgaW4zID1bXG4gICAgICAgICAgICAgICAgaVYxMiwgaVYyLCBpVjIzXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdmFyIGluNCA9W1xuICAgICAgICAgICAgICAgIGlWMzEsIGlWMjMsIGlWM1xuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgdGhpcy5fdkxlbiA9dGhpcy5fdkxlbiArIDM7XG5cblxuXG4gICAgICAgICAgICAvL+e7p+e7reWIh+WIhuS4ieinkuW9olxuICAgICAgICAgICAgdGhpcy5fc3ViRGl2aWRlKHYxLHYxMix2MzEsaW4xLCBjb3VudC0xLCByYWRpdXMpOyAvL+WvueaJgOS6p+eUn+eahDTkuKrmlrDnmoTkuInop5LpnaLlho3ov5vooYznrYnliIZcbiAgICAgICAgICAgIHRoaXMuX3N1YkRpdmlkZSh2MzEsdjEyLCB2MjMsIGluMiwgY291bnQtMSwgcmFkaXVzKTtcbiAgICAgICAgICAgIHRoaXMuX3N1YkRpdmlkZSh2MTIsIHYyLCB2MjMsIGluMywgY291bnQtMSwgcmFkaXVzKTtcbiAgICAgICAgICAgIHRoaXMuX3N1YkRpdmlkZSh2MzEsIHYyMywgdjMsIGluNCwgY291bnQtMSwgcmFkaXVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX25vcm1hbGl6ZSh2Om51bWJlcltdLCByYWRpdXM6bnVtYmVyKTogbnVtYmVyW117XG4gICAgICAgICAgICB2YXIgZCA9IE1hdGguc3FydChcbiAgICAgICAgICAgICAgICB2WzBdICogdlswXSArIHZbMV0gKiB2WzFdICsgdlsyXSAqIHZbMl1cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGlmKGQgPT09IDApe1xuICAgICAgICAgICAgICAgIHJldHVybiBbMCwgMCwgMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZbMF0gPSByYWRpdXMgKiB2WzBdIC8gZDtcbiAgICAgICAgICAgIHZbMV0gPSByYWRpdXMgKiB2WzFdIC8gZDtcbiAgICAgICAgICAgIHZbMl0gPSByYWRpdXMgKiB2WzJdIC8gZDtcblxuICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgVHJpYW5nbGVHZW9tZXRyeSBleHRlbmRzIEdlb21ldHJ5e1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpe1xuICAgICAgICAgICAgdmFyIGdlb20gPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2VvbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3dpZHRoOm51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCB3aWR0aCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgICAgICB9XG4gICAgICAgIHNldCB3aWR0aCh3aWR0aDpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2hlaWdodDpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgaGVpZ2h0KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHNldCBoZWlnaHQoaGVpZ2h0Om51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgY29tcHV0ZVZlcnRpY2VzQnVmZmVyKCl7XG4gICAgICAgICAgICB2YXIgd2lkdGggPSB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSB0aGlzLl9oZWlnaHQsXG4gICAgICAgICAgICAgICAgbGVmdCA9IC13aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgcmlnaHQgPSB3aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgdXAgPSBoZWlnaHQgLyAyLFxuICAgICAgICAgICAgICAgIGRvd24gPSAtaGVpZ2h0IC8gMjtcblxuICAgICAgICAgICAgcmV0dXJuIHJlbmRlci5BcnJheUJ1ZmZlci5jcmVhdGUobmV3IEZsb2F0MzJBcnJheShbXG4gICAgICAgICAgICAgICAgICAgIDAuMCwgdXAsIDAsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQsIGRvd24sIDAsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0LCBkb3duLCAwXG4gICAgICAgICAgICAgICAgXSksXG4gICAgICAgICAgICAgICAgMywgcmVuZGVyLkJ1ZmZlclR5cGUuRkxPQVQpXG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgY29tcHV0ZUluZGljZXNCdWZmZXIoKXtcbiAgICAgICAgICAgIHJldHVybiByZW5kZXIuRWxlbWVudEJ1ZmZlci5jcmVhdGUobmV3IFVpbnQ4QXJyYXkoW1xuICAgICAgICAgICAgICAgIDAsIDEsIDJcbiAgICAgICAgICAgIF0pLCByZW5kZXIuQnVmZmVyVHlwZS5VTlNJR05FRF9CWVRFKVxuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgQmVoYXZpb3IgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHB1YmxpYyB1cGRhdGUodGltZSl7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgLy90b2RvIGFkZCBiYWNrZ3JvdW5kQ29sb3JcbiAgICAvL3RvZG8gYWRkIEZydXN0dW0/XG5cbiAgICBleHBvcnQgY2xhc3MgQ2FtZXJhIGV4dGVuZHMgQmVoYXZpb3J7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgY2FtZXJhVG9Xb3JsZE1hdHJpeCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNmb3JtLmxvY2FsVG9Xb3JsZE1hdHJpeC5jb3B5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgd29ybGRUb0NhbWVyYU1hdHJpeCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FtZXJhVG9Xb3JsZE1hdHJpeC5pbnZlcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3BNYXRyaXg6TWF0cml4ID0gTWF0cml4LmNyZWF0ZSgpO1xuICAgICAgICBnZXQgcE1hdHJpeCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BNYXRyaXg7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHBNYXRyaXgocE1hdHJpeDpNYXRyaXgpe1xuICAgICAgICAgICAgdGhpcy5fcE1hdHJpeCA9IHBNYXRyaXg7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF92TWF0cml4Ok1hdHJpeCA9IE1hdHJpeC5jcmVhdGUoKTtcbiAgICAgICAgZ2V0IHZNYXRyaXgoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92TWF0cml4O1xuICAgICAgICB9XG4gICAgICAgIHNldCB2TWF0cml4KHZNYXRyaXg6TWF0cml4KXtcbiAgICAgICAgICAgIHRoaXMuX3ZNYXRyaXggPSB2TWF0cml4O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZXllOlZlY3RvcjMgPSBudWxsO1xuICAgICAgICBnZXQgZXllKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXllO1xuICAgICAgICB9XG4gICAgICAgIHNldCBleWUoZXllOlZlY3RvcjMpe1xuICAgICAgICAgICAgdGhpcy5fZXllID0gZXllO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY2VudGVyOlZlY3RvcjMgPSBudWxsO1xuICAgICAgICBnZXQgY2VudGVyKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY2VudGVyO1xuICAgICAgICB9XG4gICAgICAgIHNldCBjZW50ZXIoY2VudGVyOlZlY3RvcjMpe1xuICAgICAgICAgICAgdGhpcy5fY2VudGVyID0gY2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdXA6VmVjdG9yMyA9IG51bGw7XG4gICAgICAgIGdldCB1cCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VwO1xuICAgICAgICB9XG4gICAgICAgIHNldCB1cCh1cDpWZWN0b3IzKXtcbiAgICAgICAgICAgIHRoaXMuX3VwID0gdXA7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9mb3Z5Om51bWJlcj0gbnVsbDtcbiAgICAgICAgZ2V0IGZvdnkoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3Z5O1xuICAgICAgICB9XG4gICAgICAgIHNldCBmb3Z5KGZvdnk6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX2ZvdnkgPSBmb3Z5O1xuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfYXNwZWN0Om51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCBhc3BlY3QoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hc3BlY3Q7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGFzcGVjdChhc3BlY3Q6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX2FzcGVjdCA9IGFzcGVjdDtcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX25lYXI6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IG5lYXIoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uZWFyO1xuICAgICAgICB9XG4gICAgICAgIHNldCBuZWFyKG5lYXI6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX25lYXIgPSBuZWFyO1xuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZmFyOm51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCBmYXIoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mYXI7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGZhcihmYXI6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX2ZhciA9IGZhcjtcbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2RpcnR5OmJvb2xlYW4gPSBmYWxzZTtcblxuICAgICAgICBwdWJsaWMgaW5pdCgpe1xuICAgICAgICAgICAgdGhpcy5fcE1hdHJpeC5zZXRQZXJzcGVjdGl2ZSh0aGlzLl9mb3Z5LCB0aGlzLl9hc3BlY3QsIHRoaXMuX25lYXIsIHRoaXMuX2Zhcik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29tcHV0ZVZwTWF0cml4KCl7XG4gICAgICAgICAgICB2YXIgbWF0cml4ID0gTWF0cml4LmNyZWF0ZSgpO1xuXG4gICAgICAgICAgICBtYXRyaXguYXBwbHlNYXRyaXgodGhpcy53b3JsZFRvQ2FtZXJhTWF0cml4KTtcbiAgICAgICAgICAgIG1hdHJpeC5hcHBseU1hdHJpeCh0aGlzLl9wTWF0cml4KTtcblxuICAgICAgICAgICAgcmV0dXJuIG1hdHJpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB6b29tSW4oc3BlZWQ6bnVtYmVyLCBtaW46bnVtYmVyID0gMSl7XG4gICAgICAgICAgICB0aGlzLl9mb3Z5ID0gTWF0aC5tYXgodGhpcy5fZm92eSAtIHNwZWVkLCBtaW4pO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB6b29tT3V0KHNwZWVkOm51bWJlciwgbWF4Om51bWJlciA9IDE3OSl7XG4gICAgICAgICAgICB0aGlzLl9mb3Z5ID0gTWF0aC5taW4odGhpcy5fZm92eSArIHNwZWVkLCBtYXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZSh0aW1lKXtcbiAgICAgICAgICAgIGlmKHRoaXMuX2RpcnR5KXtcbiAgICAgICAgICAgICAgICB0aGlzLl9wTWF0cml4LnNldFBlcnNwZWN0aXZlKHRoaXMuX2ZvdnksIHRoaXMuX2FzcGVjdCwgdGhpcy5fbmVhciwgdGhpcy5fZmFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIEFjdGlvbiBleHRlbmRzIEJlaGF2aW9ye1xuICAgICAgICAvKiF0byBhdm9pZCBiZSBkdXBsaWNhdGUgd2l0aCBjaGlsZCBjbGFzcydzIHByaXZhdGUgYXR0cmlidXRlKi9cbiAgICAgICAgcHJpdmF0ZSBkeV9pc0ZpbmlzaDpib29sZWFuID0gZmFsc2U7XG4gICAgICAgIGdldCBpc0ZpbmlzaCgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZHlfaXNGaW5pc2g7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGlzRmluaXNoKGlzRmluaXNoOmJvb2xlYW4pe1xuICAgICAgICAgICAgdGhpcy5keV9pc0ZpbmlzaCA9IGlzRmluaXNoO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGlzU3RhcnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuaXNTdG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IGlzU3RvcCgpIHtcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaXNQYXVzZSgpIHtcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKiFcbiAgICAgICAgYWRkIFwicF9cIiBwcmVmaXggdG8gYXZvaWQgYmUgZHVwbGljYXRlIHdpdGggdGhlIGdldHRlclxuICAgICAgICAgKi9cbiAgICAgICAgcHJvdGVjdGVkIHBfdGFyZ2V0OkdhbWVPYmplY3QgPSBudWxsO1xuICAgICAgICBnZXQgdGFyZ2V0KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wX3RhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdGFyZ2V0KHRhcmdldDpHYW1lT2JqZWN0KXtcbiAgICAgICAgICAgIHRoaXMucF90YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgICAgICB0aGlzLmR5X2lzRmluaXNoID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdXBkYXRlKHRpbWU6bnVtYmVyKXtcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhcnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0b3AoKSB7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHBhdXNlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZXN1bWUoKSB7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHkoKSB7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJldmVyc2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGZpbmlzaCgpe1xuICAgICAgICAgICAgdGhpcy5keV9pc0ZpbmlzaCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICAvL3RvZG8gYWRkIGhvb2sgbWV0aG9kIGxpa2Ugb25FbnRlci9vbkV4aXQ/XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBBY3Rpb25JbnN0YW50IGV4dGVuZHMgQWN0aW9uIHtcbiAgICAgICAgZ2V0IGlzU3RvcCgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCBpc1BhdXNlKCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXJ0KCkge1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0b3AoKSB7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcGF1c2UoKSB7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVzdW1lKCkge1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIENhbGxGdW5jIGV4dGVuZHMgQWN0aW9uSW5zdGFudHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZnVuYzpGdW5jdGlvbiwgY29udGV4dDphbnksIC4uLmRhdGEpIHtcbiAgICAgICAgICAgIHZhciBkYXRhQXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSxcbiAgICAgICAgICAgICAgICBhY3Rpb24gPSBuZXcgdGhpcyhmdW5jLCBjb250ZXh0LCBkYXRhQXJyKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKGZ1bmM6RnVuY3Rpb24sIGNvbnRleHQ6YW55LCBkYXRhQXJyOkFycmF5PGFueT4pe1xuICAgICAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5fY29udGV4dCA9IGNvbnRleHQgfHwgd2luZG93O1xuICAgICAgICAgICAgdGhpcy5fY2FsbEZ1bmMgPSBmdW5jO1xuICAgICAgICAgICAgdGhpcy5fZGF0YUFyciA9IGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGU8YW55PihkYXRhQXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NvbnRleHQ6YW55ID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfY2FsbEZ1bmM6RnVuY3Rpb24gPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9kYXRhQXJyOmR5Q2IuQ29sbGVjdGlvbjxhbnk+ID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHB1YmxpYyB1cGRhdGUodGltZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxGdW5jKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbEZ1bmMuY2FsbCh0aGlzLl9jb250ZXh0LCB0aGlzLnRhcmdldCwgdGhpcy5fZGF0YUFycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgcHVibGljIGNvcHkoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IENhbGxGdW5jKHRoaXMuX2NvbnRleHQsIHRoaXMuX2NhbGxGdW5jLCB0aGlzLl9kYXRhQXJyLmNvcHkodHJ1ZSkuZ2V0Q2hpbGRyZW4oKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBleHBvcnQgY2xhc3MgQWN0aW9uSW50ZXJ2YWwgZXh0ZW5kcyBBY3Rpb257XG4gICAgICAgIHByb3RlY3RlZCBlbGFwc2VkOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByb3RlY3RlZCBkdXJhdGlvbjpudW1iZXIgPSBudWxsO1xuXG4gICAgICAgIHByaXZhdGUgX2lzU3RvcDpib29sZWFuID0gdHJ1ZTtcbiAgICAgICAgcHJpdmF0ZSBfaXNQYXVzZTpib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHByaXZhdGUgX3RpbWVDb250cm9sbGVyOkNvbW1vblRpbWVDb250cm9sbGVyID0gQ29tbW9uVGltZUNvbnRyb2xsZXIuY3JlYXRlKCk7XG5cbiAgICAgICAgZ2V0IGlzU3RvcCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1N0b3A7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaXNQYXVzZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pc1BhdXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZSh0aW1lOm51bWJlcil7XG4gICAgICAgICAgICBpZiAodGltZSA8IHRoaXMuX3RpbWVDb250cm9sbGVyLnN0YXJ0VGltZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbGFwc2VkID0gdGhpcy5fY29udmVydFRvUmF0aW8odGhpcy5fdGltZUNvbnRyb2xsZXIuY29tcHV0ZUVsYXBzZVRpbWUodGltZSkpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUJvZHkodGltZSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmVsYXBzZWQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXJ0KCkge1xuICAgICAgICAgICAgdGhpcy5faXNTdG9wID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl90aW1lQ29udHJvbGxlci5zdGFydCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0b3AoKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1N0b3AgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fdGltZUNvbnRyb2xsZXIuc3RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlc2V0KCkge1xuICAgICAgICAgICAgc3VwZXIucmVzZXQoKTtcblxuICAgICAgICAgICAgdGhpcy5faXNTdG9wID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwYXVzZSgpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzUGF1c2UgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fdGltZUNvbnRyb2xsZXIucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZXN1bWUoKXtcbiAgICAgICAgICAgIHRoaXMuX2lzUGF1c2UgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVDb250cm9sbGVyLnJlc3VtZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyohIHZpcnR1YWwgbWV0aG9kICovXG4gICAgICAgIHByb3RlY3RlZCB1cGRhdGVCb2R5KHRpbWU6bnVtYmVyKXtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NvbnZlcnRUb1JhdGlvKGVsYXBzZWQ6bnVtYmVyKXtcbiAgICAgICAgICAgIHZhciByYXRpbyA9IGVsYXBzZWQgLyB0aGlzLmR1cmF0aW9uO1xuXG4gICAgICAgICAgICByZXR1cm4gcmF0aW8gPiAxID8gMSA6IHJhdGlvO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIENvbnRyb2wgZXh0ZW5kcyBBY3Rpb25JbnRlcnZhbHtcbiAgICAgICAgc2V0IHRhcmdldCh0YXJnZXQ6R2FtZU9iamVjdCl7XG4gICAgICAgICAgICB0aGlzLnBfdGFyZ2V0ID0gdGFyZ2V0O1xuXG4gICAgICAgICAgICB0aGlzLmdldElubmVyQWN0aW9ucygpLmZvckVhY2goKGFjdGlvbjpBY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBhY3Rpb24udGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5pdCgpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlcmF0ZShcImluaXRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy9wdWJsaWMgb25FbnRlcigpIHtcbiAgICAgICAgLy8gICAgdGhpcy5pdGVyYXRlKFwib25FbnRlclwiKTtcbiAgICAgICAgLy99XG4gICAgICAgIC8vcHVibGljIG9uRXhpdCgpIHtcbiAgICAgICAgLy8gICAgdGhpcy5pdGVyYXRlKFwib25FeGl0XCIpO1xuICAgICAgICAvL31cblxuICAgICAgICBwdWJsaWMgcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlcmF0ZShcInJldmVyc2VcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlc2V0KCkge1xuICAgICAgICAgICAgc3VwZXIucmVzZXQoKTtcblxuICAgICAgICAgICAgdGhpcy5pdGVyYXRlKFwicmVzZXRcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldElubmVyQWN0aW9ucygpOmR5Q2IuQ29sbGVjdGlvbjxBY3Rpb24+IHtcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgaXRlcmF0ZShtZXRob2Q6c3RyaW5nLCBhcmdBcnI/OkFycmF5PGFueT4pIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0SW5uZXJBY3Rpb25zKCkuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgYWN0aW9uW21ldGhvZF0uYXBwbHkoYWN0aW9uLCBhcmdBcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBleHBvcnQgY2xhc3MgU2VxdWVuY2UgZXh0ZW5kcyBDb250cm9se1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSguLi5hY3Rpb25zKSB7XG4gICAgICAgICAgICB2YXIgYWN0aW9uQXJyID0gbnVsbCxcbiAgICAgICAgICAgICAgICBzZXF1ZW5jZSA9IG51bGw7XG5cbiAgICAgICAgICAgIGR5Q2IuTG9nLmFzc2VydChhcmd1bWVudHMubGVuZ3RoID49IDIsIFwi5bqU6K+l5pyJMuS4quWPiuS7peS4iuWKqOS9nFwiKTtcblxuICAgICAgICAgICAgYWN0aW9uQXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcblxuICAgICAgICAgICAgc2VxdWVuY2UgPSBuZXcgdGhpcyhhY3Rpb25BcnIpO1xuXG4gICAgICAgICAgICBzZXF1ZW5jZS5pbml0V2hlbkNyZWF0ZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2VxdWVuY2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcihhY3Rpb25BcnI6QXJyYXk8QWN0aW9uPil7XG4gICAgICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zLmFkZENoaWxkcmVuKGFjdGlvbkFycik7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9hY3Rpb25zOmR5Q2IuQ29sbGVjdGlvbjxBY3Rpb24+ID0gZHlDYi5Db2xsZWN0aW9uLmNyZWF0ZTxBY3Rpb24+KCk7XG4gICAgICAgIHByaXZhdGUgX2N1cnJlbnRBY3Rpb246QWN0aW9uID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfYWN0aW9uSW5kZXg6bnVtYmVyID0gMDtcblxuICAgICAgICBwdWJsaWMgaW5pdFdoZW5DcmVhdGUoKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50QWN0aW9uID0gdGhpcy5fYWN0aW9ucy5nZXRDaGlsZCgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1cGRhdGUodGltZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGlvbkluZGV4ID09PSB0aGlzLl9hY3Rpb25zLmdldENvdW50KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fY3VycmVudEFjdGlvbiA9IHRoaXMuX2FjdGlvbnMuZ2V0Q2hpbGQodGhpcy5fYWN0aW9uSW5kZXgpO1xuXG4gICAgICAgICAgICBpZih0aGlzLl9jdXJyZW50QWN0aW9uLmlzRmluaXNoKXtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydE5leHRBY3Rpb25BbmRKdWRnZUZpbmlzaCgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50QWN0aW9uLnVwZGF0ZSh0aW1lKTtcblxuICAgICAgICAgICAgaWYodGhpcy5fY3VycmVudEFjdGlvbi5pc0ZpbmlzaCl7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnROZXh0QWN0aW9uQW5kSnVkZ2VGaW5pc2goKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29weSgpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25BcnIgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5fYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25BcnIucHVzaChhY3Rpb24uY29weSgpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gU2VxdWVuY2UuY3JlYXRlLmFwcGx5KFNlcXVlbmNlLCBhY3Rpb25BcnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlc2V0KCkge1xuICAgICAgICAgICAgc3VwZXIucmVzZXQoKTtcblxuICAgICAgICAgICAgdGhpcy5fYWN0aW9uSW5kZXggPSAwO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEFjdGlvbiA9IHRoaXMuX2FjdGlvbnMuZ2V0Q2hpbGQodGhpcy5fYWN0aW9uSW5kZXgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGFydCgpIHtcbiAgICAgICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5zdGFydE9uY2UodGhpcy5fY3VycmVudEFjdGlvbik7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50QWN0aW9uLnN0YXJ0KCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0b3AoKSB7XG4gICAgICAgICAgICBzdXBlci5zdG9wKCk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5zdG9wT25jZSh0aGlzLl9jdXJyZW50QWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3Rpb24uc3RvcCgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwYXVzZSgpIHtcbiAgICAgICAgICAgIHN1cGVyLnBhdXNlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3Rpb24ucGF1c2UoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVzdW1lKCkge1xuICAgICAgICAgICAgc3VwZXIucmVzdW1lKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3Rpb24ucmVzdW1lKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJldmVyc2UoKSB7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zLnJldmVyc2UoKTtcblxuICAgICAgICAgICAgc3VwZXIucmV2ZXJzZSgpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRJbm5lckFjdGlvbnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9ucztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3N0YXJ0TmV4dEFjdGlvbkFuZEp1ZGdlRmluaXNoKCl7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25JbmRleCArKztcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGlvbkluZGV4ID09PSB0aGlzLl9hY3Rpb25zLmdldENvdW50KCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fYWN0aW9ucy5nZXRDaGlsZCh0aGlzLl9hY3Rpb25JbmRleCkuc3RhcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBTcGF3biBleHRlbmRzIENvbnRyb2x7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgICAgICAgICAgdmFyIHNwYXduID0gbnVsbDtcblxuICAgICAgICAgICAgZHlDYi5Mb2cuYXNzZXJ0KGFyZ3VtZW50cy5sZW5ndGggPj0gMiwgXCLlupTor6XmnIky5Liq5Y+K5Lul5LiK5Yqo5L2cXCIpO1xuXG4gICAgICAgICAgICBzcGF3biA9IG5ldyB0aGlzKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc3Bhd247XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcihhY3Rpb25BcnI6QXJyYXk8QWN0aW9uPil7XG4gICAgICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zLmFkZENoaWxkcmVuKGFjdGlvbkFycik7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9hY3Rpb25zOmR5Q2IuQ29sbGVjdGlvbjxBY3Rpb24+ID0gZHlDYi5Db2xsZWN0aW9uLmNyZWF0ZTxBY3Rpb24+KCk7XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZSh0aW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNGaW5pc2goKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluaXNoKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLml0ZXJhdGUoXCJ1cGRhdGVcIiwgW3RpbWVdKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzRmluaXNoKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXJ0KCkge1xuICAgICAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICAgICAgdGhpcy5pdGVyYXRlKFwic3RhcnRcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0b3AoKSB7XG4gICAgICAgICAgICBzdXBlci5zdG9wKCk7XG5cbiAgICAgICAgICAgIHRoaXMuaXRlcmF0ZShcInN0b3BcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHBhdXNlKCkge1xuICAgICAgICAgICAgc3VwZXIucGF1c2UoKTtcblxuICAgICAgICAgICAgdGhpcy5pdGVyYXRlKFwicGF1c2VcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlc3VtZSgpIHtcbiAgICAgICAgICAgIHN1cGVyLnJlc3VtZSgpO1xuXG4gICAgICAgICAgICB0aGlzLml0ZXJhdGUoXCJyZXN1bWVcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHkoKSB7XG4gICAgICAgICAgICB2YXIgYWN0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICAgICAgICAgIGFjdGlvbnMucHVzaChhY3Rpb24uY29weSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIFNwYXduLmNyZWF0ZS5hcHBseShTcGF3biwgYWN0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgICAgICBzdXBlci5yZXNldCgpO1xuXG4gICAgICAgICAgICB0aGlzLml0ZXJhdGUoXCJyZXNldFwiKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbnMucmV2ZXJzZSgpO1xuXG4gICAgICAgICAgICBzdXBlci5yZXZlcnNlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldElubmVyQWN0aW9ucygpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGl0ZXJhdGUobWV0aG9kOnN0cmluZywgYXJnQXJyPzpBcnJheTxhbnk+KSB7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zLmZvckVhY2goKGFjdGlvbjpBY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBhY3Rpb25bbWV0aG9kXS5hcHBseShhY3Rpb24sIGFyZ0Fycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2lzRmluaXNoKCkge1xuICAgICAgICAgICAgdmFyIGlzRmluaXNoID0gdHJ1ZTtcblxuICAgICAgICAgICAgdGhpcy5fYWN0aW9ucy5mb3JFYWNoKChhY3Rpb246QWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFhY3Rpb24uaXNGaW5pc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNGaW5pc2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGR5Q2IuJEJSRUFLO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gaXNGaW5pc2g7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBkZWNsYXJlIHZhciB3aW5kb3c7XG5cbiAgICBleHBvcnQgY2xhc3MgRGVsYXlUaW1lIGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWwge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShkZWxheVRpbWU6bnVtYmVyKSB7XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gbmV3IHRoaXMoZGVsYXlUaW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKGRlbGF5VGltZTpudW1iZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuZHVyYXRpb24gPSBkZWxheVRpbWU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHkoKSB7XG4gICAgICAgICAgICByZXR1cm4gRGVsYXlUaW1lLmNyZWF0ZSh0aGlzLmR1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIFJlcGVhdCBleHRlbmRzIENvbnRyb2wge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShhY3Rpb246QWN0aW9uLCB0aW1lczpudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciByZXBlYXQgPSBuZXcgdGhpcyhhY3Rpb24sIHRpbWVzKTtcblxuICAgICAgICAgICAgcmVwZWF0LmluaXRXaGVuQ3JlYXRlKCk7XG5cbiAgICAgICAgICAgIHJldHVybiByZXBlYXQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcihhY3Rpb246QWN0aW9uLCB0aW1lczpudW1iZXIpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2lubmVyQWN0aW9uID0gYWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5fdGltZXMgPSB0aW1lcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2lubmVyQWN0aW9uOkFjdGlvbiA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX29yaWdpblRpbWVzOm51bWJlciA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX3RpbWVzOm51bWJlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIGluaXRXaGVuQ3JlYXRlKCkge1xuICAgICAgICAgICAgdGhpcy5fb3JpZ2luVGltZXMgPSB0aGlzLl90aW1lcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1cGRhdGUodGltZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RpbWVzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2goKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2lubmVyQWN0aW9uLnVwZGF0ZSh0aW1lKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2lubmVyQWN0aW9uLmlzRmluaXNoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGltZXMgLT0gMTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl90aW1lcyAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbm5lckFjdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pbm5lckFjdGlvbi5zdGFydCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5maW5pc2goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjb3B5KCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlcGVhdC5jcmVhdGUodGhpcy5faW5uZXJBY3Rpb24uY29weSgpLCB0aGlzLl90aW1lcyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgICAgICBzdXBlci5yZXNldCgpO1xuXG4gICAgICAgICAgICB0aGlzLl90aW1lcyA9IHRoaXMuX29yaWdpblRpbWVzO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGFydCgpIHtcbiAgICAgICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2lubmVyQWN0aW9uLnN0YXJ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RvcCgpIHtcbiAgICAgICAgICAgIHN1cGVyLnN0b3AoKTtcblxuICAgICAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24uc3RvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHBhdXNlKCkge1xuICAgICAgICAgICAgc3VwZXIucGF1c2UoKTtcblxuICAgICAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24ucGF1c2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZXN1bWUoKSB7XG4gICAgICAgICAgICBzdXBlci5yZXN1bWUoKTtcblxuICAgICAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24ucmVzdW1lKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0SW5uZXJBY3Rpb25zKCkge1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGU8QWN0aW9uPihbdGhpcy5faW5uZXJBY3Rpb25dKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBSZXBlYXRGb3JldmVyIGV4dGVuZHMgQ29udHJvbCB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGFjdGlvbjpBY3Rpb24pIHtcbiAgICAgICAgICAgIHZhciByZXBlYXQgPSBuZXcgdGhpcyhhY3Rpb24pO1xuXG4gICAgICAgICAgICByZXR1cm4gcmVwZWF0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IoYWN0aW9uOkFjdGlvbikge1xuICAgICAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgaXNGaW5pc2goKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9pbm5lckFjdGlvbjpBY3Rpb24gPSBudWxsO1xuXG4gICAgICAgIHB1YmxpYyB1cGRhdGUodGltZSkge1xuICAgICAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24udXBkYXRlKHRpbWUpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5faW5uZXJBY3Rpb24uaXNGaW5pc2gpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbm5lckFjdGlvbi5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lubmVyQWN0aW9uLnN0YXJ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29weSgpIHtcbiAgICAgICAgICAgIHJldHVybiBSZXBlYXRGb3JldmVyLmNyZWF0ZSh0aGlzLl9pbm5lckFjdGlvbi5jb3B5KCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXJ0KCkge1xuICAgICAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICAgICAgdGhpcy5faW5uZXJBY3Rpb24uc3RhcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdG9wKCkge1xuICAgICAgICAgICAgc3VwZXIuc3RvcCgpO1xuXG4gICAgICAgICAgICB0aGlzLl9pbm5lckFjdGlvbi5zdG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcGF1c2UoKSB7XG4gICAgICAgICAgICBzdXBlci5wYXVzZSgpO1xuXG4gICAgICAgICAgICB0aGlzLl9pbm5lckFjdGlvbi5wYXVzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlc3VtZSgpIHtcbiAgICAgICAgICAgIHN1cGVyLnJlc3VtZSgpO1xuXG4gICAgICAgICAgICB0aGlzLl9pbm5lckFjdGlvbi5yZXN1bWUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRJbm5lckFjdGlvbnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Db2xsZWN0aW9uLmNyZWF0ZTxBY3Rpb24+KFt0aGlzLl9pbm5lckFjdGlvbl0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZGVjbGFyZSB2YXIgd2luZG93O1xuXG4gICAgZXhwb3J0IGNsYXNzIFR3ZWVuIGV4dGVuZHMgQWN0aW9uSW50ZXJ2YWwge1xuICAgICAgICBwdWJsaWMgc3RhdGljIEVhc2luZyA9IHtcbiAgICAgICAgICAgIExpbmVhcjoge1xuXG4gICAgICAgICAgICAgICAgTm9uZTogZnVuY3Rpb24gKGspIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaztcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgUXVhZHJhdGljOiB7XG5cbiAgICAgICAgICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gayAqIGs7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrICogKCAyIC0gayApO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgoIGsgKj0gMiApIDwgMSkgcmV0dXJuIDAuNSAqIGsgKiBrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqICggLS1rICogKCBrIC0gMiApIC0gMSApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBDdWJpYzoge1xuXG4gICAgICAgICAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGsgKiBrICogaztcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0tayAqIGsgKiBrICsgMTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKCBrICo9IDIgKSA8IDEpIHJldHVybiAwLjUgKiBrICogayAqIGs7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiAoICggayAtPSAyICkgKiBrICogayArIDIgKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgUXVhcnRpYzoge1xuXG4gICAgICAgICAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGsgKiBrICogayAqIGs7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxIC0gKCAtLWsgKiBrICogayAqIGsgKTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBJbk91dDogZnVuY3Rpb24gKGspIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoKCBrICo9IDIgKSA8IDEpIHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTAuNSAqICggKCBrIC09IDIgKSAqIGsgKiBrICogayAtIDIgKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgUXVpbnRpYzoge1xuXG4gICAgICAgICAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCggayAqPSAyICkgPCAxKSByZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiAoICggayAtPSAyICkgKiBrICogayAqIGsgKiBrICsgMiApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBTaW51c29pZGFsOiB7XG5cbiAgICAgICAgICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnNpbihrICogTWF0aC5QSSAvIDIpO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiAoIDEgLSBNYXRoLmNvcyhNYXRoLlBJICogaykgKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgRXhwb25lbnRpYWw6IHtcblxuICAgICAgICAgICAgICAgIEluOiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGsgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0xMCAqIGspO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09PSAwKSByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT09IDEpIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKCBrICo9IDIgKSA8IDEpIHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiAoIC1NYXRoLnBvdygyLCAtMTAgKiAoIGsgLSAxICkpICsgMiApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBDaXJjdWxhcjoge1xuXG4gICAgICAgICAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIGsgKiBrKTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgxIC0gKCAtLWsgKiBrICkpO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICgoIGsgKj0gMiApIDwgMSkgcmV0dXJuIC0wLjUgKiAoIE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwLjUgKiAoIE1hdGguc3FydCgxIC0gKCBrIC09IDIpICogaykgKyAxKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgRWxhc3RpYzoge1xuXG4gICAgICAgICAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHMsIGEgPSAwLjEsIHAgPSAwLjQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09PSAwKSByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT09IDEpIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWEgfHwgYSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcyA9IHAgKiBNYXRoLmFzaW4oMSAvIGEpIC8gKCAyICogTWF0aC5QSSApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLSggYSAqIE1hdGgucG93KDIsIDEwICogKCBrIC09IDEgKSkgKiBNYXRoLnNpbigoIGsgLSBzICkgKiAoIDIgKiBNYXRoLlBJICkgLyBwKSApO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIE91dDogZnVuY3Rpb24gKGspIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcywgYSA9IDAuMSwgcCA9IDAuNDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPT09IDApIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoayA9PT0gMSkgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYSB8fCBhIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBzID0gcCAqIE1hdGguYXNpbigxIC8gYSkgLyAoIDIgKiBNYXRoLlBJICk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoIGEgKiBNYXRoLnBvdygyLCAtMTAgKiBrKSAqIE1hdGguc2luKCggayAtIHMgKSAqICggMiAqIE1hdGguUEkgKSAvIHApICsgMSApO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzLCBhID0gMC4xLCBwID0gMC40O1xuICAgICAgICAgICAgICAgICAgICBpZiAoayA9PT0gMCkgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrID09PSAxKSByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhIHx8IGEgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHMgPSBwICogTWF0aC5hc2luKDEgLyBhKSAvICggMiAqIE1hdGguUEkgKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCggayAqPSAyICkgPCAxKSByZXR1cm4gLTAuNSAqICggYSAqIE1hdGgucG93KDIsIDEwICogKCBrIC09IDEgKSkgKiBNYXRoLnNpbigoIGsgLSBzICkgKiAoIDIgKiBNYXRoLlBJICkgLyBwKSApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqICggayAtPSAxICkpICogTWF0aC5zaW4oKCBrIC0gcyApICogKCAyICogTWF0aC5QSSApIC8gcCkgKiAwLjUgKyAxO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBCYWNrOiB7XG5cbiAgICAgICAgICAgICAgICBJbjogZnVuY3Rpb24gKGspIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBrICogayAqICggKCBzICsgMSApICogayAtIHMgKTtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLS1rICogayAqICggKCBzICsgMSApICogayArIHMgKSArIDE7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoIGsgKj0gMiApIDwgMSkgcmV0dXJuIDAuNSAqICggayAqIGsgKiAoICggcyArIDEgKSAqIGsgLSBzICkgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDAuNSAqICggKCBrIC09IDIgKSAqIGsgKiAoICggcyArIDEgKSAqIGsgKyBzICkgKyAyICk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIEJvdW5jZToge1xuXG4gICAgICAgICAgICAgICAgSW46IGZ1bmN0aW9uIChrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEgLSBUd2Vlbi5FYXNpbmcuQm91bmNlLk91dCgxIC0gayk7XG5cbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgT3V0OiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChrIDwgKCAxIC8gMi43NSApKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiBrICogaztcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGsgPCAoIDIgLyAyLjc1ICkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICggayAtPSAoIDEuNSAvIDIuNzUgKSApICogayArIDAuNzU7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrIDwgKCAyLjUgLyAyLjc1ICkpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICggayAtPSAoIDIuMjUgLyAyLjc1ICkgKSAqIGsgKyAwLjkzNzU7XG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqICggayAtPSAoIDIuNjI1IC8gMi43NSApICkgKiBrICsgMC45ODQzNzU7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChrIDwgMC41KSByZXR1cm4gVHdlZW4uRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUd2Vlbi5FYXNpbmcuQm91bmNlLk91dChrICogMiAtIDEpICogMC41ICsgMC41O1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIEludGVycG9sYXRpb24gPSB7XG4gICAgICAgICAgICBMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgbSA9IHYubGVuZ3RoIC0gMSwgZiA9IG0gKiBrLCBpID0gTWF0aC5mbG9vcihmKSwgZm4gPSBUd2Vlbi5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcblxuICAgICAgICAgICAgICAgIGlmIChrIDwgMCkgcmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xuICAgICAgICAgICAgICAgIGlmIChrID4gMSkgcmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZm4odltpXSwgdltpICsgMSA+IG0gPyBtIDogaSArIDFdLCBmIC0gaSk7XG5cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIEJlemllcjogZnVuY3Rpb24gKHYsIGspIHtcblxuICAgICAgICAgICAgICAgIHZhciBiID0gMCwgbiA9IHYubGVuZ3RoIC0gMSwgcHcgPSBNYXRoLnBvdywgYm4gPSBUd2Vlbi5JbnRlcnBvbGF0aW9uLlV0aWxzLkJlcm5zdGVpbiwgaTtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGIgKz0gcHcoMSAtIGssIG4gLSBpKSAqIHB3KGssIGkpICogdltpXSAqIGJuKG4sIGkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBiO1xuXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBDYXRtdWxsUm9tOiBmdW5jdGlvbiAodiwgaykge1xuXG4gICAgICAgICAgICAgICAgdmFyIG0gPSB2Lmxlbmd0aCAtIDEsIGYgPSBtICogaywgaSA9IE1hdGguZmxvb3IoZiksIGZuID0gVHdlZW4uSW50ZXJwb2xhdGlvbi5VdGlscy5DYXRtdWxsUm9tO1xuXG4gICAgICAgICAgICAgICAgaWYgKHZbMF0gPT09IHZbbV0pIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoayA8IDApIGkgPSBNYXRoLmZsb29yKGYgPSBtICogKCAxICsgayApKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4odlsoIGkgLSAxICsgbSApICUgbV0sIHZbaV0sIHZbKCBpICsgMSApICUgbV0sIHZbKCBpICsgMiApICUgbV0sIGYgLSBpKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGsgPCAwKSByZXR1cm4gdlswXSAtICggZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoayA+IDEpIHJldHVybiB2W21dIC0gKCBmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0gKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgVXRpbHM6IHtcblxuICAgICAgICAgICAgICAgIExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoIHAxIC0gcDAgKSAqIHQgKyBwMDtcblxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZjID0gVHdlZW4uSW50ZXJwb2xhdGlvbi5VdGlscy5GYWN0b3JpYWw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYyhuKSAvIGZjKGkpIC8gZmMobiAtIGkpO1xuXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIEZhY3RvcmlhbDogKGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IFsxXTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG4pIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSAxLCBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFbbl0pIHJldHVybiBhW25dO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gbjsgaSA+IDE7IGktLSkgcyAqPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFbbl0gPSBzO1xuXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB9KSgpLFxuXG4gICAgICAgICAgICAgICAgQ2F0bXVsbFJvbTogZnVuY3Rpb24gKHAwLCBwMSwgcDIsIHAzLCB0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHYwID0gKCBwMiAtIHAwICkgKiAwLjUsIHYxID0gKCBwMyAtIHAxICkgKiAwLjUsIHQyID0gdCAqIHQsIHQzID0gdCAqIHQyO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKCAyICogcDEgLSAyICogcDIgKyB2MCArIHYxICkgKiB0MyArICggLTMgKiBwMSArIDMgKiBwMiAtIDIgKiB2MCAtIHYxICkgKiB0MiArIHYwICogdCArIHAxO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfb2JqZWN0OmR5Q2IuSGFzaDxhbnk+ID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfdmFsdWVzU3RhcnQ6ZHlDYi5IYXNoPGFueT4gPSBkeUNiLkhhc2guY3JlYXRlPGFueT4oKTtcbiAgICAgICAgcHJpdmF0ZSBfdmFsdWVzRW5kOmR5Q2IuSGFzaDxhbnk+ID0gZHlDYi5IYXNoLmNyZWF0ZTxhbnk+KCk7XG4gICAgICAgIHByaXZhdGUgX2Vhc2luZ0Z1bmN0aW9uID0gVHdlZW4uRWFzaW5nLkxpbmVhci5Ob25lO1xuICAgICAgICBwcml2YXRlIF9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBUd2Vlbi5JbnRlcnBvbGF0aW9uLkxpbmVhcjtcbiAgICAgICAgcHJpdmF0ZSBfb25TdGFydENhbGxiYWNrID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcbiAgICAgICAgcHJpdmF0ZSBfb25VcGRhdGVDYWxsYmFjayA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX29uRmluaXNoQ2FsbGJhY2sgPSBudWxsO1xuICAgICAgICBwcml2YXRlIF9vblN0b3BDYWxsYmFjayA9IG51bGw7XG5cbiAgICAgICAgcHJvdGVjdGVkIHVwZGF0ZUJvZHkodGltZTpudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBlYXNlVmFsdWUgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb25TdGFydENhbGxiYWNrICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25TdGFydENhbGxiYWNrLmNhbGwodGhpcy5fb2JqZWN0LmdldENoaWxkcmVuKCkpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVhc2VWYWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKHRoaXMuZWxhcHNlZCk7XG5cbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlc0VuZC5mb3JFYWNoKCh2YWx1ZTphbnksIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBzZWxmLl92YWx1ZXNTdGFydC5nZXRDaGlsZChrZXkpLFxuICAgICAgICAgICAgICAgICAgICBlbmQgPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChlbmQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9vYmplY3Quc2V0VmFsdWUoa2V5LCBzZWxmLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24oZW5kLCBlYXNlVmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlcyByZWxhdGl2ZSBlbmQgdmFsdWVzIHdpdGggc3RhcnQgYXMgYmFzZSAoZS5nLjogKzEwLCAtMylcbiAgICAgICAgICAgICAgICAgICAgaWYgKEp1ZGdlVXRpbHMuaXNTdHJpbmcoZW5kKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gc3RhcnQgKyB3aW5kb3cucGFyc2VGbG9hdChlbmQsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxuICAgICAgICAgICAgICAgICAgICBpZiAoSnVkZ2VVdGlscy5pc051bWJlcihlbmQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9vYmplY3Quc2V0VmFsdWUoa2V5LCBzdGFydCArICggZW5kIC0gc3RhcnQgKSAqIGVhc2VWYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBpZiAoIHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25VcGRhdGVDYWxsYmFjay5jYWxsKHRoaXMuX29iamVjdC5nZXRDaGlsZHJlbigpLCBlYXNlVmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmcm9tKG9iamVjdDphbnkpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5fb2JqZWN0ID0gZHlDYi5IYXNoLmNyZWF0ZTxhbnk+KG9iamVjdCk7XG5cbiAgICAgICAgICAgIC8vIFNldCBhbGwgc3RhcnRpbmcgdmFsdWVzIHByZXNlbnQgb24gdGhlIHRhcmdldCBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuX29iamVjdC5mb3JFYWNoKCh2YWx1ZTphbnksIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLl92YWx1ZXNTdGFydC5hZGRDaGlsZChrZXksIHdpbmRvdy5wYXJzZUZsb2F0KHZhbHVlLCAxMCkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRvKHByb3BlcnRpZXM6YW55LCBkdXJhdGlvbjpudW1iZXIgPSAxMDAwKSB7XG4gICAgICAgICAgICB0aGlzLmR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXNFbmQgPSBkeUNiLkhhc2guY3JlYXRlPGFueT4ocHJvcGVydGllcyk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXQoKXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5fdmFsdWVzRW5kLmZvckVhY2goKHZhbHVlOmFueSwga2V5OnN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGFuIEFycmF5IHdhcyBwcm92aWRlZCBhcyBwcm9wZXJ0eSB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY3JlYXRlIGEgbG9jYWwgY29weSBvZiB0aGUgQXJyYXkgd2l0aCB0aGUgc3RhcnQgdmFsdWUgYXQgdGhlIGZyb250XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX3ZhbHVlc0VuZC5zZXRWYWx1ZShrZXksIFtzZWxmLl9vYmplY3QuZ2V0Q2hpbGQoa2V5KV0uY29uY2F0KHNlbGYuX3ZhbHVlc0VuZC5nZXRDaGlsZChrZXkpKSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5fdmFsdWVzU3RhcnQuc2V0VmFsdWUoa2V5LCBzZWxmLl9vYmplY3QuZ2V0Q2hpbGQoa2V5KSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKCBzZWxmLl92YWx1ZXNTdGFydC5nZXRDaGlsZChrZXkpIGluc3RhbmNlb2YgQXJyYXkgKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5fdmFsdWVzU3RhcnQuc2V0VmFsdWUoa2V5LCBzZWxmLl92YWx1ZXNTdGFydC5nZXRDaGlsZChrZXkpICogMS4wKTsgLy8gRW5zdXJlcyB3ZSdyZSB1c2luZyBudW1iZXJzLCBub3Qgc3RyaW5nc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXJ0KCkge1xuICAgICAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICAgICAgdGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RvcCgpIHtcbiAgICAgICAgICAgIHN1cGVyLnN0b3AoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX29uU3RvcENhbGxiYWNrICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25TdG9wQ2FsbGJhY2suY2FsbCh0aGlzLl9vYmplY3QuZ2V0Q2hpbGRyZW4oKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHkoKSB7XG4gICAgICAgICAgICByZXR1cm4gVHdlZW4uY3JlYXRlKCkuZnJvbSh0aGlzLl92YWx1ZXNTdGFydC5nZXRDaGlsZHJlbigpKVxuICAgICAgICAgICAgLnRvKHRoaXMuX3ZhbHVlc0VuZC5nZXRDaGlsZHJlbigpLCB0aGlzLmR1cmF0aW9uKVxuICAgICAgICAgICAgICAgIC5lYXNpbmcodGhpcy5fZWFzaW5nRnVuY3Rpb24pXG4gICAgICAgICAgICAgICAgLmludGVycG9sYXRpb24odGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uKVxuICAgICAgICAgICAgICAgIC5vblN0YXJ0KHRoaXMuX29uU3RhcnRDYWxsYmFjaylcbiAgICAgICAgICAgICAgICAub25TdG9wKHRoaXMuX29uU3RvcENhbGxiYWNrKVxuICAgICAgICAgICAgICAgIC5vbkZpbmlzaCh0aGlzLl9vbkZpbmlzaENhbGxiYWNrKVxuICAgICAgICAgICAgICAgIC5vblVwZGF0ZSh0aGlzLl9vblVwZGF0ZUNhbGxiYWNrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZXZlcnNlKCkge1xuICAgICAgICAgICAgdmFyIHRtcCA9IHRoaXMuX3ZhbHVlc1N0YXJ0O1xuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZXNTdGFydCA9IHRoaXMuX3ZhbHVlc0VuZDtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlc0VuZCA9IHRtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBlYXNpbmcoZWFzaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhc2luZztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW50ZXJwb2xhdGlvbihpbnRlcnBvbGF0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcnBvbGF0aW9uO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvblVwZGF0ZShjYWxsYmFjazpGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbkZpbmlzaChjYWxsYmFjazpGdW5jdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fb25GaW5pc2hDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvblN0YXJ0KGNhbGxiYWNrOkZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb25TdG9wKGNhbGxiYWNrOkZ1bmN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9vblN0b3BDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBmaW5pc2goKXtcbiAgICAgICAgICAgIHN1cGVyLmZpbmlzaCgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fb25GaW5pc2hDYWxsYmFjayAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uRmluaXNoQ2FsbGJhY2suY2FsbCh0aGlzLl9vYmplY3QuZ2V0Q2hpbGRyZW4oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBBY3Rpb25NYW5hZ2Vye1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpOkFjdGlvbk1hbmFnZXIge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jaGlsZHJlbjpkeUNiLkNvbGxlY3Rpb248QWN0aW9uPiA9IGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGU8QWN0aW9uPigpO1xuXG4gICAgICAgIHB1YmxpYyBhZGRDaGlsZChhY3Rpb246QWN0aW9uKXtcbiAgICAgICAgICAgIGlmKHRoaXMuaGFzQ2hpbGQoYWN0aW9uKSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9jaGlsZHJlbi5hZGRDaGlsZChhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKGFjdGlvbjpBY3Rpb24pe1xuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4ucmVtb3ZlQ2hpbGQoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBoYXNDaGlsZChhY3Rpb246QWN0aW9uKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbi5oYXNDaGlsZChhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZSh0aW1lOm51bWJlcil7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICAgICAgcmVtb3ZlUXVldWUgPSBbXTtcblxuICAgICAgICAgICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZCl7XG4gICAgICAgICAgICAgICAgLy/kv67lpI3igJzlpoLmnpzpgY3ljobnmoTliqjkvZzliKDpmaTkuobliqjkvZzluo/liJfkuK3mn5DkuKrliqjkvZzvvIzliJnlnKjlkI7pnaLnmoTpgY3ljobkuK3kvJrmiqXplJnigJ3nmoRidWdcbiAgICAgICAgICAgICAgICBpZiAoIWNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuaXNGaW5pc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlUXVldWUucHVzaChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY2hpbGQuaXNTdG9wIHx8IGNoaWxkLmlzUGF1c2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNoaWxkLnVwZGF0ZSh0aW1lKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZW1vdmVRdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgICAgIHNlbGYuX2NoaWxkcmVuLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBleHBvcnQgY2xhc3MgUmVuZGVyZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgICAgICAvL3RvZG8gdHJhbnNmb3JtRGlydHk/KHdvemxsYSlcbiAgICAgICAgLy9wdWJsaWMgcmVuZGVyKHJlbmRlcmVyOnJlbmRlci5SZW5kZXJlciwgdHJhbnNmb3JtRGlydHk6Ym9vbGVhbik6dm9pZCB7XG4gICAgICAgIHB1YmxpYyByZW5kZXIocmVuZGVyZXI6cmVuZGVyLlJlbmRlcmVyLCBnZW9tZXRyeTpHZW9tZXRyeSwgY2FtZXJhOkdhbWVPYmplY3QpOnZvaWQge1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBNZXNoUmVuZGVyZXIgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgICAgICBcdHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgIFx0cmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZW5kZXIocmVuZGVyZXI6cmVuZGVyLlJlbmRlcmVyLCBnZW9tZXRyeTpHZW9tZXRyeSwgY2FtZXJhOkdhbWVPYmplY3QpOnZvaWQge1xuICAgICAgICAgICAgLy90aGlzLl9zZXREYXRhKGNhbWVyYSk7XG4gICAgICAgICAgICB0aGlzLl9hZGREcmF3Q29tbWFuZChyZW5kZXJlciwgZ2VvbWV0cnksIHRoaXMuX2NvbXB1dGVNdnBNYXRyaXgoY2FtZXJhKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb21wdXRlTXZwTWF0cml4KGNhbWVyYTpHYW1lT2JqZWN0KTpNYXRyaXh7XG4gICAgICAgICAgICB2YXIgY2FtZXJhQ29tcG9uZW50ID0gY2FtZXJhLmdldENvbXBvbmVudDxDYW1lcmE+KENhbWVyYSk7XG5cbiAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKCFjYW1lcmFDb21wb25lbnQsIFwiY2FtZXJhIG11c3QgYWRkIENhbWVyYSBDb21wb25lbnRcIik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybS5sb2NhbFRvV29ybGRNYXRyaXguY29weSgpLmFwcGx5TWF0cml4KGNhbWVyYUNvbXBvbmVudC5jb21wdXRlVnBNYXRyaXgoKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL3ByaXZhdGUgX3NldERhdGEoY2FtZXJhKXtcbiAgICAgICAgLy8gICAgdGhpcy5fcHJvZ3JhbS5zZXRVbmlmb3JtRGF0YShcInVfbXZwTWF0cml4XCIsIFVuaWZvcm1EYXRhVHlwZS5GTE9BVF9NQVQ0LCB0aGlzLl9jb21wdXRlTXZwTWF0cml4KGNhbWVyYSkpO1xuICAgICAgICAvL31cblxuICAgICAgICBwcml2YXRlIF9hZGREcmF3Q29tbWFuZChyZW5kZXJlcjpyZW5kZXIuUmVuZGVyZXIsIGdlb21ldHJ5Okdlb21ldHJ5LCBtdnBNYXRyaXg6TWF0cml4KXtcbiAgICAgICAgICAgIHZhciBxdWFkQ21kID0gcmVuZGVyZXIuY3JlYXRlUXVhZENvbW1hbmQoKTtcblxuICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IoIWdlb21ldHJ5LCBkeUNiLkxvZy5pbmZvLkZVTkNfTVVTVChcIk1lc2hcIiwgXCJhZGQgZ2VvbWV0cnkgY29tcG9uZW50XCIpKTtcblxuICAgICAgICAgICAgcXVhZENtZC5idWZmZXJzID0ge1xuICAgICAgICAgICAgICAgIHZlcnRleEJ1ZmZlcjogZ2VvbWV0cnkudmVydGljZXMsXG4gICAgICAgICAgICAgICAgLy90ZXhDb29yZHM6IGdlb21ldHJ5LnRleENvb3JkcyxcbiAgICAgICAgICAgICAgICAvL25vcm1hbHM6IGdlb21ldHJ5Lm5vcm1hbHMsXG4gICAgICAgICAgICAgICAgaW5kZXhCdWZmZXI6IGdlb21ldHJ5LmluZGljZXMsXG4gICAgICAgICAgICAgICAgY29sb3JCdWZmZXI6IGdlb21ldHJ5LmNvbG9yc1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcXVhZENtZC5zaGFkZXIgPSBnZW9tZXRyeS5tYXRlcmlhbC5zaGFkZXI7XG4gICAgICAgICAgICBxdWFkQ21kLm12cE1hdHJpeCA9IG12cE1hdHJpeDtcbiAgICAgICAgICAgIC8vcXVhZENtZC5idWZmZXJEYXRhID0gO1xuICAgICAgICAgICAgLy9xdWFkQ21kLmNvbG9yID0gdGhpcy5fbWF0ZXJpYWwuY29sb3I7XG5cbiAgICAgICAgICAgIHJlbmRlcmVyLmFkZENvbW1hbmQocXVhZENtZCk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBleHBvcnQgY2xhc3MgQ29sbGlkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgICAgICBjb2xsaWRlWFkobG9jYWxYOm51bWJlciwgbG9jYWxZOm51bWJlcik6Ym9vbGVhbiB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb2xsaWRlKGNvbGxpZGVyOkNvbGxpZGVyKTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBUb3BDb2xsaWRlciBleHRlbmRzIENvbGxpZGVyIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgICAgIFx0dmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgXHRyZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgY29sbGlkZVhZKGxvY2FsWDpudW1iZXIsIGxvY2FsWTpudW1iZXIpOmJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb2xsaWRlKGNvbGxpZGVyOkNvbGxpZGVyKTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTY3JpcHRGaWxlRGF0YXtcbiAgICAgICAgbmFtZTpzdHJpbmc7XG4gICAgICAgIGNsYXNzOmFueVxuICAgIH1cblxuICAgIC8vdG9kbyBhZGQgZXhwb3NlIGF0dHJpYnV0ZXMgZm9yIGVkaXRvcihyZWZlciB0byBwbGF5Y2FudmFzKVxuICAgIGV4cG9ydCBjbGFzcyBTY3JpcHQgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgc2NyaXB0OmR5Q2IuU3RhY2s8SVNjcmlwdEZpbGVEYXRhPiA9IGR5Q2IuU3RhY2suY3JlYXRlPElTY3JpcHRGaWxlRGF0YT4oKTtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpOlNjcmlwdDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUodXJsOnN0cmluZyk6U2NyaXB0O1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShzY3JpcHROYW1lOnN0cmluZywgY2FsbGJhY2s6RnVuY3Rpb24pOlNjcmlwdDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgdGhpcyh1cmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICBsZXQgc2NyaXB0TmFtZSA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNjcmlwdC5wdXNoKDxJU2NyaXB0RmlsZURhdGE+e1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBzY3JpcHROYW1lLFxuICAgICAgICAgICAgICAgICAgICBjbGFzczogY2FsbGJhY2soRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHVybDpzdHJpbmcgPSBudWxsKXtcbiAgICAgICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICB9XG5cbiAgICAgICAgLy90b2RvIHByZXBlbmQgc2NyaXB0IHByZWZpeChkZWZpbmVkIGluIGNvbmZpZyBkYXRhKSB0byByZWxhdGl2ZSBwYXRoP1xuICAgICAgICBwdWJsaWMgdXJsOnN0cmluZyA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIGNyZWF0ZUxvYWRKc1N0cmVhbSgpe1xuICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IoIXRoaXMudXJsLCBkeUNiLkxvZy5pbmZvLkZVTkNfTVVTVF9ERUZJTkUoXCJ1cmxcIikpO1xuXG4gICAgICAgICAgICByZXR1cm4gTG9hZGVyTWFuYWdlci5nZXRJbnN0YW5jZSgpLmxvYWQodGhpcy51cmwpXG4gICAgICAgICAgICAubWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFNjcmlwdC5zY3JpcHQucG9wKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUgZHl7XG4gICAgZXhwb3J0IGludGVyZmFjZSBJU2NyaXB0QmVoYXZpb3J7XG4gICAgICAgIGluaXQoKTtcbiAgICAgICAgdXBkYXRlKHRpbWU6bnVtYmVyKTtcbiAgICAgICAgb25FbnRlcigpO1xuICAgICAgICBvbkV4aXQoKTtcbiAgICAgICAgb25TdGFydExvb3AoKTtcbiAgICAgICAgb25FbmRMb29wKCk7XG4gICAgfVxufVxuIiwibW9kdWxlIGR5IHtcbiAgICAvKipcbiAgICAgKiBAbmFtZSBwYy5tYXRoLkRFR19UT19SQURcbiAgICAgKiBAZGVzY3JpcHRpb24gQ29udmVyc2lvbiBmYWN0b3IgYmV0d2VlbiBkZWdyZWVzIGFuZCByYWRpYW5zXG4gICAgICogQHR5cGUgTnVtYmVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyBDb252ZXJ0IDE4MCBkZWdyZWVzIHRvIHBpIHJhZGlhbnNcbiAgICAgKiB2YXIgcmFkID0gMTgwICogcGMubWF0aC5ERUdfVE9fUkFEO1xuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCBERUdfVE9fUkFEID0gTWF0aC5QSSAvIDE4MDtcblxuICAgIC8qKlxuICAgICAqIEBuYW1lIHBjLm1hdGguUkFEX1RPX0RFR1xuICAgICAqIEBkZXNjcmlwdGlvbiBDb252ZXJzaW9uIGZhY3RvciBiZXR3ZWVuIGRlZ3JlZXMgYW5kIHJhZGlhbnNcbiAgICAgKiBAdHlwZSBOdW1iZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIC8vIENvbnZlcnQgcGkgcmFkaWFucyB0byAxODAgZGVncmVlc1xuICAgICAqIHZhciBkZWcgPSBNYXRoLlBJICogcGMubWF0aC5SQURfVE9fREVHO1xuICAgICAqL1xuICAgIGV4cG9ydCBjb25zdCBSQURfVE9fREVHID0gMTgwIC8gTWF0aC5QSTtcbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBWZWN0b3Ize1xuICAgICAgICBwdWJsaWMgc3RhdGljIHVwID0gVmVjdG9yMy5jcmVhdGUoMCwgMSwgMCk7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZm9yd2FyZCA9IFZlY3RvcjMuY3JlYXRlKDAsIDAsIDEpO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHJpZ2h0ID0gVmVjdG9yMy5jcmVhdGUoMSwgMCwgMCk7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoeCwgeSwgeik6VmVjdG9yMyA7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6VmVjdG9yMyA7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6VmVjdG9yMyB7XG4gICAgICAgICAgICB2YXIgbSA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIG0gPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBtID0gbmV3IHRoaXMoYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdmFsdWVzOiBGbG9hdDMyQXJyYXk7XG4gICAgICAgIGdldCB2YWx1ZXMoKTpGbG9hdDMyQXJyYXkgeyByZXR1cm4gdGhpcy5fdmFsdWVzOyB9XG4gICAgICAgIHNldCB2YWx1ZXModmFsdWVzOiBGbG9hdDMyQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgfVxuXG4gICAgICAgIGdldCB4KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWVzWzBdO1xuICAgICAgICB9XG4gICAgICAgIHNldCB4KHg6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1swXSA9IHg7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgeSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlc1sxXTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgeSh5Om51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXNbMV0gPSB5O1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHooKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92YWx1ZXNbMl07XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHooejpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzJdID0gejtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIHopO1xuICAgICAgICBjb25zdHJ1Y3RvcigpO1xuICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheSgzKTtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1swXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbMV0gPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzJdID1hcmd1bWVudHNbMl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbm9ybWFsaXplKCk6IFZlY3RvcjN7XG4gICAgICAgICAgICB2YXIgdiA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICAgIHZhciBkID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgIHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0gKyB2WzJdICogdlsyXVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYoZCA9PT0gMCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZbMF0gPSB2WzBdIC8gZDtcbiAgICAgICAgICAgIHZbMV0gPSB2WzFdIC8gZDtcbiAgICAgICAgICAgIHZbMl0gPSB2WzJdIC8gZDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2NhbGUoc2NhbGFyOm51bWJlcikge1xuICAgICAgICAgICAgdmFyIHYgPSB0aGlzLl92YWx1ZXM7XG5cbiAgICAgICAgICAgIHZbMF0gKj0gc2NhbGFyO1xuICAgICAgICAgICAgdlsxXSAqPSBzY2FsYXI7XG4gICAgICAgICAgICB2WzJdICo9IHNjYWxhcjtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0KHg6bnVtYmVyLCB5Om51bWJlciwgejpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgICAgICB0aGlzLnogPSB6O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN1Yih2OlZlY3RvcjMpOlZlY3RvcjMge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzBdID0gdGhpcy5fdmFsdWVzWzBdIC0gdi52YWx1ZXNbMF07XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXNbMV0gPSB0aGlzLl92YWx1ZXNbMV0gLSB2LnZhbHVlc1sxXTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1syXSA9IHRoaXMuX3ZhbHVlc1syXSAtIHYudmFsdWVzWzJdO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhZGQodjpWZWN0b3IzKXtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1swXSA9IHRoaXMuX3ZhbHVlc1swXSArIHYudmFsdWVzWzBdO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzFdID0gdGhpcy5fdmFsdWVzWzFdICsgdi52YWx1ZXNbMV07XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXNbMl0gPSB0aGlzLl92YWx1ZXNbMl0gKyB2LnZhbHVlc1syXTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmV2ZXJzZSgpOlZlY3RvcjN7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXNbMF0gPSAtdGhpcy5fdmFsdWVzWzBdO1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzFdID0gLXRoaXMuX3ZhbHVlc1sxXTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1syXSA9IC10aGlzLl92YWx1ZXNbMl07XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHkoKTogVmVjdG9yM3tcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBWZWN0b3IzLmNyZWF0ZSgpLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuX3ZhbHVlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICByZXN1bHQudmFsdWVzW2ldID0gdGhpcy5fdmFsdWVzW2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRvVmVjNCgpOiBWZWN0b3I0e1xuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjQuY3JlYXRlKHRoaXMuX3ZhbHVlc1swXSwgdGhpcy5fdmFsdWVzWzFdLCB0aGlzLl92YWx1ZXNbMl0sIDEuMCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbGVuZ3RoKCkge1xuICAgICAgICAgICAgdmFyIHYgPSB0aGlzLl92YWx1ZXM7XG5cbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQodlswXSAqIHZbMF0gKyB2WzFdICogdlsxXSArIHZbMl0gKiB2WzJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAgICogQG5hbWUgcGMuVmVjMyNjcm9zc1xuICAgICAgICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGEgY3Jvc3MgcHJvZHVjdCBvcGVyYXRpb24gcGVyZm9ybWVkIG9uIHRoZSB0d28gc3BlY2lmaWVkIDMtZGltZW5zaW9uYWwgdmVjdG9ycy5cbiAgICAgICAgICogQHBhcmFtIHtwYy5WZWMzfSBsaHMgVGhlIGZpcnN0IDMtZGltZW5zaW9uYWwgdmVjdG9yIG9wZXJhbmQgb2YgdGhlIGNyb3NzIHByb2R1Y3QuXG4gICAgICAgICAqIEBwYXJhbSB7cGMuVmVjM30gcmhzIFRoZSBzZWNvbmQgMy1kaW1lbnNpb25hbCB2ZWN0b3Igb3BlcmFuZCBvZiB0aGUgY3Jvc3MgcHJvZHVjdC5cbiAgICAgICAgICogQHJldHVybnMge3BjLlZlYzN9IFNlbGYgZm9yIGNoYWluaW5nLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiB2YXIgYmFjayA9IG5ldyBwYy5WZWMzKCkuY3Jvc3MocGMuVmVjMy5SSUdIVCwgcGMuVmVjMy5VUCk7XG4gICAgICAgICAqXG4gICAgICAgICAqIC8vIFNob3VsZCBwcmludCB0aGUgWiBheGlzIChpLmUuIFswLCAwLCAxXSlcbiAgICAgICAgICogY29uc29sZS5sb2coXCJUaGUgcmVzdWx0IG9mIHRoZSBjcm9zcyBwcm9kdWN0IGlzOiBcIiArIGJhY2sudG9TdHJpbmcoKSk7XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgY3Jvc3MobGhzLCByaHMpIHtcbiAgICAgICAgICAgIHZhciBhLCBiLCByLCBheCwgYXksIGF6LCBieCwgYnksIGJ6O1xuXG4gICAgICAgICAgICBhID0gbGhzLnZhbHVlcztcbiAgICAgICAgICAgIGIgPSByaHMudmFsdWVzO1xuICAgICAgICAgICAgciA9IHRoaXMuX3ZhbHVlcztcblxuICAgICAgICAgICAgYXggPSBhWzBdO1xuICAgICAgICAgICAgYXkgPSBhWzFdO1xuICAgICAgICAgICAgYXogPSBhWzJdO1xuICAgICAgICAgICAgYnggPSBiWzBdO1xuICAgICAgICAgICAgYnkgPSBiWzFdO1xuICAgICAgICAgICAgYnogPSBiWzJdO1xuXG4gICAgICAgICAgICByWzBdID0gYXkgKiBieiAtIGJ5ICogYXo7XG4gICAgICAgICAgICByWzFdID0gYXogKiBieCAtIGJ6ICogYXg7XG4gICAgICAgICAgICByWzJdID0gYXggKiBieSAtIGJ4ICogYXk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIFZlY3RvcjR7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKHgsIHksIHosIHcpOlZlY3RvcjQgO1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpOlZlY3RvcjQgO1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpOlZlY3RvcjQge1xuICAgICAgICAgICAgdmFyIG0gPSBudWxsO1xuXG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICBtID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgbSA9IG5ldyB0aGlzKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdmFsdWVzOiBGbG9hdDMyQXJyYXk7XG4gICAgICAgIGdldCB2YWx1ZXMoKTpGbG9hdDMyQXJyYXkgeyByZXR1cm4gdGhpcy5fdmFsdWVzOyB9XG4gICAgICAgIHNldCB2YWx1ZXModmFsdWVzOiBGbG9hdDMyQXJyYXkpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlcyA9IHZhbHVlcztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHgsIHksIHosIHcpO1xuICAgICAgICBjb25zdHJ1Y3RvcigpO1xuICAgICAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheSg0KTtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlc1swXSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXNbMV0gPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzJdID1hcmd1bWVudHNbMl07XG4gICAgICAgICAgICAgICAgdGhpcy5fdmFsdWVzWzNdID1hcmd1bWVudHNbM107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbm9ybWFsaXplKCk6IFZlY3RvcjR7XG4gICAgICAgICAgICB2YXIgdiA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICAgIHZhciBkID0gTWF0aC5zcXJ0KFxuICAgICAgICAgICAgICAgIHZbMF0gKiB2WzBdICsgdlsxXSAqIHZbMV0gKyB2WzJdICogdlsyXSArIHZbM10gKiB2WzNdXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZihkID09PSAwKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gVmVjdG9yNC5jcmVhdGUoMCwgMCwgMCwgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZbMF0gPSB2WzBdIC8gZDtcbiAgICAgICAgICAgIHZbMV0gPSB2WzFdIC8gZDtcbiAgICAgICAgICAgIHZbMl0gPSB2WzJdIC8gZDtcbiAgICAgICAgICAgIHZbM10gPSB2WzNdIC8gZDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdG9WZWMzKCk6IFZlY3RvcjN7XG4gICAgICAgICAgICByZXR1cm4gVmVjdG9yMy5jcmVhdGUodGhpcy5fdmFsdWVzWzBdLCB0aGlzLl92YWx1ZXNbMV0sIHRoaXMuX3ZhbHVlc1syXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICAvKiFcbiAgICAg5rOo5oSP77ya55+p6Zi15YWD57Sg5piv5oyJ5YiX5Li75bqP5a2Y5YKo5Zyo5pWw57uE5Lit55qE44CCXG4gICAgICovXG4gICAgZXhwb3J0IGNsYXNzIE1hdHJpeHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUobWF0OkZsb2F0MzJBcnJheSk6TWF0cml4O1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpOk1hdHJpeDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKTpNYXRyaXgge1xuICAgICAgICAgICAgdmFyIG0gPSBudWxsO1xuXG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAwKXtcbiAgICAgICAgICAgICAgICBtID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgbSA9IG5ldyB0aGlzKGFyZ3VtZW50c1swXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdmFsdWVzOiBGbG9hdDMyQXJyYXkgPSBudWxsO1xuICAgICAgICBnZXQgdmFsdWVzKCk6RmxvYXQzMkFycmF5IHsgcmV0dXJuIHRoaXMuX3ZhbHVlczsgfVxuICAgICAgICBzZXQgdmFsdWVzKHZhbHVlczogRmxvYXQzMkFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSB2YWx1ZXM7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9tYXRyaXhBcnI6QXJyYXk8RmxvYXQzMkFycmF5PiA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IobWF0OkZsb2F0MzJBcnJheSk7XG4gICAgICAgIGNvbnN0cnVjdG9yKCk7XG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KFsxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxLCAwLCAwLCAwLCAwLCAxXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX21hdHJpeEFyciA9IFtdO1xuICAgICAgICB9XG5cblxuXG4gICAgICAgIHB1YmxpYyBwdXNoKCl7XG4gICAgICAgICAgICB0aGlzLl9tYXRyaXhBcnIucHVzaCh0aGlzLl92YWx1ZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHBvcCgpe1xuICAgICAgICAgICAgdGhpcy5fdmFsdWVzID0gdGhpcy5fbWF0cml4QXJyLnBvcCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNldElkZW50aXR5ICgpOiBNYXRyaXgge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLl92YWx1ZXM7XG4gICAgICAgICAgICBlWzBdID0gMTsgICBlWzRdID0gMDsgICBlWzhdICA9IDA7ICAgZVsxMl0gPSAwO1xuICAgICAgICAgICAgZVsxXSA9IDA7ICAgZVs1XSA9IDE7ICAgZVs5XSAgPSAwOyAgIGVbMTNdID0gMDtcbiAgICAgICAgICAgIGVbMl0gPSAwOyAgIGVbNl0gPSAwOyAgIGVbMTBdID0gMTsgICBlWzE0XSA9IDA7XG4gICAgICAgICAgICBlWzNdID0gMDsgICBlWzddID0gMDsgICBlWzExXSA9IDA7ICAgZVsxNV0gPSAxO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2FsY3VsYXRlIHRoZSBpbnZlcnNlIG1hdHJpeCBvZiBzcGVjaWZpZWQgbWF0cml4LCBhbmQgc2V0IHRvIHRoaXMuXG4gICAgICAgICAqIEBwYXJhbSBvdGhlciBUaGUgc291cmNlIG1hdHJpeFxuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBpbnZlcnQgKCk6TWF0cml4IHtcbiAgICAgICAgICAgIHZhciBpLCBzLCBkLCBpbnYsIGRldDtcblxuICAgICAgICAgICAgcyA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICAgIGludiA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgICAgICAgICAgZCA9IHRoaXMuX3ZhbHVlcztcblxuICAgICAgICAgICAgaW52WzBdICA9ICAgc1s1XSpzWzEwXSpzWzE1XSAtIHNbNV0gKnNbMTFdKnNbMTRdIC0gc1s5XSAqc1s2XSpzWzE1XVxuICAgICAgICAgICAgICAgICsgc1s5XSpzWzddICpzWzE0XSArIHNbMTNdKnNbNl0gKnNbMTFdIC0gc1sxM10qc1s3XSpzWzEwXTtcbiAgICAgICAgICAgIGludls0XSAgPSAtIHNbNF0qc1sxMF0qc1sxNV0gKyBzWzRdICpzWzExXSpzWzE0XSArIHNbOF0gKnNbNl0qc1sxNV1cbiAgICAgICAgICAgICAgICAtIHNbOF0qc1s3XSAqc1sxNF0gLSBzWzEyXSpzWzZdICpzWzExXSArIHNbMTJdKnNbN10qc1sxMF07XG4gICAgICAgICAgICBpbnZbOF0gID0gICBzWzRdKnNbOV0gKnNbMTVdIC0gc1s0XSAqc1sxMV0qc1sxM10gLSBzWzhdICpzWzVdKnNbMTVdXG4gICAgICAgICAgICAgICAgKyBzWzhdKnNbN10gKnNbMTNdICsgc1sxMl0qc1s1XSAqc1sxMV0gLSBzWzEyXSpzWzddKnNbOV07XG4gICAgICAgICAgICBpbnZbMTJdID0gLSBzWzRdKnNbOV0gKnNbMTRdICsgc1s0XSAqc1sxMF0qc1sxM10gKyBzWzhdICpzWzVdKnNbMTRdXG4gICAgICAgICAgICAgICAgLSBzWzhdKnNbNl0gKnNbMTNdIC0gc1sxMl0qc1s1XSAqc1sxMF0gKyBzWzEyXSpzWzZdKnNbOV07XG5cbiAgICAgICAgICAgIGludlsxXSAgPSAtIHNbMV0qc1sxMF0qc1sxNV0gKyBzWzFdICpzWzExXSpzWzE0XSArIHNbOV0gKnNbMl0qc1sxNV1cbiAgICAgICAgICAgICAgICAtIHNbOV0qc1szXSAqc1sxNF0gLSBzWzEzXSpzWzJdICpzWzExXSArIHNbMTNdKnNbM10qc1sxMF07XG4gICAgICAgICAgICBpbnZbNV0gID0gICBzWzBdKnNbMTBdKnNbMTVdIC0gc1swXSAqc1sxMV0qc1sxNF0gLSBzWzhdICpzWzJdKnNbMTVdXG4gICAgICAgICAgICAgICAgKyBzWzhdKnNbM10gKnNbMTRdICsgc1sxMl0qc1syXSAqc1sxMV0gLSBzWzEyXSpzWzNdKnNbMTBdO1xuICAgICAgICAgICAgaW52WzldICA9IC0gc1swXSpzWzldICpzWzE1XSArIHNbMF0gKnNbMTFdKnNbMTNdICsgc1s4XSAqc1sxXSpzWzE1XVxuICAgICAgICAgICAgICAgIC0gc1s4XSpzWzNdICpzWzEzXSAtIHNbMTJdKnNbMV0gKnNbMTFdICsgc1sxMl0qc1szXSpzWzldO1xuICAgICAgICAgICAgaW52WzEzXSA9ICAgc1swXSpzWzldICpzWzE0XSAtIHNbMF0gKnNbMTBdKnNbMTNdIC0gc1s4XSAqc1sxXSpzWzE0XVxuICAgICAgICAgICAgICAgICsgc1s4XSpzWzJdICpzWzEzXSArIHNbMTJdKnNbMV0gKnNbMTBdIC0gc1sxMl0qc1syXSpzWzldO1xuXG4gICAgICAgICAgICBpbnZbMl0gID0gICBzWzFdKnNbNl0qc1sxNV0gLSBzWzFdICpzWzddKnNbMTRdIC0gc1s1XSAqc1syXSpzWzE1XVxuICAgICAgICAgICAgICAgICsgc1s1XSpzWzNdKnNbMTRdICsgc1sxM10qc1syXSpzWzddICAtIHNbMTNdKnNbM10qc1s2XTtcbiAgICAgICAgICAgIGludls2XSAgPSAtIHNbMF0qc1s2XSpzWzE1XSArIHNbMF0gKnNbN10qc1sxNF0gKyBzWzRdICpzWzJdKnNbMTVdXG4gICAgICAgICAgICAgICAgLSBzWzRdKnNbM10qc1sxNF0gLSBzWzEyXSpzWzJdKnNbN10gICsgc1sxMl0qc1szXSpzWzZdO1xuICAgICAgICAgICAgaW52WzEwXSA9ICAgc1swXSpzWzVdKnNbMTVdIC0gc1swXSAqc1s3XSpzWzEzXSAtIHNbNF0gKnNbMV0qc1sxNV1cbiAgICAgICAgICAgICAgICArIHNbNF0qc1szXSpzWzEzXSArIHNbMTJdKnNbMV0qc1s3XSAgLSBzWzEyXSpzWzNdKnNbNV07XG4gICAgICAgICAgICBpbnZbMTRdID0gLSBzWzBdKnNbNV0qc1sxNF0gKyBzWzBdICpzWzZdKnNbMTNdICsgc1s0XSAqc1sxXSpzWzE0XVxuICAgICAgICAgICAgICAgIC0gc1s0XSpzWzJdKnNbMTNdIC0gc1sxMl0qc1sxXSpzWzZdICArIHNbMTJdKnNbMl0qc1s1XTtcblxuICAgICAgICAgICAgaW52WzNdICA9IC0gc1sxXSpzWzZdKnNbMTFdICsgc1sxXSpzWzddKnNbMTBdICsgc1s1XSpzWzJdKnNbMTFdXG4gICAgICAgICAgICAgICAgLSBzWzVdKnNbM10qc1sxMF0gLSBzWzldKnNbMl0qc1s3XSAgKyBzWzldKnNbM10qc1s2XTtcbiAgICAgICAgICAgIGludls3XSAgPSAgIHNbMF0qc1s2XSpzWzExXSAtIHNbMF0qc1s3XSpzWzEwXSAtIHNbNF0qc1syXSpzWzExXVxuICAgICAgICAgICAgICAgICsgc1s0XSpzWzNdKnNbMTBdICsgc1s4XSpzWzJdKnNbN10gIC0gc1s4XSpzWzNdKnNbNl07XG4gICAgICAgICAgICBpbnZbMTFdID0gLSBzWzBdKnNbNV0qc1sxMV0gKyBzWzBdKnNbN10qc1s5XSAgKyBzWzRdKnNbMV0qc1sxMV1cbiAgICAgICAgICAgICAgICAtIHNbNF0qc1szXSpzWzldICAtIHNbOF0qc1sxXSpzWzddICArIHNbOF0qc1szXSpzWzVdO1xuICAgICAgICAgICAgaW52WzE1XSA9ICAgc1swXSpzWzVdKnNbMTBdIC0gc1swXSpzWzZdKnNbOV0gIC0gc1s0XSpzWzFdKnNbMTBdXG4gICAgICAgICAgICAgICAgKyBzWzRdKnNbMl0qc1s5XSAgKyBzWzhdKnNbMV0qc1s2XSAgLSBzWzhdKnNbMl0qc1s1XTtcblxuICAgICAgICAgICAgZGV0ID0gc1swXSppbnZbMF0gKyBzWzFdKmludls0XSArIHNbMl0qaW52WzhdICsgc1szXSppbnZbMTJdO1xuICAgICAgICAgICAgaWYgKGRldCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkZXQgPSAxIC8gZGV0O1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgICAgICAgICBkW2ldID0gaW52W2ldICogZGV0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmFuc3Bvc2UgdGhlIG1hdHJpeC5cbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgdHJhbnNwb3NlICgpOk1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgZSwgdDtcblxuICAgICAgICAgICAgZSA9IHRoaXMuX3ZhbHVlcztcblxuICAgICAgICAgICAgdCA9IGVbIDFdOyAgZVsgMV0gPSBlWyA0XTsgIGVbIDRdID0gdDtcbiAgICAgICAgICAgIHQgPSBlWyAyXTsgIGVbIDJdID0gZVsgOF07ICBlWyA4XSA9IHQ7XG4gICAgICAgICAgICB0ID0gZVsgM107ICBlWyAzXSA9IGVbMTJdOyAgZVsxMl0gPSB0O1xuICAgICAgICAgICAgdCA9IGVbIDZdOyAgZVsgNl0gPSBlWyA5XTsgIGVbIDldID0gdDtcbiAgICAgICAgICAgIHQgPSBlWyA3XTsgIGVbIDddID0gZVsxM107ICBlWzEzXSA9IHQ7XG4gICAgICAgICAgICB0ID0gZVsxMV07ICBlWzExXSA9IGVbMTRdOyAgZVsxNF0gPSB0O1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhlIG1hdHJpeCBmb3IgdHJhbnNsYXRpb24uXG4gICAgICAgICAqIEBwYXJhbSB4IFRoZSBYIHZhbHVlIG9mIGEgdHJhbnNsYXRpb24uXG4gICAgICAgICAqIEBwYXJhbSB5IFRoZSBZIHZhbHVlIG9mIGEgdHJhbnNsYXRpb24uXG4gICAgICAgICAqIEBwYXJhbSB6IFRoZSBaIHZhbHVlIG9mIGEgdHJhbnNsYXRpb24uXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldFRyYW5zbGF0ZSAoeCwgeSwgeik6IE1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgZSA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICAgIGVbMF0gPSAxOyAgZVs0XSA9IDA7ICBlWzhdICA9IDA7ICBlWzEyXSA9IHg7XG4gICAgICAgICAgICBlWzFdID0gMDsgIGVbNV0gPSAxOyAgZVs5XSAgPSAwOyAgZVsxM10gPSB5O1xuICAgICAgICAgICAgZVsyXSA9IDA7ICBlWzZdID0gMDsgIGVbMTBdID0gMTsgIGVbMTRdID0gejtcbiAgICAgICAgICAgIGVbM10gPSAwOyAgZVs3XSA9IDA7ICBlWzExXSA9IDA7ICBlWzE1XSA9IDE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNdWx0aXBseSB0aGUgbWF0cml4IGZvciB0cmFuc2xhdGlvbiBmcm9tIHRoZSByaWdodC5cbiAgICAgICAgICogQHBhcmFtIHggVGhlIFggdmFsdWUgb2YgYSB0cmFuc2xhdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHkgVGhlIFkgdmFsdWUgb2YgYSB0cmFuc2xhdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHogVGhlIFogdmFsdWUgb2YgYSB0cmFuc2xhdGlvbi5cbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgdHJhbnNsYXRlICh4LCB5LCB6KTogTWF0cml4IHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNYXRyaXgoTWF0cml4LmNyZWF0ZSgpLnNldFRyYW5zbGF0ZSh4LCB5LCB6KSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgbWF0cml4IGZvciByb3RhdGlvbi5cbiAgICAgICAgICogVGhlIHZlY3RvciBvZiByb3RhdGlvbiBheGlzIG1heSBub3QgYmUgbm9ybWFsaXplZC5cbiAgICAgICAgICogQHBhcmFtIGFuZ2xlIFRoZSBhbmdsZSBvZiByb3RhdGlvbiAoZGVncmVlcylcbiAgICAgICAgICogQHBhcmFtIHggVGhlIFggY29vcmRpbmF0ZSBvZiB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcy5cbiAgICAgICAgICogQHBhcmFtIHkgVGhlIFkgY29vcmRpbmF0ZSBvZiB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcy5cbiAgICAgICAgICogQHBhcmFtIHogVGhlIFogY29vcmRpbmF0ZSBvZiB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcy5cbiAgICAgICAgICogQHJldHVybiB0aGlzXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0Um90YXRlIChhbmdsZTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlciwgejpudW1iZXIpOiBNYXRyaXgge1xuICAgICAgICAgICAgdmFyIGUsIHMsIGMsIGxlbiwgcmxlbiwgbmMsIHh5LCB5eiwgengsIHhzLCB5cywgenM7XG5cbiAgICAgICAgICAgIHZhciBhbmdsZSA9IE1hdGguUEkgKiBhbmdsZSAvIDE4MDtcbiAgICAgICAgICAgIGUgPSB0aGlzLl92YWx1ZXM7XG5cbiAgICAgICAgICAgIHMgPSBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgICAgICBjID0gTWF0aC5jb3MoYW5nbGUpO1xuXG4gICAgICAgICAgICBpZiAoMCAhPT0geCAmJiAwID09PSB5ICYmIDAgPT09IHopIHtcbiAgICAgICAgICAgICAgICAvLyBSb3RhdGlvbiBhcm91bmQgWCBheGlzXG4gICAgICAgICAgICAgICAgaWYgKHggPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHMgPSAtcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZVswXSA9IDE7ICBlWzRdID0gMDsgIGVbIDhdID0gMDsgIGVbMTJdID0gMDtcbiAgICAgICAgICAgICAgICBlWzFdID0gMDsgIGVbNV0gPSBjOyAgZVsgOV0gPS1zOyAgZVsxM10gPSAwO1xuICAgICAgICAgICAgICAgIGVbMl0gPSAwOyAgZVs2XSA9IHM7ICBlWzEwXSA9IGM7ICBlWzE0XSA9IDA7XG4gICAgICAgICAgICAgICAgZVszXSA9IDA7ICBlWzddID0gMDsgIGVbMTFdID0gMDsgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoMCA9PT0geCAmJiAwICE9PSB5ICYmIDAgPT09IHopIHtcbiAgICAgICAgICAgICAgICAvLyBSb3RhdGlvbiBhcm91bmQgWSBheGlzXG4gICAgICAgICAgICAgICAgaWYgKHkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHMgPSAtcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZVswXSA9IGM7ICBlWzRdID0gMDsgIGVbIDhdID0gczsgIGVbMTJdID0gMDtcbiAgICAgICAgICAgICAgICBlWzFdID0gMDsgIGVbNV0gPSAxOyAgZVsgOV0gPSAwOyAgZVsxM10gPSAwO1xuICAgICAgICAgICAgICAgIGVbMl0gPS1zOyAgZVs2XSA9IDA7ICBlWzEwXSA9IGM7ICBlWzE0XSA9IDA7XG4gICAgICAgICAgICAgICAgZVszXSA9IDA7ICBlWzddID0gMDsgIGVbMTFdID0gMDsgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoMCA9PT0geCAmJiAwID09PSB5ICYmIDAgIT09IHopIHtcbiAgICAgICAgICAgICAgICAvLyBSb3RhdGlvbiBhcm91bmQgWiBheGlzXG4gICAgICAgICAgICAgICAgaWYgKHogPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHMgPSAtcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZVswXSA9IGM7ICBlWzRdID0tczsgIGVbIDhdID0gMDsgIGVbMTJdID0gMDtcbiAgICAgICAgICAgICAgICBlWzFdID0gczsgIGVbNV0gPSBjOyAgZVsgOV0gPSAwOyAgZVsxM10gPSAwO1xuICAgICAgICAgICAgICAgIGVbMl0gPSAwOyAgZVs2XSA9IDA7ICBlWzEwXSA9IDE7ICBlWzE0XSA9IDA7XG4gICAgICAgICAgICAgICAgZVszXSA9IDA7ICBlWzddID0gMDsgIGVbMTFdID0gMDsgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUm90YXRpb24gYXJvdW5kIGFub3RoZXIgYXhpc1xuICAgICAgICAgICAgICAgIGxlbiA9IE1hdGguc3FydCh4KnggKyB5KnkgKyB6KnopO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/ovazmjaLkuLrljZXkvY3lkJHph49cbiAgICAgICAgICAgICAgICAgICAgcmxlbiA9IDEgLyBsZW47XG4gICAgICAgICAgICAgICAgICAgIHggKj0gcmxlbjtcbiAgICAgICAgICAgICAgICAgICAgeSAqPSBybGVuO1xuICAgICAgICAgICAgICAgICAgICB6ICo9IHJsZW47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbmMgPSAxIC0gYztcbiAgICAgICAgICAgICAgICB4eSA9IHggKiB5O1xuICAgICAgICAgICAgICAgIHl6ID0geSAqIHo7XG4gICAgICAgICAgICAgICAgenggPSB6ICogeDtcbiAgICAgICAgICAgICAgICB4cyA9IHggKiBzO1xuICAgICAgICAgICAgICAgIHlzID0geSAqIHM7XG4gICAgICAgICAgICAgICAgenMgPSB6ICogcztcblxuICAgICAgICAgICAgICAgIGVbIDBdID0geCp4Km5jICsgIGM7XG4gICAgICAgICAgICAgICAgZVsgMV0gPSB4eSAqbmMgKyB6cztcbiAgICAgICAgICAgICAgICBlWyAyXSA9IHp4ICpuYyAtIHlzO1xuICAgICAgICAgICAgICAgIGVbIDNdID0gMDtcblxuICAgICAgICAgICAgICAgIGVbIDRdID0geHkgKm5jIC0genM7XG4gICAgICAgICAgICAgICAgZVsgNV0gPSB5KnkqbmMgKyAgYztcbiAgICAgICAgICAgICAgICBlWyA2XSA9IHl6ICpuYyArIHhzO1xuICAgICAgICAgICAgICAgIGVbIDddID0gMDtcblxuICAgICAgICAgICAgICAgIGVbIDhdID0genggKm5jICsgeXM7XG4gICAgICAgICAgICAgICAgZVsgOV0gPSB5eiAqbmMgLSB4cztcbiAgICAgICAgICAgICAgICBlWzEwXSA9IHoqeipuYyArICBjO1xuICAgICAgICAgICAgICAgIGVbMTFdID0gMDtcblxuICAgICAgICAgICAgICAgIGVbMTJdID0gMDtcbiAgICAgICAgICAgICAgICBlWzEzXSA9IDA7XG4gICAgICAgICAgICAgICAgZVsxNF0gPSAwO1xuICAgICAgICAgICAgICAgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogTXVsdGlwbHkgdGhlIG1hdHJpeCBmb3Igcm90YXRpb24gZnJvbSB0aGUgcmlnaHQuXG4gICAgICAgICAqIFRoZSB2ZWN0b3Igb2Ygcm90YXRpb24gYXhpcyBtYXkgbm90IGJlIG5vcm1hbGl6ZWQuXG4gICAgICAgICAqIEBwYXJhbSBhbmdsZSBUaGUgYW5nbGUgb2Ygcm90YXRpb24gKGRlZ3JlZXMpXG4gICAgICAgICAqIEBwYXJhbSB4IFRoZSBYIGNvb3JkaW5hdGUgb2YgdmVjdG9yIG9mIHJvdGF0aW9uIGF4aXMuXG4gICAgICAgICAqIEBwYXJhbSB5IFRoZSBZIGNvb3JkaW5hdGUgb2YgdmVjdG9yIG9mIHJvdGF0aW9uIGF4aXMuXG4gICAgICAgICAqIEBwYXJhbSB6IFRoZSBaIGNvb3JkaW5hdGUgb2YgdmVjdG9yIG9mIHJvdGF0aW9uIGF4aXMuXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHJvdGF0ZSAoYW5nbGUsIHZlY3RvcjM6VmVjdG9yMyk6IE1hdHJpeDtcbiAgICAgICAgcHVibGljIHJvdGF0ZSAoYW5nbGUsIHgsIHksIHopOiBNYXRyaXg7XG5cbiAgICAgICAgcHVibGljIHJvdGF0ZSAoYXJncyk6IE1hdHJpeCB7XG4gICAgICAgICAgICB2YXIgYW5nbGUgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuICAgICAgICAgICAgICAgIGxldCB2ZWN0b3IzID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseU1hdHJpeChNYXRyaXguY3JlYXRlKCkuc2V0Um90YXRlKGFuZ2xlLCB2ZWN0b3IzLnZhbHVlc1swXSwgdmVjdG9yMy52YWx1ZXNbMV0sIHZlY3RvcjMudmFsdWVzWzJdKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpe1xuICAgICAgICAgICAgICAgIGxldCB4ID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICB5ID0gYXJndW1lbnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICB6ID0gYXJndW1lbnRzWzNdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseU1hdHJpeChNYXRyaXguY3JlYXRlKCkuc2V0Um90YXRlKGFuZ2xlLCB4LCB5LCB6KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgbWF0cml4IGZvciBzY2FsaW5nLlxuICAgICAgICAgKiBAcGFyYW0geCBUaGUgc2NhbGUgZmFjdG9yIGFsb25nIHRoZSBYIGF4aXNcbiAgICAgICAgICogQHBhcmFtIHkgVGhlIHNjYWxlIGZhY3RvciBhbG9uZyB0aGUgWSBheGlzXG4gICAgICAgICAqIEBwYXJhbSB6IFRoZSBzY2FsZSBmYWN0b3IgYWxvbmcgdGhlIFogYXhpc1xuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRTY2FsZSAoeCwgeSwgeik6TWF0cml4IHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5fdmFsdWVzO1xuICAgICAgICAgICAgZVswXSA9IHg7ICBlWzRdID0gMDsgIGVbOF0gID0gMDsgIGVbMTJdID0gMDtcbiAgICAgICAgICAgIGVbMV0gPSAwOyAgZVs1XSA9IHk7ICBlWzldICA9IDA7ICBlWzEzXSA9IDA7XG4gICAgICAgICAgICBlWzJdID0gMDsgIGVbNl0gPSAwOyAgZVsxMF0gPSB6OyAgZVsxNF0gPSAwO1xuICAgICAgICAgICAgZVszXSA9IDA7ICBlWzddID0gMDsgIGVbMTFdID0gMDsgIGVbMTVdID0gMTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE11bHRpcGx5IHRoZSBtYXRyaXggZm9yIHNjYWxpbmcgZnJvbSB0aGUgcmlnaHQuXG4gICAgICAgICAqIEBwYXJhbSB4IFRoZSBzY2FsZSBmYWN0b3IgYWxvbmcgdGhlIFggYXhpc1xuICAgICAgICAgKiBAcGFyYW0geSBUaGUgc2NhbGUgZmFjdG9yIGFsb25nIHRoZSBZIGF4aXNcbiAgICAgICAgICogQHBhcmFtIHogVGhlIHNjYWxlIGZhY3RvciBhbG9uZyB0aGUgWiBheGlzXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNjYWxlICh4LCB5LCB6KTpNYXRyaXgge1xuICAgICAgICAgICAgdGhpcy5hcHBseU1hdHJpeChNYXRyaXguY3JlYXRlKCkuc2V0U2NhbGUoeCwgeSwgeikpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRMb29rQXQgKGV5ZTpWZWN0b3IzLCBjZW50ZXI6VmVjdG9yMywgdXA6VmVjdG9yMyk6TWF0cml4O1xuICAgICAgICBwdWJsaWMgc2V0TG9va0F0IChleWVYOm51bWJlciwgZXllWTpudW1iZXIsIGV5ZVo6bnVtYmVyLCBjZW50ZXJYOm51bWJlciwgY2VudGVyWTpudW1iZXIsIGNlbnRlclo6bnVtYmVyLCB1cFg6bnVtYmVyLCB1cFk6bnVtYmVyLCB1cFo6bnVtYmVyKTpNYXRyaXg7XG5cbiAgICAgICAgLy9wdWJsaWMgc2V0TG9va0F0IChhcmdzKTpNYXRyaXgge1xuICAgICAgICAvLyAgICB2YXIgZSwgZngsIGZ5LCBmeiwgcmxmLCBzeCwgc3ksIHN6LCBybHMsIHV4LCB1eSwgdXosXG4gICAgICAgIC8vICAgICAgICBleWUgPSBudWxsLFxuICAgICAgICAvLyAgICAgICAgY2VudGVyID0gbnVsbCxcbiAgICAgICAgLy8gICAgICAgIHVwID0gbnVsbDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyl7XG4gICAgICAgIC8vICAgICAgICBleWUgPSBhcmd1bWVudHNbMF07XG4gICAgICAgIC8vICAgICAgICBjZW50ZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICAgIC8vICAgICAgICB1cCA9IGFyZ3VtZW50c1syXVxuICAgICAgICAvLyAgICB9XG4gICAgICAgIC8vICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gOSl7XG4gICAgICAgIC8vICAgICAgICBleWUgPSBWZWN0b3IzLmNyZWF0ZShhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgLy8gICAgICAgIGNlbnRlciA9IFZlY3RvcjMuY3JlYXRlKGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdLCBhcmd1bWVudHNbNV0pO1xuICAgICAgICAvLyAgICAgICAgdXAgPSBWZWN0b3IzLmNyZWF0ZShhcmd1bWVudHNbNl0sIGFyZ3VtZW50c1s3XSwgYXJndW1lbnRzWzhdKTtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICBmeCA9IGNlbnRlci54IC0gZXllLng7XG4gICAgICAgIC8vICAgIGZ5ID0gY2VudGVyLnkgLSBleWUueTtcbiAgICAgICAgLy8gICAgZnogPSBjZW50ZXIueiAtIGV5ZS56O1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAvLyBOb3JtYWxpemUgZi5cbiAgICAgICAgLy8gICAgcmxmID0gMSAvIE1hdGguc3FydChmeCpmeCArIGZ5KmZ5ICsgZnoqZnopO1xuICAgICAgICAvLyAgICBmeCAqPSBybGY7XG4gICAgICAgIC8vICAgIGZ5ICo9IHJsZjtcbiAgICAgICAgLy8gICAgZnogKj0gcmxmO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAvLyBDYWxjdWxhdGUgY3Jvc3MgcHJvZHVjdCBvZiBmIGFuZCB1cC5cbiAgICAgICAgLy8gICAgc3ggPSBmeSAqIHVwLnogLSBmeiAqIHVwLnk7XG4gICAgICAgIC8vICAgIHN5ID0gZnogKiB1cC54IC0gZnggKiB1cC56O1xuICAgICAgICAvLyAgICBzeiA9IGZ4ICogdXAueSAtIGZ5ICogdXAueDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgLy8gTm9ybWFsaXplIHMuXG4gICAgICAgIC8vICAgIHJscyA9IDEgLyBNYXRoLnNxcnQoc3gqc3ggKyBzeSpzeSArIHN6KnN6KTtcbiAgICAgICAgLy8gICAgc3ggKj0gcmxzO1xuICAgICAgICAvLyAgICBzeSAqPSBybHM7XG4gICAgICAgIC8vICAgIHN6ICo9IHJscztcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgLy8gQ2FsY3VsYXRlIGNyb3NzIHByb2R1Y3Qgb2YgcyBhbmQgZi5cbiAgICAgICAgLy8gICAgdXggPSBzeSAqIGZ6IC0gc3ogKiBmeTtcbiAgICAgICAgLy8gICAgdXkgPSBzeiAqIGZ4IC0gc3ggKiBmejtcbiAgICAgICAgLy8gICAgdXogPSBzeCAqIGZ5IC0gc3kgKiBmeDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgLy8gU2V0IHRvIHRoaXMuXG4gICAgICAgIC8vICAgIGUgPSB0aGlzLl92YWx1ZXM7XG4gICAgICAgIC8vICAgIGVbMF0gPSBzeDtcbiAgICAgICAgLy8gICAgZVsxXSA9IHV4O1xuICAgICAgICAvLyAgICBlWzJdID0gLWZ4O1xuICAgICAgICAvLyAgICBlWzNdID0gMDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgZVs0XSA9IHN5O1xuICAgICAgICAvLyAgICBlWzVdID0gdXk7XG4gICAgICAgIC8vICAgIGVbNl0gPSAtZnk7XG4gICAgICAgIC8vICAgIGVbN10gPSAwO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICBlWzhdID0gc3o7XG4gICAgICAgIC8vICAgIGVbOV0gPSB1ejtcbiAgICAgICAgLy8gICAgZVsxMF0gPSAtZno7XG4gICAgICAgIC8vICAgIGVbMTFdID0gMDtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgLy9lWzEyXSA9IDA7XG4gICAgICAgIC8vICAgIC8vZVsxM10gPSAwO1xuICAgICAgICAvLyAgICAvL2VbMTRdID0gMDtcbiAgICAgICAgLy8gICAgLy9lWzE1XSA9IDE7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIGVbMTJdID0gLWV5ZS54O1xuICAgICAgICAvLyAgICBlWzEzXSA9IC1leWUueTtcbiAgICAgICAgLy8gICAgZVsxNF0gPSAtZXllLno7XG4gICAgICAgIC8vICAgIGVbMTVdID0gMTtcbiAgICAgICAgLy8gICAgLy9UcmFuc2xhdGUuXG4gICAgICAgIC8vICAgIC8vdGhpcy50cmFuc2xhdGUoLWV5ZS54LCAtZXllLnksIC1leWUueik7XG4gICAgICAgIC8vICAgIC8vdGhpcy52YWx1ZXMgPSB0aGlzLm11bHRpcGx5KE1hdHJpeC5jcmVhdGUoKS5zZXRUcmFuc2xhdGUoLWV5ZS54LCAtZXllLnksIC1leWUueikpLnZhbHVlcztcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIC8vfVxuICAgICAgICAvKipcbiAgICAgICAgICogQGZ1bmN0aW9uXG4gICAgICAgICAqIEBuYW1lIHBjLk1hdDQjc2V0TG9va0F0XG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBTZXRzIHRoZSBzcGVjaWZpZWQgbWF0cml4IHRvIGEgdmlld2luZyBtYXRyaXggZGVyaXZlZCBmcm9tIGFuIGV5ZSBwb2ludCwgYSB0YXJnZXQgcG9pbnRcbiAgICAgICAgICogYW5kIGFuIHVwIHZlY3Rvci4gVGhlIG1hdHJpeCBtYXBzIHRoZSB0YXJnZXQgcG9pbnQgdG8gdGhlIG5lZ2F0aXZlIHotYXhpcyBhbmQgdGhlIGV5ZSBwb2ludCB0byB0aGVcbiAgICAgICAgICogb3JpZ2luLCBzbyB0aGF0IHdoZW4geW91IHVzZSBhIHR5cGljYWwgcHJvamVjdGlvbiBtYXRyaXgsIHRoZSBjZW50ZXIgb2YgdGhlIHNjZW5lIG1hcHMgdG8gdGhlIGNlbnRlclxuICAgICAgICAgKiBvZiB0aGUgdmlld3BvcnQuIFNpbWlsYXJseSwgdGhlIGRpcmVjdGlvbiBkZXNjcmliZWQgYnkgdGhlIHVwIHZlY3RvciBwcm9qZWN0ZWQgb250byB0aGUgdmlld2luZyBwbGFuZVxuICAgICAgICAgKiBpcyBtYXBwZWQgdG8gdGhlIHBvc2l0aXZlIHktYXhpcyBzbyB0aGF0IGl0IHBvaW50cyB1cHdhcmQgaW4gdGhlIHZpZXdwb3J0LiBUaGUgdXAgdmVjdG9yIG11c3Qgbm90IGJlXG4gICAgICAgICAqIHBhcmFsbGVsIHRvIHRoZSBsaW5lIG9mIHNpZ2h0IGZyb20gdGhlIGV5ZSB0byB0aGUgcmVmZXJlbmNlIHBvaW50LlxuICAgICAgICAgKiBAcGFyYW0ge3BjLlZlYzN9IHBvc2l0aW9uIDMtZCB2ZWN0b3IgaG9sZGluZyB2aWV3IHBvc2l0aW9uLlxuICAgICAgICAgKiBAcGFyYW0ge3BjLlZlYzN9IHRhcmdldCAzLWQgdmVjdG9yIGhvbGRpbmcgcmVmZXJlbmNlIHBvaW50LlxuICAgICAgICAgKiBAcGFyYW0ge3BjLlZlYzN9IHVwIDMtZCB2ZWN0b3IgaG9sZGluZyB0aGUgdXAgZGlyZWN0aW9uLlxuICAgICAgICAgKiBAcmV0dXJucyB7cGMuTWF0NH0gU2VsZiBmb3IgY2hhaW5pbmcuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIHZhciBwb3NpdGlvbiA9IG5ldyBwYy5WZWMzKDEwLCAxMCwgMTApO1xuICAgICAgICAgKiB2YXIgdGFyZ2V0ID0gbmV3IHBjLlZlYzMoMCwgMCwgMCk7XG4gICAgICAgICAqIHZhciB1cCA9IG5ldyBwYy5WZWMzKDAsIDEsIDApO1xuICAgICAgICAgKiB2YXIgbSA9IG5ldyBwYy5NYXQ0KCkuc2V0TG9va0F0KHBvc2l0aW9uLCB0YXJnZXQsIHVwKTtcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRMb29rQXQoYXJncykge1xuICAgICAgICB2YXIgeCwgeSwgeixcbiAgICAgICAgICAgIGV5ZSwgY2VudGVyLCB1cDtcblxuICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKXtcbiAgICAgICAgICAgIGV5ZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGNlbnRlciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIHVwID0gYXJndW1lbnRzWzJdXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSA5KXtcbiAgICAgICAgICAgIGV5ZSA9IFZlY3RvcjMuY3JlYXRlKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICAgICAgY2VudGVyID0gVmVjdG9yMy5jcmVhdGUoYXJndW1lbnRzWzNdLCBhcmd1bWVudHNbNF0sIGFyZ3VtZW50c1s1XSk7XG4gICAgICAgICAgICB1cCA9IFZlY3RvcjMuY3JlYXRlKGFyZ3VtZW50c1s2XSwgYXJndW1lbnRzWzddLCBhcmd1bWVudHNbOF0pO1xuICAgICAgICB9XG4gICAgICAgIHggPSBWZWN0b3IzLmNyZWF0ZSgpO1xuXG4gICAgICAgICAgICB6ID0gZXllLmNvcHkoKS5zdWIoY2VudGVyKS5ub3JtYWxpemUoKTtcblxuICAgICAgICAgICAgeSA9IHVwLmNvcHkoKS5ub3JtYWxpemUoKTtcbiAgICAgICAgICAgIHguY3Jvc3MoeSwgeikubm9ybWFsaXplKCk7XG4gICAgICAgICAgICB5LmNyb3NzKHosIHgpO1xuXG4gICAgICAgICAgICB2YXIgciA9IHRoaXMuX3ZhbHVlcztcblxuICAgICAgICAgICAgclswXSAgPSB4Lng7XG4gICAgICAgICAgICByWzFdICA9IHgueTtcbiAgICAgICAgICAgIHJbMl0gID0geC56O1xuICAgICAgICAgICAgclszXSAgPSAwO1xuICAgICAgICAgICAgcls0XSAgPSB5Lng7XG4gICAgICAgICAgICByWzVdICA9IHkueTtcbiAgICAgICAgICAgIHJbNl0gID0geS56O1xuICAgICAgICAgICAgcls3XSAgPSAwO1xuICAgICAgICAgICAgcls4XSAgPSB6Lng7XG4gICAgICAgICAgICByWzldICA9IHoueTtcbiAgICAgICAgICAgIHJbMTBdID0gei56O1xuICAgICAgICAgICAgclsxMV0gPSAwO1xuICAgICAgICAgICAgclsxMl0gPSBleWUueDtcbiAgICAgICAgICAgIHJbMTNdID0gZXllLnk7XG4gICAgICAgICAgICByWzE0XSA9IGV5ZS56O1xuICAgICAgICAgICAgclsxNV0gPSAxO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNdWx0aXBseSB0aGUgdmlld2luZyBtYXRyaXggZnJvbSB0aGUgcmlnaHQuXG4gICAgICAgICAqIEBwYXJhbSBleWVYLCBleWVZLCBleWVaIFRoZSBwb3NpdGlvbiBvZiB0aGUgZXllIHBvaW50LlxuICAgICAgICAgKiBAcGFyYW0gY2VudGVyWCwgY2VudGVyWSwgY2VudGVyWiBUaGUgcG9zaXRpb24gb2YgdGhlIHJlZmVyZW5jZSBwb2ludC5cbiAgICAgICAgICogQHBhcmFtIHVwWCwgdXBZLCB1cFogVGhlIGRpcmVjdGlvbiBvZiB0aGUgdXAgdmVjdG9yLlxuICAgICAgICAgKiBAcmV0dXJuIHRoaXNcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBsb29rQXQgKGV5ZTpWZWN0b3IzLCBjZW50ZXI6VmVjdG9yMywgdXA6VmVjdG9yMyk6TWF0cml4O1xuICAgICAgICBwdWJsaWMgbG9va0F0IChleWVYOm51bWJlciwgZXllWTpudW1iZXIsIGV5ZVo6bnVtYmVyLCBjZW50ZXJYOm51bWJlciwgY2VudGVyWTpudW1iZXIsIGNlbnRlclo6bnVtYmVyLCB1cFg6bnVtYmVyLCB1cFk6bnVtYmVyLCB1cFo6bnVtYmVyKTpNYXRyaXg7XG5cbiAgICAgICAgcHVibGljIGxvb2tBdCAoYXJncyk6TWF0cml4IHtcbiAgICAgICAgICAgIHZhciBtYXRyaXggPSBNYXRyaXguY3JlYXRlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYXBwbHlNYXRyaXgobWF0cml4LnNldExvb2tBdC5hcHBseShtYXRyaXgsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBzZXRPcnRobyAobmVhciwgZmFyKTpNYXRyaXgge1xuICAgICAgICAgICAgdmFyIGUgPSB0aGlzLl92YWx1ZXM7XG5cbiAgICAgICAgICAgIGVbMF0gPSAxO1xuICAgICAgICAgICAgZVsxXSA9IDA7XG4gICAgICAgICAgICBlWzJdID0gMDtcbiAgICAgICAgICAgIGVbM10gPSAwO1xuICAgICAgICAgICAgZVs0XSA9IDA7XG4gICAgICAgICAgICBlWzVdID0gMTtcbiAgICAgICAgICAgIGVbNl0gPSAwO1xuICAgICAgICAgICAgZVs3XSA9IDA7XG4gICAgICAgICAgICBlWzhdID0gMDtcbiAgICAgICAgICAgIGVbOV0gPSAwO1xuICAgICAgICAgICAgZVsxMF0gPSAyIC8gKG5lYXIgLSBmYXIpO1xuICAgICAgICAgICAgZVsxMV0gPSAwO1xuICAgICAgICAgICAgZVsxMl0gPSAwO1xuICAgICAgICAgICAgZVsxM10gPSAwO1xuICAgICAgICAgICAgZVsxNF0gPSAobmVhciArIGZhcikgLyAobmVhciAtIGZhcik7XG4gICAgICAgICAgICBlWzE1XSA9IDE7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9ydGhvIChuLCBmKTpNYXRyaXh7XG4gICAgICAgICAgICB0aGlzLmFwcGx5TWF0cml4KE1hdHJpeC5jcmVhdGUoKS5zZXRPcnRobyhuLCBmKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB0aGUgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggYnkgZm92eSBhbmQgYXNwZWN0LlxuICAgICAgICAgKiBAcGFyYW0gZm92eSBUaGUgYW5nbGUgYmV0d2VlbiB0aGUgdXBwZXIgYW5kIGxvd2VyIHNpZGVzIG9mIHRoZSBmcnVzdHVtLlxuICAgICAgICAgKiBAcGFyYW0gYXNwZWN0IFRoZSBhc3BlY3QgcmF0aW8gb2YgdGhlIGZydXN0dW0uICh3aWR0aC9oZWlnaHQpXG4gICAgICAgICAqIEBwYXJhbSBuZWFyIFRoZSBkaXN0YW5jZXMgdG8gdGhlIG5lYXJlciBkZXB0aCBjbGlwcGluZyBwbGFuZS4gVGhpcyB2YWx1ZSBtdXN0IGJlIHBsdXMgdmFsdWUuXG4gICAgICAgICAqIEBwYXJhbSBmYXIgVGhlIGRpc3RhbmNlcyB0byB0aGUgZmFydGhlciBkZXB0aCBjbGlwcGluZyBwbGFuZS4gVGhpcyB2YWx1ZSBtdXN0IGJlIHBsdXMgdmFsdWUuXG4gICAgICAgICAqIEByZXR1cm4gdGhpc1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldFBlcnNwZWN0aXZlIChmb3Z5OiBudW1iZXIsIGFzcGVjdCwgbmVhciwgZmFyKTpNYXRyaXgge1xuICAgICAgICAgICAgdmFyIGUsIHJkLCBzLCBjdCxcbiAgICAgICAgICAgICAgICBsb2cgPSBkeUNiLkxvZyxcbiAgICAgICAgICAgICAgICBpbmZvID0gbG9nLmluZm87XG5cbiAgICAgICAgICAgIGxvZy5lcnJvcihuZWFyID09PSBmYXIgfHwgYXNwZWN0ID09PSAwLCBpbmZvLkZVTkNfTVVTVF9OT1RfQkUoXCJmcnVzdHVtXCIsIFwibnVsbFwiKSk7XG4gICAgICAgICAgICBsb2cuZXJyb3IobmVhciA8PSAwLCBpbmZvLkZVTkNfTVVTVChcIm5lYXJcIiwgXCI+IDBcIikpO1xuICAgICAgICAgICAgbG9nLmVycm9yKGZhciA8PSAwLCBpbmZvLkZVTkNfTVVTVChcImZhclwiLCBcIj4gMFwiKSk7XG5cbiAgICAgICAgICAgIHZhciBmb3Z5ID0gTWF0aC5QSSAqIGZvdnkgLyAxODAgLyAyO1xuICAgICAgICAgICAgcyA9IE1hdGguc2luKGZvdnkpO1xuICAgICAgICAgICAgaWYgKHMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBsb2cuZXJyb3IocyA9PT0gMCwgaW5mby5GVU5DX01VU1RfTk9UX0JFKFwiZnJ1c3R1bVwiLCBcIm51bGxcIikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZCA9IDEgLyAoZmFyIC0gbmVhcik7XG4gICAgICAgICAgICBjdCA9IE1hdGguY29zKGZvdnkpIC8gcztcblxuICAgICAgICAgICAgZSA9IHRoaXMuX3ZhbHVlcztcblxuICAgICAgICAgICAgZVswXSAgPSBjdCAvIGFzcGVjdDtcbiAgICAgICAgICAgIGVbMV0gID0gMDtcbiAgICAgICAgICAgIGVbMl0gID0gMDtcbiAgICAgICAgICAgIGVbM10gID0gMDtcblxuICAgICAgICAgICAgZVs0XSAgPSAwO1xuICAgICAgICAgICAgZVs1XSAgPSBjdDtcbiAgICAgICAgICAgIGVbNl0gID0gMDtcbiAgICAgICAgICAgIGVbN10gID0gMDtcblxuICAgICAgICAgICAgZVs4XSAgPSAwO1xuICAgICAgICAgICAgZVs5XSAgPSAwO1xuICAgICAgICAgICAgZVsxMF0gPSAtKGZhciArIG5lYXIpICogcmQ7XG4gICAgICAgICAgICBlWzExXSA9IC0xO1xuXG4gICAgICAgICAgICBlWzEyXSA9IDA7XG4gICAgICAgICAgICBlWzEzXSA9IDA7XG4gICAgICAgICAgICBlWzE0XSA9IC0yICogbmVhciAqIGZhciAqIHJkO1xuICAgICAgICAgICAgZVsxNV0gPSAwO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBwZXJzcGVjdGl2ZSAoZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpOk1hdHJpeHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlNYXRyaXgoTWF0cml4LmNyZWF0ZSgpLnNldFBlcnNwZWN0aXZlKGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFwcGx5TWF0cml4IChvdGhlcjpNYXRyaXgpOk1hdHJpeHtcbiAgICAgICAgICAgIHZhciBhID0gdGhpcyxcbiAgICAgICAgICAgICAgICBiID0gb3RoZXIuY29weSgpO1xuXG4gICAgICAgICAgICAvL3RoaXMuX3ZhbHVlcyA9IE1hdGhVdGlscy5tdWx0aXBseShhLCBiKTtcbiAgICAgICAgICAgICAgICAvL2IqYe+8jOiAjOS4jeaYr2EqYlxuICAgICAgICAgICAgICAgIC8v6L+Z5piv5Zug5Li65Zyod2ViZ2zkuK3vvIzlkJHph4/mmK/lj7PkuZjnmoTvvIxcbiAgICAgICAgICAgICAgICAvL+atpOWkhOW4jOacm+WdkOagh+WQkemHj+WFiOi/m+ihjHRoaXMuX3ZhbHVlc+eahOWPmOaNou+8jOeEtuWQjui/m+ihjG90aGVyLnZhbHVlc+eahOWPmOaNou+8jOWboOatpOimgWIqYe+8jOS7juiAjOWcqOWPs+S5mOWQkemHj+aXtuS4umIqYSp2ZWNcbiAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZXMgPSBiLm11bHRpcGx5KGEpLnZhbHVlcztcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbXVsdGlwbHkobWF0cml4MjpNYXRyaXgpOk1hdHJpeDtcbiAgICAgICAgcHVibGljIG11bHRpcGx5KG1hdHJpeDE6TWF0cml4LCBtYXRyaXgyOk1hdHJpeCk6TWF0cml4O1xuXG4gICAgICAgIHB1YmxpYyBtdWx0aXBseShhcmdzKTpNYXRyaXgge1xuICAgICAgICAgICAgdmFyIG1hdDEgPSBudWxsLFxuICAgICAgICAgICAgICAgIG1hdDIgPSBudWxsLFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG51bGw7XG5cbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3ZhbHVlcztcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgbWF0MSA9IHRoaXMuX3ZhbHVlcztcbiAgICAgICAgICAgICAgICBtYXQyID0gYXJndW1lbnRzWzBdLnZhbHVlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgbWF0MSA9IGFyZ3VtZW50c1swXS52YWx1ZXM7XG4gICAgICAgICAgICAgICAgbWF0MiA9IGFyZ3VtZW50c1sxXS52YWx1ZXM7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGEgPSBtYXQxWzBdLCBiID0gbWF0MVsxXSwgYyA9IG1hdDFbMl0sIGQgPSBtYXQxWzNdLFxuICAgICAgICAgICAgICAgIGUgPSBtYXQxWzRdLCBmID0gbWF0MVs1XSwgZyA9IG1hdDFbNl0sIGggPSBtYXQxWzddLFxuICAgICAgICAgICAgICAgIGkgPSBtYXQxWzhdLCBqID0gbWF0MVs5XSwgayA9IG1hdDFbMTBdLCBsID0gbWF0MVsxMV0sXG4gICAgICAgICAgICAgICAgbSA9IG1hdDFbMTJdLCBuID0gbWF0MVsxM10sIG8gPSBtYXQxWzE0XSwgcCA9IG1hdDFbMTVdLFxuICAgICAgICAgICAgICAgIEEgPSBtYXQyWzBdLCBCID0gbWF0MlsxXSwgQyA9IG1hdDJbMl0sIEQgPSBtYXQyWzNdLFxuICAgICAgICAgICAgICAgIEUgPSBtYXQyWzRdLCBGID0gbWF0Mls1XSwgRyA9IG1hdDJbNl0sIEggPSBtYXQyWzddLFxuICAgICAgICAgICAgICAgIEkgPSBtYXQyWzhdLCBKID0gbWF0Mls5XSwgSyA9IG1hdDJbMTBdLCBMID0gbWF0MlsxMV0sXG4gICAgICAgICAgICAgICAgTSA9IG1hdDJbMTJdLCBOID0gbWF0MlsxM10sIE8gPSBtYXQyWzE0XSwgUCA9IG1hdDJbMTVdO1xuXG4gICAgICAgICAgICByZXN1bHRbMF0gPSBBICogYSArIEIgKiBlICsgQyAqIGkgKyBEICogbTtcbiAgICAgICAgICAgIHJlc3VsdFsxXSA9IEEgKiBiICsgQiAqIGYgKyBDICogaiArIEQgKiBuO1xuICAgICAgICAgICAgcmVzdWx0WzJdID0gQSAqIGMgKyBCICogZyArIEMgKiBrICsgRCAqIG87XG4gICAgICAgICAgICByZXN1bHRbM10gPSBBICogZCArIEIgKiBoICsgQyAqIGwgKyBEICogcDtcbiAgICAgICAgICAgIHJlc3VsdFs0XSA9IEUgKiBhICsgRiAqIGUgKyBHICogaSArIEggKiBtO1xuICAgICAgICAgICAgcmVzdWx0WzVdID0gRSAqIGIgKyBGICogZiArIEcgKiBqICsgSCAqIG47XG4gICAgICAgICAgICByZXN1bHRbNl0gPSBFICogYyArIEYgKiBnICsgRyAqIGsgKyBIICogbztcbiAgICAgICAgICAgIHJlc3VsdFs3XSA9IEUgKiBkICsgRiAqIGggKyBHICogbCArIEggKiBwO1xuICAgICAgICAgICAgcmVzdWx0WzhdID0gSSAqIGEgKyBKICogZSArIEsgKiBpICsgTCAqIG07XG4gICAgICAgICAgICByZXN1bHRbOV0gPSBJICogYiArIEogKiBmICsgSyAqIGogKyBMICogbjtcbiAgICAgICAgICAgIHJlc3VsdFsxMF0gPSBJICogYyArIEogKiBnICsgSyAqIGsgKyBMICogbztcbiAgICAgICAgICAgIHJlc3VsdFsxMV0gPSBJICogZCArIEogKiBoICsgSyAqIGwgKyBMICogcDtcbiAgICAgICAgICAgIHJlc3VsdFsxMl0gPSBNICogYSArIE4gKiBlICsgTyAqIGkgKyBQICogbTtcbiAgICAgICAgICAgIHJlc3VsdFsxM10gPSBNICogYiArIE4gKiBmICsgTyAqIGogKyBQICogbjtcbiAgICAgICAgICAgIHJlc3VsdFsxNF0gPSBNICogYyArIE4gKiBnICsgTyAqIGsgKyBQICogbztcbiAgICAgICAgICAgIHJlc3VsdFsxNV0gPSBNICogZCArIE4gKiBoICsgTyAqIGwgKyBQICogcDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbXVsdGlwbHlWZWN0b3I0KHZlY3RvcjpWZWN0b3I0KTpWZWN0b3I0IHtcbiAgICAgICAgICAgIHZhciBtYXQxID0gdGhpcy5fdmFsdWVzLFxuICAgICAgICAgICAgICAgIHZlYzQgPSB2ZWN0b3IudmFsdWVzO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgICAgICByZXN1bHRbMF0gPSB2ZWM0WzBdICogbWF0MVswXSArIHZlYzRbMV0gKiBtYXQxWzRdICsgdmVjNFsyXSAqIG1hdDFbOF0gKyB2ZWM0WzNdICogbWF0MVsxMl07XG4gICAgICAgICAgICByZXN1bHRbMV0gPSB2ZWM0WzBdICogbWF0MVsxXSArIHZlYzRbMV0gKiBtYXQxWzVdICsgdmVjNFsyXSAqIG1hdDFbOV0gKyB2ZWM0WzNdICogbWF0MVsxM107XG4gICAgICAgICAgICByZXN1bHRbMl0gPSB2ZWM0WzBdICogbWF0MVsyXSArIHZlYzRbMV0gKiBtYXQxWzZdICsgdmVjNFsyXSAqIG1hdDFbMTBdICsgdmVjNFszXSAqIG1hdDFbMTRdO1xuICAgICAgICAgICAgcmVzdWx0WzNdID0gdmVjNFswXSAqIG1hdDFbM10gKyB2ZWM0WzFdICogbWF0MVs3XSArIHZlYzRbMl0gKiBtYXQxWzExXSArIHZlYzRbM10gKiBtYXQxWzE1XTtcblxuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjQuY3JlYXRlKHJlc3VsdFswXSwgcmVzdWx0WzFdLCByZXN1bHRbMl0sIHJlc3VsdFszXSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgbXVsdGlwbHlWZWN0b3IzKHZlY3RvcjpWZWN0b3IzKTpWZWN0b3IzIHtcbiAgICAgICAgICAgIHZhciBtYXQxID0gdGhpcy5fdmFsdWVzLFxuICAgICAgICAgICAgICAgIHZlYzMgPSB2ZWN0b3IudmFsdWVzO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuXG4gICAgICAgICAgICByZXN1bHRbMF0gPSB2ZWMzWzBdICogbWF0MVswXSArIHZlYzNbMV0gKiBtYXQxWzRdICsgdmVjM1syXSAqIG1hdDFbOF0gKyBtYXQxWzEyXTtcbiAgICAgICAgICAgIHJlc3VsdFsxXSA9IHZlYzNbMF0gKiBtYXQxWzFdICsgdmVjM1sxXSAqIG1hdDFbNV0gKyB2ZWMzWzJdICogbWF0MVs5XSArIG1hdDFbMTNdO1xuICAgICAgICAgICAgcmVzdWx0WzJdID0gdmVjM1swXSAqIG1hdDFbMl0gKyB2ZWMzWzFdICogbWF0MVs2XSArIHZlYzNbMl0gKiBtYXQxWzEwXSArIG1hdDFbMTRdO1xuXG4gICAgICAgICAgICByZXR1cm4gVmVjdG9yMy5jcmVhdGUocmVzdWx0WzBdLCByZXN1bHRbMV0sIHJlc3VsdFsyXSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29weSgpOiBNYXRyaXh7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gTWF0cml4LmNyZWF0ZSgpLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMuX3ZhbHVlcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKXtcbiAgICAgICAgICAgICAgICByZXN1bHQudmFsdWVzW2ldID0gdGhpcy5fdmFsdWVzW2ldO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0WCgpe1xuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjMuY3JlYXRlKHRoaXMuX3ZhbHVlc1swXSwgdGhpcy5fdmFsdWVzWzFdLCB0aGlzLl92YWx1ZXNbMl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFkoKXtcbiAgICAgICAgICAgIHJldHVybiBWZWN0b3IzLmNyZWF0ZSh0aGlzLl92YWx1ZXNbNF0sIHRoaXMuX3ZhbHVlc1s1XSwgdGhpcy5fdmFsdWVzWzZdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRaKCl7XG4gICAgICAgICAgICByZXR1cm4gVmVjdG9yMy5jcmVhdGUodGhpcy5fdmFsdWVzWzhdLCB0aGlzLl92YWx1ZXNbOV0sIHRoaXMuX3ZhbHVlc1sxMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFRyYW5zbGF0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjMuY3JlYXRlKHRoaXMuX3ZhbHVlc1sxMl0sIHRoaXMuX3ZhbHVlc1sxM10sIHRoaXMuX3ZhbHVlc1sxNF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldFNjYWxlKCkge1xuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjMuY3JlYXRlKHRoaXMuZ2V0WCgpLmxlbmd0aCgpLCB0aGlzLmdldFkoKS5sZW5ndGgoKSwgdGhpcy5nZXRaKCkubGVuZ3RoKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldEV1bGVyQW5nbGVzKCkge1xuICAgICAgICAgICAgdmFyIHgsIHksIHosIHN4LCBzeSwgc3osIG0sIGhhbGZQaTtcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IHRoaXMuZ2V0U2NhbGUoKTtcblxuICAgICAgICAgICAgc3ggPSBzY2FsZS54O1xuICAgICAgICAgICAgc3kgPSBzY2FsZS55O1xuICAgICAgICAgICAgc3ogPSBzY2FsZS56O1xuXG4gICAgICAgICAgICBtID0gdGhpcy5fdmFsdWVzO1xuXG4gICAgICAgICAgICB5ID0gTWF0aC5hc2luKC1tWzJdIC8gc3gpO1xuICAgICAgICAgICAgaGFsZlBpID0gTWF0aC5QSSAqIDAuNTtcblxuICAgICAgICAgICAgaWYgKHkgPCBoYWxmUGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoeSA+IC1oYWxmUGkpIHtcbiAgICAgICAgICAgICAgICAgICAgeCA9IE1hdGguYXRhbjIobVs2XSAvIHN5LCBtWzEwXSAvIHN6KTtcbiAgICAgICAgICAgICAgICAgICAgeiA9IE1hdGguYXRhbjIobVsxXSAvIHN4LCBtWzBdIC8gc3gpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vdCBhIHVuaXF1ZSBzb2x1dGlvblxuICAgICAgICAgICAgICAgICAgICB6ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgeCA9IC1NYXRoLmF0YW4yKG1bNF0gLyBzeSwgbVs1XSAvIHN5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE5vdCBhIHVuaXF1ZSBzb2x1dGlvblxuICAgICAgICAgICAgICAgIHogPSAwO1xuICAgICAgICAgICAgICAgIHggPSBNYXRoLmF0YW4yKG1bNF0gLyBzeSwgbVs1XSAvIHN5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjMuY3JlYXRlKHgsIHksIHopLnNjYWxlKFJBRF9UT19ERUcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBmdW5jdGlvblxuICAgICAgICAgKiBAbmFtZSBwYy5NYXQ0I3NldFRSU1xuICAgICAgICAgKiBAZGVzY3JpcHRpb24gU2V0cyB0aGUgc3BlY2lmaWVkIG1hdHJpeCB0byB0aGUgY29uY2F0ZW5hdGlvbiBvZiBhIHRyYW5zbGF0aW9uLCBhXG4gICAgICAgICAqIHF1YXRlcm5pb24gcm90YXRpb24gYW5kIGEgc2NhbGUuXG4gICAgICAgICAqIEBwYXJhbSB7cGMuVmVjM30gdCBBIDMtZCB2ZWN0b3IgdHJhbnNsYXRpb24uXG4gICAgICAgICAqIEBwYXJhbSB7cGMuUXVhdH0gciBBIHF1YXRlcm5pb24gcm90YXRpb24uXG4gICAgICAgICAqIEBwYXJhbSB7cGMuVmVjM30gcyBBIDMtZCB2ZWN0b3Igc2NhbGUuXG4gICAgICAgICAqIEByZXR1cm5zIHtwYy5NYXQ0fSBTZWxmIGZvciBjaGFpbmluZy5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogdmFyIHQgPSBuZXcgcGMuVmVjMygxMCwgMjAsIDMwKTtcbiAgICAgICAgICogdmFyIHIgPSBuZXcgcGMuUXVhdCgpO1xuICAgICAgICAgKiB2YXIgcyA9IG5ldyBwYy5WZWMzKDIsIDIsIDIpO1xuICAgICAgICAgKlxuICAgICAgICAgKiB2YXIgbSA9IG5ldyBwYy5NYXQ0KCk7XG4gICAgICAgICAqIG0uY29tcG9zZSh0LCByLCBzKTtcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBzZXRUUlModDpWZWN0b3IzLCByOlF1YXRlcm5pb24sIHM6VmVjdG9yMykge1xuICAgICAgICAgICAgdmFyIHR4LCB0eSwgdHosIHF4LCBxeSwgcXosIHF3LCBzeCwgc3ksIHN6LFxuICAgICAgICAgICAgICAgIHgyLCB5MiwgejIsIHh4LCB4eSwgeHosIHl5LCB5eiwgenosIHd4LCB3eSwgd3osIG07XG5cbiAgICAgICAgICAgIHR4ID0gdC54O1xuICAgICAgICAgICAgdHkgPSB0Lnk7XG4gICAgICAgICAgICB0eiA9IHQuejtcblxuICAgICAgICAgICAgcXggPSByLng7XG4gICAgICAgICAgICBxeSA9IHIueTtcbiAgICAgICAgICAgIHF6ID0gci56O1xuICAgICAgICAgICAgcXcgPSByLnc7XG5cbiAgICAgICAgICAgIHN4ID0gcy54O1xuICAgICAgICAgICAgc3kgPSBzLnk7XG4gICAgICAgICAgICBzeiA9IHMuejtcblxuICAgICAgICAgICAgeDIgPSBxeCArIHF4O1xuICAgICAgICAgICAgeTIgPSBxeSArIHF5O1xuICAgICAgICAgICAgejIgPSBxeiArIHF6O1xuICAgICAgICAgICAgeHggPSBxeCAqIHgyO1xuICAgICAgICAgICAgeHkgPSBxeCAqIHkyO1xuICAgICAgICAgICAgeHogPSBxeCAqIHoyO1xuICAgICAgICAgICAgeXkgPSBxeSAqIHkyO1xuICAgICAgICAgICAgeXogPSBxeSAqIHoyO1xuICAgICAgICAgICAgenogPSBxeiAqIHoyO1xuICAgICAgICAgICAgd3ggPSBxdyAqIHgyO1xuICAgICAgICAgICAgd3kgPSBxdyAqIHkyO1xuICAgICAgICAgICAgd3ogPSBxdyAqIHoyO1xuXG4gICAgICAgICAgICBtID0gdGhpcy5fdmFsdWVzO1xuXG4gICAgICAgICAgICBtWzBdID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gICAgICAgICAgICBtWzFdID0gKHh5ICsgd3opICogc3g7XG4gICAgICAgICAgICBtWzJdID0gKHh6IC0gd3kpICogc3g7XG4gICAgICAgICAgICBtWzNdID0gMDtcblxuICAgICAgICAgICAgbVs0XSA9ICh4eSAtIHd6KSAqIHN5O1xuICAgICAgICAgICAgbVs1XSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xuICAgICAgICAgICAgbVs2XSA9ICh5eiArIHd4KSAqIHN5O1xuICAgICAgICAgICAgbVs3XSA9IDA7XG5cbiAgICAgICAgICAgIG1bOF0gPSAoeHogKyB3eSkgKiBzejtcbiAgICAgICAgICAgIG1bOV0gPSAoeXogLSB3eCkgKiBzejtcbiAgICAgICAgICAgIG1bMTBdID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gICAgICAgICAgICBtWzExXSA9IDA7XG5cbiAgICAgICAgICAgIG1bMTJdID0gdHg7XG4gICAgICAgICAgICBtWzEzXSA9IHR5O1xuICAgICAgICAgICAgbVsxNF0gPSB0ejtcbiAgICAgICAgICAgIG1bMTVdID0gMTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIFF1YXRlcm5pb24ge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSh4PzpudW1iZXIsIHk/Om51bWJlciwgej86bnVtYmVyLCB3PzpudW1iZXIpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyh4LCB5LCB6LCB3KTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3g6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5feDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB4KHg6bnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3k6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHkoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5feTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB5KHk6bnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3o6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHooKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fejtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB6KHo6bnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl96ID0gejtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3c6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHcoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdztcbiAgICAgICAgfVxuXG4gICAgICAgIHNldCB3KHc6bnVtYmVyKSB7XG4gICAgICAgICAgICB0aGlzLl93ID0gdztcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKHg6bnVtYmVyID0gMCwgeTpudW1iZXIgPSAwLCB6Om51bWJlciA9IDAsIHc6bnVtYmVyID0gMSkge1xuICAgICAgICAgICAgdGhpcy5feCA9IHg7XG4gICAgICAgICAgICB0aGlzLl95ID0geTtcbiAgICAgICAgICAgIHRoaXMuX3ogPSB6O1xuICAgICAgICAgICAgdGhpcy5fdyA9IHc7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGZ1bmN0aW9uXG4gICAgICAgICAqIEBuYW1lIHBjLlF1YXQjc2V0RnJvbUV1bGVyQW5nbGVzXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBTZXRzIGEgcXVhdGVybmlvbiBmcm9tIEV1bGVyIGFuZ2xlcyBzcGVjaWZpZWQgaW4gWFlaIG9yZGVyLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZXggQW5nbGUgdG8gcm90YXRlIGFyb3VuZCBYIGF4aXMgaW4gZGVncmVlcy5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGV5IEFuZ2xlIHRvIHJvdGF0ZSBhcm91bmQgWSBheGlzIGluIGRlZ3JlZXMuXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBleiBBbmdsZSB0byByb3RhdGUgYXJvdW5kIFogYXhpcyBpbiBkZWdyZWVzLlxuICAgICAgICAgKiBAcmV0dXJucyB7cGMuUXVhdH0gU2VsZiBmb3IgY2hhaW5pbmcuXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIHZhciBxID0gbmV3IHBjLlF1YXQoKTtcbiAgICAgICAgICogcS5zZXRGcm9tRXVsZXJBbmdsZXMoNDUsIDkwLCAxODApO1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldEZyb21FdWxlckFuZ2xlcyhldWxlckFuZ2xlczpWZWN0b3IzKSB7XG4gICAgICAgICAgICB2YXIgc3gsIGN4LCBzeSwgY3ksIHN6LCBjeiwgaGFsZlRvUmFkLFxuICAgICAgICAgICAgICAgIGV4ID0gZXVsZXJBbmdsZXMueCxcbiAgICAgICAgICAgICAgICBleSA9IGV1bGVyQW5nbGVzLnksXG4gICAgICAgICAgICAgICAgZXogPSBldWxlckFuZ2xlcy56O1xuXG4gICAgICAgICAgICBoYWxmVG9SYWQgPSAwLjUgKiBERUdfVE9fUkFEO1xuICAgICAgICAgICAgZXggKj0gaGFsZlRvUmFkO1xuICAgICAgICAgICAgZXkgKj0gaGFsZlRvUmFkO1xuICAgICAgICAgICAgZXogKj0gaGFsZlRvUmFkO1xuXG4gICAgICAgICAgICBzeCA9IE1hdGguc2luKGV4KTtcbiAgICAgICAgICAgIGN4ID0gTWF0aC5jb3MoZXgpO1xuICAgICAgICAgICAgc3kgPSBNYXRoLnNpbihleSk7XG4gICAgICAgICAgICBjeSA9IE1hdGguY29zKGV5KTtcbiAgICAgICAgICAgIHN6ID0gTWF0aC5zaW4oZXopO1xuICAgICAgICAgICAgY3ogPSBNYXRoLmNvcyhleik7XG5cbiAgICAgICAgICAgIHRoaXMuX3ggPSBzeCAqIGN5ICogY3ogLSBjeCAqIHN5ICogc3o7XG4gICAgICAgICAgICB0aGlzLl95ID0gY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6O1xuICAgICAgICAgICAgdGhpcy5feiA9IGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjejtcbiAgICAgICAgICAgIHRoaXMuX3cgPSBjeCAqIGN5ICogY3ogKyBzeCAqIHN5ICogc3o7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG11bHRpcGx5KHJoczpRdWF0ZXJuaW9uKTtcbiAgICAgICAgcHVibGljIG11bHRpcGx5KHJoczE6UXVhdGVybmlvbiwgcmhzMjpRdWF0ZXJuaW9uKTtcblxuICAgICAgICBwdWJsaWMgbXVsdGlwbHkoYXJncykge1xuICAgICAgICAgICAgdmFyIHExeCwgcTF5LCBxMXosIHExdywgcTJ4LCBxMnksIHEyeiwgcTJ3LFxuICAgICAgICAgICAgICAgIHJoczEsIHJoczIsXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcztcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgcmhzMSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgcmhzMiA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgcmhzMSA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICByaHMyID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBxMXggPSByaHMxLng7XG4gICAgICAgICAgICBxMXkgPSByaHMxLnk7XG4gICAgICAgICAgICBxMXogPSByaHMxLno7XG4gICAgICAgICAgICBxMXcgPSByaHMxLnc7XG5cbiAgICAgICAgICAgIHEyeCA9IHJoczIueDtcbiAgICAgICAgICAgIHEyeSA9IHJoczIueTtcbiAgICAgICAgICAgIHEyeiA9IHJoczIuejtcbiAgICAgICAgICAgIHEydyA9IHJoczIudztcblxuICAgICAgICAgICAgcmVzdWx0LnggPSBxMXcgKiBxMnggKyBxMXggKiBxMncgKyBxMXkgKiBxMnogLSBxMXogKiBxMnk7XG4gICAgICAgICAgICByZXN1bHQueSA9IHExdyAqIHEyeSArIHExeSAqIHEydyArIHExeiAqIHEyeCAtIHExeCAqIHEyejtcbiAgICAgICAgICAgIHJlc3VsdC56ID0gcTF3ICogcTJ6ICsgcTF6ICogcTJ3ICsgcTF4ICogcTJ5IC0gcTF5ICogcTJ4O1xuICAgICAgICAgICAgcmVzdWx0LncgPSBxMXcgKiBxMncgLSBxMXggKiBxMnggLSBxMXkgKiBxMnkgLSBxMXogKiBxMno7XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGZ1bmN0aW9uXG4gICAgICAgICAqIEBuYW1lIHBjLlF1YXQjc2V0RnJvbU1hdDRcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIENvbnZlcnRzIHRoZSBzcGVjaWZpZWQgNHg0IG1hdHJpeCB0byBhIHF1YXRlcm5pb24uIE5vdGUgdGhhdCBzaW5jZVxuICAgICAgICAgKiBhIHF1YXRlcm5pb24gaXMgcHVyZWx5IGEgcmVwcmVzZW50YXRpb24gZm9yIG9yaWVudGF0aW9uLCBvbmx5IHRoZSB0cmFuc2xhdGlvbmFsIHBhcnRcbiAgICAgICAgICogb2YgdGhlIG1hdHJpeCBpcyBsb3N0LlxuICAgICAgICAgKiBAcGFyYW0ge3BjLk1hdDR9IG0gVGhlIDR4NCBtYXRyaXggdG8gY29udmVydC5cbiAgICAgICAgICogQHJldHVybnMge3BjLlF1YXR9IFNlbGYgZm9yIGNoYWluaW5nLlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiAvLyBDcmVhdGUgYSA0eDQgcm90YXRpb24gbWF0cml4IG9mIDE4MCBkZWdyZWVzIGFyb3VuZCB0aGUgeS1heGlzXG4gICAgICAgICAqIHZhciByb3QgPSBuZXcgcGMuTWF0NCgpLnNldEZyb21BeGlzQW5nbGUocGMuVmVjMy5VUCwgMTgwKTtcbiAgICAgICAgICpcbiAgICAgICAgICogLy8gQ29udmVydCB0byBhIHF1YXRlcm5pb25cbiAgICAgICAgICogdmFyIHEgPSBuZXcgcGMuUXVhdCgpLnNldEZyb21NYXQ0KHJvdCk7XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc2V0RnJvbU1hdHJpeChtYXRyaXg6TWF0cml4KSB7XG4gICAgICAgICAgICB2YXIgbTAwLCBtMDEsIG0wMiwgbTEwLCBtMTEsIG0xMiwgbTIwLCBtMjEsIG0yMixcbiAgICAgICAgICAgICAgICB0ciwgcywgcnMsIGx4LCBseSwgbHosIG07XG5cbiAgICAgICAgICAgIG0gPSBtYXRyaXgudmFsdWVzO1xuXG4gICAgICAgICAgICAvLyBDYWNoZSBtYXRyaXggdmFsdWVzIGZvciBzdXBlci1zcGVlZFxuICAgICAgICAgICAgbTAwID0gbVswXTtcbiAgICAgICAgICAgIG0wMSA9IG1bMV07XG4gICAgICAgICAgICBtMDIgPSBtWzJdO1xuICAgICAgICAgICAgbTEwID0gbVs0XTtcbiAgICAgICAgICAgIG0xMSA9IG1bNV07XG4gICAgICAgICAgICBtMTIgPSBtWzZdO1xuICAgICAgICAgICAgbTIwID0gbVs4XTtcbiAgICAgICAgICAgIG0yMSA9IG1bOV07XG4gICAgICAgICAgICBtMjIgPSBtWzEwXTtcblxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBzY2FsZSBmcm9tIHRoZSBtYXRyaXhcbiAgICAgICAgICAgIGx4ID0gMSAvIE1hdGguc3FydChtMDAgKiBtMDAgKyBtMDEgKiBtMDEgKyBtMDIgKiBtMDIpO1xuICAgICAgICAgICAgbHkgPSAxIC8gTWF0aC5zcXJ0KG0xMCAqIG0xMCArIG0xMSAqIG0xMSArIG0xMiAqIG0xMik7XG4gICAgICAgICAgICBseiA9IDEgLyBNYXRoLnNxcnQobTIwICogbTIwICsgbTIxICogbTIxICsgbTIyICogbTIyKTtcblxuICAgICAgICAgICAgbTAwICo9IGx4O1xuICAgICAgICAgICAgbTAxICo9IGx4O1xuICAgICAgICAgICAgbTAyICo9IGx4O1xuICAgICAgICAgICAgbTEwICo9IGx5O1xuICAgICAgICAgICAgbTExICo9IGx5O1xuICAgICAgICAgICAgbTEyICo9IGx5O1xuICAgICAgICAgICAgbTIwICo9IGx6O1xuICAgICAgICAgICAgbTIxICo9IGx6O1xuICAgICAgICAgICAgbTIyICo9IGx6O1xuXG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LmNzLnVjci5lZHUvfnZiei9yZXNvdXJjZXMvcXVhdHV0LnBkZlxuXG4gICAgICAgICAgICB0ciA9IG0wMCArIG0xMSArIG0yMjtcbiAgICAgICAgICAgIGlmICh0ciA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcyA9IE1hdGguc3FydCh0ciArIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3cgPSBzICogMC41O1xuICAgICAgICAgICAgICAgIHMgPSAwLjUgLyBzO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ggPSAobTEyIC0gbTIxKSAqIHM7XG4gICAgICAgICAgICAgICAgdGhpcy5feSA9IChtMjAgLSBtMDIpICogcztcbiAgICAgICAgICAgICAgICB0aGlzLl96ID0gKG0wMSAtIG0xMCkgKiBzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobTAwID4gbTExKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtMDAgPiBtMjIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhEaWFnRG9tTWF0cml4XG4gICAgICAgICAgICAgICAgICAgICAgICBycyA9IChtMDAgLSAobTExICsgbTIyKSkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgcnMgPSBNYXRoLnNxcnQocnMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl94ID0gcnMgKiAwLjU7XG4gICAgICAgICAgICAgICAgICAgICAgICBycyA9IDAuNSAvIHJzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdyA9IChtMTIgLSBtMjEpICogcnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl95ID0gKG0wMSArIG0xMCkgKiBycztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ogPSAobTAyICsgbTIwKSAqIHJzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWkRpYWdEb21NYXRyaXhcbiAgICAgICAgICAgICAgICAgICAgICAgIHJzID0gKG0yMiAtIChtMDAgKyBtMTEpKSArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBycyA9IE1hdGguc3FydChycyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ogPSBycyAqIDAuNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJzID0gMC41IC8gcnM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93ID0gKG0wMSAtIG0xMCkgKiBycztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ggPSAobTIwICsgbTAyKSAqIHJzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IChtMjEgKyBtMTIpICogcnM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG0xMSA+IG0yMikge1xuICAgICAgICAgICAgICAgICAgICAvLyBZRGlhZ0RvbU1hdHJpeFxuICAgICAgICAgICAgICAgICAgICBycyA9IChtMTEgLSAobTIyICsgbTAwKSkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBycyA9IE1hdGguc3FydChycyk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IHJzICogMC41O1xuICAgICAgICAgICAgICAgICAgICBycyA9IDAuNSAvIHJzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl93ID0gKG0yMCAtIG0wMikgKiBycztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feiA9IChtMTIgKyBtMjEpICogcnM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ggPSAobTEwICsgbTAxKSAqIHJzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFpEaWFnRG9tTWF0cml4XG4gICAgICAgICAgICAgICAgICAgIHJzID0gKG0yMiAtIChtMDAgKyBtMTEpKSArIDE7XG4gICAgICAgICAgICAgICAgICAgIHJzID0gTWF0aC5zcXJ0KHJzKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl96ID0gcnMgKiAwLjU7XG4gICAgICAgICAgICAgICAgICAgIHJzID0gMC41IC8gcnM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3cgPSAobTAxIC0gbTEwKSAqIHJzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl94ID0gKG0yMCArIG0wMikgKiBycztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5feSA9IChtMjEgKyBtMTIpICogcnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAgICogQG5hbWUgcGMuUXVhdCNzZXRGcm9tQXhpc0FuZ2xlXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBTZXRzIGEgcXVhdGVybmlvbiBmcm9tIGFuIGFuZ3VsYXIgcm90YXRpb24gYXJvdW5kIGFuIGF4aXMuXG4gICAgICAgICAqIEBwYXJhbSB7cGMuVmVjM30gYXhpcyBXb3JsZCBzcGFjZSBheGlzIGFyb3VuZCB3aGljaCB0byByb3RhdGUuXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhbmdsZSBBbmdsZSB0byByb3RhdGUgYXJvdW5kIHRoZSBnaXZlbiBheGlzIGluIGRlZ3JlZXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtwYy5RdWF0fSBTZWxmIGZvciBjaGFpbmluZy5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogdmFyIHEgPSBuZXcgcGMuUXVhdCgpO1xuICAgICAgICAgKiBxLnNldEZyb21BeGlzQW5nbGUocGMuVmVjMy5VUCwgOTApO1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHNldEZyb21BeGlzQW5nbGUoYW5nbGU6bnVtYmVyLCBheGlzOlZlY3RvcjMpIHtcbiAgICAgICAgICAgIHZhciBzYSwgY2E7XG5cbiAgICAgICAgICAgICAgICBheGlzID0gYXhpcy5ub3JtYWxpemUoKTtcblxuICAgICAgICAgICAgYW5nbGUgKj0gMC41ICogREVHX1RPX1JBRDtcblxuICAgICAgICAgICAgc2EgPSBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgICAgICBjYSA9IE1hdGguY29zKGFuZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5feCA9IHNhICogYXhpcy54O1xuICAgICAgICAgICAgdGhpcy5feSA9IHNhICogYXhpcy55O1xuICAgICAgICAgICAgdGhpcy5feiA9IHNhICogYXhpcy56O1xuICAgICAgICAgICAgdGhpcy5fdyA9IGNhO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAgICogQG5hbWUgcGMuUXVhdCNpbnZlcnRcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIEdlbmVyYXRlcyB0aGUgaW52ZXJzZSBvZiB0aGUgc3BlY2lmaWVkIHF1YXRlcm5pb24uXG4gICAgICAgICAqIEByZXR1cm5zIHtwYy5RdWF0fSBTZWxmIGZvciBjaGFpbmluZy5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogLy8gQ3JlYXRlIGEgcXVhdGVybmlvbiByb3RhdGVkIDE4MCBkZWdyZWVzIGFyb3VuZCB0aGUgeS1heGlzXG4gICAgICAgICAqIHZhciByb3QgPSBuZXcgcGMuUXVhdCgpLnNldEZyb21FdWxlckFuZ2xlcygwLCAxODAsIDApO1xuICAgICAgICAgKlxuICAgICAgICAgKiAvLyBJbnZlcnQgaW4gcGxhY2VcbiAgICAgICAgICogcm90LmludmVydCgpO1xuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIGludmVydCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbmp1Z2F0ZSgpLm5vcm1hbGl6ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvbmp1Z2F0ZSgpIHtcbiAgICAgICAgICAgIHRoaXMuX3ggKj0gLTE7XG4gICAgICAgICAgICB0aGlzLl95ICo9IC0xO1xuICAgICAgICAgICAgdGhpcy5feiAqPSAtMTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGZ1bmN0aW9uXG4gICAgICAgICAqIEBuYW1lIHBjLlF1YXQjY2xvbmVcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgYW4gaWRlbnRpY2FsIGNvcHkgb2YgdGhlIHNwZWNpZmllZCBxdWF0ZXJuaW9uLlxuICAgICAgICAgKiBAcmV0dXJucyB7cGMuUXVhdH0gQSBxdWF0ZXJuaW9uIGNvbnRhaW5pbmcgdGhlIHJlc3VsdCBvZiB0aGUgY2xvbmluZy5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogdmFyIHEgPSBuZXcgcGMuUXVhdCgtMC4xMSwgLTAuMTUsIC0wLjQ2LCAwLjg3KTtcbiAgICAgICAgICogdmFyIHFjbG9uZSA9IHEuY2xvbmUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogY29uc29sZS5sb2coXCJUaGUgcmVzdWx0IG9mIHRoZSBjbG9uaW5nIGlzOiBcIiArIHEudG9TdHJpbmcoKSk7XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgY2xvbmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gUXVhdGVybmlvbi5jcmVhdGUodGhpcy5feCwgdGhpcy5feSwgdGhpcy5feiwgdGhpcy5fdyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY29weSgpIHtcbiAgICAgICAgICAgIHJldHVybiBRdWF0ZXJuaW9uLmNyZWF0ZSh0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96LCB0aGlzLl93KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAgICogQG5hbWUgcGMuUXVhdCNub3JtYWxpemVcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIHNwZWNpZmllZCBxdWF0ZXJuaW9uIGNvbnZlcnRlZCBpbiBwbGFjZSB0byBhIHVuaXQgcXVhdGVybmlvbi5cbiAgICAgICAgICogQHJldHVybnMge3BjLlF1YXR9IFRoZSByZXN1bHQgb2YgdGhlIG5vcm1hbGl6YXRpb24uXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIHZhciB2ID0gbmV3IHBjLlF1YXQoMCwgMCwgMCwgNSk7XG4gICAgICAgICAqXG4gICAgICAgICAqIHYubm9ybWFsaXplKCk7XG4gICAgICAgICAqXG4gICAgICAgICAqIC8vIFNob3VsZCBvdXRwdXQgMCwgMCwgMCwgMVxuICAgICAgICAgKiBjb25zb2xlLmxvZyhcIlRoZSByZXN1bHQgb2YgdGhlIHZlY3RvciBub3JtYWxpemF0aW9uIGlzOiBcIiArIHYudG9TdHJpbmcoKSk7XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgbm9ybWFsaXplKCkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoKCk7XG4gICAgICAgICAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feCA9IHRoaXMuX3kgPSB0aGlzLl96ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl93ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGVuID0gMSAvIGxlbjtcbiAgICAgICAgICAgICAgICB0aGlzLl94ICo9IGxlbjtcbiAgICAgICAgICAgICAgICB0aGlzLl95ICo9IGxlbjtcbiAgICAgICAgICAgICAgICB0aGlzLl96ICo9IGxlbjtcbiAgICAgICAgICAgICAgICB0aGlzLl93ICo9IGxlbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQGZ1bmN0aW9uXG4gICAgICAgICAqIEBuYW1lIHBjLlF1YXQjbGVuZ3RoXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHRoZSBtYWduaXR1ZGUgb2YgdGhlIHNwZWNpZmllZCBxdWF0ZXJuaW9uLlxuICAgICAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbWFnbml0dWRlIG9mIHRoZSBzcGVjaWZpZWQgcXVhdGVybmlvbi5cbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogdmFyIHEgPSBuZXcgcGMuUXVhdCgwLCAwLCAwLCA1KTtcbiAgICAgICAgICogdmFyIGxlbiA9IHEubGVuZ3RoKCk7XG4gICAgICAgICAqIC8vIFNob3VsZCBvdXRwdXQgNVxuICAgICAgICAgKiBjb25zb2xlLmxvZyhcIlRoZSBsZW5ndGggb2YgdGhlIHF1YXRlcm5pb24gaXM6IFwiICsgbGVuKTtcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBsZW5ndGgoKSB7XG4gICAgICAgICAgICB2YXIgeCwgeSwgeiwgdztcblxuICAgICAgICAgICAgeCA9IHRoaXMuX3g7XG4gICAgICAgICAgICB5ID0gdGhpcy5feTtcbiAgICAgICAgICAgIHogPSB0aGlzLl96O1xuICAgICAgICAgICAgdyA9IHRoaXMuX3c7XG5cbiAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHcpO1xuICAgICAgICB9XG5cblxuICAgIC8qXG4gICAgIC8vL211bHRpcGx5VmVjdG9yM+aWueazleeUqOadpeWwhuWbm+WFg+aVsOWPmOaNouW6lOeUqOWIsOWPguaVsHZlY3Rvci5cbiAgICAgLy8vXG4gICAgICovXG4gICAgLy8vPHN1bW1hcnk+bXVsdGlwbHlWZWN0b3IzPC9zdW1tYXJ5PlxuICAgIC8vLzxwYXJhbSBuYW1lID1cImFcIiB0eXBlPVwiVmVjdG9yM1wiPuS4iee7tOWQkemHjzwvcGFyYW0+XG4gICAgLy8vPHJldHVybnMgdHlwZT1cIlF1YXRlcm5pb25cIj7ov5Tlm57mlrDnmoTlm5vlhYPmlbA8L3JldHVybnM+XG4gICAgcHVibGljIG11bHRpcGx5VmVjdG9yMyggdmVjdG9yOlZlY3RvcjMgKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vLy/ov5nph4zlrp7pmYXkuIrosIPnlKjnmoTmmK92ZWN0b3IuYXBwbHlRdWF0ZXJuaW9uKCnmlrnms5Us5bCG5Zub5YWD5pWw5Y+Y5o2i5bqU55So5Yiw5LiJ57u05ZCR6YePdmVjdG9yLlxuICAgICAgICAvL2NvbnNvbGUud2FybiggJ1RIUkVFLlF1YXRlcm5pb246IC5tdWx0aXBseVZlY3RvcjMoKSBoYXMgYmVlbiByZW1vdmVkLiBVc2UgaXMgbm93IHZlY3Rvci5hcHBseVF1YXRlcm5pb24oIHF1YXRlcm5pb24gKSBpbnN0ZWFkLicgKTtcbiAgICAgICAgLy9yZXR1cm4gdmVjdG9yLmFwcGx5UXVhdGVybmlvbiggdGhpcyApO1xuXG4gICAgICAgIHZhciBxID0gdGhpcztcbiAgICAgICAgdmFyIHggPSB2ZWN0b3IueDtcbiAgICAgICAgdmFyIHkgPSB2ZWN0b3IueTtcbiAgICAgICAgdmFyIHogPSB2ZWN0b3IuejtcblxuICAgICAgICB2YXIgcXggPSBxLng7XG4gICAgICAgIHZhciBxeSA9IHEueTtcbiAgICAgICAgdmFyIHF6ID0gcS56O1xuICAgICAgICB2YXIgcXcgPSBxLnc7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWN0b3JcblxuICAgICAgICB2YXIgaXggPSAgcXcgKiB4ICsgcXkgKiB6IC0gcXogKiB5O1xuICAgICAgICB2YXIgaXkgPSAgcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6O1xuICAgICAgICB2YXIgaXogPSAgcXcgKiB6ICsgcXggKiB5IC0gcXkgKiB4O1xuICAgICAgICB2YXIgaXcgPSAtIHF4ICogeCAtIHF5ICogeSAtIHF6ICogejtcblxuICAgICAgICAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG5cbiAgICAgICAgcmV0dXJuIFZlY3RvcjMuY3JlYXRlKFxuICAgICAgICAgICAgaXggKiBxdyArIGl3ICogLSBxeCArIGl5ICogLSBxeiAtIGl6ICogLSBxeSxcbiAgICAgICAgICAgIGl5ICogcXcgKyBpdyAqIC0gcXkgKyBpeiAqIC0gcXggLSBpeCAqIC0gcXosXG4gICAgICAgICAgICBpeiAqIHF3ICsgaXcgKiAtIHF6ICsgaXggKiAtIHF5IC0gaXkgKiAtIHF4XG4gICAgICAgICk7XG5cbiAgICAgICAgLy90aGlzLnggPSBpeCAqIHF3ICsgaXcgKiAtIHF4ICsgaXkgKiAtIHF6IC0gaXogKiAtIHF5O1xuICAgICAgICAvL3RoaXMueSA9IGl5ICogcXcgKyBpdyAqIC0gcXkgKyBpeiAqIC0gcXggLSBpeCAqIC0gcXo7XG4gICAgICAgIC8vdGhpcy56ID0gaXogKiBxdyArIGl3ICogLSBxeiArIGl4ICogLSBxeSAtIGl5ICogLSBxeDtcblxuICAgICAgICAvL3JldHVybiB0aGlzO1x0Ly/ov5Tlm57mlrDlnZDmoIflgLznmoTkuInnu7TlkJHph49cbiAgICB9XG5cbiAgICAgICAgcHVibGljIHNldCh4Om51bWJlciwgeTpudW1iZXIsIHo6bnVtYmVyLCB3Om51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl94ID0geDtcbiAgICAgICAgICAgIHRoaXMuX3kgPSB5O1xuICAgICAgICAgICAgdGhpcy5feiA9IHo7XG4gICAgICAgICAgICB0aGlzLl93ID0gdztcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdWIocXVhdDpRdWF0ZXJuaW9uKXtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBxdWF0LmNvcHkoKS5pbnZlcnQoKS5tdWx0aXBseSh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5zZXQocmVzdWx0LngsIHJlc3VsdC55LCByZXN1bHQueiwgcmVzdWx0LncpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAZnVuY3Rpb25cbiAgICAgICAgICogQG5hbWUgcGMuUXVhdCNnZXRFdWxlckFuZ2xlc1xuICAgICAgICAgKiBAZGVzY3JpcHRpb24gQ29udmVydHMgdGhlIHN1cHBsaWVkIHF1YXRlcm5pb24gdG8gRXVsZXIgYW5nbGVzLlxuICAgICAgICAgKiBAcGFyYW0ge3BjLlZlYzN9IFtldWxlcnNdIFRoZSAzLWRpbWVuc2lvbmFsIHZlY3RvciB0byByZWNlaXZlIHRoZSBFdWxlciBhbmdsZXMuXG4gICAgICAgICAqIEByZXR1cm5zIHtwYy5WZWMzfSBUaGUgMy1kaW1lbnNpb25hbCB2ZWN0b3IgaG9sZGluZyB0aGUgRXVsZXIgYW5nbGVzIHRoYXRcbiAgICAgICAgICogY29ycmVzcG9uZCB0byB0aGUgc3VwcGxpZWQgcXVhdGVybmlvbi5cbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBnZXRFdWxlckFuZ2xlcygpIHtcbiAgICAgICAgICAgIHZhciB4LCB5LCB6LCBxeCwgcXksIHF6LCBxdywgYTI7XG5cbiAgICAgICAgICAgIHF4ID0gdGhpcy5feDtcbiAgICAgICAgICAgIHF5ID0gdGhpcy5feTtcbiAgICAgICAgICAgIHF6ID0gdGhpcy5fejtcbiAgICAgICAgICAgIHF3ID0gdGhpcy5fdztcblxuICAgICAgICAgICAgYTIgPSAyICogKHF3ICogcXkgLSBxeCAqIHF6KTtcbiAgICAgICAgICAgIGlmIChhMiA8PSAtMC45OTk5OSkge1xuICAgICAgICAgICAgICAgIHggPSAyICogTWF0aC5hdGFuMihxeCwgcXcpO1xuICAgICAgICAgICAgICAgIHkgPSAtTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICAgICAgeiA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGEyID49IDAuOTk5OTkpIHtcbiAgICAgICAgICAgICAgICB4ID0gMiAqIE1hdGguYXRhbjIocXgsIHF3KTtcbiAgICAgICAgICAgICAgICB5ID0gTWF0aC5QSSAvIDI7XG4gICAgICAgICAgICAgICAgeiA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHggPSBNYXRoLmF0YW4yKDIgKiAocXcgKiBxeCArIHF5ICogcXopLCAxIC0gMiAqIChxeCAqIHF4ICsgcXkgKiBxeSkpO1xuICAgICAgICAgICAgICAgIHkgPSBNYXRoLmFzaW4oYTIpO1xuICAgICAgICAgICAgICAgIHogPSBNYXRoLmF0YW4yKDIgKiAocXcgKiBxeiArIHF4ICogcXkpLCAxIC0gMiAqIChxeSAqIHF5ICsgcXogKiBxeikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gVmVjdG9yMy5jcmVhdGUoeCwgeSwgeikuc2NhbGUoUkFEX1RPX0RFRyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvL3JlZmVyZW5jZSB0byB0aHJlZS5qcy0+Q29sb3IuanNcbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgQ29sb3Ige1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShjb2xvclZhbDpzdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICBvYmouaW5pdFdoZW5DcmVhdGUoY29sb3JWYWwpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcjpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgcigpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3I7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHIocjpudW1iZXIpe1xuICAgICAgICAgICAgdGhpcy5fciA9IHI7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9nOm51bWJlciA9IG51bGw7XG4gICAgICAgIGdldCBnKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZztcbiAgICAgICAgfVxuICAgICAgICBzZXQgZyhnOm51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9nID0gZztcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2I6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGIoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iO1xuICAgICAgICB9XG4gICAgICAgIHNldCBiKGI6bnVtYmVyKXtcbiAgICAgICAgICAgIHRoaXMuX2IgPSBiO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaW5pdFdoZW5DcmVhdGUoY29sb3JWYWw6c3RyaW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRDb2xvcihjb2xvclZhbCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHByaXZhdGUgX3NldENvbG9yKGNvbG9yVmFsOnN0cmluZykge1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vLy8gcmdiKDI1NSwwLDApXG4gICAgICAgICAgICAvLy8vXG4gICAgICAgICAgICAvLy8v5bCG5oiR5Lus5bmz5bi45Lmg5oOv55qE6aKc6Imy5YC86KGo6L6+5b2i5byPcmdiKDI1NSwwLDApLeaVsOWAvOWei++8jOi9rOaNouaIkFRIUkVFLkpT6K6k6K+G55qE5b2i5byPMC4wLTEuMO+8jFxuICAgICAgICAgICAgLy8vL+i/memHjOWwhuWPluWAvOiMg+WbtOS7jjAtMjU15o2i566X5oiQMC4wLTEuMC5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvL2lmICggL15yZ2JcXCgoXFxkKyksID8oXFxkKyksID8oXFxkKylcXCkkL2kudGVzdCggc3R5bGUgKSApIHtcdC8v55So5q2j5YiZ6KGo6L6+5byP5qOA5p+l5b2T5YmN5Lyg6YCS55qE6aKc6Imy5YC86KGo6L6+5qC35byP5piv5ZCm5Li65pWw5YC85Z6LcmdiKDI1NSwwLDApXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgdmFyIGNvbG9yID0gL15yZ2JcXCgoXFxkKyksID8oXFxkKyksID8oXFxkKylcXCkkL2kuZXhlYyggc3R5bGUgKTtcdC8v5bCG5a2X56ym5Liy5Lit55qE5pWw5YC86LWL5YC857uZY29sb3LvvIxjb2xvcuaYr+S4gOS4quaVsOe7hOOAglxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHRoaXMuciA9IE1hdGgubWluKCAyNTUsIHBhcnNlSW50KCBjb2xvclsgMSBdLCAxMCApICkgLyAyNTU7XHRcdC8v5bCG5pWw57uE5Lit55qE56ysMuS4quWFg+e0oOi9rOaNouaIkDEw6L+b5Yi2aW5057G75Z6L5pW05pWw77yM5Yik5pat5piv5ZCm5bCP5LqOMjU177yM54S25ZCO6Zmk5LulMjU177yM5b6X5Ye65bCP5pWw77yM5aSN5Yi257uZQ29sb3IuclxuICAgICAgICAgICAgLy8gICAgdGhpcy5nID0gTWF0aC5taW4oIDI1NSwgcGFyc2VJbnQoIGNvbG9yWyAyIF0sIDEwICkgKSAvIDI1NTtcdFx0Ly/lsIbmlbDnu4TkuK3nmoTnrKwz5Liq5YWD57Sg6L2s5o2i5oiQMTDov5vliLZpbnTnsbvlnovmlbTmlbDvvIzliKTmlq3mmK/lkKblsI/kuo4yNTXvvIznhLblkI7pmaTku6UyNTXvvIzlvpflh7rlsI/mlbDvvIzlpI3liLbnu5lDb2xvci5nXG4gICAgICAgICAgICAvLyAgICB0aGlzLmIgPSBNYXRoLm1pbiggMjU1LCBwYXJzZUludCggY29sb3JbIDMgXSwgMTAgKSApIC8gMjU1O1x0XHQvL+WwhuaVsOe7hOS4reeahOesrDTkuKrlhYPntKDovazmjaLmiJAxMOi/m+WItmludOexu+Wei+aVtOaVsO+8jOWIpOaWreaYr+WQpuWwj+S6jjI1Ne+8jOeEtuWQjumZpOS7pTI1Ne+8jOW+l+WHuuWwj+aVsO+8jOWkjeWItue7mUNvbG9yLmJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gdGhpczsgLy/ov5Tlm57popzoibLlr7nosaHjgIJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLy8vIHJnYigxMDAlLDAlLDAlKVxuICAgICAgICAgICAgLy8vL+WwhuaIkeS7rOW5s+W4uOS5oOaDr+eahOminOiJsuWAvOihqOi+vuW9ouW8j3JnYigxMDAlLDAlLDAlKS3nmb7liIbmr5TlnovvvIzovazmjaLmiJBUSFJFRS5KU+iupOivhueahOW9ouW8jzAuMC0xLjDvvIxcbiAgICAgICAgICAgIC8vLy/ov5nph4zlsIblj5blgLzojIPlm7Tku44wJS0xMDAl5o2i566X5oiQMC4wLTEuMC5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvL2lmICggL15yZ2JcXCgoXFxkKylcXCUsID8oXFxkKylcXCUsID8oXFxkKylcXCVcXCkkL2kudGVzdCggc3R5bGUgKSApIHtcdC8v55So5q2j5YiZ6KGo6L6+5byP5qOA5p+l5b2T5YmN5Lyg6YCS55qE6aKc6Imy5YC86KGo6L6+5qC35byP5piv5ZCm5Li655m+5YiG5q+U5Z6LcmdiKDEwMCUsMCUsMCUpXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgdmFyIGNvbG9yID0gL15yZ2JcXCgoXFxkKylcXCUsID8oXFxkKylcXCUsID8oXFxkKylcXCVcXCkkL2kuZXhlYyggc3R5bGUgKTtcdC8v5bCG5a2X56ym5Liy5Lit55qE5pWw5YC86LWL5YC857uZY29sb3LvvIxjb2xvcuaYr+S4gOS4quaVsOe7hOOAglxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vICAgIHRoaXMuciA9IE1hdGgubWluKCAxMDAsIHBhcnNlSW50KCBjb2xvclsgMSBdLCAxMCApICkgLyAxMDA7XHRcdC8v5bCG5pWw57uE5Lit55qE56ysMuS4quWFg+e0oOi9rOaNouaIkDEw6L+b5Yi2aW5057G75Z6L5pW05pWw77yM5Yik5pat5piv5ZCm5bCP5LqOMTAw77yM54S25ZCO6Zmk5LulMTAw77yM5b6X5Ye65bCP5pWw77yM5aSN5Yi257uZQ29sb3IuclxuICAgICAgICAgICAgLy8gICAgdGhpcy5nID0gTWF0aC5taW4oIDEwMCwgcGFyc2VJbnQoIGNvbG9yWyAyIF0sIDEwICkgKSAvIDEwMDtcdFx0Ly/lsIbmlbDnu4TkuK3nmoTnrKwz5Liq5YWD57Sg6L2s5o2i5oiQMTDov5vliLZpbnTnsbvlnovmlbTmlbDvvIzliKTmlq3mmK/lkKblsI/kuo4xMDDvvIznhLblkI7pmaTku6UxMDDvvIzlvpflh7rlsI/mlbDvvIzlpI3liLbnu5lDb2xvci5nXG4gICAgICAgICAgICAvLyAgICB0aGlzLmIgPSBNYXRoLm1pbiggMTAwLCBwYXJzZUludCggY29sb3JbIDMgXSwgMTAgKSApIC8gMTAwO1x0XHQvL+WwhuaVsOe7hOS4reeahOesrDTkuKrlhYPntKDovazmjaLmiJAxMOi/m+WItmludOexu+Wei+aVtOaVsO+8jOWIpOaWreaYr+WQpuWwj+S6jjEwMO+8jOeEtuWQjumZpOS7pTEwMO+8jOW+l+WHuuWwj+aVsO+8jOWkjeWItue7mUNvbG9yLmJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gdGhpczsgLy/ov5Tlm57popzoibLlr7nosaHjgIJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvL31cblxuICAgICAgICAgICAgLy8gI2ZmMDAwMFxuICAgICAgICAgICAgLy/lsIbmiJHku6zlubPluLjkuaDmg6/nmoTpopzoibLlgLzooajovr7lvaLlvI8jZmYwMDAwLTbkvY0xNui/m+WItuWei++8jOi9rOaNouaIkFRIUkVFLkpT6K6k6K+G55qE5b2i5byPMC4wLTEuMO+8jFxuICAgICAgICAgICAgLy/ov5nph4zlsIblj5blgLzojIPlm7Tku44wMC1mZuaNoueul+aIkDAuMC0xLjAuXG5cbiAgICAgICAgICAgIGlmICgvXlxcIyhbMC05YS1mXXs2fSkkL2kudGVzdChjb2xvclZhbCkpIHtcdFx0Ly/nlKjmraPliJnooajovr7lvI/mo4Dmn6XlvZPliY3kvKDpgJLnmoTpopzoibLlgLzooajovr7moLflvI/mmK/lkKbkuLo25L2NMTbov5vliLblnosgI2ZmMDAwMFxuXG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gL15cXCMoWzAtOWEtZl17Nn0pJC9pLmV4ZWMoY29sb3JWYWwpO1x0XHQvL+WwhuWtl+espuS4suS4reeahOaVsOWAvOi1i+WAvOe7mWNvbG9y77yMY29sb3LmmK/kuIDkuKrmlbDnu4TjgIJcblxuICAgICAgICAgICAgICAgIHRoaXMuX3NldEhleChwYXJzZUludChjb2xvclsxXSwgMTYpKTtcdC8v5bCG5pWw57uE5Lit55qE56ysMuS4quWFg+e0oOi9rOaNouaIkDE26L+b5Yi2aW5057G75Z6L5pW05pWwLuiwg+eUqHNldEhleCDmlrnms5XvvIzlsIYxNui/m+WItuaVsOWAvOi1i+WAvOe7mUNvbG9yLnIsQ29sb3IuZyxDb2xvci5iXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpczsgLy/ov5Tlm57popzoibLlr7nosaHjgIJcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vLy8gI2YwMFxuICAgICAgICAgICAgLy8vL+WwhuaIkeS7rOW5s+W4uOS5oOaDr+eahOminOiJsuWAvOihqOi+vuW9ouW8jyNmMDAtM+S9jTE26L+b5Yi25Z6L77yM6L2s5o2i5oiQVEhSRUUuSlPorqTor4bnmoTlvaLlvI8wLjAtMS4w77yMXG4gICAgICAgICAgICAvLy8v6L+Z6YeM5bCG5Y+W5YC86IyD5Zu05LuOMC1m5o2i566X5oiQMC4wLTEuMC5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvL2lmICggL15cXCMoWzAtOWEtZl0pKFswLTlhLWZdKShbMC05YS1mXSkkL2kudGVzdCggc3R5bGUgKSApIHtcdC8v55So5q2j5YiZ6KGo6L6+5byP5qOA5p+l5b2T5YmN5Lyg6YCS55qE6aKc6Imy5YC86KGo6L6+5qC35byP5piv5ZCm5Li6M+S9jTE26L+b5Yi25Z6LICNmMDBcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICB2YXIgY29sb3IgPSAvXlxcIyhbMC05YS1mXSkoWzAtOWEtZl0pKFswLTlhLWZdKSQvaS5leGVjKCBzdHlsZSApO1x0Ly/lsIblrZfnrKbkuLLkuK3nmoTmlbDlgLzotYvlgLznu5ljb2xvcu+8jGNvbG9y5piv5LiA5Liq5pWw57uE44CCXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgdGhpcy5zZXRIZXgoIHBhcnNlSW50KCBjb2xvclsgMSBdICsgY29sb3JbIDEgXSArIGNvbG9yWyAyIF0gKyBjb2xvclsgMiBdICsgY29sb3JbIDMgXSArIGNvbG9yWyAzIF0sIDE2ICkgKTtcdC8v5bCG5pWw57uE5Lit55qE56ysMu+8jDMsNOS4quWFg+e0oCoy77yM6L2s5o2i5oiQMTbov5vliLZpbnTnsbvlnovmlbTmlbAu6LCD55Soc2V0SGV4IOaWueazle+8jOWwhjE26L+b5Yi25pWw5YC86LWL5YC857uZQ29sb3IucixDb2xvci5nLENvbG9yLmJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyAgICByZXR1cm4gdGhpczsgLy/ov5Tlm57popzoibLlr7nosaHjgIJcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvL31cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLy8vIHJlZFxuICAgICAgICAgICAgLy8vL+WwhuaIkeS7rOW5s+W4uOS5oOaDr+eahOminOiJsuWAvOihqOi+vuW9ouW8j3JlZOminOiJsuWQje+8jOi9rOaNouaIkFRIUkVFLkpT6K6k6K+G55qE5b2i5byPMC4wLTEuMO+8jFxuICAgICAgICAgICAgLy8vL+i/memHjOWwhuminOiJsuWQjeaNoueul+aIkDAuMC0xLjAuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy9pZiAoIC9eKFxcdyspJC9pLnRlc3QoIHN0eWxlICkgKSB7XHQvL+eUqOato+WImeihqOi+vuW8j+ajgOafpeW9k+WJjeS8oOmAkueahOminOiJsuWAvOihqOi+vuagt+W8j+aYr+WQpuS4uuminOiJsuWQje+8jOWNs+WPguaVsHN0eWxl5Lit5piv5ZCm5Y+q5piv5a2X56ym5Liy5rKh5pyJ5pWw5a2X44CCXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgdGhpcy5zZXRIZXgoIFRIUkVFLkNvbG9yS2V5d29yZHNbIHN0eWxlIF0gKTtcdC8v5bCG5a2X56ym5Liy5L2c5Li6VEhSRUUuQ29sb3JLZXl3b3Jkc+WvueixoeeahOWxnuaAp+WQje+8jOWPluWHuuS4juivpeWxnuaAp+WQjeebuOWvueW6lOeahDE26L+b5Yi255qE5bGe5oCn5YC8Luiwg+eUqHNldEhleCDmlrnms5XvvIzlsIYxNui/m+WItueahOWxnuaAp+WAvOi1i+WAvOe7mUNvbG9yLnIsQ29sb3IuZyxDb2xvci5iXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gICAgcmV0dXJuIHRoaXM7XHQvL+i/lOWbnuminOiJsuWvueixoeOAglxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vfVxuICAgICAgICB9XG4gICAgICAgIC8qc2V0SGV45pa55rOVXG4gICAgICAgICAvLy9zZXRIZXjmlrnms5XnlKjkuo7orr7nva4xNui/m+WItuminOiJsuWAvOe7meW9k+WJjeWunuS+i1xuICAgICAgICAgLy8v5pu05aSa5YWz5LqOaGV46aKc6Imy55qE5YaF5a655Y+C6ICD57u05Z+655m+56eRLGh0dHA6Ly96aC53aWtpcGVkaWEub3JnL3dpa2kvJUU3JUJEJTkxJUU5JUExJUI1JUU5JUEyJTlDJUU4JTg5JUIyXG4gICAgICAgICAqL1xuICAgICAgICAvLy88c3VtbWFyeT5zZXRIZXg8L3N1bW1hcnk+XG4gICAgICAgIC8vLzxwYXJhbSBuYW1lID1cImhleFwiIHR5cGU9XCJudW1iZXIoMTbov5vliLbpopzoibLlgLwweGZmZGRmZu+8iVwiPjE26L+b5Yi25pWw5YC8MHhmZmRkZmY8L3BhcmFtPlxuICAgICAgICAvLy88cmV0dXJucyB0eXBlPVwiQ29sb3JcIj7ov5Tlm57popzoibLlr7nosaE8L3JldHVybnM+XG4gICAgICAgIHByaXZhdGUgX3NldEhleChoZXgpIHtcbiAgICAgICAgICAgIGhleCA9IE1hdGguZmxvb3IoaGV4KTtcblxuICAgICAgICAgICAgdGhpcy5fciA9ICggaGV4ID4+IDE2ICYgMjU1ICkgLyAyNTU7IC8v5bCG5bem6L655Lik5L2NMTbov5vliLbmlbDlgLzlj5jmjaLmiJByZ2LpopzoibLlgLzlr7nlupTnmoRyZWTvvIzlubbotYvlgLznu5nlsZ7mgKdDb2xvci5y44CCXG4gICAgICAgICAgICB0aGlzLl9nID0gKCBoZXggPj4gOCAmIDI1NSApIC8gMjU1OyAgLy/lsIbkuK3pl7TkuKTkvY0xNui/m+WItuaVsOWAvOWPmOaNouaIkHJnYuminOiJsuWAvOWvueW6lOeahGdyZWVu77yM5bm26LWL5YC857uZ5bGe5oCnQ29sb3IuZ+OAglxuICAgICAgICAgICAgdGhpcy5fYiA9ICggaGV4ICYgMjU1ICkgLyAyNTU7XHQgICAgLy/lsIblj7PovrnkuKTkvY0xNui/m+WItuaVsOWAvOWPmOaNouaIkHJnYuminOiJsuWAvOWvueW6lOeahGJsdWXvvIzlubbotYvlgLznu5nlsZ7mgKdDb2xvci5i44CCXG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1x0Ly/ov5Tlm57popzoibLlr7nosaFcbiAgICAgICAgfVxuICAgIH1cbn0iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIEp1ZGdlVXRpbHMgZXh0ZW5kcyBkeUNiLkp1ZGdlVXRpbHN7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaXNWaWV3KG9iaikge1xuICAgICAgICAgICAgcmV0dXJuICEhb2JqICYmIG9iai5vZmZzZXQgJiYgb2JqLndpZHRoICYmIG9iai5oZWlnaHQgJiYgdGhpcy5pc0Z1bmN0aW9uKG9iai5nZXRDb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgaXNFcXVhbCh0YXJnZXQxOkdhbWVPYmplY3QsIHRhcmdldDI6R2FtZU9iamVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDEudWlkID09PSB0YXJnZXQyLnVpZDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBUaW1lQ29udHJvbGxlcntcbiAgICAgICAgcHVibGljIGVsYXBzZWQ6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgcHVibGljIHBhdXNlRWxhcHNlZDpudW1iZXIgPSAwO1xuICAgICAgICBwdWJsaWMgcGF1c2VUaW1lOm51bWJlciA9IG51bGw7XG4gICAgICAgIHB1YmxpYyBzdGFydFRpbWU6bnVtYmVyID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgc3RhcnQoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuZ2V0Tm93KCk7XG4gICAgICAgICAgICB0aGlzLnBhdXNlRWxhcHNlZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RvcCgpe1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHBhdXNlKCkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZVRpbWUgPSB0aGlzLmdldE5vdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlc3VtZSgpe1xuICAgICAgICAgICAgdGhpcy5wYXVzZUVsYXBzZWQgKz0gdGhpcy5nZXROb3coKSAtIHRoaXMucGF1c2VUaW1lO1xuICAgICAgICAgICAgdGhpcy5wYXVzZVRpbWUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvbXB1dGVFbGFwc2VUaW1lKHRpbWU6bnVtYmVyKXtcbiAgICAgICAgICAgIGlmKHRoaXMucGF1c2VFbGFwc2VkKXtcbiAgICAgICAgICAgICAgICB0aGlzLmVsYXBzZWQgPSB0aW1lIC0gdGhpcy5wYXVzZUVsYXBzZWQgLSB0aGlzLnN0YXJ0VGltZTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVsYXBzZWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZWxhcHNlZCA9IHRpbWUgLSB0aGlzLnN0YXJ0VGltZTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWxhcHNlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBnZXROb3coKXtcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBjb25zdCBTVEFSVElOR19GUFMgPSA2MCxcbiAgICAgICAgR0FNRVRJTUVfU0NBTEUgPSAxMDAwO1xuXG4gICAgZXhwb3J0IGNsYXNzIERpcmVjdG9yVGltZUNvbnRyb2xsZXIgZXh0ZW5kcyBUaW1lQ29udHJvbGxlcntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnYW1lVGltZTpudW1iZXIgPSBudWxsO1xuICAgICAgICBwdWJsaWMgZnBzOm51bWJlciA9IG51bGw7XG4gICAgICAgIHB1YmxpYyBpc1RpbWVDaGFuZ2U6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgICAgIHByaXZhdGUgX2xhc3RUaW1lOm51bWJlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHRpY2sodGltZTpudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUZwcyh0aW1lKTtcbiAgICAgICAgICAgIC8vdGhpcy5nYW1lVGltZSA9ICh0aW1lIC0gdGhpcy5zdGFydFRpbWUpIC8gMTAwMDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZVRpbWUgPSB0aW1lIC8gR0FNRVRJTUVfU0NBTEU7XG5cbiAgICAgICAgICAgIHRoaXMuX2xhc3RUaW1lID0gdGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGFydCgpe1xuICAgICAgICAgICAgc3VwZXIuc3RhcnQoKTtcblxuICAgICAgICAgICAgdGhpcy5pc1RpbWVDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByZXN1bWUoKXtcbiAgICAgICAgICAgIHN1cGVyLnJlc3VtZSgpO1xuXG4gICAgICAgICAgICB0aGlzLmlzVGltZUNoYW5nZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgZ2V0Tm93KCl7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdXBkYXRlRnBzKHRpbWUpIHtcbiAgICAgICAgICAgIC8vaWYgKHRoaXMuX2xvb3BUeXBlID09PSBZRS5EaXJlY3Rvci5Mb29wVHlwZS5JTlRFUlZBTCkge1xuICAgICAgICAgICAgLy8gICAgdGhpcy5fZnBzID0gMSAvIHRoaXMuX2xvb3BJbnRlcnZhbDtcbiAgICAgICAgICAgIC8vICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5fbGFzdFRpbWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZwcyA9IFNUQVJUSU5HX0ZQUztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZnBzID0gMTAwMCAvICh0aW1lIC0gdGhpcy5fbGFzdFRpbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBDb21tb25UaW1lQ29udHJvbGxlciBleHRlbmRzIFRpbWVDb250cm9sbGVyIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBnZXROb3coKXtcbiAgICAgICAgICAgIGlmKERpcmVjdG9yLmdldEluc3RhbmNlKCkuaXNUaW1lQ2hhbmdlKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5lbGFwc2VkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkucmVuZGVye1xuICAgIGV4cG9ydCBjbGFzcyBSZW5kZXJlcntcbiAgICAgICAgcHVibGljIGNyZWF0ZVF1YWRDb21tYW5kKCk6UXVhZENvbW1hbmR7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGFkZENvbW1hbmQoY29tbWFuZDpRdWFkQ29tbWFuZCl7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlbmRlcigpe1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0KCl7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5LnJlbmRlcntcbiAgICBleHBvcnQgY2xhc3MgV2ViR0xSZW5kZXJlciBleHRlbmRzIFJlbmRlcmVye1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpOldlYkdMUmVuZGVyZXIge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jb21tYW5kUXVldWU6ZHlDYi5Db2xsZWN0aW9uPFF1YWRDb21tYW5kPiA9IGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGU8UXVhZENvbW1hbmQ+KCk7XG4gICAgICAgIHByaXZhdGUgX2NsZWFyQ29sb3I6Q29sb3IgPSBDb2xvci5jcmVhdGUoXCIjMDAwMDAwXCIpO1xuICAgICAgICBwcml2YXRlIF9jbGVhckFscGhhOm51bWJlciA9IDEuMDtcblxuICAgICAgICBwdWJsaWMgY3JlYXRlUXVhZENvbW1hbmQoKTpRdWFkQ29tbWFuZHtcbiAgICAgICAgICAgIHJldHVybiBRdWFkQ29tbWFuZC5jcmVhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhZGRDb21tYW5kKGNvbW1hbmQ6UXVhZENvbW1hbmQpe1xuICAgICAgICAgICAgaWYodGhpcy5fY29tbWFuZFF1ZXVlLmhhc0NoaWxkKGNvbW1hbmQpKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2NvbW1hbmRRdWV1ZS5hZGRDaGlsZChjb21tYW5kKTtcbiAgICAgICAgICAgIGNvbW1hbmQuaW5pdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlbmRlcigpe1xuICAgICAgICAgICAgdGhpcy5fY29tbWFuZFF1ZXVlLmZvckVhY2goKGNvbW1hbmQpID0+IHtcbiAgICAgICAgICAgICAgICBjb21tYW5kLmV4ZWN1dGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9jbGVhckNvbW1hbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0KCl7XG4gICAgICAgICAgICBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsLmNsZWFyQ29sb3IodGhpcy5fY2xlYXJDb2xvci5yLCB0aGlzLl9jbGVhckNvbG9yLmcsIHRoaXMuX2NsZWFyQ29sb3IuYiwgdGhpcy5fY2xlYXJBbHBoYSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0Q2xlYXJDb2xvcihjb2xvcjpDb2xvciwgYWxwaGE6bnVtYmVyID0gMS4wKXtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyQ29sb3IgPSBjb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2NsZWFyQWxwaGEgPSBhbHBoYTtcbiAgICAgICAgICAgIERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2wuY2xlYXJDb2xvcih0aGlzLl9jbGVhckNvbG9yLnIsIHRoaXMuX2NsZWFyQ29sb3IuZywgdGhpcy5fY2xlYXJDb2xvci5nLCB0aGlzLl9jbGVhckFscGhhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NsZWFyQ29tbWFuZCgpe1xuICAgICAgICAgICAgdGhpcy5fY29tbWFuZFF1ZXVlLnJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeS5yZW5kZXJ7XG4gICAgZXhwb3J0IGNsYXNzIFNoYWRlcntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUodnNTb3VyY2U6c3RyaW5nLCBmc1NvdXJjZTpzdHJpbmcpIHtcbiAgICAgICAgXHR2YXIgb2JqID0gbmV3IHRoaXModnNTb3VyY2UsIGZzU291cmNlKTtcblxuICAgICAgICBcdHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF92c1NvdXJjZTpzdHJpbmcgPSBudWxsO1xuICAgICAgICBnZXQgdnNTb3VyY2UoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl92c1NvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdnNTb3VyY2UodnNTb3VyY2U6c3RyaW5nKXtcbiAgICAgICAgICAgIHRoaXMuX3ZzU291cmNlID0gdnNTb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgcHJpdmF0ZSBfZnNTb3VyY2U6c3RyaW5nID0gbnVsbDtcbiAgICAgICAgZ2V0IGZzU291cmNlKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZnNTb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGZzU291cmNlKGZzU291cmNlOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLl9mc1NvdXJjZSA9IGZzU291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IodnNTb3VyY2U6c3RyaW5nLCBmc1NvdXJjZTpzdHJpbmcpe1xuICAgICAgICBcdHRoaXMuX3ZzU291cmNlID0gdnNTb3VyY2U7XG4gICAgICAgIFx0dGhpcy5fZnNTb3VyY2UgPSBmc1NvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjcmVhdGVWc1NoYWRlcigpe1xuICAgICAgICAgICAgdmFyIGdsID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbDtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRTaGFkZXIoZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpLCB0aGlzLl92c1NvdXJjZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgY3JlYXRlRnNTaGFkZXIoKXtcbiAgICAgICAgICAgIHZhciBnbCA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2w7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0U2hhZGVyKGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpLCB0aGlzLl9mc1NvdXJjZSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaXNFcXVhbChvdGhlcjpTaGFkZXIpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZzU291cmNlID09PSBvdGhlci52c1NvdXJjZVxuICAgICAgICAgICAgJiYgdGhpcy5fZnNTb3VyY2UgPT09IG90aGVyLmZzU291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfaW5pdFNoYWRlcihzaGFkZXIsIHNvdXJjZSl7XG4gICAgICAgICAgICB2YXIgZ2wgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsO1xuXG4gICAgICAgICAgICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzb3VyY2UpO1xuICAgICAgICAgICAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpO1xuXG4gICAgICAgICAgICBpZihnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpe1xuICAgICAgICAgICAgICAgIHJldHVybiBzaGFkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIC8vdG9kbyBlcnJvcj9cbiAgICAgICAgICAgICAgICBkeUNiLkxvZy5sb2coZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZSBkeS5yZW5kZXIge1xuICAgIGV4cG9ydCBlbnVtIEJ1ZmZlclR5cGV7XG4gICAgICAgIFVOU0lHTkVEX0JZVEUgPSA8YW55PlwiVU5TSUdORURfQllURVwiLFxuICAgICAgICBTSE9SVCA9IDxhbnk+XCJTSE9SVFwiLFxuICAgICAgICBVTlNJR05FRF9TSE9SVCA9IDxhbnk+XCJVTlNJR05FRF9TSE9SVFwiLFxuICAgICAgICBJTlQgPSA8YW55PlwiSU5UXCIsXG4gICAgICAgIFVOU0lHTkVEX0lOVCA9IDxhbnk+XCJVTlNJR05FRF9JTlRcIixcbiAgICAgICAgRkxPQVQgPSA8YW55PlwiRkxPQVRcIlxuICAgIH1cbn1cbiIsIm1vZHVsZSBkeS5yZW5kZXJ7XG4gICAgZXhwb3J0IGVudW0gQXR0cmlidXRlRGF0YVR5cGV7XG4gICAgICAgIEZMT0FUXzQsXG4gICAgICAgIEJVRkZFUlxuICAgIH1cbn1cblxuIiwibW9kdWxlIGR5LnJlbmRlcntcbiAgICBleHBvcnQgZW51bSBEcmF3TW9kZXtcbiAgICAgICAgVFJJQU5HTEVTID0gPGFueT5cIlRSSUFOR0xFU1wiXG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeS5yZW5kZXJ7XG4gICAgZXhwb3J0IGNsYXNzIEJ1ZmZlcntcbiAgICAgICAgZ2V0IGJ1ZmZlcigpIHtcbiAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRoaXMucF9idWZmZXIgPT09IG51bGwsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfQVRUUklCVVRFKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucF9idWZmZXI7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRoaXMucF90eXBlID09PSBudWxsLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX0FUVFJJQlVURSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBfdHlwZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdHlwZSh0eXBlOnN0cmluZyl7XG4gICAgICAgICAgICB0aGlzLnBfdHlwZSA9IHR5cGU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgbnVtKCkge1xuICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodGhpcy5wX251bSA9PT0gbnVsbCwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9BVFRSSUJVVEUpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wX251bTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgbnVtKG51bTpudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMucF9udW0gPSBudW07XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgcF9idWZmZXIgPSBudWxsO1xuICAgICAgICBwcm90ZWN0ZWQgcF90eXBlID0gbnVsbDtcbiAgICAgICAgcHJvdGVjdGVkIHBfbnVtID0gbnVsbDtcbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5LnJlbmRlcntcbiAgICBleHBvcnQgY2xhc3MgRWxlbWVudEJ1ZmZlciBleHRlbmRzIEJ1ZmZlcntcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZGF0YSwgdHlwZTpCdWZmZXJUeXBlKTpFbGVtZW50QnVmZmVyIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICBvYmouaW5pdFdoZW5DcmVhdGUoZGF0YSwgdHlwZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF90eXBlU2l6ZTpudW1iZXIgPSBudWxsO1xuICAgICAgICBnZXQgdHlwZVNpemUoKSB7IHJldHVybiB0aGlzLl90eXBlU2l6ZTsgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0V2hlbkNyZWF0ZShkYXRhLCB0eXBlOkJ1ZmZlclR5cGUpIHtcbiAgICAgICAgICAgIHZhciBnbCA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2w7XG5cbiAgICAgICAgICAgIGlmKCFkYXRhIHx8ICF0aGlzLl9jaGVja0RhdGFUeXBlKGRhdGEsIHR5cGUpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5wX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpOyAgIC8vIENyZWF0ZSBhIGJ1ZmZlciBvYmplY3RcbiAgICAgICAgICAgIGlmICghdGhpcy5wX2J1ZmZlcikge1xuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmxvZygnRmFpbGVkIHRvIGNyZWF0ZSB0aGUgdGhpcy5wX2J1ZmZlciBvYmplY3QnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMucF9idWZmZXIpO1xuICAgICAgICAgICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgZGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBudWxsKTtcblxuICAgICAgICAgICAgdGhpcy5wX3R5cGUgPSBnbFt0eXBlXTtcbiAgICAgICAgICAgIHRoaXMucF9udW0gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuX3R5cGVTaXplID0gdGhpcy5fZ2V0SW5mbyh0eXBlKS5zaXplO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wX2J1ZmZlcjtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfY2hlY2tEYXRhVHlwZShkYXRhLCB0eXBlOkJ1ZmZlclR5cGUpe1xuICAgICAgICAgICAgdmFyIGluZm8gPSB0aGlzLl9nZXRJbmZvKHR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gZGF0YSBpbnN0YW5jZW9mIGluZm8udHlwZUNsYXNzO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZ2V0SW5mbyh0eXBlOkJ1ZmZlclR5cGUpOnt0eXBlQ2xhc3M6YW55LHNpemU6bnVtYmVyfXtcbiAgICAgICAgICAgIHZhciBpbmZvID0gbnVsbDtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKXtcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZlclR5cGUuVU5TSUdORURfQllURTpcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVDbGFzczogVWludDhBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDFcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmZXJUeXBlLlNIT1JUOlxuICAgICAgICAgICAgICAgICAgICBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNsYXNzOiBJbnQxNkFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQ6XG4gICAgICAgICAgICAgICAgICAgIGluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlQ2xhc3M6IFVpbnQxNkFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogMlxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZlclR5cGUuSU5UOlxuICAgICAgICAgICAgICAgICAgICBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNsYXNzOiBJbnQzMkFycmF5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogNFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEJ1ZmZlclR5cGUuVU5TSUdORURfSU5UOlxuICAgICAgICAgICAgICAgICAgICBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNsYXNzOiBVaW50MzJBcnJheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IDRcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBCdWZmZXJUeXBlLkZMT0FUOlxuICAgICAgICAgICAgICAgICAgICBpbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZUNsYXNzOiBGbG9hdDMyQXJyYXksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplOiA0XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19JTlZBTElEKFwiQnVmZmVyVHlwZVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gaW5mbztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5LnJlbmRlcntcbiAgICBleHBvcnQgY2xhc3MgQXJyYXlCdWZmZXIgZXh0ZW5kcyBCdWZmZXJ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKGRhdGEsIG51bSwgdHlwZTpCdWZmZXJUeXBlKTpyZW5kZXIuQXJyYXlCdWZmZXIge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIG9iai5pbml0V2hlbkNyZWF0ZShkYXRhLCBudW0sIHR5cGUpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY291bnQ6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGNvdW50KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGNvdW50KGNvdW50Om51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9jb3VudCA9IGNvdW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXRXaGVuQ3JlYXRlKGRhdGEsIG51bSwgdHlwZTpCdWZmZXJUeXBlKSB7XG4gICAgICAgICAgICB2YXIgZ2wgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsO1xuXG4gICAgICAgICAgICBpZighZGF0YSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucF9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTsgICAvLyBDcmVhdGUgYSBidWZmZXIgb2JqZWN0XG4gICAgICAgICAgICBpZiAoIXRoaXMucF9idWZmZXIpIHtcbiAgICAgICAgICAgICAgICBkeUNiLkxvZy5sb2coJ0ZhaWxlZCB0byBjcmVhdGUgdGhlIHRoaXMucF9idWZmZXIgb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5wX2J1ZmZlcik7XG4gICAgICAgICAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgZGF0YSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbCk7XG5cbiAgICAgICAgICAgIHRoaXMucF9udW0gPSBudW07XG4gICAgICAgICAgICB0aGlzLnBfdHlwZSA9IGdsW3R5cGVdO1xuICAgICAgICAgICAgdGhpcy5fY291bnQgPSBkYXRhLmxlbmd0aCAvIG51bTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucF9idWZmZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIm1vZHVsZSBkeS5yZW5kZXJ7XG4gICAgZXhwb3J0IGVudW0gVW5pZm9ybURhdGFUeXBle1xuICAgICAgICBGTE9BVF9NQVQ0XG4gICAgfVxufVxuXG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeS5yZW5kZXJ7XG4gICAgZXhwb3J0IGNsYXNzIFByb2dyYW17XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6UHJvZ3JhbSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3Byb2dyYW06YW55ID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgICAgIHByaXZhdGUgX3NoYWRlcjpTaGFkZXIgPSBudWxsO1xuXG4gICAgICAgIHB1YmxpYyB1c2UoKXtcbiAgICAgICAgICAgIERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2wudXNlUHJvZ3JhbSh0aGlzLl9wcm9ncmFtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzZXRVbmlmb3JtRGF0YShuYW1lOnN0cmluZywgdHlwZTpVbmlmb3JtRGF0YVR5cGUsIGRhdGE6TWF0cml4KXtcbiAgICAgICAgICAgIHZhciBnbCA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2wsXG4gICAgICAgICAgICAgICAgcG9zPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5fcHJvZ3JhbSwgbmFtZSk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBVbmlmb3JtRGF0YVR5cGUuRkxPQVRfTUFUNDpcbiAgICAgICAgICAgICAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihwb3MsZmFsc2UsIGRhdGEudmFsdWVzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19JTlZBTElEKFwiVW5pZm9ybURhdGFUeXBlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0QXR0cmlidXRlRGF0YShuYW1lOnN0cmluZywgdHlwZTpBdHRyaWJ1dGVEYXRhVHlwZSwgZGF0YTpyZW5kZXIuQXJyYXlCdWZmZXJ8bnVtYmVyW10pe1xuICAgICAgICAgICAgdmFyIGdsID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbCxcbiAgICAgICAgICAgICAgICBwb3MgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLl9wcm9ncmFtLCBuYW1lKTtcblxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKXtcbiAgICAgICAgICAgICAgICBjYXNlIEF0dHJpYnV0ZURhdGFUeXBlLkZMT0FUXzQ6XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhQXJyOm51bWJlcltdID0gPEFycmF5PG51bWJlcj4+ZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgZ2wudmVydGV4QXR0cmliNGYocG9zLCBkYXRhQXJyWzBdLCBkYXRhQXJyWzFdLCBkYXRhQXJyWzJdLCBkYXRhQXJyWzNdKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBBdHRyaWJ1dGVEYXRhVHlwZS5CVUZGRVI6XG4gICAgICAgICAgICAgICAgICAgIGxldCBidWZmZXI6cmVuZGVyLkFycmF5QnVmZmVyID0gPHJlbmRlci5BcnJheUJ1ZmZlcj5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgYnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zLCBidWZmZXIubnVtLCBidWZmZXIudHlwZSwgZmFsc2UsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3MpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0IDpcbiAgICAgICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5GVU5DX0lOVkFMSUQoXCJBdHRyaWJ1dGVEYXRhVHlwZVwiKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXRXaXRoU2hhZGVyKHNoYWRlcjpTaGFkZXIpe1xuICAgICAgICAgICAgdmFyIGdsID0gRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5nbCxcbiAgICAgICAgICAgICAgICB2cyA9IG51bGwsXG4gICAgICAgICAgICAgICAgZnMgPSBudWxsO1xuXG4gICAgICAgICAgICB2cyA9IHNoYWRlci5jcmVhdGVWc1NoYWRlcigpO1xuICAgICAgICAgICAgZnMgPSBzaGFkZXIuY3JlYXRlRnNTaGFkZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5fc2hhZGVyID0gc2hhZGVyO1xuXG4gICAgICAgICAgICAvLyDlkJHnqIvluo/lr7nosaHph4zliIbphY3nnYDoibLlmahcbiAgICAgICAgICAgIGdsLmF0dGFjaFNoYWRlcih0aGlzLl9wcm9ncmFtLCB2cyk7XG4gICAgICAgICAgICBnbC5hdHRhY2hTaGFkZXIodGhpcy5fcHJvZ3JhbSwgZnMpO1xuXG5cbiAgICAgICAgICAgIC8qIVxuICAgICAgICAgICAgaWYgYm93ZXIgd2FybjpcIkF0dHJpYnV0ZSAwIGlzIGRpc2FibGVkLiBUaGlzIGhhcyBzaWduaWZpY2FudCBwZXJmb3JtYW5jZSBwZW5hbHR5XCIsXG4gICAgICAgICAgICB0aGVuIGRvIHRoaXMgYmVmb3JlIGxpbmtQcm9ncmFtOlxuICAgICAgICAgICAgIGdsLmJpbmRBdHRyaWJMb2NhdGlvbiggdGhpcy5fcHJvZ3JhbSwgMCwgXCJhX3Bvc2l0aW9uXCIpO1xuXG5cblxuICAgICAgICAgICAgIGNhbiByZWZlcmVuY2UgaGVyZTpcbiAgICAgICAgICAgICBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzIwMzA1MjMxL3dlYmdsLXdhcm5pbmctYXR0cmlidXRlLTAtaXMtZGlzYWJsZWQtdGhpcy1oYXMtc2lnbmlmaWNhbnQtcGVyZm9ybWFuY2UtcGVuYWx0P2Fuc3dlcnRhYj12b3RlcyN0YWItdG9wXG5cblxuICAgICAgICAgICAgIE9wZW5HTCByZXF1aXJlcyBhdHRyaWJ1dGUgemVybyB0byBiZSBlbmFibGVkIG90aGVyd2lzZSBpdCB3aWxsIG5vdCByZW5kZXIgYW55dGhpbmcuXG4gICAgICAgICAgICAgT24gdGhlIG90aGVyIGhhbmQgT3BlbkdMIEVTIDIuMCBvbiB3aGljaCBXZWJHTCBpcyBiYXNlZCBkb2VzIG5vdC4gU28sIHRvIGVtdWxhdGUgT3BlbkdMIEVTIDIuMCBvbiB0b3Agb2YgT3BlbkdMIGlmIHlvdSBkb24ndCBlbmFibGUgYXR0cmlidXRlIDAgdGhlIGJyb3dzZXIgaGFzIHRvIG1ha2UgYSBidWZmZXIgZm9yIHlvdSBsYXJnZSBlbm91Z2ggZm9yIHRoZSBudW1iZXIgb2YgdmVydGljZXMgeW91J3ZlIHJlcXVlc3RlZCB0byBiZSBkcmF3biwgZmlsbCBpdCB3aXRoIHRoZSBjb3JyZWN0IHZhbHVlIChzZWUgZ2wudmVydGV4QXR0cmliKSxcbiAgICAgICAgICAgICAgYXR0YWNoIGl0IHRvIGF0dHJpYnV0ZSB6ZXJvLCBhbmQgZW5hYmxlIGl0LlxuXG4gICAgICAgICAgICAgSXQgZG9lcyBhbGwgdGhpcyBiZWhpbmQgdGhlIHNjZW5lcyBidXQgaXQncyBpbXBvcnRhbnQgZm9yIHlvdSB0byBrbm93IHRoYXQgaXQgdGFrZXMgdGltZSB0byBjcmVhdGUgYW5kIGZpbGwgdGhhdCBidWZmZXIuIFRoZXJlIGFyZSBvcHRpbWl6YXRpb25zIHRoZSBicm93c2VyIGNhbiBtYWtlIGJ1dCBpbiB0aGUgZ2VuZXJhbCBjYXNlLFxuICAgICAgICAgICAgIGlmIHlvdSB3ZXJlIHRvIGFzc3VtZSB5b3Ugd2VyZSBydW5uaW5nIG9uIE9wZW5HTCBFUyAyLjAgYW5kIHVzZWQgYXR0cmlidXRlIHplcm8gYXMgYSBjb25zdGFudCBsaWtlIHlvdSBhcmUgc3VwcG9zZWQgdG8gYmUgYWJsZSB0byBkbywgd2l0aG91dCB0aGUgd2FybmluZyB5b3UnZCBoYXZlIG5vIGlkZWEgb2YgdGhlIHdvcmsgdGhlIGJyb3dzZXIgaXMgZG9pbmcgb24geW91ciBiZWhhbGYgdG8gZW11bGF0ZSB0aGF0IGZlYXR1cmUgb2YgT3BlbkdMIEVTIDIuMCB0aGF0IGlzIGRpZmZlcmVudCBmcm9tIE9wZW5HTC5cblxuICAgICAgICAgICAgIEluIHlvdXIgcGFydGljdWxhciBjYXNlIHRoZSB3YXJuaW5nIGRvZXNuJ3QgaGF2ZSBtdWNoIG1lYW5pbmcuIEl0IGxvb2tzIGxpa2UgeW91IGFyZSBvbmx5IGRyYXdpbmcgYSBzaW5nbGUgcG9pbnQuIEJ1dCBpdCB3b3VsZCBub3QgYmUgZWFzeSBmb3IgdGhlIGJyb3dzZXIgdG8gZmlndXJlIHRoYXQgb3V0IHNvIGl0IGp1c3Qgd2FybnMgeW91IGFueXRpbWUgeW91IGRyYXcgYW5kIGF0dHJpYnV0ZSAwIGlzIG5vdCBlbmFibGVkLlxuXG5cbiAgICAgICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vbXJkb29iL3RocmVlLmpzL2lzc3Vlcy8zODk2XG4gICAgICAgICAgICAgKi9cblxuXG4gICAgICAgICAgICAvLyDlsIbnnYDoibLlmajov57mjqVcbiAgICAgICAgICAgIGdsLmxpbmtQcm9ncmFtKHRoaXMuX3Byb2dyYW0pO1xuXG4gICAgICAgICAgICAvLyDliKTmlq3nnYDoibLlmajnmoTov57mjqXmmK/lkKbmiJDlip9cbiAgICAgICAgICAgIGlmKGdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5fcHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKXtcblxuICAgICAgICAgICAgICAgIC8vIOi/lOWbnueoi+W6j+WvueixoVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcm9ncmFtO1xuICAgICAgICAgICAgfWVsc2V7XG5cbiAgICAgICAgICAgICAgICAvLyDlpoLmnpzlpLHotKXvvIzlvLnlh7rplJnor6/kv6Hmga9cbiAgICAgICAgICAgICAgICBhbGVydChnbC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLl9wcm9ncmFtKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpc0NoYW5nZVNoYWRlcihzaGFkZXI6U2hhZGVyKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaGFkZXIgPyAhdGhpcy5fc2hhZGVyLmlzRXF1YWwoc2hhZGVyKSA6IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeS5yZW5kZXIge1xuICAgIGV4cG9ydCBjbGFzcyBRdWFkQ29tbWFuZCB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCk6UXVhZENvbW1hbmQge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9idWZmZXJzOmR5Q2IuSGFzaDxCdWZmZXI+ID0gZHlDYi5IYXNoLmNyZWF0ZTxCdWZmZXI+KCk7XG4gICAgICAgIGdldCBidWZmZXJzKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1ZmZlcnM7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGJ1ZmZlcnMoYnVmZmVyczphbnkpIHtcbiAgICAgICAgICAgIHZhciBpID0gbnVsbDtcblxuICAgICAgICAgICAgZm9yIChpIGluIGJ1ZmZlcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAoYnVmZmVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idWZmZXJzLmFkZENoaWxkKGksIGJ1ZmZlcnNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NvbG9yOkNvbG9yID0gbnVsbDtcbiAgICAgICAgZ2V0IGNvbG9yKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG9yO1xuICAgICAgICB9XG4gICAgICAgIHNldCBjb2xvcihjb2xvcjpDb2xvcikge1xuICAgICAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdG9kbyByZW1vdmUgaXQ/XG4gICAgICAgIHNldCBzaGFkZXIoc2hhZGVyOlNoYWRlcikge1xuICAgICAgICAgICAgaWYgKERpcmVjdG9yLmdldEluc3RhbmNlKCkuc3RhZ2UucHJvZ3JhbS5pc0NoYW5nZVNoYWRlcihzaGFkZXIpKSB7XG4gICAgICAgICAgICAgICAgRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5zdGFnZS5wcm9ncmFtLmluaXRXaXRoU2hhZGVyKHNoYWRlcik7XG4gICAgICAgICAgICAgICAgRGlyZWN0b3IuZ2V0SW5zdGFuY2UoKS5zdGFnZS5wcm9ncmFtLnVzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbXZwTWF0cml4Ok1hdHJpeCA9IG51bGw7XG4gICAgICAgIGdldCBtdnBNYXRyaXgoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbXZwTWF0cml4O1xuICAgICAgICB9XG4gICAgICAgIHNldCBtdnBNYXRyaXgobXZwTWF0cml4Ok1hdHJpeCkge1xuICAgICAgICAgICAgdGhpcy5fbXZwTWF0cml4ID0gbXZwTWF0cml4O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZHJhd01vZGU6RHJhd01vZGUgPSBEcmF3TW9kZS5UUklBTkdMRVM7XG4gICAgICAgIGdldCBkcmF3TW9kZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kcmF3TW9kZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgZHJhd01vZGUoZHJhd01vZGU6RHJhd01vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYXdNb2RlID0gZHJhd01vZGU7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHB1YmxpYyBleGVjdXRlKCkge1xuICAgICAgICAgICAgdGhpcy5fc2VuZERhdGEoKTtcblxuICAgICAgICAgICAgdGhpcy5fZHJhdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGluaXQoKSB7XG4gICAgICAgICAgICAvL3RoaXMuX2luaXRCdWZmZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHJpdmF0ZSBfaW5pdEJ1ZmZlcigpe1xuICAgICAgICAvLyAgICB0aGlzLl9idWZmZXJzLmFkZENoaWxkKFwidmVydGV4QnVmZmVyXCIsXG4gICAgICAgIC8vICAgICAgICB0aGlzLl9idWZmZXJEYXRhLnZlcnRpY2VzPyByZW5kZXIuQXJyYXlCdWZmZXIuY3JlYXRlKHRoaXMuX2J1ZmZlckRhdGEudmVydGljZXMsIDMsIEJ1ZmZlclR5cGUuRkxPQVQpIDogbnVsbFxuICAgICAgICAvLyAgICApO1xuICAgICAgICAvLyAgICB0aGlzLl9idWZmZXJzLmFkZENoaWxkKFwidGV4Q29vcmRCdWZmZXJcIixcbiAgICAgICAgLy8gICAgICAgIHRoaXMuX2J1ZmZlckRhdGEudGV4Q29vcmRzPyByZW5kZXIuQXJyYXlCdWZmZXIuY3JlYXRlKHRoaXMuX2J1ZmZlckRhdGEudGV4Q29vcmRzLCAyLCBCdWZmZXJUeXBlLkZMT0FUKSA6IG51bGxcbiAgICAgICAgLy8gICAgKTtcbiAgICAgICAgLy8gICAgdGhpcy5fYnVmZmVycy5hZGRDaGlsZChcIm5vcm1hbEJ1ZmZlclwiLFxuICAgICAgICAvLyAgICAgICAgdGhpcy5fYnVmZmVyRGF0YS5ub3JtYWxzPyByZW5kZXIuQXJyYXlCdWZmZXIuY3JlYXRlKHRoaXMuX2J1ZmZlckRhdGEubm9ybWFscywgMywgQnVmZmVyVHlwZS5GTE9BVCkgOiBudWxsXG4gICAgICAgIC8vICAgICk7XG4gICAgICAgIC8vICAgIHRoaXMuX2J1ZmZlcnMuYWRkQ2hpbGQoXCJpbmRleEJ1ZmZlclwiLFxuICAgICAgICAvLyAgICAgICAgdGhpcy5fYnVmZmVyRGF0YS5pbmRpY2VzPyBFbGVtZW50QnVmZmVyLmNyZWF0ZSh0aGlzLl9idWZmZXJEYXRhLmluZGljZXMsIEJ1ZmZlclR5cGUuVU5TSUdORURfU0hPUlQpIDogbnVsbFxuICAgICAgICAvLyAgICApO1xuICAgICAgICAvLyAgICB0aGlzLl9idWZmZXJzLmFkZENoaWxkKFwiY29sb3JCdWZmZXJcIixcbiAgICAgICAgLy8gICAgICAgIHRoaXMuX2J1ZmZlckRhdGEuY29sb3JzPyByZW5kZXIuQXJyYXlCdWZmZXIuY3JlYXRlKHRoaXMuX2J1ZmZlckRhdGEuY29sb3JzLCAzLCBCdWZmZXJUeXBlLkZMT0FUKSA6IG51bGxcbiAgICAgICAgLy8gICAgKTtcbiAgICAgICAgLy99XG5cbiAgICAgICAgcHJpdmF0ZSBfc2VuZERhdGEoKSB7XG4gICAgICAgICAgICB2YXIgcHJvZ3JhbSA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuc3RhZ2UucHJvZ3JhbTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2J1ZmZlcnMuaGFzQ2hpbGQoXCJ2ZXJ0ZXhCdWZmZXJcIikpIHtcbiAgICAgICAgICAgICAgICBwcm9ncmFtLnNldEF0dHJpYnV0ZURhdGEoXCJhX3Bvc2l0aW9uXCIsIEF0dHJpYnV0ZURhdGFUeXBlLkJVRkZFUiwgPHJlbmRlci5BcnJheUJ1ZmZlcj50aGlzLl9idWZmZXJzLmdldENoaWxkKFwidmVydGV4QnVmZmVyXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19NVVNUKFwiaGFzIHZlcnRleEJ1ZmZlclwiKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vaWYodGhpcy5jb2xvcil7XG4gICAgICAgICAgICAvKiFcbiAgICAgICAgICAgICB0aGlzIGNhdXNlIHdhcm46XCJQRVJGT1JNQU5DRSBXQVJOSU5HOiBBdHRyaWJ1dGUgMCBpcyBkaXNhYmxlZC4gVGhpcyBoYXMgc2lnbmZpY2FudCBwZXJmb3JtYW5jZSBwZW5hbHR5XCIgaGVyZT9cbiAgICAgICAgICAgICBiZWNhdXNlIGFfY29sb3IncG9zIGlzIDAsIGFuZCBpdCBzaG91bGQgYmUgYXJyYXkgZGF0YShsaWtlIEZsb2F0MzJBcnJheSlcbiAgICAgICAgICAgICByZWZlciB0bzogaHR0cHM6Ly93d3cua2hyb25vcy5vcmcvd2ViZ2wvd2lraS9XZWJHTF9hbmRfT3BlbkdMX0RpZmZlcmVuY2VzI1ZlcnRleF9BdHRyaWJ1dGVfMFxuICAgICAgICAgICAgICovXG5cblxuICAgICAgICAgICAgcHJvZ3JhbS5zZXRBdHRyaWJ1dGVEYXRhKFwiYV9jb2xvclwiLCBBdHRyaWJ1dGVEYXRhVHlwZS5CVUZGRVIsIDxyZW5kZXIuQXJyYXlCdWZmZXI+dGhpcy5fYnVmZmVycy5nZXRDaGlsZChcImNvbG9yQnVmZmVyXCIpKTtcbiAgICAgICAgICAgIC8vfVxuXG5cbiAgICAgICAgICAgIHByb2dyYW0uc2V0VW5pZm9ybURhdGEoXCJ1X212cE1hdHJpeFwiLCBVbmlmb3JtRGF0YVR5cGUuRkxPQVRfTUFUNCwgdGhpcy5fbXZwTWF0cml4KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfZHJhdygpIHtcbiAgICAgICAgICAgIHZhciB0b3RhbE51bSA9IDAsXG4gICAgICAgICAgICAgICAgc3RhcnRPZmZzZXQgPSAwLFxuICAgICAgICAgICAgICAgIHZlcnRleEJ1ZmZlciA9IHRoaXMuX2J1ZmZlcnMuZ2V0Q2hpbGQoXCJ2ZXJ0ZXhCdWZmZXJcIiksXG4gICAgICAgICAgICAgICAgZ2wgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdsO1xuXG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9idWZmZXJzLmhhc0NoaWxkKFwiaW5kZXhCdWZmZXJcIikpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXhCdWZmZXI6RWxlbWVudEJ1ZmZlciA9IDxFbGVtZW50QnVmZmVyPnRoaXMuX2J1ZmZlcnMuZ2V0Q2hpbGQoXCJpbmRleEJ1ZmZlclwiKTtcblxuICAgICAgICAgICAgICAgIHRvdGFsTnVtID0gaW5kZXhCdWZmZXIubnVtO1xuXG4gICAgICAgICAgICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcnRleEJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgICAgICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGV4QnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKGdsW3RoaXMuX2RyYXdNb2RlXSwgdG90YWxOdW0sIGluZGV4QnVmZmVyLnR5cGUsIGluZGV4QnVmZmVyLnR5cGVTaXplICogc3RhcnRPZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdG90YWxOdW0gPSB2ZXJ0ZXhCdWZmZXIubnVtO1xuICAgICAgICAgICAgICAgIGdsLmRyYXdBcnJheXMoZ2xbdGhpcy5fZHJhd01vZGVdLCBzdGFydE9mZnNldCwgdG90YWxOdW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIC8vdG9kbyBhZGQgbW9yZSBhdHRyaWJ1dGUgcmVmZXIgdG8gdW5pdHlcblxuICAgIGV4cG9ydCBjbGFzcyBNYXRlcmlhbCB7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IG5ldyB0aGlzKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogbWFpbiBjb2xvclxuICAgICAgICAgKiBAdHlwZSB7Q29sb3J8ZHkuQ29sb3J9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICBwcml2YXRlIF9jb2xvcjpDb2xvciA9IENvbG9yLmNyZWF0ZShcIjB4ZmZmZmZmXCIpO1xuICAgICAgICBnZXQgY29sb3IoKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2xvcjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgY29sb3IoY29sb3I6Q29sb3Ipe1xuICAgICAgICAgICAgdGhpcy5fY29sb3IgPSBjb2xvcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdG9kbyBhZGQgZGVmYXVsdCBzaGFkZXJcbiAgICAgICAgcHJpdmF0ZSBfc2hhZGVyOnJlbmRlci5TaGFkZXIgPSBudWxsO1xuICAgICAgICBnZXQgc2hhZGVyKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2hhZGVyO1xuICAgICAgICB9XG4gICAgICAgIHNldCBzaGFkZXIoc2hhZGVyOnJlbmRlci5TaGFkZXIpe1xuICAgICAgICAgICAgdGhpcy5fc2hhZGVyID0gc2hhZGVyO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIExvYWRlcntcbiAgICAgICAgcHJpdmF0ZSBfY29udGFpbmVyOmR5Q2IuSGFzaDxzdHJpbmc+ID0gZHlDYi5IYXNoLmNyZWF0ZTxzdHJpbmc+KCk7XG5cbiAgICAgICAgcHVibGljIGxvYWQodXJsOnN0cmluZywgaWQ6c3RyaW5nKTpkeVJ0LlN0cmVhbXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBzdHJlYW0gPSBudWxsO1xuXG4gICAgICAgICAgICBpZih0aGlzLl9jb250YWluZXIuZ2V0Q2hpbGQoaWQpKXtcbiAgICAgICAgICAgICAgICBzdHJlYW0gPSBkeVJ0LmVtcHR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHN0cmVhbSA9IGR5UnQuZnJvbVByb21pc2UodGhpcy5sb2FkQXNzZXQodXJsKSlcbiAgICAgICAgICAgICAgICAgICAgLmRvKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9jb250YWluZXIuYWRkQ2hpbGQoaWQsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9lcnJvckhhbmRsZSh1cmwsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH0sIG51bGwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gc3RyZWFtO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldChpZDpzdHJpbmcpOnN0cmluZ3tcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb250YWluZXIuZ2V0Q2hpbGQoaWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGhhcyhpZDpzdHJpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRhaW5lci5oYXNDaGlsZChpZCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgbG9hZEFzc2V0KHVybDpzdHJpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfTUVUSE9EKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2Vycm9ySGFuZGxlKHBhdGg6c3RyaW5nLCBlcnI6c3RyaW5nKSB7XG4gICAgICAgICAgICBkeUNiLkxvZy5sb2coXCLliqDovb1cIiArIHBhdGggKyBcIui1hOa6kOWksei0pTpcIiArIGVycik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBHTFNMTG9hZGVyIGV4dGVuZHMgTG9hZGVye1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6R0xTTExvYWRlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBsb2FkQXNzZXQodXJsOnN0cmluZykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSU1ZQLlByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGR5Q2IuQWpheFV0aWxzLmFqYXgoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImdldFwiLFxuICAgICAgICAgICAgICAgICAgICAvL2FzeW5jOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudFR5cGU6IFwidGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIC8vY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IChYTUxIdHRwUmVxdWVzdCwgZXJyb3JUaHJvd24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcInVybDpcIiArIHVybCArIFwiXFxucmVhZHlTdGF0ZTpcIiArIFhNTEh0dHBSZXF1ZXN0LnJlYWR5U3RhdGUgKyBcIlxcbnN0YXR1czpcIiArIFhNTEh0dHBSZXF1ZXN0LnN0YXR1c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCJcXG5tZXNzYWdlOlwiICsgZXJyb3JUaHJvd24ubWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgXCJcXG5yZXNwb25zZVRleHQ6XCIgKyBYTUxIdHRwUmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBKc0xvYWRlciBleHRlbmRzIExvYWRlcntcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGxvYWRBc3NldCh1cmw6c3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUlNWUC5Qcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgc2NyaXB0OmFueSA9IHNlbGYuX2NyZWF0ZVNjcmlwdCgpO1xuXG4gICAgICAgICAgICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAvL3RvZG8gZ2V0IGVycm9yIG1lc3NhZ2UgZnJvbSBlKEV2ZW50KT9cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUpIHsgLy9JRVxuICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjcmlwdC5yZWFkeVN0YXRlID09PSBcImxvYWRlZFwiIHx8IHNjcmlwdC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVybCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyAvL090aGVyc1xuICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh1cmwpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHNldCB0aGUgc3JjIGF0dHJpYnV0ZSBhZnRlciB0aGUgb25sb2FkIGNhbGxiYWNrIGlzIHNldCwgdG8gYXZvaWQgYW4gaW5zdGFudCBsb2FkaW5nIGZhaWxpbmcgdG8gZmlyZSB0aGUgY2FsbGJhY2tcbiAgICAgICAgICAgICAgICBzY3JpcHQuc3JjID0gdXJsO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwZW5kU2NyaXB0KHNjcmlwdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NyZWF0ZVNjcmlwdCgpIHtcbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xuXG4gICAgICAgICAgICAvLy8vIHVzZSBhc3luYz1mYWxzZSB0byBmb3JjZSBzY3JpcHRzIHRvIGV4ZWN1dGUgaW4gb3JkZXJcbiAgICAgICAgICAgIC8vc2NyaXB0LmFzeW5jID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHJldHVybiBzY3JpcHQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9hcHBlbmRTY3JpcHQoc2NyaXB0KSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5e1xuICAgIGV4cG9ydCBjbGFzcyBMb2FkZXJNYW5hZ2Vye1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6TG9hZGVyTWFuYWdlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhc3NldENvdW50Om51bWJlciA9IDA7XG4gICAgICAgIHB1YmxpYyBjdXJyZW50TG9hZGVkQ291bnQ6bnVtYmVyID0gMDtcblxuICAgICAgICBwdWJsaWMgbG9hZCh1cmw6c3RyaW5nKTpkeVJ0LlN0cmVhbTtcbiAgICAgICAgcHVibGljIGxvYWQoYXNzZXRBcnI6QXJyYXk8e3VybDpzdHJpbmc7IGlkOnN0cmluZ30+KSA6ZHlSdC5TdHJlYW07XG5cbiAgICAgICAgcHVibGljIGxvYWQoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmKEp1ZGdlVXRpbHMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgbGV0IHVybDpzdHJpbmcgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGlkOnN0cmluZyA9IHVybDtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jcmVhdGVMb2FkU3RyZWFtKHVybCwgaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgYXNzZXRBcnIgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZHlSdC5mcm9tQXJyYXkoYXNzZXRBcnIpLmZsYXRNYXAoKGFzc2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLl9jcmVhdGVMb2FkQXNzZXRTdHJlYW0oYXNzZXQudXJsLCBhc3NldC5pZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVzZXQoKSB7XG4gICAgICAgICAgICB0aGlzLmFzc2V0Q291bnQgPSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50TG9hZGVkQ291bnQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfY3JlYXRlTG9hZEFzc2V0U3RyZWFtKHVybCwgaWQpe1xuICAgICAgICAgICAgdmFyIGxvYWRlciA9IHRoaXMuX2dldExvYWRlcih1cmwpLFxuICAgICAgICAgICAgICAgIHN0cmVhbSA9IG51bGwsXG4gICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmKCFsb2FkZXIuaGFzKGlkKSl7XG4gICAgICAgICAgICAgICAgc2VsZi5hc3NldENvdW50ICsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzdHJlYW0gPSBsb2FkZXIubG9hZCh1cmwsIGlkKVxuICAgICAgICAgICAgICAgIC5tYXAoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50TG9hZGVkQ291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudExvYWRlZENvdW50OiBzZWxmLmN1cnJlbnRMb2FkZWRDb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFzc2V0Q291bnQ6c2VsZi5hc3NldENvdW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHN0cmVhbTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NyZWF0ZUxvYWRTdHJlYW0odXJsLCBpZCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TG9hZGVyKHVybCkubG9hZCh1cmwsIGlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2dldExvYWRlcih1cmwpe1xuICAgICAgICAgICAgcmV0dXJuIExvYWRlckZhY3RvcnkuY3JlYXRlKGR5Q2IuUGF0aFV0aWxzLmV4dG5hbWUodXJsKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgTG9hZGVyRmFjdG9yeXtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZXh0bmFtZTpzdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBsb2FkZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV4dG5hbWUpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCIuanNcIjpcbiAgICAgICAgICAgICAgICAgICAgbG9hZGVyID0gSnNMb2FkZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIi5nbHNsXCI6XG4gICAgICAgICAgICAgICAgICAgIGxvYWRlciA9IEdMU0xMb2FkZXIuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5GVU5DX1VORVhQRUNUKGV4dG5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBsb2FkZXI7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgaW50ZXJmYWNlIElFdmVudE9mZkRhdGEge1xuICAgICAgICBldmVudE5hbWU6RXZlbnROYW1lLFxuICAgICAgICB3cmFwSGFuZGxlcjpGdW5jdGlvblxuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBFdmVudExpc3RlbmVyTWFwe1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgXHR2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICBcdHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9saXN0ZW5lck1hcDpkeUNiLkhhc2g8ZHlDYi5Db2xsZWN0aW9uPElFdmVudFJlZ2lzdGVyRGF0YT4+ID0gZHlDYi5IYXNoLmNyZWF0ZTxkeUNiLkNvbGxlY3Rpb248SUV2ZW50UmVnaXN0ZXJEYXRhPj4oKTtcblxuICAgICAgICBwdWJsaWMgYXBwZW5kQ2hpbGQoZXZlbnROYW1lOkV2ZW50TmFtZSwgZGF0YTpJRXZlbnRSZWdpc3RlckRhdGEpe1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgLy9TdHJpbmcoZGF0YS50YXJnZXQudWlkKSArIFwiX1wiICsgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgIHRoaXMuX2J1aWxkS2V5KGRhdGEudGFyZ2V0LCBldmVudE5hbWUpLFxuICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0Q2hpbGQoZXZlbnROYW1lOkV2ZW50TmFtZSk6ZHlDYi5Db2xsZWN0aW9uPElFdmVudFJlZ2lzdGVyRGF0YT47XG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZCh0YXJnZXQ6R2FtZU9iamVjdCk6ZHlDYi5Db2xsZWN0aW9uPElFdmVudFJlZ2lzdGVyRGF0YT47XG4gICAgICAgIHB1YmxpYyBnZXRDaGlsZCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSk6ZHlDYi5Db2xsZWN0aW9uPElFdmVudFJlZ2lzdGVyRGF0YT47XG5cbiAgICAgICAgcHVibGljIGdldENoaWxkKGFyZ3MpOmFueXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLl9saXN0ZW5lck1hcC5maWx0ZXIoKGxpc3Q6ZHlDYi5Db2xsZWN0aW9uLCBrZXk6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAvLyAgICByZXR1cm4ga2V5ID09PSBzZWxmLl9idWlsZEtleSh0YXJnZXQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAvL30pO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgSnVkZ2VVdGlscy5pc1N0cmluZyhhcmd1bWVudHNbMF0pKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmdldENoaWxkKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZmlsdGVyKChsaXN0OmR5Q2IuQ29sbGVjdGlvbjxJRXZlbnRSZWdpc3RlckRhdGE+LCBrZXk6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmlzVGFyZ2V0KGtleSwgdGFyZ2V0LCBsaXN0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmdldENoaWxkKHRoaXMuX2J1aWxkS2V5KHRhcmdldCwgZXZlbnROYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaGFzQ2hpbGQoLi4uYXJncyl7XG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIEp1ZGdlVXRpbHMuaXNGdW5jdGlvbihhcmd1bWVudHNbMF0pKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuaGFzQ2hpbGQoYXJndW1lbnRzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmhhc0NoaWxkKHRoaXMuX2J1aWxkS2V5KHRhcmdldCwgZXZlbnROYW1lKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZmlsdGVyKGZ1bmM6RnVuY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmZpbHRlcihmdW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmb3JFYWNoKGZ1bmM6RnVuY3Rpb24pe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmZvckVhY2goZnVuYyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQoZXZlbnROYW1lOkV2ZW50TmFtZSk6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG4gICAgICAgIHB1YmxpYyByZW1vdmVDaGlsZCh1aWQ6bnVtYmVyLCBldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgcmVtb3ZlQ2hpbGQodGFyZ2V0OkdhbWVPYmplY3QpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyByZW1vdmVDaGlsZCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSk6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZUNoaWxkKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uKTp2b2lkO1xuXG4gICAgICAgIHB1YmxpYyByZW1vdmVDaGlsZChhcmdzKXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBKdWRnZVV0aWxzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5yZW1vdmVDaGlsZChldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIEp1ZGdlVXRpbHMuaXNGdW5jdGlvbihhcmd1bWVudHNbMV0pKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBsaXN0OmR5Q2IuQ29sbGVjdGlvbjxJRXZlbnRSZWdpc3RlckRhdGE+ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGxpc3QgPSB0aGlzLl9saXN0ZW5lck1hcC5nZXRDaGlsZChldmVudE5hbWUpO1xuXG4gICAgICAgICAgICAgICAgbGlzdC5yZW1vdmVDaGlsZCgodmFsOklFdmVudFJlZ2lzdGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5oYW5kbGVyID09PSBoYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmKGxpc3QuZ2V0Q291bnQoKSA9PT0gMCl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIEp1ZGdlVXRpbHMuaXNOdW1iZXIoYXJndW1lbnRzWzBdKSl7XG4gICAgICAgICAgICAgICAgbGV0IHVpZCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAucmVtb3ZlQ2hpbGQodGhpcy5fYnVpbGRLZXkodWlkLCBldmVudE5hbWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyTWFwLnJlbW92ZUNoaWxkKChsaXN0OmR5Q2IuQ29sbGVjdGlvbjxJRXZlbnRSZWdpc3RlckRhdGE+LCBrZXk6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmlzVGFyZ2V0KGtleSwgdGFyZ2V0LCBsaXN0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5yZW1vdmVDaGlsZCh0aGlzLl9idWlsZEtleSh0YXJnZXQsIGV2ZW50TmFtZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5tYXAoKGxpc3Q6ZHlDYi5Db2xsZWN0aW9uPElFdmVudFJlZ2lzdGVyRGF0YT4sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5yZW1vdmVDaGlsZCgodmFsOklFdmVudFJlZ2lzdGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5oYW5kbGVyID09PSBoYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBpZihsaXN0LmdldENvdW50KCkgPT09IDApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGR5Q2IuJFJFTU9WRTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5LCBsaXN0XTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRFdmVudE9mZkRhdGFMaXN0KHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU/OkV2ZW50TmFtZSl7XG4gICAgICAgICAgICB2YXIgcmVzdWx0OmR5Q2IuQ29sbGVjdGlvbjxJRXZlbnRPZmZEYXRhPiA9IGR5Q2IuQ29sbGVjdGlvbi5jcmVhdGU8SUV2ZW50T2ZmRGF0YT4oKSxcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDaGlsZCh0YXJnZXQpXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGxpc3Q6ZHlDYi5Db2xsZWN0aW9uPElFdmVudFJlZ2lzdGVyRGF0YT4sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGxpc3QgJiYgbGlzdC5nZXRDb3VudCgpID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmFkZENoaWxkKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8SUV2ZW50T2ZmRGF0YT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IHNlbGYuZ2V0RXZlbnROYW1lRnJvbUtleShrZXkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEhhbmRsZXI6IGxpc3QuZ2V0Q2hpbGQoMCkud3JhcEhhbmRsZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3Q6ZHlDYi5Db2xsZWN0aW9uPElFdmVudFJlZ2lzdGVyRGF0YT4gPSB0aGlzLmdldENoaWxkKHRhcmdldCwgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgICAgIGlmKGxpc3QgJiYgbGlzdC5nZXRDb3VudCgpID4gMCl7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5hZGRDaGlsZChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxJRXZlbnRPZmZEYXRhPntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6IGV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwSGFuZGxlcjogbGlzdC5nZXRDaGlsZCgwKS53cmFwSGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0RXZlbnROYW1lRnJvbUtleShrZXk6c3RyaW5nKTpFdmVudE5hbWV7XG4gICAgICAgICAgICByZXR1cm4ga2V5LmluZGV4T2YoXCJfXCIpID4gLTEgPyA8YW55PmtleS5zcGxpdChcIl9cIilbMV0gOiBrZXk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0VWlkRnJvbUtleShrZXk6c3RyaW5nKTpudW1iZXJ7XG4gICAgICAgICAgICByZXR1cm4ga2V5LmluZGV4T2YoXCJfXCIpID4gLTEgPyBOdW1iZXIoPGFueT5rZXkuc3BsaXQoXCJfXCIpWzBdKSA6IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaXNUYXJnZXQoa2V5OnN0cmluZywgdGFyZ2V0OkdhbWVPYmplY3QsIGxpc3Q6ZHlDYi5Db2xsZWN0aW9uPElFdmVudFJlZ2lzdGVyRGF0YT4pe1xuICAgICAgICAgICAgcmV0dXJuIGtleS5pbmRleE9mKFN0cmluZyh0YXJnZXQudWlkKSkgPiAtMSAmJiBsaXN0ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9idWlsZEtleSh1aWQ6bnVtYmVyLCBldmVudE5hbWU6RXZlbnROYW1lKTpzdHJpbmc7XG4gICAgICAgIHByaXZhdGUgX2J1aWxkS2V5KHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKTpzdHJpbmc7XG5cbiAgICAgICAgcHJpdmF0ZSBfYnVpbGRLZXkoYXJncyl7XG4gICAgICAgICAgICBpZihKdWRnZVV0aWxzLmlzTnVtYmVyKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgICAgIGxldCB1aWQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9idWlsZEtleVdpdGhVaWQodWlkLCBldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0ID8gdGhpcy5fYnVpbGRLZXlXaXRoVWlkKHRhcmdldC51aWQsIGV2ZW50TmFtZSkgOiA8YW55PmV2ZW50TmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2J1aWxkS2V5V2l0aFVpZCh1aWQ6bnVtYmVyLCBldmVudE5hbWU6RXZlbnROYW1lKXtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodWlkKSArIFwiX1wiICsgZXZlbnROYW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwibW9kdWxlIGR5IHtcbiAgICBleHBvcnQgZW51bSBFdmVudFR5cGV7XG4gICAgICAgIE1PVVNFLFxuICAgICAgICBLRVlCT0FSRCxcbiAgICAgICAgQ1VTVE9NXG4gICAgfVxufVxuIiwibW9kdWxlIGR5e1xuICAgIGV4cG9ydCBlbnVtIEV2ZW50TmFtZXtcbiAgICAgICAgQ0xJQ0sgPSA8YW55PlwiY2xpY2tcIixcbiAgICAgICAgTU9VU0VPVkVSID0gPGFueT5cIm1vdXNlb3ZlclwiLFxuICAgICAgICBNT1VTRVVQID0gPGFueT5cIm1vdXNldXBcIixcbiAgICAgICAgTU9VU0VPVVQgPSA8YW55PlwibW91c2VvdXRcIixcbiAgICAgICAgTU9VU0VNT1ZFID0gPGFueT5cIm1vdXNlbW92ZVwiLFxuICAgICAgICBNT1VTRURPV04gPSA8YW55PlwibW91c2Vkb3duXCIsXG5cbiAgICAgICAgS0VZRE9XTiA9IDxhbnk+XCJrZXlkb3duXCIsXG4gICAgICAgIEtFWVVQID0gPGFueT5cImtleXVwXCIsXG4gICAgICAgIEtFWVBSRVNTID0gPGFueT5cImtleXByZXNzXCJcbiAgICB9XG59XG4iLCJtb2R1bGUgZHl7XG4gICAgZXhwb3J0IGVudW0gRXZlbnRQaGFzZXtcbiAgICAgICAgQlJPQURDQVNULFxuICAgICAgICBFTUlUXG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG4vL3RvZG8gY29tcGxldGUgaXQoYWRkIG1vcmUgZXZlbnQgdHlwZSlcbm1vZHVsZSBkeSB7XG4gICAgIGNvbnN0IF90YWJsZSA9IGR5Q2IuSGFzaC5jcmVhdGU8RXZlbnRUeXBlPigpO1xuXG4gICAgLy90b2RvIG5vdCBkZWNsYXJlIFwiPGFueT5cIiFcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuQ0xJQ0ssIEV2ZW50VHlwZS5NT1VTRSk7XG4gICAgX3RhYmxlLmFkZENoaWxkKDxhbnk+RXZlbnROYW1lLk1PVVNFT1ZFUiwgRXZlbnRUeXBlLk1PVVNFKTtcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuTU9VU0VPVVQsIEV2ZW50VHlwZS5NT1VTRSk7XG4gICAgX3RhYmxlLmFkZENoaWxkKDxhbnk+RXZlbnROYW1lLk1PVVNFTU9WRSwgRXZlbnRUeXBlLk1PVVNFKTtcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuTU9VU0VET1dOLCBFdmVudFR5cGUuTU9VU0UpO1xuICAgIF90YWJsZS5hZGRDaGlsZCg8YW55PkV2ZW50TmFtZS5NT1VTRVVQLCBFdmVudFR5cGUuTU9VU0UpO1xuICAgIF90YWJsZS5hZGRDaGlsZCg8YW55PkV2ZW50TmFtZS5LRVlET1dOLCBFdmVudFR5cGUuS0VZQk9BUkQpO1xuICAgIF90YWJsZS5hZGRDaGlsZCg8YW55PkV2ZW50TmFtZS5LRVlQUkVTUywgRXZlbnRUeXBlLktFWUJPQVJEKTtcbiAgICBfdGFibGUuYWRkQ2hpbGQoPGFueT5FdmVudE5hbWUuS0VZVVAsIEV2ZW50VHlwZS5LRVlCT0FSRCk7XG5cbiAgICBleHBvcnQgY2xhc3MgRXZlbnRUYWJsZSB7XG4gICAgICAgIC8vZ2V0RXZlbnRUeXBlIHNob3VsZCBwdXQgaGVyZSxcbiAgICAgICAgLy9pdCBzaG91bGQgbm90IHB1dCBpbiBFdmVudCBjbGFzcywgaXQncyBiZXR0ZXIgdG8gZXh0cmFjdCBFdmVudFRhYmxlIGNsYXNzIHRvIHB1dCBpblxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEV2ZW50VHlwZShldmVudE5hbWU6RXZlbnROYW1lKTpFdmVudFR5cGUge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IF90YWJsZS5nZXRDaGlsZCg8YW55PmV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIGlmKHJlc3VsdCA9PT0gdm9pZCAwKXtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBFdmVudFR5cGUuQ1VTVE9NO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wdWJsaWMgc3RhdGljIGlzRXZlbnRPblZpZXcoZXZlbnROYW1lOkV2ZW50TmFtZSl7XG4gICAgICAgIC8vICAgIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgc3dpdGNoKHRoaXMuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpe1xuICAgICAgICAvLyAgICAgICAgY2FzZSBFdmVudFR5cGUuTU9VU0U6XG4gICAgICAgIC8vICAgICAgICAgICAgcmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vICAgICAgICAgICAgZHlDYi5Mb2cuYXNzZXJ0KGZhbHNlLCBkeUNiLkxvZy5pbmZvLkZVTkNfVU5LTk9XKFwiZXZlbnROYW1lXCIpKTtcbiAgICAgICAgLy8gICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAvL31cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cblxuLy9yaWNoIGRvbWFpbiBtb2RlbFxuXG4vL2V2ZW50IGluZm86XG4vL2NvbnRyb2wgaW5mbyhzdG9wIGJ1YmJsZS4uLilcbi8vc3lzdGVtIGRhdGEoc3lzdGVtIGV2ZW50LCBhcyBjbGllbnRYLi4uKVxuLy9ldmVudCBjb250ZXh0KHRhcmdldCwgY3VycmVudFRhcmdldC4uLilcbi8vdXNlciBkYXRhKGN1c3RvbSBldmVudClcbi8vZXZlbnQgdHlwZVxuXG5cbm1vZHVsZSBkeXtcbiAgICBleHBvcnQgY2xhc3MgRXZlbnR7XG4gICAgICAgIGNvbnN0cnVjdG9yKGV2ZW50TmFtZTpFdmVudE5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSBldmVudE5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgdHlwZSgpe1xuICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodGhpcy5pbm5lclR5cGUgPT09IG51bGwsIGR5Q2IuTG9nLmluZm8uQUJTVFJBQ1RfQVRUUklCVVRFKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5uZXJUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbmFtZTpFdmVudE5hbWUgPSBudWxsO1xuICAgICAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgICB9XG4gICAgICAgIHNldCBuYW1lKG5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGFyZ2V0IGlzIHRoZSBhY3R1YWwgdGFyZ2V0IHRoYXQgcmVjZWl2ZWQgdGhlIGV2ZW50LlxuICAgICAgICBwcml2YXRlIF90YXJnZXQ6R2FtZU9iamVjdCA9IG51bGw7XG4gICAgICAgIGdldCB0YXJnZXQoKSB7XG4gICAgICAgICAgICAvL2R5Q2IuTG9nLmVycm9yKCF0aGlzLl90YXJnZXQsIGR5Q2IuTG9nLmluZm8uRlVOQ19NVVNUX0RFRklORShcInRhcmdldFwiKSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLl9ldmVudC5zcmNFbGVtZW50IHx8IHRoaXMuX2V2ZW50LnRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgdGFyZ2V0KHRhcmdldDpHYW1lT2JqZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL2N1cnJlbnRUYXJnZXQgaXMgYWx3YXlzIHRoZSBvYmplY3QgbGlzdGVuaW5nIGZvciB0aGUgZXZlbnRcbiAgICAgICAgcHJpdmF0ZSBfY3VycmVudFRhcmdldDpHYW1lT2JqZWN0ID0gbnVsbDtcbiAgICAgICAgZ2V0IGN1cnJlbnRUYXJnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgY3VycmVudFRhcmdldChjdXJyZW50VGFyZ2V0OkdhbWVPYmplY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRUYXJnZXQgPSBjdXJyZW50VGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfaXNTdG9wUHJvcGFnYXRpb246Ym9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBnZXQgaXNTdG9wUHJvcGFnYXRpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXNTdG9wUHJvcGFnYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGlzU3RvcFByb3BhZ2F0aW9uKGlzU3RvcFByb3BhZ2F0aW9uOmJvb2xlYW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2lzU3RvcFByb3BhZ2F0aW9uID0gaXNTdG9wUHJvcGFnYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9waGFzZTpFdmVudFBoYXNlID0gbnVsbDtcbiAgICAgICAgZ2V0IHBoYXNlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BoYXNlO1xuICAgICAgICB9XG4gICAgICAgIHNldCBwaGFzZShwaGFzZTpFdmVudFBoYXNlKSB7XG4gICAgICAgICAgICB0aGlzLl9waGFzZSA9IHBoYXNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGlubmVyVHlwZTpFdmVudFR5cGUgPSBudWxsO1xuXG4gICAgICAgIHB1YmxpYyBjb3B5KCk6RXZlbnR7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0b3BQcm9wYWdhdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzU3RvcFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBjb3B5TWVtYmVyKGRlc3RpbmF0aW9uOkV2ZW50LCBzb3VyY2U6RXZlbnQsIG1lbWJlckFycjpbYW55XSl7XG4gICAgICAgICAgICBtZW1iZXJBcnIuZm9yRWFjaCgobWVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25bbWVtYmVyXSA9IHNvdXJjZVttZW1iZXJdO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBleHBvcnQgY2xhc3MgTW91c2VFdmVudCBleHRlbmRzIEV2ZW50e1xuICAgICAgICAvL3B1YmxpYyBzdGF0aWMgQ0xJQ0s6c3RyaW5nID0gXCJjbGlja1wiO1xuICAgICAgICAvL3B1YmxpYyBzdGF0aWMgTU9VU0VPVkVSOnN0cmluZyA9IFwibW91c2VvdmVyXCI7XG4gICAgICAgIC8vcHVibGljIHN0YXRpYyBNT1VTRU9VVDpzdHJpbmcgPSBcIm1vdXNlb3V0XCI7XG4gICAgICAgIC8vcHVibGljIHN0YXRpYyBNT1VTRU1PVkU6c3RyaW5nID0gXCJtb3VzZW1vdmVcIjtcblxuICAgICAgICAvL3B1YmxpYyBzdGF0aWMgY3JlYXRlKGV2ZW50TmFtZTpFdmVudE5hbWUpIHtcbiAgICAgICAgLy8gICAgdmFyIG9iaiA9IG5ldyB0aGlzKGV2ZW50TmFtZSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHJldHVybiBvYmo7XG4gICAgICAgIC8vfVxuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShldmVudDphbnksIGV2ZW50TmFtZTpFdmVudE5hbWUpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcyhldmVudCwgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yKGV2ZW50OmFueSwgZXZlbnROYW1lOkV2ZW50TmFtZSkge1xuICAgICAgICAgICAgc3VwZXIoZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgdGhpcy5fZXZlbnQgPSBldmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBpbm5lclR5cGU6RXZlbnRUeXBlID0gRXZlbnRUeXBlLk1PVVNFO1xuXG5cbiAgICAgICAgcHJpdmF0ZSBfZXZlbnQ6YW55ID0gbnVsbDtcbiAgICAgICAgZ2V0IGV2ZW50KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50O1xuICAgICAgICB9XG4gICAgICAgIHNldCBldmVudChldmVudDphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50ID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfbG9jYXRpb246UG9pbnQgPSBudWxsO1xuICAgICAgICAvL0dldCBjdXJzb3IgbG9jYXRpb24ocmVsYXRlZCB0byBkb2N1bWVudClcbiAgICAgICAgZ2V0IGxvY2F0aW9uKCk6UG9pbnQge1xuICAgICAgICAgICAgdmFyIHBvaW50OlBvaW50ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBlID0gdGhpcy5ldmVudDtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2xvY2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwb2ludCA9IFBvaW50LmNyZWF0ZSgpO1xuXG4gICAgICAgICAgICBpZiAoYm93c2VyLm1zaWUpIHtcbiAgICAgICAgICAgICAgICBwb2ludC54ID0gZS5jbGllbnRYICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgIHBvaW50LnkgPSBlLmNsaWVudFkgKyBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcG9pbnQueCA9IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgcG9pbnQueSA9IGUucGFnZVk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwb2ludDtcbiAgICAgICAgfVxuICAgICAgICBzZXQgbG9jYXRpb24ocG9pbnQ6UG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uID0gcG9pbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9sb2NhdGlvbkluVmlldzpQb2ludCA9IG51bGw7XG4gICAgICAgIC8vUmV0dXJucyB0aGUgY3VycmVudCBjdXJzb3IgbG9jYXRpb24gaW4gc2NyZWVuIGNvb3JkaW5hdGVzKHJlbGF0ZWQgdG8gY2FudmFzKVxuICAgICAgICBnZXQgbG9jYXRpb25JblZpZXcoKTpQb2ludCB7XG4gICAgICAgICAgICAvL3JldHVybiB0aGlzLl9sb2NhdGlvbkluVmlldztcbiAgICAgICAgICAgIHZhciBwb2ludDpQb2ludCA9IG51bGwsXG4gICAgICAgICAgICAgICAgdmlld09mZnNldDphbnkgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fbG9jYXRpb25JblZpZXcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9jYXRpb25JblZpZXc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBvaW50ID0gdGhpcy5sb2NhdGlvbjtcblxuXG4gICAgICAgICAgICAvL2NhbnZhc09mZnNldCA9IHRoaXMuX2dldENhbnZhc09mZnNldCh0aGlzLmV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgdmlld09mZnNldCA9IERpcmVjdG9yLmdldEluc3RhbmNlKCkuZ2V0VmlldygpLm9mZnNldDtcblxuICAgICAgICAgICAgcmV0dXJuIFBvaW50LmNyZWF0ZShwb2ludC54IC0gdmlld09mZnNldC54LCBwb2ludC55IC0gdmlld09mZnNldC55KTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgbG9jYXRpb25JblZpZXcobG9jYXRpb25JblZpZXc6UG9pbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uSW5WaWV3ID0gbG9jYXRpb25JblZpZXc7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9idXR0b246bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IGJ1dHRvbigpIHtcbiAgICAgICAgICAgIHZhciBlID0gdGhpcy5ldmVudCxcbiAgICAgICAgICAgICAgICBtb3VzZUJ1dHRvbjpudW1iZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGJvd3Nlci5tc2llKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChlLmJ1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUJ1dHRvbiA9IE1vdXNlQnV0dG9uLkxFRlQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VCdXR0b24gPSBNb3VzZUJ1dHRvbi5SSUdIVDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUJ1dHRvbiA9IE1vdXNlQnV0dG9uLkNFTlRFUjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5GVU5DX05PVF9TVVBQT1JUKFwibXVsdGkgbW91c2UgYnV0dG9uXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vbW91c2VCdXR0b24gPSBlLmJ1dHRvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZS5idXR0b24pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VCdXR0b24gPSBNb3VzZUJ1dHRvbi5MRUZUO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlQnV0dG9uID0gTW91c2VCdXR0b24uUklHSFQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VCdXR0b24gPSBNb3VzZUJ1dHRvbi5DRU5URVI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19OT1RfU1VQUE9SVChcIm11bHRpIG1vdXNlIGJ1dHRvblwiKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL21vdXNlQnV0dG9uID0gZS5idXR0b247XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBtb3VzZUJ1dHRvbjtcbiAgICAgICAgfVxuICAgICAgICBzZXQgYnV0dG9uKGJ1dHRvbjpudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2J1dHRvbiA9IGJ1dHRvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjb3B5KCl7XG4gICAgICAgICAgICB2YXIgZXZlbnRPYmogPSBNb3VzZUV2ZW50LmNyZWF0ZSh0aGlzLl9ldmVudCwgdGhpcy5uYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29weU1lbWJlcihldmVudE9iaiwgdGhpcywgW1widGFyZ2V0XCIsIFwiY3VycmVudFRhcmdldFwiLCBcImlzU3RvcFByb3BhZ2F0aW9uXCIsIFwicGhhc2VcIl0pO1xuICAgICAgICB9XG5cblxuICAgICAgICAvL3ByaXZhdGUgX2dldENhbnZhc09mZnNldCh2aWV3OklWaWV3KSB7XG4gICAgICAgIC8vICAgIHJldHVybiB2aWV3LmdldE9mZnNldCgpO1xuICAgICAgICAvLyAgICB2YXIgb2Zmc2V0ID0ge3g6IGNhbnZhcy5vZmZzZXRMZWZ0LCB5OiBjYW52YXMub2Zmc2V0VG9wfTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgd2hpbGUgKGNhbnZhcyA9IGNhbnZhcy5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgLy8gICAgICAgIG9mZnNldC54ICs9IGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgICAvLyAgICAgICAgb2Zmc2V0LnkgKz0gY2FudmFzLm9mZnNldFRvcDtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICByZXR1cm4gb2Zmc2V0O1xuICAgICAgICAvL31cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgY29uc3QgU1BFQ0lBTF9LRVlfTUFQID0ge1xuICAgICAgICAgICAgODogXCJiYWNrc3BhY2VcIixcbiAgICAgICAgICAgIDk6IFwidGFiXCIsXG4gICAgICAgICAgICAxMDogXCJyZXR1cm5cIixcbiAgICAgICAgICAgIDEzOiBcInJldHVyblwiLFxuICAgICAgICAgICAgMTY6IFwic2hpZnRcIixcbiAgICAgICAgICAgIDE3OiBcImN0cmxcIixcbiAgICAgICAgICAgIDE4OiBcImFsdFwiLFxuICAgICAgICAgICAgMTk6IFwicGF1c2VcIixcbiAgICAgICAgICAgIDIwOiBcImNhcHNsb2NrXCIsXG4gICAgICAgICAgICAyNzogXCJlc2NcIixcbiAgICAgICAgICAgIDMyOiBcInNwYWNlXCIsXG4gICAgICAgICAgICAzMzogXCJwYWdldXBcIixcbiAgICAgICAgICAgIDM0OiBcInBhZ2Vkb3duXCIsXG4gICAgICAgICAgICAzNTogXCJlbmRcIixcbiAgICAgICAgICAgIDM2OiBcImhvbWVcIixcbiAgICAgICAgICAgIDM3OiBcImxlZnRcIixcbiAgICAgICAgICAgIDM4OiBcInVwXCIsXG4gICAgICAgICAgICAzOTogXCJyaWdodFwiLFxuICAgICAgICAgICAgNDA6IFwiZG93blwiLFxuICAgICAgICAgICAgNDU6IFwiaW5zZXJ0XCIsXG4gICAgICAgICAgICA0NjogXCJkZWxcIixcbiAgICAgICAgICAgIDU5OiBcIjtcIixcbiAgICAgICAgICAgIDYxOiBcIj1cIixcbiAgICAgICAgICAgIDY1OiBcImFcIixcbiAgICAgICAgICAgIDY2OiBcImJcIixcbiAgICAgICAgICAgIDY3OiBcImNcIixcbiAgICAgICAgICAgIDY4OiBcImRcIixcbiAgICAgICAgICAgIDY5OiBcImVcIixcbiAgICAgICAgICAgIDcwOiBcImZcIixcbiAgICAgICAgICAgIDcxOiBcImdcIixcbiAgICAgICAgICAgIDcyOiBcImhcIixcbiAgICAgICAgICAgIDczOiBcImlcIixcbiAgICAgICAgICAgIDc0OiBcImpcIixcbiAgICAgICAgICAgIDc1OiBcImtcIixcbiAgICAgICAgICAgIDc2OiBcImxcIixcbiAgICAgICAgICAgIDc3OiBcIm1cIixcbiAgICAgICAgICAgIDc4OiBcIm5cIixcbiAgICAgICAgICAgIDc5OiBcIm9cIixcbiAgICAgICAgICAgIDgwOiBcInBcIixcbiAgICAgICAgICAgIDgxOiBcInFcIixcbiAgICAgICAgICAgIDgyOiBcInJcIixcbiAgICAgICAgICAgIDgzOiBcInNcIixcbiAgICAgICAgICAgIDg0OiBcInRcIixcbiAgICAgICAgICAgIDg1OiBcInVcIixcbiAgICAgICAgICAgIDg2OiBcInZcIixcbiAgICAgICAgICAgIDg3OiBcIndcIixcbiAgICAgICAgICAgIDg4OiBcInhcIixcbiAgICAgICAgICAgIDg5OiBcInlcIixcbiAgICAgICAgICAgIDkwOiBcInpcIixcbiAgICAgICAgICAgIDk2OiBcIjBcIixcbiAgICAgICAgICAgIDk3OiBcIjFcIixcbiAgICAgICAgICAgIDk4OiBcIjJcIixcbiAgICAgICAgICAgIDk5OiBcIjNcIixcbiAgICAgICAgICAgIDEwMDogXCI0XCIsXG4gICAgICAgICAgICAxMDE6IFwiNVwiLFxuICAgICAgICAgICAgMTAyOiBcIjZcIixcbiAgICAgICAgICAgIDEwMzogXCI3XCIsXG4gICAgICAgICAgICAxMDQ6IFwiOFwiLFxuICAgICAgICAgICAgMTA1OiBcIjlcIixcbiAgICAgICAgICAgIDEwNjogXCIqXCIsXG4gICAgICAgICAgICAxMDc6IFwiK1wiLFxuICAgICAgICAgICAgMTA5OiBcIi1cIixcbiAgICAgICAgICAgIDExMDogXCIuXCIsXG4gICAgICAgICAgICAxMTE6IFwiL1wiLFxuICAgICAgICAgICAgMTEyOiBcImYxXCIsXG4gICAgICAgICAgICAxMTM6IFwiZjJcIixcbiAgICAgICAgICAgIDExNDogXCJmM1wiLFxuICAgICAgICAgICAgMTE1OiBcImY0XCIsXG4gICAgICAgICAgICAxMTY6IFwiZjVcIixcbiAgICAgICAgICAgIDExNzogXCJmNlwiLFxuICAgICAgICAgICAgMTE4OiBcImY3XCIsXG4gICAgICAgICAgICAxMTk6IFwiZjhcIixcbiAgICAgICAgICAgIDEyMDogXCJmOVwiLFxuICAgICAgICAgICAgMTIxOiBcImYxMFwiLFxuICAgICAgICAgICAgMTIyOiBcImYxMVwiLFxuICAgICAgICAgICAgMTIzOiBcImYxMlwiLFxuICAgICAgICAgICAgMTQ0OiBcIm51bWxvY2tcIixcbiAgICAgICAgICAgIDE0NTogXCJzY3JvbGxcIixcbiAgICAgICAgICAgIDE3MzogXCItXCIsXG4gICAgICAgICAgICAxODY6IFwiO1wiLFxuICAgICAgICAgICAgMTg3OiBcIj1cIixcbiAgICAgICAgICAgIDE4ODogXCIsXCIsXG4gICAgICAgICAgICAxODk6IFwiLVwiLFxuICAgICAgICAgICAgMTkwOiBcIi5cIixcbiAgICAgICAgICAgIDE5MTogXCIvXCIsXG4gICAgICAgICAgICAxOTI6IFwiYFwiLFxuICAgICAgICAgICAgMjE5OiBcIltcIixcbiAgICAgICAgICAgIDIyMDogXCJcXFxcXCIsXG4gICAgICAgICAgICAyMjE6IFwiXVwiLFxuICAgICAgICAgICAgMjIyOiBcIidcIlxuICAgICAgICB9LFxuICAgICAgICBTSElGVF9LRVlfTUFQID0ge1xuICAgICAgICAgICAgXCJgXCI6IFwiflwiLFxuICAgICAgICAgICAgXCIxXCI6IFwiIVwiLFxuICAgICAgICAgICAgXCIyXCI6IFwiQFwiLFxuICAgICAgICAgICAgXCIzXCI6IFwiI1wiLFxuICAgICAgICAgICAgXCI0XCI6IFwiJFwiLFxuICAgICAgICAgICAgXCI1XCI6IFwiJVwiLFxuICAgICAgICAgICAgXCI2XCI6IFwiXlwiLFxuICAgICAgICAgICAgXCI3XCI6IFwiJlwiLFxuICAgICAgICAgICAgXCI4XCI6IFwiKlwiLFxuICAgICAgICAgICAgXCI5XCI6IFwiKFwiLFxuICAgICAgICAgICAgXCIwXCI6IFwiKVwiLFxuICAgICAgICAgICAgXCItXCI6IFwiX1wiLFxuICAgICAgICAgICAgXCI9XCI6IFwiK1wiLFxuICAgICAgICAgICAgXCI7XCI6IFwiOiBcIixcbiAgICAgICAgICAgIFwiJ1wiOiBcIlxcXCJcIixcbiAgICAgICAgICAgIFwiLFwiOiBcIjxcIixcbiAgICAgICAgICAgIFwiLlwiOiBcIj5cIixcbiAgICAgICAgICAgIFwiL1wiOiBcIj9cIixcbiAgICAgICAgICAgIFwiXFxcXFwiOiBcInxcIlxuICAgICAgICB9O1xuXG4gICAgZXhwb3J0IGNsYXNzIEtleWJvYXJkRXZlbnQgZXh0ZW5kcyBFdmVudHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoZXZlbnQ6YW55LCBldmVudE5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoZXZlbnQsIGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvcihldmVudDphbnksIGV2ZW50TmFtZTpFdmVudE5hbWUpIHtcbiAgICAgICAgICAgIHN1cGVyKGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX2V2ZW50ID0gZXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgaW5uZXJUeXBlOkV2ZW50VHlwZSA9IEV2ZW50VHlwZS5LRVlCT0FSRDtcblxuICAgICAgICBwcml2YXRlIF9ldmVudDphbnkgPSBudWxsO1xuICAgICAgICBnZXQgZXZlbnQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IGV2ZW50KGV2ZW50OmFueSkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgY3RybEtleSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50LmN0cmxLZXk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgYWx0S2V5KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnQuYWx0S2V5O1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0IHNoaWZ0S2V5KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnQuc2hpZnRLZXk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQgbWV0YUtleSgpe1xuICAgICAgICAgICAgLy9yZXR1cm4gdGhpcy5fZXZlbnQubWV0YUtleSAmJiAhdGhpcy5jdHJsS2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50Lm1ldGFLZXk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQga2V5Q29kZSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50LmtleUNvZGU7XG4gICAgICAgIH1cblxuICAgICAgICBnZXQga2V5KCl7XG4gICAgICAgICAgICB2YXIga2V5ID0gU1BFQ0lBTF9LRVlfTUFQW3RoaXMua2V5Q29kZV0sXG4gICAgICAgICAgICAgICAgY2hhciA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmKCFrZXkpe1xuICAgICAgICAgICAgICAgIGNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHRoaXMua2V5Q29kZSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc2hpZnRLZXkpe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gU0hJRlRfS0VZX01BUFtjaGFyXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gY2hhcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBjb3B5KCl7XG4gICAgICAgICAgICB2YXIgZXZlbnRPYmogPSBLZXlib2FyZEV2ZW50LmNyZWF0ZSh0aGlzLl9ldmVudCwgdGhpcy5uYW1lKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29weU1lbWJlcihldmVudE9iaiwgdGhpcywgW1wiYWx0S2V5XCIsIFwic2hpZnRLZXlcIiwgXCJjdHJsS2V5XCIsIFwibWV0YUtleVwiLCBcImtleUNvZGVcIiwgXCJrZXlcIl0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBDdXN0b21FdmVudCBleHRlbmRzIEV2ZW50e1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShldmVudE5hbWU6c3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoPGFueT5ldmVudE5hbWUpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGlubmVyVHlwZTpFdmVudFR5cGUgPSBFdmVudFR5cGUuQ1VTVE9NO1xuICAgICAgICBcbiAgICAgICAgcHJpdmF0ZSBfdXNlckRhdGE6YW55ID0gbnVsbDtcbiAgICAgICAgZ2V0IHVzZXJEYXRhKCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlckRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHVzZXJEYXRhKHVzZXJEYXRhOmFueSl7XG4gICAgICAgICAgICB0aGlzLl91c2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHlQdWJsaWNBdHRyaShkZXN0aW5hdGlvbiwgc291cmNlOmFueSl7XG4gICAgICAgICAgICB2YXIgcHJvcGVydHkgPSBudWxsO1xuICAgICAgICAgICAgICAgIC8vZGVzdGluYXRpb24gPSB7fTtcblxuICAgICAgICAgICAgZHlDYi5FeHRlbmRVdGlscy5leHRlbmQoZGVzdGluYXRpb24sIGZ1bmN0aW9uKGl0ZW0sIHByb3BlcnR5KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHkuc2xpY2UoMCwgMSkgIT09IFwiX1wiXG4gICAgICAgICAgICAgICAgICAgICYmICFKdWRnZVV0aWxzLmlzRnVuY3Rpb24oaXRlbSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGNvcHkoKXtcbiAgICAgICAgICAgIHZhciBldmVudE9iaiA9IEN1c3RvbUV2ZW50LmNyZWF0ZSg8YW55PnRoaXMubmFtZSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvcHlNZW1iZXIoZXZlbnRPYmosIHRoaXMsIFtcInRhcmdldFwiLCBcImN1cnJlbnRUYXJnZXRcIiwgXCJpc1N0b3BQcm9wYWdhdGlvblwiLCBcInBoYXNlXCJdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGVudW0gTW91c2VCdXR0b257XG4gICAgICAgIExFRlQsXG4gICAgICAgIFJJR0hULFxuICAgICAgICBDRU5URVJcbiAgICB9XG59XG5cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBleHBvcnQgaW50ZXJmYWNlIElFdmVudEhhbmRsZXJEYXRhe1xuICAgICAgICBldmVudE5hbWU6RXZlbnROYW1lO1xuICAgICAgICBoYW5kbGVyOkZ1bmN0aW9uO1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBFdmVudExpc3RlbmVyIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUob3B0aW9uKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMob3B0aW9uKTtcblxuICAgICAgICAgICAgb2JqLmluaXRXaGVuQ3JlYXRlKG9wdGlvbik7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9ldmVudFR5cGU6RXZlbnRUeXBlID0gbnVsbDtcbiAgICAgICAgZ2V0IGV2ZW50VHlwZSgpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50VHlwZTtcbiAgICAgICAgfVxuICAgICAgICBzZXQgZXZlbnRUeXBlKGV2ZW50VHlwZTpFdmVudFR5cGUpe1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRUeXBlID0gZXZlbnRUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfcHJpb3JpdHk6bnVtYmVyID0gbnVsbDtcbiAgICAgICAgZ2V0IHByaW9yaXR5KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJpb3JpdHk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0IHByaW9yaXR5KHByaW9yaXR5Om51bWJlcil7XG4gICAgICAgICAgICB0aGlzLl9wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfaGFuZGxlckRhdGFMaXN0OmR5Q2IuQ29sbGVjdGlvbjxJRXZlbnRIYW5kbGVyRGF0YT4gPSBkeUNiLkNvbGxlY3Rpb24uY3JlYXRlPElFdmVudEhhbmRsZXJEYXRhPigpO1xuICAgICAgICBnZXQgaGFuZGxlckRhdGFMaXN0KCl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGFuZGxlckRhdGFMaXN0O1xuICAgICAgICB9XG4gICAgICAgIHNldCBoYW5kbGVyRGF0YUxpc3QoaGFuZGxlckRhdGFMaXN0OmR5Q2IuQ29sbGVjdGlvbjxJRXZlbnRIYW5kbGVyRGF0YT4pe1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlckRhdGFMaXN0ID0gaGFuZGxlckRhdGFMaXN0O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3Iob3B0aW9uOmFueSl7XG4gICAgICAgICAgICB0aGlzLl9ldmVudFR5cGUgPSBvcHRpb24uZXZlbnRUeXBlO1xuICAgICAgICAgICAgdGhpcy5fcHJpb3JpdHkgPSBvcHRpb24ucHJpb3JpdHkgfHwgMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpbml0V2hlbkNyZWF0ZShvcHRpb246e2FueX0pe1xuICAgICAgICAgICAgdGhpcy5fc2V0SGFuZGxlckRhdGFMaXN0KG9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9zZXRIYW5kbGVyRGF0YUxpc3Qob3B0aW9uOnthbnl9KXtcbiAgICAgICAgICAgIHZhciBpID0gbnVsbCxcbiAgICAgICAgICAgICAgICBSRUdFWF9IQU5ERVIgPSAvb25cXHcrLztcblxuICAgICAgICAgICAgZm9yKGkgaW4gb3B0aW9uKXtcbiAgICAgICAgICAgICAgICBpZihvcHRpb24uaGFzT3duUHJvcGVydHkoaSkpe1xuICAgICAgICAgICAgICAgICAgICBpZihSRUdFWF9IQU5ERVIudGVzdChpKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVyRGF0YUxpc3QuYWRkQ2hpbGQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogdGhpcy5fcGFyc2VFdmVudE5hbWUoaSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcjogb3B0aW9uW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3BhcnNlRXZlbnROYW1lKGhhbmRsZXJOYW1lKXtcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVyTmFtZS5zbGljZSgyKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBFdmVudEhhbmRsZXIge1xuICAgICAgICBwdWJsaWMgb24oLi4uYXJncykge1xuICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9mZiguLi5hcmdzKSB7XG4gICAgICAgICAgICBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgdHJpZ2dlciguLi5hcmdzKTpib29sZWFuIHtcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIERvbUV2ZW50SGFuZGxlciBleHRlbmRzIEV2ZW50SGFuZGxlcntcbiAgICAgICAgcHVibGljIG9mZiguLi5hcmdzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICAgICAgZG9tID0gdGhpcy5nZXREb20oKSxcbiAgICAgICAgICAgICAgICBldmVudFJlZ2lzdGVyID0gRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpLFxuICAgICAgICAgICAgICAgIGV2ZW50T2ZmRGF0YUxpc3Q6ZHlDYi5Db2xsZWN0aW9uPElFdmVudE9mZkRhdGE+ID0gbnVsbDtcblxuICAgICAgICAgICAgZXZlbnRPZmZEYXRhTGlzdCA9IGV2ZW50UmVnaXN0ZXIucmVtb3ZlLmFwcGx5KGV2ZW50UmVnaXN0ZXIsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpO1xuXG4gICAgICAgICAgICBpZihldmVudE9mZkRhdGFMaXN0KXtcbiAgICAgICAgICAgICAgICBldmVudE9mZkRhdGFMaXN0LmZvckVhY2goKGV2ZW50T2ZmRGF0YTpJRXZlbnRPZmZEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX3VuQmluZChkb20sIGV2ZW50T2ZmRGF0YS5ldmVudE5hbWUsIGV2ZW50T2ZmRGF0YS53cmFwSGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBnZXREb20oKXtcbiAgICAgICAgICAgIHJldHVybiBkeUNiLkxvZy5lcnJvcih0cnVlLCBkeUNiLkxvZy5pbmZvLkFCU1RSQUNUX01FVEhPRCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgYnVpbGRXcmFwSGFuZGxlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSl7XG4gICAgICAgICAgICByZXR1cm4gZHlDYi5Mb2cuZXJyb3IodHJ1ZSwgZHlDYi5Mb2cuaW5mby5BQlNUUkFDVF9NRVRIT0QpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGhhbmRsZXIodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIsIHByaW9yaXR5KXtcbiAgICAgICAgICAgIHZhciB3cmFwSGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgICAgIGlmICghRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpLmlzQmluZGVkKHRhcmdldCwgZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgICAgIHdyYXBIYW5kbGVyID0gdGhpcy5fYmluZCh0aGlzLmdldERvbSgpLCBldmVudE5hbWUsIHRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHdyYXBIYW5kbGVyID0gRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpLmdldFdyYXBIYW5kbGVyKHRhcmdldCwgZXZlbnROYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpLnJlZ2lzdGVyKFxuICAgICAgICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAgICAgICBldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgICB3cmFwSGFuZGxlcixcbiAgICAgICAgICAgICAgICBwcmlvcml0eVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2JpbmQoZG9tOmFueSwgZXZlbnROYW1lOkV2ZW50TmFtZSwgdGFyZ2V0OkdhbWVPYmplY3Qpe1xuICAgICAgICAgICAgdmFyIHdyYXBIYW5kbGVyID0gbnVsbDtcblxuICAgICAgICAgICAgd3JhcEhhbmRsZXIgPSB0aGlzLmJ1aWxkV3JhcEhhbmRsZXIodGFyZ2V0LCBldmVudE5hbWUpO1xuXG4gICAgICAgICAgICBkeUNiLkV2ZW50VXRpbHMuYWRkRXZlbnQoXG4gICAgICAgICAgICAgICAgZG9tLFxuICAgICAgICAgICAgICAgIGV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICB3cmFwSGFuZGxlclxuICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICByZXR1cm4gd3JhcEhhbmRsZXI7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF91bkJpbmQoZG9tLCBldmVudE5hbWUsIGhhbmRsZXIpe1xuICAgICAgICAgICAgZHlDYi5FdmVudFV0aWxzLnJlbW92ZUV2ZW50KGRvbSwgZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5cbi8vcmVzcG9uc2libGl0eTpoYW5kbGUgbG9naWMgd2l0aCBzcGVjaWZ5IGV2ZW50IGNhdGVnb3J5XG4vL2p1ZGdlIGlzIHVuZGVyIHBvaW50XG4vL3dyYXAgZXZlbnQgb2JqZWN0XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBNb3VzZUV2ZW50SGFuZGxlciBleHRlbmRzIERvbUV2ZW50SGFuZGxlcntcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOk1vdXNlRXZlbnRIYW5kbGVyID0gbnVsbDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgdGhpcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9uKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uLCBwcmlvcml0eTpudW1iZXIpIHtcbiAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKCEodGFyZ2V0IGluc3RhbmNlb2YgR2FtZU9iamVjdCksIGR5Q2IuTG9nLmluZm8uRlVOQ19NVVNUX0JFKFwidGFyZ2V0XCIsIFwiR2FtZU9iamVjdFwiKSk7XG5cbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50LCBub3RTZXRUYXJnZXQ6Ym9vbGVhbik6Ym9vbGVhbntcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudC5uYW1lLFxuICAgICAgICAgICAgICAgIGV2ZW50VHlwZSA9IGV2ZW50LnR5cGUsXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJEYXRhTGlzdDpkeUNiLkNvbGxlY3Rpb248SUV2ZW50UmVnaXN0ZXJEYXRhPiA9IG51bGwsXG4gICAgICAgICAgICAgICAgaXNTdG9wUHJvcGFnYXRpb24gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgR2FtZU9iamVjdCkpIHtcbiAgICAgICAgICAgICAgICBkeUNiLkxvZy5sb2coXCJ0YXJnZXQgaXMgbm90IEdhbWVPYmplY3QsIGNhbid0IHRyaWdnZXIgZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighbm90U2V0VGFyZ2V0KXtcbiAgICAgICAgICAgICAgICBldmVudC50YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlZ2lzdGVyRGF0YUxpc3QgPSBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkuZ2V0RXZlbnRSZWdpc3RlckRhdGFMaXN0KHRhcmdldCwgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgaWYgKHJlZ2lzdGVyRGF0YUxpc3QgPT09IG51bGwgfHwgcmVnaXN0ZXJEYXRhTGlzdC5nZXRDb3VudCgpPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlZ2lzdGVyRGF0YUxpc3QuZm9yRWFjaCgocmVnaXN0ZXJEYXRhOklFdmVudFJlZ2lzdGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBldmVudENvcHkgPSBldmVudC5jb3B5KCk7XG5cbiAgICAgICAgICAgICAgICByZWdpc3RlckRhdGEuaGFuZGxlcihldmVudENvcHkpO1xuICAgICAgICAgICAgICAgIGlmKGV2ZW50Q29weS5pc1N0b3BQcm9wYWdhdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIGlzU3RvcFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGlzU3RvcFByb3BhZ2F0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGdldERvbSgpIHtcbiAgICAgICAgICAgIHJldHVybiBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdldFZpZXcoKS5kb207XG4gICAgICAgIH1cblxuICAgICAgICBwcm90ZWN0ZWQgYnVpbGRXcmFwSGFuZGxlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSl7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IHdpbmRvdztcblxuICAgICAgICAgICAgcmV0dXJuIGR5Q2IuRXZlbnRVdGlscy5iaW5kRXZlbnQoY29udGV4dCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50T2JqZWN0Ok1vdXNlRXZlbnQgPSBzZWxmLl9jcmVhdGVFdmVudE9iamVjdChldmVudCwgZXZlbnROYW1lLCB0YXJnZXQpLFxuICAgICAgICAgICAgICAgICAgICB0b3BUYXJnZXQgPSBEaXJlY3Rvci5nZXRJbnN0YW5jZSgpLmdldFRvcFVuZGVyUG9pbnQoZXZlbnRPYmplY3QubG9jYXRpb25JblZpZXcpO1xuXG4gICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLmVtaXQodG9wVGFyZ2V0LCBldmVudE9iamVjdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2lzVHJpZ2dlcihyZXN1bHQpe1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCAmJiByZXN1bHQuZ2V0Q291bnQoKSA+IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9jcmVhdGVFdmVudE9iamVjdChldmVudDphbnksIGV2ZW50TmFtZTpFdmVudE5hbWUsIGN1cnJlbnRUYXJnZXQ6R2FtZU9iamVjdCkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IE1vdXNlRXZlbnQuY3JlYXRlKGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQsIGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIG9iai5jdXJyZW50VGFyZ2V0ID0gY3VycmVudFRhcmdldDtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbiAgICBkZWNsYXJlIHZhciBkb2N1bWVudDphbnk7XG5cbiAgICAvL3RvZG8gYmluZCBvbiBHYW1lT2JqZWN0IHdoaWNoIGhhcyB0aGUgZm9jdXNcbiAgICBleHBvcnQgY2xhc3MgS2V5Ym9hcmRFdmVudEhhbmRsZXIgZXh0ZW5kcyBEb21FdmVudEhhbmRsZXJ7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTpLZXlib2FyZEV2ZW50SGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbihldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uLCBwcmlvcml0eTpudW1iZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcihudWxsLCBldmVudE5hbWUsIGhhbmRsZXIsIHByaW9yaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKGV2ZW50OkV2ZW50KTpib29sZWFue1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50Lm5hbWUsXG4gICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gZXZlbnQudHlwZSxcbiAgICAgICAgICAgICAgICByZWdpc3RlckRhdGFMaXN0OmR5Q2IuQ29sbGVjdGlvbjxJRXZlbnRSZWdpc3RlckRhdGE+ID0gbnVsbCxcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgcmVnaXN0ZXJEYXRhTGlzdCA9IEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5nZXRFdmVudFJlZ2lzdGVyRGF0YUxpc3QoZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgaWYgKHJlZ2lzdGVyRGF0YUxpc3QgPT09IG51bGwgfHwgcmVnaXN0ZXJEYXRhTGlzdC5nZXRDb3VudCgpPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJlZ2lzdGVyRGF0YUxpc3QuZm9yRWFjaCgocmVnaXN0ZXJEYXRhOklFdmVudFJlZ2lzdGVyRGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBldmVudENvcHkgPSBldmVudC5jb3B5KCk7XG5cbiAgICAgICAgICAgICAgICByZWdpc3RlckRhdGEuaGFuZGxlcihldmVudENvcHkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvdGVjdGVkIGdldERvbSgpIHtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBidWlsZFdyYXBIYW5kbGVyKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgICAgICBjb250ZXh0ID0gd2luZG93O1xuXG4gICAgICAgICAgICByZXR1cm4gZHlDYi5FdmVudFV0aWxzLmJpbmRFdmVudChjb250ZXh0LCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIudHJpZ2dlcihzZWxmLl9jcmVhdGVFdmVudE9iamVjdChldmVudCwgZXZlbnROYW1lKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfaXNUcmlnZ2VyKHJlc3VsdCl7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0ICYmIHJlc3VsdC5nZXRDb3VudCgpID4gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2NyZWF0ZUV2ZW50T2JqZWN0KGV2ZW50OmFueSwgZXZlbnROYW1lOkV2ZW50TmFtZSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IEtleWJvYXJkRXZlbnQuY3JlYXRlKGV2ZW50ID8gZXZlbnQgOiB3aW5kb3cuZXZlbnQsIGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGNsYXNzIEN1c3RvbUV2ZW50SGFuZGxlciBleHRlbmRzIEV2ZW50SGFuZGxlcntcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOkN1c3RvbUV2ZW50SGFuZGxlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBvbihldmVudE5hbWU6c3RyaW5nLCBoYW5kbGVyOkZ1bmN0aW9uLCBwcmlvcml0eTpudW1iZXIpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvbih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOnN0cmluZywgaGFuZGxlcjpGdW5jdGlvbiwgcHJpb3JpdHk6bnVtYmVyKTp2b2lkO1xuXG4gICAgICAgIHB1YmxpYyBvbihhcmdzKSB7XG4gICAgICAgICAgICBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5yZWdpc3RlcihcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgPGFueT5ldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIsXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9IGFyZ3VtZW50c1szXTtcblxuICAgICAgICAgICAgICAgIEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5yZWdpc3RlcihcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LFxuICAgICAgICAgICAgICAgICAgICA8YW55PmV2ZW50TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcixcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIG9mZihldmVudE5hbWU6c3RyaW5nKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb2ZmKHVpZDpudW1iZXIsIGV2ZW50TmFtZTpzdHJpbmcpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvZmYoZXZlbnROYW1lOnN0cmluZywgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcbiAgICAgICAgcHVibGljIG9mZih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOnN0cmluZywgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcblxuICAgICAgICBwdWJsaWMgb2ZmKGFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBldmVudFJlZ2lzdGVyID0gRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpO1xuXG4gICAgICAgICAgICBldmVudFJlZ2lzdGVyLnJlbW92ZS5hcHBseShldmVudFJlZ2lzdGVyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKGV2ZW50OkV2ZW50KTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcihldmVudDpFdmVudCwgdXNlckRhdGE6YW55KTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIG5vdFNldFRhcmdldDpib29sZWFuKTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIHVzZXJEYXRhOmFueSwgbm90U2V0VGFyZ2V0OmJvb2xlYW4pOmJvb2xlYW47XG5cbiAgICAgICAgcHVibGljIHRyaWdnZXIoYXJncykge1xuICAgICAgICAgICAgdmFyIGV2ZW50OkV2ZW50ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICBsZXQgdXNlckRhdGEgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBldmVudCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RyaWdnZXJFdmVudEhhbmRsZXIoZXZlbnQsIHVzZXJEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyB8fCBhcmd1bWVudHMubGVuZ3RoID09PSA0KXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICBub3RTZXRUYXJnZXQgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyl7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgICAgIG5vdFNldFRhcmdldCA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgICAgICAgICBldmVudCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSBhcmd1bWVudHNbMl07XG4gICAgICAgICAgICAgICAgICAgIG5vdFNldFRhcmdldCA9IGFyZ3VtZW50c1szXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdHJpZ2dlclRhcmdldEFuZEV2ZW50SGFuZGxlcih0YXJnZXQsIGV2ZW50LCB1c2VyRGF0YSwgbm90U2V0VGFyZ2V0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdHJpZ2dlckV2ZW50SGFuZGxlcihldmVudCwgdXNlckRhdGEpe1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVyRGF0YUxpc3Q6ZHlDYi5Db2xsZWN0aW9uPElFdmVudFJlZ2lzdGVyRGF0YT4gPSBudWxsLFxuICAgICAgICAgICAgICAgIGlzU3RvcFByb3BhZ2F0aW9uID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGxpc3RlbmVyRGF0YUxpc3QgPSBFdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkuZ2V0RXZlbnRSZWdpc3RlckRhdGFMaXN0KGV2ZW50Lm5hbWUpO1xuXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJEYXRhTGlzdCA9PT0gbnVsbCB8fCBsaXN0ZW5lckRhdGFMaXN0LmdldENvdW50KCk9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdGVuZXJEYXRhTGlzdC5mb3JFYWNoKChsaXN0ZW5lckRhdGE6SUV2ZW50UmVnaXN0ZXJEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50Q29weSA9IGV2ZW50LmNvcHkoKTtcblxuICAgICAgICAgICAgICAgIGV2ZW50Q29weS5jdXJyZW50VGFyZ2V0ID0gbGlzdGVuZXJEYXRhLnRhcmdldDtcbiAgICAgICAgICAgICAgICBldmVudENvcHkudGFyZ2V0ID0gbGlzdGVuZXJEYXRhLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHNlbGYuX3NldFVzZXJEYXRhKGV2ZW50Q29weSwgdXNlckRhdGEpO1xuXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJEYXRhLmhhbmRsZXIoZXZlbnRDb3B5KTtcblxuICAgICAgICAgICAgICAgIC8vaWYoZXZlbnRDb3B5LmlzU3RvcFByb3BhZ2F0aW9uKXtcbiAgICAgICAgICAgICAgICAvLyAgICBpc1N0b3BQcm9wYWdhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy99XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy9yZXR1cm4gaXNTdG9wUHJvcGFnYXRpb247XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3RyaWdnZXJUYXJnZXRBbmRFdmVudEhhbmRsZXIodGFyZ2V0LCBldmVudCwgdXNlckRhdGEsIG5vdFNldFRhcmdldCl7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJEYXRhTGlzdDpkeUNiLkNvbGxlY3Rpb248SUV2ZW50UmVnaXN0ZXJEYXRhPiA9IG51bGwsXG4gICAgICAgICAgICAgICAgaXNTdG9wUHJvcGFnYXRpb24gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYoIW5vdFNldFRhcmdldCl7XG4gICAgICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaXN0ZW5lckRhdGFMaXN0ID0gRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpLmdldEV2ZW50UmVnaXN0ZXJEYXRhTGlzdCh0YXJnZXQsIGV2ZW50Lm5hbWUpO1xuXG4gICAgICAgICAgICBpZiAobGlzdGVuZXJEYXRhTGlzdCA9PT0gbnVsbCB8fCBsaXN0ZW5lckRhdGFMaXN0LmdldENvdW50KCk9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGlzdGVuZXJEYXRhTGlzdC5mb3JFYWNoKChsaXN0ZW5lckRhdGE6SUV2ZW50UmVnaXN0ZXJEYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50Q29weSA9IGV2ZW50LmNvcHkoKTtcblxuICAgICAgICAgICAgICAgIGV2ZW50Q29weS5jdXJyZW50VGFyZ2V0ID0gbGlzdGVuZXJEYXRhLnRhcmdldDtcblxuICAgICAgICAgICAgICAgIHNlbGYuX3NldFVzZXJEYXRhKGV2ZW50Q29weSwgdXNlckRhdGEpO1xuXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJEYXRhLmhhbmRsZXIoZXZlbnRDb3B5KTtcblxuICAgICAgICAgICAgICAgIGlmKGV2ZW50Q29weS5pc1N0b3BQcm9wYWdhdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIGlzU3RvcFByb3BhZ2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIGlzU3RvcFByb3BhZ2F0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfc2V0VXNlckRhdGEoZXZlbnQ6Q3VzdG9tRXZlbnQsIHVzZXJEYXRhKXtcbiAgICAgICAgICAgIGlmKHVzZXJEYXRhKXtcbiAgICAgICAgICAgICAgICBldmVudC51c2VyRGF0YSA9IHVzZXJEYXRhO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIGV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuICAgICAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZSgpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBuZXcgdGhpcygpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wcml2YXRlIF9ldmVudEJpbmRlcjogRXZlbnRCaW5kZXIgPSBudWxsO1xuICAgICAgICAvL3ByaXZhdGUgX2V2ZW50UmVnaXN0ZXI6RXZlbnRSZWdpc3RlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICAvL3RoaXMuX2V2ZW50QmluZGVyID0gYmluZGVyO1xuICAgICAgICAgICAgLy9FdmVudFJlZ2lzdGVyLmdldEluc3RhbmNlKCkgPSByZWdpc3RlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vZGlzcGF0Y2ggaW4gZXZlbnRCaW5kZXItPmV2ZW50TGlzdFxuXG5cbiAgICAgICAgLy9wdWJsaWMgc2V0QnViYmxlUGFyZW50KHRhcmdldDpHYW1lT2JqZWN0LCBwYXJlbnQ6YW55KSB7XG4gICAgICAgIC8vICAgIEV2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKS5zZXRCdWJibGVQYXJlbnQodGFyZ2V0LCBwYXJlbnQpO1xuICAgICAgICAvL31cblxuICAgICAgICBwdWJsaWMgdHJpZ2dlcihldmVudDpFdmVudCk6Ym9vbGVhbjtcbiAgICAgICAgcHVibGljIHRyaWdnZXIoZXZlbnQ6RXZlbnQsIHVzZXJEYXRhOmFueSk6dm9pZDtcbiAgICAgICAgcHVibGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50KTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIG5vdFNldFRhcmdldDpib29sZWFuKTpib29sZWFuO1xuICAgICAgICBwdWJsaWMgdHJpZ2dlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIHVzZXJEYXRhOmFueSk6Ym9vbGVhbjtcbiAgICAgICAgcHVibGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50LCB1c2VyRGF0YTphbnksIG5vdFNldFRhcmdldDpib29sZWFuKTpib29sZWFuO1xuXG4gICAgICAgIHB1YmxpYyB0cmlnZ2VyKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gZXZlbnQudHlwZTtcblxuICAgICAgICAgICAgICAgIC8vZHlDYi5Mb2cuZXJyb3IoZXZlbnRUeXBlICE9PSBFdmVudFR5cGUuQ1VTVE9NLCBkeUNiLkxvZy5pbmZvLkZVTkNfTVVTVF9CRShcImV2ZW50IHR5cGVcIiwgXCJDVVNUT01cIikpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKGV2ZW50VHlwZSlcbiAgICAgICAgICAgICAgICAgICAgLnRyaWdnZXIoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyICYmICEoYXJndW1lbnRzWzFdIGluc3RhbmNlb2YgRXZlbnQpKXtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIHVzZXJEYXRhID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGUgPSBldmVudC50eXBlO1xuXG4gICAgICAgICAgICAgICAgZHlDYi5Mb2cuZXJyb3IoZXZlbnRUeXBlICE9PSBFdmVudFR5cGUuQ1VTVE9NLCBkeUNiLkxvZy5pbmZvLkZVTkNfTVVTVF9CRShcImV2ZW50IHR5cGVcIiwgXCJDVVNUT01cIikpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKGV2ZW50VHlwZSlcbiAgICAgICAgICAgICAgICAgICAgLnRyaWdnZXIoZXZlbnQsIHVzZXJEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiB8fCAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiBKdWRnZVV0aWxzLmlzQm9vbGVhbihhcmd1bWVudHNbMl0pKSl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIG5vdFNldFRhcmdldCA9IGFyZ3VtZW50c1syXSA9PT0gdm9pZCAwID8gZmFsc2UgOiBhcmd1bWVudHNbMl0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZSA9IGV2ZW50LnR5cGU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoZXZlbnRUeXBlKVxuICAgICAgICAgICAgICAgICAgICAudHJpZ2dlcih0YXJnZXQsIGV2ZW50LCBub3RTZXRUYXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDQpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YSA9IGFyZ3VtZW50c1syXSxcbiAgICAgICAgICAgICAgICAgICAgbm90U2V0VGFyZ2V0ID0gYXJndW1lbnRzWzNdID09PSB2b2lkIDAgPyBmYWxzZSA6IGFyZ3VtZW50c1szXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRUeXBlID0gZXZlbnQudHlwZTtcblxuICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKGV2ZW50VHlwZSAhPT0gRXZlbnRUeXBlLkNVU1RPTSwgZHlDYi5Mb2cuaW5mby5GVU5DX01VU1RfQkUoXCJldmVudCB0eXBlXCIsIFwiQ1VTVE9NXCIpKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihldmVudFR5cGUpXG4gICAgICAgICAgICAgICAgICAgIC50cmlnZ2VyKHRhcmdldCwgZXZlbnQsIHVzZXJEYXRhLCBub3RTZXRUYXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRyYW5zZmVyIGV2ZW50IHVwXG4gICAgICAgICAqIEBwYXJhbSB0YXJnZXRcbiAgICAgICAgICogQHBhcmFtIGV2ZW50T2JqZWN0XG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgZW1pdCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnRPYmplY3Q6RXZlbnQsIHVzZXJEYXRhPzphbnkpIHtcbiAgICAgICAgICAgIHZhciBpc1N0b3BQcm9wYWdhdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICBldmVudE9iamVjdC5waGFzZSA9IEV2ZW50UGhhc2UuRU1JVDtcbiAgICAgICAgICAgIGV2ZW50T2JqZWN0LnRhcmdldCA9IHRhcmdldDtcblxuICAgICAgICAgICAgZG97XG4gICAgICAgICAgICAgICAgaXNTdG9wUHJvcGFnYXRpb24gPSB0aGlzLl90cmlnZ2VyV2l0aFVzZXJEYXRhKHRhcmdldCwgZXZlbnRPYmplY3QuY29weSgpLCB1c2VyRGF0YSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZihpc1N0b3BQcm9wYWdhdGlvbil7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0aGlzLl9nZXRQYXJlbnQodGFyZ2V0KTtcbiAgICAgICAgICAgIH13aGlsZSh0YXJnZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRyYW5zZmVyIGV2ZW50IGRvd25cbiAgICAgICAgICogQHBhcmFtIHRhcmdldFxuICAgICAgICAgKiBAcGFyYW0gZXZlbnRPYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIHB1YmxpYyBicm9hZGNhc3QodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50T2JqZWN0OkV2ZW50LCB1c2VyRGF0YT86YW55KSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIGV2ZW50T2JqZWN0LnBoYXNlID0gRXZlbnRQaGFzZS5CUk9BRENBU1Q7XG4gICAgICAgICAgICBldmVudE9iamVjdC50YXJnZXQgPSB0YXJnZXQ7XG5cbiAgICAgICAgICAgIHRoaXMuX3RyaWdnZXJXaXRoVXNlckRhdGEodGFyZ2V0LCBldmVudE9iamVjdC5jb3B5KCksIHVzZXJEYXRhLCB0cnVlKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gaXRlcmF0b3Iob2JqOkdhbWVPYmplY3Qpe1xuICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbjpkeUNiLkNvbGxlY3Rpb248R2FtZU9iamVjdD4gPSBvYmouZ2V0Q2hpbGRyZW4oKTtcblxuICAgICAgICAgICAgICAgIGlmKGNoaWxkcmVuLmdldENvdW50KCkgPT09IDApe1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQ6R2FtZU9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl90cmlnZ2VyV2l0aFVzZXJEYXRhKGNoaWxkLCBldmVudE9iamVjdC5jb3B5KCksIHVzZXJEYXRhLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvcihjaGlsZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZXJhdG9yKHRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgIHByaXZhdGUgX2dldFBhcmVudCh0YXJnZXQ6R2FtZU9iamVjdCk6R2FtZU9iamVjdCB7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gdGFyZ2V0LmJ1YmJsZVBhcmVudDtcblxuICAgICAgICAgICAgcmV0dXJuIHBhcmVudCA/IHBhcmVudCA6IHRhcmdldC5wYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF90cmlnZ2VyV2l0aFVzZXJEYXRhKHRhcmdldCwgZXZlbnQsIHVzZXJEYXRhLCBub3RTZXRUYXJnZXQpe1xuICAgICAgICAgICAgcmV0dXJuIHVzZXJEYXRhID8gdGhpcy50cmlnZ2VyKHRhcmdldCwgZXZlbnQuY29weSgpLCB1c2VyRGF0YSwgbm90U2V0VGFyZ2V0KVxuICAgICAgICAgICAgICAgIDogdGhpcy50cmlnZ2VyKHRhcmdldCwgZXZlbnQsIG5vdFNldFRhcmdldCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vZGVmaW5pdGlvbnMuZC50c1wiLz5cbm1vZHVsZSBkeSB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBJRXZlbnRSZWdpc3RlckRhdGEge1xuICAgICAgICB0YXJnZXQ6R2FtZU9iamVjdCxcbiAgICAgICAgLy91c2VyJ3MgZXZlbnQgaGFuZGxlclxuICAgICAgICBoYW5kbGVyOkZ1bmN0aW9uLFxuICAgICAgICAvL3RoZSBhY3R1YWwgZXZlbnQgaGFuZGxlclxuICAgICAgICB3cmFwSGFuZGxlcjpGdW5jdGlvbixcbiAgICAgICAgcHJpb3JpdHk6bnVtYmVyXG4gICAgfVxuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50UmVnaXN0ZXIge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6RXZlbnRSZWdpc3RlciA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pbnN0YW5jZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcHJpdmF0ZSBfbGlzdGVuZXJNYXA6RXZlbnRMaXN0ZW5lck1hcCA9IEV2ZW50TGlzdGVuZXJNYXAuY3JlYXRlKCk7XG5cbiAgICAgICAgcHVibGljIHJlZ2lzdGVyKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uLCB3cmFwSGFuZGxlcjpGdW5jdGlvbiwgcHJpb3JpdHk6bnVtYmVyKSB7XG4gICAgICAgICAgICAvL3ZhciBpc0JpbmRFdmVudE9uVmlldyA9IGZhbHNlLFxuICAgICAgICAgICAgdmFyIGRhdGEgPSA8SUV2ZW50UmVnaXN0ZXJEYXRhPntcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgICAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgICAgICAgICAgICAgIHdyYXBIYW5kbGVyOiB3cmFwSGFuZGxlcixcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vZXZlbnROYW1lID0gPHN0cmluZz5ldmVudE5hbWU7XG4gICAgICAgICAgICAvLy8vcHJpb3JpdHkgc2V0IGluIGxpc3RlbmVyLCBub3QgaW4gdGhpcyhiaW5kZXIpIVxuICAgICAgICAgICAgLy9pZihwcmlvcml0eSl7XG4gICAgICAgICAgICAvLyAgICBsaXN0ZW5lci5zZXRQcmlvcml0eShwcmlvcml0eSk7XG4gICAgICAgICAgICAvL31cblxuXG4gICAgICAgICAgICAvL2lmICh0aGlzLmlzQmluZEV2ZW50T25WaWV3KGV2ZW50TmFtZSkpe1xuICAgICAgICAgICAgLy8gICAgaXNCaW5kRXZlbnRPblZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgLy8gICAgLy90aGlzLl9saXN0ZW5lck1hcC5hcHBlbmRDaGlsZCh0aGlzLl9idWlsZEtleSh0YXJnZXQudWlkLCBldmVudE5hbWUpLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy9lbHNlIHtcbiAgICAgICAgICAgIC8vICAgIGlzQmluZEV2ZW50T25WaWV3ID0gZmFsc2U7XG4gICAgICAgICAgICAvLyAgICAvL3RoaXMuX2xpc3RlbmVyTWFwLmFkZENoaWxkKGV2ZW50TmFtZSwgZGF0YSk7XG4gICAgICAgICAgICAvL31cblxuXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5hcHBlbmRDaGlsZChldmVudE5hbWUsIGRhdGEpO1xuXG5cbiAgICAgICAgICAgIC8vdGhpcy5fbGlzdGVuZXJMaXN0LmFkZENoaWxkKGxpc3RlbmVyLmV2ZW50VHlwZSwgIHtcbiAgICAgICAgICAgIC8vICAgIHRhcmdldDp0YXJnZXQsXG4gICAgICAgICAgICAvLyAgICBsaXN0ZW5lcjpsaXN0ZW5lclxuICAgICAgICAgICAgLy99KTtcblxuICAgICAgICAgICAgLy9yZXR1cm4gaXNCaW5kRXZlbnRPblZpZXc7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmVtb3ZlKGV2ZW50TmFtZTpFdmVudE5hbWUpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyByZW1vdmUoZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbik6dm9pZDtcbiAgICAgICAgcHVibGljIHJlbW92ZSh1aWQ6bnVtYmVyLCBldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgcmVtb3ZlKHRhcmdldDpHYW1lT2JqZWN0KTp2b2lkO1xuICAgICAgICBwdWJsaWMgcmVtb3ZlKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgcmVtb3ZlKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uKTp2b2lkO1xuXG4gICAgICAgIHB1YmxpYyByZW1vdmUoYXJncykge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBKdWRnZVV0aWxzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5yZW1vdmVDaGlsZChldmVudE5hbWUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgSnVkZ2VVdGlscy5pc0Z1bmN0aW9uKGFyZ3VtZW50c1sxXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5yZW1vdmVDaGlsZChldmVudE5hbWUsIGhhbmRsZXIpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgSnVkZ2VVdGlscy5pc051bWJlcihhcmd1bWVudHNbMF0pKXtcbiAgICAgICAgICAgICAgICBsZXQgdWlkID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5yZW1vdmVDaGlsZCh1aWQsIGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IGRhdGFMaXN0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgIGRhdGFMaXN0ID0gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0RXZlbnRPZmZEYXRhTGlzdCh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAucmVtb3ZlQ2hpbGQodGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUFmdGVyQWxsRXZlbnRIYW5kbGVyUmVtb3ZlZCh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFMaXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDMpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lck1hcC5yZW1vdmVDaGlsZC5hcHBseSh0aGlzLl9saXN0ZW5lck1hcCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLl9pc0FsbEV2ZW50SGFuZGxlclJlbW92ZWQodGFyZ2V0KSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hhbmRsZUFmdGVyQWxsRXZlbnRIYW5kbGVyUmVtb3ZlZCh0YXJnZXQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lck1hcC5nZXRFdmVudE9mZkRhdGFMaXN0KHRhcmdldCwgZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRFdmVudFJlZ2lzdGVyRGF0YUxpc3QoZXZlbnROYW1lOkV2ZW50TmFtZSk6YW55O1xuICAgICAgICBwdWJsaWMgZ2V0RXZlbnRSZWdpc3RlckRhdGFMaXN0KGN1cnJlbnRUYXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSk6YW55O1xuXG4gICAgICAgIHB1YmxpYyBnZXRFdmVudFJlZ2lzdGVyRGF0YUxpc3QoYXJncyl7XG4gICAgICAgICAgICB2YXIgcmVzdWx0OmR5Q2IuQ29sbGVjdGlvbjxJRXZlbnRSZWdpc3RlckRhdGE+ID0gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0Q2hpbGQuYXBwbHkodGhpcy5fbGlzdGVuZXJNYXAsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpLFxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZighcmVzdWx0KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5zb3J0KGZ1bmN0aW9uIChkYXRhQSwgZGF0YUIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGFCLnByaW9yaXR5IC0gZGF0YUEucHJpb3JpdHk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0QnViYmxlUGFyZW50KHRhcmdldDpHYW1lT2JqZWN0LCBwYXJlbnQ6R2FtZU9iamVjdCkge1xuICAgICAgICAgICAgdGFyZ2V0LmJ1YmJsZVBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpc0JpbmRlZCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmhhc0NoaWxkKHRhcmdldCwgZXZlbnROYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmaWx0ZXIoZnVuYzpGdW5jdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmZpbHRlcihmdW5jKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBmb3JFYWNoKGZ1bmM6RnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lck1hcC5mb3JFYWNoKGZ1bmMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGdldENoaWxkKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU/OkV2ZW50TmFtZSl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuZ2V0Q2hpbGQuYXBwbHkoXG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJNYXAsXG4gICAgICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRFdmVudE5hbWVGcm9tS2V5KGtleTpzdHJpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmdldEV2ZW50TmFtZUZyb21LZXkoa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRVaWRGcm9tS2V5KGtleTpzdHJpbmcpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyTWFwLmdldFVpZEZyb21LZXkoa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXRXcmFwSGFuZGxlcih0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSl7XG4gICAgICAgICAgICB2YXIgbGlzdDpkeUNiLkNvbGxlY3Rpb248SUV2ZW50T2ZmRGF0YT4gPSB0aGlzLmdldENoaWxkKHRhcmdldCwgZXZlbnROYW1lKTtcblxuICAgICAgICAgICAgaWYobGlzdCAmJiBsaXN0LmdldENvdW50KCkgPiAwKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5nZXRDaGlsZCgwKS53cmFwSGFuZGxlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBpc1RhcmdldChrZXk6c3RyaW5nLCB0YXJnZXQ6R2FtZU9iamVjdCwgbGlzdDpkeUNiLkNvbGxlY3Rpb248SUV2ZW50UmVnaXN0ZXJEYXRhPil7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJNYXAuaXNUYXJnZXQoa2V5LCB0YXJnZXQsIGxpc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wdWJsaWMgY29weSgpe1xuICAgICAgICAvL1xuICAgICAgICAvL31cblxuICAgICAgICAvL3ByaXZhdGUgX2lzQ29udGFpbihwYXJlbnRUYXJnZXQ6R2FtZU9iamVjdCwgY2hpbGRUYXJnZXQ6R2FtZU9iamVjdCl7XG4gICAgICAgIC8vICAgIHZhciBwYXJlbnQgPSBudWxsO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICBwYXJlbnQgPSBjaGlsZFRhcmdldC5wYXJlbnQ7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHdoaWxlKHBhcmVudCl7XG4gICAgICAgIC8vICAgICAgICBpZihKdWRnZVV0aWxzLmlzRXF1YWwocGFyZW50LCBwYXJlbnRUYXJnZXQpKXtcbiAgICAgICAgLy8gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgLy8gICAgICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICAgIHBhcmVudCA9IGNoaWxkVGFyZ2V0LnBhcmVudDtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vfVxuXG5cbiAgICAgICAgLy9wcml2YXRlIF9yZW1vdmVGcm9tTWFwKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lKSB7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHByaXZhdGUgX2lzQWxsRXZlbnRIYW5kbGVyUmVtb3ZlZCh0YXJnZXQ6R2FtZU9iamVjdCl7XG4gICAgICAgICAgICByZXR1cm4gIXRoaXMuX2xpc3RlbmVyTWFwLmhhc0NoaWxkKChsaXN0OmR5Q2IuQ29sbGVjdGlvbjxJRXZlbnRSZWdpc3RlckRhdGE+LCBrZXk6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleS5pbmRleE9mKFN0cmluZyh0YXJnZXQudWlkKSkgPiAtMSAmJiBsaXN0ICE9PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2hhbmRsZUFmdGVyQWxsRXZlbnRIYW5kbGVyUmVtb3ZlZCh0YXJnZXQ6R2FtZU9iamVjdCl7XG4gICAgICAgICAgICB0aGlzLnNldEJ1YmJsZVBhcmVudCh0YXJnZXQsIG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wcml2YXRlIF9idWlsZEtleSh1aWQsIGV2ZW50TmFtZSl7XG4gICAgICAgIC8vICAgIHJldHVybiBTdHJpbmcodWlkKSArIFwiX1wiICsgZXZlbnROYW1lO1xuICAgICAgICAvL31cbiAgICB9XG59IiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHkge1xuICAgIC8vcmVzcG9uc2liaWx0eTpvbiwgb2ZmIGV2ZW50KG1hbmFnZSBsaXN0KVxuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50QmluZGVyIHtcbiAgICAgICAgcHVibGljIHN0YXRpYyBjcmVhdGUoKSB7XG4gICAgICAgICAgICB2YXIgb2JqID0gbmV3IHRoaXMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcHJpdmF0ZSBfbGlzdGVuZXJMaXN0OkV2ZW50TGlzdGVuZXIgPSBFdmVudExpc3RlbmVyLmNyZWF0ZSgpO1xuICAgICAgICAvL3ByaXZhdGUgX2V2ZW50UmVnaXN0ZXI6RXZlbnRSZWdpc3RlciA9IG51bGw7XG5cbiAgICAgICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICAvL0V2ZW50UmVnaXN0ZXIuZ2V0SW5zdGFuY2UoKSA9IGV2ZW50UmVnaXN0ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb24oZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbiwgcHJpb3JpdHk6bnVtYmVyKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb24obGlzdGVuZXI6e318RXZlbnRMaXN0ZW5lcik6dm9pZDtcbiAgICAgICAgcHVibGljIG9uKHRhcmdldDpHYW1lT2JqZWN0LCBsaXN0ZW5lcjp7fXxFdmVudExpc3RlbmVyKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb24odGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24sIHByaW9yaXR5Om51bWJlcik6dm9pZDtcblxuICAgICAgICBwdWJsaWMgb24oYXJncykge1xuICAgICAgICAgICAgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSl7XG4gICAgICAgICAgICAgICAgbGV0IGxpc3RlbmVyOkV2ZW50TGlzdGVuZXIgPSAhKGFyZ3VtZW50c1swXSBpbnN0YW5jZW9mIEV2ZW50TGlzdGVuZXIpID8gIEV2ZW50TGlzdGVuZXIuY3JlYXRlKGFyZ3VtZW50c1swXSk6IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmhhbmRsZXJEYXRhTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyRGF0YTpJRXZlbnRIYW5kbGVyRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihsaXN0ZW5lci5ldmVudFR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oaGFuZGxlckRhdGEuZXZlbnROYW1lLCBoYW5kbGVyRGF0YS5oYW5kbGVyLCBsaXN0ZW5lci5wcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOkV2ZW50TGlzdGVuZXIgPSAhKGFyZ3VtZW50c1sxXSBpbnN0YW5jZW9mIEV2ZW50TGlzdGVuZXIpID8gIEV2ZW50TGlzdGVuZXIuY3JlYXRlKGFyZ3VtZW50c1sxXSk6IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmhhbmRsZXJEYXRhTGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyRGF0YTpJRXZlbnRIYW5kbGVyRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihsaXN0ZW5lci5ldmVudFR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAub24odGFyZ2V0LCBoYW5kbGVyRGF0YS5ldmVudE5hbWUsIGhhbmRsZXJEYXRhLmhhbmRsZXIsIGxpc3RlbmVyLnByaW9yaXR5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyl7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHkgPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgICAgICBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihFdmVudFRhYmxlLmdldEV2ZW50VHlwZShldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAub24oZXZlbnROYW1lLCBoYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMl0sXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gYXJndW1lbnRzWzNdO1xuXG4gICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoRXZlbnRUYWJsZS5nZXRFdmVudFR5cGUoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgLm9uKHRhcmdldCwgZXZlbnROYW1lLCBoYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb2ZmKCk6dm9pZDtcbiAgICAgICAgcHVibGljIG9mZihldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgb2ZmKGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvZmYodGFyZ2V0OkdhbWVPYmplY3QpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvZmYodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBvZmYodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG5cbiAgICAgICAgcHVibGljIG9mZigpIHtcbiAgICAgICAgICAgIHZhciBldmVudFJlZ2lzdGVyID0gRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpLFxuICAgICAgICAgICAgICAgIGFyZ0FyciA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG5cbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgICAgIGV2ZW50UmVnaXN0ZXIuZm9yRWFjaCgobGlzdDpkeUNiLkNvbGxlY3Rpb248SUV2ZW50SGFuZGxlckRhdGE+LCBrZXk6c3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBldmVudFJlZ2lzdGVyLmdldEV2ZW50TmFtZUZyb21LZXkoa2V5KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFVpZCA9IGV2ZW50UmVnaXN0ZXIuZ2V0VWlkRnJvbUtleShrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKCF0YXJnZXRVaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoRXZlbnRUYWJsZS5nZXRFdmVudFR5cGUoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAub2ZmKGV2ZW50TmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKEV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAub2ZmKHRhcmdldFVpZCwgZXZlbnROYW1lKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBKdWRnZVV0aWxzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihFdmVudFRhYmxlLmdldEV2ZW50VHlwZShldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAub2ZmKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgSnVkZ2VVdGlscy5pc0Z1bmN0aW9uKGFyZ3VtZW50c1sxXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMV07XG5cbiAgICAgICAgICAgICAgICBGYWN0b3J5RXZlbnRIYW5kbGVyLmNyZWF0ZUV2ZW50SGFuZGxlcihFdmVudFRhYmxlLmdldEV2ZW50VHlwZShldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgICAgICAub2ZmKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF07XG5cbiAgICAgICAgICAgICAgICBldmVudFJlZ2lzdGVyLmZvckVhY2goKGxpc3Q6ZHlDYi5Db2xsZWN0aW9uPElFdmVudFJlZ2lzdGVyRGF0YT4sIGtleTpzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9IGV2ZW50UmVnaXN0ZXIuZ2V0RXZlbnROYW1lRnJvbUtleShrZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGV2ZW50UmVnaXN0ZXIuaXNUYXJnZXQoa2V5LCB0YXJnZXQsIGxpc3QpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKEV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLm9mZih0YXJnZXQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMil7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgRmFjdG9yeUV2ZW50SGFuZGxlci5jcmVhdGVFdmVudEhhbmRsZXIoRXZlbnRUYWJsZS5nZXRFdmVudFR5cGUoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgLm9mZih0YXJnZXQsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpe1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9IGFyZ3VtZW50c1sxXSxcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgICAgICAgIEZhY3RvcnlFdmVudEhhbmRsZXIuY3JlYXRlRXZlbnRIYW5kbGVyKEV2ZW50VGFibGUuZ2V0RXZlbnRUeXBlKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIC5vZmYodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2RlZmluaXRpb25zLmQudHNcIi8+XG5tb2R1bGUgZHl7XG4gICAgZXhwb3J0IGNsYXNzIEZhY3RvcnlFdmVudEhhbmRsZXJ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlRXZlbnRIYW5kbGVyKGV2ZW50VHlwZTpFdmVudFR5cGUpe1xuICAgICAgICAgICAgbGV0IGhhbmRsZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50VHlwZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuTU9VU0U6XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBNb3VzZUV2ZW50SGFuZGxlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5LRVlCT0FSRDpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IEtleWJvYXJkRXZlbnRIYW5kbGVyLmdldEluc3RhbmNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLkNVU1RPTTpcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlciA9IEN1c3RvbUV2ZW50SGFuZGxlci5nZXRJbnN0YW5jZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAvL3RvZG8gbW9yZSB0eXBlXG4gICAgICAgICAgICAgICAgZGVmYXVsdCA6XG4gICAgICAgICAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19JTlZBTElEKFwiZXZlbnRUeXBlXCIpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVyO1xuICAgICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vcHVibGljIHN0YXRpYyBjcmVhdGVFdmVudChldmVudFR5cGU6RXZlbnRUeXBlLCBldmVudE5hbWU6RXZlbnROYW1lLCBwaGFzZTpFdmVudFBoYXNlPUV2ZW50UGhhc2UuRU1JVCl7XG4gICAgICAgIC8vICAgIHZhciBldmVudE9iaiA9IG51bGw7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHN3aXRjaCAoZXZlbnRUeXBlKXtcbiAgICAgICAgLy8gICAgICAgIGNhc2UgRXZlbnRUeXBlLk1PVVNFOlxuICAgICAgICAvLyAgICAgICAgICAgIGV2ZW50T2JqID0gTW91c2VFdmVudC5jcmVhdGUobnVsbCwgZXZlbnROYW1lKTtcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgICAgIC8vdG9kbyBtb3JlIHR5cGVcbiAgICAgICAgLy8gICAgICAgIGRlZmF1bHQgOlxuICAgICAgICAvLyAgICAgICAgICAgIGR5Q2IuTG9nLmVycm9yKHRydWUsIGR5Q2IuTG9nLmluZm8uRlVOQ19JTlZBTElEKFwiZXZlbnRUeXBlXCIpKTtcbiAgICAgICAgLy8gICAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvL1xuICAgICAgICAvLyAgICBldmVudE9iai5waGFzZSA9IHBoYXNlO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICByZXR1cm4gZXZlbnRPYmo7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgX2NyZWF0ZUFsbEV2ZW50SGFuZGxlcnMoKXtcbiAgICAgICAgLy8gICAgIHJldHVybiBkeUNiLkNvbGxlY3Rpb24uY3JlYXRlKFtNb3VzZUV2ZW50SGFuZGxlci5nZXRJbnN0YW5jZSgpXSk7XG4gICAgICAgIC8vfVxuICAgIH1cbn1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9kZWZpbml0aW9ucy5kLnRzXCIvPlxubW9kdWxlIGR5IHtcbi8vICAgIC8qIVxuLy8gICAgIGl0IGlzIGRlc2lnbmVkIGFzIHNpbmdsZXRvbiwgbm90IHN0YXRpYyBjbGFzcywgYmVjYXVzZSBpdCBuZWVkIG1haW50YWluIHN0YXRlKF9pbnN0YW5jZSBhdHRyaSkuXG4vL1xuLy9cbi8vICAgICAxPuS7gOS5iOaXtuWAmeS9v+eUqOmdmeaAgeexu+S7o+abv3NpbmdsZXRvbiA6XG4vLyAgICAg6L+Z6YeM5pyJ5Yeg5Liq5b6I5aW955qE6Z2Z5oCB57G75q+Uc2luZ2xldG9u5pu05aW955qE5bqU55So5Zy65pmvLiDmnIDln7rmnKznmoTkvovlrZDlsLHmmK/lnKhKYXZh5Lit55qEamF2YS5sYW5nLk1hdGjnsbvnmoTlrp7njrDmlrnlvI8sIE1hdGjnsbvlsLHmmK/nlKjov4fpnZnmgIHmlrnms5XmnaXlrp7njrDnmoQs6ICM5LiN5piv5Y2V5L6L5p2l5a6e546w55qELlxuLy8gICAgIOaAu+e7kyA6XG4vLyAgICAg5aaC5p6c5L2g55qEc2luZ2xldG9u5LiN5o+Q57u05oyB5Lu75L2V54q25oCBLCDku4Xku4XmmK/mj5DkvpvlhajlsYDnmoTorr/pl64gLCDov5nkuKrml7blgJnlsLHpgILlkIjnlKjpnZnmgIHnsbsgLCDov5nmoLfpgJ/luqbkuZ/mm7Tlv6ssIOWboOS4unN0YXRpYyBiaW5k5Zyo57yW6K+R5pyf6Ze0KGNvbXBpbGUgZHVyaW5nKSAuIOiusOS9j+S4jee7j+aEj+e7tOaMgeWtkOexu+eahOeKtuaAgSAsIOWwpOWFtuaYr+WcqOW5tuWPkeeahOaDheWGteS4iywg5aSa5Liq57q/56iL5bm25Y+R5L+u5pS5LOi/meWuueaYk+WvvOiHtOS4jeWuueaYk+WPkeeOsOeahHJhY2UgY29uZGl0aW9uIOWFs+S6jnJhY2UgY29uZGl0aW9uIC5cbi8vXG4vLyAgICAg6Z2Z5oCB57G76YCC55So5LqO5LiA5Lqb5bel5YW357G7ICwg5YW25LuW55qE5aaC5Y2V5Liq6K6/6Zeu6LWE5rqQ5bCx5Y+v5Lul55Soc2luZ2xldG9uLlxuLy8gICAgIDI+6Z2Z5oCB57G75ZKMc2luZ2xldG9u5LmL6Ze055qE5Yy65YirIDpcbi8vICAgICDikaAgc3RhdGlj57G75pyJ5pu05aW955qE6K6/6Zeu5pWI546HKFN0YXRpYyBjbGFzcyBwcm92aWRlcyBiZXR0ZXIgcGVyZm9ybWFuY2UgdGhhbiBTaW5nbGV0b24gcGF0dGVybiwgYmVjYXVzZSBzdGF0aWMgbWV0aG9kcyBhcmUgYm9uZGVkIG9uIGNvbXBpbGUgdGltZSlcbi8vICAgICDikaIgc2luZ2xldG9u5q+Uc3RhdGljIGNsYXNz5pu05a655piT5rWL6K+VLiDpgqPkuKrlrrnmmJPmqKHmi58obW9jayksIOWTquS4quWwseWuueaYk+a1i+ivlS4gc2luZ2xldG9u5b6I5a655piT55SoSlVuaXTmtYvor5UsIOWboOS4uuS9oOiDveWkn+S8oOmAkm1vY2vlr7nosaEsIOW9k3NpbmdsZXRvbumcgOimgeeahOaXtuWAmSjkvZzkuLrmlrnms5Xlj4LmlbDmiJbogIXmnoTpgKDlh73mlbDlj4LmlbApLFxuLy8gICAgIOKRoyDlpoLmnpzkvaDnmoTpnIDmsYLmmK/nu7TmiqQobWFpbnRhaW4p54q25oCBLCDpgqPkuYhzaW5nbGV0b27mr5RzdGF0aWMgY2xhc3Pmm7Tlpb0gLCDlpoLmnpzkvb/nlKhzdGF0aWMgY2xhc3PkvJrlh7rnjrDkuIDkupvpl67popguXG4vLyAgICAg4pGkIHNpbmdsZXRvbuaUr+aMgeW7tui/n+WKoOi9vSAsIOiAjHN0YXRpYyBjbGFzcyDliJnkuI3mlK/mjIHov5nmoLfnmoTnibnmgKcgLCDlnKjph43ph4/nuqfnmoTlr7nosaEsIOW7tui/n+WKoOi9veWwseaYvuW+l+mdnuW4uOmHjeimgS5cbi8vICAgICDikaUg5Zyo5LiA5Lqb5L6d6LWW5rOo5YWlKERlcGVuZGVuY3kgaW5qZWN0aW9uIGZyYW1ld29yaynnmoTmoYbmnrYgLCDlroPog73lpJ/lvojlpb3nmoTnrqHnkIZzaW5nbGV0b27lr7nosaEgLiDkvovlpoJTcHJpbmcuXG4vL1xuLy8gICAgIDM+c2luZ2xldG9u55u45a+55LqO6Z2Z5oCB57G755qE5LiA5Lqb6auY57qn54m554K5IDpcbi8vICAgICBzaW5nbGV0b24g5a+55LqOc3RhdGljIGNsYXNzIOS4u+imgeeahOS8mOeCueaYr+abtOWKoOmdouWQkeWvueixoSAuIOWvueS6jnNpbmdsZXRvbuS9oOWPr+S7peS9v+eUqOe7p+aJvyhJbmhlcml0YW5jZSnlkozlpJrmgIEocG9seW1vcnBoaXNtKeadpee7p+aJv+S4gOS4quWfuuexuywg5a6e546w5LiA5Liq5o6l5Y+jLCDmj5DkvpvkuI3lkIzlip/og70g55qE5a6e546wLiDkvovlpoIgLCBKYXZh5LitamF2YS5sYW5nLlJ1bnRpbWUgLOivpeexu+WwseaYr+S4gOS4qnNpbmdsZXRvbueahCwg6LCD55SoZ2V0UnVudGltZSgpLOWfuuS6juS4jeWQjOeahEpWTSAs6L+U5Zue5LiN5ZCM55qE5a6e546w5a+56LGhLCDpkojlr7nkuIDkuKrkuIDkuKpKVk0s56Gu5L+d5Y+q5pyJ5LiA5LiqUnVudGltZeWvueixoSAsIOWmguaenOS9v+eUqHN0YXRpYyBjbGFzc+WwseS4jeiDveW+iOWlveeahOadpeWunueOsOi/meagt+eahOWKn+iDveS6hiAuXG4vLyAgICAg5qyi6L+O6L2s6L29IOi9rOi9veivt+azqOaYjuWHuuWkhCA6IGh0dHA6Ly9ibG9nLmNzZG4ubmV0L2pvaG5ueTkwMTExNC9hcnRpY2xlL2RldGFpbHMvMTE5NjkwMTVcbi8vICAgICAqL1xuLy9cblxuICAgIC8vLy9zaW5nbGV0b24gY2xhc3NcbiAgICAvL3N0YXRpYyBjbGFzc1xuXG4gICAgZXhwb3J0IGNsYXNzIEV2ZW50TWFuYWdlciB7XG4gICAgICAgIC8vcHJpdmF0ZSBzdGF0aWMgc3RhdGljIF9pbnN0YW5jZTpFdmVudE1hbmFnZXIgPSBudWxsO1xuICAgICAgICAvL1xuICAgICAgICAvL3B1YmxpYyBzdGF0aWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xuICAgICAgICAvLyAgICBpZiAodGhpcy5faW5zdGFuY2UgPT09IG51bGwpIHtcbiAgICAgICAgLy8gICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IHRoaXMoKTtcbiAgICAgICAgLy8gICAgICAgIC8vdGhpcy5faW5zdGFuY2UuaW5pdFdoZW5DcmVhdGUoKTtcbiAgICAgICAgLy8gICAgfVxuICAgICAgICAvLyAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gICAgICAgIC8vfVxuXG4gICAgICAgIHByaXZhdGUgc3RhdGljIF9ldmVudEJpbmRlcjpFdmVudEJpbmRlciA9IEV2ZW50QmluZGVyLmNyZWF0ZSgpO1xuICAgICAgICBwcml2YXRlIHN0YXRpYyBfZXZlbnREaXNwYXRjaGVyOkV2ZW50RGlzcGF0Y2hlciA9IEV2ZW50RGlzcGF0Y2hlci5jcmVhdGUoKTtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uKGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24oZXZlbnROYW1lOkV2ZW50TmFtZSwgaGFuZGxlcjpGdW5jdGlvbiwgcHJpb3JpdHk6bnVtYmVyKTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIG9uKGxpc3RlbmVyOnt9fEV2ZW50TGlzdGVuZXIpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24odGFyZ2V0OkdhbWVPYmplY3QsIGxpc3RlbmVyOnt9fEV2ZW50TGlzdGVuZXIpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24odGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24pOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb24odGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUsIGhhbmRsZXI6RnVuY3Rpb24sIHByaW9yaXR5Om51bWJlcik6dm9pZDtcblxuICAgICAgICBwdWJsaWMgc3RhdGljIG9uKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgICAgIGxldCBsaXN0ZW5lciA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50QmluZGVyLm9uKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiBKdWRnZVV0aWxzLmlzU3RyaW5nKGFyZ3VtZW50c1swXSkgJiYgSnVkZ2VVdGlscy5pc0Z1bmN0aW9uKGFyZ3VtZW50c1sxXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gMTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50QmluZGVyLm9uKGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAyKXtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50QmluZGVyLm9uKHRhcmdldCwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZihhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIEp1ZGdlVXRpbHMuaXNTdHJpbmcoYXJndW1lbnRzWzBdKSAmJiBKdWRnZVV0aWxzLmlzRnVuY3Rpb24oYXJndW1lbnRzWzFdKSAmJiBKdWRnZVV0aWxzLmlzTnVtYmVyKGFyZ3VtZW50c1syXSkpe1xuICAgICAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRCaW5kZXIub24oZXZlbnROYW1lLCBoYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gNCl7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyID0gYXJndW1lbnRzWzJdLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9IGFyZ3VtZW50c1szXSA9PT0gdW5kZWZpbmVkPyAxIDphcmd1bWVudHNbM107XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEJpbmRlci5vbih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBvZmYoKTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIG9mZihldmVudE5hbWU6RXZlbnROYW1lKTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIG9mZihldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uKTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIG9mZih0YXJnZXQ6R2FtZU9iamVjdCk6dm9pZDtcbiAgICAgICAgcHVibGljIHN0YXRpYyBvZmYodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50TmFtZTpFdmVudE5hbWUpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2ZmKHRhcmdldDpHYW1lT2JqZWN0LCBldmVudE5hbWU6RXZlbnROYW1lLCBoYW5kbGVyOkZ1bmN0aW9uKTp2b2lkO1xuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgb2ZmKCkge1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRCaW5kZXIub2ZmLmFwcGx5KFxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50QmluZGVyLFxuICAgICAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIHRyaWdnZXIoZXZlbnQ6RXZlbnQpOnZvaWQ7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdHJpZ2dlcihldmVudDpFdmVudCwgdXNlckRhdGE6YW55KTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50KTp2b2lkO1xuICAgICAgICBwdWJsaWMgc3RhdGljIHRyaWdnZXIodGFyZ2V0OkdhbWVPYmplY3QsIGV2ZW50OkV2ZW50LCB1c2VyRGF0YTphbnkpOnZvaWQ7XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyB0cmlnZ2VyKGFyZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlci50cmlnZ2VyLmFwcGx5KHRoaXMuX2V2ZW50RGlzcGF0Y2hlciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIGJyb2FkY2FzdCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIHVzZXJEYXRhPzphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5icm9hZGNhc3QuYXBwbHkodGhpcy5fZXZlbnREaXNwYXRjaGVyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZW1pdCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnQ6RXZlbnQsIHVzZXJEYXRhPzphbnkpIHtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5lbWl0LmFwcGx5KHRoaXMuX2V2ZW50RGlzcGF0Y2hlciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIGZyb21FdmVudChldmVudE5hbWU6RXZlbnROYW1lKTpkeVJ0LkZyb21FdmVudFBhdHRlcm5TdHJlYW07XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZnJvbUV2ZW50KGV2ZW50TmFtZTpFdmVudE5hbWUsIHByaW9yaXR5Om51bWJlcik6ZHlSdC5Gcm9tRXZlbnRQYXR0ZXJuU3RyZWFtO1xuICAgICAgICBwdWJsaWMgc3RhdGljIGZyb21FdmVudCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSk6ZHlSdC5Gcm9tRXZlbnRQYXR0ZXJuU3RyZWFtO1xuICAgICAgICBwdWJsaWMgc3RhdGljIGZyb21FdmVudCh0YXJnZXQ6R2FtZU9iamVjdCwgZXZlbnROYW1lOkV2ZW50TmFtZSwgcHJpb3JpdHk6bnVtYmVyKTpkeVJ0LkZyb21FdmVudFBhdHRlcm5TdHJlYW07XG5cbiAgICAgICAgcHVibGljIHN0YXRpYyBmcm9tRXZlbnQoYXJncyk6YW55IHtcbiAgICAgICAgICAgIHZhciBhZGRIYW5kbGVyID0gbnVsbCxcbiAgICAgICAgICAgICAgICByZW1vdmVIYW5kbGVyID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdO1xuXG4gICAgICAgICAgICAgICAgYWRkSGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vbihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vZmYoZXZlbnROYW1lLCBoYW5kbGVyKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiBKdWRnZVV0aWxzLmlzTnVtYmVyKGFyZ3VtZW50c1sxXSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBwcmlvcml0eSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICAgICAgICAgIGFkZEhhbmRsZXIgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICBFdmVudE1hbmFnZXIub24oZXZlbnROYW1lLCBoYW5kbGVyLCBwcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLm9mZihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldCA9IGFyZ3VtZW50c1swXSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gYXJndW1lbnRzWzFdO1xuXG4gICAgICAgICAgICAgICAgYWRkSGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vbih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZW1vdmVIYW5kbGVyID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgRXZlbnRNYW5hZ2VyLm9mZih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gYXJndW1lbnRzWzBdLFxuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSBhcmd1bWVudHNbMV0sXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5ID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgICAgICAgICAgYWRkSGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vbih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlciwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWFuYWdlci5vZmYodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkeVJ0LmZyb21FdmVudFBhdHRlcm4oYWRkSGFuZGxlciwgcmVtb3ZlSGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3RhdGljIHNldEJ1YmJsZVBhcmVudCh0YXJnZXQ6R2FtZU9iamVjdCwgcGFyZW50OmFueSkge1xuICAgICAgICAgICAgRXZlbnRSZWdpc3Rlci5nZXRJbnN0YW5jZSgpLnNldEJ1YmJsZVBhcmVudCh0YXJnZXQsIHBhcmVudCk7XG4gICAgICAgICAgICAvL3RoaXMuX2V2ZW50RGlzcGF0Y2hlci5zZXRCdWJibGVQYXJlbnQodGFyZ2V0LCBwYXJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9wdWJsaWMgc3RhdGljIHJlbW92ZSh0YXJnZXQ6R2FtZU9iamVjdCkge1xuICAgICAgICAvLyAgICB0aGlzLl9ldmVudEJpbmRlci5yZW1vdmUodGFyZ2V0KTtcbiAgICAgICAgLy99XG5cbiAgICAgICAgLy90b2RvIGFkZCBnZXRMaXN0ZW5lckNvdW50KHRhcmdldCwgdHlwZSkgbWV0aG9kXG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9