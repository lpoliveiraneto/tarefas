import IProjeto from "@/interfaces/IProjetos";
import { Store, createStore } from "vuex";
import { InjectionKey } from "vue";

interface Estado{
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state:{
        projetos:[
            {
                id: new Date().toISOString(),
                nome:'TypeScript'
            },
            {
                id: new Date().toISOString(),
                nome:'Vue'
            },
            {
                id: new Date().toISOString(),
                nome:'Vuex'
            }
        ]
        
    }
})