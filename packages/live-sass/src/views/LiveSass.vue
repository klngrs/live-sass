<template>
  <div class="live-sass" style="display:flex;height:calc(100vh - 58px);margin-top:58px;">
    <div class="theme" style="flex-grow:1;">
      <home-view></home-view>
    </div>
    <div class="scss" style="flex-grow:0;display:flex;flex-direction:column;flex-basis:400px;max-width:400px">
      <!--      @input="(evt) => compile(evt.target.value)" -->
      <textarea v-model="sassInput" placeholder="Write your scss here" class="scss-input form-control"
                style="flex-basis:50%;flex-grow:1;resize:none;">
      </textarea>
      <button class="btn btn-primary" @click="() => compile(sassInput)">Compile</button>
      <div class="scss-output" style="text-align:left;flex-basis:50%;flex-grow:1;border: 1px solid #ccc;border-radius:4px;background-color:#1e1e1e;color:#f1f1f1;">
        {{ sassOutput }}
      </div>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";

import('wasm-sass/main');
import HomeView from './HomeView.vue';

export default {
  name: 'live-sass',
  components: {
    HomeView,
  },
  data() {
    return {
      sass: null,
      sassInput: '.home {\n    h1 {\n        color: red;\n    }\n }',
      sassOutput: '',
      styleTag: document.createElement('style'),
    };
  },
  created() {
    window.addEventListener('wasm-sass-ready', (event) => {
      console.log('wasm-sass is available:', event.sass);
    });
  },
  mounted() {
    this.$el.prepend(this.styleTag);
  },
  methods: {
    async compile(input) {
      try {
        console.log('[compile]: sass input: ', input)
        // this.sassInput = event?.target?.value || this.sassInput;
        this.sassOutput = window.sass ? window.sass.compile(input.trim()) : '';
        this.styleTag.textContent = this.sassOutput;
      } catch (e) {
        console.error(e);
      }
    },
    updateStyleTag() {
    },
  },
  // computed: {
  //   sassOutput() {
  //     console.debug('computed...');
  //     return window.sass ? window.sass.compile(this.sassInput) : '';
  //   },
  // },
};
</script>

<!--<style>-->
<!--.scss-input:hover {-->
<!--  /*background-color: #f1f1f1*/-->
<!--}-->
<!--</style>-->
