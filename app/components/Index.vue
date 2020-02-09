<template>
	<Page>
		<GridLayout rows="*">
			<Button row="0" text="GO" @tap="goToPage" />
		</GridLayout>
	</Page>
</template>

<script>
	import Page from './user/AddPet.vue'
	export default{
		name: 'Index',

		data(){
			return{

			}
		},

		methods: {
			goToPage(){
				this.$navigateTo(Page)
			}
		}
	}
</script>