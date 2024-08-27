const mongoose = require('mongoose');
const TriviaQuestion = require('./models/TriviaQuestion');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const seedQuestions = [
    {
      category: 'Horror',
      difficulty: 'Easy',
      question: 'What is the name of the killer in the *Friday the 13th* franchise?',
      options: ['Freddy Krueger', 'Michael Myers', 'Jason Voorhees', 'Leatherface'],
      correctAnswer: 'Jason Voorhees'
    },
    {
      category: 'Horror',
      difficulty: 'Easy',
      question: 'Which horror film features a haunted video tape that kills the viewer within seven days?',
      options: ['The Ring', 'The Grudge', 'Sinister', 'The Conjuring'],
      correctAnswer: 'The Ring'
    },
    {
      category: 'Horror',
      difficulty: 'Easy',
      question: 'What 1978 horror film was remade in 2007 by Rob Zombie?',
      options: ['Halloween', 'A Nightmare on Elm Street', 'Texas Chainsaw Massacre', 'Carrie'],
      correctAnswer: 'Halloween'
    },
    {
      category: 'Horror',
      difficulty: 'Medium',
      question: 'Which movie features the \'Xenomorph\' as the primary antagonist?',
      options: ['Alien', 'Predator', 'The Thing', 'Event Horizon'],
      correctAnswer: 'Alien'
    },
    {
      category: 'Horror',
      difficulty: 'Medium',
      question: 'Which psychological horror movie is set in a hotel called The Overlook?',
      options: ['The Shining', 'The Sixth Sense', 'Misery', '1408'],
      correctAnswer: 'The Shining'
    },
    {
      category: 'Horror',
      difficulty: 'Hard',
      question: 'What is the subtitle of the third film in the *Halloween* franchise?',
      options: ['Season of the Witch', 'The Return of Michael Myers', 'The Curse of Michael Myers', 'Resurrection'],
      correctAnswer: 'Season of the Witch'
    },
    {
      category: 'Horror',
      difficulty: 'Hard',
      question: 'Which horror movie features a character who communicates with ghosts using an old TV?',
      options: ['Poltergeist', 'The Exorcist', 'Amityville Horror', 'Paranormal Activity'],
      correctAnswer: 'Poltergeist'
    },
    {
      category: 'Serial Killers',
      difficulty: 'Easy',
      question: 'Which infamous serial killer was also known as the \'Killer Clown\'?',
      options: ['Ted Bundy', 'John Wayne Gacy', 'Jeffrey Dahmer', 'Richard Ramirez'],
      correctAnswer: 'John Wayne Gacy'
    },
    {
      category: 'Serial Killers',
      difficulty: 'Easy',
      question: 'What was the nickname of the unidentified serial killer active in San Francisco in the late 1960s?',
      options: ['Zodiac Killer', 'Night Stalker', 'Son of Sam', 'BTK Killer'],
      correctAnswer: 'Zodiac Killer'
    },
    {
      category: 'Serial Killers',
      difficulty: 'Medium',
      question: 'Which serial killer inspired the movie *Silence of the Lambs*?',
      options: ['Ed Gein', 'Ted Bundy', 'Jeffrey Dahmer', 'Jack the Ripper'],
      correctAnswer: 'Ed Gein'
    },
    {
      category: 'Serial Killers',
      difficulty: 'Medium',
      question: 'What was the name of the hotel operated by H.H. Holmes, where he killed many of his victims?',
      options: ['Murder Castle', 'Hell House', 'Chamber of Horrors', 'The Dead Zone'],
      correctAnswer: 'Murder Castle'
    },
    {
      category: 'Serial Killers',
      difficulty: 'Hard',
      question: 'Which notorious serial killer worked as a handyman in the Bates Motel?',
      options: ['Norman Bates', 'Hannibal Lecter', 'Patrick Bateman', 'Ed Kemper'],
      correctAnswer: 'Norman Bates'
    },
    {
      category: 'Serial Killers',
      difficulty: 'Hard',
      question: 'Which serial killer kept the remains of his victims in his apartment and was nicknamed the Milwaukee Cannibal?',
      options: ['Ted Bundy', 'John Wayne Gacy', 'Jeffrey Dahmer', 'Richard Ramirez'],
      correctAnswer: 'Jeffrey Dahmer'
    },
    {
      category: 'WoW Lore',
      difficulty: 'Easy',
      question: 'What is the name of the planet where the Draenei originally came from?',
      options: ['Azeroth', 'Outland', 'Argus', 'Draenor'],
      correctAnswer: 'Argus'
    },
    {
      category: 'WoW Lore',
      difficulty: 'Easy',
      question: 'Which Old God is imprisoned beneath the Well of Eternity?',
      options: ["N'Zoth", "C'Thun", 'Yogg-Saron', "Y'Shaarj"],
      correctAnswer: 'N\'Zoth'
    },
    {
      category: 'WoW Lore',
      difficulty: 'Medium',
      question: 'Which faction leader was responsible for the burning of Teldrassil?',
      options: ['Thrall', 'Sylvanas Windrunner', 'Garrosh Hellscream', 'Anduin Wrynn'],
      correctAnswer: 'Sylvanas Windrunner'
    },
    {
      category: 'WoW Lore',
      difficulty: 'Medium',
      question: 'Which dragon aspect was known as the Earth-Warder before becoming corrupted?',
      options: ['Malygos', 'Deathwing', 'Alexstrasza', 'Nozdormu'],
      correctAnswer: 'Deathwing'
    },
    {
      category: 'WoW Lore',
      difficulty: 'Hard',
      question: 'Who was the first Lich King?',
      options: ['Bolvar Fordragon', 'Arthas Menethil', "Ner'zhul", "Kel'Thuzad"],
      correctAnswer: 'Ner\'zhul'
    },
    {
      category: 'WoW Lore',
      difficulty: 'Hard',
      question: 'What is the name of Illidan Stormrage\'s twin brother?',
      options: ['Malfurion', "Kael'thas", 'Tyrande', 'Maiev'],
      correctAnswer: 'Malfurion'
    }
  ];

  const seedDB = async () => {
    try {
      for (const question of seedQuestions) {
        await TriviaQuestion.updateOne(
          { question: question.question }, // Find by unique question text
          { $setOnInsert: question }, // Insert if it does not exist
          { upsert: true } // Create if not found
        );
      }
      console.log("Database seeding process complete.");
    } catch (error) {
      console.error("Error seeding the database:", error);
    } finally {
      mongoose.connection.close();
    }
  };
  
  // Run the seeding function
  seedDB().catch((err) => {
    console.error('Error during the seeding process:', err);
  });