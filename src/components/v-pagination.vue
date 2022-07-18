<template>
	<div class="pagination">
		<div class="pagination__page" v-for="(page, i) in pages" :key="i" @click="pageClick(page)">
			{{ page }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'v-pagination',
	data: () => ({
		pageNum: 1,
		placePerPage: 2
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
		isPaginationPageVisible() {
			return this.arrData.length > 5;
		},
		pages() {
			return Math.ceil(this.arrData.length / 2);
		}
	},
	methods: {
		pageClick(page) {
			this.pageNum = page;
			this.$emit('page-changed', page);
		}
	}
};
</script>

<style lang="scss" scoped>
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
		border-radius: 8px;
		transition: 0.3s;
		cursor: pointer;
	}
	&__page:hover {
		background-color: #102776;
	}
}
</style>
