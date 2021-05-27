import React from 'react';
import { StarFilled } from '@ant-design/icons';

export function CardContent() {
	return (
		<>
			<div className="card">
				<div className="mainInfoCard">
					<h1>Card content</h1>
					<div className="ratingInfo">
						<span>45</span>
						<StarFilled className="starIconClass" />
					</div>
				</div>
				<p>Card content</p>
			</div>
		</>
	);
}
