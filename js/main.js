var App = new Vue({
  el: "#app",
  data() {
    return {
      money_goal: 100,
      money_amount: 90,
      money_discount: 1,
      work_prize: 5,

      start_time: undefined,
      passed_seconds: 0,
      discount_cycle: 1,
      last_discount_time: 0,
      ciclo_worker: 1,
      max_delivery: 4,
      workers: [
        {
          id: "0",
          deliveries: [],
          wake_up_time: 0,
        },
        {
          id: "1",
          deliveries: [],
          wake_up_time: 0,
        },
        {
          id: "2",
          deliveries: [],
          wake_up_time: 0,
        },
      ],

      rest_items: [
        {
          src: "https://cdn-icons-png.flaticon.com/512/616/616430.png"
        }
      ]
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
    },
    getClockState(){
      const lerp = (a, b, progress) => {
        progress = progress < 0 ? 0 : progress;
        progress = progress > 1 ? 1 : progress;
        return Math.round(a + Math.round(b - a) * progress);
      }
      const seconds_current_cycle = this.passed_seconds%this.discount_cycle
      const progress = seconds_current_cycle/this.discount_cycle
      return lerp(0, 1, progress)
    },
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
    redeem_work(worker){
      if(worker.deliveries.length > 0){
        this.money_amount += this.work_prize
        this.workers.find(w => w.id==worker.id).deliveries.pop()
        this.workers.find(w => w.id==worker.id).last_prod_time = Date.now()
      }
    },
    updatePassedSeconds(){
      let current_passed_seconds = (Date.now()-this.start_time)
      current_passed_seconds = current_passed_seconds/1000
      //current_passed_seconds = Math.floor(current_passed_seconds)
      current_passed_seconds = current_passed_seconds
      if(current_passed_seconds != this.passed_seconds){
        this.updateMoney()
        this.updateDeliveries()
      }
      this.passed_seconds = current_passed_seconds
    },
    updateMoney(){
      let next_discount_time = this.last_discount_time+this.discount_cycle
      if(this.passed_seconds > next_discount_time){
        this.money_amount -= this.money_discount
        this.last_discount_time = this.passed_seconds
      }
    },
    updateDeliveries(){
      //checa se é pra produzir e produz
      this.workers = this.workers.map(w => {
        if(!w.last_prod_time){
          w.last_prod_time = Date.now()//inicializa
        }
        if(this.dif_time(Date.now(), w.last_prod_time) >= this.ciclo_worker){//checa ciclo
          if(
            w.deliveries.length < this.max_delivery && //checa nao passou do lim max
            w.wake_up_time < this.passed_seconds //checa nao esta descansando
          ){
            w.deliveries.push("d") //produz
          }
          w.last_prod_time = Date.now()//marca entrega
        }
        return w
      })
    },
    dif_time(time_a, time_b){
      let passed_ms = (time_a-time_b)
      let passed_seconds = passed_ms/1000

      return passed_seconds
    },
    selectRestItem(){
      this.rest_selected = true
    },
    applyRest(worker){
      if(this.rest_selected){
        this.rest_selected = false
        if(this.passed_seconds > worker.wake_up_time){//checa se nao ta descansando
          this.workers.find(w => w.id == worker.id).wake_up_time = this.passed_seconds+3
          //this.workers.find(w => w.id == worker.id).deliveries.push("d");//wake_up_time = this.passed_seconds+3
        }
      }
    },
    isResting(worker){
      return worker.wake_up_time > this.passed_seconds
    }
  },
});
