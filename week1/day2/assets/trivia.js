/* eslint-disable */
$(document).ready(function() {
  const reset = $('#reset');
  const score = $('#score');

  let allQuestions = [];
  let answeredQuestions = 0;
  let content = {};

  function initialize() {
    // categories
    const categories = randomCategories();

    for (const [category, categoryId] of categories) {
      getQuestions(categoryId, function(response) {
        const questions = handleQuestionResponse(response, categoryId);
        content[category] = questions;
        if (Object.keys(content).length === categories.length) {
          buildGame(content);
          addAnswers(content);

          console.log(allQuestions);
        }
      });
    }
  }

  function addAnswers(content) {
    const values = Object.values(content);
    const answers = [];

    for (const value of values) {
      answers.push(...value);
    }

    allQuestions = answers;
  }

  function buildGame(content) {
    const board = $('#board');

    board.empty();

    for (const category in content) {
      const questions = content[category];

      buildCategoryColumn(category, questions, board);
    }

    questionListeners();
  }

  function questionListeners() {
    const question = $('.question');
    const answers = $('.answers');
    const answer = $('.answer');

    question.off();
    answers.off();
    answer.off();

    question.on('click', function() {
      $(this)
        .find('.front')
        .toggle();
      $(this)
        .find('.back')
        .toggle();
    });

    answers.on('click', function(e) {
      e.stopPropagation();
    });

    answer.on('click', handleAnswer);
  }

  function handleAnswer() {
    const answer = $(this);
    const parent = answer.parents('.question');
    const points = parseInt(parent.find('.front').text());
    const id = answer.attr('name');
    const question = findQuestion(id);

    markAsAnswered(parent);
    determineAnswer(answer, question, points);
    answeredQuestions++;

    if (answeredQuestions === allQuestions.length) {
      reset.show();
    }

    console.log('answering the question', question);
  }

  function determineAnswer(answer, question, points) {
    const value = answer.val();
    const correct = value === question.answer;
    const currentScore = parseInt(score.text());
    const newScore = currentScore + (correct ? points : -points);
    score.text(newScore);
  }

  function markAsAnswered(question) {
    const children = question.find('.answer');

    question.addClass('answered');
    question.off();

    for (const child of children) {
      $(child).prop('disabled', true);
    }
  }

  function findQuestion(id) {
    for (const question of allQuestions) {
      if (id === question.id) {
        return question;
      }
    }

    throw new Error(`Could not find question with id ${id}`);
  }

  function buildCategoryColumn(category, questions, board) {
    const column = $(`<div class='column'><h3>${category}</h3></div>`);

    const questionElements = buildQuestions(questions);

    for (const element of questionElements) {
      column.append(element);
    }

    board.append(column);
  }

  function buildQuestions(questions) {
    const elements = [];

    for (const [index, question] of questions.entries()) {
      const element = buildQuestion(question, (index + 1) * 100);

      elements.push(element);
    }

    return elements;
  }

  function buildQuestion(question, points) {
    const element = $(
      `<div class='question'>
        <div class='front'>${points}</div>
      </div>`
    );

    const back = $(
      `<div class='back hidden'><h5 class='question-text'>${
        question.question
      }</h5></div>`
    );
    const field = $('<fieldset class="answers"></fieldset>');

    for (const answer of question.answers) {
      const radio = $(
        `<label class='response'><input type='radio' name='${
          question.id
        }' class='answer' value='${answer}'>${answer}</label>`
      );

      field.append(radio);
    }

    back.append(field);
    element.append(back);

    return element;
  }

  function handleQuestionResponse(response, categoryId) {
    const results = response.results;
    const questions = [];

    for (const [index, result] of results.entries()) {
      const category = result.category;
      const question = new Question(
        result,
        generateQuestionId(category, categoryId, index)
      );

      questions.push(question);
    }

    return shuffle(questions);
  }

  function getQuestions(id, callback) {
    const url = `https://opentdb.com/api.php?amount=3&category=${id}&difficulty=medium`;

    $.get({
      url: url,
      success: callback,
    });
  }

  function resetGame() {
    answeredQuestions = 0;
    allQuestions = [];
    content = {};
    reset.hide();
    score.text(0);

    initialize();
  }

  //
  reset.on('click', resetGame);

  initialize();
  reset.hide();
});

class Question {
  constructor(question, id) {
    this.id = id;
    this.answer = question.correct_answer;
    this.category = question.category;
    this.difficulty = question.difficulty;
    this.answers = shuffle([...question.incorrect_answers, this.answer]);
    this.question = question.question;
    this.type = question.type;
  }
}

const CategoryMap = {
  'General Knowledge': 9,
  'Science: Mathmatics': 19,
  'Entertainment: Music': 12,
  'Entertainment: Video Games': 15,
};

function generateQuestionId(category, categoryId, index) {
  return `${categoryId}-${index}-${category
    .toLowerCase()
    .replace(/:/g, '')
    .replace(/\s/g, '-')}`;
}

function randomCategories() {
  const entries = shuffle(Object.entries(CategoryMap));
  return entries.slice(entries.length - 3);
}

function shuffle(array) {
  for (let index = array.length - 1; index > 0; index--) {
    const random = Math.floor(Math.random() * index);
    swap(array, random, index);
  }

  return array;
}

function swap(array, from, to) {
  const temp = array[from];
  array[from] = array[to];
  array[to] = temp;

  return array;
}
