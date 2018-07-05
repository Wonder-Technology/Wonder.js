var gulp = require("gulp");
var git = require("gulp-git");
var path = require("path");
var fs = require("fs");

var exec = require("child_process").exec;


gulp.task("installPuppeteer", function (done) {
    console.log("sudo cp -rf ../Wonder-Benchmark/node_modules/puppeteer ./node_modules/puppeteer");

    exec("sudo cp -rf ../Wonder-Benchmark/node_modules/puppeteer ./node_modules/puppeteer", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
        if (err) {
            throw err;
        }


        console.log("sudo npm install in node_modules/puppeteer");



        exec("sudo npm install", { cwd: path.join(process.cwd(), "node_modules/puppeteer"), maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
            if (err) {
                throw err;
            }

            done();
        });
    });
});







// gulp.task("install", function (done) {
//     var packageFilePath = path.join(process.cwd(), "./package.json");

//     console.log("remove puppeteer in package.json...");



//     var packageContent = JSON.parse(fs.readFileSync(packageFilePath));

//     delete packageContent.devDependencies.puppeteer;



//     fs.writeFileSync(packageFilePath,
//         JSON.stringify(packageContent, null, "\t")
//     );



//     console.log("sudo rm -rf node_modules/ yarn.lock");





//     exec("sudo rm -rf node_modules/ yarn.lock", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
//         if (err) {
//             throw err;
//         }

//         console.log("sudo yarn install");

//         exec("sudo yarn install", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
//             if (err) {
//                 throw err;
//             }


//             console.log("sudo cp -rf ../Wonder-Benchmark/node_modules/puppeteer ./node_modules/puppeteer");

//             exec("sudo cp -rf ../Wonder-Benchmark/node_modules/puppeteer ./node_modules/puppeteer", { maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
//                 if (err) {
//                     throw err;
//                 }


//                 console.log("sudo npm install");



//                 exec("sudo npm install", { cwd: path.join(process.cwd(), "node_modules/puppeteer"), maxBuffer: 8192 * 4000 }, function (err, stdout, stderr) {
//                     if (err) {
//                         throw err;
//                     }

//                     console.log("restore package.json");


//                     packageContent.devDependencies.puppeteer = "^0.13.0";



//                     fs.writeFileSync(packageFilePath,
//                         JSON.stringify(packageContent, null, "\t")
//                     );

//                     done();
//                 });
//             });
//         });
//     });
// });

