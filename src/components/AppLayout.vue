<template>
    <div class="flex flex-col min-h-screen">
        <!-- Header Section -->
        <header>
            <nav class="w-full bg-blue-600 text-white py-4 fixed top-0 left-0 z-50">
                <div class="mx-auto md:px-40 text-center md:flex justify-between items-center">
                    <div>
                        <p class="text-xl font-semibold">Sharenet</p>
                    </div>
                    <div class="text-sm">
                        <router-link to="/" class="mr-4 text-white hover:text-gray-200 tracking-wide">Spot
                            Prices</router-link>
                        <router-link to="/contact-us" class="mr-4 text-white hover:text-gray-200 tracking-wide">Contact
                            Us</router-link>
                        <router-link to="/workshops"
                            class="text-white hover:text-gray-200 tracking-wide">Workshops</router-link>
                    </div>
                </div>
            </nav>
        </header>

        <!-- Main Content Section -->
        <main class="pt-28 md:pt-20 px-4 md:px-40 flex-grow mx-auto w-full">
            <router-view></router-view>
        </main>

        <footer class="w-full bg-blue-600 text-white text-center py-2 mt-auto">
            <p class="text-xs tracking-wide">&copy; 2024 Sharenet. All rights reserved.</p>
        </footer>
    </div>
</template>

<script setup>
</script>