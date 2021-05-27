import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { ContentBox } from './ContentBox';
import { SearchForm } from './FormSearch';

const { Footer, Sider, Content } = Layout;

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
