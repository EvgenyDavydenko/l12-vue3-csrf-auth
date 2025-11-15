## Laravel12 Vue3 создание блога с авторизацией на основе CSRF защиты

1.  Creating a Laravel Project
```
composer create-project laravel/laravel ./
```
2.   Install Laravel Sanctum
```
php artisan install:api
rm database/migrations/2025_11_15_134911_create_personal_access_tokens_table.php
php artisan config:publish cors
```
3.  Install Fortify
```
composer require laravel/fortify
php artisan fortify:install
```
4.  Creating a Vue Application with Vue-Router and Axios
```
npm create vue@latest
npm install
npm i axios
```
