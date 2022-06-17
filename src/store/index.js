import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0,
    popularMeals:{}
  },

  getters: {
  },
  mutations: {
    increment (state) {
      state.count++
    },

    setPopularMeals (state, popularMeals) {
      console.log('test mounted')
      state.popularMeals.push(popularMeals)
      console.log(state.popularMeals)
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },

    setPopularMeals(context){
      const popularMeals= [
        {burgerTest: {
          nom: 'Burger',
          img: '../assets/buger.webp',
          restaurantId: 1,
          price: 12.2,
          description: "Boeuf, tomate, pain, salade"
        }},
        {burgerTest2: {
          nom: 'Burger 2',
          img: '../assets/buger.webp',
          restaurantId: 1,
          price: 12.2,
          description: "Boeuf, tomate, pain, salade"
        }},
        {burgerTest3: {
          nom: 'Burger 3',
          img: '../assets/buger.webp',
          restaurantId: 1,
          price: 12.2,
          description: "Boeuf, tomate, pain, saladeBoeuf, tomate, pain, saladeBoeuf, tomate, pain, salade"
        }},
       { burgerTest4: {
          nom: 'Burger 4',
          img: '../assets/buger.webp',
          restaurantId: 1,
          price: 12.2,
          description: "Boeuf, tomate, pain, salade"
        }}
      ];
      context.commit('setPopularMeals', popularMeals)
    }
  },

  modules: {
  }

})

export default store
