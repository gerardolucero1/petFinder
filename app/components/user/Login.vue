<template>
	<Page actionBarHidden="true">
		<StackLayout class="bg-inicio">
            <GridLayout rows="*, 2*" justifyContent="center" alignItems="center">
                <Image horizontalAlignment="center" src="https://cdn.dribbble.com/users/10882/screenshots/2014826/c-flat.png" stretch="none" />
                <StackLayout row="1" width="80%" backgroundColor="white">
                	<StackLayout>
                		<Label class="txt-login" text="EMAIL" />
                    	<TextField class="input-login" v-model="user.email" />
                	</StackLayout>
                    
					<StackLayout marginTop="20">
                		<Label class="txt-login" text="CONTRASEÑA" />
                    	<TextField class="input-login" v-model="user.password" />
                	</StackLayout>

                	<Label horizontalAlignment="right" fontSize="10" marginTop="10" text="¿OLVIDASTE TU CONTRASEÑA?" />

                	<Button marginTop="20" horizontalAlignment="center" backgroundColor="white" borderRadius="20" class="btn-login" text="INICIAR SESION" @tap="goToHome" />

                	<Label horizontalAlignment="center" fontSize="10" marginTop="20" text="O INICIA SESION CON" />

                	<FlexboxLayout justifyContent="space-between" marginTop="20">
                		<Button backgroundColor="#355C9A" borderRadius="20" class="btn-social" text="Facebook" @tap="loginFacebook" />

                		<Button backgroundColor="#D1412B" borderRadius="20" class="btn-social" text="Google" @tap="loginGoogle" />
                	</FlexboxLayout>

                </StackLayout>
            </GridLayout>
        </StackLayout>
	</Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Pages
import Home from '../Home.vue'

export default {

  	name: 'Login',

	data () {
	    return {
	    	user: {
	    		email: '',
	    		password: ''
	    	}
	    }
	},

	methods:{
        goToHome(){
            this.$navigateTo(Home)
        },

        goToRegister(){
            this.$navigateTo(Register)
        },

        async loginGoogle(){
            try{
                let response = await firebase.login({
                    type: firebase.LoginType.GOOGLE,
                })

                if(response){
                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))

                    let user = {
                        uid: response.uid,
                        name: response.displayName,
                        email: response.additionalUserInfo.profile.email
                    }

                    if(response.additionalUserInfo.isNewUser){

                        firebase.firestore.collection('users').doc(user.uid).set(user)
                    }

                    this.$store.commit('updateUser', user)
                    this.$navigateTo(Home)
                }
            }
            catch(e){
                console.log(e)
            }
        },

        async loginFacebook(){

            try{
                let response = await firebase.login({
                    type: firebase.LoginType.FACEBOOK,
                })

                if(response){
                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))

                    let user = {
                        uid: response.uid,
                        name: response.displayName,
                        email: response.additionalUserInfo.profile.email
                    }

                    if(response.additionalUserInfo.isNewUser){

                        firebase.firestore.collection('users').doc(user.uid).set(user)
                    }

                    this.$store.commit('updateUser', user)
                    this.$navigateTo(Inicio)
                }
            }
            catch(e){
                console.log(e)
            }
        },
        
    }
}
</script>

<style lang="css" scoped>
	.bg-inicio{
        width: 100%;
        height: 100%;
        /*background-image: url('https://www.tailit.com/wp-content/uploads/2019/06/Tail-it-pet-cat-1x1.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center top;*/
    }

    .btn-login{
        width: 100%;
        font-weight: bold;
        color: #51AE81;
        font-family: "Roboto";
    }

    .btn-social{
        width: 40%;
        font-size: 12px;
        font-weight: bold;
        color: white;
        font-family: "Roboto";
    }

    .txt-login{
        font-weight: bold;
        color: #51AE81;
        font-family: "Roboto";
    }

    .input-login{
    	font-size: 14px;
    	border-width: 0 0 1 0;
    	border-color: #51AE81;
    }
</style>