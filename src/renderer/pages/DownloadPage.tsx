import React, { Component } from 'react';
import Header from '../components/Header';
import { ipcRenderer, shell } from 'electron'
import storage from 'electron-localstorage'
import { withRouter, RouteComponentProps } from "react-router-dom";
import Page from "../components/Page";
import city from '../../../assets/imgs/city.png'

// @ts-ignore
import DecompressZip from 'decompress-zip'
import Progress from "../components/ProgressBar";

const app = require('electron').remote.app

const downloadPath = app.getPath('downloads')
const userDataPath = app.getPath('userData')
const BASE_CLIENT_URL = 'https://s3.amazonaws.com/client.magnumopus.gg'

type Props = {
    latestClientVersion?: string;
    history: any;
    os: string;
    setInstalledClientVersion: any;
}

type State = {
    downloadPercent: number;
    isExtracting?: boolean;
}

class DownloadPage extends Component<Props & RouteComponentProps, State> {
    constructor(props: Props & RouteComponentProps) {
        super(props);
        this.state = {
            downloadPercent: 0,
            isExtracting: false,
        }

        ipcRenderer.on('download-progress', (event, data) => {
            if ((data.transferredBytes * 10000) % 10 === 0) {
                this.setState({ downloadPercent: data.percent })
            }

            if (data.transferredBytes === data.totalBytes) {
                this.extractFile()
            }
        })
    }

    componentDidMount(): void {
        this.downloadFile()
    }

    extractFile(): void {
        const { isExtracting } = this.state

        if (isExtracting) {
            return
        }

        const zipFile = new DecompressZip(`${downloadPath}/MagnumOpus.zip`)

        zipFile.on('extract', () => {
            this.setDownloaded()
        })

        this.setState({
            isExtracting: true
        },
        () => {
            zipFile.extract({
                path: `${userDataPath}`
            })
        })
    }

    setDownloaded(): void {
        storage.setItem('installedClientVersion', this.props.latestClientVersion);
        this.props.setInstalledClientVersion(this.props.latestClientVersion)
        this.setState({
            isExtracting: false,
        }, () => this.props.history.push("/"))
    }

    downloadFile(): void {
        const { os } = this.props
        const dir = os === 'darwin' ? "mac" :"windows"

        ipcRenderer.send(
            'download-item',
            {
                url: `${BASE_CLIENT_URL}/${dir}/MagnumOpus.zip`,
            },
        )
    }

    formatProgress(): string {
        const { downloadPercent, isExtracting } = this.state

        if (isExtracting) {
            return 'Extracting'
        }

        if (!downloadPercent) {
            return 'Not started'
        }

        return 'Downloading'
    }

    render() {
        const { downloadPercent } = this.state

        return(
            <Page backgroundImage={city}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateRows: '100vh'
                    }}
                >
                    <div
                        style={{
                            gridRowStart: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Header />
                        <div
                            style={{
                                marginBottom: '16px'
                            }}
                        >
                            <p
                                style={{
                                    fontSize: '1.5em'
                                }}
                            >
                                {this.formatProgress()}
                            </p>
                        </div>
                        <Progress
                            percent={downloadPercent * 100}
                        />
                    </div>
                </div>
            </Page>
        );
    }
}
export default withRouter(DownloadPage);
