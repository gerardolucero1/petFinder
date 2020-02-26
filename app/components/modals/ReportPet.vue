<style lang="css" scoped>
	.reporte_field{
		width: 90%;
	}
</style>

<template>
	<StackLayout width="400" height="650" backgroundColor="white">
		<ScrollView height="650">
			<WrapLayout padding="20">
				<StackLayout class="reporte_field" marginTop="10">
					<Label text="Nombre de la colonia" textWrap="true" fontSize="14" fontWeight="bold" />
					<TextField text="" fontSize="14" v-model="report.suburb" />
				</StackLayout>

				<StackLayout class="reporte_field" marginTop="10">
					<Label text="Nombre de la calle (1)" textWrap="true" fontSize="14" fontWeight="bold" />
					<TextField text="" fontSize="14" v-model="report.street_1" />
				</StackLayout>

				<StackLayout class="reporte_field" marginTop="10">
					<Label text="Nombre de la calle (2)" textWrap="true" fontSize="14" fontWeight="bold" />
					<TextField text="" fontSize="14" v-model="report.street_2"  />
				</StackLayout>

				<StackLayout class="reporte_field" marginTop="10">
					<Label text="Hora de extravío" textWrap="true" fontSize="14" fontWeight="bold" />
					<TimePicker v-model="report.hour" />
				</StackLayout>

				<StackLayout class="reporte_field" marginTop="10">
					<Label text="Notas" textWrap="true" fontSize="14" fontWeight="bold" />
					<TextView fontSize="14" v-model="report.notes" height="130" />
				</StackLayout>

				<StackLayout class="reporte_field" marginTop="10">
					<Button backgroundColor="#EC6598" color="white" borderRadius="15" width="70%" text="Reportar" @tap="reportPet" />
				</StackLayout>
			</WrapLayout>
		</ScrollView>
	</StackLayout>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//MOMENT
const moment = require('moment')

//Vuex
import { mapState } from 'vuex'

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
	name: 'ReportPet',

	props:[
        'id'
    ],

	data () {
	    return {
			report: {
				suburb: '',
				street_1: '',
				street_2: '',
				hour: '',
				notes: '',
			}
	    }
	},

	mounted(){
		//this.getPet()
	},

	methods: {
		async reportPet(){
			try {
				//Cargamos la pantalla de espera
				loader.show(options)
				
				Object.defineProperty(this.report, 'idPet', {
					enumerable: true,
					configurable: true,
					writable: true,
					value: this.id
				})

				Object.defineProperty(this.report, 'active', {
					enumerable: true,
					configurable: true,
					writable: true,
					value: true
				})

				let response = await firebase.firestore.collection('reports').add(this.report)

				if(response){
					this.updateStatusPet()
				}
			} catch (e) {
				console.log(e)
			}
		},

		//Firebase
		async updateStatusPet(){
			try{
				let response = await firebase.firestore.collection('pets').doc(this.id)
													.update({ status: 2 })

				if(response){
					loader.hide()
					this.$modal.close()
				}
			}	
			catch(e){
				console.log(e)
			}
		},
	}
}
</script>