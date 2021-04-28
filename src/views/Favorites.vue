<template>
    <b-container>
        <h1 class="text-center">Imóveis Favoritos</h1>

        <PropertiesList />
    </b-container>
</template>

<script>
import PropertiesList from "@/views/Properties/ListFavorites.vue"

export default {
    components: { PropertiesList }
}
</script>

<style>
</style>
