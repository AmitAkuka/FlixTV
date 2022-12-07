const axios = require('axios').default;

export const showService = {
 query,
 queryCategories,
 queryById,
 queryTrailerById,
 queryByName
}

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = '30d342b5df6e9f466c294bed4cecad48'

async function query (filterBy,pageNum) {
  try{
    console.log('getting shows by filter:', filterBy)
    const {data} = (filterBy.genereId === 99999) 
    //if id 99999 sending xhr to get pupular shows, which is the default
    ? await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${pageNum}`)
    : await axios.get(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${filterBy.genereId}&page=${pageNum}`)
    return {results: data.results, totalPages: data.total_pages, currPage: data.page}
  }catch(err){
    console.log(err)
  }
}

async function queryCategories () {
  try{
    const { data } = await axios.get(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`)
    const categories = data.genres.map((genere) => ({
      genereId: genere.id,
      genereName: genere.name
    }))
    return categories
  }catch(err){
    console.log(err)
  }
}

async function queryById (showId) {
  try{
    const { data } = await axios.get(`${BASE_URL}/tv/${showId}?api_key=${API_KEY}&language=en-US`)
    const actorsDetails = await _queryActorsListById(showId)
    const suggestedShows = await _querySuggestedShowsById(showId)
    console.log('got suggested shows:',suggestedShows)
    data.actors = actorsDetails
    data.suggestedShows = suggestedShows
    return data
  }catch(err){
    console.log(err)
  }
}

async function queryTrailerById (showId) {
  try {
    const { data } = await axios.get(`${BASE_URL}/tv/${showId}/videos?api_key=${API_KEY}&language=en-US`)
    const officialTrailer = data.results.find(res => (res.type === "Trailer" && (res.official || data.results.length === 1)))
    return officialTrailer.key
  } catch (err){
    console.log(err)
  }
}

async function queryByName (showName,pageNum) {
  try {
    console.log('Service searching by name:',showName)
    const { data } = await axios.get(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${showName}&page=${pageNum}`)
    return {results: data.results, totalPages: data.total_pages, currPage: data.page}
  } catch (err){
    console.log(err)
  }
}


async function _queryActorsListById (showId) {
  try{
    const { data } = await axios.get(`${BASE_URL}/tv/${showId}/credits?api_key=${API_KEY}&language=en-US`)
    //filter actors with no img and no character info
    let actors = data.cast.filter(actor => (actor.profile_path && actor.character))
    //showing 10 actors total
    if(actors.length > 10) actors = actors.splice(0,10)
    return actors
  }catch(err){
    console.log(err)
  }
}

async function _querySuggestedShowsById(showId) {
  try{
    const { data } = await axios.get(`${BASE_URL}/tv/${showId}/similar?api_key=${API_KEY}&language=en-US&page=1`)
    return data.results.splice(0,8)
  } catch(err){
    console.log(err)
  }
}