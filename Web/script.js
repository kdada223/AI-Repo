const lyricsDB = {
    love: [
        "사랑은 타이밍이 아니라, 네가 마음을 여는 순간 시작돼.",
        "수많은 별들 중에서도 네 마음은 가장 밝게 빛나고 있어.",
        "서로의 속도가 달라도 결국 같은 풍경을 보게 될 거야."
    ],
    career: [
        "지금 걷는 이 길이 막막해도, 너만의 지도가 그려지고 있어.",
        "실패는 시스템 오류일 뿐, 너라는 프로그램은 완벽해.",
        "레벨업 직전이 가장 힘든 법이야. 조금만 더 힘내."
    ],
    health: [
        "가끔은 '일시정지' 버튼을 눌러도 괜찮아. 너는 충분히 달렸어.",
        "충전이 필요한 배터리처럼, 너에게도 쉼표가 필요해.",
        "오늘 하루 고생한 너에게, 따뜻한 위로의 패치를 보낼게."
    ],
    default: [
        "너의 오늘이 내일의 가장 멋진 오프닝 곡이 될 거야.",
        "괜찮아, 인생은 픽셀 하나하나가 모여 완성되는 예술이니까.",
        "네가 믿는 그 방향이 바로 정답으로 가는 지름길이야."
    ]
};

const pixelIcons = {
    love: `<svg width="80" height="80" viewBox="0 0 8 8"><path d="M1 2h1v1H1zM2 1h1v1H2zM3 1h2v1H3zM5 1h1v1H5zM6 2h1v1H6zM7 3v2H6v1H5v1H4v-1H3v-1H2v-1H1V3h1v-1" fill="#ff00ff"/></svg>`,
    career: `<svg width="80" height="80" viewBox="0 0 8 8"><path d="M3 1h2v1H3zM2 2h4v1H2zM1 3h6v2H1zM2 5h4v1H2zM3 6h2v1H3z" fill="#ffff00"/></svg>`,
    health: `<svg width="80" height="80" viewBox="0 0 8 8"><path d="M3 1h2v1H3zM2 2h1v4H2zM5 2h1v4H5zM3 6h2v1H3zM3 3h2v1H3zM3 4h2v1H3z" fill="#00f2ff"/></svg>`,
    default: `<svg width="80" height="80" viewBox="0 0 8 8"><path d="M2 1h4v1H2zM1 2h1v4H1zM6 2h1v4H6zM2 6h4v1H2zM3 3h2v2H3z" fill="#ffffff"/></svg>`
};

const generateBtn = document.getElementById('generate-btn');
const retryBtn = document.getElementById('retry-btn');
const inputSection = document.getElementById('input-section');
const resultSection = document.getElementById('result-section');

generateBtn.addEventListener('click', () => {
    const name = document.getElementById('username').value.trim();
    const worry = document.getElementById('worry').value.trim();

    if (!name || !worry) {
        alert('이름과 고민을 모두 입력해 주세요!');
        return;
    }

    // 간단한 키워드 분석
    let category = 'default';
    if (worry.includes('사랑') || worry.includes('연애') || worry.includes('사람')) category = 'love';
    else if (worry.includes('일') || worry.includes('취업') || worry.includes('공부') || worry.includes('돈')) category = 'career';
    else if (worry.includes('피곤') || worry.includes('아파') || worry.includes('잠') || worry.includes('건강')) category = 'health';

    // 랜덤 가사 선택
    const categoryLyrics = lyricsDB[category];
    const randomLyric = categoryLyrics[Math.floor(Math.random() * categoryLyrics.length)];

    // 결과 표시
    document.getElementById('result-name').innerText = `${name}님을 위한 비트 부적`;
    document.getElementById('result-lyric').innerText = `"${randomLyric}"`;
    document.getElementById('pixel-icon-container').innerHTML = pixelIcons[category];

    inputSection.classList.add('hidden');
    resultSection.classList.remove('hidden');
});

retryBtn.addEventListener('click', () => {
    inputSection.classList.remove('hidden');
    resultSection.classList.add('hidden');
    document.getElementById('worry').value = '';
});
