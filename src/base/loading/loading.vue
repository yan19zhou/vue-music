<template>
    <div class="loading">
        <img width="24" height="24" src="./loading.gif" alt="">
        <p class="disc">{{title}}</p>
    </div>
</template>
<script>
export default {
    name:'loading',
    props:{
        title:{
            type:String,
            default:"正在载入中..."
        }
    }
}
</script>
<style lang="stylus" scoped>
    .loading 
     width 100%
     text-align center
     .disc
      line-height 24px
</style>

