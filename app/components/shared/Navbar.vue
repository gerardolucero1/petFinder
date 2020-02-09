<style scoped>
    .drawer-body{
        background: rgb(21,45,60);
        background: -webkit-linear-gradient(bottom, rgba(21,45,60,1) 0%, rgba(24,80,113,1) 64%, rgba(33,99,134,1) 100%);
        background: -o-linear-gradient(bottom, rgba(21,45,60,1) 0%, rgba(24,80,113,1) 64%, rgba(33,99,134,1) 100%);
        background: linear-gradient(to top, rgba(21,45,60,1) 0%, rgba(24,80,113,1) 64%, rgba(33,99,134,1) 100%);
    }

    .drawer-layer{
        background-image: url('https://img.wallpapersafari.com/desktop/1280/1024/14/66/raICAv.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }

    .drawer-header {
        width: 100%;
        height: 20%;
    }

    .drawer-item-container{
        width: 100%;
        padding-left: 100px;
    }

    .drawer-item {
        color: #333333;
        font-size: 16;
        margin-left: 40px;
    }

    .line{
        width: 80%;
        border-width: 1 0 0 0;
        border-color: #1D5A7B;
    }
</style>

<template>
    <GridLayout class="drawer-body" ~drawerContent rows="*, 60">
        <StackLayout row="0">
            <FlexboxLayout height="200" justifyContent="center" alignItems="center" flexDirection="column">
                <Image width="70" borderRadius="100" src="http://i2.wp.com/www.kpopscene.com/wp-content/uploads/2016/05/chaewon-april-04.jpg" />

                <Label color="white" :text="user.name" fontWeight="bold" fontSize="15" />
                <Label color="#5FA5C4" :text="user.email" fontWeight="bold" fontSize="12" />
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" justifyContent="flex-start" alignItems="center">
                <Image width="20" src="https://image.flaticon.com/icons/png/512/64/64572.png" stretch="aspectFit" />
                <Label color="white" fontSize="13" class="drawer-item" text="Mi Perfil"/>
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" marginTop="40" justifyContent="flex-start" alignItems="center">
                <Image width="20" src="https://image.flaticon.com/icons/png/512/30/30571.png" stretch="aspectFit" />
                <Label color="white" fontSize="13" class="drawer-item" text="Mis Matchs"/>
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" marginTop="40" justifyContent="flex-start" alignItems="center">
                <Image width="20" src="https://www.pngrepo.com/download/165203/online-store-shopping-cart.png" stretch="aspectFit" />
                <Label color="white" fontSize="13" class="drawer-item" text="Mi Tienda"/>
            </FlexboxLayout>

            <StackLayout class="line" marginTop="40" />

            <FlexboxLayout class="drawer-item-container" marginTop="40" justifyContent="flex-start" alignItems="center">
                <Image width="20" src="https://icons-for-free.com/iconfiles/png/512/new+plus+icon-1320196808672578110.png" stretch="aspectFit" />
                <Label color="white" fontSize="13" class="drawer-item" text="Agregar Mascota"/>
            </FlexboxLayout>

            <FlexboxLayout class="drawer-item-container" marginTop="40" justifyContent="flex-start" alignItems="center">
                <Image width="20" src="https://image.flaticon.com/icons/png/512/40/40031.png" stretch="aspectFit" />
                <Label color="white" fontSize="13" class="drawer-item" text="Mis Configuraciones"/>
            </FlexboxLayout>
        </StackLayout>

        <FlexboxLayout row="1" justifyContent="center" alignItems="center">
            <Label color="#43809D" fontSize="20" fontWeight="bold" text="PetFinder" />
        </FlexboxLayout>
    </GridLayout>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { mapState } from 'vuex'

//Navbar
import Navbar from './Navbar.vue'

//Pages
import AddPet from '../user/AddPet.vue'

export default {
    name: 'Navbar',

    data() {
        return {
            
        }
    },

    computed:{
        ...mapState([
                'user'
            ]),
    },

    methods:{
        // goToAddPet(){
        //     this.$navigateTo(AddPet)
        // }
    }
}
</script>














