export const register = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Interna Server Error !!" });
  }
};
