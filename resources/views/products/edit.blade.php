@extends('layouts.app')

@section('title', 'Edit ' . $model->name)

@section('content')
    <div class="p-4 container mx-auto">
        <product-edit :data-model="{{ $model }}"></product-edit>
    </div>
@endsection