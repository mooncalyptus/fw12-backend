const filter = (data, sortable, pageInfoModel) => {
  data.limit = parseInt(data.limit) || 5
  data.page = parseInt(data.page) || 1
  data.search = data.search || ''
  // const sortable = ['title', 'createdAt', 'updatedAt']
  data.sortBy = (sortable.includes(data.sortBy) && data.sortBy) || 'createdAt'
  data.sort = data.sort || 'ASC'
  const filter = {
    limit: data.limit,
    offset: (parseInt(data.page) - 1) * data.limit,
    search: data.search,
    sort: data.sort,
    sortBy: data.sortBy
  }
  const pageInfo = {
    page: data.page,
  };

  pageInfoModel(params, (result) => {
    pageInfo.dataCount = parseInt(data.rows[0].dataCount)
    pageInfo.totalPage = Math.ceil(pageInfo.dataCount / data.limit)
    pageInfo.nextPage = data.page < pageInfo.totalPage ? data.page + 1 : null
    pageInfo.prevPage = data.page > 1 ? data.page - 1 : null
  })

  return {params, pageInfo}
}

module.exports = filter