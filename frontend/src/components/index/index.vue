<template>
  <div>
    <VipmroJsonEditor
      :props="props"
      :options="options"
      :forbitDrag="forbitDrag"
      :forbitDrop="forbitDrop"
      :defaultExpandedKeys="defaultExpandedKeys"
      @dragEnd="handleDragEnd"
      @nodeClick="handleNodeClick"
    ></VipmroJsonEditor>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        /* 节点参数 */
        props: {
          children: 'children',
          label: 'name'
        },
        /* 不允许拖拽的节点 */
        forbitDrag: [1, 10],
        /* 拖拽不允许放置的节点 */
        forbitDrop: [2],
        /* 默认展开的节点 */
        defaultExpandedKeys: [1, 4, 9],
        options: [{
          id: '182858281641975800',
          name: '一级 1',
          children: [{
            id: '182858281641975800',
            name: '二级 1-1',
            children: [{
              id: 9,
              name: '三级 1-1-1'
            }, {
              id: 10,
              name: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          name: '一级 2 <button>123</button>',
          children: [{
            id: 5,
            name: '二级 2-1'
          }, {
            id: 6,
            name: '二级 2-2'
          }]
        }]
      };
    },
    methods: {
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end');
      },
      handleNodeClick(data, node, component) {
        console.log('node click');
      }
    }
  };
</script>
