<template>
    <div class="item"
    :style="{
        width: `${imgWidth}px`,
        height: `${imgHeight}px`,
        opacity,
        transform: `translate(${moveX}px, ${moveY}px) scale(${scaleX}, ${scaleY})`,
    }"
    v-if="exit"
    >
        <img :src="imgSrc" >
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
    .item {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        transition: all 0.7s;
        transform-origin: 0 0;
    }

    img {
        width: 100%;
        border-radius: 50%;
    }
</style>
