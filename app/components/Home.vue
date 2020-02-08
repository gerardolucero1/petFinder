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
        padding-left: 100px;
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

    .btn-navigation{
        width: 90px;
    }

    .card{
        width: 90%;
        margin-bottom: 70px;
        margin-left: 5%;
        margin-top: 30px;
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
            <Navbar />
            <!-- <GridLayout class="drawer-body" ~drawerContent rows="*, 60">
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

                    <FlexboxLayout class="drawer-item-container" marginTop="40" justifyContent="flex-start" alignItems="center">
                        <Image width="20" src="https://image.flaticon.com/icons/png/512/30/30571.png" stretch="aspectFit" />
                        <Label color="white" fontSize="13" class="drawer-item" text="Mis Matchs"/>
                    </FlexboxLayout>

                    <FlexboxLayout class="drawer-item-container" marginTop="40" justifyContent="flex-start" alignItems="center">
                        <Image width="20" src="https://www.pngrepo.com/download/165203/online-store-shopping-cart.png" stretch="aspectFit" />
                        <Label color="white" fontSize="13" class="drawer-item" text="Mi Tienda"/>
                    </FlexboxLayout>

                    <StackLayout class="line" marginTop="40" />

                    <FlexboxLayout class="drawer-item-container" marginTop="40" justifyContent="flex-start" alignItems="center">
                        <Image width="20" src="https://icons-for-free.com/iconfiles/png/512/new+plus+icon-1320196808672578110.png" stretch="aspectFit" />
                        <Label color="white" fontSize="13" class="drawer-item" text="Agregar Mascota"/>
                    </FlexboxLayout>

                    <FlexboxLayout class="drawer-item-container" marginTop="40" justifyContent="flex-start" alignItems="center">
                        <Image width="20" src="https://image.flaticon.com/icons/png/512/40/40031.png" stretch="aspectFit" />
                        <Label color="white" fontSize="13" class="drawer-item" text="Mis Configuraciones"/>
                    </FlexboxLayout>
                </StackLayout>

                <FlexboxLayout row="1" justifyContent="center" alignItems="center">
                    <Label color="#43809D" fontSize="20" fontWeight="bold" text="PetFinder" />
                </FlexboxLayout>
            </GridLayout> -->

            <GridLayout ~mainContent rows="*, 60">
                <ScrollView row="0">
                    <WrapLayout orientation="vertical">
                        <GridLayout class="card" columns="*" rows="50, 300, 70, 50">
                            <FlexboxLayout justifyContent="space-between" col="0" row="0">
                                <StackLayout orientation="horizontal">
                                    <Image width="50" borderRadius="100" src="http://i2.wp.com/www.kpopscene.com/wp-content/uploads/2016/05/chaewon-april-04.jpg" stretch="aspectFit" />
                                    <StackLayout orientation="vertical" marginLeft="10">
                                        <Label color="#746767" fontWeight="bold" text="Jazmin Rodriguez" />
                                        <Label color="#CCC7C7" fontSize="10" fontWeight="bold" text="12 min ago" />
                                    </StackLayout>
                                </StackLayout>
                                <StackLayout>
                                    <Button borderRadius="30" height="35" width="65" fontSize="10" fontWeight="bold" backgroundColor="#F07C84" color="white" text="VER" />
                                </StackLayout>
                            </FlexboxLayout>

                            <StackLayout marginTop="10" borderRadius="20" col="0" row="1">
                                <Image borderRadius="20" src="https://www.elimparcial.com/__export/1562252758517/sites/elimparcial/img/2019/07/04/perro_1.jpg_1359985867.jpg" stretch="aspectFill" />
                            </StackLayout>
                            <StackLayout marginTop="15" col="0" row="2">
                                <Label fontSize="18" fontWeight="bold" text="Sr. Puchito" />
                                <Label color="#746767" fontSize="13" fontWeight="bold" text="Lorem ipsum dolor sit amet, consectetur..." />
                            </StackLayout>
                            <StackLayout col="0" row="3">
                                <GridLayout columns="*, *" rows="50">
                                    <FlexboxLayout justifyContent="flex-start" alignItems="center" col="0" row="0">
                                        <Image width="20" src="https://image.flaticon.com/icons/png/512/91/91544.png" stretch="aspectFit" />
                                        <Label marginLeft="5" fontSize="13" text="Golden retriever" horizontalAlignment="center" />
                                    </FlexboxLayout>
                                    <FlexboxLayout justifyContent="space-between" col="1" row="0">
                                        <StackLayout col="1" row="0">
                                            <Image width="20" src="https://image.flaticon.com/icons/png/512/31/31370.png" stretch="aspectFit" />
                                            <Label fontSize="13" text="3" horizontalAlignment="center" />
                                        </StackLayout>

                                        <StackLayout col="2" row="0">
                                            <Image width="20" src="https://image.flaticon.com/icons/png/512/17/17086.png" stretch="aspectFit" />
                                            <Label fontSize="13" text="Blanco" horizontalAlignment="center" />
                                        </StackLayout>
                                        <StackLayout>
                                            <Image width="20" src="https://image.flaticon.com/icons/png/512/30/30571.png" stretch="aspectFit" />
                                            <Label fontSize="13" text="137" horizontalAlignment="center" />
                                        </StackLayout>
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>
                        </GridLayout>

                        <GridLayout class="card" columns="*" rows="50, 300, 70, 50">
                            <FlexboxLayout justifyContent="space-between" col="0" row="0">
                                <StackLayout orientation="horizontal">
                                    <Image width="50" borderRadius="100" src="https://66.media.tumblr.com/98ec4fed86b25db7fa9fd6acf0a50cc8/tumblr_presetYqo51xg1rzto1_250.png" stretch="aspectFit" />
                                    <StackLayout orientation="vertical" marginLeft="10">
                                        <Label color="#746767" fontWeight="bold" text="Perla Garcia Soto" />
                                        <Label color="#CCC7C7" fontSize="10" fontWeight="bold" text="40 min ago" />
                                    </StackLayout>
                                </StackLayout>
                                <StackLayout>
                                    <Button borderRadius="30" height="35" width="65" fontSize="10" fontWeight="bold" backgroundColor="#F07C84" color="white" text="VER" />
                                </StackLayout>
                            </FlexboxLayout>

                            <StackLayout marginTop="10" borderRadius="20" col="0" row="1">
                                <Image borderRadius="20" src="https://www.fundacion-affinity.org/sites/default/files/el-gato-necesita-tener-acceso-al-exterior.jpg" stretch="aspectFill" />
                            </StackLayout>
                            <StackLayout marginTop="15" col="0" row="2">
                                <Label fontSize="18" fontWeight="bold" text="Bigotes pintos" />
                                <Label color="#746767" fontSize="13" fontWeight="bold" text="Lorem ipsum dolor sit amet, consectetur..." />
                            </StackLayout>
                            <StackLayout col="0" row="3">
                                <GridLayout columns="*, *" rows="50">
                                    <FlexboxLayout justifyContent="flex-start" alignItems="center" col="0" row="0">
                                        <Image width="20" src="https://images.vexels.com/media/users/3/149745/isolated/preview/72a885d2b9f3d7704dc27cffa3f8d89b-icono-plano-de-la-estatua-del-gato-egipcio-by-vexels.png" stretch="aspectFit" />
                                        <Label marginLeft="5" fontSize="13" text="Bombay" horizontalAlignment="center" />
                                    </FlexboxLayout>
                                    <FlexboxLayout justifyContent="space-between" col="1" row="0">
                                        <StackLayout col="1" row="0">
                                            <Image width="20" src="https://image.flaticon.com/icons/png/512/31/31370.png" stretch="aspectFit" />
                                            <Label fontSize="13" text="2" horizontalAlignment="center" />
                                        </StackLayout>

                                        <StackLayout col="2" row="0">
                                            <Image width="20" src="https://image.flaticon.com/icons/png/512/17/17086.png" stretch="aspectFit" />
                                            <Label fontSize="13" text="Gris" horizontalAlignment="center" />
                                        </StackLayout>
                                        <StackLayout>
                                            <Image width="20" src="https://image.flaticon.com/icons/png/512/30/30571.png" stretch="aspectFit" />
                                            <Label fontSize="13" text="120" horizontalAlignment="center" />
                                        </StackLayout>
                                    </FlexboxLayout>
                                </GridLayout>
                            </StackLayout>
                        </GridLayout>
                    </WrapLayout>
                </ScrollView>

                <StackLayout row="1" orientation="horizontal">
                    <GridLayout columns="*, *, *, *" rows="60" class="navigation">
                        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0">
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
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { mapState } from 'vuex'

//Drawer
import Navbar from './shared/Navbar'


export default {
    name: 'Home',

    components: {
        Navbar,
    },

    data() {
        return {
            
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
}
</script>
