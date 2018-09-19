import {mapGetters} from 'vuex'
export const Mixin = {
    computed:{
        ...mapGetters(['playList'])
    },
    mount(){
        this.handlePlayList(this.playList)
    },
    activated(){
        this.handlePlayList(this.playList)
    },
    watch:{
        playList(newVal){
            this.handlePlayList(newVal)
        }    
    },
    methods:{
        handlePlayList(){
            throw Error("must active handlePlayList method")
        }
    }
}