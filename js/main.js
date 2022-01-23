var App = new Vue({
  el: "#app",
  data() {
    return {
      money_goal: 100,
      money_amount: 90,
      money_discount: 5,

      start_time: undefined,
      passed_seconds: 0,
      ciclo_secs: 5
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
      return this.passed_seconds
    }
  },
  methods: {
    start(){

    },
    loop(){
      //if(this.App.start_time){

      //}

      setTimeout(function() {
        if(!this.App.start_time){
          this.App.start_time = Date.now();
        }
        this.App.updatePassedSeconds()
        this.App.loop();
      }, 1)
    },
    redeem_money(){
      this.money_amount++
    },
    updatePassedSeconds(){
      let current_passed_seconds = (Date.now()-this.start_time)
      current_passed_seconds = current_passed_seconds/1000
      current_passed_seconds = Math.floor(current_passed_seconds)
      if(current_passed_seconds != this.passed_seconds){
        this.updatePassedCycles()
      }
      this.passed_seconds = current_passed_seconds
    },
    updatePassedCycles(){
      if((this.passed_seconds+2)%this.ciclo_secs == 0){
        this.money_amount -= this.money_discount
      }
    }
  },
});
