import React, { Component } from 'react';
import Header from '../components/Header';
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
}

const baseClientUrl = 'https://s3.amazonaws.com/client.magnumopus.gg'

class DownloadPage extends Component<Props & RouteComponentProps, State> {
    constructor(props: Props & RouteComponentProps) {
        super(props);
        this.state = {
            downloadPercent: undefined,
            isExtracting: undefined,
        }

        ipcRenderer.on('download-progress', (event, data) => {
            this.setState({ downloadPercent: data.percent })

            if (data.transferredBytes === data.totalBytes) {
                this.extractFile()
            }
        })
    }

    componentDidMount(): void {
        this.downloadFile()
    }

    extractFile = (): void => {
        const { isExtracting } = this.state

        if (isExtracting) {
            return
        }

        this.setState({
            isExtracting: true
        })

        const zipFile = new DecompressZip(`${downloadPath}/MagnumOpus.zip`)

        zipFile.extract({
            path: `${userDataPath}`
        })

        zipFile.on('extract', () => {
            const { os } = this.props

            if (os === 'darwin') {
                shell.openItem(`${userDataPath}/MagnumOpus/MagnumOpus.app`)
            } else {
                shell.openItem(`${userDataPath}/MagnumOpus/MagnumOpus.exe`)
            }

            this.setDownloaded()
            this.props.history.push("/")
        })
    }

    setDownloaded(): void {
        storage.setItem('installedClientVersion', this.props.latestClientVersion);
    }

    downloadFile = (): void => {
        const { os } = this.props
        let dir = ''

        if (os === 'darwin') {
            dir = "mac"
        } else {
            dir = "windows"
        }

        ipcRenderer.send(
            'download-item',
            {
                url: `${baseClientUrl}/${dir}/MagnumOpus.zip`,
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
        const { downloadPercent, isExtracting } = this.state
        return(
            <div>
                <Header />
                <div>
                    {
                        isExtracting
                            ? (<p>
                                {`Extracting....`}
                            </p>)
                            : (<p>
                                {`Download progress: ${this.formatPercent(downloadPercent)}`}
                            </p>)
                    }
                </div>
            </div>
        );
    }
}
export default withRouter(DownloadPage);
