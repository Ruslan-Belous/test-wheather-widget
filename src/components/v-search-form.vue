<template>
	<div class="search-box-wrapp">
		<form class="search-box" @submit.prevent="getWheather">
			<input type="text" placeholder="Please enter latitude ?" v-model="latitude" />
			<input type="text" placeholder="Please enter longitude ?" v-model="longitude" />
			<v-button
				class="search-box__btn"
				type="submit"
				:primary="true"
				:disabled="!canSearch"
				:btnTitle="'Get weather'"
				:prependBtnIcon="'magnifying-glass'"
			/>
		</form>
		<v-loader :isLoading="isLoading" />
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import VButton from './v-button.vue';
import vLoader from './v-loader.vue';
export default {
	components: { vLoader, VButton },
	name: 'v-search-form',
	data: () => ({
		isLoading: false,
		latitude: '49.2328',
		longitude: '28.481'
	}),
	computed: {
		canSearch() {
			return this.latitude.trim() && this.longitude.trim();
		}
	},
	methods: {
		...mapActions(['getWeatherByLatLon']),
		...mapMutations(['UPDATE_WEATHER', 'SET_LATITUDE', 'SET_LONGITUDE']),
		async getWheather() {
			this.isLoading = true;
			if (this.latitude !== '' && this.longitude !== '') {
				this.SET_LATITUDE(this.latitude);
				this.SET_LONGITUDE(this.longitude);
				await this.getWeatherByLatLon();
			}
			// this.latitude = '';
			// this.longitude = '';
			this.isLoading = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.search-box {
	width: 90%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 15px 0;
	input {
		display: block;
		appearance: none;
		border: none;
		outline: none;
		background: none;
		&::placeholder {
			color: #aaa;
		}
		&[type='text'] {
			width: 100%;
			color: #fff;
			background-color: #496583;
			font-size: 20px;
			text-align: center;
			padding: 10px 15px;
			border-radius: 10px;
			margin-bottom: 15px;
			transition: 0.4s;
		}
		&:focus {
			box-shadow: 0 3px 3px rgba($color: #aaa, $alpha: 0.2);
		}
	}
	&__btn {
		max-width: 300px;
		font-size: 20px;
		text-transform: uppercase;
		transition: 0.4s;
		&:active,
		:hover,
		:focus {
			background-color: #3b8070;
		}
	}
}
</style>
