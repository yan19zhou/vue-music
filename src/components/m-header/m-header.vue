<template>
    <div class="header">
        <div><img src="../../common/image/logo.png" alt=""></div>
        <div class="title"><h2>DEDE MUSIC</h2></div>
    </div>
</template>
<script>
    export default{
        name: 'm-header'
    }
</script>
<style lang="stylus" scoped>
@import "~common/stylus/index.styl"
.header{
    display flex
    justify-content center
    align-items center
    height 40px
}
img {
    width 30px
    
}
.title{
    color $color
    margin-left 10px
}
</style>
