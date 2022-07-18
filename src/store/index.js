import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios'
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadingCurPlace: true,
        loadingAddPlace: false,
        weatherDetail: {},
        places: [],
        error: ''
    },
    // plugins: [createPersistedState()],
    mutations: {
        UPDATE_WEATHER_DETAIL: (state, weatherDetail) => state.weatherDetail = weatherDetail,
        CHANGE_LOADING_CUR_PLACE: (state, value) => state.loadingCurPlace = value,
        CHANGE_LOADING_ADD_PLACE: (state, value) => state.loadingAddPlace = value,
        ADD_PLACE: (state, place) => {
            if (!state.places.some(el => el.id === place.id)
                && place.id !== state.weatherDetail.id
            )
                state.places.unshift(place)
        },
        DELETE_PLACE: (state, id) => state.places = state.places.filter(el => el.id !== id),
        SET_ERROR: (state, error) => state.error = error
    },
    actions: {
        async getWeatherByLatLon({ state, commit }, coords) {
            const response = await axios
                .get('', { params: coords })
                .catch(err => {
                    console.log(err)
                })
            if (response.data?.error) {
                commit('SET_ERROR', response.data.error)
            }
            if (Object.keys(state.weatherDetail).length) {
                commit('ADD_PLACE', response.data)
            }
            else commit('UPDATE_WEATHER_DETAIL', response.data)
            console.log(response.data);

        },
    },
    getters: {
        // weatherIcon: (state) => state.weatherDetail.weather[0].icon

    },
    modules: {}
})

