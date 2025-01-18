// Initial Data
let currentQuestion = 0;
let correctAnswers = 0;
showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);
document.querySelector('.buttonNext').addEventListener('click', nextQuestion);

// Functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';

        for(let i in q.options) { 
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options ').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    let optionColor = e.target; // Captura o elemento clicado

    // Verifica se o elemento já está selecionado
    if (optionColor.classList.contains('selected')) {
        optionColor.classList.remove('selected');
      // Reseta a cor ao padrão
    } else {
        // Remove a classe 'selected' de todos os elementos antes de aplicar no clicado
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
          // Reseta a cor de todos os elementos
        });
    }

    optionColor.classList.add('selected'); // Adiciona a classe ao clicado
    // Muda a cor do selecionado

    console.log(optionColor);

    
    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    }

    currentQuestion++;
    
    
}
function nextQuestion(){
    currentQuestion++;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}