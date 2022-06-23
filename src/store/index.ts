import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0,
    popularMeals:[{}],
    token: '',
    userId:0,
    MyResto:{
      Nom:'',
      Description:'',
      Img:'',
      Article:[ {}],
      Menu:[ {}]
    },
    cart: [],
  },


  getters: {
    getCart(state){
      return state.cart
    },
    getProducts(state){
      return new Set(state.cart)
    },

  },
  mutations: {
    increment (state) {
      state.count++
    },
    addtoken(state,tokenString){
      state.token = tokenString
    },
    addUserId(state,userId){
      state.userId = userId
    },
    deltoken(state){
      state.token = ''
    },
    delUserId(state)
    {
      state.userId = 0;
    },
    setMyRestoName(state, MyResto){
      state.MyResto.Nom = MyResto.Nom
      state.MyResto.Description = MyResto.Description
      state.MyResto.Img = MyResto.Img
      state.MyResto.Article = MyResto.Article
      state.MyResto.Menu = MyResto.Menu
    },

    setPopularMeals (state, popularMeals) {
      console.log('test mounted')
      state.popularMeals.push(popularMeals)
      console.log(state.popularMeals)
    },

    setCart (state, product) {
      // @ts-ignore
      state.cart.push(product);
    },
    deleteProductInCart(state, product){
      // @ts-ignore
      state.cart.splice(state.cart.indexOf(product), 1)

    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    setToken(context,tokenString){
      context.commit('addtoken',tokenString)
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
