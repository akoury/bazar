<header>
    <nav>
        <ul class="bg-teal-500 p-6 mb-3">
            <li class="inline"><a href="{{ route('home') }}" class="text-teal-300 hover:text-white mr-4">Bazar</a></li>
            <li class="inline"><a href="{{ route('brands.index') }}" class="text-teal-300 hover:text-white mr-4">Brands</a></li>
            <li class="inline"><a href="{{ route('carts.show') }}" class="text-teal-300 hover:text-white mr-4">Cart</a></li>
            @guest
                <li class="inline"><a href="{{ route('login') }}" class="text-teal-300 hover:text-white mr-4">Login</a></li>
                <li class="inline"><a href="{{ route('register') }}" class="text-teal-300 hover:text-white mr-4">Register</a></li>
            @else
                <li class="inline"><a href="{{ route('dashboard') }}" class="text-teal-300 hover:text-white mr-4">{{ Auth::user()->email }}</a></li>
                <li class="inline"><a href="{{ route('logout') }}"
                    class="text-teal-300 hover:text-white mr-4"
                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a></li>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
            @endguest
        </ul>
    </nav>
</header>