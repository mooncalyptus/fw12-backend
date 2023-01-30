const { displayMovies, insertMovies, removeMovies, editMovies, nowShowingMovie, countAllMovies, displayMoviesById, getMovieDetails } = require('../models/movies.models')
const filter = require('../helpers/filter.helpers')
const errorHandler = require('../helpers/errorHandler.helpers')

exports.readAllMovies = (req, res)=> {
  req.query.limit = parseInt(req.query.limit) || 6
  req.query.page = parseInt(req.query.page) || 1
  req.query.search = req.query.search || ''
  const sortable = ['title']
  req.query.sortBy = (sortable.includes(req.query.sortBy) && req.query.sortBy)|| 'title'
  req.query.sort = req.query.sort || 'ASC'
  const filter = {
    limit: req.query.limit,
    offset: (parseInt(req.query.page) - 1) * req.query.limit,
    search: req.query.search,
    sort: req.query.sort,
    sortBy: req.query.sortBy
  }

const pageInfo = {
  page: req.query.page,

}
    countAllMovies(filter, (err, data)=> {
      if(err){
        console.log(err)
        return res.status(500).json({
          success: false,
          message: 'Something happen in our backend'
        })
      }
      pageInfo.dataCount = parseInt(data.rows[0].dataCount)
      pageInfo.totalPage = Math.ceil(pageInfo.dataCount / req.query.limit)
      pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1 : null
      pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1 : null
      displayMovies(filter, (err, data)=> {
        if(err){
          console.log(err)
          return res.status(500).json({
            success: false,
            message: 'Something happen in our backend'
          })
        }
        return res.status(200).json({
          success: true,
          pageInfo,
          result: data.rows
        })
      })
    })
}

exports.selectOneMovies = async (req, res) => {
  try{
    const movies = await displayMoviesById(req.params.id)
    res.status(200).json({
      success: true,
      message: "Movies retrieved successfully",
      results: movies,
    })
  } catch (error) {
    if (error) throw error;
  }
}

exports.createMovies = (req, res) => {
    if (req.file) {
    console.log(req.file)
    req.body.picture = req.file.filename
  }
  insertMovies(req.body, (err, data) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Create Movie ID success",
      results: data.rows[0],
    });
  });
}
exports.updateMovies = (req, res) => {
      if (req.file) {
        console.log(req.file)
        req.body.picture = req.file.filename
      }
      editMovies(req.params.id, req.body, (err, data) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            success: false,
            message: 'Something happen in our backend',
          })
        }
        return res.status(200).json({
          success: true,
          message: 'Data updated successfully'
        })
      })
    }

exports.deleteMovies = (req, res) => {
      removeMovies(req.params.id, (err, data) => {
        if (err) {
          console.log(err)
          return res.status(500).json({
            success: false,
            message: 'Something happen in our backend',
          })
        }
        return res.status(200).json({
          success: true,
          message: "Data deleted successfully"
        })
      })
    }

exports.nowShowing = (req, res) => {
  console.log('controller')
      nowShowingMovie((err, data) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: 'Something happen in our backend'
          })
        }
        return res.status(200).json({
          success: true,
          message: 'Showed',
          results: data.rows
        })
      })
    }

exports.getMovieDetails = (req, res) => {
  getMovieDetails((err, data) => {
    if(err) {
      return res.status(500).json({
        success: false,
        message: `Can't get Details, please check your backend.`
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Data displayed successfully',
      results: data.rows
    })
  })
}
// exports.nowShowing = async (req, res) => {
//   try {
//     const allNowShowing = await nowShowingMovie()
//     res.status(200).json({
//       success: true,
//       message: "Showing all Now Showing Movies",
//       results: allNowShowing,
//     })
//   } catch (error) {
//     console.log(error)
//     // if (error) throw error
//   }
// }