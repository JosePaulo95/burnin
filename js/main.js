var App = new Vue({
  el: "#app",
  data() {
    return {

    }
  },
  beforeMount(){
    document.addEventListener('keydown', e => { e.code == "Space"? this.run():"" });

  },
  mounted(){
    this.reset(0)

  },
  computed: {

  },
  methods: {
    start(){

    },
  }
});
