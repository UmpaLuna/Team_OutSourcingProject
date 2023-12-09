import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

function SampleInfinityScroll() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [books, setBooks] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // true로 해야 함...
  const [noneTitle, setNoneTitle] = useState(false)
  let cancel

  // 태그안에 ref를 함수도 넣을 수 있더라.... 그러면 node가 바로 ref인 태그 요소임! 그리고 함수가 ref로서 current를 가지게 됨
  const observeRef = (node) => {
    //   // 맨 아래 요소를 새롭게 계속해서 갱신하는 거임- 1. loading이면 종료 2. 맨 처음 마지막 참조였던것은 observer를 끊어주고 다시 새롭게 참조를 만들어 주기 위함 3. 새로운 마지막 요소에 관찰자를 넣음
    if (observeRef.current) observeRef.current.disconnect()
    if (node) {
      if (isLoading) return
      // 참조하고 있는 observer 먼저 끊어 주기, 근데 어떻게 먼저 끊어주냐 current에 먼가 참조해주는 것보다 먼저??-> if문 있잖냐...
      if (observeRef.current) observeRef.current.disconnect()
      observeRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prev) => prev + 1)
        }
      })
      if (node) observeRef.current.observe(node)
    }
  }

  // useCallback써준 이유는 useCallback 풀고 해봐라 무한반복임
  const queryData = useCallback(
    async (q, number) => {
      setIsLoading(true)
      setError(false)
      setNoneTitle(false)
      try {
        //https://openlibrary.org/dev/docs/api/search 여기 사이트 가면 query 방법 나옵니다.
        await axios
          .get('http://openlibrary.org/search.json', {
            params: {
              q: q,
              page: number,
            },
            // 이 컴포넌트에서 나가면 써주료고
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          })
          .then((res) => {
            console.log(res.data.docs)
            setIsLoading(false)
            // 없으면 없다고 친절하게 알려줘야 하니까
            if (res.data.docs.length === 0) return setNoneTitle(true)
            // Set 이거 그냥 중복있어서 키값쓰기 귀찮아서 쓴거임.. 별거 없으셈
            setBooks((prev) => [
              ...new Set([...prev, ...res.data.docs.map((book) => book.title)]),
            ])
          })
      } catch (error) {
        // 이상한거 치input에 면 여기 캐치문으로 오게 되는데, 이때 한번 제어 해줘야 함 안그러면 error문구 계속 뜨게 됨
        if (axios.isCancel(error)) return
        setError(true) // error가 axios에서 난것 말고도 따른 거면 setError를 true로 바꿔준다.
      }
    },
    [query, pageNumber]
  )

  const handleSearch = (e) => {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  // 검색하고 검색또하면 내용들 쭈르륵임그러기에  최신화 해주자
  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    queryData(query, pageNumber)
    return () => cancel()
  }, [query, pageNumber, cancel, queryData])
  console.log('return안에 ', isLoading)
  return (
    <>
      <input type="text" value={query} onChange={handleSearch} />
      {isLoading && <div style={{ fontSize: '40px' }}>Loading...</div>}

      {error && <div>Error</div>}
      {noneTitle && <div>검색결과 없음</div>}
      {books.map((book, idx) => {
        if (books.length === idx + 1) {
          return <div ref={observeRef}>{book}</div>
        }
        return <div key={book}>{book}</div>
      })}
    </>
  )
}

export default SampleInfinityScroll
