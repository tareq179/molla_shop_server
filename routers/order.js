const Order = require("../models/Order");
const {  verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./VerifyToken");

const router = require("express").Router();


//CREATE
router.post("/", verifyToken, async(req, res)=>{
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }catch(err){
        res.status(200).json(err);
    }
})


// UPDATE
router.put("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try{
        const updatedOrder = await Order.findOneAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedOrder);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req, res)=>{
    try{
        await Order.findOneAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        const order = await Order.findById({userId: req.params.userId});
        res.status(200).json(order)
    }catch(err){
        res.status(500).json(err)
    }
})

//GET All 
router.get("/", verifyTokenAndAdmin,  async (req, res) => {
    try {
      const carts = await Cart.find();

      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET MONTHLY INCOME
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: preciousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales:"$amount"
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;