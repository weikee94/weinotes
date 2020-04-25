const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const multer = require("multer");
const sharp = require("sharp");
const { welcomeMail, confirmMail } = require("../emails/account");

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    welcomeMail(user.eventNames, user.email);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

// use /users/me instead
// router.get("/users/:id", async (req, res) => {
//   const _id = req.params.id;

//   try {
//     const user = await User.findById(_id);
//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (error) {
//     res.status(500).send();
//   }
// });

router.get("/users/me", auth, async (req, res) => {
  // this req.user is from auth middleware
  // where we set req.user = user;
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const _id = req.params.id;

  const updateBody = Object.keys(req.body);
  const allowedProperties = ["name", "age", "password"];
  const isValidUpdate = updateBody.every((item) => {
    return allowedProperties.includes(item);
  });

  if (!isValidUpdate) {
    return res.status(400).send({
      error: "Invalid properties to update",
    });
  }

  try {
    // without middleware version
    // const user = await User.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   // true to return the modified document rather than the original. defaults to false
    //   runValidators: true,
    //   //  if true, runs update validators on this command. Update validators validate the update operation against the model's schema.
    // });

    const user = await User.findById(_id);
    updateBody.forEach((update) => {
      req.user[update] = req.body[update];
    });

    // from here can toggle the middleware where we set pre('save') action there
    await req.user.save();

    if (!req.user) {
      return res.status(404).send();
    }
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const user = await User.findByIdAndDelete(_id);
    // if (!user) {
    //   return res.status(404).send();
    // }

    await req.user.remove();
    confirmMail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

// upload file
// here defined where the file stored
const upload = multer({
  // dest: "avatars",
  // set only if u want save on file system else will return data in req.file.buffer
  limits: {
    fileSize: 1000000,
  },
  // cb stands for call back
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload image file!"));
    }

    cb(undefined, true);
  },
});

// upload.single(params) used for multer to match the key
router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    // req.user.avatar = req.file.buffer; // here return binary data

    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  // must be exactly this format so express know to handle errors
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message,
    });
  }
);

// delete user avatar
router.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

router.get("/users/:id/avatar", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
