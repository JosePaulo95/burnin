var App = new Vue({
  el: "#app",
  data() {
    return {
      money_goal: 100,
      money_amount: 50,
      money_discount: 25,

      start_time: undefined,
      seconds_passed: 0,
      ciclo_secs: 3
    }
  },
  beforeMount(){

  },
  mounted(){
    this.loop()
    this.start_time = Date.now()
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
    },
    getTimeIndicator(){
      return this.seconds_passed
    }
  },
  methods: {
    start(){

    },
    loop(){
      setTimeout(function() {
        if(!this.App.start_time){
          this.App.start_time = Date.now();
        }
        let seconds_passed = (Date.now()-this.App.start_time)
        seconds_passed = seconds_passed/1000
        seconds_passed = Math.floor(seconds_passed)
        this.App.seconds_passed = seconds_passed

        this.App.loop();
      }, 1)
    },
    redeem_money(){
      this.money_amount++
    }
  }
});
