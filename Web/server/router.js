module.exports = function(app) {
    let cors = require('cors')
    let control = require('./controller');
    
    app.route('/api/web/checkRoom')
      .get(control.checkRoom);

    app.route('/api/web/booking')
      .post(control.storeBooking);

    app.route('/api/web/feedback')
      .post(control.storeFeedback);

    app.route('/api/app/searchCustomer')
      .get(cors(), control.searchCustomer);

    app.route('/api/app/chooseRoom')
      .get(cors(), control.chooseRoom);

    app.route('/api/app/checkIO')
      .get(cors(), control.checkIO);
  };