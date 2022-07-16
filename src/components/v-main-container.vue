<template>
	<main class="main-container container">
		<v-weather-item />
		<v-search-form />
	</main>
</template>

<script>
import VSearchForm from './v-search-form.vue';
import VWeatherItem from './v-weather-item.vue';

export default {
	components: { VSearchForm, VWeatherItem },
	name: 'v-main-container'
};
</script>

<style lang="scss" scoped>
.main-container {
	flex: 1 1 auto;
}
</style>
