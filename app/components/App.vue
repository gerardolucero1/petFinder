<template>
    <Page actionBarHidden="true">
        <StackLayout class="bg-inicio">
            <GridLayout rows="2*, *" justifyContent="center" alignItems="center">
                <Image horizontalAlignment="center" marginTop="100" src="https://cdn.dribbble.com/users/10882/screenshots/2014826/c-flat.png" stretch="none" />
                <StackLayout row="1" >
                    <Button horizontalAlignment="center" backgroundColor="#313E47" borderRadius="20" class="btn-login" text="INICIAR SESION" @tap="goToLogin" />

                    <Button marginTop="20" horizontalAlignment="center" backgroundColor="white" borderRadius="20" class="btn-register" text="REGISTRARSE" @tap="goToRegister" />
                </StackLayout>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
//Pages
import Login from './user/Login.vue'
import Register from './user/Register.vue'

export default {
    name: 'Inicio',
    
    data() {
        return {
            
        }
    },

    methods:{
        goToLogin(){
            this.$navigateTo(Login)
        },

        goToRegister(){
            this.$navigateTo(Register)
        }
    }
}
</script>

<style scoped>
    .bg-inicio{
        width: 100%;
        height: 100%;
        /*background-image: url('https://www.tailit.com/wp-content/uploads/2019/06/Tail-it-pet-cat-1x1.png');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center top;*/
    }

    .btn-login{
        width: 70%;
        font-weight: bold;
        color: white;
        font-family: "Roboto";
    }

    .btn-register{
        width: 70%;
        font-weight: bold;
        color: #51AE81;
        font-family: "Roboto";
    }
</style>
