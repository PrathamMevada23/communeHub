const adminMiddleware = (req, res, next) => {
  try { 
    // console.log(req.user);
    const adminRole = req.user;
    // if(!adminRole) {
    //   return res.status(403).send("access denied. User is not an admin. ")
    // }

    // res.status(200).send({ msg: req.user })
    // if user is an admin proceed to the next middlewar
    next();
  } catch (err){
    console.log(err);
  }
};

module.exports = adminMiddleware;
