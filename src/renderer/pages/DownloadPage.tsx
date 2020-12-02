import React, { Component } from 'react';
import Header from '../components/Header';
import { ipcRenderer, shell } from 'electron'
import storage from 'electron-localstorage'
import { withRouter, RouteComponentProps } from "react-router-dom";
import Page from "../components/Page";
import city from '../../../assets/imgs/city.png'
import extract from 'extract-zip'
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

        ipcRenderer.on('download progress', async (event, data) => {
            if ((Math.floor(data.percent * 100)) % 1 === 0) {
                this.setState({ downloadPercent: data.percent })
            }
        })

        ipcRenderer.on('download complete', async (event, path) => {
            await this.extractFile(path)
        })
    }

    componentDidMount(): void {
        this.downloadFile()
    }

    async extractFile(path: string): Promise<void> {
        const { isExtracting } = this.state

        if (isExtracting) {
            return
        }

        try {
            this.setState({
              isExtracting: true
            })

            await extract(path, { dir: userDataPath })

            this.setDownloaded()
        } catch (error) {
            console.log(error)
        }
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
            'download',
            {
                url: `${BASE_CLIENT_URL}/${dir}/MagnumOpus.zip`,
                properties: { directory: downloadPath }
            },
        )
    }

    formatProgress(): string {
        const { downloadPercent, isExtracting } = this.state

        if (isExtracting) {
            return `Extracting`
        }

        if (downloadPercent) {
            return `Downloading: ${Math.floor(downloadPercent * 100)}%`
        }

        return 'Not started'
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
                            percent={downloadPercent}
                        />
                    </div>
                </div>
            </Page>
        );
    }
}
export default withRouter(DownloadPage);
