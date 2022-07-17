<template>
	<div class="wheather-item">
		<div class="wheather-item__name">{{ weatherItemData.name }}, {{ weatherItemData.sys.country }}</div>
		<div class="wheather-details">
			<div class="wheather-details__left-wrapp">
				<div class="wheather-details__desc-temp-wrapp">
					<p class="wheather-details__description">
						{{ getWeatherDesc }}
					</p>
					<p class="wheather-details__temp">{{ getWeatherCurTemp }}°</p>
				</div>
				<div class="wheather-details__icon">
					<img :src="weatherIcon" alt="Weather icon" />
				</div>
			</div>
			<div class="wheather-details__right-wrapp">
				<p class="wheather-details__min-temp"><span>Min:</span> {{ getWeatherMinTemp }} °C</p>
				<p class="wheather-details__max-temp"><span>Max:</span> {{ getWeatherMaxTemp }} °C</p>
			</div>
		</div>
		<div class="wheather-details-footer">
			<div class="wheather-details-footer__wind-wrapp">
				<img class="icon" :src="windIcon" alt="Wind icon" />
				<p>{{ getWeatherSpeed }} km/h</p>
			</div>
			<div class="wheather-details-footer__humidity-wrapp">
				<img class="icon" :src="humidityIcon" alt="Wind icon" />
				<p>{{ getWeatherHumidity }} %</p>
			</div>
			<div class="wheather-details-footer__pressure-wrapp">
				<img class="icon" :src="pressureIcon" alt="Wind icon" />
				<p>{{ getWeatherPressure }} mb</p>
			</div>
		</div>
		<v-button class="wheather-item__btn" v-if="isBtnVisible" :btnTitle="'Delete'" @click="deletePlace" />
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import windIcon from '../assets/images/wind.png';
import humidityIcon from '../assets/images/humidity.png';
import pressureIcon from '../assets/images/pressure.png';
import vButton from './v-button.vue';
export default {
	components: { vButton },
	name: 'v-wheather-item',
	props: {
		weatherItemData: {
			type: Object,
			default() {
				return {};
			}
		},
		isBtnVisible: {
			type: Boolean,
			default: false
		},
		isActiveCard: {
			type: String,
			default: ''
		}
	},
	data: () => ({
		windIcon,
		humidityIcon,
		pressureIcon
	}),
	computed: {
		...mapGetters(['weatherIcon']),

		getWeatherDesc() {
			return this.weatherItemData.weather[0].description;
		},
		getWeatherCurTemp() {
			return Math.trunc(this.weatherItemData.main.temp);
		},
		getWeatherMinTemp() {
			return Math.trunc(this.weatherItemData.main.temp_min);
		},
		getWeatherMaxTemp() {
			return Math.trunc(this.weatherItemData.main.temp_max);
		},
		getWeatherSpeed() {
			return this.weatherItemData.wind.speed;
		},
		getWeatherHumidity() {
			return this.weatherItemData.main.humidity;
		},
		getWeatherPressure() {
			return this.weatherItemData.main.pressure;
		}
	},
	methods: {
		...mapMutations(['UPDATE_WEATHER', 'ADD_NEW_DATA', 'CHANGE_LOADING', 'DELETE_PLACE']),
		...mapActions(['getWeatherByLatLon']),
		addCard() {
			console.log(1);
			this.ADD_NEW_DATA(this.weatherItemData);
		},
		deletePlace() {
			this.DELETE_PLACE(this.weatherItemData.id);
		}
	}
};
</script>

<style lang="scss" scoped>
.wheather-item {
	width: 90%;
	height: 270px;
	position: relative;
	margin: 40px auto;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	background-color: #496583;
	border-radius: 20px;
	box-shadow: 2px 2px 10px #2c3d4e;
	&__name {
		font: 700 30px/30px 'Fira Sans', sans-serif;
		color: #fff;
		text-shadow: 4px 2px 2px #000;
		text-align: center;
		font-style: italic;
	}
	.wheather-details {
		display: flex;
		justify-content: space-between;
		width: 100%;
		&__left-wrapp,
		&__right-wrapp {
			display: flex;
			justify-content: center;
		}
		&__right-wrapp {
			flex-direction: column;
			justify-content: space-around;
		}
		&__desc-temp-wrapp {
			display: flex;
			flex-direction: column;
			font: 300 18px/18px 'Fira Sans', sans-serif;
			align-items: center;
			justify-content: center;
			color: #eee;
			p {
				padding: 10px 0;
			}
		}
		&__icon {
			img {
				width: 90px;
				height: 90px;
			}
		}
		&__description {
			text-transform: capitalize;
		}
		&__temp {
			font-size: 52px;
			font-weight: 500;
		}
		&__min-temp,
		&__max-temp {
			font: 300 18px/18px 'Fira Sans', sans-serif;
			color: #eee;
			span {
				font-style: italic;
			}
		}
	}
	.wheather-details-footer {
		display: flex;
		justify-content: space-evenly;
		&__wind-wrapp,
		&__humidity-wrapp,
		&__pressure-wrapp {
			display: flex;
			flex-direction: column;
			align-items: center;
			p {
				padding: 10px;
				color: #fff;
			}
		}
	}
	&__btn {
		padding: 8px 16px;
		max-width: 90px;
		position: absolute;
		top: 255px;
		left: 242px;
		background-color: #102776;
		box-shadow: 0 0 2px #102776;
	}
	&:last-of-type {
		margin-bottom: 50px;
	}
}
.icon {
	width: 30px;
	height: 30px;
}
</style>
