var App = new Vue({
  el: "#app",
  data() {
    return {
      money_goal: 100,
      money_amount: 25,
      money_discount: 50
    }
  },
  beforeMount(){

  },
  mounted(){

  },
  computed: {
    getLiquidPercentage(){
      let liquid = (this.money_amount-this.money_discount)/this.money_goal*100
      liquid = Math.min(100, liquid)
      liquid = Math.max(0, liquid)
      liquid = Math.floor(liquid)
      return liquid
    },
    getDiscountPartPercentage(){
      let discount = this.money_discount/this.money_goal*100
      let amount = this.money_amount/this.money_goal*100

      discount = Math.min(amount, discount)
      discount = Math.floor(discount)
      return discount
    },
    getExceededDiscountPercentage(){
      let discount = this.money_discount/this.money_goal*100
      let amount = this.money_amount/this.money_goal*100
      let exceeded = discount-amount
      exceeded = Math.max(0, exceeded)
      exceeded = Math.floor(exceeded)
      return exceeded
    }
  },
  methods: {
    start(){

    },
    redeem_money(){
      this.money_amount++
    }
  }
});
