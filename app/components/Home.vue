<style>

</style>

<template>
    <Page actionBarHidden="false">
        <Actionbar />

        <RadSideDrawer ref="drawer">
            <!-- Inicia Navbar -->
                <Navbar />
            <!-- Termina Navbar -->

            <GridLayout ~mainContent rows="*, 50" backgroundColor="#FFFFFF">
                <ScrollView row="0">
                    <WrapLayout v-if="pets.length != 0" orientation="vertical">
                        <GridLayout class="" borderWidth="0 0 1 0" borderColor="rgba(218, 218, 218, 1)" marginTop="5" columns="*" rows="80, 300, 70, 50" v-for="(item, index) in pets" :key="index">
                            <!-- Info del dueño -->
                            <FlexboxLayout padding="15" justifyContent="space-between" col="0" row="0">
                                <StackLayout orientation="horizontal">
                                    <Image width="50" borderRadius="100" src="http://i2.wp.com/www.kpopscene.com/wp-content/uploads/2016/05/chaewon-april-04.jpg" stretch="aspectFit" />
                                    <StackLayout orientation="vertical" marginLeft="10">
                                        <Label color="#746767" fontWeight="bold" :text="item.infoUser.name" />
                                        <Label color="#CCC7C7" fontSize="10" fontWeight="bold" :text="item.report | timeAgo" />
                                    </StackLayout>
                                </StackLayout>
                                <StackLayout>
                                    <Button borderRadius="30" height="35" width="65" fontSize="10" fontWeight="bold" backgroundColor="#F07C84" color="white" text="VER" @tap="goToPetProfile(item.id)" />
                                </StackLayout>
                            </FlexboxLayout>
                            
                            <!-- Imagen de la mascota -->
                            <StackLayout marginTop="-5" col="0" row="1" >
                                <Image :src="item.photos[0]" stretch="aspectFill" />
                            </StackLayout>

                            <!-- Info de la mascota -->
                            <StackLayout padding="0 10" marginTop="15" col="0" row="2">
                                <Label fontSize="18" fontWeight="bold" :text="item.name" />
                                <Label color="#746767" fontSize="13" fontWeight="bold" :text="item.description" />
                            </StackLayout>

                            <!-- Detalles de la mascota -->
                            <StackLayout padding="0 10" col="0" row="3">
                                <GridLayout columns="*, *" rows="50">
                                    <FlexboxLayout justifyContent="flex-start" alignItems="center" col="0" row="0">
                                        <!-- Eleccion icono tipo mascota -->
                                            <Label v-if="item.type == 'Perro'" text="" textWrap="true" fontSize="15" color="black" class="font-awesome" />
                                            <Label v-if="item.type == 'Gato'" text="" textWrap="true" fontSize="15" color="black" class="font-awesome" />
                                        <!-- Fin eleccion icono tipo mascota -->
                                        <Label marginLeft="5" fontSize="13" :text="item.breed" horizontalAlignment="center" />
                                    </FlexboxLayout>
                                    <FlexboxLayout justifyContent="space-between" col="1" row="0">
                                        <StackLayout col="1" row="0">
                                            <Image v-if="item.sex == 'Macho'" width="20" src="https://cdn.icon-icons.com/icons2/1898/PNG/512/male_121077.png" stretch="aspectFit" />

                                            <Image v-else width="20" src="https://cdn.icon-icons.com/icons2/1898/PNG/512/female_121037.png" stretch="aspectFit" />
                                            <Label fontSize="13" :text="item.sex" horizontalAlignment="center" />
                                        </StackLayout>

                                        <StackLayout col="2" row="0">
                                            <Image width="20" src="https://image.flaticon.com/icons/png/512/17/17086.png" stretch="aspectFit" />
                                            <Label fontSize="13" :text="item.firstColor" horizontalAlignment="center" />
                                        </StackLayout>
                                        <StackLayout>
                                            <Image width="20" src="https://image.flaticon.com/icons/png/512/30/30571.png" stretch="aspectFit" />
                                            <Label fontSize="13" text="137" horizontalAlignment="center" />
                                        </StackLayout>
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>
                        </GridLayout>
                    </WrapLayout>
                    <FlexboxLayout v-else height="100%" justifyContent="center" alignItems="center">
                        <!-- <Label text="Cargando" /> -->
                        <ActivityIndicator busy="true" />
                    </FlexboxLayout>
                </ScrollView>
                
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
import Report from './Report.vue'
import Home from './Home.vue'

export default {
    name: 'Home',

    components: {

    },

    data() {
        return {
            pets: []
        }
    },

    computed:{
        ...mapState([
                'user'
            ]),
    },

    mounted(){
        this.getPets()
    },

    filters: {
        timeAgo(value){
            moment.locale('es')
            return moment(value).startOf('hour').fromNow();
        },
    },

    methods: {
        goToPetProfile(id){
            this.$navigateTo(Report, {
                props:{
                    id: id,
                },
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        activarSideDrawer(){
            $refs.drawer.nativeView.showDrawer()
        },

        // Obtener a las mascotas del usuario
        async getPets(){
            try{
                let response = firebase.firestore.collection('pets').where('status', '==', 2)
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
                                                

                                                //Usuario
                                                let user = await firebase.firestore.collection('users')
                                                                            .doc(doc.data().user)
                                                                            .get()

                                                Object.defineProperty(doc.data(), 'infoUser', {
                                                    enumerable: true,
                                                    configurable: true,
                                                    writable: true,
                                                    value: user.data()
                                                })

                                                //Fotos
                                                let photosArray = []
                                                let photos = await firebase.firestore.collection('photos_pet')
                                                                        .limit(1)
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
                                            finally{

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














