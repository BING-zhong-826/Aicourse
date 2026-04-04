let map;
let currentLayer;
const yueyangCoords = [29.3746, 113.0968];
const dongtingCoords = [29.2, 112.9];

window.initMapModule = function(containerId) {
    if (map) {
        map.remove();
        map = null;
    }
    map = L.map(containerId).setView(yueyangCoords, 9);
    const modernLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OSM & CartoDB'
    });
    modernLayer.addTo(map);
    currentLayer = modernLayer;

    L.marker(yueyangCoords).bindPopup(`
        <b>🏯 岳阳楼</b><br>
        “昔闻洞庭水，今上岳阳楼。”<br>
        <i>杜甫《登岳阳楼》</i><br>
        <span style="font-size:12px;">李白赋诗定名 · 杜甫书写壮阔 · 范仲淹《岳阳楼记》</span>
    `).addTo(map);
    L.marker(dongtingCoords).bindPopup(`
        <b>🌊 洞庭湖</b><br>
        “吴楚东南坼，乾坤日夜浮。”<br>
        唐代湖面辽阔，“坼”字写尽磅礴气势。
    `).addTo(map);

    // 绑定按钮事件（注意：这些按钮在模块加载后才存在）
    setTimeout(() => {
        const modernBtn = document.getElementById('modernMapBtn');
        const ancientBtn = document.getElementById('ancientMapBtn');
        if (modernBtn && ancientBtn) {
            modernBtn.onclick = () => {
                map.removeLayer(currentLayer);
                const newLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                    attribution: '&copy; OSM & CartoDB'
                });
                newLayer.addTo(map);
                currentLayer = newLayer;
                modernBtn.classList.add('active');
                ancientBtn.classList.remove('active');
                localStorage.setItem('mapVisited', 'true');
                if (typeof window.updateProgressBadges === 'function') window.updateProgressBadges();
            };
            ancientBtn.onclick = () => {
                map.removeLayer(currentLayer);
                const ancientLayer = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
                    attribution: 'Map tiles by Stamen Design'
                });
                ancientLayer.addTo(map);
                currentLayer = ancientLayer;
                ancientBtn.classList.add('active');
                modernBtn.classList.remove('active');
                localStorage.setItem('mapVisited', 'true');
                if (typeof window.updateProgressBadges === 'function') window.updateProgressBadges();
            };
        }
    }, 100);
};