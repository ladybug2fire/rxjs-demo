<template>
  <div class="container">
    <div class="left">
      <div class="config">
        <div
          class="switch"
          @click="turnOnOff = !turnOnOff"
        >{{turnOnOff? '-': '+'}}</div>
        <div v-if="turnOnOff">
          <div>
            <label for="token">token:</label>
            <input
              name="token"
              type="text"
              placeholder="token"
              v-model="config.token"
            />
          </div>
          <div>
            <label for="project_id">porject_id:</label>
            <input
              name="project_id"
              type="text"
              placeholder="project_id"
              v-model="config.project_id"
            />
          </div>
        </div>
      </div>
      <codemirror
        v-model="templateString"
        v-bind:options="tmpOptions"
      ></codemirror>
    </div>
    <div class="right">
      <codemirror
        v-model="genString"
        disabled
        :options="cmOptions"
      ></codemirror>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import _ from "lodash";
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/mdn-like.css";
Vue.use(ElementUI);
export default {
  components: {
    codemirror
  },
  data() {
    return {
      config: {
        hosts: "http://yapi.sankuai.com",
        token: "9f77354e7930a868bedb",
        project_id: 355
      },
      turnOnOff: false,
      templateString: null,
      loaded: false,
      tmpOptions: {
        lineNumbers: true,
        tabSize: 4,
        mode: "text/javascript",
        theme: "mdn-like",
        line: true
      },
      cmOptions: {
        // codemirror options
        readOnly: "nocursor",
        lineNumbers: true,
        tabSize: 4,
        mode: "text/javascript",
        theme: "mdn-like",
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      apiData: null
    };
  },
  watch: {
      ['config.token'](){
          this.getApi();
      },
      ['config.project_id'](){
          this.getApi();
      },
  },
  computed: {
    genString: {
      get() {
        return this.compile();
      },
      set() {}
    }
  },
  methods: {
    compile() {
      var str = "";
      return _.chain(this.apiData)
        .map(Data => {
          try {
            var compiled = _.template(this.templateString);
            return compiled({
              data: Data.data,
              res_body: JSON.parse(_.get(Data, "data.res_body"))
            });
          } catch (error) {
            return "";
          }
        })
        .filter(e => e)
        .join("\n")
        .value();
    },
    async getMeta(config) {
      const { hosts, token, id } = config;
      const meta = await fetch(
        `${hosts}/api/interface/get?id=${id}&token=${token}`
      );
      return meta.json();
    },
    async getApi() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      const { hosts, token, project_id } = this.config;
      const res = await fetch(
          `${hosts}/api/interface/list?project_id=${project_id}&token=${token}`
      );
      const APILIST = await res.json();
      this.loaded = true;
      const list = _.flatMap(_.get(APILIST, "data.list", []), e => e._id);
      var promiseList = [];
      for (const o in list) {
          promiseList.push(
              this.getMeta(
                  _.assign(this.config, {
                      id: list[o]
            })
          )
        );
      }
      const allList = await Promise.all(promiseList);
      this.apiData = allList;
      loading.close();
    }
  },
  async created() {
    this.getApi();
  }
};
</script>

<style>
html,
body {
  height: 100%;
  padding: 0;
  margin: 0;
}
.switch {
  color: white;
  background-color: #000;
  opacity: 0.5;
  width: 10px;
  height: 10px;
  font-size: 10px;
  line-height: 10px;
  border-radius: 10px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
}
.config {
  position: absolute;
  right: 10px;
  top: 10px;
  background: white;
  z-index: 888;
  padding: 10px;
  border: 1px solid grey;
  opacity: 0.6;
  border-radius: 5px;
}
.config label {
  margin-right: 5px;
}
.config input {
  padding: 3px;
  outline: none;
}
.container {
  display: flex;
  height: 100%;
}
.vue-codemirror,
.CodeMirror {
  height: 100%;
}
.left,
.right {
  position: relative;
  width: calc(50vw - 12px);
  height: calc(100vh - 12px);
  margin: 5px;
  border: 1px solid grey;
}
</style>