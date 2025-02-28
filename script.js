// script.js

let round = 0; // 현재 라운드
let playerScore = 0; // 플레이어 점수
let computerScore = 0; // 컴퓨터 점수

// 게임 시작 함수
function playGame(playerChoice) {
  round++; // 라운드 증가
  document.getElementById('round').textContent = round;

  // 컴퓨터의 선택
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  // 컴퓨터 카드 뒤집기
  flipCard('#computer-card', computerChoice, 1000);

  // 1.5초 후 승패 결정
  setTimeout(() => {
    const result = determineWinner(playerChoice, computerChoice);
    updateScore(result);
    showResult(playerChoice, computerChoice, result);
    askToContinue();
  }, 1500);
}

// 카드 뒤집기 함수
function flipCard(cardSelector, computerChoice, delay) {
  const card = document.querySelector(cardSelector);
  const cardBack = card.querySelector('.card-back');

  // 카드 뒤집기 애니메이션
  setTimeout(() => {
    card.classList.add('flipped');
    cardBack.textContent = getEmoji(computerChoice); // 컴퓨터 선택 표시
  }, delay);
}

// 카드 초기화 함수
function resetCard() {
  const card = document.querySelector('#computer-card');
  const cardBack = card.querySelector('.card-back');

  // 카드 원래 상태로 되돌리기
  card.classList.remove('flipped');
  cardBack.textContent = '?'; // 초기 상태는 물음표로 설정
}

// 승패 결정 함수
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'draw';
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'player';
  }
  return 'computer';
}

// 점수 업데이트 함수
function updateScore(result) {
  if (result === 'player') {
    playerScore++;
    document.getElementById('player-score').textContent = playerScore;
  } else if (result === 'computer') {
    computerScore++;
    document.getElementById('computer-score').textContent = computerScore;
  }
}

// 결과 표시 함수
function showResult(playerChoice, computerChoice, result) {
  let message = '';
  if (result === 'draw') {
    message = '무승부!';
  } else if (result === 'player') {
    message = '당신이 이겼습니다!';
  } else {
    message = '컴퓨터가 이겼습니다!';
  }

  document.getElementById('result').innerText = `당신: ${getEmoji(playerChoice)}, 컴퓨터: ${getEmoji(computerChoice)}. 결과: ${message}`;
}

// 다음 라운드 진행 여부 확인
function askToContinue() {
  setTimeout(() => {
    const continueGame = confirm('다음 라운드를 진행하시겠습니까?');
    if (continueGame) {
      resetCard(); // 카드 초기화
    } else {
      alert(`최종 결과: 플레이어 ${playerScore}점, 컴퓨터 ${computerScore}점`);
    }
  }, 500);
}

// 이모티콘 반환 함수
function getEmoji(choice) {
  switch (choice) {
    case 'rock':
      return '✊';
    case 'paper':
      return '✋';
    case 'scissors':
      return '✌️';
    default:
      return '?';
  }
}
// 카드 초기화 함수
function resetCard() {
  const card = document.querySelector('#computer-card');
  card.classList.remove('flipped');
  document.querySelector('#computer-choice').textContent = '?';
}

// 선택에 따라 이모티콘 반환
function getEmoji(choice) {
  if (choice === 'rock') return '✊';
  if (choice === 'paper') return '✋';
  if (choice === 'scissors') return '✌️';
}
