<template>
	<div class="pagination">
		<div class="page" v-for="page in pages" :key="page">
			{{ page }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'v-pagination',
	data: () => ({
		userPerPage: 5
	}),
	props: {
		arrData: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	computed: {
		pages() {
			return Math.ceil(this.arrData.length / 5);
		}
	}
};
</script>

<style lang="scss" scoped></style>
