<style>
    .card{
        width: 90%;
        margin-bottom: 70px;
        margin-left: 5%;
        margin-top: 30px;
    }

</style>

<template>
    <Page actionBarHidden="true">
        <Actionbar />

        <RadSideDrawer ref="drawer" drawerTransition="ScaleDownPusherTransition">
            <!-- Inicia Navbar -->
                <Navbar />
            <!-- Termina Navbar -->

            <GridLayout ~mainContent rows="*, 50" backgroundColor="#F6F6F6">
                <StackLayout row="0">
                    <TabView :selectedIndex="selectedIndex" tabTextFontSize="25" tabTextColor="black" iosIconRenderingMode="alwaysOriginal">
                        <TabViewItem title="" class="font-awesome">
                            <GridLayout rows="*">
                                <ScrollView row="0">
                                    <WrapLayout v-if="pets.length != 0" orientation="vertical">
                                        <GridLayout class="card" android:borderRadius="10" androidElevation="1" android:backgroundColor="white" padding="15" columns="*" rows="50, 300, 70" v-for="(item, index) in pets" :key="index">
                                            <!-- Info del dueño -->
                                            <FlexboxLayout justifyContent="space-between" col="0" row="0">
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
                                            <StackLayout marginTop="10" borderRadius="20" col="0" row="1">
                                                <Image borderRadius="20" :src="item.photos[0]" stretch="aspectFill" />
                                            </StackLayout>

                                            <!-- Info de la mascota -->
                                            <StackLayout marginTop="15" col="0" row="2">
                                                <Label color="#746767" textAlignment="justify" fontSize="13" fontWeight="bold" textWrap="true" :text="item.description" />
                                            </StackLayout>

                                        </GridLayout>
                                    </WrapLayout>
                                    <FlexboxLayout v-else height="100%" justifyContent="center" alignItems="center">
                                        <!-- <Label text="Cargando" /> -->
                                        <ActivityIndicator busy="true" />
                                    </FlexboxLayout>
                                </ScrollView>
                            </GridLayout>
                        </TabViewItem>
                        <TabViewItem title="" class="font-awesome">
                            <Label text="Content for Tab 2" />
                        </TabViewItem>
                        <TabViewItem title="" class="font-awesome">
                            <Label text="Content for Tab 2" />
                        </TabViewItem>
                        <TabViewItem title="" class="font-awesome">
                            <Label text="Content for Tab 2" />
                        </TabViewItem>
                    </TabView>
                </StackLayout>
                
                
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
            selectedIndex: 0,
            pets: []
        }
    },

    computed:{
        ...mapState([
                'user'
            ]),

        changeTitle(){
            let title = 'PetFinder'

            return title
        }
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
                let response = firebase.firestore.collection('pets')
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














