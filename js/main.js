var App = new Vue({
  el: "#app",
  data() {
    return {
      capitulos: [],
      content: [],
      index_bloco: 0,
      index_capitulo: 0,
      hp: 3
    }
  },
  beforeMount(){
    document.addEventListener('keydown', e => { e.code == "Space"? this.run():"" }); 
    this.capitulos.push(_prologo);
    this.capitulos.push(_capitulo1);
    this.capitulos.push(_capitulo2);
  },
  mounted(){
    this.reset(2)
    //this.run();
  },
  computed: {
    Capitulo(){
      var result = []
      //essa linha transforma um objeto num array
      Object.keys(this.capitulos[this.index_capitulo]).map((key) => result[key] = this.capitulos[this.index_capitulo][key]);
      return result;
    }
  },
  methods: {
    start(){
      this.run()
    },
    updateScroll(){
      panel_dom.scrollTop = panel_dom.scrollHeight;
    },
    run(index_escolhido = -1){
      //precisa escolher, não escolheu mas apertou barra de espaço
      if(index_escolhido == -1 && this.content[this.content.length-1]?.tipo == "escolha-fala")
        return

      if(this.content[this.content.length-1]?.happy_end){
        this.reset(this.index_capitulo+1, 0)
      }

      if(this.content[this.content.length-1]?.dead_end){
        this.reset(this.index_capitulo, 0)
      }

      if(this.content[this.content.length-1]?.porrada){
        this.hp -= 1
      }

      const trataFalaHp = bloco => {
        if(this.hp <= 0){
          return {"tipo":"narracao", "fala":"jobin morre", "dead_end": true}
        }else{
          return {...bloco, "fala":bloco.fala.replace("$hp", this.hp)}
        }
        
      }

      if(index_escolhido != -1){
        //escolheu fala
        const bloco_next = this.Capitulo[index_escolhido]
        this.content.pop();
        this.content.push(bloco_next);
        this.index_bloco = index_escolhido
      }else if(this.content.length > 0){
        //seguindo árvore
        const index_next = this.Capitulo[this.index_bloco].next?this.Capitulo[this.index_bloco].next:this.index_bloco+1
        const bloco_next = trataFalaHp(this.Capitulo[index_next])
        this.content.push(bloco_next);
        this.index_bloco = index_next
      }else{
        //inicializa
        const bloco_titulo = this.Capitulo[0]
        this.content.push(bloco_titulo);
      }
      console.log(this.Capitulo[this.index_bloco].fala)
    },
    escolhe(escolha_index){
      this.run(escolha_index)
    },
    goTo(capitulo_index, bloco_index){

      for (let i = 0; i < bloco_index; i++) {
  
        this.ru
  
      }

    },
    reset(index_cap){
      this.content = []
      this.index_capitulo = index_cap
      this.index_bloco = 0
    },
    runTests(){
      this.reset();
      runBlocosTests(this)
      this.reset();
    }
  }
});
