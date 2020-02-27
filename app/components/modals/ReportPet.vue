<style lang="css" scoped>
	.reporte_field{
		width: 90%;
	}
</style>

<template>
	<StackLayout width="400" height="650" backgroundColor="white">
		<ScrollView height="650">
			<WrapLayout v-if="view == 1" padding="20">
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
					<Button backgroundColor="#051E34" color="white" borderRadius="15" width="70%" text="Cancelar" marginTop="10" @tap="closeModal" />
				</StackLayout>
			</WrapLayout>

			<WrapLayout v-else>
				<FlexboxLayout width="400" height="650" justifyContent="center" alignItems="center" flexDirection="column">
					<Image width="100" src="https://pngimage.net/wp-content/uploads/2018/06/reporte-png-1.png" stretch="aspectFit" />
					
					<Label text="El reporte ha sido dado de alta" textWrap="true" marginTop="20" />
					<Button backgroundColor="#EC6598" color="white" borderRadius="15" width="70%" text="Aceptar" marginTop="20" @tap="closeModal" />
				</FlexboxLayout>
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
			view: 1,
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
				// loader.show(options)
				
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

				let updateStatus = await firebase.firestore.collection('pets').doc(this.id)
													.update({ status: 2 })

				this.view = 2

			} catch (e) {
				console.log(e)
			}
		},

		closeModal(){
			this.$modal.close()
		}
	}
}
</script>