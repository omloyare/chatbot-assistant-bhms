export interface Topic {
  name: string;
  keywords: string[];
  questions: string[];
}

export const homeopathyTopics: Record<string, Topic> = {
  'materia-medica': {
    name: 'Materia Medica',
    keywords: ['remedy', 'medicine', 'symptoms', 'characteristics'],
    questions: [
      "Let's start with the basics of Materia Medica. Can you explain what Materia Medica means in homeopathy?",
      "Now, let's discuss the importance of symptom totality. How does it help in selecting the right remedy?",
      "Can you explain the difference between common and characteristic symptoms in remedy selection?",
      "What role do mental symptoms play in remedy selection? Please explain with an example.",
      "How do you study and remember the characteristics of different remedies? Share your approach."
    ]
  },
  'organon': {
    name: 'Organon of Medicine',
    keywords: ['principle', 'law', 'vital force', 'miasm'],
    questions: [
      "What is the fundamental principle of homeopathy according to Hahnemann's Organon?",
      "Can you explain the Law of Similars in your own words? How does it work in practice?",
      "What is Vital Force in homeopathy? How does it relate to health and disease?",
      "Explain the concept of miasms in homeopathy. What are the three main miasms?",
      "How does the principle of minimum dose work in homeopathic treatment?"
    ]
  },
  'case-taking': {
    name: 'Case Taking',
    keywords: ['symptoms', 'analysis', 'repertorization', 'diagnosis'],
    questions: [
      "What are the essential components of homeopathic case taking?",
      "How do you record the patient's symptoms during case taking? What details are important?",
      "Explain the importance of understanding the patient's constitution in case taking.",
      "What role does the patient's past medical history play in case taking?",
      "How do you analyze and evaluate the symptoms collected during case taking?"
    ]
  }
};