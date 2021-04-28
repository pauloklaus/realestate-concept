<template>
    <div>
        <b-navbar class="header-bar border-bottom border-gray">
            <b-navbar-brand>
                <router-link :to="{ name: 'search' }" class="font-weight-bold text-warning">REALESTATE</router-link>
            </b-navbar-brand>

            <b-navbar-nav>
                <b-input-group>
                    <b-input-group-prepend is-text>
                        <b-icon-search />
                    </b-input-group-prepend>
                    <b-form-input placeholder="Pesquise por Bairro, Rua..." v-model="searchTerm" debounce="500" />
                </b-input-group>
            </b-navbar-nav>

            <b-navbar-nav class="header-bar-options ml-auto mr-2 text-uppercase">
                <b-nav-item :to="{ name: 'favorites' }"><b-icon-bookmark-check-fill /> <span class="d-none d-md-inline">Imóveis que gostei</span> <b-badge v-if="favoritesCount" variant="primary">{{ favoritesCount }}</b-badge></b-nav-item>
                <b-nav-item @click="generateShareLink" :disabled="favoritesCount == 0"><b-icon-share-fill /> <span class="d-none d-md-inline">Compartilhar</span></b-nav-item>
            </b-navbar-nav>
        </b-navbar>

        <b-modal title="Compartilhar meus favoritos" centered v-model="showShareModal" @hidden="$emit('input', false)">
            <CopyAndShare label="Copie o endereço a seguir e envie seus imóveis favoritos para quem você quiser!" :text="urlToShare" copy-title="Copie e compartilhe!" hidden-go-to @copied="showCopySuccess" />
            <p class="mt-2 text-primary">{{ copySuccess }}</p>

            <template v-slot:modal-footer>
                <b-button variant="primary" @click="showShareModal = false"><b-icon-check2 /> Ok</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            copySuccess: "",
            searchTerm: "",
            showShareModal: false,
            urlToShare: ""
        }
    },
    computed: {
        favoritesCount() {
            return this.$store.getters.getFavorites.length
        }
    },
    watch: {
        searchTerm(newValue) {
            this.$store.dispatch("setSearchTerm", newValue.toLowerCase())
            this.$bus.$emit("newSearchTerm")

            if (this.$route.name != "search")
                this.$router.push({ name: "search" })
        }
    },
    methods: {
        showCopySuccess() {
            this.copySuccess = "URL copiada. Compartilhe-a!";

            setTimeout(() => {
                this.copySuccess = "";
            }, 2000);
        },
        generateShareLink() {
            const sharesReference = this.$firebase.database().ref("shares")

            const linkReference = sharesReference.push({
                properties: this.$store.getters.getFavorites
            })

            this.urlToShare = process.env.VUE_APP_URL + "/?favorites=" + linkReference.key
            this.showShareModal = true
        }
    }
}
</script>

<style scoped>
.header-bar {
    background-color: var(--white);
    padding: 10px;
    position: fixed;
    width: 100%;
    z-index: 900;
}
.header-bar-options {
    font-size: 0.8rem;
}
</style>
