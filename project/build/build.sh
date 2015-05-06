#!/bin/sh

workpath=$(cd `dirname $0`; pwd)/
cd ${workpath}../engine

find ./ -name "*.ts" >> files.txt
tsc -d @files.txt --out ../dist/Engine.js -t ES5 --sourceMap --noEmitOnError
uglifyjs ../dist/Engine.js -o ../dist/Engine.min.js


rm files.txt