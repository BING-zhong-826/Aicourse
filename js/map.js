let map;
const yueyangCoords = [29.3746, 113.0968];
const dongtingCoords = [29.2, 112.9];

window.initMapModule = function(containerId) {
  if (map) {
    map.remove();
    map = null;
  }
  map = L.map(containerId).setView(yueyangCoords, 10);

  // 高德地图（色彩鲜明，无需 API Key，国内访问极快）
  // 街道图 + 标注层叠加，信息丰富且美观
  L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: ['1', '2', '3', '4'],
    attribution: '&copy; <a href="https://www.amap.com/">高德地图</a>',
    maxZoom: 18
  }).addTo(map);

  // ========== 岳阳楼标注（核心景点，用醒目图标） ==========
  const yuelouIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background: #b22222; color: white; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">🏯</div>',
    iconSize: [36, 36],
    popupAnchor: [0, -18]
  });

  L.marker(yueyangCoords, { icon: yuelouIcon })
    .bindPopup(`
      <div style="font-family: 'Noto Serif SC', serif; max-width: 280px;">
        <h3 style="color: #8b4a2c; margin: 0 0 8px 0; border-bottom: 2px solid #e9b35f; padding-bottom: 5px;">🏯 岳阳楼</h3>
        <p style="margin: 8px 0; font-style: italic;">"昔闻洞庭水，今上岳阳楼。"<br>——杜甫《登岳阳楼》</p>
        <p style="margin: 8px 0; font-size: 13px; color: #555;"><strong>文学意义：</strong>叠加效应的典型代表<br>李白赋诗定名 → 杜甫书写 → 范仲淹《岳阳楼记》</p>
        <p style="margin: 8px 0; font-size: 12px; color: #888;">📍 坐标：29.3746°N, 113.0968°E</p>
      </div>
    `)
    .addTo(map);

  // ========== 洞庭湖标注（大面积水域，用蓝色系） ==========
  const dongtingIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background: #2c6e8f; color: white; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">🌊</div>',
    iconSize: [36, 36],
    popupAnchor: [0, -18]
  });

  L.marker(dongtingCoords, { icon: dongtingIcon })
    .bindPopup(`
      <div style="font-family: 'Noto Serif SC', serif; max-width: 280px;">
        <h3 style="color: #2c6e8f; margin: 0 0 8px 0; border-bottom: 2px solid #7bb8d0; padding-bottom: 5px;">🌊 洞庭湖</h3>
        <p style="margin: 8px 0; font-style: italic;">"吴楚东南坼，乾坤日夜浮。"<br>——杜甫《登岳阳楼》</p>
        <p style="margin: 8px 0; font-size: 13px; color: #555;">唐代洞庭湖湖面广阔，"坼"字写出湖水将吴楚大地分开的磅礴气势。</p>
        <p style="margin: 8px 0; font-size: 12px; color: #888;">📍 坐标：29.2°N, 112.9°E</p>
      </div>
    `)
    .addTo(map);

  // ========== 吴地标注 ==========
  const wuCoords = [30.5, 118.0];
  const wuIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background: #d4a76a; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); font-size: 14px;">📌</div>',
    iconSize: [30, 30],
    popupAnchor: [0, -15]
  });

  L.marker(wuCoords, { icon: wuIcon })
    .bindPopup(`
      <div style="font-family: 'Noto Serif SC', serif; max-width: 250px;">
        <h4 style="color: #8b4a2c; margin: 0 0 5px 0;">📌 吴地</h4>
        <p style="margin: 5px 0; font-size: 13px;">今江苏、浙江一带<br>"吴楚东南坼"——洞庭湖以东为吴地</p>
      </div>
    `)
    .addTo(map);

  // ========== 楚地标注 ==========
  const chuCoords = [30.0, 112.5];
  const chuIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div style="background: #6f4e2e; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); font-size: 14px;">📌</div>',
    iconSize: [30, 30],
    popupAnchor: [0, -15]
  });

  L.marker(chuCoords, { icon: chuIcon })
    .bindPopup(`
      <div style="font-family: 'Noto Serif SC', serif; max-width: 250px;">
        <h4 style="color: #8b4a2c; margin: 0 0 5px 0;">📌 楚地</h4>
        <p style="margin: 5px 0; font-size: 13px;">今湖南、湖北一带<br>"吴楚东南坼"——洞庭湖以西为楚地</p>
      </div>
    `)
    .addTo(map);

  // 记录进度
  localStorage.setItem('mapVisited', 'true');
  if (typeof window.updateProgressBadges === 'function') {
    window.updateProgressBadges();
  }
};