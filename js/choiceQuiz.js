const choiceQuestions = [
  { text: "下列对杜甫生平的表述，不正确的一项是（ ）", options: ["A. 杜甫，字子美，自号少陵野老，唐代伟大的现实主义诗人", "B. 杜甫一生经历安史之乱，其诗歌多反映社会动荡和人民疾苦", "C. 杜甫与李白并称“李杜”，被后人尊为“诗圣”，其诗被称为“诗史”", "D. 杜甫晚年仕途顺遂，隐居于洛阳，得以安度晚年，《登岳阳楼》便是此时所作"], correct: "D" },
  { text: "杜甫创作《登岳阳楼》时，所处的人生阶段和心境，表述最准确的是（ ）", options: ["A. 青年时期，壮志满怀，登楼抒怀，抒发建功立业的豪情", "B. 中年时期，历经战乱，登楼感慨，抒发忧国忧民与漂泊之苦", "C. 晚年时期，年老多病、漂泊无依，登楼触景生情，悲叹身世与家国命运", "D. 晚年时期，隐居山林，心境淡然，登楼观赏美景，抒发闲适之情"], correct: "C" },
  { text: "下列关于《登岳阳楼》的体裁，表述正确的一项是（ ）", options: ["A. 五言绝句，语言凝练，意境深远", "B. 五言律诗，对仗工整，平仄协调", "C. 七言绝句，短小精悍，节奏明快", "D. 七言律诗，格律严谨，情感深沉"], correct: "D" },
  { text: "岳阳楼作为江南三大名楼之一，下列文人墨客中，未留下与岳阳楼相关诗文的是（ ）", options: ["A.孟浩然", "B. 李白", "C. 苏轼", "D. 范仲淹"], correct: "C" },
  { text: "下列诗句中，与洞庭湖的壮阔景象无关的一项是（ ）", options: ["A. 吴楚东南坼，乾坤日夜浮", "B. 气蒸云梦泽，波撼岳阳城", "C. 衔远山，吞长江，浩浩汤汤，横无际涯", "D. 欲穷千里目，更上一层楼"], correct: "D" },
  { text: "杜甫被后人尊为“诗圣”，其诗歌被称为“诗史”，主要原因是（ ）", options: ["A. 其诗歌艺术成就极高，开创了新的诗歌风格", "B. 其诗歌真实记录了安史之乱前后的社会现实，反映了时代苦难与人民疾苦", "C. 其诗歌题材广泛，涵盖山水、边塞、咏史等多种类型", "D. 其诗歌语言凝练，对仗工整，具有极高的文学价值"], correct: "B" },
  { text: "下列对《登岳阳楼》中“亲朋无一字，老病有孤舟”一句的理解，不正确的一项是（ ）", options: ["A. “亲朋无一字”写出了杜甫晚年漂泊无依，与亲友失去联系的孤独", "B. “老病”二字点明杜甫创作此诗时的身体状况，年老且多病", "C. “孤舟”是诗人漂泊生活的象征，暗含对命运的无奈与悲凉", "D. 此句主要抒发了诗人对亲友的思念之情，与家国情怀无关"], correct: "D" },
  { text: "洞庭湖是我国第二大淡水湖，下列关于洞庭湖的文学常识，表述错误的一项是（ ）", options: ["A. 洞庭湖位于湖南省北部，是长江流域重要的调蓄湖泊", "B. 除杜甫、孟浩然外，李白、贾岛等诗人也有描写洞庭湖的诗句", "C. 范仲淹《岳阳楼记》中“浩浩汤汤，横无际涯”描写的是洞庭湖的壮阔", "D. 洞庭湖仅在古代文学作品中出现，现代已无相关文化印记"], correct: "D" },
  { text: "下列关于杜甫诗歌风格“沉郁顿挫”的理解，最准确的一项是（ ）", options: ["A. “沉郁”指情感明快激昂，“顿挫”指语言流畅自然", "B. “沉郁”指情感深沉悲凉，“顿挫”指语言凝练、节奏跌宕", "C. “沉郁”指题材宏大，“顿挫”指对仗工整、平仄协调", "D. “沉郁”指意境开阔，“顿挫”指情感真挚、通俗易懂"], correct: "B" },
  { text: "下列作品中，与《登岳阳楼》创作背景（安史之乱后，社会动荡）最接近的一项是（ ）", options: ["A. 李白《蜀道难》", "B. 杜甫《登高》", "C. 范仲淹《岳阳楼记》", "D. 孟浩然《望洞庭湖赠张丞相》"], correct: "B" }
];

function renderChoiceQuiz() {
  const container = document.getElementById('choiceQuestionsContainer');
  if (!container) return;
  let html = '';
  choiceQuestions.forEach((q, idx) => {
    html += `<div class="choice-item" data-q="${idx}"><div class="fill-question">${idx+1}. ${q.text}</div>`;
    q.options.forEach(opt => {
      html += `<label class="choice-option"><input type="radio" name="choice${idx}" value="${opt.charAt(0)}"> ${opt}</label>`;
    });
    html += `</div>`;
  });
  container.innerHTML = html;
}

function calcChoiceScore() {
  let score = 0;
  for (let i = 0; i < choiceQuestions.length; i++) {
    const selected = document.querySelector(`input[name="choice${i}"]:checked`);
    if (selected && selected.value === choiceQuestions[i].correct) score++;
  }
  return score;
}

window.initChoiceQuiz = function() {
  renderChoiceQuiz();
  document.getElementById('submitChoiceBtn').onclick = () => {
    const score = calcChoiceScore();
    document.getElementById('choiceScore').innerHTML = `选择题得分: ${score}/10`;
    if (typeof window.updateTotalScore === 'function') window.updateTotalScore();
  };
};