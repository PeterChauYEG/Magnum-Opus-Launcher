import React, { Component } from 'react';

type Props = {
    latestClientVersion?: string,
    installedClientVersion?: string,
}

class Version extends Component<Props> {
    render() {
        const { installedClientVersion, latestClientVersion } = this.props
        return (
            <div>
                <p>{`Installed Client version: ${installedClientVersion}`}</p>
                <p>{`Latest Client version: ${latestClientVersion}`}</p>
            </div>
        );
    }
}

export default Version;
