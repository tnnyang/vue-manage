<template>
  <nav>
    <ul class="pagination">
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(current - 1)">«</a></li>
      <li :class="{'disabled': current == 1}"><a href="javascript:;" @click="setCurrent(1)"> 首页 </a></li>
      <li v-for="item in grouplist" :class="{'active': current == item.val}"><a href="javascript:;" @click="setCurrent(item.val)">{{item.text}}</a></li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(page)">尾页</a></li>
      <li :class="{'disabled': current == page}"><a href="javascript:;" @click="setCurrent(current + 1)">»</a></li>
    </ul>
  </nav>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default{
    data(){
      return {
        current: this.currentPage
      }
    },
    props: {
      total: {// 数据总条数
        type: Number,
        default: 0
      },
      pageSize: {// 每页显示条数
        type: Number,
        default: 10
      },
      currentPage: {// 当前页码
        type: Number,
        default: 1
      },
      pagegroup: {// 分页条数
        type: Number,
        default: 5,
        coerce(v) {
          v = v > 0 ? v : 5;
          return v % 2 === 1 ? v : v + 1;
        }
      }
    },
    watch: {
      'curPage'() {  //如果当前页面不在第一页，而是被点击到了第二页或第三页等等，那么当点击页面中的搜索按钮时，可使得分页按钮及时处于第一页上
        this.current = 1;
      }
    },
    computed: {
      ...mapGetters([
        'curPage'
      ]),
      page() { // 总页数
        return Math.ceil(this.total / this.pageSize);
      },
      grouplist() { // 获取分页页码
        let len = this.page, temp = [], list = [], count = Math.floor(this.pagegroup / 2), center = this.current;
        if(len <= this.pagegroup){
          while (len--) {
            temp.push({text: this.page - len, val: this.page - len});
          };
          return temp;
        }
        while(len--){
          temp.push(this.page - len);
        };
        let idx = temp.indexOf(center);
        (idx < count) && ( center = center + count - idx);
        (this.current > this.page - count) && ( center = this.page - count);
        temp = temp.splice(center - count - 1, this.pagegroup);
        do{
          let t = temp.shift();
          list.push({
            text: t,
            val: t
          });
        }while(temp.length);
        if(this.page > this.pagegroup){
          (this.current > count + 1) && list.unshift({text: '...', val: list[0].val - 1});
          (this.current < this.page - count) && list.push({text: '...', val: list[list.length - 1].val + 1});
        }
        return list;
      }
    },
    methods: {
      setCurrent(idx) {
        if(this.current != idx && idx > 0 && idx < this.page + 1){
          this.current = idx;
          this.$emit('pageChange', this.current);
        }
      }
    }
  }
</script>

<style>
.pagination {display:table !important;margin:0 auto !important;}
.pagination li {float:left;margin:3px;}
.pagination li a {border-radius:5px;}
.pagination>.active>a, .pagination>.active>a:focus, .pagination>.active>a:hover, .pagination>.active>span, .pagination>.active>span:focus, .pagination>.active>span:hover{background:#0a4d92;border-color:#0a4d92;}
</style>