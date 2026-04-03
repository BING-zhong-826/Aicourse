/**
 * 模块一：空间定位地图
 * 使用 Leaflet 实现地图初始化、标注点、古/现代地图切换
 */

let currentMap = null;

// 岳阳楼经纬度（精确坐标）
const YUELOU_COORDS = [29.374554, 113.096767];
const DONG_TING_COORDS = [29.2, 112.9];

// 初始化地图（现代底图）
function initMap() {
    if (currentMap) {
        currentMap.remove();
    }
    
    currentMap = L.map('map').setView(YUELOU_COORDS, 9);
    
    // 现代底图（CartoDB Voyager - 淡色风格，适合叠加古风元素）
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB',
        subdomains: 'abcd',
        maxZoom: 19,
        minZoom: 6
    }).addTo(currentMap);
    
    // 添加岳阳楼标注点
    const yuelouMarker = L.marker(YUELOU_COORDS, {
        icon: L.divIcon({
            className: 'custom-marker',
            html: '🏯',
            iconSize: [32, 32],
            popupAnchor: [0, -16]
        })
    }).addTo(currentMap);
    
    yuelouMarker.bindPopup(`
        <strong style="color:#8b4e2c;">🏯 岳阳楼</strong><br>
        <em>"昔闻洞庭水，今上岳阳楼。"</em><br>
        <span style="font-size:12px;">——杜甫《登岳阳楼》</span><br><br>
        <strong>文学意义：</strong>叠加效应的典型代表<br>
        李白赋诗定名 → 杜甫书写 → 范仲淹《岳阳楼记》
    `);
    
    // 添加洞庭湖标注点（范围较大，在湖心区域）
    const dongtingMarker = L.marker(DONG_TING_COORDS, {
        icon: L.divIcon({
            className: 'custom-marker',
            html: '🌊',
            iconSize: [28, 28],
            popupAnchor: [0, -14]
        })
    }).addTo(currentMap);
    
    dongtingMarker.bindPopup(`
        <strong style="color:#2c6e8f;">🌊 洞庭湖</strong><br>
        <em>"吴楚东南坼，乾坤日夜浮。"</em><br>
        <span style="font-size:12px;">——杜甫《登岳阳楼》</span><br><br>
        唐代洞庭湖湖面广阔，"坼"字写出湖水将吴楚大地分开的磅礴气势。
    `);
    
    // 添加吴、楚方位标注（大致区域）
    const wuCoords = [30.5, 118.0];
    const chuCoords = [30.0, 112.5];
    
    L.marker(wuCoords, {
        icon: L.divIcon({ className: 'custom-marker', html: '📌 吴地', iconSize: [40, 20] })
    }).addTo(currentMap).bindPopup('吴地（今江苏、浙江一带）<br>“吴楚东南坼”——洞庭湖以东为吴地');
    
    L.marker(chuCoords, {
        icon: L.divIcon({ className: 'custom-marker', html: '📌 楚地', iconSize: [40, 20] })
    }).addTo(currentMap).bindPopup('楚地（今湖南、湖北一带）<br>“吴楚东南坼”——洞庭湖以西为楚地');
}

// 切换到古地图风格（叠加半透明古代舆图效果）
function switchToAncientMap() {
    if (!currentMap) return;
    
    // 移除现有图层，添加更古风的地图底图（Stamen Toner 黑白风格）
    currentMap.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
            currentMap.removeLayer(layer);
        }
    });
    
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>',
        maxZoom: 18
    }).addTo(currentMap);
    
    // 显示提示
    L.popup()
        .setLatLng(YUELOU_COORDS)
        .setContent('🏯 古地图模式 · 遥想杜甫当年登临岳阳楼时所见之景')
        .openOn(currentMap);
}

// 切换到现代地图
function switchToModernMap() {
    if (!currentMap) return;
    
    currentMap.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
            currentMap.removeLayer(layer);
        }
    });
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OSM & CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(currentMap);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    
    // 绑定地图切换按钮
    const btnModern = document.getElementById('btnModernMap');
    const btnAncient = document.getElementById('btnAncientMap');
    
    if (btnModern) {
        btnModern.addEventListener('click', () => {
            switchToModernMap();
            btnModern.classList.add('active');
            btnAncient.classList.remove('active');
        });
    }
    
    if (btnAncient) {
        btnAncient.addEventListener('click', () => {
            switchToAncientMap();
            btnAncient.classList.add('active');
            btnModern.classList.remove('active');
        });
    }
});