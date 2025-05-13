function authorizeRole(user, roles = []) {
  if (!user || !roles.includes(user.role)) return false;
  return true;
}

module.exports = authorizeRole;
