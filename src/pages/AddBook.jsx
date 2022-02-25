import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import { loadAuthToken } from '../utils/local-storage';
import API_BASE_URL from '../config';

import CustomDropdown from '../components/customDropdown/CustomDropdown';

export default function AddBookPage() {
  const [title, setTitle] = useState('');
  const [pages, setPages] = useState('');
  const [author, setAuthor] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [seriesOptions, setSeriesOptions] = useState([]);
  const [series, setSeries] = useState(0);
  const [bookSelection, setBookSelection] = useState([]);
  const [bookImage, setBookImage] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const authToken = loadAuthToken();

    axios
      .get(`${API_BASE_URL}/lists`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setSeriesOptions(res.data);
        setSeries(res.data[0].list_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function addBook(e) {
    e.preventDefault();
    const authToken = loadAuthToken();
    const bookDetails = {
      list_id: series,
      author,
      title,
      image_url: bookImage,
    };

    if (pages) {
      bookDetails.pages = pages;
    }

    axios
      .post(`${API_BASE_URL}/books`, bookDetails, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(() => {
        history.push('/dashboard');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function autofillBookInfo(book) {
    if (!book.volumeInfo.authors) {
      setAuthor('');
    } else {
      setAuthor(book.volumeInfo.authors.map((a) => a).join(', '));
    }
    if (!book.volumeInfo.pageCount) {
      setPages('');
    } else {
      setPages(book.volumeInfo.pageCount);
    }
    if (!book.volumeInfo.imageLinks.thumbnail) {
      setBookImage(null);
    } else {
      setBookImage(book.volumeInfo.imageLinks.thumbnail);
    }
    setTitle(book.volumeInfo.title);
  }

  function searchBooks(query) {
    if (query.length > 2) {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then((res) => {
          setBookSelection(res.data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setBookSelection(null);
    }
  }

  let seriesSelect;
  let image;

  // this could probably be removed once this issue is resolved https://github.com/FreeCodeCamp-SLC/react-booklist/issues/12
  if (seriesOptions.length === 0) {
    seriesSelect = null;
  } else {
    seriesSelect = (
      <select
        onChange={(e) => {
          setSeries(e.target.value);
        }}
        className="w-full border-2 py-1.5 px-2 rounded-md"
        name="Series"
        id="Series"
        value={series.list_id}
      >
        {seriesOptions.map((item) => (
          <option value={item.list_id} key={item.list_id}>
            {item.name}
          </option>
        ))}
      </select>
    );
  }

  if (!bookImage) {
    image = null;
  } else {
    image = (
      <div className="flex justify-center py-4">
        <img src={bookImage} alt="book cover" className="w-32" />
      </div>
    );
  }

  return (
    <section className=" sm:grid grid-cols-layout grid-rows-layout">
      <Header />
      <div className="min-h-screen col-start-2 row-start-2 bg-gray-100 ">
        <h2 className="px-4 pt-5 text-3xl font-bold text-gray-900 ">Add New</h2>
        <div className="mx-5 rounded-md shadow-md mt-7">
          <form className="flex flex-col px-5 pt-5 pb-2 bg-white" id="new book">
            <label className="my-3" htmlFor="Book-Title">
              Book Title
              <CustomDropdown
                name="Book-Title"
                searchBooks={searchBooks}
                bookSelection={bookSelection}
                autofillBookInfo={autofillBookInfo}
              />
            </label>

            <label className="my-3 flex flex-col" htmlFor="Pages">
              Pages
              <input
                onChange={(e) => {
                  setPages(e.target.value);
                }}
                className="w-full mt-1 sm:w-48 border-2 py-1.5 px-2 rounded-md"
                type="number"
                id="pages"
                name="Pages"
                value={pages}
                required
              />
            </label>
            <label className="my-3" htmlFor="Author">
              Author(s)
              <input
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
                className="w-full mt-1 border-2 py-1.5 px-2 rounded-md"
                type="text"
                name="Author"
                id="Author"
                value={author}
                required
              />
            </label>
            {image}
            <label className="flex flex-col my-3" htmlFor="Favorite">
              Favorite
              <div className="text-gray-500">
                Add this book to your list of favorites
              </div>
              <input
                onChange={(e) => {
                  setFavorite(e.target.value);
                }}
                className="w-5 mt-1"
                type="checkbox"
                name="Favorite"
                id="Favorite"
                value={favorite}
              />
            </label>
            <label className="my-3" htmlFor="Series">
              Series / Collection
              {seriesSelect}
            </label>
          </form>

          <div className="flex items-center h-16 bg-gray-50 ">
            <button
              className="h-10 ml-4 font-semibold text-white rounded-md bg-booklistBlue-dark w-28"
              type="submit"
              form="new book"
              onClick={addBook}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
