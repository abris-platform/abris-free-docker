#!/bin/bash

cd /tmp/abris-free
curl --output abris-ui.zip --location --header "PRIVATE-TOKEN: xs9d1-T2G4pa73QsPKaf" "https://abris.site:8091/api/v4/projects/5/jobs/artifacts/master/download?job=build-free";
unzip ./abris-ui.zip
curl --output abris-server-base.zip --location --header "PRIVATE-TOKEN: xs9d1-T2G4pa73QsPKaf" "https://abris.site:8091/api/v4/projects/69/jobs/artifacts/master/download?job=build";
curl --output abris-css.zip --location --header "PRIVATE-TOKEN: z848HojAT-FXxsMmcFnJ" "http://abris.site:8090/api/v4/projects/57/repository/archive.zip"
unzip ./abris-css.zip
cp css-master-*/custom.css ./dist/
cp css-master-*/images/*.png ./dist/images/
cd ./dist/ && unzip ../abris-server-base.zip
zip -r abris-free.zip ./*
mv abris-free.zip /var/www/comsite/data/www/abrisplatform.com/downloads/
cd /tmp/abris-free && rm -Rf ./*