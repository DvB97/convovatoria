<template>
  <div>
    <v-container>
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-select filterable v-model="search.type" placeholder="Seleccione tipo de busqueda">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"          
        >
        </el-option>
      </el-select>
      <el-form-item>
        <el-input
          class="filter-item"
          placeholder="Buscar datos"
          v-model="search.dato"
          clearable
        ></el-input>
      </el-form-item>
      <el-button type="success" @click="searchData()">Buscar</el-button>
    </el-form>
    <el-table
      v-loading="listLoading"
      element-loading-text="Cargando..."
      :data="data.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column fixed align="center" label="Imagen">
        <template slot-scope="scope">
          <img :src="scope.row.image" width="100" height="100" />
        </template>
      </el-table-column>
      <el-table-column fixed align="center" label="Titulo">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed align="center" label="Director">
        <template slot-scope="scope">
          <span>{{ scope.row.director }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed align="center" label="Año">
        <template slot-scope="scope">
          <span>{{ scope.row.release_date }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed align="center" label="Puntaje">
        <template slot-scope="scope">
          <span>{{ scope.row.rt_score }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.length"
      >
      </el-pagination>
    </div>
    </v-container>
  </div>
</template>

  <script>
import axios from "axios";
export default {
  name: "ListarData",
  data() {
    return {
      data: null,
      listLoading: false,
      currentPage: 1, // número de página actual
      total: 0, // número total
      pageSize: 5, //cantidad a mostrar,\
      search: {
        dato: "",
        data: [],
        type: "",
      },
      aux: [],
      options: [
        {
          value: "Titulo",
          label: "Titulo",
        },
        {
          value: "Director",
          label: "Director",
        },
        {
          value: "Año",
          label: "Año",
        },
        {
          value: "Puntaje",
          label: "Puntaje",
        },
      ],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.listLoading = true;
      axios.get("https://ghibliapi.herokuapp.com/films").then((response) => {
        this.data = response.data;
        this.aux = this.data;
        console.log(this.data);
        console.log(this.search.data);
        this.listLoading = false;
      });
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    searchData() {
      console.log(this.search.type);
      this.data = this.aux;
      if (this.search.dato != "" && this.search.type != "") {
        this.search.data = [];
        this.data.forEach((element) => {
          if (
            this.search.type === "Titulo" &&
            element.title == this.search.dato
          )
            this.search.data.push(element);
          else if (
            this.search.type === "Director" &&
            element.director == this.search.dato
          )
            this.search.data.push(element);
          else if (
            this.search.type === "Año" &&
            element.release_date == this.search.dato
          )
            this.search.data.push(element);
          else if (
            this.search.type === "Puntaje" &&
            element.rt_score == this.search.dato
          )
            this.search.data.push(element);
        });
        this.data = this.search.data;
      }
      else{
        alert("Debe seleccionar un tipo de filtro e ingresar un dato")
      }
    },
  },
};
</script>