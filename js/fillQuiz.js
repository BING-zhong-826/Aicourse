const fillQuestions = [
  { text: "杜甫在《登岳阳楼》中用\"__________，__________\"两句，写出了国家动荡不安、自己报国无门只有独自流泪的深沉的家国情怀。", ans1: "戎马关山北", ans2: "凭轩涕泗流" },
  { text: "孟浩然的“气蒸云梦泽，波撼岳阳城”与杜甫《登岳阳楼》中的\"__________，__________\"都写出了洞庭湖浩瀚无垠的磅礴气势。", ans1: "吴楚东南坼", ans2: "乾坤日夜浮" },
  { text: "杜甫《登高》中“万里悲秋常作客，百年多病独登台”描写晚年孤独，《登岳阳楼》中\"__________，__________\"也写出类似境况。", ans1: "亲朋无一字", ans2: "老病有孤舟" },
  { text: "《登岳阳楼》中开篇点题，交代登楼缘由的诗句是：\"__________，__________\"。", ans1: "昔闻洞庭水", ans2: "今上岳阳楼" },
  { text: "杜甫《登岳阳楼》中，以个人微薄身世反衬洞庭湖壮阔，抒发孤独漂泊之感的句子是：\"__________，__________\"", ans1: "亲朋无一字", ans2: "老病有孤舟" },
  { text: "《登岳阳楼》中，将个人命运与国家命运紧密相连，尽显忧国忧民情怀的千古名句是：\"__________，__________\"", ans1: "戎马关山北", ans2: "凭轩涕泗流" },
  { text: "《登岳阳楼》中，总写洞庭湖壮丽景象，被誉为描写洞庭湖千古绝唱的两句诗是：\"__________，__________\"", ans1: "吴楚东南坼", ans2: "乾坤日夜浮" },
  { text: "杜甫在《登岳阳楼》中，写自己年老多病、孤身一人、漂泊无依的诗句是：\"__________，__________\"。", ans1: "亲朋无一字", ans2: "老病有孤舟" }
];

function renderFillQuiz() {
  const container = document.getElementById('fillQuestionsContainer');
  if (!container) return;
  let html = '';
  fillQuestions.forEach((q, idx) => {
    html += `
      <div class="fill-blank-item" data-idx="${idx}">
        <div class="fill-question">${idx+1}. ${q.text}</div>
        <input type="text" class="fill-input" placeholder="上句" data-ans="${q.ans1}">
        <input type="text" class="fill-input" placeholder="下句" data-ans="${q.ans2}">
        <span class="fill-feedback"></span>
      </div>
    `;
  });
  container.innerHTML = html;
}

function checkFill() {
  let score = 0;
  document.querySelectorAll('.fill-blank-item').forEach(item => {
    const inputs = item.querySelectorAll('.fill-input');
    const ans1 = inputs[0].dataset.ans, ans2 = inputs[1].dataset.ans;
    const val1 = inputs[0].value.trim(), val2 = inputs[1].value.trim();
    const fb = item.querySelector('.fill-feedback');
    if (val1 === ans1 && val2 === ans2) {
      score++;
      fb.innerHTML = ' ✓ 正确'; fb.style.color = '#8bc34a';
    } else {
      fb.innerHTML = ` ✗ 正确答案：${ans1} ${ans2}`; fb.style.color = '#ff8a80';
    }
  });
  document.getElementById('fillScore').innerHTML = `填空题得分: ${score}/8`;
  return score;
}

window.initFillQuiz = function() {
  renderFillQuiz();
  document.getElementById('submitFillBtn').onclick = () => {
    checkFill();
    if (typeof window.updateTotalScore === 'function') window.updateTotalScore();
  };
};