<template>
  <div class="app-container">
    <p class="warn-content">
      <a>欢迎使用东软云HIS系统 V1.0
      </a>
    </p>
    <div class="">
      <el-row :gutter="25">
        <el-col :span="7">
          <el-card class="welcome">
            <div slot="header" class="welcome-header"><span>欢迎</span></div>
            <div class="welcome-text">{{hello}}</div>
            <div class="welcome-user">
              {{name}}
              {{nowuser.userID}}
            </div>
          </el-card>
        </el-col>
        <el-col :span="9">
          <div class="card kjfs">
            <p class="titlee"><i class="fa el-icon-menu fa-lg"></i>快捷方式</p>
            <ul>
              <li style="margin-left: -40px">
                <router-link to="/registration/Register" class="kjfs kjfs-bluee"><span><i
                  class="el-icon-tickets fa-2x"></i></span><span>门诊挂号</span>
                </router-link>
              </li>
              <li>
                <router-link to="/registration/unRegister" class="kjfs kjfs-pinkk"><span><i
                  class="fa el-icon-remove-outline fa-2x"></i></span><span>退号</span>
                </router-link>
              </li>
              <li>
                <router-link to="/registration/charge" class="kjfs kjfs-yelloww"><span><i
                  class="fa el-icon-finished fa-2x"></i></span><span>收费</span></router-link>
              </li>
            </ul>
            <ul>
              <li style="margin-left: -40px">
                <router-link to="/upload" class="kjfs kjfs-grennn"><span><i
                  class="fa el-icon-refresh-left fa-2x"></i></span><span>退费</span>
                </router-link>
              </li>
              <li>
                <router-link to="/navClassifies" class="kjfs kjfs-purplee"><span><i
                  class="fa el-icon-menu fa-2x"></i></span><span>前台菜单</span></router-link>
              </li>
              <li>
                <router-link to="/markdown" class="kjfs kjfs-lightBluee"><span><i
                  class="fa el-icon-edit fa-2x"></i></span><span>编辑器</span></router-link>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="weather-wrapper">
            <Weather class="weather"></Weather>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <h4>数据统计</h4>
      <data-tabs :option="easyDataOption"></data-tabs>
    </div>

  </div>
</template>

<script>
  import DataTabs from '@/components/data-tabs/data-tabs'
  import Weather from '@/components/weather/index'
  import { mapGetters } from 'vuex'

  export default {
    name: 'report',
    components: {
      Weather,
      DataTabs
    },
    data() {
      return {
        option: {
          span: 8,
          color: '#15A0FF'
        },
        hello: '早上好',
        easyDataOption: {
          span: 6,
          data: [
            {
              title: '累计诊断',
              subtitle: '实时',
              count: 1314,
              text: '您在本院已经接诊了这么多患者了，继续加油哦！',
              color: 'rgb(49, 180, 141)',
              key: '总计'
            }, {
              title: '今日诊断',
              subtitle: '实时',
              count: 15,
              text: '医生三世，不服其药。',
              color: 'rgb(117, 56, 199)',
              key: '今日'
            },
            {
              title: '昨日诊断',
              subtitle: '实时',
              count: 62,
              text: '人处疾则贵医',
              color: 'rgb(56, 161, 242)',
              key: '昨日'
            }

          ]
        }

      }
    },
    methods: {},
    created() {

    },
    watch: {},
    mounted() {
    },
    computed: {

      ...mapGetters(['sidebar', 'name', 'nowuser'])

    }
  }
</script>

<style scoped>
  .item {
    margin-bottom: 16px;
  }

  .welcome {
    margin-top: 15px;
    height: 325px;


  }

  .welcome-text {
    font-size: 30px;

  }

  .welcome-user {
    margin-top: 20px;
    font-size: 18px;
  }

  .weather-wrapper {
    margin-top: 15px;

  }

  .weather {
    margin: 5px;
    /*box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);*/
  }

</style>
<style lang="scss">
  @import '../../styles/data-card.scss';
  @import '../../styles/data-display.scss';
  @import '../../styles/data-icons.scss';
  @import '../../styles/data-tabs.scss';
</style>
<style lang="scss">
  $top: top;
  $bottom: bottom;
  $left: left;
  $right: right;
  $leftright: ($left, $right);
  $pinkk: #eec2d3;
  $bluee: #409eff;
  $yelloww: #f4d884;
  $grennn: #89dda0;
  $purplee: #78a2ea;
  $lightBluee: #b8d6ff;

  $list: bluee pinkk yelloww grennn purplee lightBluee;
  $list1: $bluee $pinkk $yelloww $grennn $purplee $lightBluee;
  %shadow {
    background: #fff;
    -webkit-box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
    box-shadow: 1px 2px 20px rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.2);

    .titlee {
      font-size: 14px;
      padding: 10px;

      i {
        margin-#{$right}: 5px;
      }
    }
  }

  @mixin flex($direction:row,$content:space-between) {
    display: flex;
    flex-direction: $direction;
    justify-content: $content;
  }

  .card {
    color: #666;
    @extend %shadow;

    ul {
      @include flex;

      li {
        flex: 1;
        list-style: none;

        a {
          color: #666666;
          align-items: center;
          padding-#{$top}: 20px;
          padding-#{$bottom}: 20px;
          @include flex(column);

          span {
            height: 44px;
          }

          .num {
            line-height: 44px;
            font-size: 42px;
            color: $bluee;
            margin: 0px;
          }
        }

        .kjfs-bluee {
          color: $bluee;
        }

        .kjfs-pinkk {
          color: $pinkk;
        }

        .kjfs-yelloww {
          color: $yelloww;
        }

        .kjfs-grennn {
          color: $grennn;
        }

        .kjfs-purplee {
          color: $purplee;
        }

        .kjfs-lightBluee {
          color: $lightBluee;
        }

        &:hover {
          .kjfs-bluee {
            color: #ffffff;
            background: $bluee;
          }

          .kjfs-pinkk {
            color: #ffffff;
            background: $pinkk;
          }

          .kjfs-yelloww {
            color: #ffffff;
            background: $yelloww;
          }

          .kjfs-grennn {
            color: #ffffff;
            background: $grennn;
          }

          .kjfs-purplee {
            color: #ffffff;
            background: $purplee;
          }

          .kjfs-lightBluee {
            color: #ffffff;
            background: $lightBluee;
          }
        }
      }
    }
  }
</style>
