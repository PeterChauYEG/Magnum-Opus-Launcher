import React, {useEffect} from 'react';
import storage from 'electron-localstorage'
import CTA from '../components/CTA';
import Version from "../components/Version";
import Header from "../components/Header";
import LauncherVersion from "../components/LauncherVersion";
import forest from '../../../public/media/videos/forest-1.mp4'
import Page from "../components/Page";
import { useHistory } from "react-router-dom";

type Props = {
	latestClientVersion?: string,
	latestLauncherVersion?: string,
	os: string,
	installedClientVersion?: string,
}

const StartPage = ({
   latestLauncherVersion,
   latestClientVersion,
   installedClientVersion,
   os
}: Props) => {
	const history = useHistory();

	useEffect(() => {
		if (installedClientVersion && latestClientVersion && installedClientVersion !== latestClientVersion) {
			history.push('/download')
		}
	}, [installedClientVersion, latestClientVersion])

	return (
		<Page backgroundVideo={forest}>
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
							marginBottom: '24px',
							display: 'flex'
						}}
					>
						<CTA
							installedClientVersion={installedClientVersion}
							latestClientVersion={latestClientVersion}
							os={os}
						/>
					</div>
					<LauncherVersion
						latestLauncherVersion={latestLauncherVersion}
					/>
				</div>
			</div>
		</Page>
	);
}

export default StartPage;
