require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const DATABASE_URL = process.env.DATABASE_URL;
const user = require("./model/user");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const products = require("./model/products");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const Aunthentication = require("./middleware/authentication");
const jwt = require("jsonwebtoken");
const multer = require("multer");


const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.static("images"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => {
    console.log(e);
    console.log("database cont be connect");
  });


app.post("/users", async (req, res) => {
  const { firstName, email, password } = req.body;

  user
    .findOne({ email: email })
    .then((userExits) => {
      if (userExits) {
        return res.status(400).json({ error: "User already exists" });
      }

      const userData = new user({ firstName, email, password });

      userData
        .save()
        .then(() => {
          return res.status(200).json({ message: "Signup successful" });
        })
        .catch((error) => {
          return res.status(400).json({ message: "Signup Failed" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.post("/login", async(req, res, next) => {
  const { email, password } = req.body;
  user.findOne({ email: email }).then(async (user) => {
    if (user) {
      await bcrypt.compare(password, user.password, async (err, response) => {
        if (response) {
          const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.SECRET_KEY,
            {
              expiresIn: "1d",
            }
          );
          res.cookie("newToken", token, {
            expires: new Date(Date.now() + 29800093090),
          });
          console.log("successfull login");
          return res.json({
            success: true,
            redirect: "/",
            message: " Login successfully",
          });
        } else {
          console.log("Incorrect Password");
        }
      });
    } else {
      return console.log("No Record Found");
    }
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("newToken");
  res.status(200).send("User Logout");
});

app.get("/product/:id", (req, res) => {
  // console.log(req.params.id)
  products
    .findById(req.params.id)
    .then((found) => {
      if (!found) {
        return res.status(404).end();
      }
      return res.status(200).json(found);
    })
    .catch((err) => console.log(err));
});
app.get("/product", async (req, res) => {
  const product = await products.find({});
  res.send(product);
});

app.get("/contact", Aunthentication, (req, res, next) => {
  const data = req.user;
  return res.send({ data });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = `E:/Zain ikram Nawaz/next js project/portfolio/myproject/myclient/public`;
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/addProduct", upload.single("originalImage"), (req, res, next) => {
  // console.log("Hello from product");

  const { title, price, category, description } = req.body;
  const userProducts = new products({
    title,
    price,
    category,
    description,
    image: {
      name: req.file.filename,
      data: req.file.originalname,
      contentType: req.file.mimetype,
    },
  });
  userProducts.save().then(() => {
    console.log("product Added");
  });
  next();
});

// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

app.post("/create-checkout-session", async (req, res) => {
  const { cart } = req.body;
  const lineItems = cart.map((item) => ({
    price_data: {
      currency: "pkr",
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url:
      "https://www.google.com/search?q=googl&rlz=1C1CHBD_enPK1048PK1048&oq=googl&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIMCAEQIxgnGIAEGIoFMhgIAhAuGEMYgwEYxwEYsQMY0QMYgAQYigUyEggDEAAYQxiDARixAxiABBiKBTIMCAQQABhDGIAEGIoFMgwIBRAAGEMYgAQYigUyEggGEAAYQxiDARixAxiABBiKBTISCAcQABhDGIMBGLEDGIAEGIoFMgwICBAAGEMYgAQYigUyBwgJEAAYjwLSAQkyODkwajBqMTWoAgCwAgA&sourceid=chrome&ie=UTF-8",
    cancel_url: "https://www.youtube.com/watch?v=DMoUqfPybNw&t=898s",
  });
  res.json({ id: session.id });
});

app.post("/cartdata", Aunthentication, async(req, res) => {
  try {
    const { cartData } = req.body;
    const userId = req.userId;

    const updatedUser = await user.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { cartData: cartData } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    console.log("Cart data added successfully");
    res.status(200).send({ message: "Cart data added successfully", user: updatedUser });
  } catch (err) {
    console.error("Error adding cart data:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
});


app.get("/cartitems", Aunthentication,(req,res)=>{
const{cartData} = (req.user)
res.send({cartData})
})

app.delete('/cartremove/:id', Aunthentication, async(req,res)=>{
 try {
    const itemId = req.params.id;
    const userId = req.userId;

    const updatedUser = await user.findOneAndUpdate(
      { _id: userId },
      { $pull: { cartData: { _id: itemId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }

    console.log("Cart data deleted successfully");
    res.status(200).send({ message: "Cart data deleted successfully", user: updatedUser });
  } catch (err) {
    console.error("Error deleting cart data:", err);
    return res.status(500).send({ error: "Internal server error" });
  }
  });

  app.put("/increase/:id", Aunthentication, async (req, res,) => {
    try {
      const objectId = req.params.id; // Extracting the object ID from the request parameters
      const data = req.user; // Assuming you have user data attached to the request
      const userId = data._id; // Assuming the user ID is stored in the data object
  
      // Finding the user by ID
      const userDoc = await user.findById(userId);

      const updatedUser = await user.findOneAndUpdate(
        { _id: userId, "cartData._id": objectId },
        { $inc: { "cartData.$.quantity": 1 } }, // Increment the quantity of the matched item
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        console.log("User not found");
        return res.status(404).send("User not found");
      }
  
      // Finding the object in the cartData array based on its ID
      const find = userDoc.cartData.find(item => item._id === objectId);
      
   

      // console.log("Quantity increased successfully");
      return res.send({ message: "Quantity increased successfully", updatedCartItem: find });
    } catch (error) {
      console.error("Error increasing quantity:", error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });
  app.put("/decrease/:id", Aunthentication, async (req, res,) => {
    try {
      const objectId = req.params.id; // Extracting the object ID from the request parameters
      const data = req.user; // Assuming you have user data attached to the request
      const userId = data._id; // Assuming the user ID is stored in the data object
  
      // Finding the user by ID
      const userDoc = await user.findById(userId);
      const find = userDoc.cartData.find(item => item._id === objectId);
      if (!find) {
        console.log("User not found");
        return res.status(404).send("User not found");
      }
      if(find.quantity < 1){
        find.quantity === 1
      }

      const updatedUser = await user.findOneAndUpdate(
        { _id: userId, "cartData._id": objectId },
        { $inc: { "cartData.$.quantity": -1} }, // Increment the quantity of the matched item
        { new: true } // Return the updated document
      );
    

      console.log("Quantity decrease successfully");
      return res.send({ message: "Quantity decrease successfully", updatedCartItem: find });
    } catch (error) {
      console.error("Error increasing quantity:", error);
      return res.status(500).send({ error: "Internal server error" });
    }
  });


app.use("/", (req, res, next) => {
  res.json({message:"hello from server"})
});

app.listen(process.env.PORT);
