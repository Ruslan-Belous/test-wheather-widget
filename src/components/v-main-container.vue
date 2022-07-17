<template>
	<main class="main-container container">
		<v-loader class="loader" v-if="loadingCurPlace" />
		<div v-else>
			<v-weather-item :weatherItemData="weatherDetail" />
			<v-search-form />

			<v-weather-item v-for="place in paginatedPlaces" :key="place.id" :weatherItemData="place" :isBtnVisible="true" />
			<!-- <v-pagination :arrData="places" /> -->
			<div class="pagination" v-if="isPaginationPageVisible">
				<div class="page" v-for="(page, i) in pages" :key="i" @click="pageClick(page)">
					{{ page }}
				</div>
			</div>
		</div>
		<v-scroll-up />
	</main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import VLoader from './v-loader.vue';
import VSearchForm from './v-search-form.vue';
import VWeatherItem from './v-weather-item.vue';
import Vpagination from './v-pagination.vue';
import VScrollUp from './v-scroll-up.vue';

export default {
	components: { VSearchForm, VWeatherItem, VLoader, Vpagination, VScrollUp },
	name: 'v-main-container',
	data: () => ({
		loadingCurPlace: true,
		placePerPage: 5,
		pageNum: 1
	}),
	async mounted() {
		const success = async (position) => {
			const coords = {
				lat: position.coords.latitude,
				lon: position.coords.longitude
			};
			await this.getWeatherByLatLon(coords);
			this.loadingCurPlace = false;
		};
		const error = (err) => {
			console.log(error);
		};
		navigator.geolocation.getCurrentPosition(success, error);
	},
	computed: {
		...mapState(['places', 'weatherDetail']),
		pages() {
			console.log(this.places);
			return Math.ceil(this.places.length / 5);
		},
		isPaginationPageVisible() {
			return this.places.length > 5;
		},
		paginatedPlaces() {
			let from = (this.pageNum - 1) * this.placePerPage;
			let to = from + this.placePerPage;
			let a = this.places.slice(from, to);
			console.log(a);
			return a;
		}
	},
	methods: {
		...mapActions(['getWeatherByLatLon']),
		pageClick(page) {
			this.pageNum = page;
		}
	}
};
</script>

<style lang="scss" scoped>
.main-container {
	flex: 1 1 auto;
	// display: flex;
	// align-items: center;
}
.loader {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.pagination {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 20px 0;
}
.page {
	padding: 6px 10px;
	margin-right: 10px;
	border: 1px solid #eee;
	color: #fff;
	border-radius: 8px;
	transition: 0.3s;
	cursor: pointer;
}
.page:hover {
	background-color: #102776;
}
</style>
