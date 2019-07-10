import React, { Component, Fragment } from 'react';
import Head from 'next/head';
//own components
import Navbar from '../components/Navbar';
//material-ui components

//material-ui confi
import Normalize from '@material-ui/core/CssBaseline';


// import "../scss/style.scss";

const Page = ({ children }) => (
	<Fragment>
		<Head>
			<meta
				name="viewport"
				content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
			/>
			<title>Solé Fashion</title>
		</Head>
    <Normalize/>
		<Navbar />
		<main>{children}</main>
	</Fragment>
);

export default Page;
