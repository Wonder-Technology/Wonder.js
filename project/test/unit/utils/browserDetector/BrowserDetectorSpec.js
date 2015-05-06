describe("BrowserDetector", function () {
    var detector = null;
    var allUserAgents = null;

    /**
     * Get the length of an object.
     * http://stackoverflow.com/questions/5223/length-of-javascript-object-ie-associative-array
     *
     * @param  {Object} obj
     * @return {Number}
     */
    function objLength(obj) {
        var size = 0,
            key = null;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++
        }
        return size
    }

    function objKeys(obj) {
        var keys = [],
            key = null;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key)
            }
        }
        keys.sort();
        return keys.join(', ')
    }

    detector = Engine3D.BrowserDetector;
    allUserAgents = useragents;

    /* Groups */
    for (g in allUserAgents) {
        (function (group, userAgents) {
            describe(group, function () {

                /* User Agents */
                for (ua in userAgents) {
                    (function (userAgent, expections) {
                        describe('user agent "' + userAgent + '"', function () {

                            expections.name = group

                            /* Get the result from detector. */
                            var result = detector._detect(userAgent)

                            /* At first, check if the result has the correct length. */
                            it('should have ' + objLength(expections) + ' properties', function () {
                                expect(objKeys(result)).toEqual(objKeys(expections));
                                //assert.equal(objKeys(result), objKeys(expections))
                            })

                            /* Properties */
                            for (p in expections) {
                                (function (property, value, resultValue) {

                                    /* Now ensure correctness of every property. */
                                    it('\'s Property "' + property + '" should be ' + value, function () {
                                        //assert.equal(resultValue, value)
                                        expect(resultValue).toEqual(value);
                                    })

                                })(p, expections[p], result[p])
                            }
                        })
                    })(ua, userAgents[ua])
                }

            })
        })(g, allUserAgents[g])
    }
});
