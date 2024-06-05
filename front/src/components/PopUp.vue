<template>
  <div class="popup" v-if="isVisible">
    <div class="popup-content">
      <span class="close" @click="closePopup">&times;</span>
      <slot></slot>
      <button @click="closePopup">Ok</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopUp',
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    closePopup() {
      this.$emit('close');
      sessionStorage.setItem('popup', 'ciao')
    }
  }
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

button {
  margin-top: 20px;
}
</style>
