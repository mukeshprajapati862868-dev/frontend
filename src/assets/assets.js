import book1 from './book1.jpg';
import rating_starts from './rating_starts.png';
import book2 from './book2.jpg';
import book3 from './book3.jpg';
import book4 from './book4.jpg';
import book5 from './book5.jpg';

export const assets = {
  book1,
  rating_starts,
  book2,
  book3,
  book4,
  book5,
};

export const BookList = [
  {
    _id: "1",
    name: "Harry Potter and the Sorcerer's Stone",
    image: book1,
    price: 120,
    star: rating_starts,
    description: "The first book in J.K. Rowling’s magical series, introducing Harry Potter as he discovers he’s a wizard and attends Hogwarts School of Witchcraft and Wizardry."
  },
  {
    _id: "2",
    name: "The Lion, the Witch and the Wardrobe",
    image: book2,
    price: 120,
    star: rating_starts,
    description: "A classic fantasy novel by C.S. Lewis in which four siblings step through a wardrobe into the magical land of Narnia, ruled by the evil White Witch."
  },
  {
    _id: "3",
    name: "The Diary of a Young Girl",
    image: book3,
    price: 120,
    star: rating_starts,
    description: "The poignant diary of Anne Frank, a Jewish girl hiding during World War II, offering a moving and powerful perspective on life during the Holocaust."
  },
  {
    _id: "4",
    name: "Bridge to Terabithia",
    image: book4,
    price: 120,
    star: rating_starts,
    description: "A heartfelt story by Katherine Paterson about friendship, imagination, and dealing with grief, centered around two children who create a fantasy world together."
  },
  {
    _id: "5",
    name: "The Great Weather Diviner: The Untold Origin of Punxsutawney Phil",
    image: book5,
    price: 120,
    star: rating_starts,
    description: "A creative tale exploring the whimsical origin story of Punxsutawney Phil, the legendary groundhog known for forecasting weather on Groundhog Day."
  }
];
