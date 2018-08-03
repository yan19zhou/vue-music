<template>
    <div class="singer">
       <list-view :data="singers" v-show="singers.length" @select="selectSinger"></list-view> 
       <router-view></router-view>
    </div>
</template>
<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
import ListView from "base/listView/list-view";
import { mapMutations } from "vuex";
const HOT_SINGER_LEN = 10;
const HOT_NAME = "热门";
export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
          console.log(this.singers);
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      };

      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.item.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }

        let key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            item: []
          };
        }
        map[key].item.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      let arr = hot.concat(ret);
      return arr;
      //console.log(arr)
    },
    ...mapMutations({
      setSinger: "SET_SINGER"
    })
  },
  components: {
    ListView
  }
};
</script>
<style lang="stylus" scoped>
.singer {
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
}
</style>
