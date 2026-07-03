import { useState, useEffect } from 'react';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:3000';

function App() {
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/data`)
      .then((res) => res.json())
      .then((data) => {
        setServerData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("데이터 가져오기 실패:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>프론트엔드 배포 성공!</h1>
      
      {loading ? (
        <p>로딩 중...</p>
      ) : serverData ? (
        <div>
          {/* 현재 정상 출력되고 있는 부분 */}
          <p>백엔드에서 가져온 데이터: {serverData.message}</p>
          
          {/* ⚠️ 현재 누락되었을 것으로 추정되는 리스트 출력 부분 */}
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {serverData.list && serverData.list.map((item, index) => (
              <li key={index} style={{ margin: '10px 0', color: '#0070f3' }}>
                ✅ {item}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>연결 실패</p>
      )}
    </div>
  );
}

export default App;