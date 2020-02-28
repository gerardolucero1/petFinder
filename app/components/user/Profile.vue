<style scoped>
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
    <Page actionBarHidden="false">
        <Actionbar />

        <RadSideDrawer ref="drawer">
            <!-- Inicia Navbar -->
                <Navbar />
            <!-- Termina Navbar -->

            <GridLayout ~mainContent rows="*, 50" backgroundColor="#FFFFFF">
            	<GridLayout row="0" rows="10, *">
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














