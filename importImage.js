

let main = async () => {
// BVG file, which can be exported by Beam Studio
// you can use js FileReader to read string from .bvg file too.

//更換圖片絕對路徑 xlink:href="圖片路徑"
//data-repeat 雷射次數
//data-strength 雷射功率
//data-speed 激光速度
//title 圖層名稱
// x 起始x座標位置
// y 起始y座標位置
// width 圖片寬度
// height 圖片高度
const bvg = `
<svg id = "forlaser" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g data-repeat="1" data-strength="1" data-speed="20" clip-path="url(#scene_mask)" data-color="#333333" class="layer">
     <title>圖層1</title>
     
     <image x="500" y="500" width="500" height="500" xlink:href="/Users/dongtangyun/Desktop/javascript/mqtt/image.png"/>
     </g> 
     </svg>`;

let beamAPI = new EasyManipulator();

const onLoad = (event) => {
    console.log('BVG loaded');
};
const onError = (event) => {
    console.log('Error', event.detail);
};
const oldOnDone = (event) => {
    console.log('Task Done', event.detail);
};
//Use addEventListener to register event 
beamAPI.addEventListener('LOAD', onLoad);
beamAPI.addEventListener('DONE', oldOnDone);
beamAPI.addEventListener('ERROR', onError);

let res;
// Machine Name Here
res = await beamAPI.selectMachine('Mark');
// Click Beam Studio -> Menubar -> Help -> Debug Tool to open the console
console.log('Select result:', res);
res = await beamAPI.loadBVG(bvg);
console.log('Load BVG result:', res);
res = await beamAPI.calculate();
console.log('Calculate result:', res);

// Use removeEventListener to remove event function
beamAPI.removeEventListener('DONE', oldOnDone);

res = await beamAPI.start();
console.log('Start result:', res);

let interval = window.setInterval(() => {
    console.log(beamAPI.getStatus());
}, 2000);

const newOnDone = (event) => {
    console.log('(New) Task done', event.detail);
    window.clearInterval(interval);
};
beamAPI.addEventListener('DONE', newOnDone);
}
main();   
