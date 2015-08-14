/// <reference path="../../../definitions.d.ts"/>
module dy {
    declare var window;

    export class Tween extends ActionInterval {
        public static Easing = {
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

                    return k * ( 2 - k );

                },

                InOut: function (k) {

                    if (( k *= 2 ) < 1) return 0.5 * k * k;
                    return -0.5 * ( --k * ( k - 2 ) - 1 );

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

                    if (( k *= 2 ) < 1) return 0.5 * k * k * k;
                    return 0.5 * ( ( k -= 2 ) * k * k + 2 );

                }

            },

            Quartic: {

                In: function (k) {

                    return k * k * k * k;

                },

                Out: function (k) {

                    return 1 - ( --k * k * k * k );

                },

                InOut: function (k) {

                    if (( k *= 2 ) < 1) return 0.5 * k * k * k * k;
                    return -0.5 * ( ( k -= 2 ) * k * k * k - 2 );

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

                    if (( k *= 2 ) < 1) return 0.5 * k * k * k * k * k;
                    return 0.5 * ( ( k -= 2 ) * k * k * k * k + 2 );

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

                    return 0.5 * ( 1 - Math.cos(Math.PI * k) );

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

                    if (k === 0) return 0;
                    if (k === 1) return 1;
                    if (( k *= 2 ) < 1) return 0.5 * Math.pow(1024, k - 1);
                    return 0.5 * ( -Math.pow(2, -10 * ( k - 1 )) + 2 );

                }

            },

            Circular: {

                In: function (k) {

                    return 1 - Math.sqrt(1 - k * k);

                },

                Out: function (k) {

                    return Math.sqrt(1 - ( --k * k ));

                },

                InOut: function (k) {

                    if (( k *= 2 ) < 1) return -0.5 * ( Math.sqrt(1 - k * k) - 1);
                    return 0.5 * ( Math.sqrt(1 - ( k -= 2) * k) + 1);

                }

            },

            Elastic: {

                In: function (k) {

                    var s, a = 0.1, p = 0.4;
                    if (k === 0) return 0;
                    if (k === 1) return 1;
                    if (!a || a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else s = p * Math.asin(1 / a) / ( 2 * Math.PI );
                    return -( a * Math.pow(2, 10 * ( k -= 1 )) * Math.sin(( k - s ) * ( 2 * Math.PI ) / p) );

                },

                Out: function (k) {

                    var s, a = 0.1, p = 0.4;
                    if (k === 0) return 0;
                    if (k === 1) return 1;
                    if (!a || a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else s = p * Math.asin(1 / a) / ( 2 * Math.PI );
                    return ( a * Math.pow(2, -10 * k) * Math.sin(( k - s ) * ( 2 * Math.PI ) / p) + 1 );

                },

                InOut: function (k) {

                    var s, a = 0.1, p = 0.4;
                    if (k === 0) return 0;
                    if (k === 1) return 1;
                    if (!a || a < 1) {
                        a = 1;
                        s = p / 4;
                    }
                    else s = p * Math.asin(1 / a) / ( 2 * Math.PI );
                    if (( k *= 2 ) < 1) return -0.5 * ( a * Math.pow(2, 10 * ( k -= 1 )) * Math.sin(( k - s ) * ( 2 * Math.PI ) / p) );
                    return a * Math.pow(2, -10 * ( k -= 1 )) * Math.sin(( k - s ) * ( 2 * Math.PI ) / p) * 0.5 + 1;

                }

            },

            Back: {

                In: function (k) {

                    var s = 1.70158;
                    return k * k * ( ( s + 1 ) * k - s );

                },

                Out: function (k) {

                    var s = 1.70158;
                    return --k * k * ( ( s + 1 ) * k + s ) + 1;

                },

                InOut: function (k) {

                    var s = 1.70158 * 1.525;
                    if (( k *= 2 ) < 1) return 0.5 * ( k * k * ( ( s + 1 ) * k - s ) );
                    return 0.5 * ( ( k -= 2 ) * k * ( ( s + 1 ) * k + s ) + 2 );

                }

            },

            Bounce: {

                In: function (k) {

                    return 1 - Tween.Easing.Bounce.Out(1 - k);

                },

                Out: function (k) {

                    if (k < ( 1 / 2.75 )) {

                        return 7.5625 * k * k;

                    } else if (k < ( 2 / 2.75 )) {

                        return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;

                    } else if (k < ( 2.5 / 2.75 )) {

                        return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;

                    } else {

                        return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;

                    }

                },

                InOut: function (k) {

                    if (k < 0.5) return Tween.Easing.Bounce.In(k * 2) * 0.5;
                    return Tween.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

                }

            }

        };

        public static Interpolation = {
            Linear: function (v, k) {

                var m = v.length - 1, f = m * k, i = Math.floor(f), fn = Tween.Interpolation.Utils.Linear;

                if (k < 0) return fn(v[0], v[1], f);
                if (k > 1) return fn(v[m], v[m - 1], m - f);

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

                    if (k < 0) i = Math.floor(f = m * ( 1 + k ));

                    return fn(v[( i - 1 + m ) % m], v[i], v[( i + 1 ) % m], v[( i + 2 ) % m], f - i);

                } else {

                    if (k < 0) return v[0] - ( fn(v[0], v[0], v[1], v[1], -f) - v[0] );
                    if (k > 1) return v[m] - ( fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m] );

                    return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

                }

            },

            Utils: {

                Linear: function (p0, p1, t) {

                    return ( p1 - p0 ) * t + p0;

                },

                Bernstein: function (n, i) {

                    var fc = Tween.Interpolation.Utils.Factorial;
                    return fc(n) / fc(i) / fc(n - i);

                },

                Factorial: (function () {

                    var a = [1];

                    return function (n) {

                        var s = 1, i;
                        if (a[n]) return a[n];
                        for (i = n; i > 1; i--) s *= i;
                        return a[n] = s;

                    };

                })(),

                CatmullRom: function (p0, p1, p2, p3, t) {

                    var v0 = ( p2 - p0 ) * 0.5, v1 = ( p3 - p1 ) * 0.5, t2 = t * t, t3 = t * t2;
                    return ( 2 * p1 - 2 * p2 + v0 + v1 ) * t3 + ( -3 * p1 + 3 * p2 - 2 * v0 - v1 ) * t2 + v0 * t + p1;

                }

            }

        };

        public static create() {
            var obj = new this();

            return obj;
        }

        private _object:dyCb.Hash<any> = null;
        private _valuesStart:dyCb.Hash<any> = dyCb.Hash.create<any>();
        private _valuesEnd:dyCb.Hash<any> = dyCb.Hash.create<any>();
        private _duration = null;
        private _startTime = null;
        private _easingFunction = Tween.Easing.Linear.None;
        private _interpolationFunction = Tween.Interpolation.Linear;
        private _onStartCallback = null;
        private _onStartCallbackFired = false;
        private _onUpdateCallback = null;
        private _onFinishCallback = null;
        private _onStopCallback = null;

        public update(time:number) {
            var self = this,
                elapsed = null,
                easeValue = null;

            if (time < this._startTime) {
                return true;
            }

            if (this._onStartCallbackFired === false) {

                if (this._onStartCallback !== null) {

                    this._onStartCallback.call(this._object.getChildren());

                }

                this._onStartCallbackFired = true;

            }

            elapsed = ( time - this._startTime ) / this._duration;
            elapsed = elapsed > 1 ? 1 : elapsed;

            easeValue = this._easingFunction(elapsed);

            this._valuesEnd.forEach((value:any, key:string) => {
                var start = self._valuesStart.getChild(key),
                    end = value;

                if (end instanceof Array) {
                    self._object.setValue(key, self._interpolationFunction(end, easeValue));
                }
                else {
                    // Parses relative end values with start as base (e.g.: +10, -3)
                    if (JudgeUtils.isString(end)) {
                        end = start + window.parseFloat(end, 10);
                    }

                    // protect against non numeric properties.
                    if (JudgeUtils.isNumber(end)) {
                        self._object.setValue(key, start + ( end - start ) * easeValue);
                    }
                }
            });


            if ( this._onUpdateCallback !== null ) {
                this._onUpdateCallback.call(this._object.getChildren(), easeValue);
            }

            if (this._isFinish(elapsed)) {

                //if ( _repeat > 0 ) {
                //
                //if( isFinite( _repeat ) ) {
                //	_repeat--;
                //}
                //
                //// reassign starting values, restart by making startTime = now
                //for( property in _valuesStartRepeat ) {
                //
                //	if ( typeof( _valuesEnd[ property ] ) === "string" ) {
                //		_valuesStartRepeat[ property ] = _valuesStartRepeat[ property ] + parseFloat(_valuesEnd[ property ], 10);
                //	}
                //
                //	if (_yoyo) {
                //		var tmp = _valuesStartRepeat[ property ];
                //		_valuesStartRepeat[ property ] = _valuesEnd[ property ];
                //		_valuesEnd[ property ] = tmp;
                //	}
                //
                //	_valuesStart[ property ] = _valuesStartRepeat[ property ];
                //
                //}
                //
                //if (_yoyo) {
                //	_reversed = !_reversed;
                //}
                //
                //_startTime = time + _delayTime;
                //
                //return true;
                //
                //}
                //else {

                //if (_onFinishCallback !== null) {

                this.finish();
                //this.onFinish.call(_object);

                //}

                //for ( var i = 0, numChainedTweens = _chainedTweens.length; i < numChainedTweens; i++ ) {
                //
                //	_chainedTweens[ i ].start( time );
                //
                //}

                return false;

                //}

            }

            return true;
        }

        public from(object:any) {
            var self = this;

            this._object = dyCb.Hash.create<any>(object);

            // Set all starting values present on the target object
            this._object.forEach((value:any, key:string) => {
                self._valuesStart.addChild(key, window.parseFloat(value, 10));
            });

            return this;
        }

        public to(properties:any, duration:number = 1000) {
            this._duration = duration;
            this._valuesEnd = dyCb.Hash.create<any>(properties);

            return this;
        }

        public init(){
            var self = this;

            this._valuesEnd.forEach((value:any, key:string) => {
                // check if an Array was provided as property value
                if (value instanceof Array) {

                    if (value.length === 0) {
                        return;
                    }

                    // create a local copy of the Array with the start value at the front
                    self._valuesEnd.setValue(key, [self._object.getChild(key)].concat(self._valuesEnd.getChild(key)));
                }

                self._valuesStart.setValue(key, self._object.getChild(key));

                if (( self._valuesStart.getChild(key) instanceof Array ) === false) {
                    self._valuesStart.setValue(key, self._valuesStart.getChild(key) * 1.0); // Ensures we're using numbers, not strings
                }
            });
        }

        public start() {
            super.start();

            this._onStartCallbackFired = false;

            this._startTime = window.performance.now();

            return this;
        }

        public stop() {
            super.stop();

            if (this._onStopCallback !== null) {
                this._onStopCallback.call(this._object.getChildren());
            }

            return this;
        }

        public copy() {
            var action = Tween.create();

            return Tween.create().from(this._valuesStart.getChildren())
            .to(this._valuesEnd.getChildren(), this._duration)
                .easing(this._easingFunction)
                .interpolation(this._interpolationFunction)
                .onStart(this._onStartCallback)
                .onStop(this._onStopCallback)
                .onFinish(this._onFinishCallback)
                .onUpdate(this._onUpdateCallback);
        }

        public reverse() {
            var tmp = this._valuesStart;

            this._valuesStart = this._valuesEnd;
            this._valuesEnd = tmp;
        }

        public easing(easing) {
            this._easingFunction = easing;

            return this;
        }

        public interpolation(interpolation) {
            this._interpolationFunction = interpolation;

            return this;
        }

        public onUpdate(callback:Function) {
            this._onUpdateCallback = callback;

            return this;
        }

        public onFinish(callback:Function) {
            this._onFinishCallback = callback;

            return this;
        }

        public onStart(callback:Function) {
            this._onStartCallback = callback;

            return this;
        }

        public onStop(callback:Function) {
            this._onStopCallback = callback;

            return this;
        }

        protected finish(){
            super.finish();

            if (this._onFinishCallback !== null) {
                this._onFinishCallback.call(this._object.getChildren());
            }
        }

        private _isFinish(elapsed){
            return elapsed >= 1;
        }
    }
}

