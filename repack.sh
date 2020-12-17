#!/bin/bash

R_VERSION=$(grep 'Release version' release_description.md | grep -Po '\d{1,2}\.\d{1,3}\.?\d{0,3}');

mkdir -p /tmp/abris-free/dist/images/ && cd /tmp/abris-free
curl --output abris-ui.zip --location --header "PRIVATE-TOKEN: xs9d1-T2G4pa73QsPKaf" "https://abris.site:8091/api/v4/projects/5/jobs/artifacts/master/download?job=build-free";
unzip ./abris-ui.zip
cp -r ./packages/abris-ui/dist/* ./dist/
curl --output abris-server-base.zip --location --header "PRIVATE-TOKEN: xs9d1-T2G4pa73QsPKaf" "https://abris.site:8091/api/v4/projects/69/jobs/artifacts/master/download?job=build";
cd ./dist/ && unzip ../abris-server-base.zip
curl --output Server/sql/pg_abris_free.sql --location --header "PRIVATE-TOKEN: xs9d1-T2G4pa73QsPKaf" "https://abris.site:8091/api/v4/projects/2/repository/files/pg_abris_free.sql/raw?ref=master";
sed -i "s/VERSION/$R_VERSION/g" ./html/version.json;
sed -i "s/VERSION/$R_VERSION/g" ./html/Server/version.json;
sed -i "s/Test/Free/g" ./html/version.json;
sed -i "s/Test/Free/g" ./html/Server/version.json;
zip -r abris-free.zip ./*
mv abris-free.zip /var/www/comsite/data/www/abrisplatform.com/downloads/
cd /tmp/abris-free && rm -Rf ./*