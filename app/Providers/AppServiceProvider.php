<?php

namespace App\Providers;

use App\Classes\PaymentGateway;
use Illuminate\Support\Collection;
use App\Classes\StripePaymentGateway;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(StripePaymentGateway::class, function () {
            return new StripePaymentGateway(config('services.stripe.secret'));
        });

        $this->app->bind(PaymentGateway::class, StripePaymentGateway::class);

        Collection::macro('equals', function ($items) {
            $givenItems = $this->getArrayableItems($items);

            $originalItemsCount = count($this->items);
            $givenItemsCount = count($givenItems);
            $intersectionCount = $this->intersectByKeys($givenItems)->intersect($givenItems)->count();

            if ($intersectionCount === $originalItemsCount && $originalItemsCount === $givenItemsCount) {
                return true;
            }

            return false;

            // $givenItems = $this->getArrayableItems($items);

            // $firstDiff = count($this->diffAssoc($givenItems)) === 0;

            // $originalItems = $this->items;
            // $this->items = $givenItems;
            // $secondDiff = count($this->diffAssoc($originalItems)) === 0;
            // $this->items = $originalItems;

            // return  $firstDiff && $secondDiff;
        });
    }
}
