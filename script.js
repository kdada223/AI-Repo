const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// 테마 초기화
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);
themeBtn.innerText = currentTheme === 'dark' ? '🌙' : '☀️';

themeBtn.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeBtn.innerText = newTheme === 'dark' ? '🌙' : '☀️';

    // Disqus 테마 업데이트를 위해 리로드 (Disqus는 보통 자동 감지하지만 명시적 리로드가 확실함)
    if (typeof DISQUS !== 'undefined') {
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = 'bit-amulet-page';
                this.page.url = window.location.href;
            }
        });
    }
});

const lyricsDB = {
    love: [
        "사랑은 서두르지 않아도 괜찮아요. 당신의 계절에 맞춰 가장 아름답게 피어날 테니까.",
        "수많은 인연 속에서도 당신의 진심은 가장 맑은 울림으로 전해질 거예요.",
        "서로의 속도가 조금 달라도, 결국 같은 노을을 보며 웃게 될 날이 올 거예요.",
        "당신이 준 작은 마음들이 모여, 누군가에게는 커다란 우주가 됩니다."
    ],
    career: [
        "지금 걷는 길이 비록 구불구불할지라도, 그 끝에는 당신만이 볼 수 있는 멋진 풍경이 기다려요.",
        "넘어지는 것은 실패가 아니라, 더 높이 뛰어오르기 위해 바닥을 짚는 과정일 뿐이에요.",
        "당신의 속도는 당신만이 결정할 수 있어요. 조급해하지 않아도 충분히 빛나고 있습니다.",
        "세상의 기준에 맞추지 않아도 괜찮아요. 당신이라는 고유한 색이 가장 아름다우니까요."
    ],
    health: [
        "애쓰지 않아도 괜찮아요. 때로는 가만히 숨을 고르는 것만으로도 충분한 하루입니다.",
        "당신의 마음이 쉴 곳을 찾을 수 있도록, 따뜻한 달빛이 당신의 밤을 지켜줄 거예요.",
        "충분히 달려온 당신에게, 오늘은 작은 쉼표 하나를 선물해주면 어떨까요?",
        "모든 것을 완벽하게 해내지 않아도 돼요. 당신은 존재만으로도 이미 소중한 사람입니다."
    ],
    default: [
        "당신이 믿고 있는 그 길이 당신을 가장 행복한 곳으로 데려다 줄 거예요.",
        "작은 픽셀들이 모여 하나의 그림이 되듯, 당신의 하루하루가 모여 찬란한 미래가 됩니다.",
        "누가 뭐래도 당신은 당신만의 아름다운 궤적을 그리며 잘 가고 있어요.",
        "오늘 하루 고생 많았어요. 당신의 내일은 오늘보다 조금 더 다정한 바람이 불어올 거예요."
    ]
};

const pixelIcons = {
    love: `<svg width="100" height="100" viewBox="0 0 8 8"><path d="M1 2h1v1H1zM2 1h1v1H2zM3 1h2v1H3zM5 1h1v1H5zM6 2h1v1H6zM7 3v2H6v1H5v1H4v-1H3v-1H2v-1H1V3h1v-1" fill="#ff7eb3"/></svg>`,
    career: `<svg width="100" height="100" viewBox="0 0 8 8"><path d="M3 1h2v1H3zM2 2h4v1H2zM1 3h6v2H1zM2 5h4v1H2zM3 6h2v1H3z" fill="#ffffa1"/></svg>`,
    health: `<svg width="100" height="100" viewBox="0 0 8 8"><path d="M3 1h2v1H3zM2 2h1v4H2zM5 2h1v4H5zM3 6h2v1H3zM3 3h2v1H3zM3 4h2v1H3z" fill="#70e1ff"/></svg>`,
    default: `<svg width="100" height="100" viewBox="0 0 8 8"><path d="M2 1h4v1H2zM1 2h1v4H1zM6 2h1v4H6zM2 6h4v1H2zM3 3h2v2H3z" fill="#f5f5f7"/></svg>`
};

const generateBtn = document.getElementById('generate-btn');
const retryBtn = document.getElementById('retry-btn');
const inputSection = document.getElementById('input-section');
const resultSection = document.getElementById('result-section');

generateBtn.addEventListener('click', () => {
    const name = document.getElementById('username').value.trim();
    const worry = document.getElementById('worry').value.trim();

    if (!name || !worry) {
        alert('당신의 소중한 이름과 고민을 들려주세요.');
        return;
    }

    // 결과 창으로 넘어가기 전 로딩 효과(선택 사항)를 위해 약간의 지연
    generateBtn.innerText = "부적 생성 중...";
    generateBtn.style.opacity = "0.7";
    
    setTimeout(() => {
        let category = 'default';
        if (worry.includes('사랑') || worry.includes('연애') || worry.includes('사람') || worry.includes('친구')) category = 'love';
        else if (worry.includes('일') || worry.includes('취업') || worry.includes('공부') || worry.includes('돈') || worry.includes('성적')) category = 'career';
        else if (worry.includes('피곤') || worry.includes('아파') || worry.includes('잠') || worry.includes('건강') || worry.includes('힘들어')) category = 'health';

        const categoryLyrics = lyricsDB[category];
        const randomLyric = categoryLyrics[Math.floor(Math.random() * categoryLyrics.length)];

        document.getElementById('result-name').innerText = `${name}님의 마음을 지켜줄 비트 부적`;
        document.getElementById('result-lyric').innerText = `"${randomLyric}"`;
        document.getElementById('pixel-icon-container').innerHTML = pixelIcons[category];

        inputSection.classList.add('hidden');
        resultSection.classList.remove('hidden');
        resultSection.style.opacity = "1";
        
        generateBtn.innerText = "부적 생성하기";
        generateBtn.style.opacity = "1";
    }, 800);
});

retryBtn.addEventListener('click', () => {
    inputSection.classList.remove('hidden');
    resultSection.classList.add('hidden');
    document.getElementById('worry').value = '';
});
