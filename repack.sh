#!/bin/bash

token="z848HojAT-FXxsMmcFnJ"
apiAddress="https://gitlab.abris.site/api/v4/projects"

R_VERSION=$(grep 'Release version' release_description.md | grep -Po '\d{1,2}\.\d{1,3}\.?\d{0,3}');
cd /tmp/abris-free && rm -Rf ./*
mkdir -p /tmp/abris-free/dist/images/ && cd /tmp/abris-free
curl --output abris-ui.zip --location --header "PRIVATE-TOKEN: ${token}" "${apiAddress}/5/jobs/artifacts/master/download?job=build-free"; # Project ID: 5 == abris-ui
unzip ./abris-ui.zip
cp -r ./packages/abris-ui/dist/* ./dist/
curl --output abris-server-base.zip --location --header "PRIVATE-TOKEN: ${token}" "${apiAddress}/69/jobs/artifacts/master/download?job=build"; # Project ID: 69 == abris-free-server
unzip ./abris-server-base.zip -d ./dist/
curl --output dist/Server/sql_install/pg_abris_free.sql --location --header "PRIVATE-TOKEN: ${token}" "${apiAddress}/2/repository/files/pg_abris_free.sql/raw?ref=master"; # Project ID: 2 == pg_abris
curl --output dist/Server/sql_install/mysql_abris_free.sql --location --header "PRIVATE-TOKEN: ${token}" "${apiAddress}/72/repository/files/mysql_abris_free.sql/raw?ref=master"; # Project ID: 72 == mysql_abris_free
sed -i "s/VERSION/$R_VERSION/g" ./dist/version.json;
sed -i "s/VERSION/$R_VERSION/g" ./dist/Server/version.json;
sed -i "s/Test/Free/g" ./dist/version.json;
sed -i "s/Test/Free/g" ./dist/Server/version.json;
cd ./dist && zip -r ../abris-free.zip ./* && cd ..
mv abris-free.zip /var/www/comsite/data/www/abrisplatform.com/downloads/

mkdir -p /tmp/abris-free/databases && cd /tmp/abris-free/databases
cp /tmp/abris-free/dist/Server/sql_install/pg_abris_free.sql .
cp /tmp/abris-free/dist/Server/sql_install/mysql_abris_free.sql .
zip -r ../abris-free-databases.zip ./* 
mv ../abris-free-databases.zip /var/www/comsite/data/www/abrisplatform.com/downloads/
