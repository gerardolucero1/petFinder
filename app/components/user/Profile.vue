<style scoped>
    ActionBar {
        background-color: #51AE81;
        color: #ffffff;
    }

    .header-text{
        color: white;
        font-weight: bold;
        font-size: 18px;
    }

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

    /*Estilos Navbar*/
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
        padding: 30px 0 30px 100px;
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

    /*Estilos Footer*/
    .btn-navigation{
        width: 90px;
    }

    /*Estilos pagina*/

    .search{
		width: 90%;
		background-color: white;
		font-size: 12px;
		padding: 20px;
		margin-top: 40px;
		border-radius: 7px;
    }

    .card{
        width: 90%;
	    margin-left: 5%;
        margin-bottom: 70px;
        margin-top: 30px;
    }

    .image-pet-profile{
    	border-radius: 10 10 10 10;
    }

    .info-pet-profile{
    	border-radius: 0 10 10 0;
    }

</style>

<template>
    <Page actionBarHidden="true">
        <ActionBar>
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="left">
                <Label class="header-text" :text="changeTitle"></Label>
            </StackLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <!-- Inicia Navbar -->
                <Navbar />
            <!-- Termina Navbar -->

            <GridLayout ~mainContent rows="*, 60" backgroundColor="#F6F6F6">
            	<GridLayout row="0" rows="70, *">
            		<StackLayout row="0">
            			<TextField class="search" v-model="search" hint="Buscar aqui" returnKeyType="search"  />
            		</StackLayout>
            		<ScrollView row="1">
	                    <WrapLayout orientation="vertical">
	                        <GridLayout class="card" columns="200, 2*" rows="220" v-for="(item, index) in pets" :key="index" @tap="goToPetProfile(item.id)">
	                            <StackLayout row="0" col="0">
	                            	<Image class="image-pet-profile" :src="item.photos[0]" stretch="aspectFill" />
	                            </StackLayout>
	                            <FlexboxLayout class="info-pet-profile" justifyContent="center" alignItems="flex-start" paddingLeft="10" flexDirection="column" row="0" col="1" marginTop="20" marginBottom="20" androidElevation="3" backgroundColor="white" >
	                            	<FlexboxLayout justifyContent="center" alignItems="flex-start">
                                        <Label fontSize="20" fontWeight="bold" color="#746767" :text="item.name" />
                                        <Label v-if="item.status == 2" marginTop="5" marginLeft="10" fontSize="20" color="red" text="" class="font-awesome" />
                                    </FlexboxLayout>
	                            	<Label fontSize="13" color="#CCC7C7" marginTop="5" :text="item.type" />
	                            	<Label fontSize="13" color="#CCC7C7" marginTop="5" :text="item.breed" />
	                            	<Label fontSize="13" color="#CCC7C7" marginTop="5" :text="item.birthdate | formatDate" />
	                            </FlexboxLayout>
	                        </GridLayout>
	                    </WrapLayout>
	                </ScrollView>
            	</GridLayout>
                
                
                <!-- Inicia Footer -->
                    <StackLayout row="1" orientation="horizontal">
                        <Footer @sideDrawer="$refs.drawer.nativeView.showDrawer()" />
                    </StackLayout>
                <!-- Termina Footer -->
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
//Firebase
const firebase = require("nativescript-plugin-firebase")

//MOMENT
const moment = require('moment')

//Vuex
import { mapState } from 'vuex'

//Pages
import PetProfile from './PetProfile.vue'

export default {
    name: 'Profile',

    components: {

    },

    data() {
        return {
        	//Buscador
        	search: '',

        	//Mascotas
            pets: [],
        }
    },

    mounted(){
    	this.getPets()
    },

    computed:{
        ...mapState([
                'user'
            ]),

        changeTitle(){
            let title = 'PetFinder'

            return title
        },
    },

    filters: {
    	formatDate(value){
            moment.locale('es')
            return moment(value).format('LL')
        },
    },

    methods: {
        //Router
        goToHome(){
            this.$navigateTo(Home, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToAddPet(){
            this.$navigateTo(AddPet, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToPetProfile(id){
            this.$navigateTo(PetProfile, {
                props:{
                    id: id,
                },
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        // Obtener a las mascotas del usuario
        async getPets(){
        	try{
        		let response = firebase.firestore.collection('pets').where('user', '==', this.user.uid)
								    .get()
								    .then((query) => {
								        query.forEach(async doc => {

                                            Object.defineProperty(doc.data(), 'id', {
                                                enumerable: true,
                                                configurable: true,
                                                writable: true,
                                                value: doc.id
                                            })

								        	try{
								        		let photosArray = []
								        		let photos = await firebase.firestore.collection('photos_pet')
								        								.where('pet', '==', doc.id)
								        								.get()
								        								.then((photosQuery) => {
								        									photosQuery.forEach(doc => {
																				photosArray.push(doc.data().image)
								        									})
								        								})

								        		Object.defineProperty(doc.data(), 'photos', {
												  	enumerable: true,
												  	configurable: true,
												  	writable: true,
												  	value: photosArray
												})

								        		this.pets.push(doc.data())
								        	}
								        	catch(e){
								        		console.log(e)
								        	}
								            
								        })
								    })
								    .catch(function(error) {
								        console.log("Error getting documents: ", error)
								    })
        	}
        	catch(e){
        		console.log(e)
        	}
        }
    }
}
</script>














