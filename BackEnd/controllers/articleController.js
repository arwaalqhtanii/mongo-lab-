import User from '../models/User.js';


export const addArticle = async (req, res) => {
  const { title, content } = req.body;

  try {
   
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

 
    const newArticle = {
      title,
      content,
      createdAt: new Date(),
    };

    user.articles.push(newArticle);

  
    await user.save();


    res.status(201).json({
      message: "Article added successfully",
      article: newArticle,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to add article", error: err.message });
  }
};
