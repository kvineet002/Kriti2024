// const Notification = require("../models/notification");
// const { User } = require("../models/user");

// const websiteNotification = {
//   sendFollowNotification: async function sendFollowNotification(
//     userId,
//     targetUserId
//   ) {
//     try {
//       const targetUser = await User.findById(targetUserId);
//       const user = await User.findById(userId);
//       const notification = new Notification({
//         title: `${user.Name} started following you`,
//         message: `${user.Name} started following you`,
//         type: "follow",
//       });
//       await notification.save();
//       await User.findByIdAndUpdate(
//         targetUserId,
//         { $push: { notifications: notification } },
//         { new: true }
//       );
//       await targetUser.save();
//       console.log("Follow notification sent successfully");
//     } catch (error) {
//       console.error(error);
//     }
//   },
//   sendCommentNotification: async function sendCommentNotification(req, res) {},
//   sendLikeNotification: async function sendLikeNotification(req, res) {},
// };
// const allNotification = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const user = await User.findById(userId).populate("notifications");
//     const allnotifications = user.notifications;
//     // Return a success response
//     res
//       .status(200)
//       .json({ message: "Notification created successfully", allnotifications });
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the notification" });
//   }
// };
// const seeAllnotifications = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     const user = await User.findById(userId).populate("notifications");
//     const allnotifications = user.notifications;
//     allnotifications.forEach(async (notification) => {
//       await Notification.findByIdAndUpdate(
//         notification._id,
//         { seenStatus: true },
//         { new: true }
//       );
//     });
//     // Return a success response
//     res
//       .status(200)
//       .json({ message: "Notification created successfully", allnotifications });
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error(error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while creating the notification" });
//   }
// };
// // Export the createNotification controller function
// module.exports = { websiteNotification, allNotification,seeAllnotifications };
