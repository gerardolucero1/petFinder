<style type="text/css">
	.fade{
		width: 100%;
		height: 380;
		background: linear-gradient(to top, #F6F6F6, transparent);
	}

	.black-bar{
		width: 100%;
		height: 80;
		background-color: #F6F6F6;
	}

	.box-info{
		width: 90%;
		height: 80;
		border-radius: 25;
		background-color: #FAFAFA;
		color: black;
		font-weight: bold;
	}
</style>

<template>
	<Page actionBarHidden="true" @loaded="navigatingTo($event)" backgroundColor="#F6F6F6" color="white">
		<RadSideDrawer ref="drawer" backgroundColor="#F6F6F6">
            <!-- Inicia Navbar -->
                <Navbar />
            <!-- Termina Navbar -->

            <GridLayout ~mainContent rows="*, 50" backgroundColor="#FFFFFF">
                <GridLayout row="0" rows="80, 300, *">
					<StackLayout row="1" margin="-200 0 0 0">
						<Image v-if="pet != null" id="img" row="1" :src="pet.photos[0]" stretch="aspectFill" />
					</StackLayout>
					<ScrollView row="2" marginTop="-380" @scroll="onScroll($event)">
						<GridLayout rows="380, *">
							<Label row="0" class="fade" />
							<GridLayout row="1" marginTop="10" columns="*" rows="50, *, 100" padding="30">

	                            <FlexboxLayout justifyContent="space-between" col="0" row="0">
	                                <StackLayout orientation="horizontal">
	                                    <Image width="50" borderRadius="100" src="http://i2.wp.com/www.kpopscene.com/wp-content/uploads/2016/05/chaewon-april-04.jpg" stretch="aspectFit" />
	                                    <StackLayout orientation="vertical" marginLeft="10">
	                                        <Label color="#746767" fontWeight="bold" :text="user.name" />
	                                        <Label color="#CCC7C7" fontSize="10" fontWeight="bold" text="Dueño" />
	                                    </StackLayout>
	                                </StackLayout>
	                                <StackLayout>
	                                    <Label v-if="pet != null" marginTop="5" borderRadius="30" fontSize="10" fontWeight="bold" color="#CCC7C7" :text="pet.birthdate | formatDate" />
	                                </StackLayout>
	                            </FlexboxLayout>
								
								<StackLayout v-if="pet != null" row="1">
									<Label marginTop="10" color="#746767" textWrap="true" fontSize="18" :text="pet.description" />
									<Label color="#746767" marginTop="10" text="Caracteristicas:" />
									<Label color="#746767" v-for="(item, index) in pet.features" :key="index" marginTop="10" :text="'• ' + item.text" />
									<WrapLayout marginTop="20">
                                        <GridLayout v-for="(item, index) in pet.photos" :key="index" width="33.333%" height="100" padding="2">
                                            <Image :src="item" stretch="aspectFill" @tap="openGallery" />
                                        </GridLayout>
                                    </WrapLayout>
								
								</StackLayout>
	                            <FlexboxLayout row="2" marginTop="10" justifyContent="space-between" alignItems="center">
	                            	<Button backgroundColor="#212892" color="white" borderRadius="15" width="25%" text="♥" />
	                            	<Button v-if="pet != null && pet.status == 1" backgroundColor="#EC6598" color="white" borderRadius="15" width="70%" text="Reportar" @tap="reportPet" />
	                            	<Button v-else backgroundColor="#EC6598" color="white" borderRadius="15" width="70%" text="Cancelar Reporte" @tap="cancelReport" />
	                            </FlexboxLayout>
	                        </GridLayout>
						</GridLayout>
					</ScrollView>

					<Label row="0" id="blackBar" class="black-bar" marginTop="550" />

					<FlexboxLayout row="0" class="box-info" marginTop="630" id="btnPlay" justifyContent="center" alignItems="center" flexDirection="column" padding="10">
						<Label v-if="pet != null" fontSize="20" fontWeight="bold" color="#746767" :text="pet.name" />
                    	<Label v-if="pet != null" fontSize="13" color="#CCC7C7" marginTop="5" :text="pet.breed" />
					</FlexboxLayout>

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

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//MOMENT
const moment = require('moment')

//Photo Viewer
import { PhotoViewer, PhotoViewerOptions, PaletteType, NYTPhotoItem } from "nativescript-photoviewer"
const photoViewer = new PhotoViewer()

//Vuex
import { mapState } from 'vuex'

//Modals
import ReportPet from './../modals/ReportPet.vue'

export default{
	name: 'PetProfile',

	props:[
        'id'
    ],

	data(){
		return{
			pet: null,
		}
	},

	mounted(){
		this.getPet()
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

		navigatingTo(args){
			const page = args.object.page
			const blackBar = page.getViewById('blackBar')
			blackBar.opacity = 0
		},

		onScroll(args){
			const sv = args.object
			const page = sv.page

			const image = page.getViewById('img')
			const btnPlay = page.getViewById('btnPlay')
			const blackBar = page.getViewById('blackBar')

			console.log(args.scrollY)

			if(args.scrollY < 0){
				const scrollAmt = Math.abs(args.scrollY)
				const scale = (scrollAmt + 300) / 300

				image.scaleX = scale
				image.scaleY = scale
				image.translateY = scrollAmt / 2

				btnPlay.translateY = scrollAmt
				blackBar.translateX = scrollAmt
			}else{
				image.translateY = -1 * args.scrollY

				if(args.scrollY < 300){
					btnPlay.translateY = args.scrollY * -1
					blackBar.translateY = args.scrollY * -1

					if(args.scrollY > 100){
						const opacity = this.scaleFormula(args.scrollY, 200, 380, 0, 1)
						blackBar.opacity = opacity
					}
				}else{
					btnPlay.translateY = -300;
					blackBar.translateY = -300;
					blackBar.opacity = 1
				}
			}
		},

		scaleFormula(current, totalMin, totalMax, scaledMin, scaledMax){
			return (scaledMax - scaledMin) * (current - totalMin) / (totalMax -totalMin) + scaledMin
		},

		//Firebase
		async getPet(){
			try{
				let photosArray = []

				let response = await firebase.firestore.collection('pets')
														.doc(this.id)
														.get()

				let photosPet = await firebase.firestore.collection('photos_pet')
														.where('pet', '==', this.id)
				        								.get()
				        								.then((photosQuery) => {
				        									photosQuery.forEach(doc => {
																photosArray.push(doc.data().image)
				        									})
				        								})

				Object.defineProperty(response.data(), 'photos', {
				  	enumerable: true,
				  	configurable: true,
				  	writable: true,
				  	value: photosArray
				})

				if(response.exists){
					this.pet = response.data()
				}
			}	
			catch(e){
				console.log(e)
			}
		},

		async cancelReport(){
			console.log('hola')
			try {
				let response = await firebase.firestore.collection('reports')
													.where('idPet', '==', this.id)
													.get()

				if(response){
					// console.log(response.id)
					response.forEach(async doc => {
						let updateReport = await firebase.firestore.collection('reports')
																.doc(doc.id)
																.update({ active: false })

						let updatePet = await firebase.firestore.collection('pets')
																.doc(this.id)
																.update({ status: 1 })
						if(updateReport){
							this.pet.status = 1
						}
					})
				}
			} catch (error) {
				
			}
		},

		openGallery(){
            let photoviewerOptions = {
                startIndex: 0,
                android: {
                    paletteType: PaletteType.DarkVibrant,
                    showAlbum: false
                }
            };
            
            photoViewer.showGallery(this.pet.photos, photoviewerOptions);
        },

		reportPet(){
			this.$showModal(ReportPet, {
                props:{
                    id: this.id,
                }
            })
		}
	}
}
</script>





















