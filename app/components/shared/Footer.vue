<style type="text/css">
	.navigation{
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        background-color: white;
        border-width: 1 0 0 0;
        border-color: rgba(218, 218, 218, 1);
        border-radius: 0;
    }

    .btn-navigation{
        width: 90px;
    }
</style>

<template>
	<GridLayout columns="*, *, *, *" rows="60" class="navigation">
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0">
            <Image class="btn-navigation" src="http://simpleicon.com/wp-content/uploads/home-3.png" />
        </FlexboxLayout>
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="1">
            <Image class="btn-navigation" src="http://simpleicon.com/wp-content/uploads/home-3.png" />
        </FlexboxLayout>
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="2">
            <Image class="btn-navigation" src="http://simpleicon.com/wp-content/uploads/home-3.png" />
        </FlexboxLayout>
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="3">
            <Image class="btn-navigation" src="https://cdn0.iconfinder.com/data/icons/rounded-basics/24/rounded__menu-512.png" @tap="$refs.drawer.nativeView.showDrawer()" />
        </FlexboxLayout>
    </GridLayout>
</template>

<script>
	export default{
		name: 'Footer',

		data(){
			return{

			}
		},

		methods: {

		}
	}
</script>





















