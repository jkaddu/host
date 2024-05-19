const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    console.log(rolesArray, "---verify");
    console.log(req.roles, "---verify2");
    const result = req.roles.map((role) => rolesArray.includes(role));

    console.log(result, "---result");
    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
