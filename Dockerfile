FROM ubuntu:18.04

RUN apt-get update -yqq \
    && DEBIAN_FRONTEND=noninteractive apt-get -yqq install \
    dialog \
    postgresql-10 \
    postgresql-server-dev-all \
    apache2 \
    php7.2 \
    php7.2-pgsql \
    php7.2-zip \
    libapache2-mod-php7.2 \
    curl \
    unzip \
    zlib1g-dev \
    libzip-dev \
    && phpenmod zip \
    && echo "host   all   all   0.0.0.0/0   md5" >> /etc/postgresql/10/main/pg_hba.conf \
    && echo "listen_addresses='*'" >> /etc/postgresql/10/main/postgresql.conf \
    && curl -O https://abrisplatform.com/downloads/abris-free.zip \
    && rm -rf /var/www/html/* \
    && unzip abris-free.zip -d /var/www/html

EXPOSE 5432
EXPOSE 80

CMD service apache2 start\
    && service postgresql start \
    && su postgres -c "psql  -U postgres -c \"ALTER USER postgres WITH PASSWORD '123456';\"" \
    && chmod -R 777 /var/www/html \
    && /bin/bash