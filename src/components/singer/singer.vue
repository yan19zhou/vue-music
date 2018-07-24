<template>
    <div class="ringer">
        
    </div>
</template>
<script>
    import {getSingerList} from 'api/singer'
    import {ERR_OK} from 'api/config'
    export default{
        data(){
            return {
                singerList:[]
            }
        },
        created(){
            this._getSingerList()
        },
        methods:{
            _getSingerList(){
                getSingerList().then((res)=>{
                    if (res.code === ERR_OK) {
                        console.log(res.data)
                        //this.singerList = res.data.list
                    }
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>

</style>
