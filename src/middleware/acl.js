"use strict";
function acl(action) {
  return (req, res, next) => {
    try {
      if (req.user.actions.includes(action)) {
        next();
      } else {
        next("access denied");
      }
    } catch (e) {
        res.status(401).send('access denied');
    }
  };
}

module.exports = acl;
