<template>
    <div class="tab">
        <router-link tag="div" to="/recommend"><span> 推荐 </span></router-link>
        <router-link tag="div" to="/rank"><span> 排名 </span></router-link>
        <router-link tag="div" to="/singer"><span> 歌手 </span></router-link>
        <router-link tag="div" to="/search"><span> 搜索 </span></router-link>
    </div>
</template>
<script>
    

</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.tab{
    display flex
    justify-content center
}
.tab div{
    margin 10px
    width 60px
    text-align center
}
.active{
    color $color-theme
    border-bottom 3px solid $color-theme
}
</style>
