// exports.readAllMovies = (req, res)=> {
//   req.query.limit = parseInt(req.query.limit) || 5
//   req.query.page = parseInt(req.query.page) || 1
//   req.query.search = req.query.search || ''
//   const sortable = ['title','createdAt','updatedAt']
//   req.query.sortBy = (sortable.includes(req.query.sortBy) && req.query.sortBy)|| 'createdAt'
//   req.query.sort = req.query.sort || 'ASC'
//   const filter = {
//     limit: req.query.limit,
//     offset: (parseInt(req.query.page) - 1) * req.query.limit,
//     search: req.query.search,
//     sort: req.query.sort,
//     sortBy: req.query.sortBy
//   }

// const pageInfo = {
//   page: req.query.page,

// }
//     countAllMovies(filter, (err, data)=> {
//       if(err){
//         console.log(err)
//         return res.status(500).json({
//           success: false,
//           message: 'Something happen in our backend'
//         })
//       }
//       pageInfo.dataCount = parseInt(data.rows[0].dataCount)
//       pageInfo.totalPage = Math.ceil(pageInfo.dataCount / req.query.limit)
//       pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1 : null
//       pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1 : null
//       displayMovies(filter, (err, data)=> {
//         if(err){
//           console.log(err)
//           return res.status(500).json({
//             success: false,
//             message: 'Something happen in our backend'
//           })
//         }
//         return res.status(200).json({
//           success: true,
//           pageInfo,
//           result: data.rows
//         })
//       })
//     })
// }

// exports.createMovies = (req, res) => {
//   if (req.file) {
//     console.log(req.file)
//     req.body.picture = req.file.filename
//   }
//   insertMovies(req.body, (err, data) => {
//     if (err) {
//       console.log(err)
//       return res.status(500).json({
//         success: false,
//         message: "Data created failed"
//       })
//     }
//     return res.status(200).json({
//       success: true,
//       message: "Data created successfully",
//       results: data.rows[0]
//     })
//   })
// }

// exports.readAllMovies = (req, res) => {
//   const sortable = [
//     "title",
//     "createdAt",
//     "updatedAt",
//   ]
//   filter(req.query, sortable, countAllMovies, res, (filter, pageInfo) => {
//     displayMovies(filter, (err, data) => {
//       if(err){
//         return errorHandler(err, res)
//       }
//       return res.status(200).json({
//         success: true,
//         pageInfo,
//         results: data.rows,
//       })
//     })
//   })
// }