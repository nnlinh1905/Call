const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Cấu hình server để sử dụng CORS và body parser
app.use(cors());
app.use(bodyParser.json());

// Đường dẫn đến thư mục build của ứng dụng
const buildPath = "./dist";

// Serve tất cả các file trong thư mục build
app.use(express.static(buildPath));

// Trả về file index.html cho tất cả các đường dẫn không khớp với các đường dẫn đã được xử lý trước đó
app.get("*", function (req, res) {
  res.sendFile(`${__dirname}/${buildPath}/index.html`);
});

// Khởi động server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
