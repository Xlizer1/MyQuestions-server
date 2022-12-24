import jwt from "jsonwebtoken";
import Joi from "joi";

import { hashPassword } from "./helper/helper.js";
import QuestionModel from "./models/QuestionModel.js";
import NewsModel from "./models/NewsModel.js";
import UserModel from "./models/UserModel.js";

const setupRoutes = (app) => {
    app.post("/login", async (req, res) => {
      const { email, password } = req.body;
    
      const bodySchema = Joi.object({
        email: Joi.string().email().required(),         
        password: Joi.string().min(6).required()
    });
    
    const validationResult = await bodySchema.validate(req.body);
    
    if(validationResult.error){
        res.statusCode = 400;
        res.send(validationResult.error.details[0].message);
        return
    }
    
      const user = await UserModel.findOne({ email });
    
      if (!user) {
    
        res.send("User NOT Found!!!");
    
      } else {
        //making sure that the password provided belongs to the user registered in the database
        if (user.password != hashPassword(password, user.salt)) {
          res.send("bad passowrd");
        } else {
          //generating new token
          if(user.admin) {
            const token = jwt.sign({ sub: user._id }, user.salt, { expiresIn: 604800000 });
    
            res.json({ status: 200, token: token, msg: 'admin'  });
          } else {
            const token = jwt.sign({ sub: user._id }, user.salt, { expiresIn: 604800000 });
    
            res.json({ status: 200, token: token });
          }
        }
      }
    });

    /// requseting data from the database
    app.get("/questions", async (req, res) => {
      const questions = await QuestionModel.find({});

      res.send(questions);
    });

    app.get("/news", async (req, res) => {
      const news = await NewsModel.find({});

      res.send(news);
    });

    /// Adding new product to the database
    app.post("/admin/question/new", async (req, res) => {
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
            const { title, answer, keyWord, youtubeLink } = req.body;

            //making sure that all the required data are formed
            const bodySchema = Joi.object({
              title: Joi.string().required(),
              answer: Joi.string().required(),
              keyWord: Joi.string().required(),
              youtubeLink,
            });

            const validationResult = await bodySchema.validate(req.body);

            if(validationResult.error){
              res.statusCode = 400;

              res.send(validationResult.error.details[0].message);
              return
            }
            //making sure the data that entered are not in the database
            const questionExist = await QuestionModel.findOne({ title });

            if(questionExist){
              res.statusCode = 400;
              res.send('Question Already Exist!!!')
            } else {
              try {
                const newQuestion = new QuestionModel({
                  title,
                  answer,
                  keyWord,
                  youtubeLink
                });

                await newQuestion.save();

                res.send(`تم اضافة السؤال: \n ${newQuestion}`);
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
    app.put("/admin/question/update/:id", async (req, res) => {
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
            const questionId = req.params.id;
            const { title, desc, keyWord, youtubeLink } = req.body;
            //this code finds the specific product using the ID from request paramter
            const updatedQuestion = await QuestionModel.updateOne({ _id: questionId }, { 
              $set:{ 
                title: title,
                desc: desc,
                keyWord: keyWord,
                youtubeLink: youtubeLink
              }
            })
            res.send(`تم تعديل السؤال: \n updatedQuestion`);
          }
        }
      } catch (error) {
        res.send(error.message);
      }

    });

    app.delete("/admin/question/delete/:id", async (req, res) => {
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
            const id = req.params.id;
            const question = await QuestionModel.findById(id);
            if(!question){
                res.statusCode = 404;
                res.send('Question Not Found!!!')
                } else {
                  req.statusCode = 200;
                  res.send(`تم حذف السؤال: \n ${question.title}`);
                  return QuestionModel.deleteOne({ _id: id });
                }
          }
        }
      } catch (error) {
        res.send(error.message);
      }
    });

    app.post("/admin/news/new", async (req, res) => {
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
            const { title, image } = req.body;

            //making sure that all the required data are formed
            const bodySchema = Joi.object({
              title: Joi.string().required(),
              image: Joi.string(),
            });

            const validationResult = await bodySchema.validate(req.body);

            if(validationResult.error){
              res.statusCode = 400;

              res.send(validationResult.error.details[0].message);
              return
            }
            //making sure the data that entered are not in the database
            const newsExist = await NewsModel.findOne({ title });

            if(newsExist){
              res.statusCode = 400;
              res.send('News Already Exist!!!')
            } else {
              try {
                const newNews = new NewsModel({
                  title,
                  image
                });

                await newNews.save();

                res.send(newNews);
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
    
       app.put("/admin/news/update/:id", async (req, res) => {
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
                const newsId = req.params.id;
                const { title, image } = req.body;
            //this code finds the specific product using the ID from request paramter
                const updatedNews = await NewsModel.updateOne({ _id: newsId }, { 
                  $set:{ 
                    title: title,
                    image: image
                  }
                })
            res.send(`تم تعديل الخبر: \n updatedNews`);
          }
        }
      } catch (error) {
        res.send(error.message);
      }
    });

    app.delete("/admin/news/delete/:id", async (req, res) => {
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
            const id = req.params.id;
            const news = await NewsModel.findById(id);
            if(!news){
                res.statusCode = 404;
                res.send('News Not Found!!!');
                } else {
                  req.statusCode = 200;
                  res.send(`تم حذف \n ${news.title}`);
                  return NewsModel.deleteOne({ _id: id });
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
