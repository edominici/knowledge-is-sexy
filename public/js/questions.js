var questions = [
    {
         
        question: `Question text goes here`,
        color: 'red',
        color: $('.card').css('color', 'red')
        
    },
    {
        question: `Question text goes here`,
        color: 'green',
        color: $('.card').css('color', 'green')
        
    },

    {
        question: `Question text goes here`,
        color: 'black',
        color: $('.card').css('color', 'black')
        
    }
]

function generateQuestions() {
    for (var i = 0; i < questions.length; i++) {
        $(".card").append(`
            <div class="question-container">
                <div class="title">${questions[i].color}</div>
            </div>
        `)
    }
}

generateQuestions();