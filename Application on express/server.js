const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Multer setup for single file upload (field name: avatar)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // keep original name, but prefix with timestamp to avoid collisions
    const unique = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, unique);
  }
});
const upload = multer({ storage });

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true })); // form body parsing
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { data: {}, errors: {} });
});

app.post(
  '/submit',
  upload.single('avatar'),
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('A valid email is required'),
    body('message').trim().isLength({ min: 5 }).withMessage('Message must be at least 5 characters')
  ],
  (req, res) => {
    const errors = validationResult(req);
    const mappedErrors = errors.isEmpty() ? {} : errors.mapped();

    const formData = {
      name: req.body.name || '',
      email: req.body.email || '',
      message: req.body.message || ''
    };

    // If there was a file uploaded, include its public path
    if (req.file) {
      formData.avatar = path.join('uploads', req.file.filename).replace(/\\/g, '/');
    }

    if (!errors.isEmpty()) {
      // if validation failed, remove uploaded file (if any) to avoid orphaned files
      if (req.file) {
        fs.unlink(path.join(uploadsDir, req.file.filename), (err) => {
          if (err) console.error('Failed to remove uploaded file after validation error:', err.message);
        });
      }
      return res.status(400).render('index', { data: formData, errors: mappedErrors });
    }

    // success
    res.render('result', { data: formData });
  }
);

// Simple health route
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
