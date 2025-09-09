
backend/
├── controllers/
│   ├── ownerController.js       # Owner login, create school panel login
│   ├── schoolController.js      # School login, dashboard info
│   └── studentController.js     # CRUD: add, edit, list students
│
├── models/
│   ├── Owner.js                 # Owner schema
│   ├── School.js                # School schema
│   └── Student.js               # Student schema
│
├── routes/
│   ├── ownerRoutes.js           # /api/owner
│   ├── schoolRoutes.js          # /api/school
│   └── studentRoutes.js         # /api/student
│
├── middleware/
│   ├── authMiddleware.js        # JWT verification
│   └── uploadMiddleware.js      # Multer file upload (photo + attachments)
│
├── utils/
│   └── cloudinary.js            # Cloudinary config & upload helper
│
├── config/
│   └── db.js                    # MongoDB connection
│
├── .env                         # Environment variables (DB URL, Cloudinary keys, JWT secret)
├── app.js                        # Express app
└── package.json

npm init -y
npm i express mongoose dotenv bcryptjs jsonwebtoken cors multer cloudinary
npm i mongoose cloudinary dotenv fs

Email: owner@admin.com
Password: owner123
