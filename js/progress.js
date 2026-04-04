window.updateProgressBadges = function() {
    const mapDone = localStorage.getItem('mapVisited') === 'true';
    const timelineDone = localStorage.getItem('timelineVisited') === 'true';
    const quizDone = localStorage.getItem('quizPassed') === 'true';
    const badgeMap = document.getElementById('badgeMap');
    const badgeTimeline = document.getElementById('badgeTimeline');
    const badgeQuiz = document.getElementById('badgeQuiz');
    if (badgeMap) badgeMap.innerHTML = mapDone ? '🗺️ 地图已探' : '🗺️ 地图未探';
    if (badgeTimeline) badgeTimeline.innerHTML = timelineDone ? '📜 文脉已阅' : '📜 未阅文脉';
    if (badgeQuiz) badgeQuiz.innerHTML = quizDone ? '✍️ 测验通关' : '✍️ 测验未通';
};

window.initProgress = function() {
    window.updateProgressBadges();
};