import { initializeApp } from 'firebase/app' // this is fb9
import {
  getFirestore, collection, getDocs, addDoc, deleteDoc, doc
} from 'firebase/firestore'
// doc gets a reference to a doc to delete

const firebaseConfig = require('../env.js')

// init fb9
initializeApp(firebaseConfig) // fb9 in action

// init services
const db = getFirestore() // db connection

// collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef).then(snapshot => {
  // console.log("snapshot of the documents in db: ", snapshot.docs) 
  // loop through collection and call data method and spread into array
  let books = []
    snapshot.docs.forEach(book => {
      books.push({ ...book.data(), id: book.id })
    })  
  console.log("books: ", books)
}). catch(err => console.log("whoops:", err.message))

// handle form input

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault() 
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value
  })
  .then(() => addBookForm.reset()) // that's kinda nifty
})

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const docRef = doc(db, 'books', deleteBookForm.id.value)  // get reference to doc first
  deleteDoc(docRef).then(() =>deleteBookForm.reset())
})

