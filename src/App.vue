<template>
  <div id="app">
    <h1>Práctica convocatoria</h1>

    <ListarData></ListarData>
  </div>
</template>

<script>
import ListarData from "./components/ListarData.vue";
export default {
  name: "App",
  components: {
    ListarData,
  },
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
