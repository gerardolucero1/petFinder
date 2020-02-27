<style type="text/css">
	/*Estilos Footer*/

    .navigation{
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        border-width: 1 0 0 0;
        border-color: rgba(218, 218, 218, 1);
        border-radius: 20 20 0 0;
    }

    .btn-navigation{
        width: 90px;
    }
</style>

<template>
	<GridLayout columns="*, *, *, *" rows="60" class="navigation" backgroundColor="white">
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0" @tap="goToHome">
            <Label text="" textWrap="true" fontSize="25" color="black" class="font-awesome" />
        </FlexboxLayout>
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="1" @tap="goToInstaPet">
            <Label text="" textWrap="true" fontSize="25" color="black" class="font-awesome" />
        </FlexboxLayout>
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="2">
            <Label text="" textWrap="true" fontSize="25" color="black" class="font-awesome" />
        </FlexboxLayout>
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="3" @tap="$emit('sideDrawer')">
            <Label text="" textWrap="true" fontSize="25" color="black" class="font-awesome" />
        </FlexboxLayout>
    </GridLayout>
</template>

<script>
//Pages
import Home from './../Home.vue'
import InstaPet from './../InstaPet.vue'

export default{
	name: 'Footer',

	data(){
		return{

		}
	},

	methods: {
        goToHome(){
            this.$navigateTo(Home, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToInstaPet(){
            this.$navigateTo(InstaPet, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },
	}
}
</script>





















