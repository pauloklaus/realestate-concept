<template>
    <div>
        <div class="h6 mb-3 text-center text-muted">
            {{ showCount }}<span v-if="searchTerm"> para <span class="font-weight-bold">{{ searchTerm }}</span></span>
        </div>
        <b-row align-v="stretch">
            <b-col v-for="property in properties.items" :key="property.id" md="6" lg="4" class="mb-4">
                <Detail :property="property" />
            </b-col>
        </b-row>
    </div>
</template>

<script>
import Detail from "@/views/Properties/Detail"

export default {
    components: { Detail },
    data() {
        return {
            properties: {
                items: [],
                lastId: "",
                limit: 10
            }
        }
    },
    computed: {
        searchTerm() {
            return this.$store.getters.getSearchTerm
        },
        showCount() {
            const length = this.properties.items.length;
            return (length > 0 ? length : "nenhum") + " resultado" + (length > 1 ? "s" : "")
        }
    },
    created() {
        this.load()

        this.$bus.$on("newSearchTerm", () => {
            this.load()
        })
    },
    methods: {
        loadProperties(owner) {
            const propertyList = Object.keys(owner.properties).map(item => { return { id: item, ...owner.properties[item] }})

            propertyList.forEach(property => {
                if (this.searchTerm == "" || property.description.toLowerCase().indexOf(this.searchTerm) > -1) {
                    property.owner_id = owner.id
                    this.properties.items.push(property)
                }
            })
        },
        loadOwners(owners) {
            this.properties.items = []
            const ownerList = Object.keys(owners).map(item => { return { id: item, ...owners[item] }})

            ownerList.map(owner => {
                this.loadProperties(owner)
            })
        },
        load() {
            const ownersReference = this.$firebase.database().ref("owners")

            ownersReference.on("value", data => {
                this.loadOwners(data.val())
            })
        }
    }
}
</script>

<style scoped>
</style>
