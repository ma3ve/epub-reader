import { Card } from 'antd'
import React from 'react'
import { useRouter } from 'next/router'

export type IBook = {
  id: string
  mimeType: string
  name: string
}
type Props = {
  book: IBook
}

function BookCard({ book }: Props) {
  const router = useRouter()

  return (
    <Card
      className="h-80 text-center align-middle w-60 m-2 p-2"
      onClick={() => {
        router.push(`/reader/${book.id}`)
      }}
    >
      {book.name}
    </Card>
  )
}

export default BookCard
