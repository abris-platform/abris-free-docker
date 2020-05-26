#!/bin/bash

cd /tmp/abris-free
curl --output abris-ui.zip --location --header "PRIVATE-TOKEN: xs9d1-T2G4pa73QsPKaf" "https://abris.site:8091/api/v4/projects/5/jobs/artifacts/master/download?job=build-free";
unzip ./abris-ui.zip
curl --output abris-server-base.zip --location --header "PRIVATE-TOKEN: xs9d1-T2G4pa73QsPKaf" "https://abris.site:8091/api/v4/projects/69/jobs/artifacts/master/download?job=build";
cd ./dist/ && unzip ../abris-server-base.zip
zip -r abris-free.zip ./*
mv abris-free.zip /var/www/comsite/data/www/abrisplatform.com/downloads/
cd /tmp/abris-free && rm -Rf ./*