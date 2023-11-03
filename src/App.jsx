import { useEffect, useState } from 'react'
import Auth from './components/Auth'
import { db, auth, storage } from './config/firebase'
import { getDocs, collection, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { uploadBytes, ref } from 'firebase/storage'

function App() {
  const [movieList, setMovieList] = useState([])

  // new movie state
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setNewReleaseDate] = useState('')
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  // update title state
  const [updateTitle, setUpdateTitle] = useState('')

  // file upload state
  const [fileUpload, setFileUpload] = useState(null)

  const MoviesCollectionRef = collection(db, 'movies')

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    await deleteDoc(movieDoc)

    getMovieList()
  }

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, 'movies', id)
    await updateDoc(movieDoc, {title: updateTitle})
    getMovieList()
  }

  const getMovieList = async () => {
    try {
      const data = await getDocs (MoviesCollectionRef)
      const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}))
      setMovieList(filteredData)
      console.log('deu certo!');
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getMovieList()
  }, [])

  const submitMovie = async () => {
    try {
      await addDoc(MoviesCollectionRef, {
      title: newMovieTitle,
      releaseDate: newReleaseDate,
      receivedAnOscar: isNewMovieOscar,
      userId: auth?.currentUser?.uid,
    })

    getMovieList();
    } catch (error) {
      console.error(error);
    }
  }

  const uploadFile = async () => {
    if (!fileUpload) return;

    const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(fileFolderRef, fileUpload)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <Auth />
      <div className='mx-4 mb-4 justify-between flex flex-col flex-wrap'>
        <input 
          type="text" 
          placeholder='Movie title...' 
          value={newMovieTitle} 
          onChange={(e) => setNewMovieTitle(e.target.value)}  
        />
        <input 
          type="number"
          placeholder='Release Date...'
          value={newReleaseDate}
          onChange={(e) => setNewReleaseDate(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            checked={isNewMovieOscar}
            onChange={(e) => setIsNewMovieOscar(e.target.checked)}
          /><label>Received and Oscar</label>
        </div>
      
      </div>
      <button className='mb-10' onClick={submitMovie}>
        Submit Movie
      </button>

      <div className='mt-5'>
        {movieList.map((movie) => (
          <div key={movie.id} className='flex flex-col'>
            <h1 className='text-6xl font-bold mx-auto' style={{color: movie.receivedAnOscar ? 'green' : 'red'}}>{movie.title}</h1>
            <p className='mt-4'>Date: {movie.releaseDate}</p>

            <button onClick={() => deleteMovie(movie.id)}>Delete movie</button>

            <input 
              type="text" 
              placeholder='new title' 
              onChange={(e) =>setUpdateTitle(e.target.value)}
              
            />
            <button onClick={() => updateMovieTitle(movie.id)}>Update title</button>
          </div>
        ))}
      </div>

      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  )
}

export default App
