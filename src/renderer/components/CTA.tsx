import React, { Component } from 'react';
import { Link } from "react-router-dom";

const { shell } = require('electron')
const app = require('electron').remote.app
const userDataPath = app.getPath('userData')
const homePath = app.getPath('home')

type Props = {
    latestClientVersion?: string;
    installedClientVersion?: string;
    os: string;
}

class CTA extends Component<Props> {
    startGame = (): void => {
        const { os } = this.props
        let path

        if (os === 'darwin') {
            path = `${userDataPath}/Mac/MagnumOpus.app`
            console.log({ path })
        } else if (os === 'win32') {
            path = `${userDataPath}/Windows/MagnumOpus.exe`
        }

        shell.openItem(path)
    }

    render() {
        const { installedClientVersion, latestClientVersion } = this.props

        if (!installedClientVersion) {
            return <Link to="/download">Download</Link>
        }

        if (installedClientVersion != latestClientVersion) {
            return <Link to="/download">Update</Link>
        }

        return <button onClick={this.startGame}>Start Game</button>
    }
}

export default CTA;
