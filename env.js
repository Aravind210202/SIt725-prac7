module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        setInterval(() => {
            const randomNumber = parseInt(Math.random() * 10);
            socket.emit('number', randomNumber);
            console.log('Sent number:', randomNumber); // Test: Log the sent number
        }, 5000);
    });

 };