import { Collapse } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { CardContent } from './Card';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { NoContent } from './NoContent';
import { selectData as users } from '../slicer/usersSlice';
import { selectReposData } from '../slicer/reposSlice';
import { getReposAsync } from '../slicer/reposSlice';

const { Panel } = Collapse;

export function ContentBox() {
	const usersSelector = useAppSelector(users);
	const dataRepos = useAppSelector(selectReposData);
	const dispatch = useAppDispatch();

	function getRepoDescription(keys: string | string[]) {
		const repoOwners = dataRepos?.map((elem) => elem.user);
		const lastSelectedUser = keys[keys.length - 1];
		const iDataRepoHasKey = repoOwners.includes(lastSelectedUser);
		if (!iDataRepoHasKey && lastSelectedUser) {
			dispatch(getReposAsync(lastSelectedUser));
		}
	}

	const panel =
		usersSelector?.length !== 0 ? (
			usersSelector?.map(({ login }) => {
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
