import React from 'react';
import { Collapse } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { CardContent } from './Card';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { NoContent } from './NoContent';
import { selectData } from '../features/search/usersSlice';
import { getReposAsync } from '../features/search/reposSlice';

const { Panel } = Collapse;

export function ContentBox() {
	const data = useAppSelector(selectData);
	const dispatch = useAppDispatch();
	function getRepoDescription(keys: any) {
		console.log(keys);
		//dispatch(getReposAsync(keys[0]));
	}

	const panel =
		data?.length !== 0 ? (
			data?.map(({ id, login }) => {
				return (
					<Panel
						header={login}
						key={id}
						className="site-collapse-custom-panel cardPreview"
					>
						<CardContent />
					</Panel>
				);
			})
		) : (
			<NoContent />
		);
	return (
		<Collapse
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
