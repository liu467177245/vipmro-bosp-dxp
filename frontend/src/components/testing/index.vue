<template>
  <div class="webui-tab">


    <vipmro-layout-top>



    </vipmro-layout-top>
    <vipmro-layout-main>

      <vipmro-button
        title="title"
      ></vipmro-button>
      <br/>
      <vipmro-textarea
        :width="500"
        :top="0"
        :trimFrontBackSpace="trimFrontBackSpace"
        :trimHtml="trimHtml"
        :trimSpace="trimSpace"
        v-model="value"
      ></vipmro-textarea>


    </vipmro-layout-main>

    <vipmro-layout-bottom>



    </vipmro-layout-bottom>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
      };
    }
  };
</script>
