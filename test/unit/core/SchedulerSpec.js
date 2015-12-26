describe("Scheduler", function () {
    var schedule = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        schedule = wd.Scheduler.create();
        sandbox.stub(window.performance, "now").returns(0);
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("scheduleLoop", function(){
        it("schedule the task to each frame", function(){
            var sum = 0;

            schedule.scheduleLoop(function(data){
                sum += data
            }, [1]);

            schedule.update(1);
            schedule.update(100);

            expect(sum).toEqual(2);
        });
    });

    describe("scheduleFrame", function(){
        it("schedule the task to the next speficied frame", function(){
            var sum = 0;

            schedule.scheduleFrame(function(data){
                sum += data
            }, 2, [1]);

            schedule.update(1);
            schedule.update(100);
            schedule.update(200);

            expect(sum).toEqual(1);
        });
        it("<= 1 frame is the next frame", function(){
            var sum = 0;

            schedule.scheduleFrame(function(data){
                sum += data
            }, 1, [1]);

            schedule.update(1);

            expect(sum).toEqual(1);
        });
        it("default is 1 frame", function(){
            var sum = 0;

            schedule.scheduleFrame(function(){
                sum += 1;
            });

            schedule.update(1);

            expect(sum).toEqual(1);
        });
    });

    describe("scheduleInterval", function(){
        it("schedule the task to internal, like setInterval", function(){
            var sum = 0;

            schedule.scheduleInterval(function(num1, num2){
                sum += num2;
            }, 100, [1, 2]);

            schedule.update(1);
            schedule.update(100);
            schedule.update(199);
            schedule.update(200);

            expect(sum).toEqual(4);
        });
        it("default interval is 0", function(){
            var sum = 0;

            schedule.scheduleInterval(function(){
                sum += 1;
            });

            schedule.update(1);
            schedule.update(2);

            expect(sum).toEqual(2);
        })
    });

    describe("scheduleTime", function(){
        it("schedule the task to time, like setTimeout", function(){
            var sum = 0;

            schedule.scheduleTime(function(num1, num2){
                sum += num2;
            }, 100, [1, 2]);

            schedule.update(1);
            expect(sum).toEqual(0);

            schedule.update(100);
            expect(sum).toEqual(2);

            schedule.update(200);
            expect(sum).toEqual(2);
        });
        it("default interval is 0", function(){
            var sum = 0;

            schedule.scheduleTime(function(){
                sum += 1;
            });

            schedule.update(1);
            expect(sum).toEqual(1);

            schedule.update(2);
            expect(sum).toEqual(1);
        })
    });

    describe("control test", function(){
        function update(elapsedTime){
            window.performance.now.returns(elapsedTime);
            schedule.update(elapsedTime);
        }

        beforeEach(function(){

        });

        describe("pause,resume", function(){
            it("pause/resume specific schedule", function(){
                var sum = 0;

                var id = schedule.scheduleInterval(function(num1, num2){
                    sum += num2;
                }, 100, [1, 2]);

                update(100);
                expect(sum).toEqual(2);
                schedule.pause(id);

                update(200);
                expect(sum).toEqual(2);
                schedule.resume(id);

                update(201);
                expect(sum).toEqual(2);

                update(300);
                expect(sum).toEqual(4);
            });
            it("pause/resume all schedule", function(){
                var sum1 = 0;
                var sum2 = 0;
                var sum3 = 0;

                var id1 = schedule.scheduleTime(function(num1, num2){
                    sum1 += num2;
                }, 100, [1, 2]);
                var id2 = schedule.scheduleLoop(function(num1, num2){
                    sum2 += num2;
                }, [1, 2]);
                var id3 = schedule.scheduleFrame(function(num1, num2){
                    sum3 += num2;
                }, 2, [1, 2]);

                update(50);
                expect(sum1).toEqual(0);
                expect(sum2).toEqual(2);
                schedule.pause();

                update(100);
                expect(sum1).toEqual(0);
                expect(sum2).toEqual(2);
                schedule.resume();

                update(101);
                expect(sum2).toEqual(4);
                expect(sum3).toEqual(2);

                update(150);
                expect(sum1).toEqual(2);
                expect(sum2).toEqual(6);
                expect(sum3).toEqual(2);
            });
        });

        describe("start,stop", function(){
            it("start/stop specific schedule", function(){
                var sum = 0;

                var id = schedule.scheduleInterval(function(num1, num2){
                    sum += num2;
                }, 100, [1, 2]);

                update(100);
                expect(sum).toEqual(2);

                update(150);
                expect(sum).toEqual(2);
                schedule.stop(id);

                update(200);
                expect(sum).toEqual(2);
                schedule.start(id);

                update(201);
                expect(sum).toEqual(2);

                update(250);
                expect(sum).toEqual(2);

                update(300);
                expect(sum).toEqual(4);
            });
            it("start/stop all schedule", function(){
                var sum1 = 0;
                var sum2 = 0;
                var sum3 = 0;

                var id1 = schedule.scheduleTime(function(num1, num2){
                    sum1 += num2;
                }, 100, [1, 2]);
                var id2 = schedule.scheduleLoop(function(num1, num2){
                    sum2 += num2;
                }, [1, 2]);
                var id3 = schedule.scheduleFrame(function(num1, num2){
                    sum3 += num2;
                }, 2, [1, 2]);

                update(50);
                expect(sum1).toEqual(0);
                expect(sum2).toEqual(2);
                schedule.stop();

                update(100);
                expect(sum1).toEqual(0);
                expect(sum2).toEqual(2);
                schedule.start();

                update(101);
                expect(sum1).toEqual(0);
                expect(sum2).toEqual(4);
                expect(sum3).toEqual(2);

                update(150);
                expect(sum1).toEqual(0);
                expect(sum2).toEqual(6);
                expect(sum3).toEqual(2);

                update(200);
                expect(sum1).toEqual(2);
                expect(sum2).toEqual(8);
                expect(sum3).toEqual(2);
            });
        });
    });
});
