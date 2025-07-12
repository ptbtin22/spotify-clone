import User from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    // check if user already exists

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      await User.create({
        fullName: `${firstName} ${lastName}`,
        imageUrl,
        clerkId: id,
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in auth callback:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
