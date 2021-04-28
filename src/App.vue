<template>
    <div id="main" class="d-flex flex-column vh-100">
        <HeaderBar />
        <div class="main-margin-top">
            <h4 class="text-muted text-center"><span class="bg-warning">meramente ilustrativo - apenas uma prova de conceito</span></h4>
            <router-view />
        </div>
        <FooterBar class="mt-auto" />
    </div>
</template>

<script>
import HeaderBar from "@/components/Template/HeaderBar"
import FooterBar from "@/components/Template/FooterBar"

export default {
    components: { HeaderBar, FooterBar },
    created() {
        this.checkFavorites()
    },
    methods: {
        async loadFavorites(shares) {
            if (shares[this.$route.query.favorites]) {
                const properties = shares[this.$route.query.favorites].properties

                await properties.forEach(property => {
                    this.$store.dispatch("addFavorite", property)
                })

                if (this.$route.name != "favorites")
                    this.$router.push({ name: "favorites" })
            }
        },
        checkFavorites() {
            if (this.$route.query.favorites) {
                const sharesReference = this.$firebase.database().ref("shares")

                sharesReference.on("value", data => {
                    this.loadFavorites(data.val())
                })
            }
        }
    }
}
</script>

<style>
.main-margin-top {
    margin-top: 90px;
}
</style>
