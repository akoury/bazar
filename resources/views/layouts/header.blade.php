<header>
    <nav>
        <ul class="bg-teal p-6 mb-3">
            <li class="inline"><a href="{{ route('home') }}" class="text-teal-lighter hover:text-white mr-4 no-underline">Bazar</a></li>
            <li class="inline"><a href="{{ route('brands.index') }}" class="text-teal-lighter hover:text-white mr-4 no-underline">Brands</a></li>
            <li class="inline"><a href="{{ route('carts.show') }}" class="text-teal-lighter hover:text-white mr-4 no-underline">Cart</a></li>
            @guest
                <li class="inline"><a href="{{ route('login') }}" class="text-teal-lighter hover:text-white mr-4 no-underline">Login</a></li>
                <li class="inline"><a href="{{ route('register') }}" class="text-teal-lighter hover:text-white mr-4 no-underline">Register</a></li>
            @else
                <li class="inline"><a href="{{ route('dashboard') }}" class="text-teal-lighter hover:text-white mr-4 no-underline">{{ Auth::user()->email }}</a></li>
                <li class="inline"><a href="{{ route('logout') }}"
                    class="text-teal-lighter hover:text-white mr-4 no-underline"
                    onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a></li>
                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                    @csrf
                </form>
            @endguest
        </ul>
    </nav>
</header>