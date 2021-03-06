[![CircleCI](https://circleci.com/gh/createts/createts/tree/master.svg?style=svg)](https://circleci.com/gh/createts/createts/tree/master)

# CreateTs

A typescript 2D game framework.

## Quick Start

One major goal of CreateTs is to make the canvas based game development easier, you can use html to define the layout and css to define the styles, here is an example to draw CreateTs logo (you can find it in [https://createts.org/](https://createts.org/)):

```javascript
const canvas = document.getElementById('logo');
canvas.width = canvas.clientWidth * 2;
canvas.height = canvas.clientHeight * 2;
let stage = new createts.Stage(canvas, { fps: 60 });
stage
  .load(
    `<div style="margin:50 0 0 0;width:400;height:500;">
<div id=heart1 style="width:360px;height:360px;position:absolute;left:20;top:0;">
    <div style="position:absolute;left:180;top:-49.5;width:200px;rotation:45;perspective-origin:0 100;height:100px;border-radius:100 100 0 0;background:#7952b366;"></div>
    <div style="position:absolute;left:80;top:50;width:300px;rotation:45;perspective-origin:100 0;height:200px;border-radius:100 0 0 100;background:#7952b366;"></div>
</div>
<div style="width:360px;height:360px;position:absolute;left:20;top:0;">
    <div style="position:absolute;left:180;top:-49.5;width:200px;rotation:45;perspective-origin:0 100;height:100px;border-radius:100 100 0 0;background:rgba(66,46,68,.4);"></div>
    <div style="position:absolute;left:80;top:50;width:300px;rotation:45;perspective-origin:100 0;height:200px;border-radius:100 0 0 100;background:rgba(66,46,68,.4);"></div>
</div>  
<text style='font-size:80;font-family:tahoma;color:#7952b3;position:absolute;left:0;top:420;width:100%;text-align:center;'>CreateTs</text>
</div>`
  )
  .start();

stage
  .animate(stage.findById('heart1'), true)
  .loop(true)
  .css({ rotation: -180 }, 500, 'quadInOut')
  .css({ transformY: 50 }, 500, 'quadInOut')
  .wait(2000)
  .css({ transformY: 0 }, 500, 'quadInOut')
  .css({ rotation: 0 }, 500, 'quadInOut')
  .wait(2000);
```

## Platform Support

1. Support for modern browsers like Chrome, Firefox, Safari and IE, the detailed minimal support version will be updated later.
1. [Wechat Mini Game](https://developers.weixin.qq.com/minigame/dev/guide/) is supported, you can checkout the demos [here](https://github.com/createts/createts-wechat-mini-game-demos).
1. [Toutiao Mini Game](https://developer.toutiao.com/) will be supported soon.

## Progress

CreateTs is still in early stage, next milestone will be pre-beta version.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019-present
