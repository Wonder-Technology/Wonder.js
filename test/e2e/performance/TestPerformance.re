open WonderBenchmark;

open PerformanceTestData;

open Js.Promise;

let generateBenchmark = () => TestPerformance.generateBenchmark;

let runTest = (browserArr) => TestPerformance.runTest(browserArr, performanceTestData);