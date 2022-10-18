import { initializeApp } from 'firebase/app' // this is fb9
import {
  getFirestore, collection, 
  getDocs, addDoc, deleteDoc, doc, 
  onSnapshot, query, where, orderBy, 
  serverTimestamp, getdoc, getDoc
} from 'firebase/firestore'
// 'doc' gets a reference to a doc to delete
// 'query' and 'where' are used to set up query

const firebaseConfig = require('../env.js')

// init fb9
initializeApp(firebaseConfig) // fb9 in action

// init services
const db = getFirestore() // db connection

// collection ref
const colRef = collection(db, 'books')

// creating a query that gets processed by the snapshot when new record is added
const rule = where("author", "==", "bruce lee")
const order = orderBy('title', 'asc')
const q = query(colRef, orderBy('createdAt'))

// real time collection of data
onSnapshot(docRef, (doc) => {
  let books = []
  snapshot.docs.forEach(book => {
    books.push({ ...book.data(), id: book.id })
  })  
  console.log("books: ", books)
})

// get a single doc
const docRef = doc(db, 'books', 'VmPv3latWNx9aajTdIP2')
getDoc(docRef).then((doc) => console.log("single document: ", doc.data(), doc.id))

// handle form input forms
// add book
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault() 
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => addBookForm.reset()) // that's kinda nifty
})

// delete book by id
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const docRef = doc(db, 'books', deleteBookForm.id.value)  // get reference to doc first
  deleteDoc(docRef).then(() =>deleteBookForm.reset())
}) 

// update book
const updateBookForm = document.querySelector('.update')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const docRef = doc(db, 'books', updateBookForm.id.value)  // get reference to doc first
  deleteDoc(docRef).then(() =>updateBookForm.reset())
}) 




