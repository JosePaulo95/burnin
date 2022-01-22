var App = new Vue({
  el: "#app",
  data() {
    return {
      money_goal: 200,
      money_amount: 50,
      money_discount: 100
    }
  },
  beforeMount(){

  },
  mounted(){

  },
  computed: {
    getLiquidPercentage(){
      //let liquid = (this.money_amount-this.money_discount)/this.money_goal*100
      let liquid = this.money_amount/this.money_goal*100
      liquid = Math.floor(liquid)
      liquid = Math.min(100, liquid)
      liquid = Math.max(0, liquid)
      return liquid
    },
    getDiscountPercentage(){
      let discount = this.money_discount/this.money_goal*100
      discount = Math.floor(discount)
      discount = Math.min(100, discount)
      discount = Math.max(0, discount)
      return discount
    }
  },
  methods: {
    start(){

    },
  }
});
