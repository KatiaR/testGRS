import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useAppDispatch } from '../app/hooks';
import { clearData, getUsersAsync } from '../slicer/usersSlice';
import { clearReposData } from '../slicer/reposSlice';

export function SearchForm() {
	const dispatch = useAppDispatch();
	const onFinish = ({ searchInput }: { searchInput: string }) => {
		dispatch(clearData());
		dispatch(clearReposData());
		dispatch(getUsersAsync(searchInput));
	};

	const onFinishFailed = (errorInfo: object) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(() => {
		return () => {
			dispatch(clearData());
			dispatch(clearReposData());
		};
	}, []);

	return (
		<Form
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			className="searchForm"
		>
			<Form.Item
				name="searchInput"
				rules={[{ required: true, message: 'Please input username!' }]}
			>
				<Input placeholder="Enter username" />
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					className="submitButton"
				>
					Search
				</Button>
			</Form.Item>
		</Form>
	);
}
