import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const bookDetailsApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookItemDetails extends Component {
  state = {
    bookDetailsData: {},
    bookDetailsApiStatus: bookDetailsApiStatuses.initial,
  }

  componentDidMount() {
    this.getBookDetailsApi()
  }

  getBookDetailsApi = async () => {
    this.setState({bookDetailsApiStatus: bookDetailsApiStatuses.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const bookDetailsApi = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(bookDetailsApi, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = {
        bookDetails: {
          id: fetchedData.book_details.id,
          authorName: fetchedData.book_details.author_name,
          coverPic: fetchedData.book_details.cover_pic,
          aboutBook: fetchedData.book_details.about_book,
          rating: fetchedData.book_details.rating,
          aboutAuthor: fetchedData.book_details.about_author,
          readStatus: fetchedData.book_details.read_status,
          title: fetchedData.book_details.title,
        },
      }
      console.log(updatedData)
      this.setState({
        bookDetailsData: updatedData,
        bookDetailsApiStatus: bookDetailsApiStatuses.success,
      })
    } else {
      this.setState({bookDetailsApiStatus: bookDetailsApiStatuses.failure})
    }
  }

  onClickRetry = () => {
    this.getBookDetailsApi()
  }

  renderBookDetailsFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        src="https://res.cloudinary.com/deopx4rdp/image/upload/v1694001703/jkm13rgpi0nfxzebmhde.png"
        alt="failure view"
        className="top-rated-books-failure-image"
      />
      <p className="top-rated-books-failure-heading">
        Something Went Wrong. Please try again.
      </p>
      <button
        className="top-rated-books-failure-button"
        onClick={this.onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  renderBookDetailsInProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#8284C7" height={32} width={32} />
    </div>
  )

  renderBookDetailsSuccessView = () => {
    const {bookDetailsData} = this.state
    const {bookDetails} = bookDetailsData
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      aboutAuthor,
      title,
    } = bookDetails

    return (
      <div className="book-details-card-container">
        <div className="book-details-container">
          <div className="details">
            <img src={coverPic} alt={title} className="book-details-image" />
            <div className="container1">
              <h1 className="book-title">{title}</h1>
              <p className="book-details-author-name">{authorName}</p>
              <div className="book-details-rating-container">
                <p className="book-details-avg-rating-heading">Avg rating</p>
                <BsFillStarFill className="book-details-star-icon" />
                <p className="book-details-rating">{rating}</p>
              </div>
              <p className="book-details-status-heading">
                Status:<span className="book-details-status">{readStatus}</span>
              </p>
            </div>
          </div>
          <div className="container2">
            <hr className="horizontal-line" />
          </div>
          <div>
            <h1 className="about-heading">About Author</h1>
            <p className="about-paragraph">{aboutAuthor}</p>
          </div>
          <div>
            <h1 className="about-heading">About Book</h1>
            <p className="about-paragraph">{aboutBook}</p>
          </div>
        </div>
      </div>
    )
  }

  renderBookDetails = () => {
    const {bookDetailsApiStatus} = this.state

    switch (bookDetailsApiStatus) {
      case bookDetailsApiStatuses.success:
        return <>{this.renderBookDetailsSuccessView()}</>
      case bookDetailsApiStatuses.inProgress:
        return <>{this.renderBookDetailsInProgressView()}</>
      case bookDetailsApiStatuses.failure:
        return <>{this.renderBookDetailsFailureView()}</>
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header shelves />
        <div className="book-details-bg-container">
          {this.renderBookDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default BookItemDetails
