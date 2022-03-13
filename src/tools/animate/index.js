import Vue from 'vue';
import component from '../index.vue';

const Animate = Vue.extend(component);

export default function (imgWidth, imgHeight, startX, startY, endX, endY, imgSrc) {
  const app = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        imgWidth,
        imgHeight,
        imgSrc,
        moveX: startX,
        moveY: startY,
        scaleX: 1,
        scaleY: 1,
        opacity: 1,
        exit: true,
      };
    },
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.moveX = endX;
    app.moveY = endY;
    app.scaleX = 0.1;
    app.scaleY = 0.1;
    app.opacity = 0;
  }, 0);
  setTimeout(() => {
    app.exit = false;
  }, 1000);
}
