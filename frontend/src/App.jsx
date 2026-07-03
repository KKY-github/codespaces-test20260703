import { useState, useEffect } from 'react';
import './App.css';

// 1. 함수 바깥 최상단에 백엔드 주소를 정의합니다.
// Vercel에 등록한 값이 있으면 그걸 쓰고, 없으면 로컬(3000포트) 주소를 씁니다.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    // 2. 주소를 적을 때 기존 백엔드 주소 대신 ${API_URL}을 사용합니다.
    // 백엔드 Express에 '/api/hello'라는 라우터가 있다고 가정해볼게요.
    fetch(`${API_URL}/api/hello`)
      .then((res) => res.json())
      .then((result) => setData(result.message))
      .catch((err) => console.error("데이터 가져오기 실패:", err));
  }, []);

  return (
    <div className="App">
      <h1>프론트엔드 배포 성공!</h1>
      <p>백엔드에서 가져온 데이터: {data}</p>
    </div>
  );
}

export default App;