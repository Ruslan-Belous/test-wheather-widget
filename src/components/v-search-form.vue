<template>
	<div class="search-box-wrapp">
		<form class="search-box" @submit.prevent="getWheather">
			<input type="text" placeholder="Please enter latitude ?" v-model.trim="coords.lat" />
			<input type="text" placeholder="Please enter longitude ?" v-model.trim="coords.lon" />
			<v-button
				class="search-box__btn"
				type="submit"
				:primary="true"
				:disabled="!canSearch"
				:btnTitle="'Get weather'"
				:prependBtnIcon="'magnifying-glass'"
			/>
		</form>
		<v-loader v-if="loadingAddPlace" />
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import VButton from './v-button.vue';
import VLoader from './v-loader.vue';
export default {
	components: { VButton, VLoader },
	name: 'v-search-form',
	data: () => ({
		coords: {
			lat: '',
			lon: ''
		}
	}),
	computed: {
		...mapState(['loadingAddPlace']),
		canSearch() {
			return this.coords.lat && this.coords.lon;
		}
	},
	methods: {
		...mapActions(['getWeatherByLatLon']),
		...mapMutations(['UPDATE_WEATHER', 'SET_LATITUDE', 'SET_LONGITUDE', 'CHANGE_LOADING_ADD_PLACE', 'SET_ERROR']),
		async getWheather() {
			if (this.coords.lat && this.coords) {
				this.SET_ERROR('');
				this.CHANGE_LOADING_ADD_PLACE(true);
				await this.getWeatherByLatLon(this.coords);
				this.CHANGE_LOADING_ADD_PLACE(false);
			}
			this.coords.lat = '';
			this.coords.lon = '';
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
