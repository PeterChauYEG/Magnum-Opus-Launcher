import React, {useEffect, useState} from "react";
import {hot} from "react-hot-loader/root";
import {
    HashRouter,
    Switch,
    Route,
} from "react-router-dom";
import StartPage from "./pages/StartPage";
import DownloadPage from "./pages/DownloadPage";
import storage from 'electron-localstorage'
import os from 'os'

const app = require('electron').remote.app

type Props = {}

const userDataPath = app.getPath('userData')
const userOs = os.platform()

storage.setStoragePath(`${userDataPath}/data.json`);
const App = (props: Props) => {
    const [latestClientVersion, setLatestClientVersion] = useState(undefined)
    const [latestLauncherVersion, setLatestLauncherVersion] = useState(undefined)
    const [installedClientVersion, setInstalledClientVersion] = useState(storage.getItem('installedClientVersion'))

    useEffect(() => {
            fetch('https://api.magnumopus.gg/health')
                .then(response => {
                    if (response.status !== 200) {
                        return;
                    }

                    response.json().then(data => {
                        setLatestLauncherVersion(data.launcherVersion)
                        setLatestClientVersion(data.gameVersion)
                    });
                })
                .catch(() => console.log('error getting server health'))
    }, [])

    return (
        <HashRouter>
            <div>
                <Switch>
                    <Route path="/download">
                        <DownloadPage
                            latestClientVersion={latestClientVersion}
                            os={userOs}
                            setInstalledClientVersion={setInstalledClientVersion}
                        />
                    </Route>
                    <Route path="/">
                        <StartPage
                            latestLauncherVersion={latestLauncherVersion}
                            latestClientVersion={latestClientVersion}
                            installedClientVersion={installedClientVersion}
                            os={userOs}
                        />
                    </Route>
                </Switch>
            </div>
        </HashRouter>
    )
}

export default hot(App);
