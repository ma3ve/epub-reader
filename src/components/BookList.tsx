import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import BookCard, { IBook } from './BookCard'
type Props = {}

//book type

function BookList({}: Props) {
  const [books, setBooks] = useState<IBook[]>([])
  React.useEffect(() => {
    axios.get<IBook[]>('/api/drive/books').then((res) => {
      setBooks(res.data)
    })
  }, [])

  return (
    <div className="flex flex-row justify-center flex-wrap">
      {books.map((book, key) => (
        <BookCard book={book} key={key} />
      ))}
    </div>
  )
}

export default BookList
