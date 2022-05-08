const con = require('./connectDB')

module.exports = {
    checkRoom: (req, res) => {
        let room_type = req.query.room_type;
        let sql = "SELECT COUNT(*) As counter "
                + "FROM (SELECT * FROM rooms WHERE status = 'FREE') AS r "
                + "INNER JOIN (SELECT * FROM room_type WHERE name = '" + room_type
                + "') AS rt ON r.type = rt.id;"
        con.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    storeBooking: (req, res) => {
        let data = req.body;
        let sql = "SELECT r.id as room "
                + "FROM (SELECT * FROM rooms WHERE status = 'FREE') AS r "
                + "INNER JOIN (SELECT * FROM room_type WHERE name = '" + data.room
                + "') AS rt ON r.type = rt.id;"
        con.query(sql, (err, response) => {
            if (err) throw err
            data.room = response[0].room;
            sql = "INSERT INTO customers SET ?"
            con.query(sql, [data], (err, response) => {
                if (err) throw err
                res.json({message: 'Insert success!'})
            })
        })
    },

    storeFeedback: (req, res) => {
        let data = req.body;
        let sql = "INSERT INTO feedbacks SET ?"
        con.query(sql, [data], (err, response) => {
            if (err) throw err
            res.json({message: 'Insert success!'})
        })
    },

    searchCustomer: (req, res) => {
        let filter = req.query.filter;
        let search = req.query.search;
        let sql = "SELECT c.id, c.name, c.phone, c.email, c.room, c.booking_date, c.checkin_date, c.checkout_date, "
                + "rrt.status, rrt.name As room_type, rrt.price_day FROM (SELECT * FROM customers WHERE ";
        if (filter == 'room') {
            sql += filter + " = " + search + ") AS c "
        }
        else {
            sql += filter + " = '" + search + "') AS c "
        }
        sql += "INNER JOIN ( "
            + "SELECT r.id, r.status, rt.name, rt.price_day FROM rooms AS r "
            + "INNER JOIN room_type As rt ON r.type = rt.id "
            + ") AS rrt ON c.room = rrt.id"
        con.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    chooseRoom: (req, res) => {
        let sql = "SELECT r.id, r.status FROM rooms AS r INNER JOIN room_type As rt ON r.type = rt.id"
        con.query(sql, (err, response) => {
            if (err) throw err
            res.json(response)
        })
    },

    checkIO: (req, res) => {
        let mode = req.query.mode;
        let check = req.query.check;
        let type = req.query.type;
        let room = req.query.room;
        let sql;
        if (mode == "in") {
            sql = "UPDATE customers SET check" + mode +"_date = LOCALTIME(), room = " + room +" WHERE " + type +" = '" + check + "'";
        } else if (mode == "out") {
            sql = "UPDATE customers SET check" + mode +"_date = LOCALTIME(), room = 0 WHERE " + type +" = '" + check + "'";
        }
        con.query(sql, (err, response) => {
            if (err) throw err
            if (mode == "in") {
                sql = "UPDATE rooms SET status = 'SERVED' WHERE id = " + room;
            } else if (mode == "out") {
                sql = "UPDATE rooms SET status = 'FREE' WHERE id = " + room;
            }
            con.query(sql, (err, response) => {
                if (err) throw err
                res.json({message: 'Update success!'})
            })
        })
    },
}