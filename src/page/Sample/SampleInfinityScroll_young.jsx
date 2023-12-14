import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const getBooks = async (query, pageNumber) => {
    const response = await axios
      .get('http://openlibrary.org/search.json', { params: {q: query, page: pageNumber,}})
    const data = response.data;
    const books = data.docs.map(doc => doc.title);

    return books;
}


function SampleInfinityScrollYoung() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [books, setBooks] = useState(null)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const lastBookRef = useRef(null);
  const scrollObserverRef = useRef(null);

  const searchBooks = (query, pageNumber) => {
    setIsLoading(true);  // state바꿨으니까, 바로 리렌더링 하지 않나요?

    getBooks(query, pageNumber).then(books => {
      if (pageNumber === 1) {
        setBooks([...new Set(books)])
      } else {
        setBooks(prevBooks => [...new Set([...prevBooks, ...books])])
      }
    }).catch(e => {
      setError(true)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleClickSearch = () => {
    searchBooks(query, 1)
  }

  useEffect(() => {
    if (pageNumber !== 1) {
      searchBooks(query, pageNumber)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])

  useEffect(() => {
    // 이전 observer를 해제
    if (scrollObserverRef.current) scrollObserverRef.current.disconnect();

    // 검색 전이거나, 검색 결과가 0이면 더이상 진행하지 않음.
    if (!lastBookRef.current || !books || books.length === 0) return;

    scrollObserverRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prev) => prev + 1)
      }
    })

    scrollObserverRef.current.observe(lastBookRef.current)
  }, [books])

  return (
    <>
      <input type="text" value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
      <button onClick={handleClickSearch}>검색하기</button>
      {
        books === null ? <div>검색해 주세요</div> :
        books.length === 0 ? <div>검색 결과 없음</div> : 
        books.map((book, index) => <div key={book} ref={books.length === index + 1 ? lastBookRef : undefined }>{book}</div>)
      }
      {isLoading && <div style={{ fontSize: '40px' }}>Loading...</div>}
</>
  )
}

export default SampleInfinityScrollYoung


