import axios from "axios";
import { createStore } from "vuex";
import VuexPersistence from "vuex-persist/dist/cjs/index.js";

const vuexLocal = new VuexPersistence({
  key: "state",
  // strictMode: true,
  // storage: window.localStorage,
  // reducer: state => (state),
  reducer: (state) => state,
});

const store = createStore({
  plugins: [vuexLocal.plugin],
  state() {
    return {
      base_url: "http://sandbox.arabamd.com/api/v1/",
      selectView: 1,
      carList: [],
      car: {},
      sort: 1,
      sortDirection: 0,
      currentPage: 1,
      skip: 0,
      take: 20,
    };
  },
  mutations: {
    setCarList(state, payload) {
      state.carList = payload;
    },
    setCar(state, payload) {
      state.car = payload;
    },
    setSort(state, payload) {
      if (state.sort !== payload) {
        state.sort = payload;
      }
    },
    setSortDirection(state) {
      state.sortDirection === 0
        ? (state.sortDirection = 1)
        : (state.sortDirection = 0);
    },
    changeView(state, payload) {
      state.selectView = payload;
    },
    changePageSize(state, payload) {
      if (state.take !== payload) {
        state.take = payload;
        state.skip = 0;
        state.currentPage = 1;
      }
    },
    changeCurrentPage(state, payload) {
      if (state.currentPage !== payload && state.currentPage < payload) {
        state.skip = state.currentPage * state.take;
        state.currentPage = payload;
      } else if (state.currentPage >= payload) {
        state.currentPage = payload;
        state.skip = (state.currentPage - 1) * state.take;
      }
    },
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
  },
  actions: {
    async get_carlist({ commit, state }) {
      await axios
        .get(state.base_url + "listing", {
          params: {
            sort: state.sort,
            sortDirection: state.sortDirection,
            skip: state.skip,
            take: state.take,
          },
        })
        .then((res) => {
          if (!!res && res.data.length > 0) {
            res.data = res.data.map((x) => {
              let imgArray = x.photo.split("{0}");
              x.photo = imgArray[0] + "800x600" + imgArray[1];
              return x;
            });
            commit("setCarList", res.data);
          }
        })
        .catch((e) => {
          console.log("e", e);
        });
    },
    async get_carByID({ commit, state }, id) {
      await axios
        .get(state.base_url + "detail", { params: { id: id } })
        .then((res) => {
          if (!!res) {
            res.data.photos = res.data.photos.map((x) => {
              let imgArray = x.split("{0}");
              x = imgArray[0] + "800x600" + imgArray[1];
              return x;
            });

            commit("setCar", res.data);
          }
        });
    },
  },
});

export function useStore() {
  return store;
}

export default store;
