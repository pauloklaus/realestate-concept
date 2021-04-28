import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        searchTerm: "",
        favorites: []
    },
    mutations: {
        setSearchTerm(state, term) {
            state.searchTerm = term
        },
        addFavorite(state, propertyId) {
            if (!state.favorites.includes(propertyId))
                state.favorites.push(propertyId)
        },
        removeFavorite(state, propertyId) {
            state.favorites = state.favorites.filter(id => id != propertyId)
        }
    },
    actions: {
        setSearchTerm(context, term) {
            context.commit("setSearchTerm", term)
        },
        addFavorite(context, propertyId) {
            context.commit("addFavorite", propertyId)
        },
        removeFavorite(context, propertyId) {
            context.commit("removeFavorite", propertyId)
        }
    },
    getters: {
        getSearchTerm(state) {
            return state.searchTerm
        },
        getFavorites(state) {
            return state.favorites
        }
    }
})
