# codespaces-test20260703

Express로 구현한 간단한 아이템 CRUD API 서버입니다. 별도의 데이터베이스 없이 메모리에 데이터를 저장합니다.

## 프로젝트 구조

```text
.
├── server.js          # Express 서버 및 CRUD API
├── package.json       # 실행 스크립트와 의존성
├── package-lock.json  # 의존성 버전 잠금
└── README.md
```

## 요구사항

- Node.js 18 이상
- npm

## 설치 및 실행

저장소 루트에서 의존성을 설치합니다.

```bash
npm ci
```

서버를 실행합니다.

```bash
npm start
```

다음 메시지가 출력되면 실행 준비가 완료된 것입니다.

```text
Server is running on http://localhost:3000
```

로컬 환경에서는 `http://localhost:3000`으로 접근합니다. GitHub Codespaces에서는 **포트(Ports)** 탭에서 3000번 포트를 열고 표시된 전달 URL을 사용합니다.

서버를 종료하려면 실행 중인 터미널에서 `Ctrl+C`를 누릅니다.

## API 확인

서버 상태 확인:

```bash
curl http://localhost:3000/health
```

응답:

```json
{"status":"ok"}
```

전체 아이템 조회:

```bash
curl http://localhost:3000/api/items
```

특정 아이템 조회:

```bash
curl http://localhost:3000/api/items/1
```

아이템 생성:

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Memo","content":"Read documentation"}'
```

아이템 수정:

```bash
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated note","content":"Finish studying Node.js"}'
```

아이템 삭제:

```bash
curl -X DELETE http://localhost:3000/api/items/1
```

| 메서드 | 경로 | 설명 |
| --- | --- | --- |
| `GET` | `/health` | 서버 상태 확인 |
| `POST` | `/api/items` | 아이템 생성 |
| `GET` | `/api/items` | 전체 아이템 조회 |
| `GET` | `/api/items/:id` | 특정 아이템 조회 |
| `PUT` | `/api/items/:id` | 특정 아이템 수정 |
| `DELETE` | `/api/items/:id` | 특정 아이템 삭제 |

`POST`와 `PUT` 요청에는 문자열 `name`, `content` 값이 모두 필요합니다.

## 참고 사항

- 서버 포트는 `server.js`에서 3000으로 고정되어 있습니다.
- 데이터는 메모리에만 저장되므로 서버를 재시작하면 초기 데이터로 돌아갑니다.
- 현재 자동화된 테스트는 구성되어 있지 않습니다.
