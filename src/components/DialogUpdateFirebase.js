import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import Menu from 'material-ui/svg-icons/navigation/menu'
import Home from 'material-ui/svg-icons/action/home'
import Drawer from 'material-ui/Drawer'
import { blue900, grey900, fullWhite } from 'material-ui/styles/colors'
import { hashHistory } from 'react-router'
import firebase from '../services/firebase'
import facebook from '../services/facebook'
import Dialog from 'material-ui/Dialog'
import LinearProgress from 'material-ui/LinearProgress'




class DialogUpdateFirebase extends React.Component { 
  constructor(props) {
    super(props)
    this.startUpload = this.startUpload.bind(this)
    this.handleCloseExportDialog = this.handleCloseExportDialog.bind(this)
    this.firebase = new firebase();
    this.facebook = new facebook();
    this.state = {
      exportDialogOpen: false,
      exportDialogProgress: 0,
      alertDialogOpen: false,
      alertDialogMessage: null
    }
  }

  /**
   * upload selected photos to firebase and update UI
   */
  async startUpload(){
    if(this.facebook.getSelectedPhotos().length === 0) {
      this.setState({
        alertDialogOpen: true,
        alertDialogMessage: 'Please do select some photos first'
      })
      return
    }
    this.setState({
      exportDialogOpen: true,
      exportDialogActions: null
    }, async () => {
      // start upload
      await this.firebase.uploadSelectedPhotos((progressPercent) => {
        // update progress value
        this.setState({
          exportDialogProgress: progressPercent
        })
      })
      // show dialog exit button after finishing upload
      this.setState({
        exportDialogActions: (<FlatButton label="Done" primary={true} onTouchTap={this.handleCloseExportDialog} />)
      })
    })
  }

  /**
   * close export dialog, reset upload progress and redirect user to home page 
   */
  async handleCloseExportDialog() {
    this.setState({
      exportDialogProgress: 0,
      exportDialogOpen: false
    }, () => {
      hashHistory.push('/')
    })
  }

  render(){
    return (
      <div>
        <Dialog
        actions={this.state.exportDialogActions}
        modal={false}
        open={this.state.exportDialogOpen}
        >
          <p>Uploading your awesome photos to the cloud!</p>
          <LinearProgress mode="determinate" value={this.state.exportDialogProgress} />
        </Dialog>
        <Dialog
        actions={<FlatButton label="Okay" primary={true} onTouchTap={() => this.setState({alertDialogOpen: false})} />}
        modal={false}
        open={this.state.alertDialogOpen}
        >
          {this.state.alertDialogMessage}
        </Dialog>
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon color={fullWhite} /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Export" onTouchTap={this.startUpload} />
      </IconMenu>
      </div>
    )
  }
}

export default DialogUpdateFirebase;