<style>
    /*Estilos pagina*/
    .dropDown{
        width: 100%;
    }

    .active{
        background-color: #FAFAFA;
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

                    <!-- Eleccion sexo de mascota -->
                    <GridLayout v-if="view == 2" rows="100, *, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" text="Sexo de tu mascota" />
                        </StackLayout>

                        <GridLayout row="1" columns="*, *" >
                            <StackLayout v-bind:class="[sexo == 'Macho' ? activeClass : '']" horizontalAlignment="center" verticalAlignment="center" row="0" col="0" height="50%" @tap="changeSex('Macho')">
                                <Image width="150" src="https://cdn.icon-icons.com/icons2/1898/PNG/512/male_121077.png" stretch="aspectFit" />
                                <Label fontSize="19" horizontalAlignment="center" text="Macho" />
                            </StackLayout>
                            <StackLayout v-bind:class="[sexo == 'Hembra' ? activeClass : '']" horizontalAlignment="center" verticalAlignment="center" row="0" col="1" height="50%" @tap="changeSex('Hembra')">
                                <Image width="150" src="https://cdn.icon-icons.com/icons2/1898/PNG/512/female_121037.png" stretch="aspectFit" />
                                <Label fontSize="19" horizontalAlignment="center" text="Hembra" />
                            </StackLayout>
                        </GridLayout>

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(1)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(3)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Eleccion edad de mascota -->
                    <GridLayout v-if="view == 3" rows="200, *, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" text="Edad de tu mascota" />
                            <DatePicker width="100%" v-model="selectedDate" :minDate="minDatePicker" :maxDate="maxDatePicker" />
                        </StackLayout>
                        
                        <FlexboxLayout row="1" justifyContent="center" alignItems="center" flexDirection="column">
                            <Label fontSize="22" :text="selectedPet.name" />
                            <Label fontSize="16" marginTop="10" :text="selectedBreed" />
                        </FlexboxLayout>

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(2)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(4)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Eleccion color de mascota -->
                    <GridLayout v-if="view == 4" rows="*, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" text="Color de tu mascota" />

                            <Label horizontalAlignment="center" fontSize="16" marginTop="20" text="Color primario" />
                            <ListPicker v-if="listColorPets.length != 0" fontSize="18" width="100%" :items="listColorPets" @selectedIndexChange="selectedColorOneChanged($event)" />

                            <Label horizontalAlignment="center" fontSize="16" marginTop="20" text="Color secundario" />
                            <ListPicker v-if="listColorPets.length != 0" fontSize="18" width="100%" :items="listColorPets" @selectedIndexChange="selectedColorTwoChanged($event)" />
                        </StackLayout>
                        

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(3)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(5)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Caracteristicas de mascota -->
                    <GridLayout v-if="view == 5" rows="200, *, 60">
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
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(4)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(6)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Eleccion fotos de mascota -->
                    <GridLayout v-if="view == 6" rows="50, *, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" text="Fotos de tu mascota" />
                        </StackLayout>
                        
                        <GridLayout row="1" columns="*" rows="50, *, 100">
                            <FlexboxLayout row="0" justifyContent="space-around" alignItems="center" marginTop="20">
                                <Image width="20" src="https://cdn.icon-icons.com/icons2/906/PNG/512/left-arrow-7_icon-icons.com_70077.png" stretch="aspectFit" @tap="nextPhoto(0)" />

                                <Label fontSize="20" horizontalAlignment="center" :text="photo + '/3'" />

                                <Image width="20" src="https://cdn.icon-icons.com/icons2/906/PNG/512/right-arrow-7_icon-icons.com_69946.png" stretch="aspectFit" @tap="nextPhoto(1)" />
                            </FlexboxLayout>

                            <StackLayout row="1">
                                <Image v-if="photo == 1" :src="photoOne" stretch="aspectFit" />
                                <Image v-if="photo == 2" :src="photoTwo" stretch="aspectFit" />
                                <Image v-if="photo == 3" :src="photoThree" stretch="aspectFit" />
                            </StackLayout>

                            <FlexboxLayout row="2" justifyContent="space-around" alignItems="center">
                                <Image width="60" src="http://getdrawings.com/free-icon/png-camera-icon-55.png" stretch="aspectFit" @tap="takePicture" />
                                <Image width="60" src="https://image.flaticon.com/icons/png/512/1590/1590898.png" stretch="aspectFit" @tap="openGallery" />
                            </FlexboxLayout>
                        </GridLayout>

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(5)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(7)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Nombre de mascota -->
                    <GridLayout v-if="view == 7" rows="*, 60">
                        <StackLayout row="0" padding="10">
                            <Label horizontalAlignment="center" fontSize="20" fontWeight="bold" textWrap="true" textAlignment="center" text="Por ultimo, dinos el nombre de tu mascota" />
                            <TextField width="250" marginTop="20" v-model="namePet" hint="Nombre" maxLength="20" />

                            <TextView marginTop="20" v-model="description" hint="Ingresa una descripcion" maxLength="200" />
                        </StackLayout>

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(6)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(8)" />
                        </FlexboxLayout>
                    </GridLayout>

                    <!-- Resumen de mascota -->
                    <GridLayout v-if="view == 8" rows="80, *, 60">
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
                                    <Label fontSize="17" fontWeight="bold" text="Sexo de tu mascota: " />
                                    <Label fontSize="17" :text="sexo" />
                                </StackLayout>
                                <StackLayout marginTop="10" marginLeft="50" orientation="horizontal">
                                    <Label fontSize="17" fontWeight="bold" text="Fecha de cumpleaños: " />
                                    <Label fontSize="17" :text="formatDate" />
                                </StackLayout>
                                <StackLayout marginTop="10" marginLeft="50" orientation="horizontal">
                                    <Label fontSize="17" fontWeight="bold" text="Color primario: " />
                                    <Label fontSize="17" :text="firstColorPet" />
                                </StackLayout>
                                <StackLayout marginTop="10" marginLeft="50" orientation="horizontal">
                                    <Label fontSize="17" fontWeight="bold" text="Color secundario: " />
                                    <Label fontSize="17" :text="secondColorPet" />
                                </StackLayout>
                                <StackLayout marginTop="10" marginLeft="50">
                                    <Label fontSize="17" fontWeight="bold" text="Lista de caracteristicas: " />
                                    <Label fontSize="15" v-for="(item, index) in features" :key="index" :text="'* ' + item.text" />
                                </StackLayout>
                                <GridLayout marginTop="10" rows="300" columns="*, *, *">
                                    <Image row="0" col="0" :src="photoOne" stretch="aspectFit" />
                                    <Image row="0" col="1" :src="photoTwo" stretch="aspectFit" />
                                    <Image row="0" col="2" :src="photoThree" stretch="aspectFit" />
                                </GridLayout>
                            </WrapLayout>
                        </ScrollView>

                        <FlexboxLayout row="2" justifyContent="center" alignItems="center">
                            <Button color="white" width="150" backgroundColor="#3C495E" text="Regresar" @tap="nextView(7)" />
                            <Button color="white" width="150" backgroundColor="#51AE81" text="Continuar" @tap="nextView(9)" />
                        </FlexboxLayout>
                    </GridLayout>
                    
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

//Vuex
import { mapState } from 'vuex'

//MOMENT
const moment = require('moment')

//CAMERA
const camera = require("nativescript-camera");
const imageModule = require("tns-core-modules/ui/image")

//GALLERY
const imagePicker = require("nativescript-imagepicker")
const context = imagePicker.create({ mode: "single" })

//LOADER
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();

const options = {
    message: 'Cargando...',
    details: 'Esperando respuesta',
    progress: 0.65,
    margin: 10,
    dimBackground: true,
    color: '#51AE81', // color of indicator and labels
    // background box around indicator
    // hideBezel will override this if true
    backgroundColor: 'white',
    userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
    hideBezel: true, // default false, can hide the surrounding bezel
    mode: Mode.Indeterminate, // see options below
    // android: {
    //     view: android.view.View, // Target view to show on top of (Defaults to entire window)
    //     cancelable: true,
    //     cancelListener: function(dialog) {
    //         console.log('Loading cancelled');
    //     }
    // },
    // ios: {
    //     view: UIView // Target view to show on top of (Defaults to entire window)
    // }
};

export default {
    name: 'AddPet',

    components: {

    },

    data() {
        return {
            view: 0,
            activeClass: 'active',
            permissions: false,

            //Tipo mascota
            selectedPet: 0,
            listNamePets: [],
            listPets: [],
            imagePet: '',

            //Raza
            selectedBreed: '',
            imageBreed: '',
            listBreeds: [],

            //SEXO
            sexo: 'Macho',

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

            //Fotos
            photo: 1,
            photoOne: '',
            photoTwo: '',
            photoThree: '',

            //Nombre y descripcion
            namePet: '',
            description: '',

            //Guardar Mascota
            idPet: '',
            controlPhotos: 1,

        }
    },

    created () {
        this.askPermissions()
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
        },

        formatDate(){
            moment.locale('es')
            return moment(this.selectedDate).format('L')
        },

    },

    methods: {
        //Permisos
        askPermissions(){
            camera.requestPermissions().then(
                function success() {
                    console.log('Permisos aceptados')
                    this.permissions = true
                }, 
                function failure() {
                    console.log('Permisos no aceptados')
                    this.permissions = false
                }
            );
        },

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

        goToProfile(){
            this.$navigateTo(Profile, {
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

        selectedColorOneChanged(args){
            this.firstColorPet = this.listColorPets[args.value]
        },

        selectedColorTwoChanged(args){
            this.secondColorPet = this.listColorPets[args.value]
        },

        changeSex(args){
            this.sexo = args
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
                    console.log(args)
                    this.view = args
                    break;
                case 8:
                    console.log(args)
                    this.view = args
                    break;
                case 9:
                    if(this.controlPhotos == 4){
                        return
                    }
                    this.savePet()
                    break;
                default:
                    console.log(args)
                    // code block
                    break;
            }

        },

        //Tomar las fotos
        takePicture(){
            const options = {
                width: 300,
                height: 300,
                keepAspectRatio: false,
                saveToGallery: true
            }

            camera.takePicture(options).then((response) => {
                console.log('Resultado...')

                let image = new imageModule.Image()
                image.src = response
                if(this.photo == 1){
                    this.photoOne = image.src._android
                }else if(this.photo == 2){
                    this.photoTwo = image.src._android
                }else{
                    this.photoThree = image.src._android
                }
                
            }).catch((error) => {
                console.log('Error: ' + error.message)
            })
        },

        //Abrir galeria
        openGallery(){
            context
                .authorize()
                .then(() => {
                    return context.present();
                })
                .then((selection) => {
                    // selection.forEach((selected) => {
                    //     // process the selected image
                    // });
                    let image = new imageModule.Image()
                    image.src = selection
                    if(this.photo == 1){
                        this.photoOne = image.src[0]._android
                    }else if(this.photo == 2){
                        this.photoTwo = image.src[0]._android
                    }else{
                        this.photoThree = image.src[0]._android
                    }
                    
                }).catch((e) => {
                    // process error
                    console.log(e)
                })
        },

        nextPhoto(args){
            if(args == 1){
                if(this.photo == 3){
                    return
                }else{
                   this.photo ++ 
                }
            }else{
                if(this.photo == 1){
                    return
                }else{
                    this.photo --
                }
            }
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
        },

        async savePet(){
            try{
                //Cargamos la pantalla de espera
                loader.show(options)

                let pet = {
                    name: this.namePet,
                    sex: this.sexo,
                    user: this.user.uid,
                    firstColor: this.firstColorPet,
                    secondColor: this.secondColorPet,
                    features: this.features,
                    type: this.selectedPet.name,
                    breed: this.selectedBreed,
                    birthdate: this.selectedDate,
                    description: this.description,
                    status: 1,
                }
                let response = await firebase.firestore.collection('pets').add(pet)
                this.idPet = response.id

                if(response){
                    this.controlUploadPhotos()
                }
            }
            catch(e){

            }
        },

        controlUploadPhotos(){
            if(this.controlPhotos == 1){
                if(this.photoOne !== ''){
                    this.controlPhotos++
                    this.savePetPhotos(this.photoOne)
                }else{
                    this.controlPhotos++
                    this.photoOne = 'https://i.redd.it/s8lk86v3r2m11.png'
                    this.savePetPhotos(this.photoOne)
                }
            }else if(this.controlPhotos == 2){
                if(this.photoTwo !== ''){
                    this.controlPhotos++
                    this.savePetPhotos(this.photoTwo)
                }else{
                    this.controlPhotos++
                    this.photoTwo = 'https://i.redd.it/s8lk86v3r2m11.png'
                    this.savePetPhotos(this.photoTwo)
                }
            }else if(this.controlPhotos == 3){
                if(this.photoThree !== ''){
                    this.controlPhotos++
                    this.savePetPhotos(this.photoThree)
                }else{
                    this.controlPhotos++
                    this.photoThree = 'https://i.redd.it/s8lk86v3r2m11.png'
                    this.savePetPhotos(this.photoThree)
                }
            }else if(this.controlPhotos == 4){
                loader.hide()
                this.goToHome()
                return
            }
        },

        //Generar UUID
        generateUUID(){
            var h=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
            var k=['x','x','x','x','x','x','x','x','-','x','x','x','x','-','4','x','x','x','-','y','x','x','x','-','x','x','x','x','x','x','x','x','x','x','x','x'];
            var u='',i=0,rb=Math.random()*0xffffffff|0;
            while(i++<36) {
                var c=k[i-1],r=rb&0xf,v=c=='x'?r:(r&0x3|0x8);
                u+=(c=='-'||c=='4')?c:h[v];rb=i%8==0?Math.random()*0xffffffff|0:rb>>4
            }
            return u
        },

        //Guardar las fotos
        async savePetPhotos(args){
            try{
                let metadata = {
                    contentType: "multipart/form-data",
                    contentLanguage: "es",
                }

                let fotoId = this.generateUUID()
                // now upload the file with either of the options below:
                firebase.storage.uploadFile({
                // the full path of the file in your Firebase storage (folders will be created)
                remoteFullPath: 'users/' + this.user.uid + '/pets/' + fotoId + '.jpg',
                // option 2: a full file path (ignored if 'localFile' is set)
                localFullPath: args,
                // get notified of file upload progress
                onProgress: (status) => {
                    console.log("Uploaded fraction: " + status.fractionCompleted);
                    console.log("Percentage complete: " + status.percentageCompleted);
                },
                metadata
              }).then((uploadedFile) => {
                    console.log("File uploaded: " + JSON.stringify(uploadedFile))
                    firebase.storage.getDownloadUrl({
                        // the full path of an existing file in your Firebase storage
                        remoteFullPath: 'users/' + this.user.uid + '/pets/' + fotoId + '.jpg'
                    }).then(async (url) => {
                            let data = {
                                image: url,
                                pet: this.idPet 
                            }

                            let response = await firebase.firestore.collection('photos_pet').add(data)
                            if(response){
                                this.controlUploadPhotos()
                            }
                        },
                        (error) => {
                            console.log("Error: " + error);
                        }
                    );
                },
                    (error) => {
                        console.log("File upload error: " + error);
                    }
                );
            }
            catch(e){
                console.log(e)
            }
        }
    }
}
</script>











