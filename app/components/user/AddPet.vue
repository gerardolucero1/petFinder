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

    .card{
        width: 90%;
        margin-bottom: 70px;
        margin-left: 5%;
        margin-top: 30px;
    }
    
    /*Estilos pagina*/
    .dropDown{
        width: 100%;
    }

</style>

<template>
    <Page>
        <ActionBar>
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="left">
                <Label class="header-text" :text="changeTitle"></Label>
            </StackLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <!-- Inicia Navbar -->
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

                        <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center">
                            <Image width="20" src="https://image.flaticon.com/icons/png/512/30/30571.png" stretch="aspectFit" />
                            <Label color="white" fontSize="13" class="drawer-item" text="Mis Matchs"/>
                        </FlexboxLayout>

                        <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center">
                            <Image width="20" src="https://www.pngrepo.com/download/165203/online-store-shopping-cart.png" stretch="aspectFit" />
                            <Label color="white" fontSize="13" class="drawer-item" text="Mi Tienda"/>
                        </FlexboxLayout>

                        <StackLayout class="line" marginTop="20" />

                        <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center">
                            <Image width="20" src="https://icons-for-free.com/iconfiles/png/512/new+plus+icon-1320196808672578110.png" stretch="aspectFit" />
                            <Label color="white" fontSize="13" class="drawer-item" text="Agregar Mascota"/>
                        </FlexboxLayout>

                        <FlexboxLayout class="drawer-item-container" marginTop="20" justifyContent="flex-start" alignItems="center">
                            <Image width="20" src="https://image.flaticon.com/icons/png/512/40/40031.png" stretch="aspectFit" />
                            <Label color="white" fontSize="13" class="drawer-item" text="Mis Configuraciones"/>
                        </FlexboxLayout>
                    </StackLayout>

                    <FlexboxLayout row="1" justifyContent="center" alignItems="center">
                        <Label color="#43809D" fontSize="20" fontWeight="bold" text="PetFinder" />
                    </FlexboxLayout>
                </GridLayout>
            <!-- Termina Navbar -->

            <GridLayout ~mainContent rows="*, 60">
                <StackLayout row="0">
                    <!-- Eleccion tipo de mascota -->
                    <GridLayout v-if="view == 0" rows="200, *, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" text="Tipo de mascota" />
                            <ListPicker v-if="listNamePets.length != 0" fontSize="18" width="100%" :items="listNamePets" @selectedIndexChange="selectedPetChange($event)" />
                        </StackLayout>

                        <StackLayout row="1">
                            <Image :src="imagePet" stretch="aspectFit" />
                        </StackLayout>

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(1)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Eleccion raza de mascota -->
                    <GridLayout v-if="view == 1" rows="200, *, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" text="Raza de tu mascota" />
                            <ListPicker v-if="listBreeds.length != 0" fontSize="18" width="100%" :items="listBreeds" @selectedIndexChange="selectedBreedChange($event)" />
                        </StackLayout>

                        <StackLayout row="1">
                            <Image :src="imageBreed" stretch="aspectFit" />
                        </StackLayout>

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(0)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(2)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Eleccion edad de mascota -->
                    <GridLayout v-if="view == 2" rows="200, *, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" text="Edad de tu mascota" />
                            <DatePicker width="100%" v-model="selectedDate" :minDate="minDatePicker" :maxDate="maxDatePicker" />
                        </StackLayout>
                        
                        <FlexboxLayout row="1" justifyContent="center" alignItems="center" flexDirection="column">
                            <Label fontSize="22" :text="selectedPet.name" />
                            <Label fontSize="16" marginTop="10" :text="selectedBreed" />
                        </FlexboxLayout>

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(1)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(3)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Eleccion color de mascota -->
                    <GridLayout v-if="view == 3" rows="*, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" text="Color de tu mascota" />

                            <Label horizontalAlignment="center" fontSize="16" marginTop="20" text="Color primario" />
                            <ListPicker v-if="listColorPets.length != 0" fontSize="18" width="100%" :items="listColorPets" v-model="firstColorPet" />

                            <Label horizontalAlignment="center" fontSize="16" marginTop="20" text="Color secundario" />
                            <ListPicker v-if="listColorPets.length != 0" fontSize="18" width="100%" :items="listColorPets" v-model="secondColorPet" />
                        </StackLayout>
                        

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(2)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(4)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Caracteristicas de mascota -->
                    <GridLayout v-if="view == 4" rows="200, *, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" text="Caracteristicas de tu mascota" />

                            <TextField marginTop="10" width="100" textAlign="center" keyboardType="number" v-model="numberFeatures" />
                            <Button color="white" width="150" backgroundColor="#3C495E" text="+" @tap="addFeature" />
                        </StackLayout>
                        
                        <FlexboxLayout row="1" justifyContent="center" alignItems="center" flexDirection="column">
                            <GridLayout rows="60, *">
                                <StackLayout row="0">
                                    <label fontSize="13" marginBottom="10" textAlignment="center" text="Ingresa las caracteristicas de tu mascota, intenta ser lo mas breve posible, hasta un maximo de 5" textWrap="true" />
                                </StackLayout>

                                <ScrollView row="1">
                                    <WrapLayout>
                                        <FlexboxLayout width="100%" justifyContent="center" alignItems="center" v-for="(item, index) in features" :key="index">
                                            <label  :text="item.number" />
                                            <TextField marginLeft="10" width="250" v-model="item.text" />
                                        </FlexboxLayout>
                                    </WrapLayout>
                                </ScrollView>
                            </GridLayout>
                            
                        </FlexboxLayout>

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(3)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(5)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Nombre de mascota -->
                    <GridLayout v-if="view == 5" rows="*, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" textWrap="true" textAlignment="center" text="Por ultimo, dinos el nombre de tu mascota" />
                            <TextField width="250" marginTop="20" v-model="namePet" />
                        </StackLayout>
                        

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(4)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(6)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Resumen de mascota -->
                    <GridLayout v-if="view == 6" rows="80, *, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" textWrap="true" textAlignment="center" :text="'Este es el resumen de ' + namePet + ' ¿Es correcto?'" />
                        </StackLayout>
                        
                        <ScrollView row="1">
                            <WrapLayout>
                                <StackLayout marginTop="10" marginLeft="50" orientation="horizontal">
                                    <Label fontSize="17" fontWeight="bold" text="Tipo de mascota: " />
                                    <Label fontSize="17" :text="selectedPet.name" />
                                </StackLayout>
                                <StackLayout marginTop="10" marginLeft="50" orientation="horizontal">
                                    <Label fontSize="17" fontWeight="bold" text="Raza de tu mascota: " />
                                    <Label fontSize="17" :text="selectedBreed" />
                                </StackLayout>
                                <StackLayout marginTop="10" marginLeft="50" orientation="horizontal">
                                    <Label fontSize="17" fontWeight="bold" text="Fecha de cumpleaños: " />
                                    <Label fontSize="17" :text="selectedDate | formatDate" />
                                </StackLayout>
                                <StackLayout marginTop="10" marginLeft="50" orientation="horizontal">
                                    <Label fontSize="17" fontWeight="bold" text="Color primario: " />
                                    <Label fontSize="17" :text="firstColorPet" />
                                </StackLayout>
                                <StackLayout marginTop="10" marginLeft="50" orientation="horizontal">
                                    <Label fontSize="17" fontWeight="bold" text="Color secundario: " />
                                    <Label fontSize="17" :text="secondColorPet" />
                                </StackLayout>
                                <StackLayout marginTop="10" marginLeft="50" orientation="horizontal">
                                    <Label fontSize="17" fontWeight="bold" text="Lista de caracteristicas: " />
                                </StackLayout>
                                <StackLayout marginTop="10" marginLeft="60" orientation="horizontal" v-for="(item, index) in features" :key="index">
                                    <Label fontSize="10" marginTop="5" text="◆ " />
                                    <Label fontSize="17" :text="item.text" />
                                </StackLayout>
                            </WrapLayout>
                        </ScrollView>

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(5)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(7)" />
                        </FlexboxLayout>
                    </GridLayout>
                    
                </StackLayout>
                
                <!-- Inicia Footer -->
                <StackLayout row="1" orientation="horizontal">
                    <GridLayout columns="*, *, *, *" rows="60" class="navigation">
                        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0" @tap="goToHome">
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
                </StackLayout>
                <!-- Termina Footer -->
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { mapState } from 'vuex'

//Pages
import AddPet from './AddPet.vue'
import Home from '../Home.vue'

export default {
    name: 'AddPet',

    components: {

    },

    data() {
        return {
            view: 0,

            //Tipo mascota
            selectedPet: 0,
            listNamePets: [],
            listPets: [],
            imagePet: '',

            //Raza
            selectedBreed: '',
            imageBreed: '',
            listBreeds: [],

            //Edad
            selectedDate: '',

            //Color
            listColorPets: ['Cafe', 'Negro', 'Blanco', 'Cobre', 'Gris'],
            firstColorPet: '',
            secondColorPet: '',

            //Caracteristicas
            features: [],
            numberFeatures: 0,
            feature: {
                number: '',
                text: ''
            },

            //Nombre
            namePet: '',

        }
    },

    created () {
        this.getTypePets()
    },

    computed:{
        ...mapState([
                'user'
            ]),

        changeTitle(){
            let title = 'PetFinder'

            return title
        },

        minDatePicker(){
            return new Date(1995, 0, 1)
        },

        maxDatePicker(){
            return new Date()
        }
    },

    filter: {
        formatDate(args){
            return args
        }
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

        selectedPetChange(args){
            this.selectedPet = this.listPets[args.value]
            this.getPetImage()
        },

        selectedBreedChange(args){
            this.selectedBreed = this.listBreeds[args.value]
            this.getBreedImage()
        },

        nextView(args){
            switch(args) {
                case 0:
                    console.log(args)
                    this.view = args
                    this.selectedBreed = ''
                    this.imageBreed = ''
                    break;
                case 1:
                    console.log(args)
                    this.view = args
                    this.getBreedsPet()
                    break;
                case 2:
                    console.log(args)
                    this.view = args
                    break;
                case 3:
                    console.log(args)
                    this.view = args
                    break;
                case 4:
                    console.log(args)
                    this.view = args
                    break;
                case 5:
                    console.log(args)
                    this.view = args
                    break;
                case 6:
                    console.log(args)
                    this.view = args
                    break;
                case 7:
                    alert('Mascota guardada')
                    break;
                default:
                    console.log(args)
                    // code block
                    break;
            }

        },

        demo(){
            console.log('Hola mundo')
        },

        //Firebase
        async getTypePets(){
            try{
                let response = await firebase.firestore.collection('type_pets')
                                                        .get()
                                                        .then(query => {
                                                            query.forEach(doc => {
                                                                let pet = {
                                                                    id: doc.id,
                                                                    name: doc.data().name
                                                                };

                                                                this.listPets.push(pet);
                                                                this.listNamePets.push(doc.data().name);
                                                            })
                                                        })
            }
            catch(e){
                console.log(e)
            }
        },

        async getPetImage(){
            try{
                let response = await firebase.firestore.collection('images_type_pets')
                                                        .doc(this.selectedPet.id)
                                                        .get()
                if(response.exists){
                    console.log(response.data())
                    this.imagePet = response.data().image
                }
            }
            catch(e){
                console.log(e)
            }
        },

        async getBreedImage(){
            try{
                let response = await firebase.firestore.collection('images_type_breeds')
                                                        .doc(this.selectedBreed)
                                                        .get()
                if(response.exists){
                    this.imageBreed = response.data().image
                }
            }
            catch(e){
                console.log(e)
            }
        },

        async getBreedsPet(){
            try{
                let response = await firebase.firestore.collection('breed_pets')
                                                        .doc(this.selectedPet.id)
                                                        .get()

                if(response.exists){
                    this.listBreeds = response.data().breeds
                }
            }
            catch(e){
                console.log(e)
            }
        },

        addFeature(){
            if(this.numberFeatures > 5){
                return
            }

            this.features = []

            let control = 0;
            while(control < this.numberFeatures){
                let feature = JSON.parse( JSON.stringify(this.feature) );
                feature = {
                    number: control + 1,
                    text: '',
                }
                this.features.push(feature);
                control++;
            }

            this.numberFeatures = '';
        }
    }
}
</script>











