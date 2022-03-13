/* eslint-disable no-param-reassign */
export default function (start, end, dom, prop) {
  let disX = 0;
  let speed = 5;
  let timer = null;
  if (end < 0) {
    speed *= -1;
  }
  timer = setInterval(() => {
    disX += speed;
    dom[prop] = start + disX;
    if (Math.abs(disX) > Math.abs(end)) {
      dom[prop] = start + end;
      clearInterval(timer);
    }
  }, 2);
}
