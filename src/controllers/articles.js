import { getAllArticles } from "../services/articles.js";


export const getArticlesController = async (req, res, next,) => {

	  const articles = await getAllArticles();
	  res.json({
	    status: 200,
	    message: 'Successfully found articles!',
	    data: articles,
	  });
};
