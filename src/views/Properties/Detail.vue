<template>
    <b-card class="h-100 detail" :img-src="image" :title="propertyData.description.capitalize()">
        <h6 class="font-weight-bold">R$ {{ propertyData.amount.numberToHumanFormat() }}</h6>
        <p>{{ propertyData.address }}</p>
        <p class="m-0 text-center">{{ particulars }}</p>

        <template #footer>
            <div class="link text-center" @click="toggleFavorite">
                <b-icon :icon="propertyData.favorite ? 'heart-fill' : 'heart'" />
            </div>
        </template>
    </b-card>
</template>

<script>
export default {
    props: {
        property: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            propertyData: {},
            particulars: "",
            images: []
        }
    },
    watch: {
        property(newProperty) {
            this.loadProperty(newProperty)
        }
    },
    computed: {
        image() {
            return this.images.length ? this.images[0] : ""
        }
    },
    created() {
        this.loadProperty(this.property)
    },
    methods: {
        isFavorite(propertyId) {
            return this.$store.getters.getFavorites.some(id => id == propertyId)
        },
        async addImage(image) {
            try {
                const url = await this.$firebase.storage().ref(image.fullPath).getDownloadURL()
                this.images.push(url)
            }
            catch (error) {
                console.error(error);
            }
        },
        async loadImages() {
            this.images = []
            const url = "/owners/" + this.propertyData.owner_id + "/properties/" + this.propertyData.id

            try {
                const images = await this.$firebase.storage().ref(url).list({ maxResults: 1 })
                images.items.map(image => {
                    this.addImage(image)
                })
            }
            catch(error)
            {
                console.error(error)
            }
        },
        getParticulars(property) {
            const particulars = []

            if (property.room && property.room > 0)
                particulars.push(property.room + " quarto" + (property.room > 1 ? "s" : ""))
        
            if (property.garage && property.garage > 0)
                particulars.push(property.garage + " vaga" + (property.garage > 1 ? "s" : ""))

            particulars.push(property.size)

            return particulars.join(" - ")
        },
        loadProperty(property) {
            this.propertyData = {
                ...property,
                favorite: this.isFavorite(property.id)
            }

            this.particulars = this.getParticulars(property)

            this.loadImages()
        },
        saveFavoriteStatus(favorite) {
            if (favorite)
                this.$store.dispatch("addFavorite", this.propertyData.id)
            else
                this.$store.dispatch("removeFavorite", this.propertyData.id)
        },
        toggleFavorite() {
            this.propertyData.favorite = !this.propertyData.favorite
            this.saveFavoriteStatus(this.propertyData.favorite)
        }
    }
}
</script>

<style scoped>
.detail:hover {
    background-color: var(--light);
    box-shadow: 0 0 5px var(--dark);
}
.link {
    cursor: pointer;
}
</style>
