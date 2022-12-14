const DBConnection = require('../configs/DBConnection')

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM users WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
        let removedUser = req.query.removed;
        res.render('home', { rows, removedUser });
    } else {
        console.log(err);
    }
    console.log('The data from user table: \n', rows);
    });
}

// Find User by Search
exports.find = (req, res) => {
    let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM users WHERE fullname LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
        res.render('home', { rows });
    } else {
        console.log(err);
    }
    console.log('The data from user table: \n', rows);
    });
}

exports.form = (req, res) => {
    res.render('add-user');
}



// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
        res.render('edit-user', { rows });
    } else {
        console.log(err);
    }
    console.log('The data from user table: \n', rows);
    });
}


// Update User
exports.update = (req, res) => {
    const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
    connection.query('UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
        res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
        } else {
        console.log(err);
        }
        console.log('The data from user table: \n', rows);
        });
    } else {
        console.log(err);
    }
    console.log('The data from user table: \n', rows);
    });
}

// Delete User
exports.delete = (req, res) => {
    connection.query('UPDATE users SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
        if (!err) {
            let removedUser = encodeURIComponent('User successeflly removed.');
            res.redirect('/?removed=' + removedUser);
        } else {
            console.log(err);
        }
        console.log('The data from beer table are: \n', rows);
        });
    
    }
    
    // View Users
    exports.viewall = (req, res) => {
    
      // User the connection
      connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
            res.render('view-user', { rows });
        } else {
            console.log(err);
        }
        console.log('The data from user table: \n', rows);
        });
    
    }