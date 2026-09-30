import { Injectable, signal, computed } from '@angular/core';

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private questions: Question[] = [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
      category: 'Geography',
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctAnswer: 1,
      category: 'Science',
    },
    {
      id: 3,
      question: 'Who wrote Romeo and Juliet?',
      options: ['Jane Austen', 'William Shakespeare', 'Mark Twain', 'Charles Dickens'],
      correctAnswer: 1,
      category: 'Literature',
    },
    {
      id: 4,
      question: 'What is the largest ocean?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      correctAnswer: 3,
      category: 'Geography',
    },
    {
      id: 5,
      question: 'In what year did World War II end?',
      options: ['1943', '1944', '1945', '1946'],
      correctAnswer: 2,
      category: 'History',
    },
    {
      id: 6,
      question: 'What is the chemical symbol for gold?',
      options: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 2,
      category: 'Science',
    },
    {
      id: 7,
      question: 'Which country is home to the kangaroo?',
      options: ['New Zealand', 'Australia', 'South Africa', 'Brazil'],
      correctAnswer: 1,
      category: 'Geography',
    },
    {
      id: 8,
      question: 'How many sides does a hexagon have?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 1,
      category: 'Mathematics',
    },
    {
      id: 9,
      question: 'Who painted the Mona Lisa?',
      options: ['Vincent Van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
      correctAnswer: 2,
      category: 'Art',
    },
    {
      id: 10,
      question: 'What is the smallest prime number?',
      options: ['0', '1', '2', '3'],
      correctAnswer: 2,
      category: 'Mathematics',
    },
    {
      id: 11,
      question: 'Which programming language is known as the language of the web?',
      options: ['Python', 'Java', 'JavaScript', 'C++'],
      correctAnswer: 2,
      category: 'Technology',
    },
    {
      id: 12,
      question: 'What is the speed of light?',
      options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '100,000 km/s'],
      correctAnswer: 0,
      category: 'Science',
    },
    {
      id: 13,
      question: 'Who invented the telephone?',
      options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Benjamin Franklin'],
      correctAnswer: 1,
      category: 'History',
    },
    {
      id: 14,
      question: 'What is the currency of Japan?',
      options: ['Won', 'Yuan', 'Yen', 'Baht'],
      correctAnswer: 2,
      category: 'Geography',
    },
    {
      id: 15,
      question: 'How many strings does a violin have?',
      options: ['4', '5', '6', '7'],
      correctAnswer: 0,
      category: 'Music',
    },
    {
      id: 16,
      question: 'What is the hardest natural substance?',
      options: ['Gold', 'Platinum', 'Diamond', 'Iron'],
      correctAnswer: 2,
      category: 'Science',
    },
    {
      id: 17,
      question: 'Which continent is the largest?',
      options: ['Africa', 'North America', 'Europe', 'Asia'],
      correctAnswer: 3,
      category: 'Geography',
    },
    {
      id: 18,
      question: 'How many bones does an adult human have?',
      options: ['186', '206', '226', '246'],
      correctAnswer: 1,
      category: 'Biology',
    },
    {
      id: 19,
      question: 'What is the main ingredient in guacamole?',
      options: ['Lime', 'Tomato', 'Avocado', 'Onion'],
      correctAnswer: 2,
      category: 'Food',
    },
    {
      id: 20,
      question: 'In what year was the internet invented?',
      options: ['1969', '1975', '1985', '1995'],
      correctAnswer: 0,
      category: 'Technology',
    },
  ];

  currentQuestionIndex = signal<number>(0);
  answeredQuestions = signal<number>(0);
  correctAnswers = signal<number>(0);
  selectedAnswer = signal<number | null>(null);
  showResult = signal<boolean>(false);

  currentQuestion = computed(() =>
    this.currentQuestionIndex() < this.questions.length
      ? this.questions[this.currentQuestionIndex()]
      : null,
  );

  isAnswered = computed(() => this.selectedAnswer() !== null);

  isGameComplete = computed(() => this.answeredQuestions() >= 20);

  score = computed(() => Math.round((this.correctAnswers() / 20) * 100));

  startGame() {
    this.currentQuestionIndex.set(0);
    this.answeredQuestions.set(0);
    this.correctAnswers.set(0);
    this.selectedAnswer.set(null);
    this.showResult.set(false);
  }

  selectAnswer(optionIndex: number) {
    if (this.selectedAnswer() !== null || this.isGameComplete()) return;

    this.selectedAnswer.set(optionIndex);
    this.showResult.set(true);

    const question = this.currentQuestion();
    if (question && optionIndex === question.correctAnswer) {
      this.correctAnswers.update((v) => v + 1);
    }
  }

  nextQuestion() {
    this.currentQuestionIndex.update((v) => v + 1);
    this.answeredQuestions.update((v) => v + 1);
    this.selectedAnswer.set(null);
    this.showResult.set(false);
  }

  calculateScore(): number {
    return this.score();
  }

  resetGame() {
    this.startGame();
  }
}
