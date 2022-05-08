

function checkRoom(room) {
    axios.get("/api/web/checkRoom", {
        params: {
            room_type: room
        }
    })
    .then((res) => {
        console.log(res);
        document.getElementById('status-room').innerHTML = 'Còn ' + res.data + ' phòng ' + room;
        if (parseInt(res.data) <= 0) {
            document.getElementById('status-room').style.color = "red";
            document.getElementById("btn-booking").disabled = true;
        }
        else {
            document.getElementById('status-room').style.color = "green";
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

