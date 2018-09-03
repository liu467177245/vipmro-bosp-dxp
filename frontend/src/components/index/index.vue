<template>
  <div class="webui-cascader">
    <vipmro-cascader
      v-model="cascaderValue"
      :options="cascaderOptions"
      :filterable="filterable"
    ></vipmro-cascader>
    <vipmro-button
      :title="title"
      @click="changeData"
    ></vipmro-button>

    <vipmro-button
      :title="title"
      @click="reFelsh"
    ></vipmro-button>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        filterable: true,
        cascaderValue: [12231],
        title: 'tkjk',
        cascaderOptions: [{
          name: '江苏',
          id: 12231,
          children: [{
            name: '南京',
            id: 12567,
            children: [{
              name: '南京1',
              id: 125671
            }]
          }, {
            name: '苏州',
            id: 125678
          }]
        }, {
          name: '浙江',
          id: 122312
        }]
      };
    },
    methods: {
      changeData() {
          console.log(1231231);
        this.cascaderValue.push(12231);
        this.cascaderValue.push(12567);
        this.cascaderValue.push(125671);
      },
      reFelsh () {
        this.cascaderValue.splice(0, this.cascaderValue.length);
        this.cascaderValue.push(12231);
      }
    }
  };
</script>
