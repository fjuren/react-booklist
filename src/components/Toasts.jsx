import React, { useContext } from 'react';
import ToastContext from '../contexts/toast-context';

export default function Toasts() {
  const { toastFade, toastStatus, book, toastType } = useContext(ToastContext);
  return (
    <>
      {toastStatus === 'success' && (
        <div
          className={`bg-green-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3 absolute z-50 right-0 left-0 top-5 text-center transform transition-all duration-500 ${
            toastFade ? 'opacity-100 translate-y-2' : 'opacity-0'
          }`}
          id="static-example"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-mdb-autohide="false"
        >
          <div className="bg-green-500 flex justify-center items-center py-2 px-3 bg-clip-padding border-b border-green-400 rounded-t-lg">
            <p className="font-bold text-white flex items-center">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="check-circle"
                className="w-4 h-4 mr-2 fill-current"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                />
              </svg>
              Success!
            </p>
          </div>
          {toastType === 'add_book' && (
            <div className="px-3 pb-3 bg-green-500 rounded-b-lg break-words text-white">
              {book.title} has been added to your collection.
            </div>
          )}
          {toastType === 'favoriting' && (
            <div className="px-3 pb-3 bg-green-500 rounded-b-lg break-words text-white">
              {book.title} has been added to your favorites.
            </div>
          )}
          {toastType === 'rating' && (
            <div className="px-3 pb-3 bg-green-500 rounded-b-lg break-words text-white">
              {book.title} has been updated.
            </div>
          )}
          {toastType === 'add_list' && (
            <div className="px-3 pb-3 bg-green-500 rounded-b-lg break-words text-white">
              List {book.name} has been added to your collection.
            </div>
          )}
          {toastType === 'edit_book' && (
            <div className="px-3 pb-3 bg-green-500 rounded-b-lg break-words text-white">
              {book.title} has been updated.
            </div>
          )}
        </div>
      )}
      {toastStatus === 'remove' && (
        <div
          className={`bg-red-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3 absolute z-50 right-0 left-0 top-5 text-center transform transition-all duration-500 ${
            toastFade ? 'opacity-100 translate-y-2' : 'opacity-0'
          }`}
          id="static-example"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-mdb-autohide="false"
        >
          <div className="bg-red-500 flex justify-center items-center py-2 px-3 bg-clip-padding border-b border-red-400 rounded-t-lg">
            <p className="font-bold text-white flex items-center">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="times-circle"
                className="w-4 h-4 mr-2 fill-current"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                />
              </svg>
              {toastType !== 'delete_list' && 'Book Removed'}
              {toastType === 'delete_list' && 'List Removed'}
            </p>
          </div>
          {toastType === 'favoriting' && (
            <div className="px-3 pb-3 bg-red-500 rounded-b-lg break-words text-white">
              {book.title} has been removed from your favorites.
            </div>
          )}
          {toastType === 'delete_book' && (
            <div className="px-3 pb-3 bg-red-500 rounded-b-lg break-words text-white">
              {book.title} has been removed from your collection.
            </div>
          )}
          {toastType === 'delete_list' && (
            <div className="px-3 pb-3 bg-red-500 rounded-b-lg break-words text-white">
              List {book.title} has been removed from your collection.
            </div>
          )}
        </div>
      )}
      {toastStatus === 'error' && (
        <div
          className={`bg-yellow-500 shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3 absolute z-50 right-0 left-0 top-5 text-center transform transition-all duration-500 ${
            toastFade ? 'opacity-100 translate-y-2' : 'opacity-0'
          }`}
          id="static-example"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-mdb-autohide="false"
        >
          <div className="bg-yellow-500 flex justify-center items-center py-2 px-3 bg-clip-padding border-b border-yellow-400 rounded-t-lg">
            <p className="font-bold text-white flex items-center">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="exclamation-triangle"
                className="w-4 h-4 mr-2 fill-current"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                />
              </svg>
              Error!
            </p>
          </div>
          <div className="px-3 pb-3 bg-yellow-500 rounded-b-lg break-words text-white">
            Error making changes to {book.title}
          </div>
        </div>
      )}
    </>
  );
}
