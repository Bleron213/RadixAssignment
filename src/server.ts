import app from './index'

const server = app.listen(8088, () => {
    console.log("Server started on Port 8088")
});

export default server;