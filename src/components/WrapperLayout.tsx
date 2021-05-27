import React from 'react';
import { Layout } from 'antd';
import { ContentBox } from './ContentBox';
import { SearchForm } from './FormSearch';

const { Content } = Layout;

export function WrapperLayout() {
	return (
		<Layout className="wrapperContainer">
			<Content>
				<SearchForm />
				<ContentBox />
			</Content>
		</Layout>
	);
}
