import IProjeto from "@/interfaces/IProjetos";
import { Store, createStore, useStore as vuexUseStore} from "vuex";
import { InjectionKey } from "vue";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO } from "./tipoMutacoes";

interface Estado{
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state:{
        projetos:[]
        
    }, 
    mutations:{
        [ADICIONA_PROJETO](state, nomeDoProjeto: string){
            console.log('salvando o projeto')
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [ALTERA_PROJETO](state, projeto: IProjeto){
            console.log('Editando o projeto')
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [EXCLUIR_PROJETO](state, id:string){
            state.projetos = state.projetos.filter(proj => proj.id != id)
        }
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}