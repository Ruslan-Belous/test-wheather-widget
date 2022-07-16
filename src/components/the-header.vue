<template>
	<header class="header">
		<div class="header__home container">
			<fa icon="fa-cloud-moon-rain" class="header__logo" />
			<h1><span>W</span>eather widget</h1>
		</div>
	</header>
</template>

<script>
export default {
	name: 'the-header'
};
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: space-between;
	padding: 10px 15px;
	background-color: #2c3d4e;
	box-shadow: 0 0 6px rgba($color: #000000, $alpha: 0.1);
	&__home {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&__logo {
		padding-right: 5px;
		width: 30px;
		height: 20px;
		color: #fff;
	}
	h1 {
		color: #fff;
		font-size: 26px;
		span {
			color: #305bf3;
		}
	}
}
</style>
