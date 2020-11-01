import React, { Component } from "react";
import {hot} from "react-hot-loader/root";
import {
    HashRouter,
    Switch,
    Route,
} from "react-router-dom";
import StartPage from "../pages/StartPage";
import DownloadPage from "../pages/DownloadPage";
import UpdatePage from "../pages/UpdatePage";
import storage from 'electron-localstorage'
import os from 'os'

const app = require('electron').remote.app

type Props = {}
type State = {
    latestClientVersion?: string;
    latestLauncherVersion?: string;
    os: string;
}

const userDataPath = app.getPath('userData')

storage.setStoragePath(`${userDataPath}/data.json`);

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            latestClientVersion: undefined,
            os: os.platform(),
        }
    }

    componentDidMount(): void {
        fetch('https://api.magnumopus.gg/health')
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({
                        latestClientVersion: data.gameVersion,
                        latestLauncherVersion: data.launcherVersion,
                    })
                });
            })
            .catch(() => console.log('error getting server health'))
    }

    render() {
        const { latestLauncherVersion, latestClientVersion, os } = this.state
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route path="/download">
                            <DownloadPage latestClientVersion={latestClientVersion} os={os} />
                        </Route>
                        <Route path="/update">
                            <UpdatePage latestClientVersion={latestClientVersion} os={os} />
                        </Route>
                        <Route path="/">
                            <StartPage
                                latestLauncherVersion={latestLauncherVersion}
                                latestClientVersion={latestClientVersion}
                                os={os}
                            />
                        </Route>
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default hot(App);
