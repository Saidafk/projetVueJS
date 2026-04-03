<template>
  <div
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
    @touchmove="onTouchMove"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mouseleave="onMouseLeave"
    style="user-select: none;"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "TouchEvents",
  emits: ["swipe-left", "swipe-right", "long-press"],
  data() {
    return {
      touchStartX: 0,
      touchStartY: 0,
      touchStartTime: 0,
      longPressTimeout: null,
      isLongPress: false,
    };
  },
  methods: {
    onTouchStart(e) {
      const touch = e.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      this.touchStartTime = Date.now();
      this.isLongPress = false;
      this.longPressTimeout = setTimeout(() => {
        this.isLongPress = true;
        this.$emit("long-press");
      }, 600);
    },
    onTouchEnd(e) {
      clearTimeout(this.longPressTimeout);
      if (this.isLongPress) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - this.touchStartX;
      const dy = touch.clientY - this.touchStartY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) this.$emit("swipe-right");
        else this.$emit("swipe-left");
      }
    },
    onTouchMove() {
      clearTimeout(this.longPressTimeout);
    },
    onMouseDown(e) {
      this.touchStartX = e.clientX;
      this.touchStartY = e.clientY;
      this.touchStartTime = Date.now();
      this.isLongPress = false;
      this.longPressTimeout = setTimeout(() => {
        this.isLongPress = true;
        this.$emit("long-press");
      }, 600);
    },
    onMouseUp(e) {
      clearTimeout(this.longPressTimeout);
      if (this.isLongPress) return;
      const dx = e.clientX - this.touchStartX;
      const dy = e.clientY - this.touchStartY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) this.$emit("swipe-right");
        else this.$emit("swipe-left");
      }
    },
    onMouseLeave() {
      clearTimeout(this.longPressTimeout);
    },
  },
};
</script>

<style scoped>
/* Ajoute ici un style si besoin */
</style>
