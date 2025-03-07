const logout = async (req, res) => {
    // For JWT, client simply removes the token.
    res.json({ message: 'Logout successful' });
  };
  
  module.exports = logout;
  