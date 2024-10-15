const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// اتصال بقاعدة البيانات
mongoose.connect('mongodb+srv://mohamedsamir0240:Mo086860@creativity.1qjct.mongodb.net/anonymousMessagesDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// تعريف مخطط الرسائل
const messageSchema = new mongoose.Schema({
    content: String,
    date: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// إعداد Express
app.use(express.json());
app.use(express.static('public'));

// استقبال الرسائل
app.post('/send-message', async (req, res) => {
    const { message } = req.body;
    try {
        const newMessage = new Message({ content: message });
        await newMessage.save();
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });
    }
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// عرض جميع الرسائل
app.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// حذف رسالة
app.delete('/message/:id', async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});
