let map;
let currentLayer;
const yueyangCoords = [29.3746, 113.0968];
const dongtingCoords = [29.2, 112.9];

function initMap() {
    map = L.map('map').setView(yueyangCoords, 9);
    const modernLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CartoDB'
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

    document.getElementById('modernMapBtn').onclick = () => {
        map.removeLayer(currentLayer);
        const newLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OSM & CartoDB'
        });
        newLayer.addTo(map);
        currentLayer = newLayer;
        document.getElementById('modernMapBtn').classList.add('active');
        document.getElementById('ancientMapBtn').classList.remove('active');
        localStorage.setItem('mapVisited', 'true');
        if (typeof updateProgressBadges === 'function') updateProgressBadges();
    };
    document.getElementById('ancientMapBtn').onclick = () => {
        map.removeLayer(currentLayer);
        const ancientLayer = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by Stamen Design'
        });
        ancientLayer.addTo(map);
        currentLayer = ancientLayer;
        document.getElementById('ancientMapBtn').classList.add('active');
        document.getElementById('modernMapBtn').classList.remove('active');
        localStorage.setItem('mapVisited', 'true');
        if (typeof updateProgressBadges === 'function') updateProgressBadges();
    };
}

document.addEventListener('DOMContentLoaded', initMap);