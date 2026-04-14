// 时间轴数据（包含背景图）
const timelineData = [
  { year: 733, author: "孟浩然", title: "望洞庭湖赠张丞相", content: "八月湖水平，涵虚混太清。\n气蒸云梦泽，波撼岳阳城。\n欲济无舟楫，端居耻圣明。\n坐观垂钓者，徒有羡鱼情。", note: "孟浩然登临岳阳楼，以洞庭湖壮景自喻怀才不遇。", bg: "poem-bg-1.jpg" },
  { year: 759, author: "李白", title: "与夏十二登岳阳楼", content: "楼观岳阳尽，川迥洞庭开。\n雁引愁心去，山衔好月来。\n云间连下榻，天上接行杯。\n醉后凉风起，吹人舞袖回。", note: "李白为岳阳楼定名，豪迈浪漫。", bg: "poem-bg-2.jpg" },
  { year: 768, author: "杜甫", title: "登岳阳楼", content: "昔闻洞庭水，今上岳阳楼。\n吴楚东南坼，乾坤日夜浮。\n亲朋无一字，老病有孤舟。\n戎马关山北，凭轩涕泗流。", note: "“盛唐五律第一”，沉郁顿挫，家国同悲。", bg: "poem-bg-3.jpg" },
  { year: 819, author: "白居易", title: "题岳阳楼", content: "岳阳城下水漫漫，独上危楼凭曲阑。\n春岸绿时连梦泽，夕波红处近长安。\n猿攀树立啼何苦，雁点湖飞渡亦难。\n此地唯堪画图障，华堂张与贵人看。", note: "白居易被贬江州途中登楼，借景抒怀。", bg: "poem-bg-4.jpg" },
  { year: 847, author: "李商隐", title: "岳阳楼", content: "汉水方城带百蛮，四邻谁道乱周班。\n如何一梦高唐雨，自此无心入武关。", note: "李商隐咏史之作，暗含对时局的感慨。", bg: "poem-bg-5.jpg" },
  { year: 1046, author: "范仲淹", title: "岳阳楼记", content: "予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯……不以物喜，不以己悲。居庙堂之高则忧其民，处江湖之远则忧其君。先天下之忧而忧，后天下之乐而乐。", note: "千古名篇，“先忧后乐”精神坐标。", bg: "poem-bg-6.jpg" },
  { year: 1102, author: "黄庭坚", title: "雨中登岳阳楼望君山", content: "投荒万死鬓毛斑，生入瞿塘滟滪关。\n未到江南先一笑，岳阳楼上对君山。\n\n满川风雨独凭栏，绾结湘娥十二鬟。\n可惜不当湖水面，银山堆里看青山。", note: "黄庭坚遇赦归来，豁达中见苍凉。", bg: "poem-bg-7.jpg" },
  { year: 1178, author: "陆游", title: "岳阳楼", content: "身如病鹤短翅翎，雨雪飘洒号沙汀。\n天风忽吹不得住，东下巴峡泛洞庭。\n轩皇张乐虽已矣，此地至今朝百灵。\n雄楼岌嶪镇吴楚，我来举手扪天星。", note: "陆游借岳阳楼抒发壮志难酬的悲愤。", bg: "poem-bg-8.jpg" },
  { year: 1438, author: "李应祖等", title: "《岳阳楼诗集》", content: "明代文人整理汇编历代题咏岳阳楼诗作，为文学景观留存重要文献。", note: "诗集编纂，文脉叠加。", bg: "poem-bg-9.jpg" },
  { year: 1897, author: "黄遵宪", title: "上岳阳楼", content: "巍峨雄关据上游，重湖八百望中收。\n当心忽压秦头日，画地难分禹迹州。\n从古荆蛮原小丑，即今砥柱孰中流。\n红髯碧眼知何意，挈镜来登最上头。", note: "晚清外交家登楼感怀，忧国忧民。", bg: "poem-bg-10.jpg" },
  { year: 1963, author: "老舍", title: "登岳阳楼", content: "昨别秦皇岛，今上岳阳楼。\n湖光八百里，风色近中秋。\n鱼米荣公社，云波歌壮游；\n凭栏欣北望，日夜大江流。", note: "现代文学家老舍登楼，赞美祖国山河。", bg: "poem-bg-11.jpg" },
  { year: 1992, author: "何永沂", title: "登岳阳楼", content: "壮哉后乐却先忧，忧地忧天碰破头。\n莫笑狂儒多幼稚，君家阴处早阳谋。", note: "当代诗人借古讽今，别具一格。", bg: "poem-bg-12.jpg" },
  { year: 2009, author: "陈兴武", title: "岳阳楼次乡先正黄公度诗韵", content: "先生杖履此曾游，间气东南望渐收。\n千古江山留禹迹，四维名教丧神州。\n谠言在昔关隆替，世象如斯惜化流。\n太息中原英物尽，更谁收拾待从头。", note: "步黄遵宪诗韵，感怀历史沧桑。", bg: "poem-bg-13.jpg" }
];

// 浮层元素
const overlay = document.getElementById('poemDetailOverlay');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailPoemText');
const detailNote = document.getElementById('detailNote');
const detailAudioBtn = document.getElementById('detailAudioBtn');
let currentPoem = null;

// 全局函数：显示详情（供 onclick 调用）
window.showPoemDetail = function(index) {
  const poem = timelineData[index];
  if (!poem) return;
  currentPoem = poem;
  overlay.style.backgroundImage = `url('assets/images/${poem.bg}')`;
  detailTitle.innerText = `${poem.year}年 · ${poem.author} · 《${poem.title}》`;
  detailText.innerText = poem.content;
  detailNote.innerText = `📌 ${poem.note}`;
  overlay.classList.add('active');
};

// 关闭浮层
document.getElementById('closeDetailBtn').addEventListener('click', () => {
  overlay.classList.remove('active');
});
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('active');
});

// 朗诵
detailAudioBtn.addEventListener('click', () => {
  if (currentPoem && window.speakText) {
    window.speakText(currentPoem.content);
  }
});

// 初始化时间轴模块
window.initTimelineModule = function() {
  const container = document.querySelector('#moduleContainer .module');
  if (!container) return;

  let html = `
    <button class="back-menu-btn" id="backToMenuBtn">← 返回菜单</button>
    <div class="module-header">
      <h2 class="module-title">📜 时间轴 · 文脉溪流</h2>
      <p class="module-subtitle">点击任一卡片，品读千年诗篇</p>
    </div>
    <div class="timeline-stream">
      <div class="timeline-stream-container">
  `;
  timelineData.forEach((poem, index) => {
  html += `
    <div class="timeline-card" onclick="window.showPoemDetail(${index})">
      <div class="year">${poem.year}年</div>   <!-- 这里加上“年” -->
      <div class="author">${poem.author}</div>
      <div class="title">《${poem.title}》</div>
    </div>
  `;
});
  
  html += `</div></div>`;
  container.innerHTML = html;

  document.getElementById('backToMenuBtn').addEventListener('click', () => {
    document.getElementById('moduleContainer').innerHTML = '';
    document.getElementById('cardsMenu').style.display = 'flex';
  });
  document.getElementById('cardsMenu').style.display = 'none';
  localStorage.setItem('timelineVisited', 'true');
  if (typeof window.updateProgressBadges === 'function') window.updateProgressBadges();
};