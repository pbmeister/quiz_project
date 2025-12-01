// Attach click event to all quiz options
document.addEventListener('DOMContentLoaded', () => {
    const allOptions = document.querySelectorAll('.quiz-option input');

    allOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const label = opt.parentElement; // The label containing the input
            const question = label.closest('.quiz-question');
            const options = question.querySelectorAll('input');

            let scoreIncrement = 0;
            const feedback = question.querySelector('.feedback') || document.createElement('div');
            feedback.className = 'feedback';

            options.forEach(o => {
                const lbl = o.parentElement;
                // Remove previous glow classes
                lbl.classList.remove('correct', 'wrong');
            });

            if(label.dataset.correct === 'true') {
                feedback.innerText = '✅ Correct!';
                label.classList.add('correct');
                scoreIncrement = 1;
            } else {
                feedback.innerText = '❌ Try Again!';
                label.classList.add('wrong');
            }

            if(!question.querySelector('.feedback')) {
                question.appendChild(feedback);
            }

            // Update lesson score
            const quizSection = question.closest('.quiz-section');
            const questions = quizSection.querySelectorAll('.quiz-question');
            let score = 0;
            questions.forEach(q => {
                const selected = q.querySelector('input:checked');
                if(selected && selected.parentElement.dataset.correct === 'true') {
                    score += 1;
                }
            });

            let scoreDiv = quizSection.querySelector('.score');
            if(!scoreDiv) {
                scoreDiv = document.createElement('div');
                scoreDiv.className = 'score';
                quizSection.appendChild(scoreDiv);
            }
            scoreDiv.innerText = `Score: ${score} / ${questions.length}`;
        });
    });
function toggleQuiz() {
    const content = document.getElementById("quizSection");
    const button = document.querySelector(".quiz-toggle");

    if (content.style.display === "block") {
        content.style.display = "none";
        button.classList.remove("open");
    } else {
        content.style.display = "block";
        button.classList.add("open");
    }
}
});
