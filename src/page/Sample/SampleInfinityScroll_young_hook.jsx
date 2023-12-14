import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

const getBooks = async (query, pageNumber) => {
    const response = await axios
      .get('http://openlibrary.org/search.json', { params: {q: query, page: pageNumber,}})
    const data = response.data;
    const books = data.docs.map(doc => doc.title);

    return books;
}

/**
 * 필요한 기능 또는 해야하는 일
 * - 검색어를 입력하면 책들을 얻어올 수 있어야 함
 * - 스크롤이 끝까지 닿으면 책들을 추가 검색해서 가져올 수 있어야 함
 * - 로딩 상태일 때는 로딩임을 알 수 있어야 함
 * - 에러가 발생하면 에러 여부도 알 수 있어야 함
 */
function useSearchBooks(query) {
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

  const search = (query) =>  searchBooks(query, 1)
  
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

  const result = { books, search, lastBookRef, isLoading, error }

  return result;
}

function SampleInfinityScrollYoungHook() {
  const [query, setQuery] = useState('')
  const { books, search, lastBookRef, isLoading, error } = useSearchBooks();

  return (
    <>
      <input type="text" value={query} onChange={(e) => setQuery(e.currentTarget.value)} />
      <button onClick={() => search(query)}>검색하기</button>
      {
        books === null ? <div>검색해 주세요</div> :
        books.length === 0 ? <div>검색 결과 없음</div> : 
        books.map((book, index) => <div key={book} ref={books.length === index + 1 ? lastBookRef : undefined }>{book}</div>)
      }
      {isLoading && <div style={{ fontSize: '40px' }}>Loading...</div>}
</>
  )
}

export default SampleInfinityScrollYoungHook


