window.updateProgressBadges = function() {
  const mapDone = localStorage.getItem('mapVisited') === 'true';
  const timelineDone = localStorage.getItem('timelineVisited') === 'true';
  const quizDone = localStorage.getItem('quizPassed') === 'true';
  document.getElementById('badgeMap').innerHTML = mapDone ? '🗺️ 地图已探' : '🗺️ 地图未探';
  document.getElementById('badgeTimeline').innerHTML = timelineDone ? '📜 文脉已阅' : '📜 未阅文脉';
  document.getElementById('badgeQuiz').innerHTML = quizDone ? '✍️ 测验通关' : '✍️ 测验未通';
};

window.initProgress = function() {
  window.updateProgressBadges();
};