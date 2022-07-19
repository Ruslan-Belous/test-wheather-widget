<template>
	<main class="main-container container">
		<v-loader class="loader" v-if="loadingCurPlace" />
		<div v-else>
			<v-weather-item :weatherItemData="weatherDetail" :isActiveCard="true" />
			<v-search-form />
			<p class="error">{{ error }}</p>
			<v-weather-item v-for="place in paginatedPlaces" :key="place.id" :weatherItemData="place" :isBtnVisible="true" />
			<div class="pagination" v-if="isPaginationPageVisible">
				<div
					class="pagination__page"
					v-for="(page, i) in pages"
					:key="i"
					@click="pageClick(page)"
					:class="{ 'pagination__active-page': page === pageNum }"
				>
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
import VScrollUp from './v-scroll-up.vue';
import VPagination from './v-pagination.vue';

export default {
	components: { VSearchForm, VWeatherItem, VLoader, VScrollUp, VPagination },
	name: 'v-main-container',
	data: () => ({
		loadingCurPlace: true,
		placesPerPage: 5,
		pageNum: 1
	}),
	async mounted() {
		const success = async (position) => {
			const coords = {
				lat: position.coords.latitude,
				lon: position.coords.longitude
				// 	lat: 49.2064,
				// lon: 28.3775
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
		...mapState(['places', 'weatherDetail', 'error']),
		pages() {
			return Math.ceil(this.places.length / 5);
		},
		isPaginationPageVisible() {
			return this.places.length > 5;
		},
		paginatedPlaces() {
			let from = (this.pageNum - 1) * this.placesPerPage;
			let to = from + this.placesPerPage;
			return this.places.slice(from, to);
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
}
.loader {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}
.error {
	text-align: center;
	color: tomato;
	font-size: 18px;
	padding: 10px;
}
.pagination {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin: 20px 0;
	&__page {
		padding: 6px 10px;
		margin-right: 10px;
		border: 1px solid #eee;
		color: #fff;
		border-radius: 50%;
		transition: 0.3s;
		cursor: pointer;
	}
	&__page:hover {
		background-color: #102776;
	}
	&__active-page {
		background-color: #102776;
	}
}
</style>
