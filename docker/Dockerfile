FROM php:8.2-fpm
RUN apt-get update && \
    apt-get install -y libpq-dev zlib1g-dev libicu-dev g++ libfreetype6-dev libjpeg62-turbo-dev libjpeg-dev libpng-dev libzip-dev git unzip mc nano nodejs npm telnet wget && \
    docker-php-ext-configure intl && \
    docker-php-ext-install intl && \
    docker-php-ext-install mysqli pdo pdo_mysql zip
RUN curl -sL https://getcomposer.org/installer | php -- --install-dir /usr/bin --filename composer
RUN npm install pm2 -g
