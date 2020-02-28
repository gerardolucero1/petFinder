<style>
    ActionBar {
        background-color: white;
        color: #000000;
    }

    .header-text{
        color: #000000;
        font-weight: bold;
        font-size: 18px;
    }
</style>

<template>
  <ActionBar>
        <GridLayout rows="*" columns="*, *">
            <Label col="0" class="header-text" :text="changeTitle"></Label>
            <FlexboxLayout col="1" justifyContent="flex-end" alignItems="center">
                <Label marginRight="20" fontSize="25" class="header-text font-awesome" text="" @tap="goToMessages" />
            </FlexboxLayout>
        </GridLayout>
    </ActionBar>
</template>

<script>
export default {
    name: 'Actionbar',

    data(){
        return{

        }
    },

    computed: {
        changeTitle(){
            let title = 'PetFinder'

            return title
        }
    },

    methods: {
        goToMessages(){
            alert('Ir a mensajes')
        }
    }
}
</script>