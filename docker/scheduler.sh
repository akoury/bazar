while [ true ]
do
  php artisan schedule:run -vvv --no-interaction &
  sleep 60
done