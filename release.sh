#!/bin/bash

apt-get -yqq update && apt-get -yqq install curl jq

R_VERSION=$(grep 'Release version' release_description.md | grep -Po '\d{1,2}\.\d{1,3}\.?\d{0,3}');

# Load data from file
DESCRIPTION='';
while read -r line; do
	if [[ "$line" != *"Release version"* ]]; then
		DESCRIPTION="${DESCRIPTION}${line}\n";
	fi
done < release_description.md;

RELEASE_NAME="Abris v${R_VERSION}";
PROJECT_ID=(5 69 2 68); #(UI, SERVER, PG, ABRIS)
PROJECT_NAME=("abris-ui" "abris-server-base" "pg_abris" "abris-free");

# Check for correct tag value
if [[ "$R_VERSION" == "" ]]; then
    echo "Missing VERSION parameter!";
    echo $R_VERSION, $RELEASE_NAME;
	echo $DESCRIPTION;
    exit 1;
fi

sed -i "s/VERSION/$R_VERSION/g" ./distrib/html/version.json;
sed -i "s/VERSION/$R_VERSION/g" ./distrib/html/Server/version.json;
sed -i "s/Test/Release/g" ./distrib/html/version.json;
sed -i "s/Test/Release/g" ./distrib/html/Server/version.json;

echo
echo "Getting the latest project commits:";
echo
DESCRIPTION="${DESCRIPTION}\n### Links\n";
for i in ${!PROJECT_ID[@]}; do
	if [[ "${PROJECT_ID[$i]}" != "68" ]]; then
		if [[ "${PROJECT_ID[$i]}" != "4" ]]; then
			JOB[$i]=$(curl --header "PRIVATE-TOKEN: ${CI_API_TOKEN}" "https://abris.site:8091/api/v4/projects/${PROJECT_ID[$i]}/jobs?scope=success" | jq '.[0]'); # JSON последнего успешного билда проекта.
		else
			JOB[$i]=$(curl --header "PRIVATE-TOKEN: ${CI_API_TOKEN}" "https://abris.site:8091/api/v4/projects/${PROJECT_ID[$i]}/jobs?scope=success" | jq 'map (select (.name=="build-free")) | .[0]'); # JSON последнего успешного билда сервера (больше одного job'а в конвеере).
		fi
		COMMIT[$i]=$(echo ${JOB[$i]} | jq --raw-output '.commit.short_id');
		JOB[$i]=$(echo ${JOB[$i]} | jq '.id'); # Замена JSON'а на id процесса.
		DESCRIPTION="${DESCRIPTION}* **${PROJECT_NAME[$i]}** [artifact](https://abris.site:8091/abris-lab/${PROJECT_NAME[$i]}/-/jobs/${JOB[$i]}/artifacts/download) (job [${JOB[$i]}](https://abris.site:8091/abris-lab/${PROJECT_NAME[$i]}/-/jobs/${JOB[$i]})), commit: https://abris.site:8091/abris-lab/${PROJECT_NAME[$i]}/commit/${COMMIT[$i]}\n"; # Добавление ссылки в описание.
	else
		JOB[$i]=$(curl --header "PRIVATE-TOKEN: ${CI_API_TOKEN}" "https://abris.site:8091/api/v4/projects/${PROJECT_ID[$i]}/jobs?scope=success" | jq 'map (select (.name=="build")) | .[0]'); # JSON последнего успешного деплоя до релиза.
		COMMIT[$i]=$(echo ${JOB[$i]} | jq --raw-output '.commit.short_id');
		JOB[$i]=$(echo ${JOB[$i]} | jq '.id'); # Замена JSON'а на id процесса.
	fi
	echo "${PROJECT_NAME[$i]} used commit/job: ${COMMIT[$i]}/${JOB[$i]}";
	echo '--------------------------------------------------------------------------------';
done;
echo

# Release сreation
echo "POST release data:"
curl --header 'Content-Type: application/json' --header "Private-Token: ${CI_API_TOKEN}"\
    --data "{ \"name\": \"${RELEASE_NAME}\", \"tag_name\": \"${R_VERSION}\", \"description\": \"${DESCRIPTION}\", \"assets\": { \"links\": [{ \"name\": \"abris-free\", \"url\": \"https://abris.site:8091/abris-lab/abris-free/-/jobs/${JOB[@]:(-1)}/artifacts/download\" }] } }"\
    --request POST https://abris.site:8091/api/v4/projects/68/releases?ref=master | jq '.[]';