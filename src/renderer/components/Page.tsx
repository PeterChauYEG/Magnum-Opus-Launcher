import React from 'react';
import ReactPlayer from 'react-player'

type Props = {
	children: object,
	backgroundImage?: string,
	backgroundVideo?: string,
}

const Page = ({ children, backgroundImage, backgroundVideo}: Props) => {
	return (
		<div>
			{
				backgroundImage
				 ? (<img
					src={backgroundImage}
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
				/>)
				: (<ReactPlayer
					loop
					playing
					playbackRate={0.75}
					url={backgroundVideo}
					height={'100%'}
					width={'100%'}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 0,
					}}
					config={{
						file: {
							attributes: {
								style: {
									width: '100%',
									height: '100%',
									objectFit: 'cover'
								}

							}
						}
					}}
				/>)
			}
			<div
				style={{
					width: '100%',
					bottom: 0,
					left: 0,
					right: 0,
					position: 'absolute',
				}}>
				{children}
			</div>
		</div>
	);
}

export default Page;
