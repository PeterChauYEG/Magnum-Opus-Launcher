import React, { Component } from 'react';
import Header from "./Header";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {ipcRenderer} from "electron";
import storage from "electron-localstorage";
// @ts-ignore
import DecompressZip from 'decompress-zip'

const app = require('electron').remote.app
const downloadPath = app.getPath('downloads')
const userDataPath = app.getPath('userData')

type Props = {
    latestClientVersion?: string;
    history: any;
    os: string;
}

type State = {
    updatePercent?: number;
    isExtracting?: boolean;
    filename?: string;
    updateDest?: string;
}

const baseClientUrl = 'https://s3.amazonaws.com/client.magnumopus.gg'

class UpdatePage extends Component<Props & RouteComponentProps, State> {
    constructor(props: Props & RouteComponentProps) {
        super(props);
        this.state = {
            updatePercent: undefined,
            isExtracting: undefined,
            filename: undefined,
            updateDest: undefined,
        }

        ipcRenderer.on('download-progress', (event, data) => {
            this.setState({ updatePercent: data.percent })

            if (data.transferredBytes === data.totalBytes) {
                this.extractFile()
            }
        })
    }

    componentDidMount(): void {
        const { os } = this.props
        let filename
        let updateDest

        if (os === 'darwin') {
            filename = "Mac-Patch.zip"
            updateDest = '/Applications/MagnumOpus.app/Contents/UE4/MagnumOpus/Content/Paks/'
        } else if (os === 'win32') {
            filename = "Windows-Patch.zip"
            updateDest = `${userDataPath}/client/MagnumOpus/MagnumOpus/Content/Paks/`
        }

        this.setState(
            {
                filename,
                updateDest,
            },
            this.downloadFile
        )
    }

    extractFile = (): void => {
        const { isExtracting, filename, updateDest } = this.state

        if (isExtracting) {
            return
        }

        this.setState({
            isExtracting: true
        })

        const zipFile = new DecompressZip(`${downloadPath}/${filename}`)
        zipFile.extract({
            path: updateDest
        })

        zipFile.on('extract', () => {
            this.setUpdated()
            this.props.history.push("/")
        })
    }

    setUpdated(): void {
        storage.setItem('installedClientVersion', this.props.latestClientVersion);
    }

    downloadFile = (): void => {
        ipcRenderer.send(
            'download-item',
            {
                url: `${baseClientUrl}/${this.state.filename}`,
            },
        )
    }

    formatPercent(updatePercent?: number): string {
        if (!updatePercent) {
            return 'Not started'
        }

        return `${Math.round(updatePercent * 10000) / 100}%`
    }

    render(){
        const { updatePercent } = this.state
        return(
            <div>
                <Header />
                <div>
                    <p>
                        {`Update progress: ${this.formatPercent(updatePercent)}`}
                    </p>
                </div>
            </div>
        );
    }
}
export default withRouter(UpdatePage);
