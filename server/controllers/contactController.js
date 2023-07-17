import User from "../models/userModel.js";
import Contact from "../models/contactModel.js";

export const contactInfomessageController = async (req, res) => {
  try {
    const { userId, name, email, phone, subject, message } = req.body;
    const newContact = new Contact({
      userId,
      name,
      email,
      phone,
      subject,
      message,
    });
    console.log(userId, name, email, phone, subject, message);
    await newContact.save();
    //  console.log(newContact);
    const AdminUser = await User.findOne({ isAdmin: true });
    if (!AdminUser) {
      return res.status(201).json({
        status: false,
        message: "There is no one to catch up your message!!",
      });
    }
    AdminUser.notification.push(newContact);
    await AdminUser.save();
    //  console.log(AdminUser);
    return res.status(200).json({
      status: true,
      message:
        "Congratulations Your message has been transferred successfully!!",
      AdminUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server error!!",
    });
  }
};

export const getNotification = async (req, res) => {
  try {
    // const id = req.params.id;
    const user_detail = await User.findOne({ isAdmin: true }).populate(
      "notification"
    );

    return res.status(200).json({
      status: true,
      message: "Data Get Successfully!!",
      user_detail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error!!",
    });
  }
};
