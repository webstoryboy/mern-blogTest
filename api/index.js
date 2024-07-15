import express from "express";

const app = express();

app.listen(3000, () => {
    console.log("포트 3000에서 서버가 작동하고 있습니다.");
});
