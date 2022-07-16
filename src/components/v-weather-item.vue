<template>
	<div class="wheather-item">
		<div class="wheather-item__name">{{ weatherDetail.name }}, {{ weatherDetail.sys.country }}</div>
		<div class="wheather-details">
			<div class="wheather-details__left-wrapp">
				<div class="wheather-details__desc-temp-wrapp">
					<p class="wheather-details__description">
						{{ getWeatherDesc }}
					</p>
					<p class="wheather-details__temp">{{ getWeatherCurTemp }} °</p>
				</div>
				<div class="wheather-details__icon">
					<img :src="getWeatherIcon" alt="Weather icon" />
				</div>
			</div>
			<div class="wheather-details__right-wrapp">
				<p class="wheather-details__min-temp"><span>Min:</span> {{ getWeatherMinTemp }} °C</p>
				<p class="wheather-details__max-temp"><span>Max:</span> {{ getWeatherMaxTemp }} °C</p>
				<!-- <p class="wheather-details__max-temp">HOURS : {{ getWeatherHours }}</p> -->
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
		<button @click="addCard">add card</button>
	</div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import windIcon from '../assets/images/wind.png';
import humidityIcon from '../assets/images/humidity.png';
import pressureIcon from '../assets/images/pressure.png';
export default {
	name: 'v-wheather-item',
	props: {
		wheather_item_data: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data: () => ({
		windIcon,
		humidityIcon,
		pressureIcon
	}),
	mounted() {},
	computed: {
		...mapState(['weatherDetail']),
		getWeatherIcon() {
			return this.weatherDetail.weather[0].icon;
		},
		getWeatherDesc() {
			return this.weatherDetail.weather[0].description;
		},
		getWeatherCurTemp() {
			return Math.trunc(this.weatherDetail.main.temp);
		},
		getWeatherMinTemp() {
			return Math.trunc(this.weatherDetail.main.temp_min);
		},
		getWeatherMaxTemp() {
			return Math.trunc(this.weatherDetail.main.temp_max);
		},
		getWeatherSpeed() {
			return this.weatherDetail.wind.speed;
		},
		getWeatherHumidity() {
			return this.weatherDetail.main.humidity;
		},
		getWeatherPressure() {
			return this.weatherDetail.main.pressure;
		}
	},
	methods: {
		...mapMutations(['UPDATE_WEATHER', 'ADD_NEW_DATA']),
		...mapActions(['getWeatherByLatLon']),
		addCard() {
			console.log(1);
			this.ADD_NEW_DATA(this.weatherDetail);
		}
	}
};
</script>

<style lang="scss" scoped>
.wheather-item {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	margin: 20px auto;
	width: 90%;
	height: 300px;
	position: relative;
	background-color: #496583;
	margin-bottom: 20px;
	padding: 10px;
	border-radius: 20px;
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
}
.icon {
	width: 30px;
	height: 30px;
}
</style>
