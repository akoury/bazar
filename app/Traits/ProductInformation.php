<?php

namespace App\Traits;

trait ProductInformation
{
    public function getNameAttribute()
    {
        return $this->model->name;
    }

    public function getDescriptionAttribute()
    {
        return $this->model->description;
    }

    public function getPublishedAttribute()
    {
        return $this->model->published;
    }

    public function getImagePathAttribute()
    {
        return $this->model->image_path;
    }

    public function getBrandIdAttribute()
    {
        return $this->model->brand_id;
    }
}
