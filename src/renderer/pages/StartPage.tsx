import React, {useEffect} from 'react';
import CTA from '../components/CTA';
import Version from '../components/Version';
import Header from "../components/Header";
import LauncherVersion from "../components/LauncherVersion";
import Page from "../components/Page";
import { useHistory } from "react-router-dom";
import forestRef from '../../../assets/videos/forest-1.mp4'
import Button from "../components/Button";
import { remote} from 'electron'

//required
console.log(forestRef)
const forest = '../forest-1.mp4'

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
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<CTA
							installedClientVersion={installedClientVersion}
							latestClientVersion={latestClientVersion}
							os={os}
						/>
						<div
							style={{
								marginTop: '8px',
							}}
						>
							<Button
								onClick={() => {
									remote.getCurrentWindow().close()
								}}
								title={'Exit'}
							/>
						</div>
					</div>
					<LauncherVersion
						latestLauncherVersion={latestLauncherVersion}
					/>
				</div>
				<div
					style={{
						gridRowStart: 2,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'flex-end',
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
