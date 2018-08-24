import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import Check from 'material-ui/svg-icons/navigation/check'
import SortByAlpha from 'material-ui/svg-icons/av/sort-by-alpha'
import Collections from 'material-ui/svg-icons/image/collections'
import Backup from 'material-ui/svg-icons/action/backup'
import RestorePage from 'material-ui/svg-icons/action/restore-page'
import { blue900, amber800, grey900, fullWhite, fullBlack } from 'material-ui/styles/colors'
import RefreshIndicator from 'material-ui/RefreshIndicator'
import { Link } from 'react-router'
import facebook from '../services/facebook'
import { hashHistory } from 'react-router'
import Checkbox from 'material-ui/Checkbox'
import CircularProgress from 'material-ui/CircularProgress'
import InfiniteScroll from 'react-infinite-scroller'

export default class AlbumPage extends React.Component {
  constructor(props) {
    super(props)
    this.facebook = new facebook()
    this.state = {
      photos: [],
      photosNextPageToken: null,
      hasMorePhotos: true,
      selectedPhotos: this.facebook.getSelectedPhotos()
    }
  }

  /**
   * load list of user's photos that exists to current album
   */
  async loadPhotos() {
    // show loading indicator...
    this.setState({
      isLoading: true,
      hasMorePhotos: false
    }, async () => {
      // ... fetch album's photos
      try {
        let photos = await this.facebook.getAlbumPhotos(this.props.params.albumId, this.state.photosNextPageToken)
        this.setState({
          photos: this.state.photos.concat(photos.data),
          photosNextPageToken: photos.paging ? photos.paging.cursors.after : null,
          hasMorePhotos: photos.data.length > 0,
          isLoading: false
        })
      } catch (exception) {
        console.error(exception)
        // redirect to home page in case of access token issue
        if (exception.error &&
          [190, 2500, 104].includes(exception.error.code)) {
          hashHistory.push('/')
        }
      }
    })

  }

  /**
   * add/remove photo from current user selected photos list
   * @param {*object} photo Facebook Graph Api photo object
   */
  toggleSelectPhoto(photo) {
    if (this.state.selectedPhotos.find(p => p.id === photo.id)) {
      this.facebook.removeSelectedPhoto(photo)
    } else {
      this.facebook.addSelectedPhoto(photo)
    }
    // reload selected photos
    // TODO: refactor, improve performance
    this.setState({ selectedPhotos: this.facebook.getSelectedPhotos() })
  }

  // TODO: refactor, clean up markup & implement masonry grid as separate component
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <div className="card">
              <div className="card-content">
                <InfiniteScroll
                  threshold={20}
                  loadMore={() => this.loadPhotos.call(this)}
                  hasMore={this.state.hasMorePhotos}>
                  {this.state.photos.length == 0 && !this.state.isLoading ?
                    (
                      <h4>Oops! there is no photos in this album :(</h4>
                    ) : (
                      <div className="masonry-grid images">
                        {this.state.photos.map((photo) => (
                          <article key={photo.id} className={'item' + (this.state.selectedPhotos.find(p => p.id === photo.id) ? ' selected' : '')} onClick={() => this.toggleSelectPhoto.call(this, photo)}>
                            <img src={photo.thumbnail} className="image" />
                            <span className="select-mark"><Check color={fullWhite} /></span>
                          </article>
                        ))}
                      </div>
                    )}

                  {this.state.isLoading ?
                    (
                      <div style={{ textAlign: 'center', marginTop: '25px' }}><CircularProgress size={30} thickness={5} /></div>
                    ) : null}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}