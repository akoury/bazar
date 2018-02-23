<div class="bg-teal p-6 mb-3">
    <a href="{{ route('home') }}" class="text-teal-lighter hover:text-white mr-4 no-underline">Home</a>
    <a href="{{ route('products.index') }}" class="text-teal-lighter hover:text-white mr-4 no-underline">Products</a>
    @guest
        <a href="{{ route('login') }}" class="text-teal-lighter hover:text-white mr-4 no-underline">Login</a>
        <a href="{{ route('register') }}" class="text-teal-lighter hover:text-white mr-4 no-underline">Register</a>
    @else
        <a href="#" class="text-teal-lighter hover:text-white mr-4 no-underline">{{ Auth::user()->email }}</a>
        <a href="{{ route('logout') }}"
            class="text-teal-lighter hover:text-white mr-4 no-underline"
            onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form>
    @endguest
</div>