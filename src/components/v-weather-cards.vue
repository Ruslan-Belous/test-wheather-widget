<template>
	<div class="weather-cards">
		<v-weather-item v-for="card in places" :key="card.id" :wheather_item_data="card" />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import vWeatherItem from './v-weather-item.vue';
export default {
	components: { vWeatherItem },
	name: 'v-weather-cards',
	computed: {
		...mapState(['places']),
		card() {
			console.log(this.places);
		}
	}
};
</script>

<style lang="scss" scoped></style>
