import React, { useEffect } from 'react';
import { Collapse } from 'antd';
import { RightOutlined, DownOutlined } from '@ant-design/icons';
import { CardContent } from './Card';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { clearData } from '../slicer/reposSlice';
import { NoContent } from './NoContent';
import { selectData as users } from '../slicer/usersSlice';
import { selectReposData } from '../slicer/reposSlice';
import { getReposAsync } from '../slicer/reposSlice';

const { Panel } = Collapse;

export function ContentBox() {
	const usersSelector = useAppSelector(users);
	const dataRepos = useAppSelector(selectReposData);
	const dispatch = useAppDispatch();

	useEffect(() => {
		return () => {
			clearData();
		};
	}, []);

	function getRepoDescription(keys: string | string[]) {
		if (!Array.isArray(keys)) return;

		const repoOwners = dataRepos?.map((elem) => {
			return elem.user;
		});
		const lastSelecteUser = keys[keys.length - 1];
		const iDataRepoHasKey = repoOwners.includes(lastSelecteUser);
		if (!iDataRepoHasKey && lastSelecteUser) {
			dispatch(getReposAsync(lastSelecteUser));
		}
	}

	const panel =
		usersSelector?.length !== 0 ? (
			usersSelector?.map(({ id, login }) => {
				return (
					<Panel
						header={login}
						key={login}
						className="site-collapse-custom-panel cardPreview"
					>
						<CardContent user={login} />
					</Panel>
				);
			})
		) : (
			<NoContent />
		);

	return (
		<Collapse
			ghost
			bordered={false}
			expandIcon={({ isActive }) => (
				<RightOutlined rotate={isActive ? -90 : 90} />
			)}
			className="site-collapse-custom-collapse"
			onChange={getRepoDescription}
		>
			{panel}
		</Collapse>
	);
}
