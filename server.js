const express = require('express');
const app = express();
const PORT = 3000;

// JSON 요청 본문(body)을 파싱하기 위한 미들웨어
app.use(express.json());

// 서버 상태 확인
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// 테스트용 인메모리 데이터 (데이터베이스 대용)
let items = [
    { id: 1, name: 'Note', content: 'Study Node.js' },
    { id: 2, name: 'Task', content: 'Exercise' }
];

// --- CRUD API Routes ---

// 1. CREATE: 새로운 아이템 생성 (POST)
app.post('/api/items', (req, res) => {
    const { name, content } = req.body;

    // 간단한 유효성 검사
    if (!name || !content) {
        return res.status(400).json({ message: 'Name and content are required.' });
    }

    const newItem = {
        id: items.length > 0 ? items[items.length - 1].id + 1 : 1, // 간단한 ID 생성 규칙
        name,
        content
    };

    items.push(newItem);
    res.status(201).json({ message: 'Item created successfully', data: newItem });
});

// 2. READ: 전체 아이템 조회 (GET)
app.get('/api/items', (req, res) => {
    res.status(200).json(items);
});

// 2-1. READ: 특정 ID의 아이템 조회 (GET)
app.get('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);

    if (!item) {
        return res.status(404).json({ message: `Item with id ${id} not found.` });
    }

    res.status(200).json(item);
});

// 3. UPDATE: 특정 ID의 아이템 수정 (PUT)
app.put('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, content } = req.body;

    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({ message: `Item with id ${id} not found.` });
    }

    // 유효성 검사
    if (!name || !content) {
        return res.status(400).json({ message: 'Name and content are required.' });
    }

    // 데이터 업데이트
    items[itemIndex] = { id, name, content };

    res.status(200).json({ message: 'Item updated successfully', data: items[itemIndex] });
});

// 4. DELETE: 특정 ID의 아이템 삭제 (DELETE)
app.delete('/api/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === id);

    if (itemIndex === -1) {
        return res.status(404).json({ message: `Item with id ${id} not found.` });
    }

    // 배열에서 해당 아이템 제거
    const deletedItem = items.splice(itemIndex, 1);

    res.status(200).json({ message: 'Item deleted successfully', data: deletedItem[0] });
});

// --- 서버 시작 ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
