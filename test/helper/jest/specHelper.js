beforeEach(function () {
    (function (jasmine) {
        //* 引入YTool的judge和convert方法

        var Tool = {};
        // var global = window;


        function _verifyIsStub(stub) {
            var method;

            for (var i = 0, l = arguments.length; i < l; ++i) {
                method = arguments[i];

                if (!method) {
                    //assert.fail("fake is not a spy");
                    return false;
                }

                if (method.proxy && method.proxy.isSinonProxy) {
                    verifyIsStub(method.proxy);
                }
                else {
                    if (typeof method !== "function") {
                        //assert.fail(method + " is not a function");
                        return false;
                    }

                    if (typeof method.getCall !== "function") {
                        //assert.fail(method + " is not stubbed");
                        return false;
                    }
                }
            }

            return true;
        }

        function _isSpecificCall(stub) {
            return !stub.firstCall
        }
        function _isCalled(stub) {
            var actualArg = null;

            if (stub && stub.callId) {
                return true;
            }

            if(stub&&stub.args === undefined){
                return false;
            }

            actualArg = _isSpecificCall(stub) || _verifyIsStub(stub) ? stub.args : stub.args[0];

            return actualArg && actualArg.length > 0;
        }
        function getActualArg(stub) {
            var actualArg = _isSpecificCall(stub) || _verifyIsStub(stub) ? stub.args : stub.args[0];

            return actualArg;
        }


        jasmine.addMatchers({
            toCalledWith: function () {
                return {
                    compare: function (actual, expected) {
                        var actualArg = getActualArg(actual),
                            expectedArg = null,
                            message = null,
                            toString = function (arg) {
                                return JSON.stringify (arg);
                            };

                        // expectedArg = Array.prototype.slice.call(arguments, 1);
                        expectedArg = expected;


                        message = "Expected to called with " + toString(expectedArg);

                        if (!_isCalled(actual)) {
                            message += ", but actual is not called";
                        }
                        else {
                            message += ", but actual is " + toString(actualArg);
                        }

                        return {
                            pass: actual.calledWith.apply(actual, expectedArg),
                            message: function () {
                                return message;
                            }
                        }
                    },
                    negativeCompare: function (actual, expected) {
                        var actualArg = getActualArg(actual),
                            expectedArg = null,
                            message = null,
                            toString = function (arg) {
                                return JSON.stringify (arg);
                           };

                        // expectedArg = Array.prototype.slice.call(arguments, 1);
                        expectedArg = expected;


                        message = "Expected not to called with " + toString(expectedArg);

                        if (!_isCalled(actual)) {
                            message += ", but actual is called";
                        }
                        else {
                            message += ", but actual is called with " + toString(actualArg[0]);
                        }
                        return {
                            pass: (actual.calledWith.apply(actual, expectedArg)),
                            message: function () {
                                return message;
                            }
                        }
                    }
                };
            },
            toCalled: function () {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: actual.called,
                            message: function () {
                                return "Expected to be called, but actual is not called";
                            }
                        }
                    },
                    negativeCompare: function (actual, expected) {
                        return {
                            pass: actual.called,
                            message: function () {
                                return "Expected to be not called, but actual is called";
                            }
                        }
                    }
                };
            },
            toCalledOnce: function () {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: actual.calledOnce,
                            message: function () {
                                return "Expected to be called Once, but actual callCount is " + actual.callCount
                            }
                        }
                    },
                    negativeCompare: function (actual, expected) {
                        return {
                            pass: actual.calledOnce,
                            message: function () {
                                return "Expected not to be called Once, but actual callCount is " + actual.callCount;
                            }
                        }
                    }
                };
            },
            toCalledTwice: function () {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: actual.calledTwice,
                            message: function () {
                                return "Expected to be called Twice, but actual callCount is " + actual.callCount

                            }
                        }
                    },
                    negativeCompare: function (actual, expected) {
                        return {
                            pass: actual.calledTwice,
                            message: function () {
                                return "Expected not to be called Twice, but actual callCount is " + actual.callCount

                            }
                        }
                    }
                };
            },
            toCalledThrice: function () {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: actual.calledThrice,
                            message: function () {
                                return "Expected to be called thrice, but actual callCount is " + actual.callCount
                            }
                        }
                    },
                    negativeCompare: function (actual, expected) {
                        return {
                            pass: actual.calledThrice,
                            message: function () {
                                return "Expected not to be called thrice, but actual callCount is " + actual.callCount
                            }
                        }
                    }
                };
            },
            toCalledBefore: function () {
                return {
                    compare: function (actual, expected) {
                        var msg = null,
                            pass = null;

                        msg = "Expected to be called before, ";

                        if (!_isCalled(expected)) {
                            pass = false;
                            msg += "but expected not called";
                        }
                        else {
                            pass = actual.calledBefore(expected);
                            msg += _isCalled(actual) ? "but the actual is be called after" : "but the actual is not called";
                        }

                        return {
                            pass: pass,
                            message: function () {
                                return msg;
                            }
                        }
                    }
                };
            },
            toCalledAfter: function () {
                return {
                    compare: function (actual, expected) {
                        var msg = null,
                            pass = null;

                        msg = "Expected to be called after, ";

                        if (!_isCalled(expected)) {
                            pass = false;
                            msg += "but the expected is not called";
                        }
                        else if (!_isCalled(actual)) {
                            pass = false;
                            msg += "but the actual is not called";
                        }
                        else {
                            pass = actual.calledAfter(expected);
                            msg += _isCalled(actual) ? "but the actual is be called before" : "but the actual is not called";
                        }

                        return {
                            pass: pass,
                            message: function () {
                                return msg;
                            }
                        }
                    }
                };
            }
        });
    }(jasmine));
});