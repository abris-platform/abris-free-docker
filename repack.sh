#!/bin/bash

R_VERSION=$(grep 'Release version' release_description.md | grep -Po '\d{1,2}\.\d{1,3}\.?\d{0,3}');

cd /tmp/abris-free && rm -Rf ./*
mkdir -p /tmp/abris-free/dist/images/ && cd /tmp/abris-free
curl --output abris-ui.zip --location --header "PRIVATE-TOKEN: xs9d1-T2G4pa73QsPKaf" "https://abris.site:8091/api/v4/projects/5/jobs/artifacts/master/download?job=build-free";
unzip ./abris-ui.zip
cp -r ./packages/abris-ui/dist/* ./dist/
curl --output abris-server-base.zip --location --header "PRIVATE-TOKEN: xs9d1-T2G4pa73QsPKaf" "https://abris.site:8091/api/v4/projects/69/jobs/artifacts/master/download?job=build";
unzip ./abris-server-base.zip -d ./dist/
curl --output Server/sql/pg_abris_free.sql --location --header "PRIVATE-TOKEN: xs9d1-T2G4pa73QsPKaf" "https://abris.site:8091/api/v4/projects/2/repository/files/pg_abris_free.sql/raw?ref=master";
sed -i "s/VERSION/$R_VERSION/g" ./dist/version.json;
sed -i "s/VERSION/$R_VERSION/g" ./dist/Server/version.json;
sed -i "s/Test/Free/g" ./dist/version.json;
sed -i "s/Test/Free/g" ./dist/Server/version.json;
zip -r abris-free.zip ./dist/*
mv abris-free.zip /var/www/comsite/data/www/abrisplatform.com/downloads/