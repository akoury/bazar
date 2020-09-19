FROM php:7.4-fpm-alpine

# Install dependencies
RUN apk add --no-cache wget \
    npm \
    libpng-dev \
    zlib-dev

# Install extensions
RUN docker-php-ext-install \
    bcmath \
    pdo_mysql \
    gd \
    exif

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer