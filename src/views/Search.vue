<template>
    <b-container>
        <h1 class="text-center">Imóveis</h1>

        <PropertiesList />
    </b-container>
</template>

<script>
import PropertiesList from "@/views/Properties/List.vue"

export default {
    components: { PropertiesList }
}
</script>

<style>
</style>
