export const getArticlesSelector = store => store.articles.entities
export const getArticlesLoadedSelector = store => store.articles.loaded
export const getArticleSelector = (store, articleId) => store.articles.entities.find((elem) => {
  return articleId === elem.id
})

export const getCommentsSelector = (store, articleId) => {
  return store.comments.entities.get(articleId)
} 

export const getCommentsLoadedSelector = (store, articleId) => {
  console.log(articleId)
  return store.comments.loaded.includes(articleId)
}