import jwt from "jsonwebtoken";
import Joi from "joi";

import { hashPassword } from "./helper/helper.js";
import ProductModel from "./models/ProductModel.js";
import UserModel from "./models/UserModel.js";

const setupRoutes = (app) => {
  app.post("/admin/login", async (req, res) => {
    const { username, password } = req.body;
  
    const bodySchema = Joi.object({
      username: Joi.string().required(),         
      password: Joi.string().min(6).required()
   });
  
   const validationResult = await bodySchema.validate(req.body);
  
   if(validationResult.error){
      res.statusCode = 400;
      res.send(validationResult.error.details[0].message);
      return
   }
  
    const user = await UserModel.findOne({ username });
  
    if (!user) {
  
      res.send("User NOT Found!!!");
  
    } else {
      //making sure that the password provided belongs to the user registered in the database
      if (user.password != hashPassword(password, user.salt)) {
        res.send("bad passowrd");
      } else {
        //generating new token
        const token = jwt.sign({ sub: user._id }, user.salt, { expiresIn: 3000 });
  
        res.json({ status: 200, token: token });
      }
    }
  });

    /// requseting data from the database
    app.get("/products", async (req, res) => {
      const products = await ProductModel.find({});

      res.send(products)
    });

    /// Adding new product to the database
    app.post("/admin/product/new", async (req, res) => {
      //getting token from the header of the request
      const token = req.headers.authorization;

      try {
        if (!token) {
          res.statusCode = 401;

          res.send("You Have No Permisson !!!");
        } else {
          //decoding the token using jwt and making sure that the user Id is exist in the database
          const decodedToken = jwt.decode(token);

          const user = await UserModel.findById(decodedToken.sub);

          jwt.verify(token, user.salt);

          if (!user) {
          res.statusCode = 401;

          res.send("You Have No Permisson !!!");
          } else {
            //getting data from the body
            const { title, desc, image } = req.body;

            //making sure that all the required data are formed
            const bodySchema = Joi.object({
              title: Joi.string().required(),
              desc: Joi.string().required(),
              image: Joi.string().required()
            });

            const validationResult = await bodySchema.validate(req.body);

            if(validationResult.error){
              res.statusCode = 400;

              res.send(validationResult.error.details[0].message);
              return
            }
            //making sure the data that entered are not in the database
            const productExist = await ProductModel.findOne({ title });

            if(productExist){
              res.statusCode = 400;
              res.send('Product Already Exist!!!')
            } else {
              try {
                const newProduct = new ProductModel({
                  title,
                  desc,
                  image
                });

                await newProduct.save();

                res.send('added');
              } catch (error){
                res.send(error.message);
              }
            }
          }
        }
      } catch (error) {
        res.send(error.message);
      }
    });

/// Updating data in specific product
    app.put("/admin/product/update/:id", async (req, res) => {
      const token = req.headers.authorization;

      try {
        if (!token) {
          res.statusCode = 401;
          res.send("You Have No Permisson !!!");

        } else {
          const decodedToken = jwt.decode(token);

          const user = await UserModel.findById(decodedToken.sub);

          jwt.verify(token, user.salt);

          if (!user) {
            res.statusCode = 401;
            res.send("You Have No Permisson !!!");
          } else {
            //getting the product ID from the parameter
            const productId = req.params.id;
            const { title, desc, image } = req.body;
            //this code finds the specific product using the ID from request paramter
            const updatedProduct = await ProductModel.updateOne({ _id: productId }, { 
              $set:{ 
                title: title,
                desc: desc,
                image: image
              }
            })
            res.send(updatedProduct);
          }
        }
      } catch (error) {
        res.send(error.message);
      }

    });

    app.delete("/admin/product/delete/:id", async (req, res) => {
      const token = req.headers.authorization;

      try {
        if (!token) {
          res.statusCode = 401;
          res.send("You Have No Permisson !!!");

        } else {
          const decodedToken = jwt.decode(token);

          const user = await UserModel.findById(decodedToken.sub);

          jwt.verify(token, user.salt);

          if (!user) {
            res.statusCode = 401;
            res.send("You Have No Permisson !!!");
          } else {
            const _id = req.params.id;
            const product = await ProductModel.findByIdAndUpdate(_id);
            if(!product){
                res.statusCode = 404;
                res.send('Product Not Found!!!')
                } else {
                  req.statusCode = 200;
                  res.send(product)
                  return ProductModel.deleteOne()
                }
          }
        }
      } catch (error) {
        res.send(error.message);
      }
    });
    
    app.get('*', (req, res) => res.send("URL Not Found"));
  };
  
  export default setupRoutes;