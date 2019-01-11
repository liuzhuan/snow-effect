const STAGE_WIDTH = 550;
const STAGE_HEIGHT = 400;

init();

function init() {
    const ctx = document.querySelector('#app')
        .getContext('2d');
    const snowflakes = createSnowFlakes(1000);
    setInterval(function(){
        update(snowflakes);
        render(ctx, snowflakes);
    }, 1000/60);
}

function update(items) {
    const windX = 1;
    items.forEach(item => {
        item.t += 0.05;
        item.y += item.ty;
        item.x += Math.cos(item.t + item.p) * item.z * 1 + windX;

        if (item.x < 0) {
            item.x += STAGE_WIDTH;
        } else if (item.x > STAGE_WIDTH) {
            item.x -= STAGE_WIDTH;
        }
        
        if (item.y > STAGE_HEIGHT) {
            item.y = -10;
        }
    })
}

/**
 * 绘制屏幕
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Array} items 
 */
function render(ctx, items) {
    ctx.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
    ctx.fillStyle = '#ffffff';

    items.forEach(item => {
        const { x, y, r } = item;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    })
}

function createSnowFlakes(num) {
    const items = new Array(num);
    for (let i = 0; i < num; i++) {
        items[i] = createSnowFlake();
    }
    return items;
}

function createSnowFlake() {
    const z = Math.random();
    return {
        x: Math.random() * STAGE_WIDTH,
        y: Math.random() * STAGE_HEIGHT,
        ty: Math.random() * 0.25 + z,
        p: Math.random() * Math.PI * 2,
        r: z * 4,
        t: 0,
        z: z,
    }
}