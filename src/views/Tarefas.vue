<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="text" placeholder="Digite para buscar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />

    <Box v-if="listaEstaVazia"> VAI TRABALHAR CARALHO! </Box>
    <Modal :mostrar="tarefaSelecionada != null">
      <header class="modal-card-head">
        <p class="modal-card-title">Editando uma tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <label for="descricaoTarefa" class="label"> Descrição </label>
          <input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoTarefa" />
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="alterarTarefa">
          Salvar Alterações
        </button>
        <button class="button" @click="fecharModal">Cancelar</button>
      </footer>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefas";
import Box from "../components/Box.vue";
import Modal from "../components/Modal.vue";

import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS, ALTERAR_TAREFA } from "@/store/tipo-acoes";
import { useStore } from '@/store';

export default defineComponent({
  name: "App",
  components: {

    Formulario,
    Tarefa,
    Box,
    Modal
  },
  data() {
    return {
      tarefaSelecionada: null as ITarefa | null
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length == 0;
    },
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const filtro = ref("")
    const tarefas = computed(() => store.state.tarefas.filter(
      (t) => !filtro.value || t.descricao.includes(filtro.value)
    ))

    // watchEffect(() =>{
    //   store.dispatch(OBTER_TAREFAS, filtro.value)
    // })

    return {
      tarefas,
      store,
      filtro
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null
    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal())
    }
  },
});
</script>