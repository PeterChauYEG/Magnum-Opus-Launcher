import React, { Component } from 'react';
import storage from 'electron-localstorage'
import CTA from '../components/CTA';
import Version from "../components/Version";
import Header from "../components/Header";
import LauncherVersion from "../components/LauncherVersion";
import city from '../../../public/media/imgs/city.png'

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
		<div>
			<img
				src={city}
				style={{
					height: '100%',
					width: '100%',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 0,
					objectFit: 'cover'
				}}
			/>
			<div
				style={{
					height: '100%',
					width: '100%',
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					position: 'absolute',
					display: 'grid',
					gridTemplateRows: '90vh 10vh'
				}}>
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
		</div>
	);
}

export default StartPage;
