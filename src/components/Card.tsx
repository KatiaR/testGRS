import React from 'react';
import { StarFilled } from '@ant-design/icons';
import { useAppSelector } from '../app/hooks';
import { selectReposData } from '../slicer/reposSlice';
import { NoContent } from './NoContent';
import { Spin } from 'antd';

export function CardContent(props: { user: string }) {
	const dataRepos = useAppSelector(selectReposData);
	const [userRepos] = dataRepos.filter((elem) => {
		return elem.user === props.user;
	});
	const listRepos = !userRepos ? (
		<Spin />
	) : !userRepos?.repos.length ? (
		<NoContent />
	) : (
		userRepos?.repos.map(({ name, description, stargazers_count, id }) => {
			return (
				<div className="card" key={id}>
					<div className="mainInfoCard">
						<h1>{name}</h1>
						<div className="ratingInfo">
							<span>{stargazers_count}</span>
							<StarFilled className="starIconClass" />
						</div>
					</div>
					<p>{description}</p>
				</div>
			);
		})
	);

	return <>{listRepos}</>;
}
