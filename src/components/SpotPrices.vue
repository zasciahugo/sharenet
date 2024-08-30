<template>
  <div>
    <h1 class="text-xl font-medium mb-10">Spot Prices</h1>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="border-b border-gray-300">
          <th class="w-1/5 px-4 py-2 text-left text-sm font-semibold border-r border-gray-300"
            @click="sortTable('fullName')">Full Name</th>
          <th class="w-1/5 px-4 py-2 text-left text-sm font-semibold border-r border-gray-300"
            @click="sortTable('price')">Price</th>
          <th class="w-1/5 px-4 py-2 text-left text-sm font-semibold border-r border-gray-300"
            @click="sortTable('move')">Move</th>
          <th class="w-1/5 px-4 py-2 text-left text-sm font-semibold border-r border-gray-300"
            @click="sortTable('pmove')">Percentage Move</th>
          <th class="w-1/5 px-4 py-2 text-left text-sm font-semibold" @click="sortTable('datetime')">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="spot in paginatedSpots" :key="spot.tickerId" class="border-b border-gray-200">
          <td class="w-1/5 px-4 py-2 text-xs border-r border-gray-300">{{ spot.fullName }}</td>
          <td class="w-1/5 px-4 py-2 text-xs border-r border-gray-300">{{ spot.price }}</td>
          <td class="w-1/5 px-4 py-2 text-xs border-r border-gray-300">{{ spot.move }}</td>
          <td class="w-1/5 px-4 py-2 text-xs border-r border-gray-300">{{ spot.pmove.toFixed(2) }}%</td>
          <td class="w-1/5 px-4 py-2 text-xs">{{ new Date(spot.datetime).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div class="mt-10 flex items-center justify-center">
      <button @click="prevPage" :disabled="currentPage === 1" class="bg-blue-600 text-sm text-white p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"
          class="size-5">
          <path stroke-linecap="square" stroke-linejoin="square" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>
      <span class="mx-6 text-sm">Page <span class="font-medium">{{ currentPage }}</span> of <span class="font-medium">{{
        totalPages }}</span></span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="bg-blue-600 text-sm text-white p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const spots = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

const fetchSpots = async () => {
  try {
    const response = await axios.get('https://api.sharenet.co.za/api/v1/px2/spots');
    if (response.data && response.data.spots) {
      spots.value = response.data.spots;
    } else {
      console.error('API response structure is different than expected', response.data);
    }
  } catch (error) {
    console.error('Error fetching data from API:', error);
  }
};

const sortKey = ref('fullName');
const sortOrder = ref(1);

const sortTable = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = -sortOrder.value;
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
};

const sortedSpots = computed(() => {
  return spots.value.slice().sort((a, b) => {
    if (a[sortKey.value] > b[sortKey.value]) return sortOrder.value;
    if (a[sortKey.value] < b[sortKey.value]) return -sortOrder.value;
    return 0;
  });
});

const paginatedSpots = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedSpots.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(spots.value.length / itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

fetchSpots();
</script>