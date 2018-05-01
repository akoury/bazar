@extends('layouts.app')

@section('title', 'All Products')

@section('content')
    @foreach ($models as $model)
        <h1><a href="{{ $model->url() }}">{{ $model->name }}</a></h1>
        <h1>{{ $model->description }}</h1>
        <h1>From ${{ $model->price() }}</h1>
        @foreach ($model->attributes() as $attributeId => $attribute)
            <h3>{{ $attribute }}:</h3>
            @foreach ($model->values($attributeId) as $value)
                <h4>{{ $value }}</h4>
            @endforeach
        @endforeach
    @endforeach
@endsection