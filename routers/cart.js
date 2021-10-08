const Cart = require("../models/Cart");
const {  verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./VerifyToken");

const router = require("express").Router();


//CREATE
router.post("/", verifyToken, async(req, res)=>{
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    }catch(err){
        res.status(200).json(err);
    }
})


// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        const updatedCart = await Cart.findOneAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new: true}
        );
        res.status(200).json(updatedCart);
    }catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async(req, res)=>{
    try{
        await Cart.findOneAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
})

//GET USER CARTa
router.get("/find/:userId", async(req, res)=>{
    try{
        const cart = await Cart.findById({userId: req.params.userId});
        res.status(200).json(cart)
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

module.exports = router;