<template>
    <div>
        <div class="md:flex text-center justify-between items-center mb-10">
            <h1 class="text-xl font-medium">Workshops</h1>

            <div>
                <span class="font-medium text-sm mr-2">Filter Workshops</span>
                <!-- Filter Button to Show Only Available Workshops -->
                <button @click="toggleShowAvailable" class="bg-blue-600 text-sm text-white py-2 px-4 rounded-md">
                    {{ showAvailableOnly ? 'All Workshops' : 'Available Workshops' }}
                </button>
            </div>
        </div>

        <!-- Display Workshops -->
        <div v-if="filteredWorkshops.length" class="text-center grid grid-cols-1 md:grid-cols-4 gap-4 my-10">
            <div v-for="workshop in filteredWorkshops" :key="workshop.id" class="border rounded-md py-4">
                <h3 class="font-medium text-base mb-2">{{ workshop.name }}</h3>
                <p class="text-sm">{{ formatDate(workshop.date) }}</p>
                <p class="text-sm">Venue: {{ workshop.venue }}</p>
                <p class="text-sm" :class="{ 'text-red-500': workshop.seats_available <= 0 }">
                    {{ workshop.seats_available }} seats available
                </p>
                <button v-if="workshop.seats_available > 0" @click="bookWorkshop(workshop.id)"
                    class="bg-blue-600 text-sm text-white mt-4 py-2 px-4 rounded-md">
                    Book Now
                </button>
                <button v-else class="bg-gray-400 text-sm text-white mt-4 py-2 px-4 rounded-md cursor-not-allowed"
                    disabled>
                    Sold Out
                </button>
            </div>
        </div>

        <div v-else>
            <p>No workshops available.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

const workshops = ref([]);
const showAvailableOnly = ref(false); // State to control filter for available workshops

// Fetch workshops data from the API
const fetchWorkshops = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/data');
        workshops.value = response.data;
    } catch (error) {
        console.error('Error fetching workshops:', error);
    }
};

// Function to toggle the view between all workshops and available-only workshops
const toggleShowAvailable = () => {
    showAvailableOnly.value = !showAvailableOnly.value;
};

// Computed property to filter workshops based on the availability
const filteredWorkshops = computed(() => {
    if (showAvailableOnly.value) {
        return workshops.value.filter(workshop => workshop.seats_available > 0);
    }
    return workshops.value;
});

// Function to handle workshop booking
const bookWorkshop = async (workshopId) => {
    try {
        const userName = prompt('Enter your name to book the workshop:');
        if (userName) {
            const bookingDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await axios.post('http://localhost:5000/api/book', {
                workshop_id: workshopId,
                user_name: userName,
                booking_date: bookingDate,
            });
            alert('Booking successful!');
            fetchWorkshops(); // Refresh workshops list after booking
        }
    } catch (error) {
        console.error('Error booking workshop:', error);
        alert('There was an error booking the workshop. Please try again.');
    }
};

// Function to format the date nicely for display
const formatDate = (date) => {
    return new Date(date).toLocaleString();
};

// Fetch workshops when the component is mounted
onMounted(fetchWorkshops);
</script>