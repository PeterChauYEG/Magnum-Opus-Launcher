import React, { Component } from 'react';
import Header from "./Header";
import { ipcRenderer, shell } from 'electron'
import storage from 'electron-localstorage'
import { withRouter, RouteComponentProps } from "react-router-dom";
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
    downloadPercent?: number;
    isExtracting?: boolean;
    filename?: string;
}

const baseClientUrl = 'https://s3.amazonaws.com/client.magnumopus.gg'

class DownloadPage extends Component<Props & RouteComponentProps, State> {
    constructor(props: Props & RouteComponentProps) {
        super(props);
        this.state = {
            downloadPercent: undefined,
            isExtracting: undefined,
            filename: undefined,
        }

        ipcRenderer.on('download-progress', (event, data) => {
            this.setState({ downloadPercent: data.percent })

            if (data.transferredBytes === data.totalBytes) {
                this.extractFile()
            }
        })
    }

    componentDidMount(): void {
        const { os } = this.props
        let filename

        if (os === 'darwin') {
            filename = "Mac.zip"
        } else if (os === 'win32') {
            filename = "Windows.zip"
        }

        this.setState(
            {
                filename,
            },
            this.downloadFile
        )
    }

    extractFile = (): void => {
        const { isExtracting, filename } = this.state

        if (isExtracting) {
            return
        }

        this.setState({
            isExtracting: true
        })

        const zipFile = new DecompressZip(`${downloadPath}/${filename}`)
        zipFile.extract({
            path: `${userDataPath}/client`
        })

        zipFile.on('extract', () => {
            const { os } = this.props
            if (os === 'darwin') {
                shell.openItem(`${userDataPath}/Mac/MagnumOpus.app`)
            } else if (os === 'win32') {
                shell.openItem(`${userDataPath}/Windows/MagnumOpus.exe`)
            }

            this.setDownloaded()
            this.props.history.push("/")
        })
    }

    setDownloaded(): void {
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

    formatPercent(downloadPercent?: number): string {
        if (!downloadPercent) {
            return 'Not started'
        }

        return `${Math.round(downloadPercent * 10000) / 100}%`
    }

    render() {
        const { downloadPercent } = this.state
        return(
            <div>
                <Header />
                <div>
                    <p>
                        {`Download progress: ${this.formatPercent(downloadPercent)}`}
                    </p>
                </div>
            </div>
        );
    }
}
export default withRouter(DownloadPage);
