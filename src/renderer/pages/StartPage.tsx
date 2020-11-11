import React  from 'react';
import storage from 'electron-localstorage'
import CTA from '../components/CTA';
import Version from "../components/Version";
import Header from "../components/Header";
import LauncherVersion from "../components/LauncherVersion";
import forest from '../../../public/media/videos/forest-1.mp4'
import Page from "../components/Page";

type Props = {
	latestClientVersion?: string,
	latestLauncherVersion?: string,
	os: string,
}

const StartPage = ({
   latestLauncherVersion,
   latestClientVersion,
   os
}: Props) => {
	const installedClientVersion = storage.getItem('installedClientVersion')

	return (
		<Page backgroundVideo={forest}>
			<div
				style={{
					display: 'grid',
					gridTemplateRows: '90vh 10vh'
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
				<div
					style={{
						gridRowStart: 2,
						display: 'flex',
						alignItems: 'flex-end',
					}}
				>
					<Version
						installedClientVersion={installedClientVersion}
					/>
				</div>
			</div>
		</Page>
	);
}

export default StartPage;
